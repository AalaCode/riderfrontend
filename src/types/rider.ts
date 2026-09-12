import type { ApiResponse } from "./order";

export interface Rider {
  riderId: number;
  riderName: string;
  shortName: string;
  isActive: boolean;
}

export type RidersResponse = ApiResponse<Rider[]>;
