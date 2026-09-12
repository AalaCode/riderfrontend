import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { decodeJwtExpiry } from "@/lib/jwt";
import type { LoginResponse, RefreshResponse } from "@/types/auth";

const API_BASE_URL = process.env.API_BASE_URL ?? process.env.NEXT_PUBLIC_API_BASE_URL!;

/**
 * Calls the backend refresh endpoint using the refresh token we already
 * have in the JWT. Returns a brand-new token object on success, or a token
 * flagged with `error: "RefreshAccessTokenError"` on failure so the client
 * knows to sign the user out.
 */
async function refreshAccessToken(token: any) {
  try {
    const { data } = await axios.post<RefreshResponse>(
      `${API_BASE_URL}/auth/refreshtoken`,
      { refreshToken: token.refreshToken }
    );

    return {
      ...token,
      accessToken: data.accessToken,
      refreshToken: data.refreshToken ?? token.refreshToken,
      accessTokenExpires:
        decodeJwtExpiry(data.accessToken) ?? Date.now() +  1000 * 60 * 60 * 24,
      error: undefined,
    };
  } catch {
    return {
      ...token,
      error: "RefreshAccessTokenError" as const,
    };
  }
}

/**
 * Auth.js is used purely as a session/JWT container here — it does NOT
 * own the actual credential check. The Credentials provider's `authorize`
 * simply forwards email/password to our own backend's /login endpoint and
 * wraps the response. No Next.js middleware.ts is involved anywhere;
 * route protection is done client-side by <ProtectedRoute>.
 */
export const { handlers, auth, signIn, signOut } = NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 7 days — bounded by refresh token lifetime on the backend
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        try {
          const { data } = await axios.post<LoginResponse>(
            `${API_BASE_URL}/auth/login`,
            {
              email: credentials.email,
              password: credentials.password,
            }
          );
          
          const accessToken = data.data.accessToken;
          const refreshToken = data.data.refreshToken;
          const user = data.data.user;

          return {
            id: String(user.userId),
            userId: user.userId,
            userName: user.userName,
            role: user.role,
            permissions: user.permissions,
            accessToken: accessToken,
            refreshToken: refreshToken,
          };
        } catch (err) {
          if (axios.isAxiosError(err)) {
            const message =
              (err.response?.data as { message?: string } | undefined)
                ?.message ?? "Invalid email or password";
            throw new Error(message);
          }
          throw new Error("Unable to reach the server. Please try again.");
        }
      },
    }),
  ],
  callbacks: {
    /**
     * Runs on sign-in and on every session read/update. This is where we:
     *  1. On first sign-in, seed the token with the backend's tokens + user.
     *  2. On subsequent calls, return the token as-is while it's still valid.
     *  3. Once the access token is expired (or close to it), transparently
     *     refresh it before it's ever handed back to the client.
     */
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          accessTokenExpires:
            decodeJwtExpiry(user.accessToken) ?? Date.now() + 15 * 60 * 1000,
          user: {
            userId: user.userId,
            userName: user.userName,
            role: user.role,
            permissions: user.permissions,
          },
        };
      }

      const isStillValid =
        typeof token.accessTokenExpires === "number" &&
        Date.now() < token.accessTokenExpires - 60_000; // 60s safety buffer

      if (isStillValid) {
        return token;
      }

      return refreshAccessToken(token);
    },

    /** Shapes what `useSession()` / `auth()` actually expose to the app. */
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.user = token.user as any;
      session.error = token.error;
      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
  trustHost: true,
});