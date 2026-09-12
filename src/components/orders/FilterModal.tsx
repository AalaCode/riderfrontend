import { useEffect, useRef, useState } from "react";
import type { OrderFilter } from "@/types/order";
import { useRiders } from "@/hooks/useRiders";

interface FilterModalProps {
  isOpen: boolean;
  currentFilter: OrderFilter | null;
  onApply: (filter: OrderFilter) => void;
  onClear: () => void;
  onClose: () => void;
}

export function FilterModal({
  isOpen,
  currentFilter,
  onApply,
  onClear,
  onClose,
}: FilterModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { data: riders, isLoading: isLoadingRiders } = useRiders(isOpen);

  const [date, setDate] = useState(currentFilter?.date ?? "");
  const [riderId, setRiderId] = useState<number | "">(currentFilter?.riderId ?? "");

  useEffect(() => {
    if (isOpen) {
      setDate(currentFilter?.date ?? "");
      setRiderId(currentFilter?.riderId ?? "");
    }
  }, [isOpen, currentFilter]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) dialog.showModal();
    if (!isOpen && dialog.open) dialog.close();
  }, [isOpen]);

  const handleApply = () => {
    if (!date) return;
    const selectedRider = riders?.find((r) => r.riderId === riderId);
    onApply({
      date,
      riderId: riderId === "" ? undefined : riderId,
      riderName: selectedRider?.riderName,
    });
  };

  return (
    <dialog ref={dialogRef} className="modal modal-bottom sm:modal-middle" onClose={onClose}>
      <div className="modal-box">
        <h3 className="text-base font-semibold text-base-content">Filter orders</h3>

        <div className="form-control mt-4">
          <label className="label py-1" htmlFor="filter-date">
            <span className="label-text text-sm">Date (required)</span>
          </label>
          <input
            id="filter-date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="input input-bordered input-sm w-full"
          />
        </div>

        <div className="form-control mt-3">
          <label className="label py-1" htmlFor="filter-rider">
            <span className="label-text text-sm">Rider (optional)</span>
          </label>
          <select
            id="filter-rider"
            value={riderId}
            onChange={(e) => setRiderId(e.target.value === "" ? "" : Number(e.target.value))}
            className="select select-bordered select-sm w-full"
            disabled={isLoadingRiders}
          >
            <option value="">Any rider</option>
            {riders?.map((rider) => (
              <option key={rider.riderId} value={rider.riderId}>
                {rider.riderName}
              </option>
            ))}
          </select>
        </div>

        <div className="modal-action justify-between">
          {currentFilter && (
            <button
              type="button"
              className="btn btn-sm btn-ghost"
              onClick={() => {
                onClear();
                onClose();
              }}
            >
              Clear filter
            </button>
          )}
          <div className="ml-auto flex gap-2">
            <button type="button" className="btn btn-sm" onClick={onClose}>
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-sm btn-primary"
              onClick={handleApply}
              disabled={!date}
            >
              Apply
            </button>
          </div>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button type="submit">close</button>
      </form>
    </dialog>
  );
}
