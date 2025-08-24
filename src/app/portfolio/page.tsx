
"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { PortfolioCard } from "@/components/PortfolioCard";
import { PortfolioHero } from "@/components/sections/portfolio-hero";
import { ClientsCarousel } from "@/components/sections/clients-carousel";
import { useEffect, useState } from "react";
import { getProjects, Project, getPortfolioContent, PortfolioContent } from "@/services/firestore";
import { Skeleton } from "@/components/ui/skeleton";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Portfolio | Limidora Digital',
  description: 'Explore our portfolio of web development, UI/UX design, and mobile app projects. See how we help businesses achieve their goals with creative solutions.',
};

export default function PortfolioPage() {
    const [projects, setProjects] = useState<(Project & { link: string })[]>([]);
    const [portfolioContent, setPortfolioContent] = useState<PortfolioContent | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const fetchContent = async () => {
        try {
          const [projectData, contentData] = await Promise.all([
            getProjects(),
            getPortfolioContent()
          ]);
          setProjects(projectData);
          setPortfolioContent(contentData);
        } catch (error) {
          console.error("Failed to fetch page content:", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchContent();
    }, []);

    return (
      <>
        <PortfolioHero />
        <section id="portfolio" className="py-20 md:py-28 bg-background">
          <div className="container">
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
        {isLoading && (
            <div className="container py-20">
                <Skeleton className="h-48 w-full" />
            </div>
        )}
        {portfolioContent && (
            <ClientsCarousel 
                title={portfolioContent.clientsSection.title}
                subtitle={portfolioContent.clientsSection.subtitle}
                logos={portfolioContent.clientsSection.logos}
            />
        )}
      </>
    );
}
