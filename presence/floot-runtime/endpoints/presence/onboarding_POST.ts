import superjson from "superjson";
import { db } from "../../helpers/db";
import { getServerUserSession } from "../../helpers/getServerUserSession";
import { schema, type OutputType } from "./onboarding_POST.schema";

export async function handle(request: Request) {
  try {
    const { user } = await getServerUserSession(request);
    const input = schema.parse(superjson.parse(await request.text()));

    const output = await db.transaction().execute(async (trx) => {
      const order = await trx
        .selectFrom("presenceOrders")
        .select(["id", "state", "userId"])
        .where("id", "=", input.orderId)
        .where("userId", "=", String(user.id))
        .forUpdate()
        .executeTakeFirst();

      if (!order) throw new Error("Pedido não encontrado para esta conta.");
      if (!["ONBOARDING", "DATA_VALID"].includes(order.state)) {
        throw new Error(`Pedido deve estar em ONBOARDING ou DATA_VALID, estado atual: ${order.state}`);
      }

      const existingSlug = await trx
        .selectFrom("presenceDriverPages")
        .select("orderId")
        .where("slug", "=", input.slug)
        .where("orderId", "!=", input.orderId)
        .executeTakeFirst();
      if (existingSlug) throw new Error("Este endereço de página já está em uso.");

      await trx
        .insertInto("presenceProfiles")
        .values({
          orderId: input.orderId,
          displayName: input.profile.displayName,
          fullName: input.profile.fullName ?? null,
          phone: input.profile.phone ?? null,
          whatsapp: input.profile.whatsapp,
          bio: input.profile.bio ?? null,
        })
        .onConflict((oc) => oc.column("orderId").doUpdateSet({
          displayName: input.profile.displayName,
          fullName: input.profile.fullName ?? null,
          phone: input.profile.phone ?? null,
          whatsapp: input.profile.whatsapp,
          bio: input.profile.bio ?? null,
          updatedAt: new Date(),
        }))
        .execute();

      await trx
        .insertInto("presenceVehicles")
        .values({
          orderId: input.orderId,
          brand: input.vehicle.brand,
          model: input.vehicle.model,
          year: input.vehicle.year,
          color: input.vehicle.color,
          capacity: input.vehicle.capacity ?? null,
        })
        .onConflict((oc) => oc.column("orderId").doUpdateSet({
          brand: input.vehicle.brand,
          model: input.vehicle.model,
          year: input.vehicle.year,
          color: input.vehicle.color,
          capacity: input.vehicle.capacity ?? null,
        }))
        .execute();

      await trx
        .insertInto("presenceDriverPages")
        .values({
          orderId: input.orderId,
          userId: user.id,
          slug: input.slug,
          publicationStatus: "draft",
        })
        .onConflict((oc) => oc.column("orderId").doUpdateSet({
          slug: input.slug,
          publicationStatus: "draft",
          updatedAt: new Date(),
        }))
        .execute();

      await trx.deleteFrom("presenceServices").where("orderId", "=", input.orderId).execute();
      await trx
        .insertInto("presenceServices")
        .values(input.services.map((serviceCode) => ({ orderId: input.orderId, serviceCode })))
        .execute();

      await trx.deleteFrom("presenceServiceAreas").where("orderId", "=", input.orderId).execute();
      await trx
        .insertInto("presenceServiceAreas")
        .values(input.serviceAreas.map((area) => ({ orderId: input.orderId, area })))
        .execute();

      await trx
        .insertInto("presenceSocialLinks")
        .values({
          orderId: input.orderId,
          instagram: input.socialLinks.instagram ?? null,
          linkedin: input.socialLinks.linkedin ?? null,
          tiktok: input.socialLinks.tiktok ?? null,
          youtube: input.socialLinks.youtube ?? null,
        })
        .onConflict((oc) => oc.column("orderId").doUpdateSet({
          instagram: input.socialLinks.instagram ?? null,
          linkedin: input.socialLinks.linkedin ?? null,
          tiktok: input.socialLinks.tiktok ?? null,
          youtube: input.socialLinks.youtube ?? null,
        }))
        .execute();

      await trx
        .insertInto("presenceGoogleBusiness")
        .values({ orderId: input.orderId, mode: input.googleBusiness.mode })
        .onConflict((oc) => oc.column("orderId").doUpdateSet({ mode: input.googleBusiness.mode }))
        .execute();

      await trx
        .insertInto("presenceOrderPersonalizations")
        .values({
          orderId: input.orderId,
          displayName: input.printPersonalization.displayName,
          whatsapp: input.printPersonalization.whatsapp,
          shortServiceLine: input.printPersonalization.shortServiceLine ?? null,
        })
        .onConflict((oc) => oc.column("orderId").doUpdateSet({
          displayName: input.printPersonalization.displayName,
          whatsapp: input.printPersonalization.whatsapp,
          shortServiceLine: input.printPersonalization.shortServiceLine ?? null,
        }))
        .execute();

      await trx
        .insertInto("presenceShippingAddresses")
        .values({
          orderId: input.orderId,
          document: input.shippingAddress.document,
          postalCode: input.shippingAddress.postalCode,
          street: input.shippingAddress.street,
          number: input.shippingAddress.number,
          complement: input.shippingAddress.complement ?? null,
          neighborhood: input.shippingAddress.neighborhood,
          city: input.shippingAddress.city,
          state: input.shippingAddress.state.toUpperCase(),
        })
        .onConflict((oc) => oc.column("orderId").doUpdateSet({
          document: input.shippingAddress.document,
          postalCode: input.shippingAddress.postalCode,
          street: input.shippingAddress.street,
          number: input.shippingAddress.number,
          complement: input.shippingAddress.complement ?? null,
          neighborhood: input.shippingAddress.neighborhood,
          city: input.shippingAddress.city,
          state: input.shippingAddress.state.toUpperCase(),
        }))
        .execute();

      if (order.state === "ONBOARDING") {
        await trx
          .updateTable("presenceOrders")
          .set({ state: "DATA_VALID", updatedAt: new Date() })
          .where("id", "=", input.orderId)
          .where("userId", "=", String(user.id))
          .executeTakeFirstOrThrow();

        await trx
          .insertInto("presenceOrderEvents")
          .values({
            orderId: input.orderId,
            state: "DATA_VALID",
            publicMessage: "Dados recebidos e validados.",
          })
          .execute();
      }

      return {
        orderId: input.orderId,
        state: "DATA_VALID" as const,
        slug: input.slug,
      };
    });

    return new Response(superjson.stringify(output satisfies OutputType), { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Falha no onboarding";
    return new Response(superjson.stringify({ error: message }), { status: 400 });
  }
}