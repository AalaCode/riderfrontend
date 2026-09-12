 import type { riderListParams } from "@/features/riders/types";

/**
 * Centralized query key factory — avoids typos/duplication across hooks
 * and makes cache invalidation ("invalidate everything under 'rideres'")
 * straightforward and consistent.
 */
export const riderKeys = {
  all: ["riders"] as const,
  lists: () => [...riderKeys.all, "list"] as const,
 list: (params: riderListParams) => [...riderKeys.lists(), params] as const,
  details: () => [...riderKeys.all, "detail"] as const,
  detail: (id: number) => [...riderKeys.details(), id] as const,
};
