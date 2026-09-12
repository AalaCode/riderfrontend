import { api } from "@/lib/axios";
import type { Rider, RidersResponse } from "@/types/rider";

export const ridersApi = {
  async getRiders(): Promise<Rider[]> {
    const res = await api.get<RidersResponse>("/riders");
    if (!res.data?.success || !Array.isArray(res.data.data)) {
      throw new Error("Invalid riders response");
    }
    return res.data.data.filter((rider) => rider.isActive === true);
  },
};
