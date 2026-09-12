/**
 * Minimal JWT payload decoder (no signature verification — this only ever
 * runs on tokens we already trust because they came straight from our own
 * backend's login/refresh response). Used purely to read the `exp` claim
 * so we know when to proactively refresh.
 */
export function decodeJwtExpiry(token: string): number | null {
  try {
    const payloadSegment = token.split(".")[1];
    if (!payloadSegment) return null;

    const normalized = payloadSegment.replace(/-/g, "+").replace(/_/g, "/");
    const json =
      typeof window === "undefined"
        ? Buffer.from(normalized, "base64").toString("utf-8")
        : atob(normalized);

    const payload = JSON.parse(json) as { exp?: number };
    return typeof payload.exp === "number" ? payload.exp * 1000 : null;
  } catch {
    return null;
  }
}
