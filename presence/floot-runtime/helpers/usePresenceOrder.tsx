import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getPresenceOrder } from "../endpoints/presence/order_GET.schema";
import { postCreatePresenceOrder } from "../endpoints/presence/order/create_POST.schema";

export const PRESENCE_ORDER_KEY = ["presence-order"] as const;

export function usePresenceOrder() {
  return useQuery({
    queryKey: PRESENCE_ORDER_KEY,
    queryFn: getPresenceOrder,
  });
}

export function useCreatePresenceOrder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postCreatePresenceOrder,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: PRESENCE_ORDER_KEY });
    },
  });
}