
import React, { useState, useMemo } from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  ComposedChart, Bar, Cell
} from 'recharts';
import { MarketIndex, StockWatchlistEntry } from '../types';
import { getStockIntelligence } from '../services/geminiService';
import Term from './Term';

const INDICES: MarketIndex[] = [
  { symbol: 'SPX', name: 'S&P 500', price: '5,021.44', change: '+1.2%', isUp: true },
  { symbol: 'IXIC', name: 'Nasdaq Composite', price: '15,990.66', change: '+1.5%', isUp: true },
  { symbol: 'DJI', name: 'Dow Jones', price: '38,627.99', change: '-0.3%', isUp: false },
  { symbol: 'XAU', name: 'Gold (Oz)', price: '$2,024.50', change: '+0.4%', isUp: true },
  { symbol: 'XAG', name: 'Silver (Oz)', price: '$22.85', change: '-0.8%', isUp: false },
];

const TIMEFRAMES = ['1D', '5D', '15D', '30D', '3M', '6M', '1Y', '3Y', '5Y'];

// Custom Candle Component for Recharts
const Candle = (props: any) => {
  const { x, y, width, height, low, high, open, close } = props;
  const isUp = close >= open;
  const color = isUp ? '#10b981' : '#f43f5e';
  
  // Wick coordinates
  const ratio = height / Math.abs(open - close);
  const wickTop = y - (high - Math.max(open, close)) * ratio;
  const wickBottom = y + height + (Math.min(open, close) - low) * ratio;

  return (
    <g>
      {/* Wick */}
      <line
        x1={x + width / 2}
        y1={wickTop}
        x2={x + width / 2}
        y2={wickBottom}
        stroke={color}
        strokeWidth={1}
      />
      {/* Body */}
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={color}
      />
    </g>
  );
};

// Helper to generate simulated historical OHLC data
const generateChartData = (symbol: string, timeframe: string) => {
  const points = 40;
  const basePrice = symbol === 'AMT' ? 180 : symbol === 'PLD' ? 120 : symbol === 'EQIX' ? 750 : 150;
  const data = [];
  let lastClose = basePrice;
  
  for (let i = 0; i < points; i++) {
    const volatility = timeframe.includes('D') ? 0.008 : 0.025;
    const open = lastClose;
    const change = open * (Math.random() - 0.48) * volatility;
    const close = open + change;
    const high = Math.max(open, close) + (Math.random() * open * volatility * 0.6);
    const low = Math.min(open, close) - (Math.random() * open * volatility * 0.6);
    
    lastClose = close;
    data.push({
      time: i,
      open: parseFloat(open.toFixed(2)),
      close: parseFloat(close.toFixed(2)),
      high: parseFloat(high.toFixed(2)),
      low: parseFloat(low.toFixed(2)),
      price: parseFloat(close.toFixed(2)), // For line chart compatibility
    });
  }
  return data;
};

const MarketIntelligence: React.FC = () => {
  const [watchlist, setWatchlist] = useState<StockWatchlistEntry[]>([
    { symbol: 'AMT' },
    { symbol: 'PLD' },
    { symbol: 'EQIX' }
  ]);
  const [newTicker, setNewTicker] = useState('');
  const [selectedTicker, setSelectedTicker] = useState<string | null>(null);
  const [currentTimeframe, setCurrentTimeframe] = useState('30D');
  const [chartType, setChartType] = useState<'line' | 'candle'>('line');
  const [intelligence, setIntelligence] = useState<{ ticker: string; report: string; sources: any[] } | null>(null);
  const [loading, setLoading] = useState(false);

  const chartData = useMemo(() => {
    if (!selectedTicker) return [];
    return generateChartData(selectedTicker, currentTimeframe);
  }, [selectedTicker, currentTimeframe]);

  const addTicker = (e: React.FormEvent) => {
    e.preventDefault();
    const ticker = newTicker.toUpperCase().trim();
    if (!ticker) return;
    if (!watchlist.find(s => s.symbol === ticker)) {
      setWatchlist([...watchlist, { symbol: ticker }]);
    }
    handleSelectTicker(ticker);
    setNewTicker('');
  };

  const removeTicker = (symbol: string) => {
    setWatchlist(watchlist.filter(s => s.symbol !== symbol));
    if (selectedTicker === symbol) setSelectedTicker(null);
  };

  const handleSelectTicker = async (ticker: string) => {
    setSelectedTicker(ticker);
    setLoading(true);
    setIntelligence(null);
    try {
      const result = await getStockIntelligence(ticker);
      setIntelligence({ ticker, report: result.text, sources: result.sources });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const isTickerInWatchlist = (ticker: string) => watchlist.some(s => s.symbol === ticker);

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <header>
        <h2 className="text-3xl font-bold text-slate-100 tracking-tight">Capital Markets Terminal</h2>
        <p className="text-slate-400 mt-2 font-medium tracking-tight italic">
          Macro liquidity indicators & catalyst-driven intelligence briefings.
        </p>
      </header>

      {/* Macro Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {INDICES.map((index) => (
          <div key={index.symbol} className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-sm hover:border-slate-700 transition-colors">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">{index.name}</span>
              <span className={`text-[10px] font-bold ${index.isUp ? 'text-emerald-400' : 'text-rose-400'}`}>
                {index.change}
              </span>
            </div>
            <div className="text-xl font-bold text-slate-100 mono">{index.price}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Watchlist Section */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
            <h3 className="text-xs font-bold text-slate-100 uppercase tracking-widest mb-6 flex items-center justify-between border-b border-slate-800 pb-3">
              Watchlist
              <span className="text-[10px] font-normal text-slate-500">{watchlist.length} Assets</span>
            </h3>
            
            <form onSubmit={addTicker} className="flex gap-2 mb-6">
              <input 
                type="text" 
                value={newTicker}
                onChange={(e) => setNewTicker(e.target.value)}
                placeholder="Search Ticker..."
                className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder-slate-600"
              />
              <button className="bg-slate-800 hover:bg-slate-700 text-slate-200 w-10 h-10 flex items-center justify-center rounded-lg transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              </button>
            </form>

            <div className="space-y-1">
              {watchlist.map((stock) => (
                <button 
                  key={stock.symbol} 
                  onClick={() => handleSelectTicker(stock.symbol)}
                  className={`w-full group flex items-center justify-between p-3 rounded-xl transition-all border ${
                    selectedTicker === stock.symbol 
                      ? 'bg-blue-600/10 border-blue-500/40 text-blue-400 shadow-lg' 
                      : 'bg-transparent border-transparent text-slate-400 hover:bg-slate-800/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`text-sm font-bold mono ${selectedTicker === stock.symbol ? 'text-blue-300' : 'text-slate-100'}`}>
                      {stock.symbol}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-slate-600 group-hover:text-slate-400">EQTY</span>
                    <button 
                      onClick={(e) => { e.stopPropagation(); removeTicker(stock.symbol); }}
                      className="text-slate-700 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Chart & Intelligence Section */}
        <div className="lg:col-span-9 space-y-6">
          {selectedTicker ? (
            <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
              {/* Header Info */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-xl font-black text-white shadow-lg shadow-blue-500/20">
                    {selectedTicker[0]}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-2xl font-bold text-slate-100 tracking-tight">{selectedTicker}</h3>
                      {!isTickerInWatchlist(selectedTicker) && (
                        <button 
                          onClick={() => setWatchlist([...watchlist, { symbol: selectedTicker }])}
                          className="text-[10px] font-bold uppercase text-blue-400 border border-blue-400/20 px-2 py-0.5 rounded hover:bg-blue-400/10"
                        >
                          + Watchlist
                        </button>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Capital Asset • Trading Desk</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  {/* Timeframe Selector */}
                  <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800">
                    {TIMEFRAMES.map((tf) => (
                      <button
                        key={tf}
                        onClick={() => setCurrentTimeframe(tf)}
                        className={`px-3 py-1.5 rounded-md text-[10px] font-bold transition-all ${
                          currentTimeframe === tf 
                            ? 'bg-slate-800 text-blue-400 shadow-inner' 
                            : 'text-slate-500 hover:text-slate-300'
                        }`}
                      >
                        {tf}
                      </button>
                    ))}
                  </div>
                  
                  {/* Line/Candle Toggle */}
                  <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800">
                    <button
                      onClick={() => setChartType('line')}
                      className={`p-1.5 rounded transition-all ${chartType === 'line' ? 'bg-slate-800 text-blue-400' : 'text-slate-600 hover:text-slate-400'}`}
                      title="Line Chart"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4"></path></svg>
                    </button>
                    <button
                      onClick={() => setChartType('candle')}
                      className={`p-1.5 rounded transition-all ${chartType === 'candle' ? 'bg-slate-800 text-blue-400' : 'text-slate-600 hover:text-slate-400'}`}
                      title="Candle Chart"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><rect x="4" y="8" width="4" height="8"/><rect x="10" y="4" width="4" height="14"/><rect x="16" y="10" width="4" height="6"/></svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Graph Container */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  {chartType === 'line' ? (
                    <AreaChart data={chartData}>
                      <defs>
                        <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                      <XAxis dataKey="time" hide />
                      <YAxis 
                        domain={['auto', 'auto']} 
                        orientation="right" 
                        stroke="#475569" 
                        fontSize={10} 
                        tickLine={false} 
                        axisLine={false}
                        tickFormatter={(val) => `$${val}`}
                      />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
                        itemStyle={{ color: '#60a5fa', fontWeight: 'bold' }}
                        labelStyle={{ display: 'none' }}
                        formatter={(val: any) => [`$${val}`, 'Price']}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="price" 
                        stroke="#3b82f6" 
                        strokeWidth={2}
                        fillOpacity={1} 
                        fill="url(#colorPrice)" 
                        animationDuration={1000}
                      />
                    </AreaChart>
                  ) : (
                    <ComposedChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                      <XAxis dataKey="time" hide />
                      <YAxis 
                        domain={['auto', 'auto']} 
                        orientation="right" 
                        stroke="#475569" 
                        fontSize={10} 
                        tickLine={false} 
                        axisLine={false}
                        tickFormatter={(val) => `$${val}`}
                      />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
                        itemStyle={{ color: '#60a5fa', fontWeight: 'bold' }}
                        labelStyle={{ color: '#64748b', fontSize: '10px' }}
                        formatter={(value: any, name: string) => [`$${value}`, name.toUpperCase()]}
                      />
                      <Bar 
                        dataKey="close" 
                        shape={(props: any) => <Candle {...props} {...props.payload} />}
                        animationDuration={1000}
                      />
                    </ComposedChart>
                  )}
                </ResponsiveContainer>
              </div>

              {/* Intelligence Feed */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  {loading ? (
                    <div className="bg-slate-950/50 border border-slate-800 rounded-2xl p-12 flex flex-col items-center justify-center space-y-4">
                      <div className="w-10 h-10 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
                      <p className="text-slate-500 font-mono text-[10px] tracking-widest uppercase">Executing Deep Analysis...</p>
                    </div>
                  ) : intelligence ? (
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl">
                      <div className="flex items-center gap-2 mb-6">
                        <span className="bg-blue-500/10 text-blue-400 text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-tighter">Catalyst Feed</span>
                        <h4 className="text-lg font-bold text-slate-100 italic">Institutional Associate Briefing</h4>
                      </div>
                      <div className="prose prose-invert prose-sm max-w-none text-slate-300 leading-relaxed space-y-4">
                        {intelligence.report}
                      </div>
                    </div>
                  ) : null}
                </div>

                <div className="space-y-6">
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
                    <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Market Verification</h4>
                    <div className="space-y-3">
                      {intelligence?.sources.slice(0, 5).map((source: any, idx: number) => (
                        source.web && (
                          <a 
                            key={idx} 
                            href={source.web.uri} 
                            target="_blank" 
                            rel="noreferrer"
                            className="block p-3 bg-slate-950 border border-slate-800 rounded-xl hover:border-blue-500/30 group transition-all"
                          >
                            <p className="text-[11px] font-bold text-slate-200 line-clamp-2 group-hover:text-blue-400 transition-colors leading-tight">
                              {source.web.title}
                            </p>
                            <div className="flex items-center justify-between mt-2">
                              <span className="text-[9px] text-slate-600 uppercase font-black tracking-tighter">Snippet Loaded</span>
                              <svg className="w-3 h-3 text-slate-700 group-hover:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                            </div>
                          </a>
                        )
                      ))}
                      {!intelligence && <p className="text-[10px] text-slate-600 italic">No catalysts detected.</p>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-[650px] bg-slate-950/30 border-2 border-dashed border-slate-800 rounded-2xl flex flex-col items-center justify-center text-center p-12 group hover:border-blue-500/20 transition-colors">
              <div className="w-24 h-24 bg-slate-900 rounded-full flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-2xl">
                <span className="text-5xl">🛰️</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-300 uppercase tracking-[0.3em]">System Standby</h3>
              <p className="text-slate-500 text-sm mt-6 max-w-lg leading-relaxed italic font-medium">
                Initialize the terminal by selecting a strategic asset from your watchlist or searching a global ticker. 
                Our AI engine will stream real-time OHLC data and institutional catalyst reports.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MarketIntelligence;
