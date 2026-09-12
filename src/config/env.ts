/**
 * Central place to read environment variables so a missing/misspelled
 * `process.env.X` fails fast and loudly instead of silently at runtime.
 */
function required(name: string, value: string | undefined): string {
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export const env = {
  apiBaseUrl: required(
    "NEXT_PUBLIC_API_BASE_URL",
    process.env.NEXT_PUBLIC_API_BASE_URL
  ),
  nextAuthSecret: process.env.NEXTAUTH_SECRET ?? "",
};
