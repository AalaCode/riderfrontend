import type { OrderFilter } from "@/types/order";
import { formatFilterDate } from "@/lib/format";

interface ActiveFilterBarProps {
  filter: OrderFilter;
  onClear: () => void;
}

export function ActiveFilterBar({ filter, onClear }: ActiveFilterBarProps) {
  return (
    <div className="flex items-center gap-2 px-4 pt-3">
      <span className="badge badge-outline gap-1.5 py-3 text-xs">
        {formatFilterDate(filter.date)}
        {filter.riderName && <span className="opacity-70">• {filter.riderName}</span>}
        <button
          type="button"
          onClick={onClear}
          aria-label="Clear filter"
          className="ml-1 leading-none opacity-70 hover:opacity-100"
        >
          ✕
        </button>
      </span>
    </div>
  );
}
