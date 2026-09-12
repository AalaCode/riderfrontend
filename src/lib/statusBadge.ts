export function statusBadgeClass(status: string): string {
  const normalized = status.trim().toLowerCase();
  switch (normalized) {
    case "delivered":
      return "badge-success";
    case "cancelled":
      return "badge-error";
    case "accept":
    case "pickup":
      return "badge-info";
    case "pending":
      return "badge-warning";
    default:
      return "badge-ghost";
  }
}
