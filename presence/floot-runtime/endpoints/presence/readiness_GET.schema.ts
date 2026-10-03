import superjson from "superjson";

export type ReadinessItem = {
  key: string;
  label: string;
  ready: boolean;
  detail: string;
};

export type OutputType = {
  readyForFirstCustomer: boolean;
  blockers: number;
  items: ReadinessItem[];
};

export const getPresenceReadiness = async (): Promise<OutputType> => {
  const result = await fetch("/_api/presence/readiness");
  if (!result.ok) {
    const errorObject = superjson.parse<{ error: string }>(await result.text());
    throw new Error(errorObject.error);
  }
  return superjson.parse<OutputType>(await result.text());
};