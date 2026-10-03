import { useQuery } from "@tanstack/react-query";
import { getPresencePreview } from "../endpoints/presence/preview_GET.schema";

export function usePresencePreview() {
  return useQuery({
    queryKey: ["presence-preview"],
    queryFn: getPresencePreview,
    retry: false,
  });
}