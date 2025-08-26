
"use client";

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { GanttChartSquare, PencilRuler, Code, Rocket } from 'lucide-react';

const processSteps = [
  {
    icon: GanttChartSquare,
    title: '1. Discovery & Strategy',
    description: "We start by understanding your goals, audience, and challenges to create a tailored roadmap for success.",
  },
  {
    icon: PencilRuler,
    title: '2. Design & Prototyping',
    description: "Our team designs intuitive UI/UX and creates interactive prototypes to visualize the end product.",
  },
  {
    icon: Code,
    title: '3. Development & Testing',
    description: "We write clean, efficient code and rigorously test every feature to ensure a flawless final product.",
  },
  {
    icon: Rocket,
    title: '4. Launch & Optimization',
    description: "After a successful launch, we monitor performance and provide ongoing support to ensure continued growth.",
  },
];

const Circle = ({ scrollYProgress }: { scrollYProgress: any }) => {
    const rotate = useTransform(scrollYProgress, [0.2, 1], [-180, 0]);
    const scale = useTransform(scrollYProgress, [0.1, 0.2], [0.5, 1]);
    const opacity = useTransform(scrollYProgress, [0.1, 0.2], [0, 1]);
  
    return (
      <motion.div
        style={{ rotate, scale, opacity }}
        className="sticky top-1/4 h-[300px] w-[300px] md:h-[400px] md:w-[400px] lg:h-[500px] lg:w-[500px]"
      >
        <svg viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <motion.path
                d="M499 250C499 112.783 386.217 1 249 1C111.783 1 1 112.783 1 250"
                stroke="hsl(var(--border))"
                strokeWidth="2"
                strokeDasharray="4 8"
            />
            <motion.path
                d="M1 250C1 387.217 113.783 499 251 499C388.217 499 499 387.217 499 250"
                stroke="hsl(var(--foreground))"
                strokeWidth="2"
            />
        </svg>
      </motion.div>
    );
};
  
const Step = ({ step, index }: { step: any; index: number }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
      target: ref,
      offset: ["start end", "end start"],
    });
  
    const opacity = useTransform(scrollYProgress, [0.2, 0.3, 0.7, 0.8], [0, 1, 1, 0]);
    const y = useTransform(scrollYProgress, [0.2, 0.3, 0.7, 0.8], ["30px", "0px", "0px", "-30px"]);
  
    const isEven = index % 2 === 0;
  
    return (
      <motion.div
        ref={ref}
        style={{ opacity, y }}
        className={cn(
          "w-full md:w-1/2 flex gap-4",
          isEven ? "md:self-start md:pr-8" : "md:self-end md:pl-8 md:text-right"
        )}
      >
        <div className={cn("mt-1", isEven ? "" : "md:order-2")}>
            <div className="bg-muted p-3 rounded-md w-fit mx-auto">
                <step.icon className="h-6 w-6 text-foreground" />
            </div>
        </div>
        <div className={cn(isEven ? "" : "md:order-1")}>
          <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
          <p className="text-muted-foreground">{step.description}</p>
        </div>
      </motion.div>
    );
};

export const WorkProcess = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section ref={containerRef} id="work-process" className="relative py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16 max-w-2xl mx-auto"
        >
          <Badge variant="outline" className="mb-4">Our Approach</Badge>
          <h2 className="text-3xl md:text-4xl font-medium text-foreground mb-4 font-body uppercase">
            Our Workflow
          </h2>
          <p className="text-lg text-muted-foreground">
            We follow a structured and collaborative process to ensure every project is a success, from initial concept to final launch.
          </p>
        </motion.div>
      </div>

      <div className="container relative mx-auto px-4 h-full">
        <div className="relative flex flex-col items-center">
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2" />
          <Circle scrollYProgress={scrollYProgress} />
          
          <div className="md:absolute md:inset-0 flex flex-col items-center justify-around gap-12 md:gap-0 mt-8 md:mt-0">
            {processSteps.map((step, index) => (
              <Step key={step.title} step={step} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
