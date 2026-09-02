'use client';

import React, { useState } from 'react';
import { Users, Plus, Search, Mail, Phone, MapPin, DollarSign, Building2, Trash2 } from 'lucide-react';
import { useADCare } from '@/lib/context';

export default function CustomersPage() {
  const { contacts, addContact, deleteContact } = useADCare();
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);

  // New Contact Form State
  const [name, setName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('USA');

  const customers = contacts.filter(c => c.type === 'customer' && (
    c.companyName.toLowerCase().includes(search.toLowerCase()) ||
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  ));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName.trim()) return;
    addContact({
      name,
      companyName,
      type: 'customer',
      email,
      phone,
      address: 'Corporate HQ',
      city,
      country,
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
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-subtle">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Users className="w-5 h-5 text-brand-600" />
            Customer Directory
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Manage enterprise clients, payment terms, and uncollected receivables balance.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs rounded-xl shadow-sm transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Customer</span>
        </button>
      </div>

      {/* Filter & Search */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search customers by company, contact name, or email..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 text-slate-900 shadow-2xs"
          />
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-subtle overflow-hidden">
        <table className="w-full text-xs text-left">
          <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold tracking-wider border-b border-slate-200">
            <tr>
              <th className="p-4">Company Name</th>
              <th className="p-4">Primary Contact</th>
              <th className="p-4">Contact Info</th>
              <th className="p-4">Location</th>
              <th className="p-4 text-right">Receivables Balance</th>
              <th className="p-4 text-center">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-800">
            {customers.map((c) => (
              <tr key={c.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="p-4 font-bold text-slate-900">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center font-extrabold text-xs border border-slate-200">
                      {c.companyName.charAt(0)}
                    </div>
                    <div>
                      <div>{c.companyName}</div>
                      <div className="text-[10px] text-slate-400 font-normal">ID: {c.id}</div>
                    </div>
                  </div>
                </td>
                <td className="p-4 font-medium text-slate-700">{c.name}</td>
                <td className="p-4 text-slate-500">
                  <div className="flex items-center gap-1.5"><Mail className="w-3 h-3 text-slate-400" /> {c.email}</div>
                  <div className="flex items-center gap-1.5 mt-0.5"><Phone className="w-3 h-3 text-slate-400" /> {c.phone}</div>
                </td>
                <td className="p-4 text-slate-600">
                  <div className="flex items-center gap-1"><MapPin className="w-3 h-3 text-slate-400" /> {c.city}, {c.country}</div>
                </td>
                <td className="p-4 text-right font-mono font-bold">
                  <span className={c.receivables > 0 ? 'text-amber-600' : 'text-slate-700'}>
                    ${c.receivables.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </span>
                </td>
                <td className="p-4 text-center">
                  <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-100 text-emerald-700">
                    {c.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button
                    onClick={() => deleteContact(c.id)}
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

      {/* Add Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 shadow-2xl w-full max-w-md space-y-4 border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-base">Add New Customer</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700">Company Legal Name *</label>
                <input
                  type="text"
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. Acme Corporation"
                  className="w-full mt-1 p-2 border border-slate-200 rounded-lg text-slate-900"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700">Contact Person Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Jane Doe"
                  className="w-full mt-1 p-2 border border-slate-200 rounded-lg text-slate-900"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold text-slate-700">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="billing@acme.com"
                    className="w-full mt-1 p-2 border border-slate-200 rounded-lg text-slate-900"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700">Phone</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 000-1122"
                    className="w-full mt-1 p-2 border border-slate-200 rounded-lg text-slate-900"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold text-slate-700">City</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="San Francisco"
                    className="w-full mt-1 p-2 border border-slate-200 rounded-lg text-slate-900"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700">Country</label>
                  <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
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
                  className="px-4 py-2 bg-brand-600 text-white rounded-lg font-semibold shadow-sm"
                >
                  Save Customer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
