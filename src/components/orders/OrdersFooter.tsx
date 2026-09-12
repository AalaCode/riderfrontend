
import { formatCurrency } from "@/lib/format";

interface OrdersFooterProps {
  totalOrders: number;
  totalAmount: number;
  totalFoc: number;
  totalCancel : number;
}

export function OrdersFooter({
  totalOrders,
  totalAmount,
  totalFoc,
  totalCancel

}: OrdersFooterProps) {
  return (
    <footer
      className="fixed inset-x-0 bottom-0 z-20 border-t border-base-300 bg-base-100 px-4 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]"
      style={{ boxShadow: "0 -2px 8px rgba(0,0,0,0.04)" }}
    >
      <div className="mx-auto flex max-w-xl items-center justify-between">
        <div>
          <p className="text-gray-950 uppercase font-extrabold text-[14px] tracking-wide ">Total Orders</p>
          <p className="text-sm font-semibold text-base-content">{totalOrders}</p>
        </div>
         <div>
          <p className="text-gray-950 uppercase font-extrabold text-[14px] tracking-wide ">Total FOC / Cancel</p>
          <p className="text-sm font-semibold text-base-content">{totalFoc + totalCancel}</p>
        </div>
        {/* <div>
          <p className="text-gray-950 uppercase font-extrabold text-[14px] tracking-wide ">Total Cancel</p>
          <p className="text-sm font-semibold text-base-content">{totalCancel}</p>
        </div> */}
        <div className="text-right">
          <p className="text-gray-950 uppercase font-extrabold text-[14px] tracking-wide " >Sales Amount</p>
          <p className="font-extrabold text-[20px]" style={{ color: '#27AE60' }}>{formatCurrency(totalAmount)}</p>
        </div>
      </div>
    </footer>
  );
}