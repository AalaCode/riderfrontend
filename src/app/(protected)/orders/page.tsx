"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useOrders } from "@/hooks/useOrders";
import { parseBillAmount } from "@/lib/format";
import type { Order, OrderFilter } from "@/types/order";

import { OrdersHeader } from "@/components/orders/OrdersHeader";
import { OrderCard } from "@/components/orders/OrderCard";
import { OrdersFooter } from "@/components/orders/OrdersFooter";
import { OrderSkeletonList } from "@/components/orders/OrderSkeleton";
import { EmptyOrders } from "@/components/orders/EmptyOrders";
import { ErrorState } from "@/components/orders/ErrorState";
import { RiderUpdateModal } from "@/components/orders/RiderUpdateModal";
import { OrderStatusModal } from "@/components/orders/OrderStatusModal";
import { FilterModal } from "@/components/orders/FilterModal";
import { ActiveFilterBar } from "@/components/orders/ActiveFilterBar";
import { InvoiceModal } from "@/components/orders/InvoiceModal";

type ActiveModal = "rider" | "status" | "filter" | "invoice" | null;
           
export default function OrdersPage() {
  const router = useRouter();
  const [filter, setFilter] = useState<OrderFilter | null>(null);
  const { data: orders, isLoading, isError, isFetching, refetch } = useOrders(filter);

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [activeModal, setActiveModal] = useState<ActiveModal>(null);

  const { totalOrders, totalAmount,totalCancel,totalFoc } = useMemo(() => {
    const list = orders ?? [];
    return {
      totalOrders: list.length,
      // totalAmount: list.reduce((sum, order) => sum + parseBillAmount(order.nbill), 0),
    totalAmount: list.reduce((sum, order) => {
  if (order.orderStatus === 'Sale') {
    return sum + parseBillAmount(order.nbill);
  }
  return sum;
}, 0),
      totalCancel: list.reduce((count, order) => {
  if (order.orderStatus === 'Cancel') {
    return count + 1;
  }
  return count;
}, 0),
      totalFoc: list.reduce((count, order) => {
  if (order.orderStatus === 'FOC') {
    return count + 1;
  }
  return count;
}, 0),
    };
  }, [orders]);

  const closeModal = () => setActiveModal(null);

  return (
    <div className="flex min-h-dvh flex-col bg-base-200">
      <OrdersHeader
        onRefresh={() => refetch()}
        isRefreshing={isFetching}
        onFilterClick={() => setActiveModal("filter")}
        isFilterActive={filter !== null}
      />

      {filter && <ActiveFilterBar filter={filter} onClear={() => setFilter(null)} />}

      <main className="flex-1 pb-28">
        {isLoading && <OrderSkeletonList />}

        {isError && !isLoading && (
          <ErrorState
            message="We couldn't load your orders. Check your connection and try again."
            onRetry={() => refetch()}
          />
        )}

        {!isLoading && !isError && orders?.length === 0 && <EmptyOrders />}

        {!isLoading && !isError && orders && orders.length > 0 && (
          <div className="space-y-3 px-4 pt-3">
            {orders.map((order) => (
              <OrderCard
                key={order.code}
                order={order}
                onRiderUpdate={(o) => {
                  setSelectedOrder(o);
                  setActiveModal("rider");
                }}
                onStatusUpdate={(o) => {
                  setSelectedOrder(o);
                  setActiveModal("status");
                }}
              onViewFull={(o) => {
                  setSelectedOrder(o);
                  setActiveModal("invoice");
                }}
              />
            ))}
          </div>
        )}
      </main>

      {!isLoading && !isError && (
        <OrdersFooter totalOrders={totalOrders} totalAmount={totalAmount} totalCancel={totalCancel} totalFoc={totalFoc} />
      )}

      <RiderUpdateModal order={selectedOrder} isOpen={activeModal === "rider"} onClose={closeModal} />
      <OrderStatusModal order={selectedOrder} isOpen={activeModal === "status"} onClose={closeModal} />
      <FilterModal
        isOpen={activeModal === "filter"}
        currentFilter={filter}
        onApply={(f) => {
          setFilter(f);
          closeModal();
        }}
        onClear={() => setFilter(null)}
        onClose={closeModal}
      />

       <InvoiceModal
        orderCode={selectedOrder?.code ?? null}
        isOpen={activeModal === "invoice"}
        onClose={closeModal}
      />
    </div>
  );
}
