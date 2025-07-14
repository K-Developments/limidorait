
"use client";

import { useState } from 'react';
import { PortfolioCard } from '@/components/PortfolioCard';
import { projects, Project } from '@/lib/portfolio-data';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const categories = ["All", ...Array.from(new Set(projects.map(p => p.category)))];

export default function SolutionsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProjects = selectedCategory === "All"
    ? projects
    : projects.filter(p => p.category === selectedCategory);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <main className="flex-1 pt-20">
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h1 className="font-headline text-4xl md:text-5xl font-bold">
                Our Work
              </h1>
              <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
                We take pride in our work. Explore a selection of our projects that showcase our passion for creativity and quality.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex justify-center flex-wrap gap-2 md:gap-4 mb-12"
            >
              {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                 <PortfolioCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
