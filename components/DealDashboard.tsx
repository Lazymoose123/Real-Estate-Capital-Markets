
import React from 'react';
import { DealMetrics, AssetType } from '../types';
import MetricCard from './MetricCard';
import Term from './Term';

interface DealDashboardProps {
  metrics: DealMetrics;
  setMetrics: (m: DealMetrics) => void;
  assetType: AssetType;
  setAssetType: (a: AssetType) => void;
}

const DealDashboard: React.FC<DealDashboardProps> = ({ metrics, setMetrics, assetType, setAssetType }) => {
  
  const capRate = (metrics.noi / metrics.purchasePrice) * 100;
  const pricePerUnit = metrics.purchasePrice / metrics.units;
  const loanToValue = (metrics.debtAmount / metrics.purchasePrice) * 100;

  const handleInputChange = (field: keyof DealMetrics, value: string) => {
    const num = parseFloat(value) || 0;
    setMetrics({ ...metrics, [field]: num });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-slate-100">Deal Underwriting Overview</h2>
          <p className="text-slate-400 mt-2">Institutional-grade baseline metrics and sanity checks.</p>
        </div>
        <div className="flex bg-slate-900 border border-slate-800 rounded-lg p-1">
          {Object.values(AssetType).map((type) => (
            <button
              key={type}
              onClick={() => setAssetType(type)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                assetType === type 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard label="Entry Cap Rate" value={`${capRate.toFixed(2)}%`} trend="neutral" icon="📉" />
        <MetricCard label="Price Per Unit" value={`$${pricePerUnit.toLocaleString(undefined, { maximumFractionDigits: 0 })}`} subValue="Institutional Core Market" icon="🏢" />
        <MetricCard label="LTV Ratio" value={`${loanToValue.toFixed(1)}%`} subValue={`$${(metrics.debtAmount/1000000).toFixed(1)}M Loan Amount`} icon="💰" />
        <MetricCard label="Implied Yield" value={`${(capRate + 2.5).toFixed(2)}%`} subValue="Est. Unlevered IRR" icon="⚡" />
      </div>

      <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-slate-100 flex items-center gap-2">
            <span className="w-1 h-6 bg-blue-500 rounded-full"></span>
            Acquisition Assumptions
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase">Purchase Price ($)</label>
              <input 
                type="number" 
                value={metrics.purchasePrice} 
                onChange={(e) => handleInputChange('purchasePrice', e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase">Total Units</label>
              <input 
                type="number" 
                value={metrics.units} 
                onChange={(e) => handleInputChange('units', e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase">In-Place <Term name="NOI" /></label>
              <input 
                type="number" 
                value={metrics.noi} 
                onChange={(e) => handleInputChange('noi', e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase"><Term name="Exit Cap" /> (%)</label>
              <input 
                type="number" 
                step="0.05"
                value={metrics.exitCap} 
                onChange={(e) => handleInputChange('exitCap', e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-slate-100 flex items-center gap-2">
            <span className="w-1 h-6 bg-indigo-500 rounded-full"></span>
            Financing Structure
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase">Debt Amount ($)</label>
              <input 
                type="number" 
                value={metrics.debtAmount} 
                onChange={(e) => handleInputChange('debtAmount', e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase">Interest Rate (%)</label>
              <input 
                type="number" 
                step="0.01"
                value={metrics.interestRate} 
                onChange={(e) => handleInputChange('interestRate', e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              />
            </div>
            <div className="space-y-2 col-span-2">
              <label className="text-xs font-bold text-slate-500 uppercase">Hold Period (Years)</label>
              <input 
                type="number" 
                value={metrics.holdPeriod} 
                onChange={(e) => handleInputChange('holdPeriod', e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              />
            </div>
          </div>
          <div className="p-4 bg-indigo-900/20 border border-indigo-500/20 rounded-lg">
            <p className="text-xs text-indigo-300 font-medium"><Term name="DSCR" />: <span className="mono">{(metrics.noi / (metrics.debtAmount * (metrics.interestRate/100))).toFixed(2)}x</span></p>
            <p className="text-[10px] text-indigo-400/70 mt-1 italic">Note: Institutional ICs typically require >1.25x for fixed-rate agency financing.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealDashboard;
