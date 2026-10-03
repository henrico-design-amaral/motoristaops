import { randomUUID } from "node:crypto";
import superjson from "superjson";
import { db } from "../../../helpers/db";
import { getServerUserSession } from "../../../helpers/getServerUserSession";
import { getExternalSecret } from "../../../helpers/externalResources";
import { schema, type OutputType } from "./create_POST.schema";

type MercadoPagoOrderResponse = {
  id?: string;
  status?: string;
  checkout_url?: string;
};

export async function handle(request: Request) {
  let paymentAttemptId: string | undefined;
  try {
    const token = getExternalSecret("MERCADO_PAGO_ACCESS_TOKEN");
    if (!token) {
      return new Response(superjson.stringify({ error: "Mercado Pago ainda não conectado." }), { status: 503 });
    }

    const { user } = await getServerUserSession(request);
    const input = schema.parse(superjson.parse(await request.text()));
    const order = await db
      .selectFrom("presenceOrders")
      .select(["id", "state", "amountCents", "currency"])
      .where("id", "=", input.orderId)
      .where("userId", "=", String(user.id))
      .executeTakeFirst();

    if (!order) throw new Error("Pedido não encontrado para esta conta.");
    if (order.state !== "PRODUCT_SELECTED") {
      throw new Error(`Pedido deve estar em PRODUCT_SELECTED, estado atual: ${order.state}`);
    }
    if (!order.amountCents || order.amountCents <= 0) {
      throw new Error("Preço do produto ainda não está configurado; pagamento bloqueado.");
    }
    if (order.currency !== "BRL") {
      throw new Error("Moeda do pedido não suportada para este checkout.");
    }

    const previous = await db
      .selectFrom("presencePaymentAttempts")
      .select(["id", "idempotencyKey", "providerOrderId", "status"])
      .where("orderId", "=", input.orderId)
      .where("provider", "=", "mercado_pago")
      .orderBy("createdAt", "desc")
      .executeTakeFirst();

    if (previous?.providerOrderId && previous.status !== "FAILED") {
      throw new Error("Já existe uma tentativa de pagamento ativa para este pedido.");
    }

    const idempotencyKey = previous?.status === "INITIATED"
      ? previous.idempotencyKey
      : randomUUID();

    if (previous?.status === "INITIATED") {
      paymentAttemptId = String(previous.id);
    } else {
      const inserted = await db
        .insertInto("presencePaymentAttempts")
        .values({
          orderId: input.orderId,
          provider: "mercado_pago",
          idempotencyKey,
          status: "INITIATED",
          amountCents: order.amountCents,
          currency: order.currency,
        })
        .returning("id")
        .executeTakeFirstOrThrow();
      paymentAttemptId = String(inserted.id);
    }

    const totalAmount = (order.amountCents / 100).toFixed(2);
    const response = await fetch("https://api.mercadopago.com/v1/orders", {
      method: "POST",
      headers: {
        "accept": "application/json",
        "content-type": "application/json",
        "authorization": `Bearer ${token}`,
        "x-idempotency-key": idempotencyKey,
      },
      body: JSON.stringify({
        type: "online",
        processing_mode: "manual",
        total_amount: totalAmount,
        external_reference: input.orderId,
        payer: { email: user.email },
        items: [{
          title: "MotoristaOPS Presença",
          unit_price: totalAmount,
          quantity: 1,
          unit_measure: "unit",
          total_amount: totalAmount,
        }],
      }),
    });

    const body = await response.json() as MercadoPagoOrderResponse;
    if (!response.ok || !body.id || !body.checkout_url) {
      await db
        .updateTable("presencePaymentAttempts")
        .set({ status: "FAILED", updatedAt: new Date() })
        .where("id", "=", paymentAttemptId)
        .execute();
      throw new Error("Mercado Pago recusou a criação da order.");
    }

    await db.transaction().execute(async (trx) => {
      const locked = await trx
        .selectFrom("presenceOrders")
        .select(["state", "amountCents"])
        .where("id", "=", input.orderId)
        .where("userId", "=", String(user.id))
        .forUpdate()
        .executeTakeFirstOrThrow();
      if (locked.state !== "PRODUCT_SELECTED" || locked.amountCents !== order.amountCents) {
        throw new Error("Pedido mudou durante a criação do pagamento.");
      }

      await trx
        .updateTable("presencePaymentAttempts")
        .set({
          providerOrderId: body.id!,
          status: body.status ?? "created",
          updatedAt: new Date(),
        })
        .where("id", "=", paymentAttemptId!)
        .executeTakeFirstOrThrow();

      await trx
        .updateTable("presenceOrders")
        .set({ state: "PAYMENT_PENDING", updatedAt: new Date() })
        .where("id", "=", input.orderId)
        .executeTakeFirstOrThrow();

      await trx
        .insertInto("presenceOrderEvents")
        .values({
          orderId: input.orderId,
          state: "PAYMENT_PENDING",
          publicMessage: "Pagamento iniciado.",
        })
        .execute();
    });

    const output: OutputType = {
      orderId: input.orderId,
      providerOrderId: body.id,
      checkoutUrl: body.checkout_url,
      state: "PAYMENT_PENDING",
    };
    return new Response(superjson.stringify(output), { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Falha ao iniciar pagamento";
    return new Response(superjson.stringify({ error: message }), { status: 400 });
  }
}