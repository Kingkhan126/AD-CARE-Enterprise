'use client';

import React from 'react';
import Link from 'next/link';
import { TrendingUp, ArrowLeft, Printer, Download, CheckCircle2 } from 'lucide-react';
import { useADCare } from '@/lib/context';

export default function ProfitLossPage() {
  const { getProfitAndLoss, orgSettings } = useADCare();
  const pnl = getProfitAndLoss();

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      <div className="flex items-center justify-between">
        <Link href="/reports" className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Financial Reports</span>
        </Link>
        <button
          onClick={() => window.print()}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-brand-600 hover:bg-brand-700 text-white rounded-lg text-xs font-bold shadow-sm"
        >
          <Printer className="w-4 h-4" /> Print / Export PDF
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-subtle p-8 space-y-6">
        <div className="text-center border-b border-slate-200 pb-6 space-y-1">
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">{orgSettings.name}</h2>
          <div className="text-sm font-bold text-brand-600 uppercase tracking-widest">Profit & Loss Statement (Income Statement)</div>
          <p className="text-xs text-slate-500 font-mono">Fiscal Period: Jan 1, 2026 – Dec 31, 2026 (USD $)</p>
        </div>

        {/* Operating Revenue */}
        <div className="space-y-3">
          <div className="text-xs font-bold text-slate-900 uppercase tracking-wider bg-slate-100 p-2 rounded">
            Operating Revenue & Sales Income
          </div>
          <div className="space-y-2 text-xs px-2">
            {pnl.revenueAccounts.map(r => (
              <div key={r.code} className="flex justify-between text-slate-700">
                <span>[{r.code}] {r.name}</span>
                <span className="font-mono font-bold">${r.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              </div>
            ))}
            <div className="flex justify-between font-bold text-slate-900 border-t border-slate-200 pt-2">
              <span>Total Operating Revenue:</span>
              <span className="font-mono text-emerald-600">${pnl.totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
            </div>
          </div>
        </div>

        {/* Operating Expenses */}
        <div className="space-y-3 pt-4 border-t border-slate-200">
          <div className="text-xs font-bold text-slate-900 uppercase tracking-wider bg-slate-100 p-2 rounded">
            Operating Expenses & Overhead
          </div>
          <div className="space-y-2 text-xs px-2">
            {pnl.expenseAccounts.map(e => (
              <div key={e.code} className="flex justify-between text-slate-700">
                <span>[{e.code}] {e.name}</span>
                <span className="font-mono font-bold">${e.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              </div>
            ))}
            <div className="flex justify-between font-bold text-slate-900 border-t border-slate-200 pt-2">
              <span>Total Operating Expenses:</span>
              <span className="font-mono text-rose-600">${pnl.totalExpenses.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
            </div>
          </div>
        </div>

        {/* Net Income Summary */}
        <div className="bg-slate-900 text-white p-4 rounded-xl flex items-center justify-between text-sm">
          <div>
            <div className="font-bold">NET OPERATING INCOME</div>
            <div className="text-[11px] text-slate-400">Total Revenue minus Total Operating Expenses</div>
          </div>
          <div className="text-xl font-extrabold font-mono text-emerald-400">
            ${pnl.netIncome.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </div>
        </div>
      </div>
    </div>
  );
}
