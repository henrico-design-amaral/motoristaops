import superjson from "superjson";
import { db } from "../../../helpers/db";
import { getServerUserSession } from "../../../helpers/getServerUserSession";
import { getExternalSecret } from "../../../helpers/externalResources";
import { schema, type OutputType } from "./quote_POST.schema";

type MelhorEnvioQuote = {
  id?: number | string;
  name?: string;
  price?: string | number;
  custom_price?: string | number;
  delivery_time?: number;
  custom_delivery_time?: number;
  company?: { name?: string };
  error?: string;
};

export async function handle(request: Request) {
  try {
    const token = getExternalSecret("MELHOR_ENVIO_ACCESS_TOKEN");
    if (!token) {
      return new Response(superjson.stringify({ error: "Melhor Envio ainda não conectado." }), { status: 503 });
    }

    const { user } = await getServerUserSession(request);
    const input = schema.parse(superjson.parse(await request.text()));
    const order = await db
      .selectFrom("presenceOrders")
      .select(["id", "state", "productSku", "productVersion"])
      .where("id", "=", input.orderId)
      .where("userId", "=", String(user.id))
      .executeTakeFirst();
    if (!order) throw new Error("Pedido não encontrado para esta conta.");
    if (!["KIT_PACKED", "SITE_PUBLISHED"].includes(order.state)) {
      throw new Error(`Cotação de frete indisponível no estado ${order.state}.`);
    }
    if (!order.productSku || !order.productVersion) {
      throw new Error("Produto do pedido não está definido.");
    }

    const [destination, config, packageSpec] = await Promise.all([
      db.selectFrom("presenceShippingAddresses").selectAll().where("orderId", "=", input.orderId).executeTakeFirst(),
      db.selectFrom("presenceShippingConfig").selectAll().where("id", "=", 1).executeTakeFirst(),
      db.selectFrom("presencePackageSpecs")
        .selectAll()
        .where("productSku", "=", order.productSku)
        .where("productVersion", "=", order.productVersion)
        .executeTakeFirst(),
    ]);

    if (!destination) throw new Error("Endereço de entrega não encontrado.");
    if (!config?.verifiedAt || !config.originPostalCode || !config.userAgent) {
      throw new Error("Configuração de origem do Melhor Envio ainda não foi verificada.");
    }
    if (
      !packageSpec?.verifiedAt ||
      !packageSpec.widthCm ||
      !packageSpec.heightCm ||
      !packageSpec.lengthCm ||
      !packageSpec.weightKg
    ) {
      throw new Error("Dimensões/peso do pacote ainda não foram verificados.");
    }

    const response = await fetch("https://sandbox.melhorenvio.com.br/api/v2/me/shipment/calculate", {
      method: "POST",
      headers: {
        "accept": "application/json",
        "content-type": "application/json",
        "authorization": `Bearer ${token}`,
        "user-agent": config.userAgent,
      },
      body: JSON.stringify({
        from: { postal_code: config.originPostalCode },
        to: { postal_code: destination.postalCode },
        volumes: [{
          width: Number(packageSpec.widthCm),
          height: Number(packageSpec.heightCm),
          length: Number(packageSpec.lengthCm),
          weight: Number(packageSpec.weightKg),
        }],
      }),
    });

    const payload = await response.json() as MelhorEnvioQuote[];
    if (!response.ok || !Array.isArray(payload)) {
      throw new Error("Melhor Envio recusou a cotação.");
    }

    const usable = payload.filter((item) =>
      item.id != null &&
      !item.error &&
      Number(item.custom_price ?? item.price) >= 0
    );
    if (usable.length === 0) throw new Error("Nenhuma cotação utilizável foi retornada.");

    await db.transaction().execute(async (trx) => {
      await trx.deleteFrom("presenceShippingQuotes").where("orderId", "=", input.orderId).execute();
      await trx.insertInto("presenceShippingQuotes").values(
        usable.map((item) => ({
          orderId: input.orderId,
          provider: "melhor_envio",
          serviceId: String(item.id),
          serviceName: item.name ?? null,
          companyName: item.company?.name ?? null,
          priceCents: Math.round(Number(item.custom_price ?? item.price) * 100),
          deliveryDays: item.custom_delivery_time ?? item.delivery_time ?? null,
          rawPayload: item as any,
          selected: false,
        }))
      ).execute();

      if (order.state === "KIT_PACKED") {
        await trx
          .updateTable("presenceOrders")
          .set({ state: "SHIPPING_QUOTED", updatedAt: new Date() })
          .where("id", "=", input.orderId)
          .execute();
        await trx
          .insertInto("presenceOrderEvents")
          .values({
            orderId: input.orderId,
            state: "SHIPPING_QUOTED",
            publicMessage: "Frete calculado.",
          })
          .execute();
      }
    });

    const output: OutputType = {
      orderId: input.orderId,
      quotes: usable.map((item) => ({
        id: String(item.id),
        name: item.name ?? null,
        company: item.company?.name ?? null,
        priceCents: Math.round(Number(item.custom_price ?? item.price) * 100),
        deliveryDays: item.custom_delivery_time ?? item.delivery_time ?? null,
      })),
    };
    return new Response(superjson.stringify(output), { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Falha ao calcular frete";
    return new Response(superjson.stringify({ error: message }), { status: 400 });
  }
}