import { useQuery } from "@tanstack/react-query";
import { ridersApi } from "@/lib/api/riders";
import { queryKeys } from "@/lib/api/queryKeys";

export function useRiders(enabled: boolean) {
  return useQuery({
    queryKey: queryKeys.riders,
    queryFn: ridersApi.getRiders,
    enabled,
    staleTime: 4 *60 * 60 * 1000,
  });
}
