'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MapPin, AlertCircle, Eye, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { CommunityNeed } from '@/lib/types';

interface NeedCardProps {
  need: CommunityNeed;
  onAdopt?: (needId: string) => void;
}

export function NeedCard({ need, onAdopt }: NeedCardProps) {
  const [isSaved, setIsSaved] = useState(false);

  const urgencyColor: Record<string, string> = {
    Critical: 'bg-red-100 text-red-800',
    critical: 'bg-red-100 text-red-800',
    High: 'bg-orange-100 text-orange-800',
    high: 'bg-orange-100 text-orange-800',
    Medium: 'bg-yellow-100 text-yellow-800',
    medium: 'bg-yellow-100 text-yellow-800',
    Low: 'bg-green-100 text-green-800',
    low: 'bg-green-100 text-green-800',
  };

  const statusColor: Record<string, string> = {
    Open: 'bg-blue-100 text-blue-800',
    open: 'bg-blue-100 text-blue-800',
    'In Progress': 'bg-purple-100 text-purple-800',
    adopted: 'bg-purple-100 text-purple-800',
    Resolved: 'bg-green-100 text-green-800',
    completed: 'bg-green-100 text-green-800',
    Urgent: 'bg-red-100 text-red-800',
  };

  // Helper to get location string
  const getLocationString = () => {
    if (!need.location) return 'Location unavailable';
    if (typeof need.location === 'string') return need.location;
    const loc = need.location;
    const parts = [loc.address, loc.city, loc.state].filter(Boolean);
    return parts.length > 0 ? parts.join(', ') : 'Location unavailable';
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-2">{need.title}</h3>
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge className={`text-xs ${urgencyColor[need.urgency] || 'bg-gray-100 text-gray-800'}`}>
                {need.urgency}
              </Badge>
              <Badge className={`text-xs ${statusColor[need.status] || 'bg-gray-100 text-gray-800'}`}>
                {need.status}
              </Badge>
            </div>
          </div>
          <button onClick={() => setIsSaved(!isSaved)} className="text-gray-500 hover:text-red-500">
            <Heart size={20} fill={isSaved ? 'currentColor' : 'none'} />
          </button>
        </div>

        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{need.description}</p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <MapPin size={16} />
            <span>{getLocationString()}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <AlertCircle size={16} />
            <span>Source: {need.source}</span>
          </div>
        </div>

        <div className="flex gap-2">
          <Link href={`/need/${need.id}`} className="flex-1">
            <Button variant="outline" size="sm" className="w-full">
              <Eye size={16} className="mr-2" />
              View Details
            </Button>
          </Link>
          {(need.status === 'open' || need.status === 'Open') && onAdopt && (
            <Button size="sm" onClick={() => onAdopt(need.id)}>
              Adopt Need
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
