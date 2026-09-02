'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Receipt, Plus, Search, Filter, Printer, CreditCard, CheckCircle, Eye, AlertTriangle } from 'lucide-react';
import { useADCare } from '@/lib/context';
import { Invoice } from '@/lib/types';
import { DocumentPrintModal } from '@/components/documents/DocumentPrintModal';

export default function InvoicesPage() {
  const { invoices, updateInvoiceStatus, recordInvoicePayment } = useADCare();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedDoc, setSelectedDoc] = useState<Invoice | null>(null);
  const [paymentInvoice, setPaymentInvoice] = useState<Invoice | null>(null);
  const [paymentAmount, setPaymentAmount] = useState<number>(0);
  const [paymentMode, setPaymentMode] = useState<string>('bank_transfer');

  const filteredInvoices = invoices.filter(inv => {
    const matchesSearch = inv.invoiceNumber.toLowerCase().includes(search.toLowerCase()) ||
                          inv.customerName.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || inv.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleOpenPayment = (inv: Invoice) => {
    setPaymentInvoice(inv);
    setPaymentAmount(inv.balanceDue);
  };

  const handleRecordPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!paymentInvoice || paymentAmount <= 0) return;
    recordInvoicePayment(paymentInvoice.id, paymentAmount, paymentMode);
    setPaymentInvoice(null);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-subtle">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Receipt className="w-5 h-5 text-brand-600" />
            Invoices Management
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Create, track, and manage sales invoices, payment status, and branded PDF generation.
          </p>
        </div>

        <Link
          href="/invoices/new"
          className="flex items-center gap-2 px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs rounded-xl shadow-sm transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Invoice</span>
        </Link>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by invoice # or customer name..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 text-slate-900 shadow-2xs"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <span className="text-xs font-semibold text-slate-500">Filter Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            <option value="all">All Statuses</option>
            <option value="sent">Sent</option>
            <option value="overdue">Overdue</option>
            <option value="paid">Paid</option>
            <option value="partially_paid">Partially Paid</option>
            <option value="draft">Draft</option>
          </select>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-subtle overflow-hidden">
        <table className="w-full text-xs text-left">
          <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold tracking-wider border-b border-slate-200">
            <tr>
              <th className="p-4">Invoice #</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Issue Date</th>
              <th className="p-4">Due Date</th>
              <th className="p-4 text-right">Total Amount</th>
              <th className="p-4 text-right">Balance Due</th>
              <th className="p-4 text-center">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-800">
            {filteredInvoices.map((inv) => (
              <tr key={inv.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="p-4 font-mono font-bold text-brand-600">
                  <button onClick={() => setSelectedDoc(inv)} className="hover:underline">
                    {inv.invoiceNumber}
                  </button>
                </td>
                <td className="p-4 font-medium text-slate-900">{inv.customerName}</td>
                <td className="p-4 text-slate-500">{inv.issueDate}</td>
                <td className="p-4 text-slate-500">{inv.dueDate}</td>
                <td className="p-4 text-right font-mono font-bold text-slate-900">
                  ${inv.totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </td>
                <td className="p-4 text-right font-mono font-bold">
                  <span className={inv.balanceDue > 0 ? 'text-rose-600' : 'text-slate-400'}>
                    ${inv.balanceDue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </span>
                </td>
                <td className="p-4 text-center">
                  <span className={`px-2.5 py-1 text-[10px] font-bold rounded-full uppercase ${
                    inv.status === 'paid' ? 'bg-emerald-100 text-emerald-700 border border-emerald-300' :
                    inv.status === 'overdue' ? 'bg-rose-100 text-rose-700 border border-rose-300' :
                    inv.status === 'partially_paid' ? 'bg-amber-100 text-amber-700 border border-amber-300' :
                    'bg-blue-100 text-blue-700 border border-blue-300'
                  }`}>
                    {inv.status.replace('_', ' ')}
                  </span>
                </td>
                <td className="p-4 text-right space-x-2">
                  {inv.balanceDue > 0 && (
                    <button
                      onClick={() => handleOpenPayment(inv)}
                      className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-md font-bold text-[11px] transition-colors"
                    >
                      Record Payment
                    </button>
                  )}
                  <button
                    onClick={() => setSelectedDoc(inv)}
                    className="p-1.5 text-slate-500 hover:text-brand-600 rounded-md hover:bg-slate-100 transition-colors"
                    title="View & Print Branded PDF"
                  >
                    <Printer className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Payment Recording Modal */}
      {paymentInvoice && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 shadow-2xl w-full max-w-md space-y-4 border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-emerald-600" />
                Record Customer Payment
              </h3>
              <button onClick={() => setPaymentInvoice(null)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>
            <div className="text-xs text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-200">
              <p><span className="font-semibold text-slate-800">Invoice:</span> {paymentInvoice.invoiceNumber}</p>
              <p><span className="font-semibold text-slate-800">Customer:</span> {paymentInvoice.customerName}</p>
              <p><span className="font-semibold text-slate-800">Outstanding Balance:</span> <span className="font-mono text-rose-600 font-bold">${paymentInvoice.balanceDue.toLocaleString()}</span></p>
            </div>
            <form onSubmit={handleRecordPayment} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700">Payment Amount Received ($)</label>
                <input
                  type="number"
                  step="0.01"
                  max={paymentInvoice.balanceDue}
                  required
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(parseFloat(e.target.value) || 0)}
                  className="w-full mt-1 p-2 border border-slate-200 rounded-lg text-slate-900 font-mono font-bold"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700">Payment Mode</label>
                <select
                  value={paymentMode}
                  onChange={(e) => setPaymentMode(e.target.value)}
                  className="w-full mt-1 p-2 border border-slate-200 rounded-lg text-slate-900"
                >
                  <option value="bank_transfer">Direct Bank Transfer (ACH / Wire)</option>
                  <option value="credit_card">Credit Card Processing</option>
                  <option value="check">Company Check</option>
                  <option value="cash">Cash Settlement</option>
                </select>
              </div>
              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentInvoice(null)}
                  className="px-3 py-2 bg-slate-100 text-slate-700 rounded-lg font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 text-white rounded-lg font-semibold shadow-sm"
                >
                  Confirm & Post Payment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Document PDF Modal */}
      {selectedDoc && (
        <DocumentPrintModal
          document={selectedDoc}
          type="invoice"
          onClose={() => setSelectedDoc(null)}
        />
      )}
    </div>
  );
}
