'use client';

import { useState, useMemo } from 'react';
import { ChevronUp, ChevronDown, ArrowUpDown } from 'lucide-react';
import { formatNumber, formatPercent, formatCurrency, getPercentageColor, cn } from '@/lib/utils';
import type { StockData, SortConfig } from '@/types';

interface StockTableProps {
  data: StockData[];
  onSymbolClick: (symbol: string) => void;
  isLoading?: boolean;
}

export function StockTable({ data, onSymbolClick, isLoading = false }: StockTableProps) {
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'mom42', direction: 'desc' });

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key] as number;
      const bValue = b[sortConfig.key] as number;

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [data, sortConfig]);

  const handleSort = (key: keyof StockData) => {
    setSortConfig(prevSort => ({
      key,
      direction: prevSort.key === key && prevSort.direction === 'desc' ? 'asc' : 'desc',
    }));
  };

  const getSortIcon = (columnKey: keyof StockData) => {
    if (sortConfig.key !== columnKey) {
      return <ArrowUpDown className="w-4 h-4 opacity-50" />;
    }
    return sortConfig.direction === 'asc' 
      ? <ChevronUp className="w-4 h-4" />
      : <ChevronDown className="w-4 h-4" />;
  };

  const getStatusBadge = (status: StockData['status']) => {
    switch (status) {
      case 'entry':
        return <span className="status-positive">ENTRY</span>;
      case 'exit':
        return <span className="status-negative">EXIT</span>;
      case 'long':
        return <span className="status-neutral">LONG</span>;
      default:
        return <span className="status-neutral">-</span>;
    }
  };

  const columns = [
    { key: 'symbol' as keyof StockData, label: 'Symbol', sortable: false },
    { key: 'close' as keyof StockData, label: 'Price', sortable: true },
    { key: 'changePercent' as keyof StockData, label: 'Change %', sortable: true },
    { key: 'mom21' as keyof StockData, label: 'MOM21', sortable: true },
    { key: 'mom42' as keyof StockData, label: 'MOM42', sortable: true },
    { key: 'mom63' as keyof StockData, label: 'MOM63', sortable: true },
    { key: 'rsi14' as keyof StockData, label: 'RSI14', sortable: true },
    { key: 'atr14' as keyof StockData, label: 'ATR14', sortable: true },
    { key: 'rvol10' as keyof StockData, label: 'RVOL10', sortable: true },
    { key: 'rvol20' as keyof StockData, label: 'RVOL20', sortable: true },
    { key: 'sma50' as keyof StockData, label: 'SMA50', sortable: true },
    { key: 'ema21' as keyof StockData, label: 'EMA21', sortable: true },
    { key: 'macd_hist' as keyof StockData, label: 'MACD', sortable: true },
    { key: 'vol21' as keyof StockData, label: 'Vol21', sortable: true },
    { key: 'status' as keyof StockData, label: 'Status', sortable: false },
  ];

  return (
    <div className="overflow-x-auto custom-scrollbar">
      <table className="data-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th 
                key={column.key}
                className={cn(
                  column.sortable && "cursor-pointer hover:bg-navy-700/50 transition-colors"
                )}
                onClick={() => column.sortable && handleSort(column.key)}
              >
                <div className="flex items-center gap-2">
                  <span>{column.label}</span>
                  {column.sortable && getSortIcon(column.key)}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            // Loading rows
            Array.from({ length: 10 }).map((_, index) => (
              <tr key={index}>
                {columns.map((column) => (
                  <td key={column.key}>
                    <div className="h-4 bg-navy-700/30 rounded animate-pulse"></div>
                  </td>
                ))}
              </tr>
            ))
          ) : (
            sortedData.map((stock) => (
              <tr 
                key={stock.symbol}
                onClick={() => onSymbolClick(stock.symbol)}
                className="hover:bg-navy-800/30 cursor-pointer transition-colors"
              >
                <td>
                  <div>
                    <div className="font-semibold text-white">{stock.symbol}</div>
                    <div className="text-xs text-navy-400">{stock.name}</div>
                  </div>
                </td>
                <td className="font-mono">
                  {formatCurrency(stock.close)}
                </td>
                <td className={cn("font-mono font-medium", getPercentageColor(stock.changePercent))}>
                  {formatPercent(stock.changePercent)}
                </td>
                <td className={cn("font-mono", getPercentageColor(stock.mom21))}>
                  {formatPercent(stock.mom21)}
                </td>
                <td className={cn("font-mono", getPercentageColor(stock.mom42))}>
                  {formatPercent(stock.mom42)}
                </td>
                <td className={cn("font-mono", getPercentageColor(stock.mom63))}>
                  {formatPercent(stock.mom63)}
                </td>
                <td className="font-mono">
                  <span className={cn(
                    stock.rsi14 > 70 ? 'text-red-400' : 
                    stock.rsi14 < 30 ? 'text-green-400' : 
                    'text-gray-400'
                  )}>
                    {formatNumber(stock.rsi14)}
                  </span>
                </td>
                <td className="font-mono text-gray-400">
                  {formatNumber(stock.atr14)}
                </td>
                <td className={cn("font-mono", stock.rvol10 > 1.5 ? 'text-orange-400' : 'text-gray-400')}>
                  {formatNumber(stock.rvol10)}
                </td>
                <td className={cn("font-mono", stock.rvol20 > 1.5 ? 'text-orange-400' : 'text-gray-400')}>
                  {formatNumber(stock.rvol20)}
                </td>
                <td className="font-mono text-gray-400">
                  {formatCurrency(stock.sma50)}
                </td>
                <td className="font-mono text-gray-400">
                  {formatCurrency(stock.ema21)}
                </td>
                <td className={cn("font-mono", getPercentageColor(stock.macd_hist))}>
                  {formatNumber(stock.macd_hist)}
                </td>
                <td className="font-mono text-gray-400">
                  {formatPercent(stock.vol21 * 100)}
                </td>
                <td>
                  {getStatusBadge(stock.status)}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
} 