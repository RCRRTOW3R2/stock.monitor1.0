'use client';

import { TrendingUp, TrendingDown, Activity, Target, MessageSquare, AlertTriangle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import type { DashboardStats as StatsType } from '@/types';

interface DashboardStatsProps {
  stats: StatsType;
}

export function DashboardStats({ stats }: DashboardStatsProps) {
  const statCards = [
    {
      title: 'Total Symbols',
      value: stats.totalSymbols.toString(),
      icon: Activity,
      color: 'text-blue-400',
      bgColor: 'bg-blue-400/10',
    },
    {
      title: 'Active Positions',
      value: stats.activePositions.toString(),
      icon: Target,
      color: 'text-green-400',
      bgColor: 'bg-green-400/10',
    },
    {
      title: 'Entry Signals',
      value: stats.entrySignals.toString(),
      icon: TrendingUp,
      color: 'text-orange-400',
      bgColor: 'bg-orange-400/10',
    },
    {
      title: 'Exit Signals',
      value: stats.exitSignals.toString(),
      icon: TrendingDown,
      color: 'text-red-400',
      bgColor: 'bg-red-400/10',
    },
    {
      title: 'Bullish Sentiment',
      value: stats.bullishSentiment.toString(),
      icon: MessageSquare,
      color: 'text-green-400',
      bgColor: 'bg-green-400/10',
    },
    {
      title: 'Bearish Sentiment',
      value: stats.bearishSentiment.toString(),
      icon: AlertTriangle,
      color: 'text-red-400',
      bgColor: 'bg-red-400/10',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {statCards.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className="border-navy-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-navy-400 font-medium uppercase tracking-wide">
                    {stat.title}
                  </p>
                  <p className="text-xl font-bold text-foreground mt-1">
                    {stat.value}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
} 