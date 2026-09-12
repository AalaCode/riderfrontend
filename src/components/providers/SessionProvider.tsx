"use client";

import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";
import type { ReactNode } from "react";

/**
 * Thin client-component wrapper — NextAuth's SessionProvider must be
 * rendered from a client component, so we can't use it directly inside
 * the (server) root layout.
 */
export function SessionProvider({ children }: { children: ReactNode }) {
  return <NextAuthSessionProvider>{children}</NextAuthSessionProvider>;
}
