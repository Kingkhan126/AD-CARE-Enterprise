'use client';

import React, { useState } from 'react';
import { Building2, Plus, Search, Mail, Phone, MapPin, Trash2 } from 'lucide-react';
import { useADCare } from '@/lib/context';

export default function VendorsPage() {
  const { contacts, addContact, deleteContact } = useADCare();
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);

  const [name, setName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');

  const vendors = contacts.filter(c => c.type === 'vendor' && (
    c.companyName.toLowerCase().includes(search.toLowerCase()) ||
    c.name.toLowerCase().includes(search.toLowerCase())
  ));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName.trim()) return;
    addContact({
      name,
      companyName,
      type: 'vendor',
      email,
      phone,
      address: 'Vendor Hub',
      city,
      country: 'USA',
      receivables: 0,
      payables: 0,
      status: 'active'
    });
    setShowModal(false);
    setName('');
    setCompanyName('');
    setEmail('');
    setPhone('');
    setCity('');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-subtle">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-indigo-600" />
            Vendor Directory
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Manage suppliers, service contractors, and outstanding payables balances.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-sm transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Vendor</span>
        </button>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search vendors by company, contact name..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 shadow-2xs"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-subtle overflow-hidden">
        <table className="w-full text-xs text-left">
          <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold tracking-wider border-b border-slate-200">
            <tr>
              <th className="p-4">Vendor Company</th>
              <th className="p-4">Primary Contact</th>
              <th className="p-4">Contact Details</th>
              <th className="p-4 text-right">Outstanding Payables</th>
              <th className="p-4 text-center">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-800">
            {vendors.map((v) => (
              <tr key={v.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="p-4 font-bold text-slate-900">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center font-extrabold text-xs border border-indigo-200">
                      {v.companyName.charAt(0)}
                    </div>
                    <div>{v.companyName}</div>
                  </div>
                </td>
                <td className="p-4 font-medium text-slate-700">{v.name}</td>
                <td className="p-4 text-slate-500">
                  <div className="flex items-center gap-1.5"><Mail className="w-3 h-3 text-slate-400" /> {v.email}</div>
                  <div className="flex items-center gap-1.5 mt-0.5"><Phone className="w-3 h-3 text-slate-400" /> {v.phone}</div>
                </td>
                <td className="p-4 text-right font-mono font-bold text-slate-900">
                  ${v.payables.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </td>
                <td className="p-4 text-center">
                  <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-100 text-emerald-700">
                    {v.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button
                    onClick={() => deleteContact(v.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 rounded-md hover:bg-rose-50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
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
              <h3 className="font-bold text-slate-900 text-base">Add New Vendor</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700">Vendor Company Name *</label>
                <input
                  type="text"
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. AWS Cloud Hosting"
                  className="w-full mt-1 p-2 border border-slate-200 rounded-lg text-slate-900"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700">Contact Representative</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. John Smith"
                  className="w-full mt-1 p-2 border border-slate-200 rounded-lg text-slate-900"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold text-slate-700">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="billing@vendor.com"
                    className="w-full mt-1 p-2 border border-slate-200 rounded-lg text-slate-900"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700">Phone</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (800) 123-4567"
                    className="w-full mt-1 p-2 border border-slate-200 rounded-lg text-slate-900"
                  />
                </div>
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
                  Save Vendor
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
