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
import { mockCommunityNeeds, mockVolunteerTasks } from '@/lib/mock-data';
import { TaskCard } from '@/components/shared/task-card';
import {
  MapPin,
  Calendar,
  AlertCircle,
  ArrowLeft,
  User,
  Share2,
  Heart,
  MessageSquare,
} from 'lucide-react';
import { toast } from 'sonner';

export default function NeedDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { userRole, isLoggedIn } = useAuth();
  const needId = params.id as string;

  const need = mockCommunityNeeds.find((n) => n.id === needId);
  const [hasAdopted, setHasAdopted] = useState(need?.status === 'adopted');
  const [isSaved, setIsSaved] = useState(false);

  if (!need) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
          <Card className="p-8 max-w-md text-center">
            <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-foreground mb-2">Need Not Found</h1>
            <p className="text-muted-foreground mb-6">The need you're looking for doesn't exist.</p>
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
    adopted: 'bg-blue-500/10 text-blue-700 dark:text-blue-400',
    resolved: 'bg-gray-500/10 text-gray-700 dark:text-gray-400',
  };

  const sourceLabels: Record<string, string> = {
    'Citizen Report': 'Reported by Community Member',
    'NGO Input': 'Submitted by NGO',
    'Social Media': 'From Social Media',
    'Government Data': 'Government Data Source',
  };

  // Get related tasks
  const relatedTasks = mockVolunteerTasks.filter(
    (t) =>
      t.category === need.category &&
      (t.city === need.city || t.state === need.state) &&
      t.status === 'open'
  );

  const handleAdopt = () => {
    if (!isLoggedIn || userRole !== 'ngo') {
      toast.error('Only NGOs can adopt needs');
      return;
    }
    setHasAdopted(true);
    toast.success('Need adopted successfully!');
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
    toast.success(isSaved ? 'Removed from saved' : 'Added to saved');
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
            <h1 className="text-3xl font-bold text-foreground mb-2">{need.title}</h1>
            <p className="text-muted-foreground">{sourceLabels[need.source]}</p>
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
                <Badge className={urgencyColors[need.urgency]}>
                  {need.urgency.charAt(0).toUpperCase() + need.urgency.slice(1)} Priority
                </Badge>
                <Badge className={statusColors[need.status]}>
                  {need.status.charAt(0).toUpperCase() + need.status.slice(1)}
                </Badge>
                <Badge variant="outline">{need.category}</Badge>
              </div>

              {/* Description */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4">Details</h2>
                <p className="text-muted-foreground leading-relaxed">{need.description}</p>
              </Card>

              {/* Location & Details */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4">Location Information</h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <MapPin className="mr-3 h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground">
                        {typeof need.location === 'string' 
                          ? need.location 
                          : need.location.address || `${need.location.city}, ${need.location.state}`}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {typeof need.location === 'string'
                          ? need.location
                          : `${need.location.city}, ${need.location.state} - ${need.location.pincode}`}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="mr-3 h-5 w-5 text-primary flex-shrink-0" />
                    <div>
                      <p className="font-medium text-foreground">
                        Submitted on {new Date(need.createdAt).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(need.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Adoption Status */}
              {need.adoptedByNGO && (
                <Card className="p-6 border-l-4 border-primary bg-primary/5">
                  <h2 className="text-xl font-semibold text-foreground mb-4">Adoption Status</h2>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      This need has been adopted by an NGO
                    </p>
                    <p className="font-medium text-foreground">
                      Organization ID: {need.adoptedByNGO}
                    </p>
                  </div>
                </Card>
              )}

              {/* Related Tasks */}
              {relatedTasks.length > 0 && (
                <Card className="p-6">
                  <h2 className="text-xl font-semibold text-foreground mb-4">
                    Related Volunteer Tasks
                  </h2>
                  <div className="space-y-4">
                    {relatedTasks.map((task, idx) => (
                      <motion.div
                        key={task.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                      >
                        <TaskCard task={task} showApplyButton={true} />
                      </motion.div>
                    ))}
                  </div>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-4">
                {/* Status Card */}
                <Card className="p-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-muted-foreground">Current Status</p>
                      <div className={`px-3 py-2 rounded-lg text-center font-medium ${statusColors[need.status]}`}>
                        {need.status.charAt(0).toUpperCase() + need.status.slice(1)}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm font-medium text-muted-foreground">Priority Level</p>
                      <div className={`px-3 py-2 rounded-lg text-center font-medium ${urgencyColors[need.urgency]}`}>
                        {need.urgency.charAt(0).toUpperCase() + need.urgency.slice(1)}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm font-medium text-muted-foreground">Category</p>
                      <div className="px-3 py-2 rounded-lg text-center font-medium bg-accent/50 text-accent-foreground">
                        {need.category}
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Action Buttons */}
                <div className="space-y-2">
                  {userRole === 'ngo' && !hasAdopted && (need.status === 'Open' || need.status === 'Urgent') && (
                    <Button
                      onClick={handleAdopt}
                      size="lg"
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Adopt This Need
                    </Button>
                  )}

                  {hasAdopted && (
                    <Card className="p-4 bg-green-500/10 border-green-500/20">
                      <div className="flex items-center gap-2 text-green-700 dark:text-green-400">
                        <AlertCircle className="h-5 w-5" />
                        <span className="text-sm font-medium">Adopted by You</span>
                      </div>
                    </Card>
                  )}

                  <Button
                    onClick={handleSave}
                    variant={isSaved ? 'default' : 'outline'}
                    className="w-full"
                  >
                    <Heart
                      className={`mr-2 h-4 w-4 ${isSaved ? 'fill-current' : ''}`}
                    />
                    {isSaved ? 'Saved' : 'Save'}
                  </Button>

                  <Button variant="outline" className="w-full">
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                </div>

                {/* Info Card */}
                <Card className="p-4 space-y-3 bg-accent/5">
                  <div>
                    <p className="text-xs text-muted-foreground">Source</p>
                    <p className="text-sm font-medium text-foreground capitalize">
                      {need.source}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Coordinates</p>
                    <p className="text-sm font-medium text-foreground font-mono">
                      {typeof need.location === 'string' ? 'N/A' : `${need.location.latitude.toFixed(4)}, ${need.location.longitude.toFixed(4)}`}
                    </p>
                  </div>
                </Card>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
