
import React from 'react';
import { VettingPillar } from '../types';
import Term from './Term';

const PILLARS: VettingPillar[] = [
  {
    id: 'rev',
    title: 'Revenue Integrity',
    description: 'Rent roll audit for softness and lease-up concessions.',
    status: 'warning',
    details: 'Identify heavy use of "1-month free" amortized into base rent. Check delinquency vs. T-12 historicals.'
  },
  {
    id: 'exp',
    title: 'Expense Normalization',
    description: 'Benchmarking OpEx against Tier-1 market standards.',
    status: 'pending',
    details: 'Benchmark $5.5k - $7.5k per unit. Watch for underestimated real estate tax reassessment on sale.'
  },
  {
    id: 'stack',
    title: 'Capital Stack & Legal',
    description: 'Debt covenants and preferred equity priority.',
    status: 'verified',
    details: 'DSCR checks out at current SOFR. Exit strategy accounts for Yield Maintenance penalties.'
  },
  {
    id: 'macro',
    title: 'Macro-Micro Linkage',
    description: 'Demand drivers and supply pipeline analysis.',
    status: 'pending',
    details: 'Evaluate university enrollment trends (Student) or local job growth (MF).'
  }
];

const UnderwritingVetting: React.FC = () => {
  return (
    <div className="space-y-8">
      <header>
        <h2 className="text-2xl font-bold text-slate-100">Senior Associate Vetting Protocol</h2>
        <p className="text-slate-400">Standard IC prep checklist for institutional acquisitions.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {PILLARS.map((pillar) => (
          <div key={pillar.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:bg-slate-800/50 transition-colors">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${
                  pillar.status === 'verified' ? 'bg-green-500' : 
                  pillar.status === 'warning' ? 'bg-amber-500' : 'bg-slate-600'
                }`}></div>
                <h3 className="text-lg font-bold text-slate-200">{pillar.title}</h3>
              </div>
              <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase tracking-widest ${
                pillar.status === 'verified' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 
                pillar.status === 'warning' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 
                'bg-slate-700/50 text-slate-400 border border-slate-600'
              }`}>
                {pillar.status}
              </span>
            </div>
            <p className="text-sm text-slate-400 mb-4">{pillar.description}</p>
            <div className="bg-slate-950 rounded-xl p-4 border border-slate-800">
              <h4 className="text-[10px] font-bold text-slate-500 uppercase mb-2">Associate Action Items</h4>
              <p className="text-xs text-slate-300 leading-relaxed italic">
                {pillar.id === 'stack' ? (
                  <>
                    <Term name="DSCR" /> checks out at current <Term name="SOFR" />. Exit strategy accounts for <Term name="Yield Maintenance" /> penalties.
                  </>
                ) : pillar.id === 'rev' ? (
                  <>
                    Check for <Term name="RUBS" /> double-counting. Evaluate concessions impact on <Term name="NOI" />.
                  </>
                ) : pillar.details}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="p-6 bg-blue-600/10 border border-blue-500/20 rounded-2xl flex items-center space-x-6">
        <div className="text-4xl">💡</div>
        <div>
          <h4 className="text-blue-400 font-bold uppercase tracking-widest text-xs">Pro Tip: <Term name="The Turn" /> Landmine</h4>
          <p className="text-slate-300 text-sm mt-1">
            In Student Housing, never underwrite less than $250/bed for <Term name="The Turn" /> expenses. 
            Commonly ignored: Furniture replacement reserves and specialized cleaning crews for high-impact units.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UnderwritingVetting;
