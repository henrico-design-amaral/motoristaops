import { z } from "zod";
import superjson from "superjson";

export const schema = z.object({
  sku: z.string().min(1).max(80),
  version: z.number().int().positive(),
});

export type OutputType = {
  orderId: string;
  state: "PRODUCT_SELECTED";
  amountCents: number;
  currency: string;
};

export const postCreatePresenceOrder = async (
  body: z.infer<typeof schema>,
  init?: RequestInit,
): Promise<OutputType> => {
  const input = schema.parse(body);
  const result = await fetch("/_api/presence/order/create", {
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