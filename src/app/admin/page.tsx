
"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { getHeroContent, updateHeroContent, HeroContent, HomepageService } from '@/services/firestore';
import { Skeleton } from '@/components/ui/skeleton';
import { Textarea } from '@/components/ui/textarea';

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
  
  const handleInputChange = (field: keyof HeroContent, value: string) => {
     if (heroContent) {
      setHeroContent({ ...heroContent, [field]: value });
    }
  }

  const handleSlideChange = (index: number, value: string) => {
    if (heroContent) {
      const newSlides = [...heroContent.slides];
      const type = value.match(/\.(mp4|webm|ogg)$/) ? 'video' : 'image';
      newSlides[index] = { ...newSlides[index], url: value, type };
      setHeroContent({ ...heroContent, slides: newSlides });
    }
  };

  const handleServiceChange = (index: number, field: keyof HomepageService, value: string) => {
    if (heroContent) {
        const newServices = [...heroContent.services];
        newServices[index] = { ...newServices[index], [field]: value };
        setHeroContent({ ...heroContent, services: newServices });
    }
  };

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
            <CardTitle>Hero Section Title</CardTitle>
            <CardDescription>Update the main title for the hero section.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
                <Label htmlFor="heroTitle">Title</Label>
                <Input id="heroTitle" value={heroContent?.title || ''} onChange={(e) => handleInputChange('title', e.target.value)} />
            </div>
          </CardContent>
        </Card>
        
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
                    <Input id="buttonText" value={heroContent?.buttonText || ''} onChange={(e) => handleInputChange('buttonText', e.target.value)} />
                 </div>
                 <div className="space-y-2">
                    <Label htmlFor="buttonLink">Button Link</Label>
                    <Input id="buttonLink" value={heroContent?.buttonLink || ''} onChange={(e) => handleInputChange('buttonLink', e.target.value)} />
                 </div>
            </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Homepage Services</CardTitle>
            <CardDescription>Update the content for the services section on the homepage.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {heroContent?.services.map((service, index) => (
              <Card key={index} className="p-4 space-y-4">
                 <h4 className="text-lg font-semibold">Service Card {index + 1}</h4>
                 <div className="space-y-2">
                    <Label htmlFor={`service-title-${index}`}>Title</Label>
                    <Input id={`service-title-${index}`} value={service.title} onChange={(e) => handleServiceChange(index, 'title', e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor={`service-desc-${index}`}>Description</Label>
                    <Textarea id={`service-desc-${index}`} value={service.description} onChange={(e) => handleServiceChange(index, 'description', e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor={`service-image-${index}`}>Image URL</Label>
                    <Input id={`service-image-${index}`} value={service.imageUrl} onChange={(e) => handleServiceChange(index, 'imageUrl', e.target.value)} />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor={`service-aihint-${index}`}>AI Hint</Label>
                    <Input id={`service-aihint-${index}`} value={service.aiHint} onChange={(e) => handleServiceChange(index, 'aiHint', e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor={`service-link-${index}`}>Link</Label>
                    <Input id={`service-link-${index}`} value={service.link} onChange={(e) => handleServiceChange(index, 'link', e.target.value)} />
                </div>
              </Card>
            ))}
          </CardContent>
        </Card>

        <Button type="submit" size="lg">Save All Changes</Button>
      </form>
    </div>
  );
}
