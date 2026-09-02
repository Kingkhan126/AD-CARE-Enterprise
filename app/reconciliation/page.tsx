'use client';

import React from 'react';
import { ShieldCheck, CheckCircle2, RefreshCw, Landmark, ArrowRight } from 'lucide-react';
import { useADCare } from '@/lib/context';

export default function ReconciliationPage() {
  const { bankTransactions, reconcileTransaction, bankAccounts } = useADCare();

  const unmatchedTx = bankTransactions.filter(tx => !tx.isMatched);
  const matchedTx = bankTransactions.filter(tx => tx.isMatched);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-subtle">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            Bank Feed Reconciliation Tool
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Match bank clearing feed items against posted AD CARE General Ledger entries to verify 100% precision.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="px-3 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl text-xs font-bold">
            {unmatchedTx.length} Unmatched Item(s) Remaining
          </span>
        </div>
      </div>

      {/* Reconciliation Workbench */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Unmatched Bank Clearing Stream */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-subtle p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <Landmark className="w-4 h-4 text-brand-600" />
              Unmatched Bank Feed Records
            </h3>
            <span className="text-[11px] text-amber-600 font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              Needs Action
            </span>
          </div>

          {unmatchedTx.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-400 space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
              <div className="font-bold text-slate-700">All Bank Records Reconciled!</div>
              <p>Zero variance found between bank statement and general ledger.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {unmatchedTx.map((tx) => (
                <div key={tx.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-white transition-all space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-slate-500">{tx.date}</span>
                    <span className={`font-mono font-bold ${tx.amount >= 0 ? 'text-emerald-600' : 'text-slate-900'}`}>
                      ${Math.abs(tx.amount).toFixed(2)}
                    </span>
                  </div>
                  <div className="font-semibold text-slate-900 text-xs">{tx.description}</div>
                  <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 text-[11px]">
                    <span className="text-slate-500 font-mono">Ref: {tx.reference}</span>
                    <button
                      onClick={() => reconcileTransaction(tx.id)}
                      className="flex items-center gap-1 px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold transition-colors shadow-2xs"
                    >
                      <span>Match to Ledger</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Reconciled / Matched Audit Feed */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-subtle p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Reconciled Ledger Matches
            </h3>
            <span className="text-[11px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Verified
            </span>
          </div>

          <div className="space-y-3">
            {matchedTx.map((tx) => (
              <div key={tx.id} className="p-3.5 rounded-xl border border-emerald-100 bg-emerald-50/40 flex items-center justify-between text-xs">
                <div>
                  <div className="font-semibold text-slate-900">{tx.description}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">{tx.date} — Ref: {tx.reference}</div>
                </div>
                <div className="text-right">
                  <div className="font-mono font-bold text-emerald-700">${Math.abs(tx.amount).toFixed(2)}</div>
                  <span className="text-[10px] text-emerald-600 font-medium">Verified Match</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
