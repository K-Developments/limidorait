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
  <Card className="h-auto border-0 shadow-lg mb-4 flex-shrink-0 w-full">
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
    }, 5000);

    return () => clearInterval(timer);
  }, [testimonials.length]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Main testimonial display */}
      <div className="overflow-hidden rounded-lg">
        <motion.div
          className="flex"
          animate={{
            x: `-${currentIndex * 100}%`,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
        >
          {testimonials.map((testimonial, index) => (
            <div key={`${testimonial.author}-${index}`} className="w-full flex-shrink-0">
              <TestimonialCard testimonial={testimonial} />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          onClick={goToPrevious}
          className="p-2 rounded-full bg-background/80 backdrop-blur-sm border hover:bg-background transition-colors"
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
                "w-2 h-2 rounded-full transition-all duration-300",
                index === currentIndex ? "bg-primary w-4" : "bg-primary/30"
              )}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={goToNext}
          className="p-2 rounded-full bg-background/80 backdrop-blur-sm border hover:bg-background transition-colors"
          aria-label="Next testimonial"
        >
          <ChevronRight className="w-5 h-5 text-primary" />
        </button>
      </div>
    </div>
  );
};

// Desktop Scrolling Column Component
const DesktopScrollingColumn = ({
  testimonials,
  duration = "40s",
  direction = "up",
  delay = 0
}: {
  testimonials: HomepageTestimonial[];
  duration?: string;
  direction?: "up" | "down";
  delay?: number;
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(true);
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div className="w-full max-w-md overflow-hidden relative">
      <div
        className={cn(
          "flex flex-col transition-transform duration-1000 ",
          isAnimating && (direction === "up" ? "animate-scroll-up" : "animate-scroll-down")
        )}
        style={{
          animationDuration: isAnimating ? duration : "0s",
          animationDelay: isAnimating ? "0s" : "999999s",
        }}
      >
        {/* Triple the testimonials for seamless infinite scroll */}
        {[...testimonials, ...testimonials, ...testimonials].map((testimonial, index) => (
          <TestimonialCard 
            key={`${testimonial.author}-${index}`} 
            testimonial={testimonial} 
          />
        ))}
      </div>
    </div>
  );
};

export function Testimonials({ testimonials }: TestimonialsProps) {
  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  // Split testimonials for desktop columns
  const midPoint = Math.ceil(testimonials.length / 2);
  const firstHalf = testimonials.slice(0, midPoint);
  const secondHalf = testimonials.slice(midPoint);

  return (
    <section id="testimonials" className="py-16 md:py-24 bg-card">
      <div className="container mx-auto px-4 ">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge variant="outline" className="mb-4">Testimonials</Badge>
          <h2 className="text-3xl md:text-4xl font-medium text-foreground font-body uppercase mb-4">
            What Our Clients Say
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We take pride in our work and are honored to have the trust of our amazing clients.
          </p>
        </motion.div>

        {/* Mobile Layout: Carousel */}
        <div className="block md:hidden">
          <MobileTestimonialCarousel testimonials={testimonials} />
        </div>

        {/* Desktop Layout: Sequential Scrolling Columns */}
        <div className="hidden md:block relative">
          <div className="h-[600px] overflow-hidden relative ">
            {/* Gradient overlays */}
            <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-card via-card/80 to-transparent z-10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-card via-card/80 to-transparent z-10 pointer-events-none" />

            {/* Columns container */}
            <motion.div
              className="flex justify-center gap-6 h-full "
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              {/* First column - starts immediately */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="w-1/2 max-w-md"
              >
                <DesktopScrollingColumn
                  testimonials={firstHalf}
                  duration="60s"
                  direction="up"
                  delay={0.5} // Start after 0.5 seconds
                />
              </motion.div>

              {/* Second column - starts after first column animation begins */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                className="w-1/2 max-w-md mt-16"
              >
                <DesktopScrollingColumn
                  testimonials={secondHalf}
                  duration="50s"
                  direction="down"
                  delay={2} // Start after 2 seconds (after first column starts)
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx global>{`
        @keyframes scroll-up {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-33.333%);
          }
        }

        @keyframes scroll-down {
          0% {
            transform: translateY(-33.333%);
          }
          100% {
            transform: translateY(0);
          }
        }

        .animate-scroll-up {
          animation: scroll-up linear infinite;
        }

        .animate-scroll-down {
          animation: scroll-down linear infinite;
        }

        /* Ensure smooth scrolling */
        .animate-scroll-up,
        .animate-scroll-down {
          will-change: transform;
        }

        /* Hide scrollbar in testimonial containers */
        .testimonials-container::-webkit-scrollbar {
          display: none;
        }
        
        .testimonials-container {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}