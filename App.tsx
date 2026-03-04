
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import DealDashboard from './components/DealDashboard';
import ChatInterface from './components/ChatInterface';
import WaterfallModeler from './components/WaterfallModeler';
import UnderwritingVetting from './components/UnderwritingVetting';
import MarketIntelligence from './components/MarketIntelligence';
import ProAcademy from './components/ProAcademy';
import { DealMetrics, AssetType } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showSuggestion, setShowSuggestion] = useState(true);
  const [assetType, setAssetType] = useState<AssetType>(AssetType.MULTIFAMILY);
  const [metrics, setMetrics] = useState<DealMetrics>({
    purchasePrice: 45000000,
    units: 200,
    noi: 2250000,
    debtAmount: 29250000,
    interestRate: 6.25,
    exitCap: 5.25,
    holdPeriod: 5,
  });

  // Hide suggestion once user visits Academy
  useEffect(() => {
    if (activeTab === 'academy') {
      setShowSuggestion(false);
    }
  }, [activeTab]);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DealDashboard metrics={metrics} setMetrics={setMetrics} assetType={assetType} setAssetType={setAssetType} />;
      case 'chat':
        return <ChatInterface metrics={metrics} assetType={assetType} />;
      case 'vetting':
        return <UnderwritingVetting />;
      case 'waterfall':
        return <WaterfallModeler metrics={metrics} />;
      case 'market':
        return <MarketIntelligence />;
      case 'academy':
        return <ProAcademy />;
      default:
        return <DealDashboard metrics={metrics} setMetrics={setMetrics} assetType={assetType} setAssetType={setAssetType} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-950">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 overflow-y-auto px-10 py-8 relative">
        {/* Onboarding Suggestion */}
        {showSuggestion && activeTab !== 'academy' && (
          <div className="mb-8 p-4 bg-blue-600/20 border border-blue-500/30 rounded-xl flex items-center justify-between animate-in slide-in-from-top-4 duration-500">
            <div className="flex items-center space-x-3">
              <span className="text-xl">🎓</span>
              <div>
                <p className="text-sm font-bold text-blue-100 tracking-tight">New to the platform or Capital Markets?</p>
                <p className="text-[11px] text-blue-400 font-medium">Head over to the <button onClick={() => setActiveTab('academy')} className="underline font-bold hover:text-blue-300">Pro Academy</button> to master institutional underwriting and tool navigation.</p>
              </div>
            </div>
            <button onClick={() => setShowSuggestion(false)} className="text-blue-400 hover:text-blue-200">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>
        )}

        <div className="max-w-7xl mx-auto space-y-12">
          {renderContent()}
        </div>
      </main>

      {/* Persistent Assistant HUD */}
      <div className="fixed bottom-6 right-6 z-50">
        <button 
          onClick={() => setActiveTab('chat')}
          className="bg-blue-600 hover:bg-blue-500 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-2xl shadow-blue-500/20 transition-all hover:scale-110 group"
        >
          <span className="text-2xl group-hover:hidden">🤖</span>
          <span className="hidden group-hover:block text-xs font-bold uppercase">Chat</span>
        </button>
      </div>
    </div>
  );
};

export default App;
