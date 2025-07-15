
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
  const [isUploadingHero, setIsUploadingHero] = useState(false);
  const [isUploadingConcepts, setIsUploadingConcepts] = useState(false);
  const [isUploadingWorkflow, setIsUploadingWorkflow] = useState(false);

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

  const handleHeroImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && aboutContent) {
      const file = e.target.files[0];
      setIsUploadingHero(true);
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
          description: "Failed to upload hero image. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsUploadingHero(false);
      }
    }
  };

  const handleConceptsImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && aboutContent) {
      const file = e.target.files[0];
      setIsUploadingConcepts(true);
      try {
        const { url } = await uploadImageAndGetURL(file);
        setAboutContent({ ...aboutContent, conceptsImageUrl: url });
        toast({
            title: "Success!",
            description: "Image uploaded successfully. Click 'Save All Changes' to apply.",
        });
      } catch (error) {
        toast({
          title: "Upload Error",
          description: "Failed to upload concepts image. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsUploadingConcepts(false);
      }
    }
  };

  const handleWorkflowImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && aboutContent) {
      const file = e.target.files[0];
      setIsUploadingWorkflow(true);
      try {
        const { url } = await uploadImageAndGetURL(file);
        setAboutContent({ ...aboutContent, workflowImageUrl: url });
        toast({
            title: "Success!",
            description: "Image uploaded successfully. Click 'Save All Changes' to apply.",
        });
      } catch (error) {
        toast({
          title: "Upload Error",
          description: "Failed to upload workflow image. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsUploadingWorkflow(false);
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
                <Label htmlFor="hero-image-upload">Or Upload a New Hero Image</Label>
                <Input id="hero-image-upload" type="file" onChange={handleHeroImageUpload} accept="image/*" disabled={isUploadingHero}/>
                {isUploadingHero && <p>Uploading...</p>}
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

        <Card>
          <CardHeader>
            <CardTitle>Limidora Concepts Section</CardTitle>
            <CardDescription>Update the content for the 'Concepts' section on the About page.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="conceptsTitle">Concepts Title</Label>
              <Input
                id="conceptsTitle"
                name="conceptsTitle"
                value={aboutContent?.conceptsTitle || ''}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="conceptsDescription">Concepts Description</Label>
              <Textarea
                id="conceptsDescription"
                name="conceptsDescription"
                value={aboutContent?.conceptsDescription || ''}
                onChange={handleInputChange}
                className="min-h-[150px]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="conceptsLink">Concepts Link</Label>
              <Input
                id="conceptsLink"
                name="conceptsLink"
                value={aboutContent?.conceptsLink || ''}
                onChange={handleInputChange}
                placeholder="/portfolio"
              />
            </div>
            <div className="space-y-2">
                <Label>Current Concepts Image</Label>
                <div className="relative group w-full max-w-sm aspect-square">
                  <Image src={aboutContent?.conceptsImageUrl || 'https://placehold.co/400x400.png'} alt="Limidora concepts image" layout="fill" className="object-cover rounded-md"/>
                </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor="conceptsImageUrl">Image URL</Label>
                <Input
                    id="conceptsImageUrl"
                    name="conceptsImageUrl"
                    value={aboutContent?.conceptsImageUrl || ''}
                    onChange={handleInputChange}
                    placeholder="https://example.com/image.png"
                />
            </div>
             <div className="space-y-2">
                <Label htmlFor="concepts-image-upload">Or Upload a New Concepts Image</Label>
                <Input id="concepts-image-upload" type="file" onChange={handleConceptsImageUpload} accept="image/*" disabled={isUploadingConcepts}/>
                {isUploadingConcepts && <p>Uploading...</p>}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Our Workflow Section</CardTitle>
            <CardDescription>Update the content for the 'Workflow' section on the About page.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="workflowTitle">Workflow Title</Label>
              <Input
                id="workflowTitle"
                name="workflowTitle"
                value={aboutContent?.workflowTitle || ''}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="workflowDescription">Workflow Description</Label>
              <Textarea
                id="workflowDescription"
                name="workflowDescription"
                value={aboutContent?.workflowDescription || ''}
                onChange={handleInputChange}
                className="min-h-[150px]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="workflowLink">Workflow Link</Label>
              <Input
                id="workflowLink"
                name="workflowLink"
                value={aboutContent?.workflowLink || ''}
                onChange={handleInputChange}
                placeholder="/contact"
              />
            </div>
            <div className="space-y-2">
                <Label>Current Workflow Image</Label>
                <div className="relative group w-full max-w-sm aspect-square">
                  <Image src={aboutContent?.workflowImageUrl || 'https://placehold.co/400x400.png'} alt="Our workflow image" layout="fill" className="object-cover rounded-md"/>
                </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor="workflowImageUrl">Image URL</Label>
                <Input
                    id="workflowImageUrl"
                    name="workflowImageUrl"
                    value={aboutContent?.workflowImageUrl || ''}
                    onChange={handleInputChange}
                    placeholder="https://example.com/image.png"
                />
            </div>
             <div className="space-y-2">
                <Label htmlFor="workflow-image-upload">Or Upload a New Workflow Image</Label>
                <Input id="workflow-image-upload" type="file" onChange={handleWorkflowImageUpload} accept="image/*" disabled={isUploadingWorkflow}/>
                {isUploadingWorkflow && <p>Uploading...</p>}
            </div>
          </CardContent>
        </Card>

        <Button type="submit" size="lg">Save All Changes</Button>
      </form>
    </div>
  );
}
