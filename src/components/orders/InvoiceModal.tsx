import { useEffect, useRef } from "react";
import { useInvoice } from "@/hooks/useInvoice";
import { formatCurrency, parseBillAmount } from "@/lib/format";
import { statusBadgeClass } from "@/lib/statusBadge";

interface InvoiceModalProps {
  orderCode: number | null;
  isOpen: boolean;
  onClose: () => void;
}

export function InvoiceModal({ orderCode, isOpen, onClose }: InvoiceModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { data: items, isLoading, isError, refetch } = useInvoice(orderCode, isOpen);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) dialog.showModal();
    if (!isOpen && dialog.open) dialog.close();
  }, [isOpen]);

  const header = items?.[0];

  return (
    <dialog ref={dialogRef} className="modal modal-bottom sm:modal-middle" onClose={onClose}>
      <div className="modal-box">
        <h3 className="text-base font-semibold text-base-content">Invoice</h3>

        {isLoading && (
          <div className="mt-4 space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="skeleton h-4 w-full rounded" />
            ))}
          </div>
        )}

        {isError && !isLoading && (
          <div className="py-8 text-center">
            <p className="text-sm text-base-content/60">Couldn&apos;t load this invoice.</p>
            <button type="button" className="btn btn-sm btn-ghost mt-2" onClick={() => refetch()}>
              Try again
            </button>
          </div>
        )}

        {!isLoading && !isError && header && (
          <div className="mt-3 space-y-4">
            {/* Top: order + customer info */}
            <div className="rounded-xl border border-base-300 px-3 py-1">
              <div className="flex items-center justify-between border-b border-base-200 py-1">
                <span className="text-xs text-base-content/60">Order</span>
                <span className="text-sm font-semibold">#{header.ordNo}</span>
              </div>
              <div className="flex items-center justify-between border-b border-base-200 py-1">
                <span className="text-xs text-base-content/60">Date &amp; time</span>
                <span className="text-sm">{header.ordDate} • {header.ordTime}</span>
              </div>
              <div className="flex items-center justify-between border-b border-base-200 py-1">
                <span className="text-xs text-base-content/60">Customer</span>
                <span className="text-sm">{header.cusName}</span>
              </div>
              <div className="flex items-center justify-between border-b border-base-200 py-1">
                <span className="text-xs text-base-content/60">Cell</span>
                <span className="text-sm">{header.cusCell}</span>
              </div>
              <div className="flex items-center justify-between border-b border-base-200 py-1">
                <span className="text-xs text-base-content/60">Address</span>
                <span className="max-w-[65%] text-right text-sm">{header.cusAddress}</span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-xs text-base-content/60">Status</span>
                <span className={`badge badge-sm ${statusBadgeClass(header.orderStatus)}`}>
                  {header.orderStatus}
                </span>
              </div>
            </div>

            {/* Middle: line items (one or more products) */}
            <div className="rounded-xl border border-base-300 px-3 py-2">
              <p className="text-xs font-medium text-base-content/60">Items</p>
              <div className="mt-2 space-y-3">
                {items.map((item, i) => (
                  <div key={i} className="flex items-start justify-between gap-2 text-sm">
                    <div>
                      <p className="font-medium text-base-content">
                        {item.productQty} × {item.productName}
                      </p>
                      {item.productDesc && (
                        <p className="text-xs text-base-content/60">{item.productDesc}</p>
                      )}
                      <p className="text-xs text-base-content/60">
                        Rate: {formatCurrency(parseBillAmount(item.productRate))}
                      </p>
                    </div>
                    <span className="whitespace-nowrap font-medium text-base-content">
                      {formatCurrency(parseBillAmount(item.productTotal))}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom: totals */}
            <div className="rounded-xl border border-base-300 px-3 py-1">
              <div className="flex items-center justify-between border-b border-base-200 py-1">
                <span className="text-xs text-base-content/60">Order total</span>
                <span className="text-sm">{formatCurrency(parseBillAmount(header.orderTotal))}</span>
              </div>
              <div className="flex items-center justify-between border-b border-base-200 py-1">
                <span className="text-xs text-base-content/60">Discount</span>
                <span className="text-sm">{formatCurrency(parseBillAmount(header.orderDisc))}</span>
              </div>
              <div className="flex items-center justify-between border-b border-base-200 py-1">
                <span className="text-xs text-base-content/60">Tax</span>
                <span className="text-sm">{formatCurrency(parseBillAmount(header.orderTax))}</span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-sm font-semibold text-base-content">Net total</span>
                <span className="text-sm font-semibold text-base-content">
                  {formatCurrency(parseBillAmount(header.netTotal))}
                </span>
              </div>
              {header.notes && (
                <p className="border-t border-base-200 py-2 text-xs text-base-content/60">
                  Notes: {header.notes}
                </p>
              )}
            </div>
          </div>
        )}

        <div className="modal-action">
          <button type="button" className="btn btn-sm" onClick={onClose}>
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
