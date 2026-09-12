import { useEffect, useRef } from "react";
import type { Order } from "@/types/order";
import { useRiders } from "@/hooks/useRiders";
import { useUpdateRider } from "@/hooks/useUpdateRider";


interface RiderUpdateModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
}

export function RiderUpdateModal({ order, isOpen, onClose }: RiderUpdateModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { data: riders, isLoading, isError, refetch } = useRiders(isOpen);
  const updateRider = useUpdateRider();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) dialog.showModal();
    if (!isOpen && dialog.open) dialog.close();
  }, [isOpen]);

  if (!order) return null;

  const handleSelect = (riderId: number) => {
    updateRider.mutate(
      { orderCode: order.code, riderId },
      { onSuccess: onClose }
    );
  };

  return (
    <dialog ref={dialogRef} className="modal modal-bottom sm:modal-middle" onClose={onClose}>
      <div className="modal-box">
        <h3 className="text-base font-semibold text-base-content">Assign rider</h3>
        <p className="mt-0.5 text-xs text-base-content/60">Order #{order.ordNo}</p>

        <div className="mt-4 max-h-80 space-y-1 overflow-y-auto">
          {isLoading && (
            <div className="space-y-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="skeleton h-12 w-full rounded-lg" />
              ))}
            </div>
          )}

          {isError && (
            <div className="py-6 text-center">
              <p className="text-sm text-base-content/60">Couldn&apos;t load riders.</p>
              <button type="button" className="btn btn-sm btn-ghost mt-2" onClick={() => refetch()}>
                Try again
              </button>
            </div>
          )}

          {!isLoading && !isError && riders?.length === 0 && (
            <p className="py-6 text-center text-sm text-base-content/60">No active riders right now.</p>
          )}

          {!isLoading &&
            !isError &&
            riders?.map((rider) => {
              const isSelected = order.riderShort === rider.shortName;
              return (
                <button
                  key={rider.riderId}
                  type="button"
                  disabled={updateRider.isPending}
                  onClick={() => handleSelect(rider.riderId)}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors disabled:opacity-60 ${
                    isSelected ? "bg-primary/10" : "hover:bg-base-200"
                  }`}
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-semibold text-primary">
                    {rider.shortName}
                  </span>
                  <span className="flex-1 text-sm font-medium text-base-content">
                    {rider.riderName}
                  </span>
                  {isSelected && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      className="h-5 w-5 text-primary"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                  )}
                </button>
              );
            })}
        </div>

        <div className="modal-action">
          <button type="button" className="btn btn-sm" onClick={onClose} disabled={updateRider.isPending}>
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
