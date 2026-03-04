
import React, { useState } from 'react';
import { DICTIONARY } from '../constants';

interface TermProps {
  name: string;
  children?: React.ReactNode;
}

const Term: React.FC<TermProps> = ({ name, children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const entry = DICTIONARY[name];

  if (!entry) {
    return <>{children || name}</>;
  }

  return (
    <span 
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <span className="cursor-help border-b border-dotted border-blue-400/60 hover:border-blue-400 transition-colors text-inherit">
        {children || name}
      </span>
      
      {isVisible && (
        <div className="absolute z-[100] bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-slate-900 border border-slate-700 rounded-lg shadow-2xl animate-in fade-in zoom-in duration-200 pointer-events-none">
          <div className="text-[10px] font-bold text-blue-400 uppercase tracking-tighter mb-1">Associate Briefing</div>
          <div className="text-xs font-bold text-slate-100 mb-1">{entry.title}</div>
          <div className="text-[11px] text-slate-400 leading-tight">
            {entry.definition}
          </div>
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-slate-700"></div>
        </div>
      )}
    </span>
  );
};

export default Term;
