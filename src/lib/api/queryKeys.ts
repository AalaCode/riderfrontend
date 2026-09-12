export const queryKeys = {
  orders: ["orders"] as const,
  /** Nested under "orders" so existing invalidateQueries({queryKey: queryKeys.orders}) calls still catch it. */
  ordersFiltered: (filter: { date: string; riderId?: number }) =>
    ["orders", "filtered", filter.date, filter.riderId ?? null] as const,
  order: (code: number | string) => ["orders", code] as const,
  riders: ["riders"] as const,
  invoice: (code: number) => ["invoice", code] as const,
};
