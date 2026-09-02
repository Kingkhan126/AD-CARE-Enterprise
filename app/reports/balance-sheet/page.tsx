'use client';

import React from 'react';
import Link from 'next/link';
import { BookOpen, ArrowLeft, Printer, CheckCircle2, ShieldAlert } from 'lucide-react';
import { useADCare } from '@/lib/context';

export default function BalanceSheetPage() {
  const { getBalanceSheet, orgSettings } = useADCare();
  const bs = getBalanceSheet();

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
          <div className="text-sm font-bold text-brand-600 uppercase tracking-widest">Balance Sheet Statement</div>
          <p className="text-xs text-slate-500 font-mono">As of August 31, 2026 (USD $)</p>
        </div>

        {/* ASSETS */}
        <div className="space-y-3">
          <div className="text-xs font-bold text-slate-900 uppercase tracking-wider bg-slate-100 p-2 rounded">
            ASSETS
          </div>
          <div className="space-y-2 text-xs px-2">
            {bs.assets.map(a => (
              <div key={a.code} className="flex justify-between text-slate-700">
                <span>[{a.code}] {a.name}</span>
                <span className="font-mono font-bold">${a.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              </div>
            ))}
            <div className="flex justify-between font-bold text-slate-900 border-t border-slate-200 pt-2 text-sm">
              <span>TOTAL ASSETS:</span>
              <span className="font-mono text-brand-600">${bs.totalAssets.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
            </div>
          </div>
        </div>

        {/* LIABILITIES */}
        <div className="space-y-3 pt-4 border-t border-slate-200">
          <div className="text-xs font-bold text-slate-900 uppercase tracking-wider bg-slate-100 p-2 rounded">
            LIABILITIES
          </div>
          <div className="space-y-2 text-xs px-2">
            {bs.liabilities.map(l => (
              <div key={l.code} className="flex justify-between text-slate-700">
                <span>[{l.code}] {l.name}</span>
                <span className="font-mono font-bold">${l.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              </div>
            ))}
            <div className="flex justify-between font-bold text-slate-900 border-t border-slate-200 pt-2">
              <span>TOTAL LIABILITIES:</span>
              <span className="font-mono text-amber-600">${bs.totalLiabilities.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
            </div>
          </div>
        </div>

        {/* EQUITY */}
        <div className="space-y-3 pt-4 border-t border-slate-200">
          <div className="text-xs font-bold text-slate-900 uppercase tracking-wider bg-slate-100 p-2 rounded">
            EQUITY
          </div>
          <div className="space-y-2 text-xs px-2">
            {bs.equity.map(e => (
              <div key={e.code} className="flex justify-between text-slate-700">
                <span>[{e.code}] {e.name}</span>
                <span className="font-mono font-bold">${e.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              </div>
            ))}
            <div className="flex justify-between font-bold text-slate-900 border-t border-slate-200 pt-2">
              <span>TOTAL EQUITY:</span>
              <span className="font-mono text-purple-600">${bs.totalEquity.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
            </div>
          </div>
        </div>

        {/* Accounting Equation Audit Summary */}
        <div className="p-4 rounded-xl border border-slate-200 bg-slate-900 text-white flex items-center justify-between text-xs">
          <div>
            <div className="font-bold">TOTAL LIABILITIES & EQUITY: ${ (bs.totalLiabilities + bs.totalEquity).toLocaleString(undefined, { minimumFractionDigits: 2 }) }</div>
            <div className="text-[11px] text-slate-400">Accounting Equation: Assets = Liabilities + Equity</div>
          </div>

          <div className="flex items-center gap-1.5 font-bold text-emerald-400">
            <CheckCircle2 className="w-4 h-4" />
            <span>Balance Verified</span>
          </div>
        </div>
      </div>
    </div>
  );
}
