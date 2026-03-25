'use client';

import { Card } from '@/components/ui/card';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'Director, Health NGO Delhi',
    content:
      'GeoVolunteer has completely transformed how we organize emergency medical camps. The volunteer matching system is incredibly accurate.',
    rating: 5,
  },
  {
    name: 'Rajesh Kumar',
    role: 'Volunteer, Education Program',
    content:
      'Found meaningful volunteer opportunities that match my teaching skills perfectly. The platform makes it easy to see where I can make a real difference.',
    rating: 5,
  },
  {
    name: 'Aisha Patel',
    role: 'Program Manager, Disaster Relief',
    content:
      'During the flood relief operation, GeoVolunteer helped us coordinate 500+ volunteers seamlessly. The real-time tracking was lifesaving.',
    rating: 5,
  },
  {
    name: 'Marco Johnson',
    role: 'Community Developer, Urban Program',
    content:
      'The geospatial insights showed us gaps in volunteer coverage we never knew existed. Data-driven decisions made our programs 40% more effective.',
    rating: 5,
  },
  {
    name: 'Dr. Chen Wei',
    role: 'Healthcare Coordinator',
    content:
      'The skill-matching algorithm ensures we get volunteers with the right expertise for medical support tasks. No more miscasts.',
    rating: 5,
  },
  {
    name: 'Fatima Al-Mansouri',
    role: 'Founder, Community Initiative',
    content:
      'What impressed us most is how quickly we could scale from 10 to 100 active volunteers. The platform grows with your needs.',
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Trusted by Thousands</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Organizations and volunteers across the globe are creating real impact with GeoVolunteer
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
            >
              <Card className="p-6 flex flex-col hover:shadow-lg transition-shadow">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>

                <p className="text-sm text-foreground mb-4 flex-1">{testimonial.content}</p>

                <div>
                  <p className="font-semibold text-sm">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-block bg-muted/50 rounded-full px-6 py-3 border border-border">
            <p className="text-sm font-semibold">
              <span className="text-primary">2,500+</span> Active Users &nbsp;&nbsp;
              <span className="text-accent">1,200+</span> Tasks Completed &nbsp;&nbsp;
              <span className="text-secondary">50+</span> Cities
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
