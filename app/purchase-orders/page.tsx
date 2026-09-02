'use client';

import React from 'react';
import { ShoppingBag } from 'lucide-react';

export default function PurchaseOrdersPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-subtle">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <ShoppingBag className="w-5 h-5 text-indigo-600" />
          Purchase Orders (POs)
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Issue formal purchasing requisitions to vendors prior to receiving bills.
        </p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-subtle p-8 text-center space-y-2">
        <div className="text-xs font-bold text-slate-400">Zero active purchase orders pending.</div>
        <p className="text-xs text-slate-500">Purchase orders created for suppliers will be tracked here.</p>
      </div>
    </div>
  );
}
