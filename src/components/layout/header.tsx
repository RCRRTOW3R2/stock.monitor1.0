'use client';

import { useState } from 'react';
import { Search, RefreshCw, Bell, Settings, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatRelativeTime } from '@/lib/utils';

interface HeaderProps {
  onRefresh?: () => void;
  lastUpdate?: Date;
  isLoading?: boolean;
}

export function Header({ onRefresh, lastUpdate, isLoading = false }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement search functionality
    console.log('Search:', searchQuery);
  };

  return (
    <header className="header h-16 flex items-center justify-between px-6 ml-64">
      {/* Search */}
      <div className="flex-1 max-w-md">
        <form onSubmit={handleSearch} className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-navy-400" />
          <input
            type="text"
            placeholder="Search symbols..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input w-full pl-10 pr-4"
          />
        </form>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        {/* Last Update */}
        {lastUpdate && (
          <div className="text-sm text-navy-400">
            Last updated: {formatRelativeTime(lastUpdate)}
          </div>
        )}

        {/* Refresh Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onRefresh}
          disabled={isLoading}
          className="hover:bg-navy-800/50"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
        </Button>

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="hover:bg-navy-800/50 relative">
          <Bell className="w-4 h-4" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-orange-500 rounded-full"></span>
        </Button>

        {/* Settings */}
        <Button variant="ghost" size="icon" className="hover:bg-navy-800/50">
          <Settings className="w-4 h-4" />
        </Button>

        {/* Profile */}
        <Button variant="ghost" size="icon" className="hover:bg-navy-800/50">
          <User className="w-4 h-4" />
        </Button>
      </div>
    </header>
  );
} 