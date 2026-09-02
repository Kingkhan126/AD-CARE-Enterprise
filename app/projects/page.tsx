'use client';

import React, { useState } from 'react';
import { Briefcase, Plus, Clock, DollarSign, CheckCircle2 } from 'lucide-react';
import { useADCare } from '@/lib/context';

export default function ProjectsPage() {
  const { projects, timesheets, addProject, addTimesheet, contacts } = useADCare();
  const [showProjModal, setShowProjModal] = useState(false);
  const [showTimeModal, setShowTimeModal] = useState(false);

  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [customerId, setCustomerId] = useState(contacts[0]?.id || '');
  const [budget, setBudget] = useState<number>(10000);
  const [hourlyRate, setHourlyRate] = useState<number>(150);

  const [projectId, setProjectId] = useState(projects[0]?.id || '');
  const [hours, setHours] = useState<number>(4);
  const [description, setDescription] = useState('Financial ERP setup and workflow testing');

  const customers = contacts.filter(c => c.type === 'customer');

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    const cust = customers.find(c => c.id === customerId);
    if (!cust) return;
    addProject({
      name,
      code: code || `PRJ-${Date.now().toString().slice(-4)}`,
      customerId: cust.id,
      customerName: cust.companyName,
      budget,
      spent: 0,
      billingType: 'hourly',
      hourlyRate,
      status: 'active',
      startDate: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 60*86400000).toISOString().split('T')[0]
    });
    setShowProjModal(false);
  };

  const handleCreateTimesheet = (e: React.FormEvent) => {
    e.preventDefault();
    const prj = projects.find(p => p.id === projectId);
    if (!prj) return;
    addTimesheet({
      projectId: prj.id,
      projectName: prj.name,
      userId: 'u1',
      userName: 'Alex Morgan (Senior Architect)',
      date: new Date().toISOString().split('T')[0],
      hours,
      description,
      isBillable: true,
      isBilled: false
    });
    setShowTimeModal(false);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-subtle">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-brand-600" />
            Projects & Timesheets Management
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Track client project budgets, billable hours logged by staff, and invoice generation.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowTimeModal(true)}
            className="flex items-center gap-2 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-colors"
          >
            <Clock className="w-4 h-4" />
            <span>Log Time Entry</span>
          </button>
          <button
            onClick={() => setShowProjModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs rounded-xl shadow-sm transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>New Project</span>
          </button>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((p) => (
          <div key={p.id} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-subtle space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-mono text-[10px] font-bold text-brand-600 uppercase">{p.code}</span>
                <h3 className="font-bold text-base text-slate-900 leading-tight">{p.name}</h3>
                <p className="text-xs text-slate-500">{p.customerName}</p>
              </div>
              <span className="px-2.5 py-1 text-[10px] font-bold rounded-full bg-emerald-100 text-emerald-700 uppercase">
                {p.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs bg-slate-50 p-3 rounded-xl border border-slate-200">
              <div>
                <div className="text-slate-400 font-semibold uppercase text-[10px]">Project Budget</div>
                <div className="font-mono font-bold text-slate-900">${p.budget.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-slate-400 font-semibold uppercase text-[10px]">Hourly Billing Rate</div>
                <div className="font-mono font-bold text-brand-600">${p.hourlyRate}/hr</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Timesheets Feed */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-subtle overflow-hidden space-y-3">
        <div className="p-4 border-b border-slate-200 font-bold text-sm text-slate-900">Logged Staff Timesheet Entries</div>
        <table className="w-full text-xs text-left">
          <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold tracking-wider border-b border-slate-200">
            <tr>
              <th className="p-4">Staff User</th>
              <th className="p-4">Project</th>
              <th className="p-4">Description</th>
              <th className="p-4 text-center">Hours</th>
              <th className="p-4 text-center">Billing Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-800">
            {timesheets.map((ts) => (
              <tr key={ts.id} className="hover:bg-slate-50">
                <td className="p-4 font-semibold text-slate-900">{ts.userName}</td>
                <td className="p-4 text-brand-600 font-medium">{ts.projectName}</td>
                <td className="p-4 text-slate-600">{ts.description}</td>
                <td className="p-4 text-center font-mono font-bold">{ts.hours} hrs</td>
                <td className="p-4 text-center">
                  <span className={`px-2.5 py-1 text-[10px] font-bold rounded-full ${
                    ts.isBilled ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {ts.isBilled ? 'Billed' : 'Unbilled'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* New Project Modal */}
      {showProjModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 shadow-2xl w-full max-w-md space-y-4 border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-base">Add New Client Project</h3>
              <button onClick={() => setShowProjModal(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>
            <form onSubmit={handleCreateProject} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700">Project Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Apex Cloud Infrastructure Phase 1"
                  className="w-full mt-1 p-2 border border-slate-200 rounded-lg text-slate-900"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700">Customer *</label>
                <select
                  value={customerId}
                  onChange={(e) => setCustomerId(e.target.value)}
                  className="w-full mt-1 p-2 border border-slate-200 rounded-lg text-slate-900"
                >
                  {customers.map(c => (
                    <option key={c.id} value={c.id}>{c.companyName}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold text-slate-700">Budget ($)</label>
                  <input
                    type="number"
                    value={budget}
                    onChange={(e) => setBudget(parseFloat(e.target.value) || 0)}
                    className="w-full mt-1 p-2 border border-slate-200 rounded-lg text-slate-900 font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700">Hourly Rate ($)</label>
                  <input
                    type="number"
                    value={hourlyRate}
                    onChange={(e) => setHourlyRate(parseFloat(e.target.value) || 0)}
                    className="w-full mt-1 p-2 border border-slate-200 rounded-lg text-slate-900 font-mono font-bold"
                  />
                </div>
              </div>
              <div className="pt-2 flex items-center justify-end gap-2">
                <button type="button" onClick={() => setShowProjModal(false)} className="px-3 py-2 bg-slate-100 text-slate-700 rounded-lg">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-brand-600 text-white rounded-lg font-semibold">Save Project</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Log Time Entry Modal */}
      {showTimeModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 shadow-2xl w-full max-w-md space-y-4 border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-base">Log Staff Timesheet</h3>
              <button onClick={() => setShowTimeModal(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>
            <form onSubmit={handleCreateTimesheet} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700">Project *</label>
                <select
                  value={projectId}
                  onChange={(e) => setProjectId(e.target.value)}
                  className="w-full mt-1 p-2 border border-slate-200 rounded-lg text-slate-900"
                >
                  {projects.map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="font-semibold text-slate-700">Hours Spent</label>
                <input
                  type="number"
                  step="0.5"
                  required
                  value={hours}
                  onChange={(e) => setHours(parseFloat(e.target.value) || 0)}
                  className="w-full mt-1 p-2 border border-slate-200 rounded-lg text-slate-900 font-mono font-bold"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700">Task Work Description</label>
                <textarea
                  rows={2}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full mt-1 p-2 border border-slate-200 rounded-lg text-slate-900"
                />
              </div>
              <div className="pt-2 flex items-center justify-end gap-2">
                <button type="button" onClick={() => setShowTimeModal(false)} className="px-3 py-2 bg-slate-100 text-slate-700 rounded-lg">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-brand-600 text-white rounded-lg font-semibold">Post Hours</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
