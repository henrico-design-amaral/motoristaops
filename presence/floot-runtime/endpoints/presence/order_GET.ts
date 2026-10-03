import superjson from "superjson";
import { db } from "../../helpers/db";
import { getServerUserSession } from "../../helpers/getServerUserSession";
import type { OutputType } from "./order_GET.schema";

export async function handle(request: Request) {
  try {
    const { user } = await getServerUserSession(request);

    const order = await db
      .selectFrom("presenceOrders")
      .leftJoin("presenceDriverPages", "presenceDriverPages.orderId", "presenceOrders.id")
      .leftJoin("presenceShipments", "presenceShipments.orderId", "presenceOrders.id")
      .select([
        "presenceOrders.id as id",
        "presenceOrders.state as state",
        "presenceOrders.productSku as productSku",
        "presenceOrders.productVersion as productVersion",
        "presenceOrders.amountCents as amountCents",
        "presenceOrders.currency as currency",
        "presenceDriverPages.slug as slug",
        "presenceDriverPages.publicationStatus as publicationStatus",
        "presenceShipments.status as shipmentStatus",
        "presenceShipments.trackingCode as trackingCode",
      ])
      .where("presenceOrders.userId", "=", String(user.id))
      .orderBy("presenceOrders.createdAt", "desc")
      .executeTakeFirst();

    let paymentStatus: string | null = null;
    if (order) {
      const payment = await db
        .selectFrom("presencePaymentAttempts")
        .select("status")
        .where("orderId", "=", order.id)
        .orderBy("createdAt", "desc")
        .executeTakeFirst();
      paymentStatus = payment?.status ?? null;
    }

    const catalog = await db
      .selectFrom("presenceProducts")
      .select(["sku", "version", "name", "status", "priceCents", "currency"])
      .where("status", "!=", "retired")
      .orderBy("name")
      .execute();

    const output: OutputType = {
      order: order ? {
        id: String(order.id),
        state: order.state,
        productSku: order.productSku,
        productVersion: order.productVersion,
        amountCents: order.amountCents,
        currency: order.currency,
        slug: order.slug ?? null,
        publicationStatus: order.publicationStatus ?? null,
        paymentStatus,
        shipmentStatus: order.shipmentStatus ?? null,
        trackingCode: order.trackingCode ?? null,
      } : null,
      catalog,
    };
    return new Response(superjson.stringify(output), { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Falha ao carregar pedido";
    return new Response(superjson.stringify({ error: message }), { status: 401 });
  }
}