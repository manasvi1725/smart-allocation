'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/common/navbar';
import { Footer } from '@/components/common/footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/lib/context/auth-context';
import { mockVolunteerTasks, mockTaskApplications } from '@/lib/mock-data';
import {
  MapPin,
  Calendar,
  Users,
  AlertCircle,
  ArrowLeft,
  Clock,
  CheckCircle2,
  Building2,
} from 'lucide-react';
import { toast } from 'sonner';

export default function TaskDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const taskId = params.id as string;

  const task = mockVolunteerTasks.find((t) => t.id === taskId);
  const applications = mockTaskApplications.filter((a) => a.taskId === taskId);
  const [hasApplied, setHasApplied] = useState(applications.length > 0);

  if (!task) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
          <Card className="p-8 max-w-md text-center">
            <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-foreground mb-2">Task Not Found</h1>
            <p className="text-muted-foreground mb-6">The task you're looking for doesn't exist.</p>
            <Link href="/map">
              <Button>Back to Map</Button>
            </Link>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  const urgencyColors: Record<string, string> = {
    low: 'bg-blue-500/10 text-blue-700 dark:text-blue-400',
    medium: 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400',
    high: 'bg-orange-500/10 text-orange-700 dark:text-orange-400',
    critical: 'bg-red-500/10 text-red-700 dark:text-red-400',
  };

  const statusColors: Record<string, string> = {
    open: 'bg-green-500/10 text-green-700 dark:text-green-400',
    filled: 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400',
    completed: 'bg-gray-500/10 text-gray-700 dark:text-gray-400',
  };

  const remainingSlots = task.volunteersNeeded - task.acceptedCount;
  const isFilled = remainingSlots <= 0;

  const handleApply = () => {
    if (!isLoggedIn) {
      router.push('/login');
      return;
    }
    setHasApplied(true);
    toast.success('Application submitted successfully!');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        {/* Header */}
        <div className="border-b border-border bg-accent/5 px-4 sm:px-6 lg:px-8 py-8">
          <div className="mx-auto max-w-4xl">
            <button
              onClick={() => router.back()}
              className="flex items-center text-primary hover:text-primary/80 transition mb-4"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </button>
            <h1 className="text-3xl font-bold text-foreground mb-2">{task.title}</h1>
            <p className="text-muted-foreground">{task.ngoName}</p>
          </div>
        </div>

        {/* Content */}
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                <Badge className={urgencyColors[task.urgency]}>
                  {task.urgency.charAt(0).toUpperCase() + task.urgency.slice(1)} Priority
                </Badge>
                <Badge className={statusColors[task.status]}>
                  {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                </Badge>
                <Badge variant="outline">{task.category}</Badge>
              </div>

              {/* Description */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4">About This Task</h2>
                <p className="text-muted-foreground leading-relaxed">{task.description}</p>
              </Card>

              {/* Required Skills */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4">Required Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {task.requiredSkills.map((skill) => (
                    <div
                      key={skill}
                      className="inline-block bg-accent/50 px-3 py-1 rounded-full text-sm text-accent-foreground"
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </Card>

              {/* Location & Logistics */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4">Location & Timeline</h2>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <MapPin className="mr-3 h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground">
                        {typeof task.location === 'string' 
                          ? task.location 
                          : task.location.address || `${task.location.city}, ${task.location.state}`}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {typeof task.location === 'string'
                          ? task.location
                          : `${task.location.city}, ${task.location.state}`}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="mr-3 h-5 w-5 text-primary flex-shrink-0" />
                    <div>
                      <p className="font-medium text-foreground">
                        Deadline: {new Date(task.deadline).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {Math.ceil(
                          (new Date(task.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
                        )}{' '}
                        days remaining
                      </p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Volunteer Positions */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4">Volunteer Positions</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">Total Positions Needed</p>
                      <p className="text-sm text-muted-foreground">
                        {task.acceptedCount} / {task.volunteersNeeded} filled
                      </p>
                    </div>
                    <div className="w-24 h-3 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all"
                        style={{
                          width: `${(task.acceptedCount / task.volunteersNeeded) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                  <div className={`p-3 rounded-lg ${
                    remainingSlots > 0
                      ? 'bg-green-500/10 text-green-700 dark:text-green-400'
                      : 'bg-gray-500/10 text-gray-700 dark:text-gray-400'
                  }`}>
                    {remainingSlots > 0
                      ? `${remainingSlots} slot${remainingSlots !== 1 ? 's' : ''} available`
                      : 'All positions filled'}
                  </div>
                </div>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-4">
                {/* NGO Card */}
                <Card className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Building2 className="h-6 w-6 text-primary" />
                      </div>
                        <div className="flex-1 min-w-0">
                        <p className="font-semibold text-foreground truncate">
                          {task.ngoName}
                        </p>
                        <p className="text-xs text-muted-foreground">NGO</p>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Quick Stats */}
                <Card className="p-6 space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <Users className="mr-2 h-4 w-4 text-primary" />
                      <span className="text-muted-foreground">
                        {task.acceptedCount} volunteers accepted
                      </span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Clock className="mr-2 h-4 w-4 text-primary" />
                      <span className="text-muted-foreground">
                        Posted {new Date(task.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center text-sm">
                      <AlertCircle className="mr-2 h-4 w-4 text-primary" />
                      <span className="text-muted-foreground capitalize">
                        {task.urgency} priority
                      </span>
                    </div>
                  </div>
                </Card>

                {/* CTA Button */}
                {!isFilled && !hasApplied ? (
                  <Button
                    onClick={handleApply}
                    size="lg"
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    Apply Now
                  </Button>
                ) : hasApplied ? (
                  <Card className="p-4 bg-green-500/10 border-green-500/20">
                    <div className="flex items-center gap-2 text-green-700 dark:text-green-400">
                      <CheckCircle2 className="h-5 w-5" />
                      <span className="text-sm font-medium">Application Submitted</span>
                    </div>
                  </Card>
                ) : (
                  <Card className="p-4 bg-gray-500/10 border-gray-500/20">
                    <div className="flex items-center gap-2 text-gray-700 dark:text-gray-400">
                      <AlertCircle className="h-5 w-5" />
                      <span className="text-sm font-medium">Position Filled</span>
                    </div>
                  </Card>
                )}

                <Button variant="outline" className="w-full" onClick={() => router.push('/map')}>
                  View More Tasks
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
