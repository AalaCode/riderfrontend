/**
 * Core auth-related types shared across the app.
 * Mirrors the shape returned by the backend's POST /api/v1/login endpoint.
 */

export interface BackendUser {
  userId: number;
  userName: string;
  role: string;
  /** Flat list of permission strings, e.g. "branches:view", "branches:create" */
  permissions: string[];
}

// export interface LoginResponse {
//   accessToken: string;
//   refreshToken: string;
//   user: BackendUser;
// }
export interface LoginData {
  accessToken: string;
  refreshToken: string;
  user: BackendUser;
}

export interface RefreshResponse {
  accessToken: string;
  refreshToken: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export type LoginResponse = ApiResponse<LoginData>;