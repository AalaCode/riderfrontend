import { useMutation, useQueryClient } from "@tanstack/react-query";
// Swap this import for whichever toast helper your project already uses
// if it isn't react-hot-toast.
import toast from "react-hot-toast";
import { ordersApi } from "@/lib/api/orders";
import { queryKeys } from "@/lib/api/queryKeys";

interface UpdateRiderVars {
  orderCode: number;
  riderId: number;
}

export function useUpdateRider() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ orderCode, riderId }: UpdateRiderVars) =>
      ordersApi.updateRider(orderCode, riderId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.orders });
      toast.success("Rider updated");
    },
    onError: () => {
      toast.error("Couldn't update the rider. Please try again.");
    },
  });
}
