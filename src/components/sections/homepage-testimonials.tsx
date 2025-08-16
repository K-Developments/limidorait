
"use client";

import * as React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import type { HomepageTestimonial } from "@/services/firestore";
import Autoplay from "embla-carousel-autoplay"

interface HomepageTestimonialsProps {
  testimonials: HomepageTestimonial[];
}

export function HomepageTestimonials({ testimonials }: HomepageTestimonialsProps) {
  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <section id="testimonials" className="py-16 md:py-24 bg-card overflow-hidden">
      <div className="container mx-auto px-4 md:px-[5rem]">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="md:col-span-1 space-y-4 text-center md:text-left"
          >
            <Badge variant="outline">Testimonials</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground font-body uppercase">
              What Our Clients Say
            </h2>
            <p className="text-muted-foreground text-lg">
              We take pride in our work and are honored to have the trust of our amazing clients.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="md:col-span-2"
          >
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              plugins={[
                Autoplay({
                  delay: 4000,
                  stopOnInteraction: true,
                }),
              ]}
              className="w-full"
            >
              <CarouselContent className="-ml-4">
                {testimonials.map((testimonial, index) => (
                  <CarouselItem key={index} className="pl-4 md:basis-1/2">
                    <div className="p-1">
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
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="hidden md:block">
                <CarouselPrevious />
                <CarouselNext />
              </div>
            </Carousel>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
