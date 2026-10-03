import { createHash } from "node:crypto";
import superjson from "superjson";
import { db } from "../../helpers/db";
import { getServerUserSession } from "../../helpers/getServerUserSession";
import { schema, type OutputType } from "./publish_POST.schema";

export async function handle(request: Request) {
  try {
    const { user } = await getServerUserSession(request);
    const input = schema.parse(superjson.parse(await request.text()));

    const output = await db.transaction().execute(async (trx) => {
      const order = await trx
        .selectFrom("presenceOrders")
        .select(["id", "state"])
        .where("id", "=", input.orderId)
        .where("userId", "=", String(user.id))
        .forUpdate()
        .executeTakeFirst();
      if (!order) throw new Error("Pedido não encontrado para esta conta.");
      if (order.state !== "CUSTOMER_CONFIRMED") {
        throw new Error(`Pedido deve estar em CUSTOMER_CONFIRMED, estado atual: ${order.state}`);
      }

      const page = await trx
        .selectFrom("presenceDriverPages")
        .select(["slug", "publishedVersion"])
        .where("orderId", "=", input.orderId)
        .executeTakeFirstOrThrow();

      const snapshot = await trx
        .selectFrom("presenceSnapshots")
        .select(["contentHash", "confirmedAt"])
        .where("orderId", "=", input.orderId)
        .where("snapshotKind", "=", "public_page")
        .where("confirmedAt", "is not", null)
        .orderBy("createdAt", "desc")
        .executeTakeFirst();
      if (!snapshot) throw new Error("Snapshot público confirmado não encontrado.");

      const templateKey = "driver-standard" as const;
      const templateVersion = 1 as const;
      const publishedVersion = (page.publishedVersion ?? 0) + 1;
      const manifest = {
        slug: page.slug,
        snapshotHash: snapshot.contentHash,
        templateKey,
        templateVersion,
        publishedVersion,
      };
      const manifestBody = JSON.stringify(manifest);
      const manifestHash = createHash("sha256").update(manifestBody).digest("hex");
      const manifestBytes = Buffer.byteLength(manifestBody, "utf8");

      await trx
        .insertInto("presencePublicationArtifacts")
        .values({
          orderId: input.orderId,
          snapshotHash: snapshot.contentHash,
          artifactHash: manifestHash,
          artifactBytes: manifestBytes,
          templateKey,
          templateVersion,
          status: "PUBLISHED",
          publishedAt: new Date(),
        })
        .execute();

      await trx
        .updateTable("presenceOrders")
        .set({ state: "SITE_GENERATED", updatedAt: new Date() })
        .where("id", "=", input.orderId)
        .executeTakeFirstOrThrow();

      await trx
        .insertInto("presenceOrderEvents")
        .values({
          orderId: input.orderId,
          state: "SITE_GENERATED",
          publicMessage: "Página gerada.",
        })
        .execute();

      await trx
        .updateTable("presenceDriverPages")
        .set({
          publicationStatus: "published",
          publishedHash: snapshot.contentHash,
          publishedVersion,
          publishedAt: new Date(),
          updatedAt: new Date(),
        })
        .where("orderId", "=", input.orderId)
        .executeTakeFirstOrThrow();

      await trx
        .updateTable("presenceOrders")
        .set({ state: "SITE_PUBLISHED", updatedAt: new Date() })
        .where("id", "=", input.orderId)
        .executeTakeFirstOrThrow();

      await trx
        .insertInto("presenceOrderEvents")
        .values({
          orderId: input.orderId,
          state: "SITE_PUBLISHED",
          publicMessage: "Página publicada.",
        })
        .execute();

      return {
        orderId: input.orderId,
        state: "SITE_PUBLISHED" as const,
        slug: page.slug,
        snapshotHash: snapshot.contentHash,
        manifestHash,
        templateKey,
        templateVersion,
        publishedVersion,
      };
    });

    return new Response(superjson.stringify(output satisfies OutputType), { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Falha ao publicar perfil";
    return new Response(superjson.stringify({ error: message }), { status: 400 });
  }
}