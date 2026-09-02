'use client';

import React from 'react';
import Link from 'next/link';
import { PieChart, TrendingUp, BookOpen, ShieldCheck, DollarSign, FileText, ArrowRight } from 'lucide-react';

export default function ReportsPage() {
  const reports = [
    {
      title: 'Profit & Loss Statement (P&L)',
      description: 'Summarizes gross revenue, cost of goods sold, and operating net profit over a chosen period.',
      href: '/reports/profit-loss',
      icon: TrendingUp,
      badge: 'Core Statement'
    },
    {
      title: 'Balance Sheet Statement',
      description: 'Provides a financial snapshot of company assets, liabilities, and retained equity.',
      href: '/reports/balance-sheet',
      icon: BookOpen,
      badge: 'Core Statement'
    },
    {
      title: 'Trial Balance Report',
      description: 'Lists closing debit and credit balances for all Chart of Accounts items to verify ledger integrity.',
      href: '/reports/trial-balance',
      icon: ShieldCheck,
      badge: 'Auditing'
    }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-subtle">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <PieChart className="w-5 h-5 text-brand-600" />
          Financial & Executive Reporting Suite
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Production financial statements compiled directly from AD CARE general ledger posted transactions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reports.map((r) => {
          const Icon = r.icon;
          return (
            <Link
              key={r.title}
              href={r.href}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-subtle hover:border-brand-400 hover:shadow-premium transition-all flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center font-bold">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-slate-100 text-slate-600 border border-slate-200 uppercase">
                    {r.badge}
                  </span>
                </div>
                <h3 className="font-bold text-base text-slate-900 group-hover:text-brand-600 transition-colors">
                  {r.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {r.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-brand-600 group-hover:translate-x-1 transition-transform">
                <span>View Full Statement</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
