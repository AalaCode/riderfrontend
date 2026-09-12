export function OrderSkeleton() {
  return (
    <div className="rounded-2xl border border-base-300 bg-base-100 p-4">
      <div className="flex items-start justify-between">
        <div className="skeleton h-4 w-20 rounded" />
        <div className="skeleton h-4 w-24 rounded" />
      </div>
      <div className="mt-3 space-y-2">
        <div className="skeleton h-4 w-40 rounded" />
        <div className="skeleton h-3 w-28 rounded" />
        <div className="skeleton h-3 w-32 rounded" />
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div className="skeleton h-4 w-16 rounded" />
        <div className="skeleton h-4 w-20 rounded" />
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2">
        <div className="skeleton h-9 rounded-lg" />
        <div className="skeleton h-9 rounded-lg" />
        <div className="skeleton h-9 rounded-lg" />
      </div>
    </div>
  );
}

export function OrderSkeletonList({ count = 4 }: { count?: number }) {
  return (
    <div className="space-y-3 px-4 pt-3">
      {Array.from({ length: count }).map((_, i) => (
        <OrderSkeleton key={i} />
      ))}
    </div>
  );
}
