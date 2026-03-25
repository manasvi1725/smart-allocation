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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useAuth } from '@/lib/context/auth-context';
import { mockVolunteerTasks, mockNGOs, mockCommunityNeeds, mockCategories } from '@/lib/mock-data';
import { Briefcase, Plus, Users, CheckCircle2, MapPin, Clock, AlertCircle, FileUp } from 'lucide-react';
import { toast } from 'sonner';

export default function NGODashboard() {
  const router = useRouter();
  const { user, isLoggedIn, userRole } = useAuth();
  const [selectedTab, setSelectedTab] = useState('tasks');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [newTaskCategory, setNewTaskCategory] = useState('');
  const [newTaskVolunteersNeeded, setNewTaskVolunteersNeeded] = useState('1');

  // Redirect if not logged in or not NGO
  React.useEffect(() => {
    if (!user || user.role !== 'ngo') {
      router.push('/login');
    }
  }, [user, router]);

  if (!user || user.role !== 'ngo') {
    return null;
  }

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle || !newTaskDescription || !newTaskCategory) {
      toast.error('Please fill in all required fields');
      return;
    }
    toast.success('Task created successfully!');
    setNewTaskTitle('');
    setNewTaskDescription('');
    setNewTaskCategory('');
    setNewTaskVolunteersNeeded('1');
    setIsCreateModalOpen(false);
  };

  const currentNGO = mockNGOs[0];
  const ngoTasks = mockVolunteerTasks.filter((t) => t.ngoId === currentNGO.id);
  const adoptedNeeds = mockCommunityNeeds.filter((n) => n.adoptedByNGO === currentNGO.id);
  const totalApplications = ngoTasks.reduce((acc, task) => acc + task.applicants.length, 0);

  const sidebarItems = [
    {
      label: 'Dashboard',
      href: '/ngo-dashboard',
      icon: Briefcase,
    },
    {
      label: 'My Tasks',
      href: '#tasks',
      icon: Briefcase,
      badge: ngoTasks.length,
    },
    {
      label: 'Applications',
      href: '#applications',
      icon: Clock,
      badge: totalApplications,
    },
    {
      label: 'Profile',
      href: '#profile',
      icon: Users,
    },
  ];

  const completedTasks = ngoTasks.filter((t) => t.status === 'Completed').length;
  const openTasks = ngoTasks.filter((t) => t.status === 'Open').length;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar items={sidebarItems} title="NGO" />
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
                  {currentNGO.organizationName}
                </h1>
                <p className="text-muted-foreground">
                  Manage volunteers and coordinate community initiatives
                </p>
              </div>
              <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                    <Plus className="mr-2 h-4 w-4" />
                    Create Task
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-lg">
                  <DialogHeader>
                    <DialogTitle>Create New Volunteer Task</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleCreateTask} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Task Title</Label>
                      <Input
                        id="title"
                        placeholder="E.g., Medical Camp Volunteer"
                        value={newTaskTitle}
                        onChange={(e) => setNewTaskTitle(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        placeholder="Describe the task..."
                        value={newTaskDescription}
                        onChange={(e) => setNewTaskDescription(e.target.value)}
                        rows={4}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <select
                          id="category"
                          value={newTaskCategory}
                          onChange={(e) => setNewTaskCategory(e.target.value)}
                          className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground"
                        >
                          <option value="">Select Category</option>
                          {mockCategories.map((cat) => (
                            <option key={cat} value={cat}>
                              {cat}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="volunteers">Volunteers Needed</Label>
                        <Input
                          id="volunteers"
                          type="number"
                          min="1"
                          value={newTaskVolunteersNeeded}
                          onChange={(e) => setNewTaskVolunteersNeeded(e.target.value)}
                        />
                      </div>
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      Create Task
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
            >
              <StatCard
                title="Active Community Needs"
                value={adoptedNeeds.length}
                icon={AlertCircle}
                description="Adopted from public map"
              />
              <StatCard
                title="Open Tasks"
                value={openTasks}
                icon={Briefcase}
                description="Awaiting volunteers"
              />
              <StatCard
                title="Total Applications"
                value={totalApplications}
                icon={Clock}
                description="Pending review"
              />
              <StatCard
                title="Completed Tasks"
                value={completedTasks}
                icon={CheckCircle2}
                description="Successfully finished"
              />
            </motion.div>

            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="tasks">Tasks</TabsTrigger>
                  <TabsTrigger value="applications">Applications</TabsTrigger>
                  <TabsTrigger value="needs">Needs</TabsTrigger>
                  <TabsTrigger value="profile">Profile</TabsTrigger>
                </TabsList>

                {/* Tasks Tab */}
                <TabsContent value="tasks" className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-4">My Tasks</h2>
                    {ngoTasks.length > 0 ? (
                      <div className="grid gap-4">
                        {ngoTasks.map((task, idx) => (
                          <motion.div
                            key={task.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                          >
                            <TaskCard task={task} showMatchScore={false} />
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <EmptyState
                        icon={Briefcase}
                        title="No tasks created yet"
                        description="Create your first task to start recruiting volunteers"
                        action={{
                          label: 'Create Task',
                          onClick: () => setIsCreateModalOpen(true),
                        }}
                      />
                    )}
                  </div>
                </TabsContent>

                {/* Applications Tab */}
                <TabsContent value="applications" className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-4">
                      Volunteer Applications
                    </h2>
                    {totalApplications > 0 ? (
                      <div className="space-y-4">
                        {ngoTasks.flatMap((task) =>
                          task.applicants.map((app, idx) => (
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
                                        Application #{app.id.split('-')[1]}
                                      </p>
                                    </div>
                                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                                      app.status === 'Accepted' || app.status === 'accepted'
                                        ? 'bg-green-500/10 text-green-700 dark:text-green-400'
                                        : app.status === 'Applied' || app.status === 'applied'
                                        ? 'bg-blue-500/10 text-blue-700 dark:text-blue-400'
                                        : 'bg-red-500/10 text-red-700 dark:text-red-400'
                                    }`}>
                                      {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                                    </div>
                                  </div>

                                  <div className="flex items-center gap-4 text-sm">
                                    <div className="flex items-center text-muted-foreground">
                                      <MapPin className="mr-2 h-4 w-4 text-primary" />
                                      {typeof task.location === 'string' 
                                        ? task.location 
                                        : `${task.location.city}`}
                                    </div>
                                    <div className="inline-block bg-accent/50 px-2 py-1 rounded text-accent-foreground">
                                      {app.matchScore}% match
                                    </div>
                                  </div>

                                  <div className="flex gap-2 pt-2 border-t border-border">
                                    {(app.status === 'Applied' || app.status === 'applied') && (
                                      <>
                                        <Button
                                          size="sm"
                                          variant="outline"
                                          className="text-green-600"
                                        >
                                          Accept
                                        </Button>
                                        <Button
                                          size="sm"
                                          variant="outline"
                                          className="text-red-600"
                                        >
                                          Reject
                                        </Button>
                                      </>
                                    )}
                                  </div>
                                </div>
                              </Card>
                            </motion.div>
                          ))
                        )}
                      </div>
                    ) : (
                      <EmptyState
                        icon={Clock}
                        title="No applications yet"
                        description="Volunteers will apply to your tasks here"
                      />
                    )}
                  </div>
                </TabsContent>

                {/* Adopted Needs Tab */}
                <TabsContent value="needs" className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-4">
                      Adopted Community Needs
                    </h2>
                    {adoptedNeeds.length > 0 ? (
                      <div className="space-y-4">
                        {adoptedNeeds.map((need, idx) => (
                          <motion.div
                            key={need.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                          >
                            <Card className="p-6">
                              <div className="space-y-3">
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <h3 className="font-semibold text-foreground">
                                      {need.title}
                                    </h3>
                                    <p className="text-sm text-muted-foreground mt-1">
                                      {need.description}
                                    </p>
                                  </div>
                                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                                    need.urgency === 'critical'
                                      ? 'bg-red-500/10 text-red-700 dark:text-red-400'
                                      : 'bg-orange-500/10 text-orange-700 dark:text-orange-400'
                                  }`}>
                                    {need.urgency.charAt(0).toUpperCase() + need.urgency.slice(1)}
                                  </div>
                                </div>
                                <div className="flex items-center justify-between text-sm text-muted-foreground pt-2 border-t border-border">
                                  <span>
                                    {typeof need.location === 'string' 
                                      ? need.location 
                                      : `${need.location.city}, ${need.location.state}`}
                                  </span>
                                  <Button size="sm" variant="outline">
                                    Convert to Task
                                  </Button>
                                </div>
                              </div>
                            </Card>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <EmptyState
                        icon={AlertCircle}
                        title="No adopted needs yet"
                        description="Explore the community map to adopt needs"
                      />
                    )}
                  </div>
                </TabsContent>

                {/* Profile Tab */}
                <TabsContent value="profile" className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-4">
                      Organization Profile
                    </h2>
                    <Card className="p-6 space-y-6">
                      {/* Header */}
                      <div className="flex items-center gap-4 pb-6 border-b border-border">
                        <div className="flex-shrink-0 h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                          <Briefcase className="h-8 w-8 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-foreground">
                            {currentNGO.organizationName}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {currentNGO.city}, {currentNGO.state}
                          </p>
                          <div className="mt-2 inline-block px-2 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-700 dark:text-green-400">
                            {currentNGO.verificationStatus.charAt(0).toUpperCase() + currentNGO.verificationStatus.slice(1)}
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          Edit Profile
                        </Button>
                      </div>

                      {/* Description */}
                      <div className="space-y-2">
                        <h3 className="font-semibold text-foreground">About</h3>
                        <p className="text-sm text-muted-foreground">
                          {currentNGO.description}
                        </p>
                      </div>

                      {/* Domains */}
                      <div className="space-y-3">
                        <h3 className="font-semibold text-foreground">Domains of Work</h3>
                        <div className="flex flex-wrap gap-2">
                          {currentNGO.domains.map((domain) => (
                            <div
                              key={domain}
                              className="inline-block bg-primary/10 px-3 py-1 rounded-full text-sm text-primary"
                            >
                              {domain}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Contact */}
                      <div className="space-y-2">
                        <h3 className="font-semibold text-foreground">Contact Information</h3>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Email</p>
                            <p className="text-foreground">{currentNGO.email}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Phone</p>
                            <p className="text-foreground">{currentNGO.phone}</p>
                          </div>
                        </div>
                      </div>
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
