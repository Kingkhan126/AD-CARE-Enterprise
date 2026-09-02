'use client';

import React from 'react';
import { Store, Building2, Package, ArrowUpRight } from 'lucide-react';
import { useADCare } from '@/lib/context';

export default function InventoryPage() {
  const { warehouses, items } = useADCare();

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-subtle">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Store className="w-5 h-5 text-brand-600" />
          Multi-Warehouse & Stock Control
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Monitor physical stock locations, transfer orders, and reorder levels across distribution hubs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {warehouses.map((wh) => (
          <div key={wh.id} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-subtle space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-mono text-[10px] font-bold text-brand-600 uppercase">{wh.code}</span>
                <h3 className="font-bold text-base text-slate-900 leading-tight">{wh.name}</h3>
                <p className="text-xs text-slate-500">{wh.location}</p>
              </div>
              {wh.isPrimary && (
                <span className="px-2.5 py-1 text-[10px] font-bold rounded-full bg-brand-100 text-brand-700 uppercase">
                  Primary Location
                </span>
              )}
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs flex justify-between">
              <span className="text-slate-500 font-semibold">Total Stock Units Held:</span>
              <span className="font-mono font-bold text-slate-900">{wh.totalStock} units</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
