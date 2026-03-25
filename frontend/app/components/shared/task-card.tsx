'use client';

import Link from 'next/link';
import { MapPin, Users, Clock, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { VolunteerTask } from '@/lib/types';

interface TaskCardProps {
  task: VolunteerTask;
  onApply?: (taskId: string) => void;
  showMatchScore?: boolean;
  matchScore?: number;
}

export function TaskCard({ task, onApply, showMatchScore = false, matchScore = 0 }: TaskCardProps) {
  const statusColor = {
    Open: 'bg-blue-100 text-blue-800',
    open: 'bg-blue-100 text-blue-800',
    Filled: 'bg-yellow-100 text-yellow-800',
    filled: 'bg-yellow-100 text-yellow-800',
    Completed: 'bg-green-100 text-green-800',
    completed: 'bg-green-100 text-green-800',
    Cancelled: 'bg-gray-100 text-gray-800',
    cancelled: 'bg-gray-100 text-gray-800',
  }[task.status] || 'bg-gray-100 text-gray-800';

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <p className="text-sm text-gray-500 mb-1">{task.ngoName}</p>
            <h3 className="text-lg font-semibold mb-2">{task.title}</h3>
            <div className="flex flex-wrap gap-2">
              <Badge className={`text-xs ${statusColor}`}>{task.status}</Badge>
              {showMatchScore && (
                <Badge variant="outline" className="text-xs">
                  <Zap size={12} className="mr-1" />
                  {matchScore}% Match
                </Badge>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <p className="text-sm text-gray-600 line-clamp-2">{task.description}</p>
          <div className="flex flex-wrap gap-3 text-sm text-gray-700">
            <div className="flex items-center gap-1">
              <MapPin size={16} />
              <span>
                {typeof task.location === 'string' 
                  ? task.location 
                  : `${task.location.city}, ${task.location.state}`}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Clock size={16} />
              <span>{new Date(task.deadline).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users size={16} />
              <span>{task.volunteersNeeded - task.volunteersAccepted} slots</span>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-xs text-gray-500 mb-2">Skills Required:</p>
          <div className="flex flex-wrap gap-1">
            {task.requiredSkills.slice(0, 3).map((skill) => (
              <Badge key={skill} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
            {task.requiredSkills.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{task.requiredSkills.length - 3} more
              </Badge>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          <Link href={`/task/${task.id}`} className="flex-1">
            <Button variant="outline" size="sm" className="w-full">
              View Details
            </Button>
          </Link>
          {(task.status === 'open' || task.status === 'Open') && onApply && (
            <Button size="sm" onClick={() => onApply(task.id)}>
              Apply Now
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
