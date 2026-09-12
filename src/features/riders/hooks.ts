"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { riderApi } from "@/features/riders/api";
import { riderKeys } from "@/features/riders/queryKeys";
import type { riderGet,tableS, riderListParams, paginatedResult } from "@/features/riders/types";
import type { riderFormValues } from "@/features/riders/schema";

/** Fetches a paginated, searchable, sortable list of branches. */
export function useRiders(params: riderListParams) {
     return useQuery({
    queryKey: riderKeys.list(params),
    queryFn: () => riderApi.list(params),
    placeholderData: (previousData) => previousData, // keeps table stable while paging/sorting
  });
}

/** Fetches a single branch by id — used on the edit page. */
export function useRider(riderId: number | null) {
  return useQuery({
    queryKey: riderKeys.detail(riderId ?? -1),
    queryFn: () => riderApi.getById(riderId as number),
    enabled: riderId !== null,
  });
}

/** Creates a branch, then invalidates the list cache so the new row appears. */
export function useCreateRider() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: riderFormValues) => riderApi.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: riderKeys.lists() });
    },
  });
}

/** Updates a branch, then invalidates both the detail and list caches. */
export function useUpdateRider(riderId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: riderFormValues) => riderApi.update(riderId, payload),
    onSuccess: (updated) => {
      queryClient.setQueryData(riderKeys.detail(riderId), updated);
      queryClient.invalidateQueries({ queryKey: riderKeys.lists() });
    },
  });
}

/**
 * Deletes a branch with an optimistic update: the row disappears from every
 * cached list immediately, and rolls back automatically if the request fails.
 */
export function useDeleteRider() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (riderId: number) => riderApi.remove(riderId),

    onMutate: async (riderId) => {
      await queryClient.cancelQueries({ queryKey: riderKeys.lists() });

      const previousLists = queryClient.getQueriesData<paginatedResult<tableS>>({
        queryKey: riderKeys.lists(),
      });

      previousLists.forEach(([queryKey, data]) => {
        if (!data) return;
        queryClient.setQueryData<paginatedResult<tableS>>(queryKey, {
          ...data,
          data: data.data.filter((b) => b.riderId !== riderId),
          totalCount: Math.max(0, data.totalCount - 1),
        });
      });

      return { previousLists };
    },

    onError: (_err, _riderId, context) => {
      context?.previousLists.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data);
      });
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: riderKeys.lists() });
    },
  });
}
