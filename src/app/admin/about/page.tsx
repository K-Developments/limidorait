
"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { updateAboutContent, AboutContent, uploadImageAndGetURL, getClientAboutContent } from '@/services/firestore';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';
import { Sidebar } from '@/components/layout/admin-sidebar';
import { cn } from '@/lib/utils';

function AdminDashboard() {
  const { toast } = useToast();
  const [aboutContent, setAboutContent] = useState<AboutContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const content = await getClientAboutContent();
        setAboutContent(content);
      } catch (error) {
        console.error("Failed to fetch about content:", error);
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

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    if (aboutContent) {
        setAboutContent({ ...aboutContent, [name]: value });
    }
  };
  
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && aboutContent) {
        const file = e.target.files[0];
        setIsUploading(true);
        try {
            const { url } = await uploadImageAndGetURL(file);
            setAboutContent({ ...aboutContent, heroImageUrl: url });
            toast({
                title: "Success!",
                description: "Image uploaded successfully. Click 'Save All Changes' to apply.",
            });
        } catch (error) {
            toast({
                title: "Upload Error",
                description: `Failed to upload image. Please try again.`,
                variant: "destructive",
            });
        } finally {
            setIsUploading(false);
        }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aboutContent) return;

    try {
      await updateAboutContent(aboutContent);
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
        <h1 className="text-3xl font-medium">About Page Management</h1>
        {[...Array(2)].map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-8 w-1/2" />
              <Skeleton className="h-4 w-3/4" />
            </CardHeader>
            <CardContent className="space-y-6">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-10 w-24" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-medium">About Page Management</h1>
      <form onSubmit={handleSubmit} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>About Page Hero Section</CardTitle>
            <CardDescription>Update the title, subtitle, and background image for the About page hero.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="heroTitle">Hero Title</Label>
              <Input
                id="heroTitle"
                name="heroTitle"
                value={aboutContent?.heroTitle || ''}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="heroSubtitle">Hero Subtitle</Label>
              <Textarea
                id="heroSubtitle"
                name="heroSubtitle"
                value={aboutContent?.heroSubtitle || ''}
                onChange={handleInputChange}
                className="min-h-[100px]"
              />
            </div>
            <div className="space-y-2">
                <Label>Current Hero Image</Label>
                <div className="relative group w-full aspect-video">
                  <Image src={aboutContent?.heroImageUrl || 'https://placehold.co/1600x640.png'} alt={aboutContent?.heroTitle || 'About hero image'} layout="fill" className="object-cover rounded-md"/>
                </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor="heroImageUrl">Image URL</Label>
                <Input
                    id="heroImageUrl"
                    name="heroImageUrl"
                    value={aboutContent?.heroImageUrl || ''}
                    onChange={handleInputChange}
                    placeholder="https://example.com/image.png"
                />
            </div>
             <div className="space-y-2">
                <Label htmlFor="hero-image-upload">Or Upload a New Hero Image</Label>
                <Input id="hero-image-upload" type="file" onChange={handleImageUpload} accept="image/*" disabled={isUploading}/>
                {isUploading && <p>Uploading...</p>}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>About Section Content</CardTitle>
            <CardDescription>Update the title and description for the main content area on the About page.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="aboutTitle">Title</Label>
              <Input
                id="aboutTitle"
                name="aboutTitle"
                value={aboutContent?.aboutTitle || ''}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="aboutDescription">Description</Label>
              <Textarea
                id="aboutDescription"
                name="aboutDescription"
                value={aboutContent?.aboutDescription || ''}
                onChange={handleInputChange}
                className="min-h-[150px]"
              />
            </div>
          </CardContent>
        </Card>
        
        <Button type="submit" size="lg">Save All Changes</Button>
      </form>
    </div>
  );
}

export default function AdminAboutPage() {
  const [isSidebarExpanded, setSidebarExpanded] = useState(false);

  const toggleSidebar = () => {
    setSidebarExpanded(!isSidebarExpanded);
  };

  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <Sidebar isExpanded={isSidebarExpanded} toggleSidebar={toggleSidebar} />
      <div
        className={cn(
          "flex flex-col sm:gap-4 sm:py-4 w-full transition-all duration-300 ease-in-out",
          isSidebarExpanded ? "sm:pl-52" : "sm:pl-14"
        )}
      >
        <main className="flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <AdminDashboard />
        </main>
      </div>
    </div>
  );
}
