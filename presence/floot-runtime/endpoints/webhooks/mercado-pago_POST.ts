import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import superjson from "superjson";
import { db } from "../../helpers/db";
import { getExternalSecret } from "../../helpers/externalResources";
import type { OutputType } from "./mercado-pago_POST.schema";

type MercadoPagoOrder = {
  status?: string;
  status_detail?: string;
  external_reference?: string;
  total_amount?: string | number;
  currency?: string;
};

function parseSignature(header: string) {
  const parts = Object.fromEntries(
    header.split(",").map((entry) => entry.trim().split("=", 2) as [string, string])
  );
  return { ts: parts.ts, v1: parts.v1 };
}

function safeEqualHex(a: string, b: string) {
  if (!/^[a-f0-9]{64}$/i.test(a) || !/^[a-f0-9]{64}$/i.test(b)) return false;
  return timingSafeEqual(Buffer.from(a, "hex"), Buffer.from(b, "hex"));
}

export async function handle(request: Request) {
  try {
    const token = getExternalSecret("MERCADO_PAGO_ACCESS_TOKEN");
    const secret = getExternalSecret("MERCADO_PAGO_WEBHOOK_SECRET");
    if (!token || !secret) {
      return new Response(superjson.stringify({ error: "Mercado Pago não configurado." }), { status: 503 });
    }

    const url = new URL(request.url);
    const dataId = url.searchParams.get("data.id") ?? url.searchParams.get("data_id");
    const requestId = request.headers.get("x-request-id");
    const signature = request.headers.get("x-signature");
    if (!dataId || !requestId || !signature) {
      return new Response(superjson.stringify({ error: "Webhook sem evidência de assinatura completa." }), { status: 401 });
    }

    const { ts, v1 } = parseSignature(signature);
    if (!ts || !v1) {
      return new Response(superjson.stringify({ error: "Assinatura inválida." }), { status: 401 });
    }
    const manifest = `id:${dataId};request-id:${requestId};ts:${ts};`;
    const expected = createHmac("sha256", secret).update(manifest).digest("hex");
    if (!safeEqualHex(expected, v1)) {
      return new Response(superjson.stringify({ error: "Assinatura inválida." }), { status: 401 });
    }

    const rawBody = await request.text();
    let payload: unknown = {};
    try { payload = rawBody ? JSON.parse(rawBody) : {}; } catch { payload = { raw: rawBody }; }
    const payloadHash = createHash("sha256").update(rawBody).digest("hex");

    const existing = await db
      .selectFrom("presencePaymentWebhookEvents")
      .select(["processingResult"])
      .where("payloadHash", "=", payloadHash)
      .executeTakeFirst();
    if (existing?.processingResult) {
      return new Response(superjson.stringify({ ok: true, result: existing.processingResult } satisfies OutputType), { status: 200 });
    }

    const providerResponse = await fetch(`https://api.mercadopago.com/v1/orders/${encodeURIComponent(dataId)}`, {
      headers: {
        "accept": "application/json",
        "authorization": `Bearer ${token}`,
      },
    });
    if (!providerResponse.ok) {
      return new Response(superjson.stringify({ error: "Não foi possível consultar a order no Mercado Pago." }), { status: 502 });
    }
    const providerOrder = await providerResponse.json() as MercadoPagoOrder;

    const attempt = await db
      .selectFrom("presencePaymentAttempts")
      .innerJoin("presenceOrders", "presencePaymentAttempts.orderId", "presenceOrders.id")
      .select([
        "presencePaymentAttempts.orderId as orderId",
        "presencePaymentAttempts.amountCents as amountCents",
        "presencePaymentAttempts.currency as currency",
        "presenceOrders.state as orderState",
      ])
      .where("presencePaymentAttempts.provider", "=", "mercado_pago")
      .where("presencePaymentAttempts.providerOrderId", "=", dataId)
      .executeTakeFirst();

    if (!attempt) {
      return new Response(superjson.stringify({ error: "Order do Mercado Pago não corresponde a pedido conhecido." }), { status: 409 });
    }
    if (String(providerOrder.external_reference ?? "") !== String(attempt.orderId)) {
      return new Response(superjson.stringify({ error: "external_reference divergente." }), { status: 409 });
    }

    const providerAmountCents = Math.round(Number(providerOrder.total_amount) * 100);
    if (!Number.isFinite(providerAmountCents) || providerAmountCents !== attempt.amountCents) {
      return new Response(superjson.stringify({ error: "Valor confirmado diverge do pedido." }), { status: 409 });
    }
    if (providerOrder.currency && providerOrder.currency !== attempt.currency) {
      return new Response(superjson.stringify({ error: "Moeda confirmada diverge do pedido." }), { status: 409 });
    }

    const paid = providerOrder.status === "processed" && providerOrder.status_detail === "accredited";
    const result = paid ? "PAID" : `IGNORED_${providerOrder.status ?? "UNKNOWN"}`;

    await db.transaction().execute(async (trx) => {
      await trx
        .insertInto("presencePaymentWebhookEvents")
        .values({
          provider: "mercado_pago",
          externalEventId: requestId,
          providerOrderId: dataId,
          signatureValid: true,
          payload: payload as any,
          payloadHash,
          processingResult: result,
          processedAt: new Date(),
        })
        .onConflict((oc) => oc.column("payloadHash").doNothing())
        .execute();

      if (!paid) return;
      const order = await trx
        .selectFrom("presenceOrders")
        .select("state")
        .where("id", "=", attempt.orderId)
        .forUpdate()
        .executeTakeFirstOrThrow();

      if (order.state === "PAID" || order.state === "ONBOARDING") return;
      if (order.state !== "PAYMENT_PENDING") {
        throw new Error(`Transição de pagamento bloqueada a partir de ${order.state}`);
      }

      await trx
        .updateTable("presencePaymentAttempts")
        .set({ status: "PAID", updatedAt: new Date() })
        .where("provider", "=", "mercado_pago")
        .where("providerOrderId", "=", dataId)
        .execute();

      await trx
        .updateTable("presenceOrders")
        .set({ state: "ONBOARDING", updatedAt: new Date() })
        .where("id", "=", attempt.orderId)
        .executeTakeFirstOrThrow();

      await trx
        .insertInto("presenceOrderEvents")
        .values({
          orderId: attempt.orderId,
          state: "ONBOARDING",
          publicMessage: "Pagamento confirmado. Cadastro liberado.",
        })
        .execute();
    });

    return new Response(superjson.stringify({ ok: true, result } satisfies OutputType), { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Falha ao processar webhook";
    return new Response(superjson.stringify({ error: message }), { status: 400 });
  }
}