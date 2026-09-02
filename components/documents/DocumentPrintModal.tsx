'use client';

import React from 'react';
import { X, Printer, Download, Mail, Building2, CheckCircle2 } from 'lucide-react';
import { useADCare } from '@/lib/context';
import { Invoice, Bill, Quote } from '@/lib/types';

interface DocumentPrintModalProps {
  document: Invoice | Bill | Quote;
  type: 'invoice' | 'bill' | 'quote';
  onClose: () => void;
}

export const DocumentPrintModal: React.FC<DocumentPrintModalProps> = ({ document: doc, type, onClose }) => {
  const { orgSettings } = useADCare();

  const handlePrint = () => {
    window.print();
  };

  const getDocTitle = () => {
    if (type === 'invoice') return `INVOICE #${(doc as Invoice).invoiceNumber}`;
    if (type === 'bill') return `VENDOR BILL #${(doc as Bill).billNumber}`;
    return `QUOTE #${(doc as Quote).quoteNumber}`;
  };

  const docNumber = type === 'invoice' ? (doc as Invoice).invoiceNumber : type === 'bill' ? (doc as Bill).billNumber : (doc as Quote).quoteNumber;
  const partyName = type === 'invoice' ? (doc as Invoice).customerName : type === 'bill' ? (doc as Bill).vendorName : (doc as Quote).customerName;
  const issueDate = doc.issueDate;
  const dueDate = type === 'invoice' ? (doc as Invoice).dueDate : type === 'bill' ? (doc as Bill).dueDate : (doc as Quote).expiryDate;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl overflow-hidden my-8 print:shadow-none print:m-0 print:w-full print:max-w-none">
        {/* Printable Control Bar (Hidden on print) */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2 font-bold text-sm">
            <Building2 className="w-4 h-4 text-brand-400" />
            <span>AD Care RxBooks Document Viewer — {getDocTitle()}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-brand-600 hover:bg-brand-500 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Download PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Paper */}
        <div className="p-8 bg-white text-slate-900 font-sans print:p-0">
          {/* Document Header */}
          <div className="flex items-start justify-between border-b border-slate-200 pb-6 mb-6">
            <div>
              <div className="flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logo.jpg"
                  alt="AD CARE Meds & Pharmacy Logo"
                  className="w-12 h-12 object-contain rounded-lg border border-slate-200"
                />
                <div>
                  <div className="font-black text-2xl tracking-tight font-sans">
                    <span className="text-[#3b558c]">AD </span>
                    <span className="text-[#61b849]">CARE </span>
                    <span className="text-[#3b558c]">RxBooks</span>
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium">Meds & Pharmacy Platform</div>
                </div>
              </div>
              <div className="text-xs text-slate-500 mt-2 space-y-0.5">
                <p>{orgSettings.address}</p>
                <p>{orgSettings.city}, {orgSettings.country}</p>
                <p>Tax ID: {orgSettings.taxId} | Phone: {orgSettings.phone}</p>
                <p>Email: {orgSettings.email}</p>
              </div>
            </div>

            <div className="text-right">
              <div className="inline-block px-3 py-1 bg-brand-50 text-brand-700 font-bold text-lg rounded-md uppercase tracking-wider mb-2 border border-brand-200">
                {type.toUpperCase()}
              </div>
              <div className="text-xs font-mono font-bold text-slate-800">{docNumber}</div>
              <div className="text-xs text-slate-500 mt-1">
                <p><span className="font-medium text-slate-700">Issue Date:</span> {issueDate}</p>
                <p><span className="font-medium text-slate-700">Due Date:</span> {dueDate}</p>
              </div>
            </div>
          </div>

          {/* Billed To / Issued To */}
          <div className="grid grid-cols-2 gap-8 mb-8 text-xs bg-slate-50 p-4 rounded-lg border border-slate-200">
            <div>
              <div className="font-bold text-slate-500 uppercase tracking-wider mb-1">
                {type === 'bill' ? 'Vendor / Payee Details:' : 'Customer / Bill To:'}
              </div>
              <div className="font-bold text-slate-900 text-sm">{partyName}</div>
              <div className="text-slate-600 mt-1">
                {'customerEmail' in doc && <p>{doc.customerEmail}</p>}
                <p>Account Status: Active Enterprise Partner</p>
              </div>
            </div>
            <div className="text-right">
              <div className="font-bold text-slate-500 uppercase tracking-wider mb-1">Payment Instructions:</div>
              <div className="text-slate-700 space-y-0.5">
                <p>Bank: <span className="font-semibold text-slate-900">Silicon Valley Bank</span></p>
                <p>Routing: <span className="font-mono">121000358</span> | Account: <span className="font-mono">4910-882</span></p>
                <p>SWIFT/BIC: <span className="font-mono">SVBUS66XX</span></p>
              </div>
            </div>
          </div>

          {/* Items Table */}
          <table className="w-full text-xs text-left mb-6 border-collapse">
            <thead>
              <tr className="bg-slate-900 text-white uppercase text-[10px] tracking-wider">
                <th className="p-2.5 rounded-tl-md">Description / Item</th>
                <th className="p-2.5 text-center">Qty</th>
                <th className="p-2.5 text-right">Unit Price</th>
                <th className="p-2.5 text-right">Tax Rate</th>
                <th className="p-2.5 text-right rounded-tr-md">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-800">
              {doc.items.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50">
                  <td className="p-2.5 font-medium">
                    <div className="text-slate-900 font-semibold">{item.itemName}</div>
                    <div className="text-[11px] text-slate-500">{item.description}</div>
                  </td>
                  <td className="p-2.5 text-center font-mono">{item.quantity}</td>
                  <td className="p-2.5 text-right font-mono">${item.unitPrice.toFixed(2)}</td>
                  <td className="p-2.5 text-right font-mono">{item.taxRate}%</td>
                  <td className="p-2.5 text-right font-mono font-bold">${item.amount.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Totals Section */}
          <div className="flex justify-end mb-8 text-xs">
            <div className="w-72 space-y-2 border-t border-slate-200 pt-3">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal:</span>
                <span className="font-mono">${doc.subtotal.toFixed(2)}</span>
              </div>
              {'discountTotal' in doc && (doc as Invoice).discountTotal > 0 && (
                <div className="flex justify-between text-emerald-600 font-medium">
                  <span>Discount Applied (-):</span>
                  <span className="font-mono">-${(doc as Invoice).discountTotal.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-600">
                <span>Tax (10%):</span>
                <span className="font-mono">${doc.taxTotal.toFixed(2)}</span>
              </div>
              {'shippingTotal' in doc && (doc as Invoice).shippingTotal > 0 && (
                <div className="flex justify-between text-slate-700">
                  <span>Shipping & Freight Charges:</span>
                  <span className="font-mono">${(doc as Invoice).shippingTotal.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-sm text-slate-900 border-t border-slate-300 pt-2">
                <span>Total Amount:</span>
                <span className="font-mono text-brand-600">${doc.totalAmount.toFixed(2)}</span>
              </div>
              {'balanceDue' in doc && (
                <div className="flex justify-between text-xs font-bold text-rose-600 border-t border-dashed border-rose-200 pt-1">
                  <span>Balance Due:</span>
                  <span className="font-mono">${(doc as Invoice).balanceDue.toFixed(2)}</span>
                </div>
              )}
            </div>
          </div>

          {/* Notes & Branding Footer */}
          <div className="border-t border-slate-200 pt-6 text-[11px] text-slate-500 grid grid-cols-2 gap-4">
            <div>
              <div className="font-bold text-slate-700 uppercase tracking-wider mb-1">Terms & Notes</div>
              <p>{'notes' in doc ? doc.notes : 'Thank you for your business.'}</p>
            </div>
            <div className="text-right flex flex-col items-end justify-between">
              <div className="flex items-center gap-1.5 text-slate-400 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>Verified by AD Care RxBooks Cloud Ledger</span>
              </div>
              <div className="text-[10px] text-slate-400">
                Generated with AD Care RxBooks Business Accounting Platform
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
