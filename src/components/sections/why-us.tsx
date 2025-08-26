
"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, Users, ShieldCheck } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface WhyUsCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  delay: number;
}

const WhyUsCard = ({ icon, title, description, delay }: WhyUsCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    viewport={{ once: true }}
    className="w-72 md:w-auto flex-shrink-0"
  >
    <Card className="h-full text-center bg-transparent border-none shadow-none p-4">
      <CardHeader>
        <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit">
          {icon}
        </div>
        <CardTitle className="pt-4 text-xl font-medium text-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  </motion.div>
);

export function WhyUs() {
  const features = [
    {
      icon: <Lightbulb className="h-8 w-8 text-primary" />,
      title: "Innovative Solutions",
      description: "We leverage the latest technologies to build cutting-edge solutions that give you a competitive edge."
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "Client-Centric Approach",
      description: "Your success is our priority. We work closely with you to understand your needs and deliver tailored results."
    },
    {
      icon: <ShieldCheck className="h-8 w-8 text-primary" />,
      title: "Quality & Reliability",
      description: "We are committed to delivering high-quality, reliable, and scalable solutions that stand the test of time."
    }
  ];

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
          <h2 className="text-3xl md:text-4xl font-medium text-foreground mb-4 font-body uppercase">
            Our Core Values
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We are defined by our commitment to excellence, innovation, and our clients' success.
          </p>
        </motion.div>
        <div className="md:grid md:grid-cols-3 md:gap-8 flex gap-4 overflow-x-auto pb-4 scrollbar-accent">
          {features.map((feature, index) => (
            <WhyUsCard 
              key={index}
              icon={feature.icon}
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
