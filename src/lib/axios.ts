import axios, {
  AxiosError,
  type AxiosRequestConfig,
  type InternalAxiosRequestConfig,
} from "axios";
import { getSession, signOut } from "next-auth/react";
import { env } from "@/config/env";

/**
 * Shared Axios instance used by every feature's API module.
 *
 * Responsibilities:
 *  - Attach the current NextAuth access token as a Bearer header.
 *  - On a 401, transparently ask NextAuth for a fresh session (which, via
 *    the jwt() callback in auth-options.ts, refreshes the access token if
 *    needed) and retry the original request exactly once.
 *  - If the refresh itself failed (session.error === "RefreshAccessTokenError"),
 *    sign the user out and send them back to /login.
 *  - Normalize backend error responses into a single Error shape so callers
 *    (TanStack Query, forms) can just read `error.message`.
 */
export const api = axios.create({
  baseURL: env.apiBaseUrl,
  headers: { "Content-Type": "application/json" },
});

type RetryableConfig = InternalAxiosRequestConfig & { _retry?: boolean };

// Request interceptor — attach the current access token.
api.interceptors.request.use(async (config) => {
  const session = await getSession();
  if (session?.accessToken) {
    config.headers.Authorization = `Bearer ${session.accessToken}`;
  }
  return config;
});

// Avoids piling up multiple parallel refresh calls if several requests
// 401 at roughly the same time — they all await this one shared promise.
let pendingSessionRefresh: ReturnType<typeof getSession> | null = null;

async function getFreshSession() {
  if (!pendingSessionRefresh) {
    pendingSessionRefresh = getSession().finally(() => {
      pendingSessionRefresh = null;
    });
  }
  return pendingSessionRefresh;
}

// Response interceptor — global error handling + refresh-and-retry on 401.
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<{ message?: string }>) => {
    const originalRequest = error.config as RetryableConfig | undefined;

    const isUnauthorized = error.response?.status === 401;
    const alreadyRetried = originalRequest?._retry;

    if (isUnauthorized && originalRequest && !alreadyRetried) {
      originalRequest._retry = true;

      const session = await getFreshSession();

      if (!session || session.error === "RefreshAccessTokenError") {
        await signOut({ callbackUrl: "/login" });
        return Promise.reject(
          new Error("Your session has expired. Please sign in again.")
        );
      }

      originalRequest.headers = originalRequest.headers ?? {};
      originalRequest.headers.Authorization = `Bearer ${session.accessToken}`;
      return api(originalRequest as AxiosRequestConfig);
    }

    const message =
      error.response?.data?.message ??
      (error.code === "ECONNABORTED"
        ? "The request timed out. Please try again."
        : error.message) ??
      "Something went wrong. Please try again.";

    return Promise.reject(new Error(message));
  }
);
