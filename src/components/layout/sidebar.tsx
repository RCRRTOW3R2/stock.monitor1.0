'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  BarChart3, 
  TrendingUp, 
  MessageSquare, 
  Settings, 
  Home,
  Activity,
  AlertCircle,
  Target
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
  {
    name: 'Dashboard',
    href: '/',
    icon: Home,
  },
  {
    name: 'Top 10',
    href: '/top10',
    icon: Target,
  },
  {
    name: 'Reddit Trends',
    href: '/reddit',
    icon: MessageSquare,
  },
  {
    name: 'Analytics',
    href: '/analytics',
    icon: BarChart3,
  },
  {
    name: 'Alerts',
    href: '/alerts',
    icon: AlertCircle,
  },
  {
    name: 'Settings',
    href: '/settings',
    icon: Settings,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="sidebar w-64 h-screen fixed left-0 top-0 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-navy-800">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gradient">
              Momentum
            </h1>
            <p className="text-xs text-navy-400">Trading Dashboard</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={cn(
                    'nav-item',
                    isActive && 'active'
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-navy-800">
        <div className="flex items-center gap-3 p-3 rounded-lg bg-navy-800/30">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <div className="flex-1">
            <p className="text-xs font-medium text-navy-200">System Status</p>
            <p className="text-xs text-navy-400">All systems operational</p>
          </div>
        </div>
      </div>
    </div>
  );
} 