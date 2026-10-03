import { useQuery } from "@tanstack/react-query";
import { getPresenceReadiness } from "../endpoints/presence/readiness_GET.schema";

export function usePresenceReadiness() {
  return useQuery({
    queryKey: ["presence-readiness"],
    queryFn: getPresenceReadiness,
    refetchInterval: 30_000,
  });
}