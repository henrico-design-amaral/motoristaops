import { z } from "zod";
import superjson from "superjson";

export const schema = z.object({
  orderId: z.union([z.string(), z.number()]).transform(String),
});

export type ShippingQuote = {
  id: string;
  name: string | null;
  company: string | null;
  priceCents: number;
  deliveryDays: number | null;
};

export type OutputType = {
  orderId: string;
  quotes: ShippingQuote[];
};

export const postPresenceShippingQuote = async (
  body: z.input<typeof schema>,
  init?: RequestInit,
): Promise<OutputType> => {
  const input = schema.parse(body);
  const result = await fetch("/_api/presence/shipping/quote", {
    method: "POST",
    headers: { "Content-Type": "application/json", ...(init?.headers ?? {}) },
    body: superjson.stringify(input),
    ...init,
  });
  if (!result.ok) {
    const errorObject = superjson.parse<{ error: string }>(await result.text());
    throw new Error(errorObject.error);
  }
  return superjson.parse<OutputType>(await result.text());
};