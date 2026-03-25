'use client';

import React, { useState, useMemo } from 'react';
import { Navbar } from '@/components/common/navbar';
import { Footer } from '@/components/common/footer';
import { NeedCard } from '@/components/shared/need-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/lib/context/auth-context';
import { mockCommunityNeeds, mockCategories } from '@/lib/mock-data';
import { motion } from 'framer-motion';
import { MapPin, Filter, X } from 'lucide-react';
import { toast } from 'sonner';

export default function MapPage() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedUrgency, setSelectedUrgency] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  // Filter needs
  const filteredNeeds = useMemo(() => {
    return mockCommunityNeeds.filter((need) => {
      // Handle both location as string and location as object
      const cityName = typeof need.location === 'string' 
        ? need.location 
        : need.location.city;
      
      const matchesSearch =
        need.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        need.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cityName.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory = !selectedCategory || need.category === selectedCategory;
      const matchesUrgency = !selectedUrgency || need.urgency === selectedUrgency;
      const matchesStatus = !selectedStatus || need.status === selectedStatus;

      return matchesSearch && matchesCategory && matchesUrgency && matchesStatus;
    });
  }, [searchTerm, selectedCategory, selectedUrgency, selectedStatus]);

  const handleAdopt = (needId: string) => {
    toast.success('Need adopted successfully!');
  };

  const hasActiveFilters = selectedCategory || selectedUrgency || selectedStatus;

  const clearFilters = () => {
    setSelectedCategory(null);
    setSelectedUrgency(null);
    setSelectedStatus(null);
    setSearchTerm('');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        {/* Header */}
        <div className="border-b border-border bg-accent/5 px-4 sm:px-6 lg:px-8 py-8">
          <div className="mx-auto max-w-7xl">
            <h1 className="text-3xl font-bold text-foreground mb-2">Community Needs Map</h1>
            <p className="text-muted-foreground">
              Explore and discover community needs across regions
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar - Map Placeholder */}
            <div className="lg:col-span-1 order-2 lg:order-1">
              <div className="sticky top-20 space-y-4">
                <div className="rounded-lg border-2 border-dashed border-border bg-accent/30 aspect-square flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-primary/50 mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Map view coming soon</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 order-1 lg:order-2 space-y-6">
              {/* Search */}
              <div className="space-y-4">
                <Input
                  placeholder="Search by title, description, or city..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />

                {/* Filter Toggle */}
                <Button
                  onClick={() => setShowFilters(!showFilters)}
                  variant="outline"
                  className="w-full justify-start"
                >
                  <Filter className="mr-2 h-4 w-4" />
                  {hasActiveFilters ? `Filters (${[selectedCategory, selectedUrgency, selectedStatus].filter(Boolean).length})` : 'Filters'}
                </Button>

                {/* Filters */}
                {showFilters && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-4 p-4 rounded-lg border border-border bg-accent/20"
                  >
                    {/* Category Filter */}
                    <div>
                      <p className="text-sm font-medium text-foreground mb-2">Category</p>
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => setSelectedCategory(null)}
                          className={`px-3 py-1 rounded-full text-xs transition-all ${
                            !selectedCategory
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted text-foreground hover:bg-muted/80'
                          }`}
                        >
                          All
                        </button>
                        {mockCategories.map((cat) => (
                          <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat === selectedCategory ? null : cat)}
                            className={`px-3 py-1 rounded-full text-xs transition-all ${
                              selectedCategory === cat
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted text-foreground hover:bg-muted/80'
                            }`}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Urgency Filter */}
                    <div>
                      <p className="text-sm font-medium text-foreground mb-2">Urgency</p>
                      <div className="flex flex-wrap gap-2">
                        {['Low', 'Medium', 'High', 'Critical'].map((urgency) => (
                          <button
                            key={urgency}
                            onClick={() => setSelectedUrgency(urgency === selectedUrgency ? null : urgency)}
                            className={`px-3 py-1 rounded-full text-xs capitalize transition-all ${
                              selectedUrgency === urgency
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted text-foreground hover:bg-muted/80'
                            }`}
                          >
                            {urgency}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Status Filter */}
                    <div>
                      <p className="text-sm font-medium text-foreground mb-2">Status</p>
                      <div className="flex flex-wrap gap-2">
                        {['Open', 'In Progress', 'Resolved'].map((status) => (
                          <button
                            key={status}
                            onClick={() => setSelectedStatus(status === selectedStatus ? null : status)}
                            className={`px-3 py-1 rounded-full text-xs capitalize transition-all ${
                              selectedStatus === status
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted text-foreground hover:bg-muted/80'
                            }`}
                          >
                            {status}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Clear Filters */}
                    {hasActiveFilters && (
                      <Button
                        onClick={clearFilters}
                        variant="outline"
                        size="sm"
                        className="w-full"
                      >
                        <X className="mr-2 h-4 w-4" />
                        Clear Filters
                      </Button>
                    )}
                  </motion.div>
                )}
              </div>

              {/* Results */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    {filteredNeeds.length} need{filteredNeeds.length !== 1 ? 's' : ''} found
                  </p>
                </div>

                {filteredNeeds.length > 0 ? (
                  <div className="grid gap-4">
                    {filteredNeeds.map((need, idx) => (
                      <motion.div
                        key={need.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                      >
                        <NeedCard
                          need={need}
                        />
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-lg border border-dashed border-border bg-accent/20 p-12 text-center">
                    <MapPin className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      No needs found
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Try adjusting your filters or search term
                    </p>
                    <Button onClick={clearFilters} variant="outline">
                      Clear Filters
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
