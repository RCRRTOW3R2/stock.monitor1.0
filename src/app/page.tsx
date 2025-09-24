'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/layout/header';
import { Sidebar } from '@/components/layout/sidebar';
import { StockTable } from '@/components/dashboard/stock-table';
import { DashboardStats } from '@/components/dashboard/dashboard-stats';
import { SymbolDetailDrawer } from '@/components/dashboard/symbol-detail-drawer';
import { mockStockData, mockDashboardStats } from '@/lib/mock-data';
import type { StockData } from '@/types';

export default function Dashboard() {
  const [stocks, setStocks] = useState<StockData[]>(mockStockData);
  const [selectedSymbol, setSelectedSymbol] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  const handleRefresh = async () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setStocks(mockStockData);
      setLastUpdate(new Date());
      setIsLoading(false);
    }, 1000);
  };

  const handleSymbolClick = (symbol: string) => {
    setSelectedSymbol(symbol);
  };

  const selectedStock = stocks.find(stock => stock.symbol === selectedSymbol);

  return (
    <div className="min-h-screen bg-gradient-navy">
      <Sidebar />
      
      <div className="ml-64">
        <Header 
          onRefresh={handleRefresh}
          lastUpdate={lastUpdate}
          isLoading={isLoading}
        />

        <main className="p-6 space-y-6">
          {/* Dashboard Stats */}
          <DashboardStats stats={mockDashboardStats} />

          {/* Main Data Table */}
          <div className="dashboard-card">
            <div className="p-6 border-b border-navy-700">
              <h2 className="text-xl font-semibold text-foreground">Portfolio Overview</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Real-time technical analysis and momentum signals
              </p>
            </div>
            
            <StockTable 
              data={stocks}
              onSymbolClick={handleSymbolClick}
              isLoading={isLoading}
            />
          </div>
        </main>
      </div>

      {/* Symbol Detail Drawer */}
      {selectedStock && (
        <SymbolDetailDrawer
          stock={selectedStock}
          isOpen={!!selectedSymbol}
          onClose={() => setSelectedSymbol(null)}
        />
      )}
    </div>
  );
} 