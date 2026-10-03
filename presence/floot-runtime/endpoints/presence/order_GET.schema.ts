import superjson from "superjson";

export type OrderSummary = {
  id: string;
  state: string;
  productSku: string | null;
  productVersion: number | null;
  amountCents: number | null;
  currency: string;
  slug: string | null;
  publicationStatus: string | null;
  paymentStatus: string | null;
  shipmentStatus: string | null;
  trackingCode: string | null;
};

export type OutputType = {
  order: OrderSummary | null;
  catalog: {
    sku: string;
    version: number;
    name: string;
    status: string;
    priceCents: number | null;
    currency: string;
  }[];
};

export const getPresenceOrder = async (): Promise<OutputType> => {
  const result = await fetch("/_api/presence/order");
  if (!result.ok) {
    const errorObject = superjson.parse<{ error: string }>(await result.text());
    throw new Error(errorObject.error);
  }
  return superjson.parse<OutputType>(await result.text());
};