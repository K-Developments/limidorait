
"use client";
import * as React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import type { HomepageTestimonial } from "@/services/firestore";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface TestimonialsProps {
  testimonials: HomepageTestimonial[];
}

const TestimonialCard = ({ testimonial }: { testimonial: HomepageTestimonial }) => (
  <Card className="h-full border-0 shadow-lg mb-4 flex-shrink-0">
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
          <p className="font-medium text-foreground">{testimonial.author}</p>
          <p className="text-sm text-muted-foreground">{testimonial.company}</p>
        </div>
      </div>
    </CardContent>
  </Card>
);

// Mobile Carousel Component
const MobileTestimonialCarousel = ({ testimonials }: { testimonials: HomepageTestimonial[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [testimonials.length]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <div className="relative">
      {/* Main testimonial display */}
      <div className="overflow-hidden rounded-lg">
        <motion.div
          className="flex transition-transform duration-300 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {testimonials.map((testimonial, index) => (
            <div key={testimonial.author} className="w-full flex-shrink-0">
              <TestimonialCard testimonial={testimonial} />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          onClick={goToPrevious}
          className="p-2 rounded-full  transition-colors"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="w-5 h-5 text-primary" />
        </button>

        {/* Dots indicator */}
        <div className="flex gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                "w-2 h-2 rounded-full transition-colors",
                index === currentIndex ? "bg-primary" : "bg-primary/30"
              )}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={goToNext}
          className="p-2 rounded-full  transition-colors"
          aria-label="Next testimonial"
        >
          <ChevronRight className="w-5 h-5 text-primary" />
        </button>
      </div>
    </div>
  );
};

const TestimonialColumn = ({
  testimonials,
  className,
  duration = "40s",
  direction = "up"
}: {
  testimonials: HomepageTestimonial[];
  className?: string;
  duration?: string;
  direction?: "up" | "down";
}) => {
  const animationName = direction === "up" ? "scroll-up" : "scroll-down";
  
  return (
    <div className={cn("flex flex-col", className)}>
      <div 
        className="flex flex-col"
        style={{ 
          animation: `${animationName} ${duration} linear infinite`,
        }}
      >
        {/* Render testimonials twice for seamless loop */}
        {[...testimonials, ...testimonials].map((testimonial, index) => (
          <TestimonialCard key={`${testimonial.author}-${index}`} testimonial={testimonial} />
        ))}
      </div>
    </div>
  );
};

export function Testimonials({ testimonials }: TestimonialsProps) {
  if (!testimonials || testimonials.length === 0) {
    return null;
  }
  
  const midPoint = Math.ceil(testimonials.length / 2);
  const firstHalf = testimonials.slice(0, midPoint);
  const secondHalf = testimonials.slice(midPoint);

  return (
    <section id="testimonials" className="py-16 md:py-24 bg-card overflow-hidden">
      <div className="container mx-auto px-4 md:px-[15rem]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge variant="outline">Testimonials</Badge>
          <h2 className="text-3xl md:text-4xl font-medium text-foreground font-body uppercase">
            What Our Clients Say
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mt-4">
            We take pride in our work and are honored to have the trust of our amazing clients.
          </p>
        </motion.div>

        {/* Mobile Layout: Carousel */}
        <div className="md:hidden">
          <MobileTestimonialCarousel testimonials={testimonials} />
        </div>
                
        {/* Desktop Layout: Smooth Scrolling Columns */}
        <div className="hidden md:block relative h-[600px] overflow-hidden">
          {/* Top fade gradient */}
          <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-card to-transparent z-10 pointer-events-none" />
          
          <div className="flex justify-center gap-6 h-full">
            {/* First column scrolling up */}
            <div className="w-1/2 max-w-md overflow-hidden">
              <TestimonialColumn 
                testimonials={firstHalf} 
                duration="60s" 
                direction="up"
              />
            </div>
            
            {/* Second column scrolling down with offset */}
            <div className="w-1/2 max-w-md overflow-hidden">
              <TestimonialColumn 
                testimonials={secondHalf} 
                className="mt-16" 
                duration="50s" 
                direction="down"
              />
            </div>
          </div>
          
          {/* Bottom fade gradient */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-card to-transparent z-10 pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
