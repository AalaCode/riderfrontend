import type { ApiResponse } from "./order";

export interface InvoiceLineItem {
  productQty: string;
  productName: string;
  productDesc: string;
  productRate: string;
  productTotal: string;
}

/** One row per product line; header/total fields repeat on every row. */
export interface InvoiceData extends InvoiceLineItem {
  code: string;
  ordDate: string;
  ordTime: string;
  ordNo: string;
  cusName: string;
  cusCell: string;
  cusAddress: string;
  orderTotal: string;
  orderDisc: string;
  orderTax: string;
  netTotal: string;
  orderStatus: string;
  notes: string;
}

export type InvoiceResponse = ApiResponse<InvoiceData[]>;
