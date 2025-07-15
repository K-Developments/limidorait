
"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { getAboutContent, AboutContent } from "@/services/firestore";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { motion } from "framer-motion";

export function About() {
  const [content, setContent] = useState<AboutContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const aboutContent = await getAboutContent();
        setContent(aboutContent);
      } catch (error) {
        console.error("Failed to fetch about content:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchContent();
  }, []);

  return (
    <section id="about" className="w-full pt-12 bg-card relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-8">
          <nav className="flex items-center text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="h-4 w-4 mx-1" />
            <span className="font-medium text-foreground">About</span>
          </nav>
        </div>
        {isLoading ? (
          <div className="flex flex-col items-center text-center py-12">
            <Skeleton className="h-8 w-1/4 mb-4" />
            <Skeleton className="h-10 w-1/2 mb-4" />
            <Skeleton className="h-20 w-3/4" />
          </div>
        ) : (
          <div className="flex flex-col items-center text-center py-12">
            <div className="inline-block bg-secondary px-3 py-1 text-sm text-secondary-foreground mb-4">Our Vision</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
              {content?.aboutTitle}
            </h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              {content?.aboutDescription}
            </p>
          </div>
        )}

        <div className="py-12 md:py-16">
          <div className="grid gap-8 md:grid-cols-2 md:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="w-full"
            >
              <Image
                src="https://placehold.co/400x400.png"
                alt="Limidora Concepts"
                width={400}
                height={400}
                className="rounded-lg object-cover w-full h-auto aspect-square"
                data-ai-hint="abstract technology design"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-4 text-center md:text-left"
            >
              <h3 className="text-3xl font-bold tracking-tight">Limidora Concepts</h3>
              <p className="text-muted-foreground md:text-lg">
                We provide solutions for businesses of all types and sizes. Whether your business is large or small, our concepts are designed to integrate modern technology seamlessly. In today's world, every business needs to adapt and evolve. We create tailored technological solutions to improve your processes, reach, and overall success.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
