
"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { getHeroContent, updateHeroContent, HeroContent, Slide } from '@/services/firestore';
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

  const handleSlideChange = (index: number, value: string) => {
    if (heroContent) {
      const newSlides = [...heroContent.slides];
      // Simple logic: if URL contains .mp4, it's a video. Otherwise, an image.
      const type = value.includes('.mp4') ? 'video' : 'image';
      newSlides[index] = { ...newSlides[index], url: value, type };
      setHeroContent({ ...heroContent, slides: newSlides });
    }
  };

  const handleButtonChange = (field: 'buttonText' | 'buttonLink', value: string) => {
     if (heroContent) {
      setHeroContent({ ...heroContent, [field]: value });
    }
  }

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
            <CardTitle>Hero Section Slider</CardTitle>
            <CardDescription>Update the video and images for the hero section slider.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {heroContent?.slides.map((slide, index) => (
              <div key={index} className="space-y-2">
                <Label htmlFor={`slide-${index}`}>Slide {index + 1} (Video or Image URL)</Label>
                <Input
                  id={`slide-${index}`}
                  value={slide.url}
                  onChange={(e) => handleSlideChange(index, e.target.value)}
                  placeholder="https://example.com/video.mp4 or https://example.com/image.png"
                />
                <p className="text-sm text-muted-foreground">
                  Detected type: <span className="font-semibold">{slide.type}</span>
                </p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Hero Button</CardTitle>
                <CardDescription>Update the text and link for the button in the hero section.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                 <div className="space-y-2">
                    <Label htmlFor="buttonText">Button Text</Label>
                    <Input id="buttonText" value={heroContent?.buttonText || ''} onChange={(e) => handleButtonChange('buttonText', e.target.value)} />
                 </div>
                 <div className="space-y-2">
                    <Label htmlFor="buttonLink">Button Link</Label>
                    <Input id="buttonLink" value={heroContent?.buttonLink || ''} onChange={(e) => handleButtonChange('buttonLink', e.target.value)} />
                 </div>
            </CardContent>
        </Card>

        <Button type="submit" size="lg">Save All Changes</Button>
      </form>
    </div>
  );
}
