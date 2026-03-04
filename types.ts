
export enum AssetType {
  MULTIFAMILY = 'Multifamily',
  STUDENT_HOUSING = 'Student Housing',
}

export interface DealMetrics {
  purchasePrice: number;
  units: number;
  noi: number;
  debtAmount: number;
  interestRate: number;
  exitCap: number;
  holdPeriod: number;
}

export interface WaterfallHurdle {
  irr: number;
  promote: number; // GP share of cash flow after LP gets their preferred return
}

export interface AnalysisState {
  assetType: AssetType;
  metrics: DealMetrics;
  market: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  type?: 'analysis' | 'text' | 'calculation';
}

export interface VettingPillar {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'warning' | 'verified';
  details: string;
}

export interface MarketIndex {
  symbol: string;
  name: string;
  price: string;
  change: string;
  isUp: boolean;
}

export interface StockWatchlistEntry {
  symbol: string;
  lastPrice?: string;
}
