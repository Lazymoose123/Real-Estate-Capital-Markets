
import React from 'react';

interface MetricCardProps {
  label: string;
  value: string | number;
  subValue?: string;
  icon?: string;
  trend?: 'up' | 'down' | 'neutral';
}

const MetricCard: React.FC<MetricCardProps> = ({ label, value, subValue, icon, trend }) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-blue-500/30 transition-colors shadow-sm">
      <div className="flex justify-between items-start mb-2">
        <span className="text-slate-400 text-sm font-medium uppercase tracking-tighter">{label}</span>
        {icon && <span className="text-lg">{icon}</span>}
      </div>
      <div className="flex items-baseline space-x-2">
        <h3 className="text-2xl font-bold text-slate-100 mono">{value}</h3>
        {trend && (
          <span className={`text-xs px-1.5 py-0.5 rounded ${
            trend === 'up' ? 'bg-green-500/10 text-green-400' : 
            trend === 'down' ? 'bg-red-500/10 text-red-400' : 'bg-slate-700/50 text-slate-400'
          }`}>
            {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '•'}
          </span>
        )}
      </div>
      {subValue && <p className="text-xs text-slate-500 mt-1">{subValue}</p>}
    </div>
  );
};

export default MetricCard;
