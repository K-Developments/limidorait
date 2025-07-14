
"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { getHeroContent, updateHeroContent, HeroContent, uploadImageAndGetURL, ServiceSlide } from '@/services/firestore';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';
import { X, PlusCircle } from 'lucide-react';

export default function AdminHomePage() {
  const { toast } = useToast();
  const [heroContent, setHeroContent] = useState<HeroContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [newImageUrl, setNewImageUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);

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

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    if (heroContent) {
      setHeroContent({ ...heroContent, [name]: value });
    }
  };
  
  const handleAddImageUrl = () => {
    if (newImageUrl && heroContent) {
      const updatedUrls = [...(heroContent.imageUrls || []), newImageUrl];
      setHeroContent({ ...heroContent, imageUrls: updatedUrls });
      setNewImageUrl('');
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && heroContent) {
      const file = e.target.files[0];
      setIsUploading(true);
      try {
        const url = await uploadImageAndGetURL(file);
        const updatedUrls = [...(heroContent.imageUrls || []), url];
        setHeroContent({ ...heroContent, imageUrls: updatedUrls });
        toast({
            title: "Success!",
            description: "Image uploaded successfully.",
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

  const handleRemoveImage = (index: number) => {
    if (heroContent) {
      const updatedUrls = heroContent.imageUrls.filter((_, i) => i !== index);
      setHeroContent({ ...heroContent, imageUrls: updatedUrls });
    }
  };

  const handleServiceSlideChange = (index: number, field: keyof ServiceSlide, value: string) => {
    if (heroContent) {
      const updatedSlides = [...heroContent.serviceSlides];
      updatedSlides[index] = { ...updatedSlides[index], [field]: value };
      setHeroContent({ ...heroContent, serviceSlides: updatedSlides });
    }
  };
  
  const handleServiceSlideImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    if (e.target.files && e.target.files[0] && heroContent) {
      const file = e.target.files[0];
      setIsUploading(true);
      try {
        const url = await uploadImageAndGetURL(file);
        handleServiceSlideChange(index, 'image', url);
        toast({
          title: "Success!",
          description: "Service slide image uploaded successfully.",
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

  const handleRemoveServiceSlide = (index: number) => {
    if (heroContent) {
      const updatedSlides = heroContent.serviceSlides.filter((_, i) => i !== index);
      setHeroContent({ ...heroContent, serviceSlides: updatedSlides });
    }
  };

  const handleAddServiceSlide = () => {
    if (heroContent) {
      const newSlide: ServiceSlide = { text: "New Service", image: "https://placehold.co/400x400.png", hint: "new service" };
      const updatedSlides = [...heroContent.serviceSlides, newSlide];
      setHeroContent({ ...heroContent, serviceSlides: updatedSlides });
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
        <h1 className="text-3xl font-bold">Content Management</h1>
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-1/2" />
            <Skeleton className="h-4 w-3/4" />
          </CardHeader>
          <CardContent className="space-y-6">
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-10 w-24" />
          </CardContent>
        </Card>
         <Card>
          <CardHeader>
            <Skeleton className="h-8 w-1/3" />
             <Skeleton className="h-4 w-1/2" />
          </CardHeader>
          <CardContent className="space-y-4">
             <Skeleton className="h-10 w-full" />
             <div className="grid grid-cols-3 gap-4">
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-32 w-full" />
             </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full space-y-8">
      <h1 className="text-3xl font-bold">Content Management</h1>
      <form onSubmit={handleSubmit} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Home Page Hero Section</CardTitle>
            <CardDescription>Update the title and subtitle for the main hero section.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Hero Title</Label>
              <Textarea
                id="title"
                name="title"
                value={heroContent?.title || ''}
                onChange={handleInputChange}
                className="min-h-[100px]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subtitle">Hero Subtitle</Label>
              <Textarea
                id="subtitle"
                name="subtitle"
                value={heroContent?.subtitle || ''}
                onChange={handleInputChange}
                className="min-h-[100px]"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Hero Images</CardTitle>
            <CardDescription>Manage the images displayed in the main hero section slider.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
                <Label>Current Images</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {(heroContent?.imageUrls || []).map((url, index) => (
                    <div key={index} className="relative group">
                      <Image src={url} alt={`Hero image ${index + 1}`} width={200} height={300} className="object-cover w-full h-auto"/>
                      <Button variant="destructive" size="icon" className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => handleRemoveImage(index)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor="new-image-url">Add Image by URL</Label>
                <div className="flex gap-2">
                    <Input id="new-image-url" value={newImageUrl} onChange={(e) => setNewImageUrl(e.target.value)} placeholder="https://example.com/image.png" />
                    <Button type="button" onClick={handleAddImageUrl}>Add URL</Button>
                </div>
            </div>
             <div className="space-y-2">
                <Label htmlFor="image-upload">Or Upload an Image</Label>
                <Input id="image-upload" type="file" onChange={handleImageUpload} accept="image/*" disabled={isUploading}/>
                {isUploading && <p>Uploading...</p>}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Hero Service Slides</CardTitle>
            <CardDescription>Manage the small square slides at the bottom of the hero image.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(heroContent?.serviceSlides || []).map((slide, index) => (
                <Card key={index} className="relative p-4">
                  <Button variant="destructive" size="icon" className="absolute top-2 right-2 h-6 w-6" onClick={() => handleRemoveServiceSlide(index)}>
                    <X className="h-4 w-4" />
                  </Button>
                  <div className="flex flex-col gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`slide-text-${index}`}>Slide Text</Label>
                      <Input id={`slide-text-${index}`} value={slide.text} onChange={(e) => handleServiceSlideChange(index, 'text', e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label>Slide Image</Label>
                      <Image src={slide.image} alt={slide.text} width={100} height={100} className="object-cover aspect-square" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`slide-image-url-${index}`}>Image URL</Label>
                      <Input id={`slide-image-url-${index}`} value={slide.image} onChange={(e) => handleServiceSlideChange(index, 'image', e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`slide-image-upload-${index}`}>Or Upload New Image</Label>
                      <Input id={`slide-image-upload-${index}`} type="file" onChange={(e) => handleServiceSlideImageUpload(e, index)} accept="image/*" disabled={isUploading} />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            <Button type="button" variant="outline" onClick={handleAddServiceSlide} className="mt-4">
              <PlusCircle className="mr-2 h-4 w-4" /> Add Service Slide
            </Button>
          </CardContent>
        </Card>

        <Button type="submit" size="lg">Save All Changes</Button>
      </form>
    </div>
  );
}
