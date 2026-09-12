"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface DataTablePaginationProps {
  page: number;
  pageSize: number;
  totalCount: number;
  onPageChange: (page: number) => void;
}

/** Simple prev/next pagination footer shared by every DataTable instance. */
export function DataTablePagination({
  page,
  pageSize,
  totalCount,
  onPageChange,
}: DataTablePaginationProps) {
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
  const from = totalCount === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, totalCount);

  return (
    <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
      <p className="text-sm text-base-content/60">
        Showing <span className="font-medium text-base-content">{from}</span>–
        <span className="font-medium text-base-content">{to}</span> of{" "}
        <span className="font-medium text-base-content">{totalCount}</span>
      </p>
      <div className="join">
        <button
          className="join-item btn btn-sm"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          aria-label="Previous page"
        >
          <ChevronLeft size={16} />
        </button>
        <button className="join-item btn btn-sm pointer-events-none">
          Page {page} of {totalPages}
        </button>
        <button
          className="join-item btn btn-sm"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          aria-label="Next page"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
