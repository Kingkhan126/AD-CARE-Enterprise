'use client';

import React from 'react';
import { Zap, Play, Pause, Bell, CheckCircle2 } from 'lucide-react';
import { useADCare } from '@/lib/context';

export default function AutomationPage() {
  const { automationRules, toggleAutomationRule } = useADCare();

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-subtle">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Zap className="w-5 h-5 text-amber-500" />
          Automation & Workflows Engine
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Configure automated email payment reminders, low-stock reorder triggers, and recurring billing.
        </p>
      </div>

      <div className="space-y-4">
        {automationRules.map((rule) => (
          <div key={rule.id} className="bg-white rounded-xl p-5 border border-slate-200 shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-slate-900">{rule.title}</span>
                <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full uppercase ${
                  rule.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'
                }`}>
                  {rule.status}
                </span>
              </div>
              <p className="text-xs text-slate-500">{rule.description}</p>
              {rule.lastRun && <p className="text-[10px] font-mono text-slate-400">Last Triggered: {rule.lastRun}</p>}
            </div>

            <button
              onClick={() => toggleAutomationRule(rule.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-colors shrink-0 ${
                rule.status === 'active'
                  ? 'bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100'
                  : 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
              }`}
            >
              {rule.status === 'active' ? (
                <>
                  <Pause className="w-4 h-4" /> Pause Rule
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" /> Enable Rule
                </>
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
