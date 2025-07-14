"use client";

import { useState } from 'react';
import { PortfolioCard } from '@/components/PortfolioCard';
import { projects, Project } from '@/lib/portfolio-data';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Contact } from '@/components/sections/contact';
import { Card, CardContent, CardHeader, CardDescription } from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { MotionWrapper } from '@/components/motion-wrapper';

const categories = ["All", ...Array.from(new Set(projects.map(p => p.category)))];

const blogPosts = [
  {
    title: "The Future of Web Development",
    description: "Exploring the latest trends and technologies shaping the future of the web, from AI to WebAssembly.",
    imageUrl: "https://placehold.co/600x400.png",
    aiHint: "futuristic technology",
    date: "October 26, 2023",
    tags: ["Web Dev", "Trends", "AI"],
    slug: "#",
  },
  {
    title: "Why Great UI/UX is a Game-Changer",
    description: "A deep dive into how intuitive design and seamless user experience can make or break a digital product.",
    imageUrl: "https://placehold.co/600x400.png",
    aiHint: "user interface design",
    date: "October 15, 2023",
    tags: ["UI/UX", "Design"],
    slug: "#",
  },
  {
    title: "Building a Brand that Resonates",
    description: "Step-by-step guide on creating a memorable brand identity that connects with your target audience.",
    imageUrl: "https://placehold.co/600x400.png",
    aiHint: "branding strategy",
    date: "September 28, 2023",
    tags: ["Branding", "Strategy"],
    slug: "#",
  },
];


const SolutionsContent = () => {
    const [selectedCategory, setSelectedCategory] = useState("All");

    const filteredProjects = selectedCategory === "All"
      ? projects
      : projects.filter(p => p.category === selectedCategory);

    return (
        <>
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
        </>
    )
}

const BlogContent = () => {
    return (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-12 mt-12">
            {blogPosts.map((post) => (
            <MotionWrapper key={post.title}>
                <Card className="overflow-hidden group transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
                <CardHeader className="p-0">
                    <Link href={post.slug} className="block">
                    <Image
                        src={post.imageUrl}
                        alt={post.title}
                        width={600}
                        height={400}
                        className="w-full h-auto object-cover aspect-video transition-transform duration-300 group-hover:scale-105"
                        data-ai-hint={post.aiHint}
                    />
                    </Link>
                </CardHeader>
                <CardContent className="p-6 bg-card flex flex-col flex-grow">
                    <div className="flex-grow">
                    <p className="text-sm text-muted-foreground mb-2">{post.date}</p>
                    <Link href={post.slug}>
                        <h3 className="text-xl font-bold mb-2 hover:text-primary transition-colors">{post.title}</h3>
                    </Link>
                    <p className="text-muted-foreground mb-4">{post.description}</p>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-auto pt-4">
                    {post.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">{tag}</Badge>
                    ))}
                    </div>
                </CardContent>
                </Card>
            </MotionWrapper>
            ))}
        </div>
    )
}

export default function SolutionsPage() {
  const [activeTab, setActiveTab] = useState("solutions");

  const pageHeadings = {
      solutions: {
          title: "Our Work",
          description: "We take pride in our work. Explore a selection of our projects that showcase our passion for creativity and quality."
      },
      blog: {
          title: "Our Blog",
          description: "Insights, tutorials, and stories from the Limidora team."
      },
      contact: {
          title: "Get In Touch",
          description: "Have a project in mind or just want to say hello? Drop us a line. We're excited to hear from you."
      }
  }

  return (
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
                {pageHeadings[activeTab as keyof typeof pageHeadings].title}
              </h1>
              <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
                {pageHeadings[activeTab as keyof typeof pageHeadings].description}
              </p>
            </motion.div>
            
            <Tabs defaultValue="solutions" className="w-full" onValueChange={setActiveTab}>
                <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-12">
                    <TabsTrigger value="solutions">Solutions</TabsTrigger>
                    <TabsTrigger value="blog">Blog</TabsTrigger>
                    <TabsTrigger value="contact">Contact</TabsTrigger>
                </TabsList>
                <TabsContent value="solutions">
                    <SolutionsContent />
                </TabsContent>
                <TabsContent value="blog">
                    <BlogContent />
                </TabsContent>
                <TabsContent value="contact">
                    <Contact />
                </TabsContent>
            </Tabs>

          </div>
        </section>
      </main>
  );
}