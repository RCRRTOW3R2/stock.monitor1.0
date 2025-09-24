export interface StockData {
  symbol: string;
  name: string;
  close: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap?: number;
  
  // Technical indicators
  mom21: number;
  mom42: number;
  mom63: number;
  rsi14: number;
  atr14: number;
  rvol10: number;
  rvol20: number;
  sma50: number;
  ema21: number;
  macd_hist: number;
  vol21: number;
  
  // Signal flags
  trend_ok: boolean;
  momentum_ok: boolean;
  rvol_ok: boolean;
  entry_signal: boolean;
  exit_signal: boolean;
  
  // Status
  status: 'entry' | 'exit' | 'long' | 'none';
  position: number;
  
  // Metadata
  last_updated: string;
}

export interface RedditData {
  symbol: string;
  rank: number;
  mentions: number;
  avgScore: number;
  sentiment: number;
  sentimentTrend: 'bullish' | 'bearish' | 'neutral';
  strength: number;
  recentPosts: Array<{
    title: string;
    score: number;
    url: string;
  }>;
}

export interface Top10Stock {
  rank: number;
  symbol: string;
  name: string;
  score: number;
  change: number;
  changePercent: number;
  close: number;
  sparklineData: number[];
  recommendation: 'strong_buy' | 'buy' | 'hold' | 'sell' | 'strong_sell';
}

export interface ChartDataPoint {
  timestamp: string;
  close: number;
  sma50?: number;
  ema21?: number;
  rsi14?: number;
  macd?: number;
  macd_signal?: number;
  macd_hist?: number;
  volume?: number;
  rvol10?: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
  timestamp: string;
}

export interface DashboardStats {
  totalSymbols: number;
  activePositions: number;
  entrySignals: number;
  exitSignals: number;
  bullishSentiment: number;
  bearishSentiment: number;
  lastUpdate: string;
}

export interface PortfolioSummary {
  totalValue: number;
  totalReturn: number;
  totalReturnPercent: number;
  dayChange: number;
  dayChangePercent: number;
  bestPerformer: string;
  worstPerformer: string;
}

export interface SortConfig {
  key: keyof StockData;
  direction: 'asc' | 'desc';
}

export interface FilterConfig {
  signals?: ('entry' | 'exit' | 'long' | 'none')[];
  sentiment?: ('bullish' | 'bearish' | 'neutral')[];
  minMentions?: number;
  search?: string;
} 