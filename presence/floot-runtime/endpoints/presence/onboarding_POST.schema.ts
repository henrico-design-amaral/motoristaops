import { z } from "zod";
import superjson from "superjson";

const httpsUrl = z.string().url().refine((value) => value.startsWith("https://"), "Use HTTPS");

export const schema = z.object({
  orderId: z.union([z.string(), z.number()]).transform(String),
  slug: z.string().min(3).max(64).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  profile: z.object({
    displayName: z.string().min(2).max(120),
    fullName: z.string().max(160).nullable().optional(),
    phone: z.string().max(32).nullable().optional(),
    whatsapp: z.string().min(8).max(32),
    bio: z.string().max(1200).nullable().optional(),
  }),
  vehicle: z.object({
    brand: z.string().min(1).max(80),
    model: z.string().min(1).max(80),
    year: z.number().int().min(1990).max(2100),
    color: z.string().min(1).max(40),
    capacity: z.number().int().min(1).max(20).nullable().optional(),
  }),
  services: z.array(z.string().min(1).max(80)).min(1).max(20),
  serviceAreas: z.array(z.string().min(2).max(160)).min(1).max(30),
  socialLinks: z.object({
    instagram: httpsUrl.nullable().optional(),
    linkedin: httpsUrl.nullable().optional(),
    tiktok: httpsUrl.nullable().optional(),
    youtube: httpsUrl.nullable().optional(),
  }),
  googleBusiness: z.object({
    mode: z.enum(["not_requested", "create", "connect_existing"]),
  }),
  printPersonalization: z.object({
    displayName: z.string().min(2).max(120),
    whatsapp: z.string().min(8).max(32),
    shortServiceLine: z.string().max(120).nullable().optional(),
  }),
  shippingAddress: z.object({
    postalCode: z.string().min(8).max(10),
    street: z.string().min(2).max(160),
    number: z.string().min(1).max(20),
    complement: z.string().max(120).nullable().optional(),
    neighborhood: z.string().min(2).max(120),
    city: z.string().min(2).max(120),
    state: z.string().length(2),
  }),
});

export type InputType = z.infer<typeof schema>;
export type OutputType = {
  orderId: string;
  state: "DATA_VALID";
  slug: string;
};

export const postPresenceOnboarding = async (
  body: z.input<typeof schema>,
  init?: RequestInit,
): Promise<OutputType> => {
  const validatedInput = schema.parse(body);
  const result = await fetch("/_api/presence/onboarding", {
    method: "POST",
    body: superjson.stringify(validatedInput),
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });
  if (!result.ok) {
    const errorObject = superjson.parse<{ error: string }>(await result.text());
    throw new Error(errorObject.error);
  }
  return superjson.parse<OutputType>(await result.text());
};