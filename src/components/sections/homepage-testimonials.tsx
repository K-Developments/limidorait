
"use client";

import * as React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import type { HomepageTestimonial } from "@/services/firestore";
import { cn } from "@/lib/utils";

interface HomepageTestimonialsProps {
  testimonials: HomepageTestimonial[];
}

const TestimonialCard = ({ testimonial }: { testimonial: HomepageTestimonial }) => (
  <Card className="h-full border-0 shadow-lg">
    <CardContent className="flex flex-col items-start gap-4 p-6">
      <p className="text-lg font-semibold text-foreground">"{testimonial.quote}"</p>
      <div className="flex items-center gap-4 mt-2">
        <Image
          src={testimonial.avatarUrl}
          alt={testimonial.author}
          width={48}
          height={48}
          className="rounded-full object-cover"
        />
        <div>
          <p className="font-bold text-foreground">{testimonial.author}</p>
          <p className="text-sm text-muted-foreground">{testimonial.company}</p>
        </div>
      </div>
    </CardContent>
  </Card>
);

const TestimonialColumn = ({
  testimonials,
  className,
  duration = "40s"
}: {
  testimonials: HomepageTestimonial[];
  className?: string;
  duration?: string;
}) => (
    <div className={cn("flex flex-col gap-4", className)}>
        {[...testimonials, ...testimonials].map((testimonial, index) => (
            <div key={index} className="scrolling-container" style={{ animationDuration: duration }}>
                <TestimonialCard testimonial={testimonial} />
            </div>
        ))}
    </div>
);


export function HomepageTestimonials({ testimonials }: HomepageTestimonialsProps) {
  if (!testimonials || testimonials.length === 0) {
    return null;
  }
  
  const midPoint = Math.ceil(testimonials.length / 2);
  const firstHalf = testimonials.slice(0, midPoint);
  const secondHalf = testimonials.slice(midPoint);

  return (
    <section id="testimonials" className="py-16 md:py-24 bg-card overflow-hidden">
      <div className="container mx-auto px-4 md:px-[5rem]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge variant="outline">Testimonials</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground font-body uppercase">
            What Our Clients Say
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mt-4">
            We take pride in our work and are honored to have the trust of our amazing clients.
          </p>
        </motion.div>

        {/* Mobile Layout: Simple Stack */}
        <div className="md:hidden space-y-4">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.author} testimonial={testimonial} />
          ))}
        </div>
        
        {/* Desktop Layout: Scrolling Broken Grid */}
        <div className="hidden md:block relative h-[500px] overflow-hidden">
             <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-card to-transparent z-10" />
            <div className="flex justify-center gap-4">
                <TestimonialColumn testimonials={firstHalf} duration="60s" />
                <TestimonialColumn testimonials={secondHalf} className="mt-16" duration="50s" />
            </div>
             <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-card to-transparent z-10" />
        </div>
      </div>
    </section>
  );
}
