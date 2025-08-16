
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Separator } from "../ui/separator";
import { ArrowUpRight } from "lucide-react";
import type { HomepageService } from "@/services/firestore";

interface HomepageServicesProps {
  services: HomepageService[];
}

export function HomepageServices({ services }: HomepageServicesProps) {
  return (
    <section id="services" className="py-16 md:py-24 bg-card">
      <div className="container mx-auto px-4 md:px-[5rem]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge variant="outline" className="mb-4">Our Services</Badge>
          <h2 className="text-3xl md:text-4xl font-medium text-foreground mb-4 font-body uppercase">
            What We Do
          </h2>
          <p className="text-lg max-w-2xl mx-auto text-foreground">
            We deliver high-quality digital solutions to help your business grow and succeed in the modern world.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {(services || []).map((service, index) => (
                <motion.div
                    key={service.title}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                >
                    <Card className="group overflow-hidden relative h-full transition-shadow duration-300 flex flex-col border-0">
                      <Link href={service.link} className="absolute inset-0 z-10" aria-label={service.title}></Link>
                      <CardHeader className="p-0">
                      <div className="aspect-video overflow-hidden">
                          <Image
                          src={service.imageUrl}
                          alt={service.title}
                          width={600}
                          height={400}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          data-ai-hint={service.aiHint}
                          />
                      </div>
                      </CardHeader>
                      <CardContent className="p-6 flex flex-col flex-grow">
                          <div className="flex-grow">
                              <h3 className="text-2xl font-medium mb-2 font-body uppercase text-foreground">{service.title}</h3>
                              <Separator className="my-4" />
                              <p className="mb-4 text-foreground">{service.description}</p>
                          </div>
                          <div className="mt-4">
                            <Button asChild variant="outline" className="relative z-20">
                                <Link href={service.link}>Learn More</Link>
                            </Button>
                          </div>
                           <div className="absolute top-4 right-4 bg-background p-2 rounded-full translate-x-12 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                              <ArrowUpRight className="w-5 h-5 text-foreground" />
                          </div>
                      </CardContent>
                    </Card>
                </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
}
