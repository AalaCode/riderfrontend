"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

interface ProtectedRouteProps {
  children: ReactNode;
}

/**
 * Client-side route guard used by the (protected) layout — deliberately
 * NOT implemented as Next.js middleware, per project requirements.
 *
 * Handles three states:
 *  - loading: session hasn't resolved yet -> show a spinner, render nothing else.
 *  - unauthenticated OR refresh-token failure: redirect to /login.
 *  - authenticated: render the protected content.
 */
export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { data: session, status } = useSession();
  const router = useRouter();

  const sessionExpired = session?.error === "RefreshAccessTokenError";

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
    if (sessionExpired) {
      signOut({ callbackUrl: "/login" });
    }
  }, [status, sessionExpired, router]);

  if (status === "loading") {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (status === "unauthenticated" || sessionExpired) {
    return null;
  }

  return <>{children}</>;
}
