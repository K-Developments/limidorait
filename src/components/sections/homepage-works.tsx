
"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { HomepageWork } from "@/services/firestore";

interface HomepageWorksProps {
  works: HomepageWork[];
}

export function HomepageWorks({ works }: HomepageWorksProps) {
  if (!works || works.length < 3) {
    // Render nothing or a placeholder if there isn't enough data
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
    <section id="homepage-works" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge variant="outline" className="mb-4">Our Portfolio</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-body uppercase">
            Our Recent Works
          </h2>
          <p className="text-lg max-w-2xl mx-auto text-muted-foreground">
            We are passionate about creating stunning digital experiences. Here's a glimpse of our favorite projects.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-auto md:h-[600px]">
          {/* Main Large Item */}
          <motion.div 
            className="md:col-span-1 md:row-span-2 relative group overflow-hidden"
            custom={0}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <WorkCard work={firstWork} />
          </motion.div>

          {/* Two Smaller Items */}
          <motion.div 
            className="md:col-span-1 relative group overflow-hidden"
            custom={1}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <WorkCard work={secondWork} />
          </motion.div>
          <motion.div 
            className="md:col-span-1 relative group overflow-hidden"
            custom={2}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <WorkCard work={thirdWork} />
          </motion.div>
        </div>
        <div className="text-center mt-12">
            <Button asChild size="lg" variant="outline">
                <Link href="/portfolio">View All Works</Link>
            </Button>
        </div>
      </div>
    </section>
  );
}


const WorkCard = ({ work }: { work: HomepageWork }) => {
    return (
        <Link href={work.link} className="absolute inset-0">
            <Image
                src={work.imageUrl}
                alt={work.title}
                fill
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300 ease-in-out"
                data-ai-hint={work.aiHint}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                <div className="transform transition-transform duration-300 ease-in-out group-hover:-translate-y-2">
                    <p className="text-sm font-semibold uppercase tracking-wider text-white/80">{work.category}</p>
                    <h3 className="text-2xl font-bold mt-1 font-body uppercase">{work.title}</h3>
                </div>
                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button variant="secondary">View Project</Button>
                </div>
            </div>
        </Link>
    )
}
