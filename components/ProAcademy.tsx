
import React from 'react';
import Term from './Term';

const ProAcademy: React.FC = () => {
  const modules = [
    {
      title: "Module 1: Tool Mastery",
      description: "How to leverage CapMarkets Pro for IC (Investment Committee) reporting.",
      lessons: [
        "Interactive Underwriting: Use the Dashboard to live-stress your entry and exit assumptions.",
        "Waterfall Logic: Visualize how the Promote impacts GP equity multiples in real-time.",
        "Grounding Search: Use the Market Intelligence tab to fetch real-time news for REITs and macro trends."
      ]
    },
    {
      title: "Module 2: The 4-Pillar Underwriting Framework",
      description: "The institutional standard for vetting Multifamily and Student Housing deals.",
      lessons: [
        "Revenue Integrity: Identifying 'Softness' in the rent roll. Look for excessive concessions and aged delinquencies.",
        "Expense Normalization: Benchmarking OpEx. Institutional standards range from $5,500-$7,500/unit.",
        "Capital Stack: Understanding the priority of payments between Senior Debt, Mezzanine, and Preferred Equity.",
        "Macro-Micro Linkage: How SOFR spreads and university enrollment caps dictate asset pricing."
      ]
    },
    {
      title: "Module 3: Institutional Landmines",
      description: "Advanced pitfalls that catch junior analysts off-guard.",
      lessons: [
        "The Student Housing 'Turn': Underestimating specialized cleaning and maintenance costs during the August transition.",
        "RUBS Double-Counting: Ensuring utility reimbursements aren't inflating the NOI twice in your model.",
        "Tax Reassessments: Accounting for the 'Purchase Price' bump in property taxes upon sale."
      ]
    }
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-5xl">
      <header className="border-b border-slate-800 pb-8">
        <div className="flex items-center space-x-3 mb-4">
          <span className="bg-amber-500/10 text-amber-400 text-xs font-bold px-2 py-1 rounded border border-amber-500/20 uppercase tracking-widest">
            Institutional Training
          </span>
        </div>
        <h2 className="text-4xl font-bold text-slate-100 mb-4">Pro Academy: Capital Markets Associate Track</h2>
        <p className="text-slate-400 text-lg leading-relaxed">
          Welcome to the Associate training program. This module bridges the gap between basic real estate math and institutional-grade investment strategy. 
          Use this guide to master the <span className="text-blue-400 font-semibold">CapMarkets Pro</span> toolset while building your fundamental market knowledge.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-8">
        {modules.map((mod, idx) => (
          <div key={idx} className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 hover:border-blue-500/30 transition-all group">
            <h3 className="text-2xl font-bold text-slate-100 mb-2 group-hover:text-blue-400 transition-colors">{mod.title}</h3>
            <p className="text-sm text-slate-500 mb-8">{mod.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mod.lessons.map((lesson, lIdx) => (
                <div key={lIdx} className="bg-slate-950/50 border border-slate-800 rounded-xl p-5 flex items-start space-x-4">
                  <div className="w-6 h-6 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center text-[10px] font-bold mt-1 shrink-0">
                    {lIdx + 1}
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed font-medium">
                    {lesson}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <section className="bg-indigo-900/10 border border-indigo-500/20 rounded-2xl p-10 flex flex-col md:flex-row items-center gap-10">
        <div className="flex-1 space-y-4">
          <h3 className="text-2xl font-bold text-indigo-100">Associate Pro Tip: Use the Knowledge Overlay</h3>
          <p className="text-slate-400 leading-relaxed italic text-sm">
            "Throughout the platform, you'll see terms with dotted underlines like <Term name="Yield Maintenance" /> or <Term name="Exit Cap" />. 
            Hover over these at any time to get a professional briefing. This is how we ensure every analyst speaks the same institutional language."
          </p>
        </div>
        <div className="text-6xl grayscale opacity-50 shrink-0">🏛️</div>
      </section>

      <footer className="text-center py-10">
        <p className="text-xs text-slate-600 uppercase tracking-[0.2em] font-bold">
          CapMarkets Pro Associate Certification v1.0
        </p>
      </footer>
    </div>
  );
};

export default ProAcademy;
