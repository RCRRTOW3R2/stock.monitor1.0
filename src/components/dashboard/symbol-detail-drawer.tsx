'use client';

import { X, TrendingUp, TrendingDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatNumber, formatPercent, formatCurrency, getPercentageColor, cn } from '@/lib/utils';
import type { StockData } from '@/types';

interface SymbolDetailDrawerProps {
  stock: StockData;
  isOpen: boolean;
  onClose: () => void;
}

export function SymbolDetailDrawer({ stock, isOpen, onClose }: SymbolDetailDrawerProps) {
  if (!isOpen) return null;

  const keyMetrics = [
    { label: 'Price', value: formatCurrency(stock.close), change: stock.changePercent },
    { label: 'MOM42', value: formatPercent(stock.mom42), isPercentage: true },
    { label: 'RSI14', value: formatNumber(stock.rsi14), isRSI: true },
    { label: 'ATR14', value: formatNumber(stock.atr14) },
    { label: 'RVOL10', value: formatNumber(stock.rvol10), isVolume: true },
    { label: 'Vol21', value: formatPercent(stock.vol21 * 100) },
  ];

  const signals = [
    { label: 'Trend OK', value: stock.trend_ok },
    { label: 'Momentum OK', value: stock.momentum_ok },
    { label: 'Volume OK', value: stock.rvol_ok },
    { label: 'Entry Signal', value: stock.entry_signal },
    { label: 'Exit Signal', value: stock.exit_signal },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className="drawer-content w-96 h-full overflow-y-auto custom-scrollbar">
        {/* Header */}
        <div className="p-6 border-b border-navy-800">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">{stock.symbol}</h2>
              <p className="text-sm text-navy-400 mt-1">{stock.name}</p>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Price Overview */}
          <Card className="border-navy-700">
            <CardHeader>
              <CardTitle className="text-lg">Price Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-white">
                    {formatCurrency(stock.close)}
                  </span>
                  <div className={cn("flex items-center gap-1", getPercentageColor(stock.changePercent))}>
                    {stock.changePercent >= 0 ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : (
                      <TrendingDown className="w-4 h-4" />
                    )}
                    <span className="font-semibold">
                      {formatPercent(stock.changePercent)}
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-navy-400">SMA50:</span>
                    <span className="ml-2 text-white">{formatCurrency(stock.sma50)}</span>
                  </div>
                  <div>
                    <span className="text-navy-400">EMA21:</span>
                    <span className="ml-2 text-white">{formatCurrency(stock.ema21)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Key Metrics */}
          <Card className="border-navy-700">
            <CardHeader>
              <CardTitle className="text-lg">Key Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {keyMetrics.map((metric, index) => (
                  <div key={index} className="space-y-1">
                    <p className="text-xs text-navy-400 font-medium">{metric.label}</p>
                    <p className={cn(
                      "font-mono font-semibold",
                      metric.change !== undefined ? getPercentageColor(metric.change) :
                      metric.isPercentage ? getPercentageColor(parseFloat(metric.value.replace('%', ''))) :
                      metric.isRSI ? (
                        parseFloat(metric.value) > 70 ? 'text-red-400' :
                        parseFloat(metric.value) < 30 ? 'text-green-400' :
                        'text-gray-400'
                      ) :
                      metric.isVolume ? (
                        parseFloat(metric.value) > 1.5 ? 'text-orange-400' : 'text-gray-400'
                      ) :
                      'text-white'
                    )}>
                      {metric.value}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Signals */}
          <Card className="border-navy-700">
            <CardHeader>
              <CardTitle className="text-lg">Signal Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {signals.map((signal, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-navy-300">{signal.label}</span>
                    <div className={cn(
                      "w-3 h-3 rounded-full",
                      signal.value ? 'bg-green-400' : 'bg-gray-600'
                    )} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Momentum Analysis */}
          <Card className="border-navy-700">
            <CardHeader>
              <CardTitle className="text-lg">Momentum Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-xs text-navy-400">MOM21</p>
                    <p className={cn("font-mono font-semibold", getPercentageColor(stock.mom21))}>
                      {formatPercent(stock.mom21)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-navy-400">MOM42</p>
                    <p className={cn("font-mono font-semibold", getPercentageColor(stock.mom42))}>
                      {formatPercent(stock.mom42)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-navy-400">MOM63</p>
                    <p className={cn("font-mono font-semibold", getPercentageColor(stock.mom63))}>
                      {formatPercent(stock.mom63)}
                    </p>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-navy-700">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-navy-300">Current Status</span>
                    <span className={cn(
                      "px-2 py-1 rounded text-xs font-medium",
                      stock.status === 'entry' ? 'bg-green-400/10 text-green-400' :
                      stock.status === 'exit' ? 'bg-red-400/10 text-red-400' :
                      stock.status === 'long' ? 'bg-blue-400/10 text-blue-400' :
                      'bg-gray-400/10 text-gray-400'
                    )}>
                      {stock.status.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 