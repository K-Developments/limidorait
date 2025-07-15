
"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { getAboutContent, updateAboutContent, AboutContent, uploadImageAndGetURL } from '@/services/firestore';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';

export default function AdminAboutPage() {
  const { toast } = useToast();
  const [aboutContent, setAboutContent] = useState<AboutContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const content = await getAboutContent();
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
        const updatedContent = { ...aboutContent, heroImageUrl: url };
        setAboutContent(updatedContent);
        
        toast({
            title: "Success!",
            description: "Image uploaded successfully. Click 'Save All Changes' to apply.",
        });
      } catch (error) {
        toast({
          title: "Upload Error",
          description: "Failed to upload image. Please try again.",
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
        <h1 className="text-3xl font-bold">About Page Management</h1>
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-1/2" />
            <Skeleton className="h-4 w-3/4" />
          </CardHeader>
          <CardContent className="space-y-6">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-10 w-24" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-1/2" />
            <Skeleton className="h-4 w-3/4" />
          </CardHeader>
          <CardContent className="space-y-6">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-24 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">About Page Management</h1>
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
                  <Image src={aboutContent?.heroImageUrl || 'https://placehold.co/1600x640.png'} alt="About hero image" layout="fill" className="object-cover rounded-md"/>
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
                <Label htmlFor="image-upload">Or Upload a New Hero Image</Label>
                <Input id="image-upload" type="file" onChange={handleImageUpload} accept="image/*" disabled={isUploading}/>
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
