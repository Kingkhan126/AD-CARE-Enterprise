'use client';

import React from 'react';
import { CreditCard, CheckCircle2 } from 'lucide-react';
import { useADCare } from '@/lib/context';

export default function PaymentsPage() {
  const { invoices } = useADCare();
  const paidInvoices = invoices.filter(i => i.amountPaid > 0);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-subtle">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-emerald-600" />
          Customer Payments Received
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Historical log of customer payment transactions clearing uncollected receivables.
        </p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-subtle overflow-hidden">
        <table className="w-full text-xs text-left">
          <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold tracking-wider border-b border-slate-200">
            <tr>
              <th className="p-4">Invoice #</th>
              <th className="p-4">Customer</th>
              <th className="p-4 text-right">Amount Received</th>
              <th className="p-4 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-800">
            {paidInvoices.map((inv) => (
              <tr key={inv.id} className="hover:bg-slate-50">
                <td className="p-4 font-mono font-bold text-emerald-600">{inv.invoiceNumber}</td>
                <td className="p-4 font-semibold text-slate-900">{inv.customerName}</td>
                <td className="p-4 text-right font-mono font-bold text-slate-900">
                  ${inv.amountPaid.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </td>
                <td className="p-4 text-center">
                  <span className="px-2.5 py-1 text-[10px] font-bold rounded-full bg-emerald-100 text-emerald-700">
                    Cleared
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
