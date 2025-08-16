
"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { PortfolioCard } from "@/components/PortfolioCard";
import { PortfolioHero } from "@/components/sections/portfolio-hero";
import { ClientsCarousel } from "@/components/sections/clients-carousel";
import { useEffect, useState } from "react";
import { getProjects, Project } from "@/services/firestore";
import { Skeleton } from "@/components/ui/skeleton";

export default function PortfolioPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const fetchProjects = async () => {
        try {
          const projectData = await getProjects();
          setProjects(projectData);
        } catch (error) {
          console.error("Failed to fetch projects:", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchProjects();
    }, []);

    return (
      <>
        <PortfolioHero />
        <section id="portfolio" className="py-20 md:py-28 bg-background">
          <div className=" mx-auto px-4 md:px-[5rem]">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <Badge variant="outline" className="mb-4">Our Work</Badge>
              <h1 className="text-4xl md:text-5xl font-medium text-foreground mb-4 font-body uppercase">
                Our Portfolio
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                A glimpse into our creative world and the impact we deliver.
              </p>
            </motion.div>
            
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, index) => (
                  <Skeleton key={index} className="aspect-video w-full h-full" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <PortfolioCard project={project} />
                  </motion.div>
                ))}
              </div>
            )}

          </div>
        </section>
        <ClientsCarousel />
      </>
    );
}
