/**
 * `nbill` comes back from the API as a string and isn't guaranteed to be
 * a clean number (could be empty, undefined-ish, or contain stray
 * whitespace/commas). Parse defensively everywhere we touch it.
 */
export function parseBillAmount(nbill: string | null | undefined): number {
  if (!nbill) return 0;
  const cleaned = nbill.replace(/,/g, "").trim();
  const value = Number(cleaned);
  return Number.isFinite(value) ? value : 0;
}

export function formatCurrency(amount: number): string {
  return `Rs. ${amount.toLocaleString("en-PK", { maximumFractionDigits: 0 })}`;
}

/** "2026-09-07" -> "07 Sep 2026", for the active-filter label. */
export function formatFilterDate(isoDate: string): string {
  const [year, month, day] = isoDate.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}
