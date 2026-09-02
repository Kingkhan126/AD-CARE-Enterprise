'use client';

import React, { useState } from 'react';
import { Package, Plus, Search, Tag, AlertTriangle } from 'lucide-react';
import { useADCare } from '@/lib/context';

export default function ItemsPage() {
  const { items, addItem } = useADCare();
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);

  const [name, setName] = useState('');
  const [sku, setSku] = useState('');
  const [type, setType] = useState<'product' | 'service'>('product');
  const [unit, setUnit] = useState('unit');
  const [salesPrice, setSalesPrice] = useState<number>(100);
  const [costPrice, setCostPrice] = useState<number>(40);
  const [stockOnHand, setStockOnHand] = useState<number>(50);
  const [description, setDescription] = useState('');

  const filteredItems = items.filter(i => (
    i.name.toLowerCase().includes(search.toLowerCase()) ||
    i.sku.toLowerCase().includes(search.toLowerCase())
  ));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addItem({
      name,
      sku: sku || `SKU-${Date.now().toString().slice(-4)}`,
      type,
      unit,
      salesPrice,
      costPrice,
      taxRate: 10,
      stockOnHand,
      reorderPoint: 10,
      description,
      status: 'active'
    });
    setShowModal(false);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-subtle">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Package className="w-5 h-5 text-brand-600" />
            Products & Services Catalog
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Maintain item prices, SKUs, inventory counts, cost rates, and tax rules.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs rounded-xl shadow-sm transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Item</span>
        </button>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search catalog by SKU or item name..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 text-slate-900 shadow-2xs"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-subtle overflow-hidden">
        <table className="w-full text-xs text-left">
          <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold tracking-wider border-b border-slate-200">
            <tr>
              <th className="p-4">SKU / Code</th>
              <th className="p-4">Item Name</th>
              <th className="p-4">Type</th>
              <th className="p-4 text-right">Sales Price</th>
              <th className="p-4 text-right">Cost Price</th>
              <th className="p-4 text-center">Stock On Hand</th>
              <th className="p-4 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-800">
            {filteredItems.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="p-4 font-mono font-bold text-brand-600">{item.sku}</td>
                <td className="p-4 font-semibold text-slate-900">{item.name}</td>
                <td className="p-4">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                    item.type === 'service' ? 'bg-indigo-100 text-indigo-700' : 'bg-emerald-100 text-emerald-700'
                  }`}>
                    {item.type}
                  </span>
                </td>
                <td className="p-4 text-right font-mono font-bold text-slate-900">${item.salesPrice.toFixed(2)}</td>
                <td className="p-4 text-right font-mono text-slate-500">${item.costPrice.toFixed(2)}</td>
                <td className="p-4 text-center font-mono">
                  {item.type === 'service' ? 'N/A' : (
                    <span className={`font-bold ${item.stockOnHand <= item.reorderPoint ? 'text-rose-600' : 'text-slate-800'}`}>
                      {item.stockOnHand} {item.unit}s
                    </span>
                  )}
                </td>
                <td className="p-4 text-center">
                  <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-100 text-emerald-700">
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 shadow-2xl w-full max-w-md space-y-4 border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-base">Add New Item / Service</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700">Item Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Enterprise Router Node"
                  className="w-full mt-1 p-2 border border-slate-200 rounded-lg text-slate-900"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold text-slate-700">SKU Code</label>
                  <input
                    type="text"
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                    placeholder="ADC-HW-01"
                    className="w-full mt-1 p-2 border border-slate-200 rounded-lg text-slate-900 font-mono"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700">Type</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as 'product' | 'service')}
                    className="w-full mt-1 p-2 border border-slate-200 rounded-lg text-slate-900"
                  >
                    <option value="product">Physical Product</option>
                    <option value="service">Service / Subscription</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold text-slate-700">Selling Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={salesPrice}
                    onChange={(e) => setSalesPrice(parseFloat(e.target.value) || 0)}
                    className="w-full mt-1 p-2 border border-slate-200 rounded-lg text-slate-900 font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700">Cost Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={costPrice}
                    onChange={(e) => setCostPrice(parseFloat(e.target.value) || 0)}
                    className="w-full mt-1 p-2 border border-slate-200 rounded-lg text-slate-900 font-mono"
                  />
                </div>
              </div>
              {type === 'product' && (
                <div>
                  <label className="font-semibold text-slate-700">Initial Stock Quantity</label>
                  <input
                    type="number"
                    value={stockOnHand}
                    onChange={(e) => setStockOnHand(parseInt(e.target.value) || 0)}
                    className="w-full mt-1 p-2 border border-slate-200 rounded-lg text-slate-900 font-mono font-bold"
                  />
                </div>
              )}
              <div>
                <label className="font-semibold text-slate-700">Description</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full mt-1 p-2 border border-slate-200 rounded-lg text-slate-900"
                />
              </div>
              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-3 py-2 bg-slate-100 text-slate-700 rounded-lg font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-brand-600 text-white rounded-lg font-semibold shadow-sm"
                >
                  Save Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
