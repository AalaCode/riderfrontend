import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { ordersApi } from "@/lib/api/orders";
import { queryKeys } from "@/lib/api/queryKeys";

interface UpdateStatusVars {
  orderCode: number;
  status: string;
}

export function useUpdateStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ orderCode, status }: UpdateStatusVars) =>
      ordersApi.updateStatus(orderCode, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.orders });
      toast.success("Status updated");
    },
    onError: () => {
      toast.error("Couldn't update the status. Please try again.");
    },
  });
}
