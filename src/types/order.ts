/**
 * Order domain types.
 *
 * Adjust the import path (`@/types/order`) if your project's path alias
 * differs from the `@/*` -> `src/*` default.
 */

/** Two-letter order status codes returned by the list/detail endpoints. */
export type OrderStatusCode = "A" | "C" | "P" | "D" | "X" | string;

export interface Order {
  code: number;
  ordDate: string;
  ordTime: string;
  ordNo: string;
  cusName: string;
  cusCell: string;
  cusZone: string;
  /** Bill amount as a string from the API — parse before doing math on it. */
  nbill: string;
  riderShort: string | null;
  riderStatus: string;
  orderStatus: OrderStatusCode;
   timeDiff:string;
   notes:string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export type OrdersResponse = ApiResponse<Order[]>;

/** Payload for PUT /orders/r/{orderCode} */
export interface UpdateRiderPayload {
  riderId: number;
}

/** The four allowed order statuses (hard-coded per spec). */
export const ORDER_STATUSES = ["Accept", "Pickup", "Delivered", "Cancelled"] as const;
export type OrderRiderStatus = (typeof ORDER_STATUSES)[number];

/** Payload for PUT /orders/s/{orderCode} */
export interface UpdateStatusPayload {
  riderStatus: string;
}
export interface OrderFilter {
  date: string;       // yyyy-mm-dd
  riderId?: number;
  riderName?: string; // display-only, never sent to the API
}
