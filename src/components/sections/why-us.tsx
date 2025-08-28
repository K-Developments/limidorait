
"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, Users, ShieldCheck } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { WhyUsSection } from "@/services/firestore";
import Image from "next/image";
import { Skeleton } from "../ui/skeleton";

interface WhyUsCardProps {
  iconUrl: string;
  title: string;
  description: string;
  delay: number;
}

const WhyUsCard = ({ iconUrl, title, description, delay }: WhyUsCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    viewport={{ once: true }}
    className="w-72 md:w-auto flex-shrink-0"
  >
    <Card className="h-full text-center bg-transparent border-none shadow-none p-4">
      <CardHeader>
        <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit relative h-16 w-16 flex items-center justify-center">
            {iconUrl ? (
                <Image src={iconUrl} alt={title} width={32} height={32} className="object-contain" />
            ): (
                <Lightbulb className="h-8 w-8 text-primary" />
            )}
        </div>
        <CardTitle className="pt-4 text-xl font-semibold text-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  </motion.div>
);

export function WhyUs({ content }: { content?: WhyUsSection }) {
    const isLoading = !content;

    if (isLoading) {
        return (
            <section id="why-us" className="py-20 md:py-28 bg-background">
              <div className="container mx-auto px-4 md:px-6">
                 <div className="text-center mb-16">
                     <Skeleton className="h-7 w-24 mx-auto mb-4" />
                     <Skeleton className="h-10 w-1/2 mx-auto mb-4" />
                     <Skeleton className="h-6 w-3/4 mx-auto" />
                 </div>
                 <div className="md:grid md:grid-cols-3 md:gap-8 flex gap-4 overflow-x-auto pb-4 scrollbar-accent">
                    {[...Array(3)].map((_, index) => (
                        <div key={index} className="w-72 md:w-auto flex-shrink-0">
                            <Skeleton className="h-64 w-full" />
                        </div>
                    ))}
                 </div>
              </div>
            </section>
        )
    }

  return (
    <section id="why-us" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4">Why Choose Us</Badge>
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4 font-body">
            {content?.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {content?.subtitle}
          </p>
        </motion.div>
        <div className="md:grid md:grid-cols-3 md:gap-8 flex gap-4 overflow-x-auto pb-4 scrollbar-accent">
          {content?.cards.map((feature, index) => (
            <WhyUsCard 
              key={feature.id}
              iconUrl={feature.iconUrl}
              title={feature.title}
              description={feature.description}
              delay={index * 0.15}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
