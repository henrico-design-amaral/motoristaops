import { createHash } from "node:crypto";
import superjson from "superjson";
import { db } from "../../helpers/db";
import { getServerUserSession } from "../../helpers/getServerUserSession";
import { schema, type OutputType } from "./confirm_POST.schema";

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
      if (order.state !== "DATA_VALID") {
        throw new Error(`Pedido deve estar em DATA_VALID, estado atual: ${order.state}`);
      }

      const [profile, page, vehicle, social, services, areas] = await Promise.all([
        trx.selectFrom("presenceProfiles").selectAll().where("orderId", "=", input.orderId).executeTakeFirstOrThrow(),
        trx.selectFrom("presenceDriverPages").selectAll().where("orderId", "=", input.orderId).executeTakeFirstOrThrow(),
        trx.selectFrom("presenceVehicles").selectAll().where("orderId", "=", input.orderId).executeTakeFirstOrThrow(),
        trx.selectFrom("presenceSocialLinks").selectAll().where("orderId", "=", input.orderId).executeTakeFirst(),
        trx.selectFrom("presenceServices").select("serviceCode").where("orderId", "=", input.orderId).orderBy("serviceCode").execute(),
        trx.selectFrom("presenceServiceAreas").select("area").where("orderId", "=", input.orderId).orderBy("area").execute(),
      ]);

      const publicSnapshot = {
        schemaVersion: 1,
        slug: page.slug,
        profile: {
          displayName: profile.displayName,
          whatsapp: profile.whatsapp,
          bio: profile.bio,
        },
        vehicle: {
          brand: vehicle.brand,
          model: vehicle.model,
          year: vehicle.year,
          color: vehicle.color,
          capacity: vehicle.capacity,
        },
        services: services.map((item) => item.serviceCode),
        serviceAreas: areas.map((item) => item.area),
        socialLinks: {
          instagram: social?.instagram ?? null,
          linkedin: social?.linkedin ?? null,
          tiktok: social?.tiktok ?? null,
          youtube: social?.youtube ?? null,
        },
      };

      const serialized = JSON.stringify(publicSnapshot);
      const snapshotHash = createHash("sha256").update(serialized).digest("hex");

      await trx
        .insertInto("presenceSnapshots")
        .values({
          orderId: input.orderId,
          snapshotKind: "public_page",
          content: publicSnapshot,
          contentHash: snapshotHash,
          confirmedAt: new Date(),
        })
        .execute();

      await trx
        .updateTable("presenceDriverPages")
        .set({ publicationStatus: "confirmed", updatedAt: new Date() })
        .where("orderId", "=", input.orderId)
        .executeTakeFirstOrThrow();

      await trx
        .updateTable("presenceOrders")
        .set({ state: "CUSTOMER_CONFIRMED", updatedAt: new Date() })
        .where("id", "=", input.orderId)
        .executeTakeFirstOrThrow();

      await trx
        .insertInto("presenceOrderEvents")
        .values({
          orderId: input.orderId,
          state: "CUSTOMER_CONFIRMED",
          publicMessage: "Dados confirmados para publicação.",
        })
        .execute();

      return {
        orderId: input.orderId,
        state: "CUSTOMER_CONFIRMED" as const,
        snapshotHash,
        slug: page.slug,
      };
    });

    return new Response(superjson.stringify(output satisfies OutputType), { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Falha ao confirmar dados";
    return new Response(superjson.stringify({ error: message }), { status: 400 });
  }
}