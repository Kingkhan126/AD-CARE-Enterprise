'use client';

import React from 'react';
import Link from 'next/link';
import { FileText, Plus } from 'lucide-react';
import { useADCare } from '@/lib/context';

export default function QuotesPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-subtle">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-brand-600" />
            Quotes & Sales Estimates
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Issue sales proposals to prospective clients and convert accepted quotes directly into invoices.
          </p>
        </div>

        <Link
          href="/invoices/new"
          className="flex items-center gap-2 px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs rounded-xl shadow-sm transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Quote</span>
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-subtle p-8 text-center space-y-3">
        <FileText className="w-10 h-10 text-brand-500 mx-auto opacity-70" />
        <h3 className="font-bold text-slate-800 text-sm">Sales Quotes Hub</h3>
        <p className="text-xs text-slate-500 max-w-md mx-auto">
          Create proposal quotes for clients. Once accepted, one-click conversion automatically posts to AD CARE Invoices.
        </p>
      </div>
    </div>
  );
}
