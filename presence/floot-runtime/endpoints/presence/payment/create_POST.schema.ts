import { z } from "zod";
import superjson from "superjson";

export const schema = z.object({
  orderId: z.union([z.string(), z.number()]).transform(String),
});

export type OutputType = {
  orderId: string;
  providerOrderId: string;
  checkoutUrl: string;
  state: "PAYMENT_PENDING";
};

export const postCreatePresencePayment = async (
  body: z.input<typeof schema>,
  init?: RequestInit,
): Promise<OutputType> => {
  const validatedInput = schema.parse(body);
  const result = await fetch("/_api/presence/payment/create", {
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