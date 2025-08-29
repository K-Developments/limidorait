
"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import React, { useState, useMemo } from "react";
import { FaqContent, FaqItem } from "@/services/firestore";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";

export function Faq({ content }: { content: FaqContent | null }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const isLoading = !content;
  
  const categories = useMemo(() => {
    if (!content || !content.faqs || content.faqs.length === 0) return [];
    // Filter out any falsy category values before creating the Set
    const cats = new Set(content.faqs.map(faq => faq.category).filter(Boolean));
    return ["All", ...Array.from(cats)];
  }, [content]);

  const filteredFaqs = useMemo(() => {
    if (!content || !content.faqs) return [];
    if (activeCategory === "All") return content.faqs;
    return content.faqs.filter(faq => faq.category === activeCategory);
  }, [content, activeCategory]);


  if (isLoading) {
    return (
      <section id="faq" className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <Skeleton className="h-8 w-24 mx-auto mb-4" />
            <Skeleton className="h-12 w-1/2 mx-auto mb-4" />
            <Skeleton className="h-6 w-3/4 mx-auto" />
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="faq" aria-labelledby="faq-heading" className="w-full bg-background pt-12 pb-12 md:pb-24 lg:pb-32">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
        >
            <Badge variant="outline" className="mb-4">FAQs</Badge>
            <h1 id="faq-heading" className="text-3xl md:text-4xl font-semibold text-foreground mb-4 font-body">
              {content?.title}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {content?.description}
            </p>
        </motion.div>

        {categories.length > 1 && (
           <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="sticky top-20 z-30 bg-background/95 backdrop-blur-sm py-4 -mx-4 md:-mx-6 px-4 md:px-6 mb-8"
          >
            <div className="flex justify-center overflow-x-auto whitespace-nowrap pb-2 scrollbar-accent">
                <div className="flex items-center gap-4">
                    {categories.map((category, index) => (
                        <React.Fragment key={category}>
                            <button
                                onClick={() => setActiveCategory(category)}
                                className={cn(
                                    "text-base font-medium transition-colors pb-1",
                                    activeCategory === category
                                    ? "text-accent border-b-2 border-accent"
                                    : "text-muted-foreground hover:text-foreground"
                                )}
                                >
                                {category}
                            </button>
                            {index < categories.length - 1 && (
                                <Separator orientation="vertical" className="h-4 w-px bg-border" />
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>
          </motion.div>
        )}

        <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
        >
          {filteredFaqs && filteredFaqs.length > 0 ? (
            <Accordion type="single" collapsible className="w-full">
            {filteredFaqs.map((item, index) => (
                <AccordionItem key={item.id} value={`item-${index}`}>
                <AccordionTrigger className="text-lg font-medium text-left">{item.question}</AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">
                    {item.answer}
                </AccordionContent>
                </AccordionItem>
            ))}
            </Accordion>
          ) : (
             <div className="text-center text-muted-foreground py-16">
                <p className="text-lg">No frequently asked questions have been added yet.</p>
                <p>Check back soon!</p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
