import { useQuery } from "@tanstack/react-query";
import { invoiceApi } from "@/lib/api/invoice";
import { queryKeys } from "@/lib/api/queryKeys";

export function useInvoice(orderCode: number | null, enabled: boolean) {
  return useQuery({
    queryKey: queryKeys.invoice(orderCode ?? 0),
    queryFn: () => invoiceApi.getInvoice(orderCode as number),
    enabled: enabled && orderCode != null,
    staleTime: 45 * 1000,
  });
}
