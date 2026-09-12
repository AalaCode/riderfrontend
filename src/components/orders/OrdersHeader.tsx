import Link from 'next/link'; 
import { House } from 'lucide-react';
interface OrdersHeaderProps {
  onRefresh: () => void;
  isRefreshing: boolean;
  onFilterClick: () => void;
  isFilterActive: boolean;
}

export function OrdersHeader({
  onRefresh,
  isRefreshing,
  onFilterClick,
  isFilterActive,
}: OrdersHeaderProps) {
  return (
    // <header className="sticky top-0 z-20 flex items-center justify-between border-b border-base-300 bg-base-100/95 px-4 py-3 backdrop-blur">
    //   <h1 className="text-lg font-semibold text-base-content">Orders</h1>
     <header className="sticky top-0 z-20 flex items-center justify-between border-b border-base-300 bg-base-100/95 px-4 py-3 backdrop-blur">
      <h1 className="text-[24px] font-semibold text-[#27AE60]">
    <Link href="/dashboard" className="inline-flex items-center gap-2">
      <House color="#27AE60" size={24} />
      <span>Orders</span>
    </Link>
  </h1>
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={onFilterClick}
          aria-label="Filter orders"
          className="btn btn-ghost btn-sm btn-circle"
        >
          <span className="indicator">
            {isFilterActive && (
              <span className="indicator-item badge badge-primary badge-xs" />
            )}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.75}
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m9 12h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9 0H12m-8.25-6H12m8.25 0h3.75M12 12a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0"
              />
            </svg>
          </span>
        </button>
        <button
          type="button"
          onClick={onRefresh}
          aria-label="Refresh orders"
          className="btn btn-ghost btn-sm btn-circle"
          disabled={isRefreshing}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.75}
            className={`h-5 w-5 ${isRefreshing ? "animate-spin" : ""}`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>
        </button>
      </div>
    </header>
  );
}
