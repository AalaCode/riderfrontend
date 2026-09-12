"use client";

import type { ReactNode } from "react";
import { SessionProvider } from "@/components/providers/SessionProvider";
import { QueryProvider } from "@/components/providers/QueryProvider";

/**
 * Single place that composes every app-wide client provider. Kept separate
 * from layout.tsx (a server component) since providers must be client
 * components themselves.
 */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <QueryProvider>{children}</QueryProvider>
    </SessionProvider>
  );
}
