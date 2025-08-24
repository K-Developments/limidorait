
"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { HomepageWork } from "@/services/firestore";
import { ArrowRight } from "lucide-react";

interface HomepageWorksProps {
  works: HomepageWork[];
}

export function HomepageWorks({ works }: HomepageWorksProps) {
  if (!works || works.length < 3) {
    return null;
  }

  const firstWork = works[0];
  const secondWork = works[1];
  const thirdWork = works[2];

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  return (
    <section id="homepage-works" className="py-12 sm:py-16 md:py-24 bg-background">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12"
        >
          <Badge variant="outline" className="mb-4">Our Portfolio</Badge>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium text-foreground mb-4 font-body uppercase">
            Our Recent Works
          </h2>
          <p className="text-base sm:text-lg max-w-2xl mx-auto text-muted-foreground px-4">
            We are passionate about creating stunning digital experiences. Here's a glimpse of our favorite projects.
          </p>
        </motion.div>

        {/* Mobile Layout - Single Column */}
        <div className="block sm:hidden space-y-6">
          <motion.div
            custom={0}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <WorkCard work={firstWork} className="aspect-square" />
          </motion.div>

          <motion.div
            custom={1}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <WorkCard work={secondWork} className="aspect-square" />
          </motion.div>

          <motion.div
            custom={2}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <WorkCard work={thirdWork} className="aspect-square" />
          </motion.div>
        </div>

        {/* Tablet Layout - 2 Column */}
        <div className="hidden sm:block md:hidden">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <motion.div
              custom={0}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <WorkCard work={firstWork} className="aspect-square" />
            </motion.div>

            <motion.div
              custom={1}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <WorkCard work={secondWork} className="aspect-square" />
            </motion.div>
          </div>
          
          <motion.div
            custom={2}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <WorkCard work={thirdWork} className="aspect-video" />
          </motion.div>
        </div>

        {/* Desktop Layout - Original Grid */}
        <div className="hidden md:grid md:grid-cols-2 gap-8 h-[600px]">
          <motion.div 
            className="md:col-span-1 md:row-span-2"
            custom={0}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <WorkCard work={firstWork} className="h-full"/>
          </motion.div>

          <motion.div 
            className="md:col-span-1"
            custom={1}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <WorkCard work={secondWork} className="h-full" />
          </motion.div>
          
          <motion.div 
            className="md:col-span-1"
            custom={2}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
             <WorkCard work={thirdWork} className="h-full" />
          </motion.div>
        </div>

        <div className="text-center mt-8 sm:mt-12">
          <Button asChild size="lg" variant="outline">
            <Link href="/portfolio">View All Works</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

const WorkCard = ({ work, className }: { work: HomepageWork, className?: string }) => {
    return (
        <div className="relative w-full h-full group">
            <Link href={work.link} className="block relative w-full h-full overflow-hidden rounded-lg">
                <div className={`relative w-full ${className}`}>
                    <Image
                        src={work.imageUrl}
                        alt={work.title}
                        fill
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300 ease-in-out"
                        data-ai-hint={work.aiHint}
                    />
                    {/* Desktop & Tablet Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent hidden sm:block" />
                    <div className="absolute inset-0 hidden sm:flex flex-col justify-end p-4 md:p-6 text-white">
                        <div className="transform transition-transform duration-300 ease-in-out group-hover:-translate-y-2">
                            <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-white/80">{work.category}</p>
                            <h3 className="text-lg sm:text-xl md:text-2xl font-medium mt-1 font-body uppercase">{work.title}</h3>
                        </div>
                        <div className="mt-3 md:mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <Button variant="secondary" size="sm" className="sm:size-default">View Project</Button>
                        </div>
                    </div>
                </div>
            </Link>
            
            {/* Mobile Content */}
            <div className="sm:hidden mt-3 px-1">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{work.category}</p>
                <h3 className="text-lg font-medium mt-1 font-body uppercase text-foreground">{work.title}</h3>
                <Link href={work.link} className="inline-flex items-center gap-1 mt-3 text-sm text-foreground hover:text-primary transition-colors duration-200 animate-arrow-on-hover">
                    <ArrowRight className="h-4 w-4" />
                    View Project
                </Link>
            </div>
        </div>
    )
}
