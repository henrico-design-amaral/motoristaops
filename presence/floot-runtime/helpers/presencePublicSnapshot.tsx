import { db } from "./db";

export async function loadPresencePublicSnapshot(orderId: string) {
  const [profile, page, vehicle, social, services, areas] = await Promise.all([
    db.selectFrom("presenceProfiles").selectAll().where("orderId", "=", orderId).executeTakeFirstOrThrow(),
    db.selectFrom("presenceDriverPages").selectAll().where("orderId", "=", orderId).executeTakeFirstOrThrow(),
    db.selectFrom("presenceVehicles").selectAll().where("orderId", "=", orderId).executeTakeFirstOrThrow(),
    db.selectFrom("presenceSocialLinks").selectAll().where("orderId", "=", orderId).executeTakeFirst(),
    db.selectFrom("presenceServices").select("serviceCode").where("orderId", "=", orderId).orderBy("serviceCode").execute(),
    db.selectFrom("presenceServiceAreas").select("area").where("orderId", "=", orderId).orderBy("area").execute(),
  ]);

  return {
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
}