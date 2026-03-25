'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/common/navbar';
import { Sidebar } from '@/components/common/sidebar';
import { Footer } from '@/components/common/footer';
import { StatCard } from '@/components/shared/stat-card';
import { NeedCard } from '@/components/shared/need-card';
import { EmptyState } from '@/components/shared/empty-state';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/lib/context/auth-context';
import { mockCommunityNeeds } from '@/lib/mock-data';
import { AlertCircle, MapPin, FileText, Briefcase, Plus } from 'lucide-react';
import Link from 'next/link';

export default function UserDashboard() {
  const router = useRouter();
  const { user, isLoggedIn, userRole } = useAuth();
  const [selectedTab, setSelectedTab] = useState('nearby');

  // Redirect if not logged in or not normal user
  React.useEffect(() => {
    if (!user || user.role !== 'user') {
      router.push('/login');
    }
  }, [user, router]);

  if (!user || user.role !== 'user') {
    return null;
  }

  const nearbyNeeds = mockCommunityNeeds.filter((n) => {
    const needState = typeof n.location === 'string' ? n.location : n.location.state;
    return needState === user.state;
  });
  const myReports = mockCommunityNeeds.filter((n) => n.source === 'Citizen Report').slice(0, 3);
  const openNeeds = mockCommunityNeeds.filter((n) => n.status === 'Open' || n.status === 'Urgent').length;
  const adoptedNeeds = mockCommunityNeeds.filter((n) => n.status === 'adopted').length;

  const sidebarItems = [
    {
      label: 'Dashboard',
      href: '/user-dashboard',
      icon: AlertCircle,
    },
    {
      label: 'My Reports',
      href: '#reports',
      icon: FileText,
      badge: myReports.length,
    },
    {
      label: 'Explore Map',
      href: '/map',
      icon: MapPin,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar items={sidebarItems} title="Community" />
        <main className="flex-1 overflow-y-auto">
          <div className="px-4 sm:px-6 lg:px-8 py-8 space-y-8">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between"
            >
              <div className="space-y-2">
                <h1 className="text-3xl font-bold text-foreground">
                  Welcome, {user?.name}!
                </h1>
                <p className="text-muted-foreground">
                  Help improve your community by reporting needs and supporting volunteers
                </p>
              </div>
              <Link href="/report-issue">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Plus className="mr-2 h-4 w-4" />
                  Report Issue
                </Button>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              <StatCard
                title="Nearby Issues"
                value={nearbyNeeds.length}
                icon={AlertCircle}
                description="In your state"
              />
              <StatCard
                title="Open Needs"
                value={openNeeds}
                icon={MapPin}
                description="Awaiting help"
              />
              <StatCard
                title="Community Impact"
                value="540+"
                icon={Briefcase}
                description="Lives helped this month"
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
                  <TabsTrigger value="nearby">Nearby Issues</TabsTrigger>
                  <TabsTrigger value="reports">My Reports ({myReports.length})</TabsTrigger>
                  <TabsTrigger value="volunteer">Volunteer</TabsTrigger>
                </TabsList>

                {/* Nearby Issues */}
                <TabsContent value="nearby" className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-4">
                      Community Issues in Your Area
                    </h2>
                    {nearbyNeeds.length > 0 ? (
                      <div className="grid gap-4">
                        {nearbyNeeds.map((need, idx) => (
                          <motion.div
                            key={need.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                          >
                            <NeedCard need={need} />
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <EmptyState
                        icon={AlertCircle}
                        title="No issues in your area"
                        description="All issues in your state are being handled"
                        action={{
                          label: 'Explore Map',
                          onClick: () => router.push('/map'),
                        }}
                      />
                    )}
                  </div>
                </TabsContent>

                {/* My Reports */}
                <TabsContent value="reports" className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-4">
                      My Reports
                    </h2>
                    {myReports.length > 0 ? (
                      <div className="grid gap-4">
                        {myReports.map((need, idx) => (
                          <motion.div
                            key={need.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                          >
                            <Card className="p-6">
                              <div className="flex items-start justify-between mb-3">
                                <h3 className="font-semibold text-foreground">
                                  {need.title}
                                </h3>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  need.status === 'Open'
                                    ? 'bg-green-500/10 text-green-700 dark:text-green-400'
                                    : need.status === 'In Progress'
                                    ? 'bg-blue-500/10 text-blue-700 dark:text-blue-400'
                                    : 'bg-gray-500/10 text-gray-700 dark:text-gray-400'
                                }`}>
                                  {need.status.charAt(0).toUpperCase() + need.status.slice(1)}
                                </span>
                              </div>
                              <p className="text-sm text-muted-foreground mb-3">
                                {need.description}
                              </p>
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">
                                  {new Date(need.createdAt).toLocaleDateString()}
                                </span>
                                <Link href={`/need/${need.id}`}>
                                  <Button size="sm" variant="outline">
                                    View Details
                                  </Button>
                                </Link>
                              </div>
                            </Card>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <EmptyState
                        icon={FileText}
                        title="No reports yet"
                        description="Report an issue to help your community"
                        action={{
                          label: 'Report Issue',
                          onClick: () => router.push('/report-issue'),
                        }}
                      />
                    )}
                  </div>
                </TabsContent>

                {/* Volunteer CTA */}
                <TabsContent value="volunteer" className="space-y-6">
                  <div>
                    <Card className="p-12 text-center bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-dashed border-primary/30">
                      <Briefcase className="h-16 w-16 text-primary mx-auto mb-4 opacity-50" />
                      <h2 className="text-2xl font-bold text-foreground mb-3">
                        Want to Make a Direct Impact?
                      </h2>
                      <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                        Become a volunteer and work directly with NGOs on meaningful projects in your community.
                      </p>
                      <Button
                        onClick={() => router.push('/signup')}
                        size="lg"
                        className="bg-primary text-primary-foreground hover:bg-primary/90"
                      >
                        Become a Volunteer
                      </Button>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="p-6">
                <h2 className="text-xl font-bold text-foreground mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Link href="/map">
                    <button className="p-4 rounded-lg border border-border hover:bg-accent/50 transition text-left">
                      <MapPin className="h-6 w-6 text-primary mb-2" />
                      <h3 className="font-semibold text-foreground">Explore Map</h3>
                      <p className="text-xs text-muted-foreground">View all community issues</p>
                    </button>
                  </Link>
                  <Link href="/report-issue">
                    <button className="p-4 rounded-lg border border-border hover:bg-accent/50 transition text-left">
                      <FileText className="h-6 w-6 text-primary mb-2" />
                      <h3 className="font-semibold text-foreground">Report Issue</h3>
                      <p className="text-xs text-muted-foreground">Create a new report</p>
                    </button>
                  </Link>
                  <button className="p-4 rounded-lg border border-border hover:bg-accent/50 transition text-left">
                    <AlertCircle className="h-6 w-6 text-primary mb-2" />
                    <h3 className="font-semibold text-foreground">My Profile</h3>
                    <p className="text-xs text-muted-foreground">Edit your information</p>
                  </button>
                </div>
              </Card>
            </motion.div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
