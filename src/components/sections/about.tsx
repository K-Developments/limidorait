
"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { getAboutContent, AboutContent } from "@/services/firestore";
import { Skeleton } from "@/components/ui/skeleton";

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
      </div>
    </section>
  );
}
