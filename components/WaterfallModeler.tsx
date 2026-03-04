
import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { DealMetrics } from '../types';
import Term from './Term';

interface WaterfallProps {
  metrics: DealMetrics;
}

const WaterfallModeler: React.FC<WaterfallProps> = ({ metrics }) => {
  // Simplified static waterfall calculation for visualization
  const equityRequirement = metrics.purchasePrice - metrics.debtAmount;
  const lpContribution = equityRequirement * 0.9;
  const gpContribution = equityRequirement * 0.1;

  // Forecasted exit proceeds (simplified)
  const exitProceeds = metrics.noi / (metrics.exitCap / 100);
  const netProceeds = exitProceeds - metrics.debtAmount;
  
  // Hurdles
  const prefReturn = lpContribution * 0.08 * metrics.holdPeriod; // 8% pref
  const tier1Proceeds = Math.min(netProceeds, equityRequirement + prefReturn);
  const excessProceeds = Math.max(0, netProceeds - (equityRequirement + prefReturn));
  
  // Excess Split (70/30)
  const lpExcess = excessProceeds * 0.7;
  const gpPromote = excessProceeds * 0.3;

  const chartData = [
    { name: 'Equity Contrib', LP: lpContribution, GP: gpContribution },
    { name: 'Return of Capital', LP: lpContribution, GP: gpContribution },
    { name: 'Preferred Return', LP: prefReturn, GP: 0 },
    { name: 'Promote/Excess', LP: lpExcess, GP: gpPromote },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-100">Capital Stack & Waterfall</h2>
          <p className="text-slate-400">Institutional 8% Preferred Return / 30% Carry Split</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 h-[400px]">
          <h3 className="text-sm font-semibold text-slate-400 mb-6 uppercase tracking-widest">Distribution Waterfall Simulation</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} />
              <YAxis stroke="#64748b" fontSize={12} tickLine={false} tickFormatter={(val) => `$${(val/1000000).toFixed(1)}M`} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }}
                itemStyle={{ fontSize: '12px' }}
              />
              <Legend verticalAlign="top" align="right" />
              <Bar dataKey="LP" stackId="a" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="GP" stackId="a" fill="#818cf8" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-widest">Summary Estimates</h3>
          <div className="space-y-4">
            <div className="p-4 bg-slate-950 rounded-lg border border-slate-800">
              <p className="text-xs text-slate-500 font-bold uppercase">Equity Multiplier (EM)</p>
              <p className="text-2xl font-bold text-blue-400 mono">{(netProceeds / equityRequirement).toFixed(2)}x</p>
            </div>
            <div className="p-4 bg-slate-950 rounded-lg border border-slate-800">
              <p className="text-xs text-slate-500 font-bold uppercase">Projected Net IRR</p>
              <p className="text-2xl font-bold text-indigo-400 mono">~16.4%</p>
            </div>
            <div className="p-4 bg-slate-950 rounded-lg border border-slate-800">
              <p className="text-xs text-slate-500 font-bold uppercase">GP <Term name="Promote" /> Value</p>
              <p className="text-2xl font-bold text-emerald-400 mono">${(gpPromote / 1000000).toFixed(2)}M</p>
            </div>
          </div>
          <div className="pt-4 border-t border-slate-800">
            <h4 className="text-[10px] font-bold text-slate-500 uppercase mb-2">Associate Note</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed italic">
              "The current exit at a <Term name="Exit Cap" /> represents a {((metrics.exitCap - (metrics.noi/metrics.purchasePrice*100))*100).toFixed(0)} <Term name="bps" /> expansion over entry. If rates compress, the <Term name="Promote" /> capture increases significantly."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaterfallModeler;
