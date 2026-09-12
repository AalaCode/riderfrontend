import type { Order } from "@/types/order";
import { formatCurrency, parseBillAmount } from "@/lib/format";
import { statusBadgeClass } from "@/lib/statusBadge";
import { OrderActions } from "./OrderActions";

interface OrderCardProps {
  order: Order;
  onRiderUpdate: (order: Order) => void;
  onStatusUpdate: (order: Order) => void;
  onViewFull: (order: Order) => void;
}

export function OrderCard({ order, onRiderUpdate, onStatusUpdate, onViewFull }: OrderCardProps) {
  const amount = formatCurrency(parseBillAmount(order.nbill));

  return (
    <div className="rounded-2xl border border-base-300 bg-base-100 p-4 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <span className="text-gray-900 font-extrabold text-[14px]">#{order.ordNo}
          <span> {order.orderStatus}</span>
        </span>
          <span className="text-gray-900 font-extrabold text-[14px]">
          {order.ordTime}
        </span>
         <span className="text-gray-900 font-extrabold text-[14px]">
          {order.timeDiff}
        </span>
         </div>
           {/* <span className="mt-2 flex items-center gap-2">
       
        <span className={` text-gray-900 font-extrabold badge badge-md ${statusBadgeClass(order.riderStatus)}`}>
          {order.riderStatus}
        </span>
      </span> */}
         
     
      

      <div className="flex items-start justify-between gap-2 mt-2 space-y-0.5">
        <p className="font-extrabold" style={{ color: '#27AE60' }}>{order.cusName}</p>
          <p className="font-extrabold">{order.cusCell.substring(0,4) + "-" +order.cusCell.substring(4)}</p>
             </div>
 <div className="flex items-start justify-between gap-2 mt-2 space-y-0.5">
        <p className="font-extrabold" >{order.cusZone}</p>
          <p className="font-extrabold text-red-800">  <span className="text-xs text-base-content/70">
          Rider: </span> {order.riderShort ?? "-"}</p>
             </div>
      <div className="mt-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
        {/* <span className="text-xs text-base-content/60">Status</span> */}
       <span className={` text-gray-900 font-extrabold badge badge-md ${statusBadgeClass(order.riderStatus)}`}>
          {order.riderStatus}
        </span>
      </div>
       
       <span className="text-[20px] font-extrabold  text-green-900 ">
         <span className="text-sm font-semibold text-base-content">Rs. </span>
        {order.orderStatus === 'FOC' ? 'FOC' : order.nbill}</span>
      </div>
      
<div>
   <span className="text-sm font-bold text-red-500 ">{order.notes}</span>
</div>
     

      <OrderActions
        onRiderUpdate={() => onRiderUpdate(order)}
        onStatusUpdate={() => onStatusUpdate(order)}
        onViewFull={() => onViewFull(order)}
      />
    </div>
  );
}
