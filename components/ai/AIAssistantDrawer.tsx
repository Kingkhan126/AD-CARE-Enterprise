'use client';

import React, { useState } from 'react';
import { X, Sparkles, Send, Bot, User, ArrowRight, Zap, RefreshCw } from 'lucide-react';
import { useADCare } from '@/lib/context';

export const AIAssistantDrawer: React.FC = () => {
  const { isAIOpen, setIsAIOpen, aiMessages, sendAIMessage } = useADCare();
  const [input, setInput] = useState('');

  if (!isAIOpen) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendAIMessage(input.trim());
    setInput('');
  };

  const quickPrompts = [
    'Calculate Net Profit & Margins',
    'List Overdue Invoices',
    'Summarize Bank Liquidity',
    'Show Expense Breakdown'
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/40 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-200 border-l border-slate-200">
        {/* Drawer Header */}
        <div className="p-4 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-500 to-indigo-400 flex items-center justify-center shadow-md">
              <Sparkles className="w-4 h-4 text-white animate-spin-slow" />
            </div>
            <div>
              <h2 className="font-bold text-sm text-white flex items-center gap-2">
                AD CARE AI Assistant
                <span className="px-1.5 py-0.5 rounded text-[9px] bg-emerald-500/20 text-emerald-300 font-medium border border-emerald-500/30">Live Sync</span>
              </h2>
              <p className="text-[11px] text-slate-300">Financial Ledger Co-Pilot</p>
            </div>
          </div>
          <button
            onClick={() => setIsAIOpen(false)}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Suggested Quick Prompts */}
        <div className="p-3 bg-slate-50 border-b border-slate-200">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
            <Zap className="w-3 h-3 text-amber-500" />
            Suggested Financial Queries
          </div>
          <div className="flex flex-wrap gap-1.5">
            {quickPrompts.map((prompt) => (
              <button
                key={prompt}
                onClick={() => sendAIMessage(prompt)}
                className="px-2.5 py-1 bg-white hover:bg-brand-50 hover:text-brand-600 hover:border-brand-300 border border-slate-200 rounded-full text-[11px] font-medium text-slate-700 transition-all text-left shadow-2xs"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Messages Stream */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
          {aiMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'assistant' && (
                <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                  <Bot className="w-4 h-4" />
                </div>
              )}
              <div
                className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-brand-600 text-white rounded-tr-none shadow-sm'
                    : 'bg-white text-slate-800 border border-slate-200 shadow-sm rounded-tl-none space-y-1'
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.text}</div>
                <div className={`text-[9px] mt-1 ${msg.role === 'user' ? 'text-brand-200 text-right' : 'text-slate-400'}`}>
                  {msg.timestamp}
                </div>
              </div>
              {msg.role === 'user' && (
                <div className="w-7 h-7 rounded-lg bg-slate-800 text-white flex items-center justify-center shrink-0 mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask AD CARE AI about revenue, expenses, or invoices..."
            className="flex-1 px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 text-slate-900 bg-slate-50 focus:bg-white"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="p-2 bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white rounded-lg transition-colors shadow-sm"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
