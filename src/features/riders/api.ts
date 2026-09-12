import { api } from "@/lib/axios";
import type { riderGet, riderListParams, paginatedResult } from "@/features/riders/types";
import type { riderFormValues } from "@/features/riders/schema";

/**
 * All HTTP calls for the Branch module live here — hooks (useriders, etc.)
 * call these functions, never axios directly. Keeps the API surface
 * swappable/testable and consistent with future modules.
 *
 * Adjust the query param / response shape here if your backend's actual
 * pagination contract differs (e.g. `pageNumber` instead of `page`).
 */
export const riderApi = {
  list: async (params: riderListParams): Promise<paginatedResult<riderGet>> => {
    const { data } = await api.get<paginatedResult<riderGet>>("/riders", {
      params: {
        search: params.search || undefined,
        page: params.page,
        pageSize: params.pageSize,
        sortBy: params.sortBy,
        sortDirection: params.sortDirection,
      },
    });
    return data;
  },

  getById: async (riderId: number): Promise<riderGet> => {
    const { data } = await api.get<riderGet>(`/riders/${riderId}`);
    return data;
  },

  create: async (payload: riderFormValues): Promise<riderGet> => {
    const { data } = await api.post<riderGet>("/riders", payload);
    return data;
  },

  update: async (riderId: number, payload: riderFormValues): Promise<riderGet> => {
    const { data } = await api.put<riderGet>(`/riders/${riderId}`, payload);
    return data;
  },

  remove: async (riderId: number): Promise<void> => {
    await api.delete(`/riders/${riderId}`);
  },
};
