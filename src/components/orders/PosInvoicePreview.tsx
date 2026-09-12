import React from 'react';

// Data item ka interface definition
export interface InvoiceDataItem {
  key: string;
  value: string | number;
  section: 'top' | 'Detail' | 'bottom';
}

interface PosInvoiceProps {
  data: InvoiceDataItem[];
}

export const PosInvoicePreview: React.FC<PosInvoiceProps> = ({ data }) => {
  // Array data ko sections ke hisaab se filter aur parse karna
  const topData = data.reduce<Record<string, string | number>>((acc, item) => {
    if (item.section === 'top') acc[item.key] = item.value;
    return acc;
  }, {});

  const bottomData = data.reduce<Record<string, string | number>>((acc, item) => {
    if (item.section === 'bottom') acc[item.key] = item.value;
    return acc;
  }, {});

  // Product Details (Array format agar multiple products hon)
  const productDetails = data.filter((item) => item.section === 'Detail');

  // Simple key-value helper
  const getItem = (source: Record<string, string | number>, key: string, fallback = '') =>
    source[key] !== undefined ? source[key] : fallback;

  return (
    <div className="min-h-screen bg-base-200 p-2 sm:p-4 flex justify-center items-start">
      {/* Thermal Invoice Card Container */}
      <div className="card w-full max-w-sm bg-base-100 shadow-xl border border-base-300 font-mono text-sm">
        <div className="card-body p-4 gap-3">
          
          {/* Header & Store Branding */}
          <div className="text-center border-b border-dashed border-base-300 pb-3">
            <h2 className="text-xl font-bold tracking-wider uppercase">RECEIPT</h2>
            <p className="text-xs text-base-content/70">Inv #: {getItem(topData, 'code')}</p>
            <div className="badge badge-success badge-sm mt-1">{getItem(topData, 'orderStatus', 'Sale')}</div>
          </div>

          {/* Customer & Order Top Info */}
          <div className="text-xs space-y-1 border-b border-dashed border-base-300 pb-3">
            <div className="flex justify-between">
              <span className="text-base-content/60">Date & Time:</span>
              <span>{getItem(topData, 'ordDate')} {getItem(topData, 'ordTime')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-base-content/60">Order No:</span>
              <span className="font-bold">#{getItem(topData, 'ordNo')}</span>
            </div>
            <div className="divider my-1"></div>
            <div>
              <span className="text-base-content/60 block">Customer:</span>
              <span className="font-semibold block">{getItem(topData, 'cusName')}</span>
              <span className="block text-base-content/70">{getItem(topData, 'cusCell')}</span>
            </div>
            {getItem(topData, 'cusAddress') && (
              <div className="mt-1">
                <span className="text-base-content/60 block">Address:</span>
                <span className="text-xs leading-tight block">{getItem(topData, 'cusAddress')}</span>
              </div>
            )}
          </div>

          {/* Product Items Table */}
          <div className="border-b border-dashed border-base-300 pb-3">
            <table className="table table-xs w-full">
              <thead>
                <tr className="border-b border-base-300 text-base-content">
                  <th className="px-0">Item</th>
                  <th className="text-center px-1">Qty</th>
                  <th className="text-right px-0">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-0 py-2">
                    <span className="font-semibold block">{getItem(productDetails.reduce((a, c) => ({ ...a, [c.key]: c.value }), {}), 'productName')}</span>
                    {getItem(productDetails.reduce((a, c) => ({ ...a, [c.key]: c.value }), {}), 'productDesc') && (
                      <span className="text-[10px] text-base-content/60 block italic">
                        Note: {getItem(productDetails.reduce((a, c) => ({ ...a, [c.key]: c.value }), {}), 'productDesc')}
                      </span>
                    )}
                  </td>
                  <td className="text-center px-1 py-2 font-medium">
                    {getItem(productDetails.reduce((a, c) => ({ ...a, [c.key]: c.value }), {}), 'productQty')}
                  </td>
                  <td className="text-right px-0 py-2 font-semibold">
                    Rs. {getItem(productDetails.reduce((a, c) => ({ ...a, [c.key]: c.value }), {}), 'productTotal')}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Bottom Totals Summary */}
          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between">
              <span className="text-base-content/70">Sub Total:</span>
              <span>Rs. {getItem(bottomData, 'orderTotal')}</span>
            </div>
            {Number(getItem(bottomData, 'orderDisc')) > 0 && (
              <div className="flex justify-between text-error">
                <span>Discount:</span>
                <span>- Rs. {getItem(bottomData, 'orderDisc')}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-base-content/70">Tax:</span>
              <span>Rs. {getItem(bottomData, 'orderTax')}</span>
            </div>
            <div className="divider my-1"></div>
            <div className="flex justify-between text-base font-bold">
              <span>Net Total:</span>
              <span className="text-primary">Rs. {getItem(bottomData, 'netTotal')}</span>
            </div>
          </div>

          {/* Notes Section if available */}
          {getItem(bottomData, 'notes') && (
            <div className="alert alert-warning p-2 text-xs mt-2 rounded">
              <span><strong>Note:</strong> {getItem(bottomData, 'notes')}</span>
            </div>
          )}

          {/* Footer Note */}
          <div className="text-center text-[11px] text-base-content/50 mt-3 pt-2 border-t border-dotted border-base-300">
            Thank you for your order!
          </div>

        </div>
      </div>
    </div>
  );
};