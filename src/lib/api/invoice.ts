import {api} from "@/lib/axios";
import type { InvoiceData, InvoiceResponse } from "@/types/invoice";

export const invoiceApi = {
  async getInvoice(orderCode: number): Promise<InvoiceData[]> {
    const res = await api.get<InvoiceResponse>(`/orders/${orderCode}`);
    if (!res.data?.success || !Array.isArray(res.data.data)) {
      throw new Error("Invalid invoice response");
    }
    return res.data.data;
  },
};
