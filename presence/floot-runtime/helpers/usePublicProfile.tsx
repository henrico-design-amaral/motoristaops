import { useQuery } from "@tanstack/react-query";
import { getPublicProfile } from "../endpoints/public/profile_GET.schema";

export function usePublicProfile(slug: string | undefined) {
  return useQuery({
    queryKey: ["public-profile", slug],
    queryFn: () => getPublicProfile(slug!),
    enabled: Boolean(slug),
    retry: false,
  });
}