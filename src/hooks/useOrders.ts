import { useQuery } from "@tanstack/react-query";
import { ordersApi } from "@/lib/api/orders";
import { queryKeys } from "@/lib/api/queryKeys";
import type { OrderFilter } from "@/types/order";

export function useOrders(filter?: OrderFilter | null) {
  return useQuery({
    queryKey: filter?.date ? queryKeys.ordersFiltered(filter) : queryKeys.orders,
    queryFn: () => ordersApi.getOrders(filter ?? undefined),
    staleTime: 10000,
    refetchOnWindowFocus: true, 
  });
}
