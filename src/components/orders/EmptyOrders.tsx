export function EmptyOrders() {
  return (
    <div className="flex flex-col items-center justify-center px-8 py-20 text-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        className="h-14 w-14 text-base-content/30"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 9h16.5M3.75 9a1.5 1.5 0 0 1-1.5-1.5V6a1.5 1.5 0 0 1 1.5-1.5h16.5A1.5 1.5 0 0 1 21.75 6v1.5a1.5 1.5 0 0 1-1.5 1.5m-16.5 0v9a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V9M9 13.5h6"
        />
      </svg>
      <h2 className="mt-4 text-base font-semibold text-base-content">No orders found</h2>
      <p className="mt-1 text-sm text-base-content/60">
        New orders will show up here as soon as they come in.
      </p>
    </div>
  );
}
