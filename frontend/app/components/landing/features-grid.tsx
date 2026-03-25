'use client';

import { Card } from '@/components/ui/card';
import { MapPin, Users, Zap, BarChart3, Shield, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: MapPin,
    title: 'Community Need Detection',
    description: 'Automatically detect and map community needs through multiple data sources and citizen reports.',
  },
  {
    icon: Users,
    title: 'Volunteer Matching',
    description: 'AI-powered matching connects skilled volunteers with tasks that match their expertise.',
  },
  {
    icon: Zap,
    title: 'NGO Coordination',
    description: 'Streamlined task creation, volunteer management, and impact tracking for organizations.',
  },
  {
    icon: BarChart3,
    title: 'Geospatial Insights',
    description: 'Data-driven dashboards visualize community needs and volunteer distribution across regions.',
  },
  {
    icon: Shield,
    title: 'Trusted Verification',
    description: 'Volunteer credentials and NGO verification ensure safe, quality collaborations.',
  },
  {
    icon: Clock,
    title: 'Real-time Updates',
    description: 'Live task status updates and volunteer availability keep everyone synchronized.',
  },
];

export function FeaturesGrid() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Powerful Features</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to coordinate community impact effectively
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
              >
                <Card className="p-6 hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
