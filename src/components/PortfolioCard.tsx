
"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import type { Project } from "@/lib/portfolio-data";
import { Button } from "./ui/button";

interface PortfolioCardProps {
  project: Project;
}

export function PortfolioCard({ project }: PortfolioCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <Card className="group overflow-hidden relative h-full transition-shadow duration-300 aspect-video">
        <Link href={`/portfolio#`} className="block w-full h-full">
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            data-ai-hint={project.aiHint}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
            <div className="transform transition-transform duration-300 ease-in-out group-hover:-translate-y-2">
              <p className="text-sm font-semibold uppercase tracking-wider text-white/80">{project.category}</p>
              <h3 className="text-2xl font-medium mt-1 font-body uppercase">{project.title}</h3>
            </div>
            <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Button variant="secondary" size="sm">View Project</Button>
            </div>
          </div>
        </Link>
      </Card>
    </motion.div>
  );
}
