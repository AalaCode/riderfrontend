const FIXED_EPOCH_UTC = Date.UTC(2013, 0, 1); // 01/01/2013
const MS_PER_DAY = 24 * 60 * 60 * 1000;

export function daysSinceFixedEpoch(isoDate: string): number {
  const [year, month, day] = isoDate.split("-").map(Number);
  const selectedUTC = Date.UTC(year, month - 1, day);
  return Math.round((selectedUTC - FIXED_EPOCH_UTC) / MS_PER_DAY);
}