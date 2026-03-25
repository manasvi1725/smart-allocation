'use client';

import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';

const steps = [
  {
    number: '1',
    title: 'Report Community Needs',
    description: 'Citizens and NGOs report local issues, medical emergencies, or community requirements through our platform.',
  },
  {
    number: '2',
    title: 'AI Analyzes & Prioritizes',
    description: 'Our system analyzes reported needs, determines urgency, and categorizes them for efficient allocation.',
  },
  {
    number: '3',
    title: 'NGOs Create Tasks',
    description: 'Organizations create volunteer tasks with specific skill requirements to address these needs.',
  },
  {
    number: '4',
    title: 'Volunteers Get Matched',
    description: 'Qualified volunteers receive personalized recommendations based on skills, location, and availability.',
  },
  {
    number: '5',
    title: 'Execute & Track',
    description: 'Volunteers accept tasks, execute them, and both parties track progress in real-time.',
  },
  {
    number: '6',
    title: 'Measure Impact',
    description: 'Organizations see detailed analytics on completed tasks, volunteer performance, and community outcomes.',
  },
];

export function HowItWorks() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A seamless workflow connecting community needs with volunteer action
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
            >
              <Card className="p-6 relative overflow-hidden hover:shadow-lg transition-shadow">
                <div className="absolute top-0 right-0 w-12 h-12 bg-primary/10 rounded-full -mr-6 -mt-6"></div>
                <div className="relative z-10">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold mb-4">
                    {step.number}
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
