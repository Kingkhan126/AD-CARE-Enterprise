'use client';

import React from 'react';
import { ShieldCheck, User, Clock, Terminal } from 'lucide-react';
import { useADCare } from '@/lib/context';

export default function AuditLogsPage() {
  const { auditLogs } = useADCare();

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-subtle">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-indigo-600" />
          Security Audit Trail Logs
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Immutable system trail logging for invoice creations, journal postings, and setting mutations.
        </p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-subtle overflow-hidden">
        <table className="w-full text-xs text-left">
          <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold tracking-wider border-b border-slate-200">
            <tr>
              <th className="p-4">Timestamp</th>
              <th className="p-4">User</th>
              <th className="p-4">Action</th>
              <th className="p-4">Module</th>
              <th className="p-4">Details</th>
              <th className="p-4">IP Address</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-800 font-mono">
            {auditLogs.map((log) => (
              <tr key={log.id} className="hover:bg-slate-50">
                <td className="p-4 text-slate-500">{log.timestamp}</td>
                <td className="p-4 font-bold text-slate-900 font-sans">{log.userName}</td>
                <td className="p-4 font-bold text-brand-600">{log.action}</td>
                <td className="p-4 font-sans text-slate-600">{log.module}</td>
                <td className="p-4 font-sans text-slate-800">{log.details}</td>
                <td className="p-4 text-slate-400 text-[11px]">{log.ipAddress}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
