import { api } from "@/lib/axios";
import type {
  Order,
  OrderFilter,
  OrdersResponse,
  UpdateRiderPayload,
  UpdateStatusPayload,
} from "@/types/order";
import { daysSinceFixedEpoch } from "@/lib/dateDiff";

export const ordersApi = {
  /**
   * Initial load (no filter) and filtered loads both go through
   * /orders/orderfilter. Rider is only ever sent alongside `dy` — date is
   * mandatory for a rider filter to mean anything.
   */
  async getOrders(filter?: OrderFilter): Promise<Order[]> {
    const params: Record<string, number> = {};
    if (filter?.date) {
      params.dy = daysSinceFixedEpoch(filter.date);
      if (filter.riderId != null) {
        params.riderId = filter.riderId;
      }
    }
    const res = await api.get<OrdersResponse>("/orders/orderfilter", { params });
    console.log(res)
    if (!res.data?.success || !Array.isArray(res.data.data)) {
      throw new Error("Invalid orders response");
    }
    return res.data.data;
  },

  /**
   * HTTP method is centralized here — confirmed as PUT. If your backend
   * ever changes this, it's a one-line edit.
   */
  async updateRider(orderCode: number, riderId: number): Promise<void> {
    const payload: UpdateRiderPayload = { riderId };
    await api.put(`/orders/r/${orderCode}`, payload);
  },

  async updateStatus(orderCode: number, riderStatus: string): Promise<void> {
    const payload: UpdateStatusPayload = { riderStatus };
    await api.put(`/orders/s/${orderCode}`, payload);
  },
};
