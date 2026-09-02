'use client';

import React, { useState } from 'react';
import { FileText, Plus, Search, Filter, Printer } from 'lucide-react';
import { useADCare } from '@/lib/context';
import { Bill } from '@/lib/types';
import { DocumentPrintModal } from '@/components/documents/DocumentPrintModal';

export default function BillsPage() {
  const { bills, contacts, addBill } = useADCare();
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<Bill | null>(null);

  const vendors = contacts.filter(c => c.type === 'vendor');
  const [vendorId, setVendorId] = useState(vendors[0]?.id || '');
  const [amount, setAmount] = useState<number>(1000);
  const [description, setDescription] = useState('Monthly Infrastructure Support Services');

  const filteredBills = bills.filter(b => (
    b.billNumber.toLowerCase().includes(search.toLowerCase()) ||
    b.vendorName.toLowerCase().includes(search.toLowerCase())
  ));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const v = vendors.find(ven => ven.id === vendorId);
    if (!v) return;

    addBill({
      vendorId: v.id,
      vendorName: v.companyName,
      issueDate: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 30*86400000).toISOString().split('T')[0],
      items: [
        {
          id: `bli_${Date.now()}`,
          itemId: 'item-serv',
          itemName: description,
          description: 'Vendor service contract bill',
          quantity: 1,
          unitPrice: amount,
          taxRate: 0,
          amount: amount
        }
      ],
      subtotal: amount,
      taxTotal: 0,
      discountTotal: 0,
      shippingTotal: 0,
      totalAmount: amount,
      amountPaid: 0,
      balanceDue: amount,
      notes: 'Vendor Bill received via AD CARE portal.'
    });

    setShowModal(false);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-subtle">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-600" />
            Vendor Bills
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Track incoming supplier bills, approval status, and accounts payable due dates.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-sm transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Record Vendor Bill</span>
        </button>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search bills by bill # or vendor name..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 shadow-2xs"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-subtle overflow-hidden">
        <table className="w-full text-xs text-left">
          <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold tracking-wider border-b border-slate-200">
            <tr>
              <th className="p-4">Bill #</th>
              <th className="p-4">Vendor</th>
              <th className="p-4">Issue Date</th>
              <th className="p-4">Due Date</th>
              <th className="p-4 text-right">Total Amount</th>
              <th className="p-4 text-center">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-800">
            {filteredBills.map((b) => (
              <tr key={b.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="p-4 font-mono font-bold text-indigo-600">{b.billNumber}</td>
                <td className="p-4 font-medium text-slate-900">{b.vendorName}</td>
                <td className="p-4 text-slate-500">{b.issueDate}</td>
                <td className="p-4 text-slate-500">{b.dueDate}</td>
                <td className="p-4 text-right font-mono font-bold text-slate-900">
                  ${b.totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </td>
                <td className="p-4 text-center">
                  <span className="px-2.5 py-1 text-[10px] font-bold rounded-full bg-slate-100 text-slate-700 uppercase">
                    {b.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button
                    onClick={() => setSelectedDoc(b)}
                    className="p-1.5 text-slate-500 hover:text-indigo-600 rounded-md hover:bg-slate-100"
                  >
                    <Printer className="w-4 h-4" />
                  </button>
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
              <h3 className="font-bold text-slate-900 text-base">Record Vendor Bill</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700">Vendor *</label>
                <select
                  value={vendorId}
                  onChange={(e) => setVendorId(e.target.value)}
                  className="w-full mt-1 p-2 border border-slate-200 rounded-lg text-slate-900"
                >
                  {vendors.map(v => (
                    <option key={v.id} value={v.id}>{v.companyName}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="font-semibold text-slate-700">Bill Service Description</label>
                <input
                  type="text"
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full mt-1 p-2 border border-slate-200 rounded-lg text-slate-900"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700">Total Billed Amount ($)</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={amount}
                  onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                  className="w-full mt-1 p-2 border border-slate-200 rounded-lg text-slate-900 font-mono font-bold"
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
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold shadow-sm"
                >
                  Save Bill
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {selectedDoc && (
        <DocumentPrintModal
          document={selectedDoc}
          type="bill"
          onClose={() => setSelectedDoc(null)}
        />
      )}
    </div>
  );
}
