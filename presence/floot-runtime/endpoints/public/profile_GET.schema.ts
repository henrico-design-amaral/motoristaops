import { z } from "zod";
import superjson from "superjson";

export const schema = z.object({
  slug: z.string().min(3).max(64).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
});

export type OutputType = {
  slug: string;
  snapshotHash: string;
  publishedVersion: number;
  content: {
    schemaVersion: number;
    slug: string;
    profile: { displayName: string; whatsapp: string; bio: string | null };
    vehicle: { brand: string; model: string; year: number; color: string; capacity: number | null };
    services: string[];
    serviceAreas: string[];
    socialLinks: Record<string, string | null>;
  };
};

export const getPublicProfile = async (slug: string): Promise<OutputType> => {
  const result = await fetch(`/_api/public/profile?slug=${encodeURIComponent(slug)}`);
  if (!result.ok) {
    const errorObject = superjson.parse<{ error: string }>(await result.text());
    throw new Error(errorObject.error);
  }
  return superjson.parse<OutputType>(await result.text());
};