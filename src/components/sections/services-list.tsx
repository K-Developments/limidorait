
"use client";

import { useEffect, useState } from "react";
import { getServices, Service } from "@/services/firestore";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { Badge } from "../ui/badge";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function ServicesList() {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const content = await getServices();
        setServices(content);
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
      <div className="container mx-auto">
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
                <div key={i} className="grid md:grid-cols-2 gap-8 items-center">
                    <Skeleton className="h-64 w-full" />
                    <div className="space-y-4">
                        <Skeleton className="h-10 w-3/4" />
                        <Skeleton className="h-24 w-full" />
                    </div>
                </div>
            ))}
          </div>
        ) : (
          <div className="space-y-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="grid grid-cols-1 md:grid-cols-2 items-center min-h-[400px] overflow-hidden"
              >
                <div className="relative w-full h-[300px] md:h-full md:order-1">
                  <Image
                    src={service.imageUrl}
                    alt={service.title}
                    fill
                    className="object-cover"
                    data-ai-hint={service.aiHint}
                  />
                </div>
                <div className="bg-neutral-900 text-primary-foreground p-8 md:p-16 h-full flex flex-col justify-center md:order-2">
                  <h3 className="text-3xl md:text-4xl font-medium mb-4 font-body uppercase">
                    {service.title}
                  </h3>
                  <p className="text-lg mb-8 text-primary-foreground/80">
                    {service.description}
                  </p>
                  <Button asChild size="lg" className="self-start">
                    <Link href={service.link}>
                      Learn More
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
