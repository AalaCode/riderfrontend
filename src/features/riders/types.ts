/** Domain types for the Branch module. */
export interface tableS {
  riderId: number;
  riderName: string;
  shortName: string;
  isActive: boolean
}

export interface riderGet {
  success: boolean;
  message: string;
  data: tableS
}

export interface paginatedResult<T> {
  data: T[];
  totalCount: number;
  page: number;
  pageSize: number;
}

export interface riderListParams {
  search?: string;
  page: number;
  pageSize: number;
  sortBy?: string;
  sortDirection?: "asc" | "desc";
}
