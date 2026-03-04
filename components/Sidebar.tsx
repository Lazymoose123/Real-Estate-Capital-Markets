
import React from 'react';
import { AssetType } from '../types';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Deal Dashboard', icon: '📊' },
    { id: 'chat', label: 'Associate Chat', icon: '💬' },
    { id: 'vetting', label: 'Underwriting Vetting', icon: '🔍' },
    { id: 'waterfall', label: 'Waterfall Model', icon: '📈' },
    { id: 'market', label: 'Market Intelligence', icon: '🌐' },
    { id: 'academy', label: 'Pro Academy', icon: '🎓' },
  ];

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col h-screen sticky top-0">
      <div className="p-6 border-b border-slate-800">
        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
          CAPMARKETS PRO
        </h1>
        <p className="text-xs text-slate-500 mt-1 uppercase tracking-widest font-semibold">Institutional Grade</p>
      </div>

      <nav className="flex-1 mt-6 px-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
              activeTab === item.id
                ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20 shadow-lg'
                : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 bg-slate-950/50 border-t border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-white">
            SA
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-200">Sr. Associate AI</p>
            <p className="text-xs text-slate-500 italic">Gemini 3 Pro Engine</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
