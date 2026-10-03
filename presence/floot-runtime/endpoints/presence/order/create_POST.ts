import superjson from "superjson";
import { db } from "../../../helpers/db";
import { getServerUserSession } from "../../../helpers/getServerUserSession";
import { schema, type OutputType } from "./create_POST.schema";

const terminalStates = ["DELIVERED", "CANCELLED"];

export async function handle(request: Request) {
  try {
    const { user } = await getServerUserSession(request);
    const input = schema.parse(superjson.parse(await request.text()));

    const output = await db.transaction().execute(async (trx) => {
      const existing = await trx
        .selectFrom("presenceOrders")
        .select(["id", "state"])
        .where("userId", "=", String(user.id))
        .orderBy("createdAt", "desc")
        .forUpdate()
        .executeTakeFirst();
      if (existing && !terminalStates.includes(existing.state)) {
        throw new Error("Já existe um pedido ativo para esta conta.");
      }

      const product = await trx
        .selectFrom("presenceProducts")
        .select(["sku", "version", "status", "priceCents", "currency"])
        .where("sku", "=", input.sku)
        .where("version", "=", input.version)
        .executeTakeFirst();
      if (!product) throw new Error("Produto não encontrado.");
      if (product.status !== "active") throw new Error("Produto ainda não está ativo para venda.");
      if (!product.priceCents || product.priceCents <= 0) {
        throw new Error("Preço do produto ainda não foi confirmado.");
      }

      const order = await trx
        .insertInto("presenceOrders")
        .values({
          userId: user.id,
          state: "ACCOUNT_CREATED",
          productSku: product.sku,
          productVersion: product.version,
          amountCents: product.priceCents,
          currency: product.currency,
        })
        .returning(["id", "amountCents", "currency"])
        .executeTakeFirstOrThrow();

      await trx
        .updateTable("presenceOrders")
        .set({ state: "PRODUCT_SELECTED", updatedAt: new Date() })
        .where("id", "=", order.id)
        .executeTakeFirstOrThrow();

      await trx
        .insertInto("presenceOrderEvents")
        .values({
          orderId: order.id,
          state: "PRODUCT_SELECTED",
          publicMessage: "Produto selecionado.",
        })
        .execute();

      return {
        orderId: String(order.id),
        state: "PRODUCT_SELECTED" as const,
        amountCents: order.amountCents!,
        currency: order.currency,
      };
    });

    return new Response(superjson.stringify(output satisfies OutputType), { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Falha ao criar pedido";
    return new Response(superjson.stringify({ error: message }), { status: 400 });
  }
}