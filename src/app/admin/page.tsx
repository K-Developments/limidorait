
"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { getHeroContent, updateHeroContent, HeroContent } from '@/services/firestore';
import { Skeleton } from '@/components/ui/skeleton';

export default function AdminHomePage() {
  const { toast } = useToast();
  const [heroContent, setHeroContent] = useState<HeroContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const content = await getHeroContent();
        setHeroContent(content);
      } catch (error) {
        console.error("Failed to fetch hero content:", error);
        toast({
          title: "Error",
          description: "Failed to load content from the database.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchContent();
  }, [toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!heroContent) return;

    try {
      await updateHeroContent(heroContent);
      toast({
        title: "Success!",
        description: "Content has been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error!",
        description: "Failed to update content. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-8">
        <h1 className="text-3xl font-bold uppercase">Content Management</h1>
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-1/2" />
            <Skeleton className="h-4 w-3/4" />
          </CardHeader>
          <CardContent className="space-y-6">
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-10 w-24" />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold uppercase">Homepage Content Management</h1>
      <form onSubmit={handleSubmit} className="space-y-8">

        <Card>
            <CardHeader>
                <CardTitle>Hero Section</CardTitle>
                <CardDescription>Update the content for the hero section on the homepage.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Content fields will be added here in the next step */}
                 <p className="text-muted-foreground">New fields for the redesigned hero section will be available here soon.</p>
            </CardContent>
        </Card>

        <Button type="submit" size="lg">Save All Changes</Button>
      </form>
    </div>
  );
}
