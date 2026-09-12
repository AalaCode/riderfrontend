import "next-auth";
import "next-auth/jwt";
import type { BackendUser } from "@/types/auth";

declare module "next-auth" {
  interface Session {
    accessToken: string;
    refreshToken: string;
    user: BackendUser & {
      id: string;
      email?: string | null;
      emailVerified?: Date | null;
      accessToken: string;
      refreshToken: string;
    };
    error?: "RefreshAccessTokenError";
  }

  interface User extends BackendUser {
    id: string;
    email?: string | null;
    emailVerified?: Date | null;
    accessToken: string;
    refreshToken: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string;
    refreshToken: string;
    accessTokenExpires: number;
    user: BackendUser & {
      id: string;
      accessToken: string;
      refreshToken: string;
    };
    error?: "RefreshAccessTokenError";
  }
}