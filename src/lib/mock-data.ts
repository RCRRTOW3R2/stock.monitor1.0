import type { StockData, RedditData, Top10Stock, ChartDataPoint, DashboardStats } from '@/types';

// Generate random number within range
const random = (min: number, max: number) => Math.random() * (max - min) + min;

// Generate random boolean with probability
const randomBool = (probability = 0.5) => Math.random() < probability;

const SYMBOLS = [
  { symbol: 'TSLA', name: 'Tesla Inc' },
  { symbol: 'AAPL', name: 'Apple Inc' },
  { symbol: 'NVDA', name: 'NVIDIA Corporation' },
  { symbol: 'PLTR', name: 'Palantir Technologies' },
  { symbol: 'SOFI', name: 'SoFi Technologies' },
  { symbol: 'RBLX', name: 'Roblox Corporation' },
  { symbol: 'HOOD', name: 'Robinhood Markets' },
  { symbol: 'NET', name: 'Cloudflare Inc' },
  { symbol: 'SHOP', name: 'Shopify Inc' },
  { symbol: 'SQ', name: 'Block Inc' },
  { symbol: 'PYPL', name: 'PayPal Holdings' },
  { symbol: 'ROKU', name: 'Roku Inc' },
  { symbol: 'DKNG', name: 'DraftKings Inc' },
  { symbol: 'COIN', name: 'Coinbase Global' },
  { symbol: 'U', name: 'Unity Software' },
  { symbol: 'ABNB', name: 'Airbnb Inc' },
  { symbol: 'UBER', name: 'Uber Technologies' },
  { symbol: 'LYFT', name: 'Lyft Inc' },
  { symbol: 'PINS', name: 'Pinterest Inc' },
  { symbol: 'SNAP', name: 'Snap Inc' },
  { symbol: 'TWTR', name: 'Twitter Inc' },
  { symbol: 'META', name: 'Meta Platforms' },
  { symbol: 'GOOGL', name: 'Alphabet Inc' },
  { symbol: 'AMZN', name: 'Amazon.com Inc' },
  { symbol: 'MSFT', name: 'Microsoft Corporation' },
  { symbol: 'AMD', name: 'Advanced Micro Devices' },
  { symbol: 'INTC', name: 'Intel Corporation' },
  { symbol: 'CRM', name: 'Salesforce Inc' },
  { symbol: 'SNOW', name: 'Snowflake Inc' },
  { symbol: 'ZM', name: 'Zoom Video Communications' },
];

export function generateMockStockData(): StockData[] {
  return SYMBOLS.map((stock, index) => {
    const basePrice = random(10, 500);
    const change = random(-15, 15);
    const changePercent = (change / basePrice) * 100;
    
    // Generate realistic technical indicators
    const mom21 = random(-20, 30);
    const mom42 = random(-25, 40);
    const mom63 = random(-30, 50);
    const rsi14 = random(20, 80);
    
    // Generate signal flags based on indicators
    const trend_ok = mom42 > 5 && rsi14 < 70;
    const momentum_ok = mom21 > 0 && mom42 > mom21;
    const rvol_ok = random(0.8, 2.5) > 1.2;
    
    const entry_signal = trend_ok && momentum_ok && rvol_ok && rsi14 < 50;
    const exit_signal = rsi14 > 75 || mom21 < -10;
    
    let status: StockData['status'] = 'none';
    if (entry_signal) status = 'entry';
    else if (exit_signal) status = 'exit';
    else if (randomBool(0.3)) status = 'long';
    
    return {
      symbol: stock.symbol,
      name: stock.name,
      close: basePrice,
      change,
      changePercent,
      volume: Math.floor(random(1000000, 50000000)),
      marketCap: Math.floor(random(1e9, 1e12)),
      
      // Technical indicators
      mom21,
      mom42,
      mom63,
      rsi14,
      atr14: random(1, 8),
      rvol10: random(0.5, 3.0),
      rvol20: random(0.6, 2.8),
      sma50: basePrice * random(0.9, 1.1),
      ema21: basePrice * random(0.95, 1.05),
      macd_hist: random(-2, 2),
      vol21: random(0.15, 0.45),
      
      // Signal flags
      trend_ok,
      momentum_ok,
      rvol_ok,
      entry_signal,
      exit_signal,
      
      // Status
      status,
      position: status === 'long' ? 1 : 0,
      
      // Metadata
      last_updated: new Date().toISOString(),
    };
  });
}

export function generateMockRedditData(): RedditData[] {
  const trendingSymbols = ['TSLA', 'NVDA', 'AAPL', 'PLTR', 'AMD', 'SOFI', 'HOOD', 'SNAP', 'COIN', 'RBLX'];
  
  return trendingSymbols.map((symbol, index) => {
    const mentions = Math.floor(random(5, 150));
    const sentiment = random(-0.8, 0.8);
    
    let sentimentTrend: RedditData['sentimentTrend'] = 'neutral';
    if (sentiment > 0.2) sentimentTrend = 'bullish';
    else if (sentiment < -0.2) sentimentTrend = 'bearish';
    
    return {
      symbol,
      rank: index + 1,
      mentions,
      avgScore: random(50, 800),
      sentiment,
      sentimentTrend,
      strength: random(0.3, 0.9),
      recentPosts: [
        {
          title: `${symbol} is ${sentimentTrend === 'bullish' ? 'going to the moon' : sentimentTrend === 'bearish' ? 'looking bearish' : 'sideways'}! Here's why...`,
          score: Math.floor(random(100, 2000)),
          url: '#',
        },
        {
          title: `DD on ${symbol} - ${sentimentTrend === 'bullish' ? 'Buy the dip' : 'Time to exit?'}`,
          score: Math.floor(random(50, 1500)),
          url: '#',
        },
      ],
    };
  });
}

export function generateMockTop10Data(): Top10Stock[] {
  const topSymbols = SYMBOLS.slice(0, 10);
  
  return topSymbols.map((stock, index) => {
    const basePrice = random(50, 300);
    const change = random(-10, 15);
    const changePercent = (change / basePrice) * 100;
    
    // Generate sparkline data (30 points)
    const sparklineData = Array.from({ length: 30 }, (_, i) => {
      const volatility = random(0.95, 1.05);
      return basePrice * volatility + (Math.sin(i / 5) * random(-5, 5));
    });
    
    let recommendation: Top10Stock['recommendation'] = 'hold';
    const score = random(0.2, 0.9);
    
    if (score > 0.7) recommendation = 'strong_buy';
    else if (score > 0.6) recommendation = 'buy';
    else if (score < 0.3) recommendation = 'strong_sell';
    else if (score < 0.4) recommendation = 'sell';
    
    return {
      rank: index + 1,
      symbol: stock.symbol,
      name: stock.name,
      score,
      change,
      changePercent,
      close: basePrice,
      sparklineData,
      recommendation,
    };
  });
}

export function generateMockChartData(symbol: string): ChartDataPoint[] {
  const basePrice = random(50, 300);
  const points: ChartDataPoint[] = [];
  
  // Generate 90 days of data
  for (let i = 0; i < 90; i++) {
    const date = new Date();
    date.setDate(date.getDate() - (89 - i));
    
    // Generate price with some trend and volatility
    const trend = Math.sin(i / 20) * 10;
    const noise = (Math.random() - 0.5) * 20;
    const price = Math.max(5, basePrice + trend + noise);
    
    points.push({
      timestamp: date.toISOString().split('T')[0],
      close: price,
      sma50: price * random(0.95, 1.05),
      ema21: price * random(0.98, 1.02),
      rsi14: random(30, 70),
      macd: random(-2, 2),
      macd_signal: random(-1.5, 1.5),
      macd_hist: random(-1, 1),
      volume: Math.floor(random(1000000, 10000000)),
      rvol10: random(0.8, 2.0),
    });
  }
  
  return points;
}

export function generateMockDashboardStats(): DashboardStats {
  return {
    totalSymbols: 30,
    activePositions: Math.floor(random(8, 15)),
    entrySignals: Math.floor(random(3, 8)),
    exitSignals: Math.floor(random(1, 5)),
    bullishSentiment: Math.floor(random(12, 20)),
    bearishSentiment: Math.floor(random(3, 10)),
    lastUpdate: new Date().toISOString(),
  };
}

// Export mock data as default functions
export const mockStockData = generateMockStockData();
export const mockRedditData = generateMockRedditData();
export const mockTop10Data = generateMockTop10Data();
export const mockDashboardStats = generateMockDashboardStats(); 