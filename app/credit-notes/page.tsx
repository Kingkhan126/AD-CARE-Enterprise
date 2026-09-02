'use client';

import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function CreditNotesPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-subtle">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <ArrowUpRight className="w-5 h-5 text-brand-600" />
          Credit Notes & Refund Adjustments
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Issue refund credits and invoice adjustment vouchers to customer accounts.
        </p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-subtle p-8 text-center space-y-2">
        <div className="text-xs font-bold text-slate-400">Zero active credit notes pending.</div>
        <p className="text-xs text-slate-500">Credit notes issued against open invoices will appear here.</p>
      </div>
    </div>
  );
}
