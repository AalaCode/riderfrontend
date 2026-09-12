"use client";

import type { ReactNode } from "react";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { DataTablePagination } from "@/components/data-table/DataTablePagination";

export interface DataTableColumn<T> {
  key: string;
  header: string;
  /** Custom cell renderer; falls back to `row[key]` if omitted. */
  render?: (row: T) => ReactNode;
  sortable?: boolean;
  className?: string;
}

export type SortDirection = "asc" | "desc";

interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  data: T[];
  keyField: keyof T;
  isLoading?: boolean;
  isError?: boolean;
  onRetry?: () => void;
  emptyMessage?: string;
  sortBy?: string;
  sortDirection?: SortDirection;
  onSortChange?: (key: string) => void;
  page: number;
  pageSize: number;
  totalCount: number;
  onPageChange: (page: number) => void;
}

/**
 * Generic, reusable data table: sorting, pagination, and loading/empty/error
 * states are all handled here so every module (branches, and future ones
 * like products/customers) shares one implementation.
 */
export function DataTable<T extends object>({
  columns,
  data,
  keyField,
  isLoading,
  isError,
  onRetry,
  emptyMessage = "No records found.",
  sortBy,
  sortDirection,
  onSortChange,
  page,
  pageSize,
  totalCount,
  onPageChange,
}: DataTableProps<T>) {
  if (isLoading) return <LoadingSpinner size="lg" label="Loading data..." />;
  if (isError) return <ErrorState onRetry={onRetry} />;
  if (data.length === 0) return <EmptyState title="Nothing here yet" description={emptyMessage} />;

  return (
    <div className="flex flex-col gap-4">
      <div className="overflow-x-auto rounded-box border border-base-300 bg-base-100">
        <table className="app-table table">
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col.key} className={col.className}>
                  {col.sortable ? (
                    <button
                      type="button"
                      className="flex items-center gap-1 font-semibold"
                      onClick={() => onSortChange?.(col.key)}
                    >
                      {col.header}
                      {sortBy === col.key ? (
                        sortDirection === "asc" ? (
                          <ArrowUp size={14} />
                        ) : (
                          <ArrowDown size={14} />
                        )
                      ) : (
                        <ArrowUpDown size={14} className="text-base-content/30" />
                      )}
                    </button>
                  ) : (
                    col.header
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={String(row[keyField])} className="hover">
                {columns.map((col) => (
                  <td key={col.key} className={col.className}>
                    {col.render
                      ? col.render(row)
                      : String((row as Record<string, unknown>)[col.key] ?? "")}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <DataTablePagination
        page={page}
        pageSize={pageSize}
        totalCount={totalCount}
        onPageChange={onPageChange}
      />
    </div>
  );
}
