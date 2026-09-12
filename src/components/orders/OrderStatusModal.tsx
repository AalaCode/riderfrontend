import { useEffect, useRef } from "react";
import type { Order } from "@/types/order";
import { ORDER_STATUSES } from "@/types/order";
import { useUpdateStatus } from "@/hooks/useUpdateStatus";

interface OrderStatusModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
}

export function OrderStatusModal({ order, isOpen, onClose }: OrderStatusModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const updateStatus = useUpdateStatus();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) dialog.showModal();
    if (!isOpen && dialog.open) dialog.close();
  }, [isOpen]);

  if (!order) return null;

  const handleSelect = (status: string) => {
    updateStatus.mutate(
      { orderCode: order.code, status },
      { onSuccess: onClose }
    );
  };

  return (
    <dialog ref={dialogRef} className="modal modal-bottom sm:modal-middle" onClose={onClose}>
      <div className="modal-box">
        <h3 className="text-base font-semibold text-base-content">Update status</h3>
        <p className="mt-0.5 text-xs text-base-content/60">Order #{order.ordNo}</p>

        <div className="mt-4 space-y-1">
          {ORDER_STATUSES.map((status) => {
            const isSelected = order.riderStatus === status;
            return (
              <button
                key={status}
                type="button"
                disabled={updateStatus.isPending}
                onClick={() => handleSelect(status)}
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors disabled:opacity-60 ${
                  isSelected ? "bg-primary/10 text-primary" : "text-base-content hover:bg-base-200"
                }`}
              >
                {status}
                {isSelected && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    className="h-5 w-5"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                )}
              </button>
            );
          })}
        </div>

        <div className="modal-action">
          <button type="button" className="btn btn-sm" onClick={onClose} disabled={updateStatus.isPending}>
            Close
          </button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button type="submit">close</button>
      </form>
    </dialog>
  );
}
