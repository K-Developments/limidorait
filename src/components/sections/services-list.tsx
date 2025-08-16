
"use client";

import { useEffect, useState } from "react";
import { getHeroContent, HomepageService } from "@/services/firestore";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { Badge } from "../ui/badge";

export function ServicesList() {
  const [services, setServices] = useState<HomepageService[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const content = await getHeroContent();
        setServices(content.services);
      } catch (error) {
        console.error("Failed to fetch services content:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchContent();
  }, []);

  return (
    <section id="services-list" className="w-full bg-background relative py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
        >
            <Badge variant="outline" className="mb-4">Our Expertise</Badge>
            <h1 id="faq-heading" className="text-4xl md:text-5xl font-medium text-foreground mb-4 font-body uppercase">
              Services We Offer
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We provide a comprehensive suite of digital services to elevate your brand.
            </p>
        </motion.div>

        {isLoading ? (
          <div className="space-y-12">
            {[...Array(4)].map((_, i) => (
                <div key={i} className="grid md:grid-cols-3 gap-8 items-start">
                    <div className="md:col-span-1">
                    <Skeleton className="h-10 w-3/4" />
                    </div>
                    <div className="md:col-span-2 space-y-4">
                    <Skeleton className="h-24 w-full" />
                    </div>
                </div>
            ))}
          </div>
        ) : (
          <div className="space-y-16">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: "easeOut", delay: index * 0.1 }}
                className="grid md:grid-cols-3 gap-8 md:gap-16 items-start"
              >
                <div className="md:col-span-1 md:text-right">
                  <h2 className="text-3xl font-medium uppercase text-foreground tracking-tight">
                    {service.title}
                  </h2>
                </div>
                <div className="md:col-span-2 relative pl-8 md:pl-12">
                  <div 
                    aria-hidden="true" 
                    className="absolute top-0 left-0 h-full w-px bg-border"
                  />
                  <div 
                    aria-hidden="true" 
                    className="absolute top-0 left-0 w-8 h-px bg-border"
                  />
                  <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
