'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/common/navbar';
import { Sidebar } from '@/components/common/sidebar';
import { Footer } from '@/components/common/footer';
import { StatCard } from '@/components/shared/stat-card';
import { TaskCard } from '@/components/shared/task-card';
import { EmptyState } from '@/components/shared/empty-state';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/lib/context/auth-context';
import { mockVolunteerTasks, mockVolunteers, mockTaskApplications } from '@/lib/mock-data';
import { Briefcase, Users, CheckCircle2, MapPin, Clock, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function VolunteerDashboard() {
  const router = useRouter();
  const { user, isLoggedIn, userRole } = useAuth();
  const [selectedTab, setSelectedTab] = useState('recommended');
  const [appliedTasks, setAppliedTasks] = useState<Set<string>>(
    new Set(mockTaskApplications.map((app) => app.taskId))
  );

  // Redirect if not logged in or not volunteer
  React.useEffect(() => {
    if (!user || user.role !== 'volunteer') {
      router.push('/login');
    }
  }, [user, router]);

  if (!user || user.role !== 'volunteer') {
    return null;
  }

  const handleApply = (taskId: string) => {
    setAppliedTasks((prev) => new Set([...prev, taskId]));
    toast.success('Application submitted successfully!');
  };

  // Get current volunteer
  const currentVolunteer = mockVolunteers[0];

  // Calculate stats
  const recommendedCount = mockVolunteerTasks.filter((t) => t.status === 'Open').length;
  const acceptedCount = mockVolunteerTasks.reduce((acc, task) => {
    return acc + task.applicants.filter((app) => app.status === 'Accepted').length;
  }, 0);
  const completedCount = mockVolunteerTasks.reduce((acc, task) => {
    return acc + task.applicants.filter((app) => app.status === 'Completed').length;
  }, 0);
  const applicationsCount = mockVolunteerTasks.reduce((acc, task) => {
    return acc + task.applicants.filter((app) => app.status === 'Applied').length;
  }, 0);

  const sidebarItems = [
    {
      label: 'Dashboard',
      href: '/volunteer-dashboard',
      icon: Briefcase,
    },
    {
      label: 'Applications',
      href: '#applications',
      icon: Clock,
      badge: applicationsCount,
    },
    {
      label: 'Completed',
      href: '#completed',
      icon: CheckCircle2,
      badge: completedCount,
    },
    {
      label: 'My Profile',
      href: '#profile',
      icon: Users,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar items={sidebarItems} title="Volunteer" />
        <main className="flex-1 overflow-y-auto">
          <div className="px-4 sm:px-6 lg:px-8 py-8 space-y-8">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-2"
            >
              <h1 className="text-3xl font-bold text-foreground">
                Welcome back, {user?.name}!
              </h1>
              <p className="text-muted-foreground">
                Here are your volunteer opportunities and tasks
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
            >
              <StatCard
                title="Recommended Tasks"
                value={recommendedCount}
                icon={AlertCircle}
                description="Matching opportunities"
              />
              <StatCard
                title="Accepted Tasks"
                value={acceptedCount}
                icon={CheckCircle2}
                description="Active commitments"
              />
              <StatCard
                title="Completed Tasks"
                value={completedCount}
                icon={Briefcase}
                description="Total completed"
              />
              <StatCard
                title="Pending Applications"
                value={applicationsCount}
                icon={Clock}
                description="Awaiting response"
              />
            </motion.div>

            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="recommended">Recommended</TabsTrigger>
                  <TabsTrigger value="applications">
                    My Applications ({applicationsCount})
                  </TabsTrigger>
                  <TabsTrigger value="profile">My Profile</TabsTrigger>
                </TabsList>

                {/* Recommended Tasks */}
                <TabsContent value="recommended" className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-4">
                      Recommended Tasks
                    </h2>
                    {mockVolunteerTasks.length > 0 ? (
                      <div className="grid gap-4">
                        {mockVolunteerTasks.map((task, idx) => (
                          <motion.div
                            key={task.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                          >
                            <TaskCard
                              task={task}
                              onApply={handleApply}
                              showApplyButton={!appliedTasks.has(task.id)}
                              showMatchScore={true}
                              applicationStatus={
                                appliedTasks.has(task.id) ? 'applied' : null
                              }
                            />
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <EmptyState
                        icon={Briefcase}
                        title="No tasks available"
                        description="Check back later for new opportunities"
                      />
                    )}
                  </div>
                </TabsContent>

                {/* Applications */}
                <TabsContent value="applications" className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-4">
                      My Applications
                    </h2>
                    {mockTaskApplications.length > 0 ? (
                      <div className="space-y-4">
                        {mockTaskApplications.map((app, idx) => {
                          const task = mockVolunteerTasks.find(
                            (t) => t.id === app.taskId
                          );
                          if (!task) return null;

                          return (
                            <motion.div
                              key={app.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: idx * 0.05 }}
                            >
                              <Card className="p-6">
                                <div className="space-y-4">
                                  <div className="flex items-start justify-between">
                                    <div className="space-y-2 flex-1">
                                      <h3 className="font-semibold text-foreground">
                                        {task.title}
                                      </h3>
                                      <p className="text-sm text-muted-foreground">
                                        {task.ngoName}
                                      </p>
                                    </div>
                                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                                      app.status === 'Accepted' || app.status === 'accepted'
                                        ? 'bg-green-500/10 text-green-700 dark:text-green-400'
                                        : app.status === 'Applied' || app.status === 'applied'
                                        ? 'bg-blue-500/10 text-blue-700 dark:text-blue-400'
                                        : app.status === 'Rejected' || app.status === 'rejected'
                                        ? 'bg-red-500/10 text-red-700 dark:text-red-400'
                                        : 'bg-gray-500/10 text-gray-700 dark:text-gray-400'
                                    }`}>
                                      {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                                    </div>
                                  </div>

                                  <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div className="flex items-center text-muted-foreground">
                                      <MapPin className="mr-2 h-4 w-4 text-primary" />
                                      {typeof task.location === 'string' 
                                        ? task.location 
                                        : `${task.location.city}`}
                                    </div>
                                    <div className="flex items-center text-muted-foreground">
                                      <Clock className="mr-2 h-4 w-4 text-primary" />
                                      {new Date(task.deadline).toLocaleDateString()}
                                    </div>
                                  </div>

                                  <div className="flex items-center gap-2 text-sm">
                                    <div className="inline-block bg-accent/50 px-2 py-1 rounded text-accent-foreground">
                                      {app.matchScore}% match score
                                    </div>
                                  </div>
                                </div>
                              </Card>
                            </motion.div>
                          );
                        })}
                      </div>
                    ) : (
                      <EmptyState
                        icon={Clock}
                        title="No applications yet"
                        description="Apply to tasks to see them here"
                      />
                    )}
                  </div>
                </TabsContent>

                {/* Profile */}
                <TabsContent value="profile" className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-4">
                      My Profile
                    </h2>
                    <Card className="p-6 space-y-6">
                      {/* Profile Header */}
                      <div className="flex items-center gap-4 pb-6 border-b border-border">
                        <div className="flex-shrink-0 h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                          <Users className="h-8 w-8 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-foreground">
                            {currentVolunteer.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {currentVolunteer.city}, {currentVolunteer.state}
                          </p>
                          <div className="flex items-center mt-2">
                            {Array.from({ length: Math.round(currentVolunteer.rating) }).map(
                              (_, i) => (
                                <span key={i} className="text-yellow-400">
                                  ★
                                </span>
                              )
                            )}
                            <span className="ml-2 text-sm text-muted-foreground">
                              {currentVolunteer.rating} rating
                            </span>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          Edit Profile
                        </Button>
                      </div>

                      {/* Contact Information */}
                      <div className="space-y-2">
                        <h3 className="font-semibold text-foreground">Contact Information</h3>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Email</p>
                            <p className="text-foreground">{user?.email}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Phone</p>
                            <p className="text-foreground">{currentVolunteer.phone}</p>
                          </div>
                        </div>
                      </div>

                      {/* Skills */}
                      <div className="space-y-3">
                        <h3 className="font-semibold text-foreground">Skills</h3>
                        <div className="flex flex-wrap gap-2">
                          {currentVolunteer.skills.map((skill) => (
                            <div
                              key={skill}
                              className="inline-block bg-accent/50 px-3 py-1 rounded-full text-sm text-accent-foreground"
                            >
                              {skill}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Availability */}
                      <div className="space-y-2">
                        <h3 className="font-semibold text-foreground">Availability</h3>
                        <div className="inline-block bg-accent/50 px-3 py-1 rounded-full text-sm text-accent-foreground capitalize">
                          {currentVolunteer.availability}
                        </div>
                      </div>

                      {/* Preferred Domains */}
                      <div className="space-y-3">
                        <h3 className="font-semibold text-foreground">Preferred Domains</h3>
                        <div className="flex flex-wrap gap-2">
                          {currentVolunteer.domains.map((domain) => (
                            <div
                              key={domain}
                              className="inline-block bg-primary/10 px-3 py-1 rounded-full text-sm text-primary"
                            >
                              {domain}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Certificates */}
                      {currentVolunteer.certificates.length > 0 && (
                        <div className="space-y-3 pt-4 border-t border-border">
                          <h3 className="font-semibold text-foreground">Certificates</h3>
                          <div className="space-y-2">
                            {currentVolunteer.certificates.map((cert) => (
                              <div
                                key={cert}
                                className="flex items-center justify-between p-2 rounded bg-accent/30"
                              >
                                <span className="text-sm text-foreground">{cert}</span>
                                <CheckCircle2 className="h-4 w-4 text-green-600" />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
