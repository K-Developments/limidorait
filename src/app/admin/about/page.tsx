
"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { AboutContent, HomepageCtaSection } from '@/services/firestore';
import { Skeleton } from '@/components/ui/skeleton';
import { Sidebar } from '@/components/layout/admin-sidebar';
import { cn } from '@/lib/utils';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const defaultAboutContent: AboutContent = { heroTitle: "Building Brands With Purpose", heroSubtitle: "We are a team of passionate creators, thinkers, and innovators dedicated to building exceptional digital experiences that drive success and inspire change.", aboutTitle: "Our Vision", aboutDescription: "At Limidora, we are always trying to innovate new things with next-level ideas. In this time, everyone needs to touch the technology, and we are making solutions with technology to improve the lives and businesses of our clients." };
const isObject = (item: any) => (item && typeof item === 'object' && !Array.isArray(item));
const deepMerge = (target: any, source: any) => { const output = { ...target }; if (isObject(target) && isObject(source)) { Object.keys(source).forEach(key => { if (isObject(source[key])) { if (!(key in target)) Object.assign(output, { [key]: source[key] }); else output[key] = deepMerge(target[key], source[key]); } else { Object.assign(output, { [key]: source[key] }); } }); } return output; }


const getClientAboutContent = async (): Promise<AboutContent> => {
    const docSnap = await getDoc(doc(db, 'homepage', 'aboutContent'));
    return docSnap.exists() ? deepMerge(defaultAboutContent, docSnap.data()) : defaultAboutContent;
};

const updateAboutContent = async (content: Partial<AboutContent>): Promise<void> => {
  const docRef = doc(db, 'homepage', 'aboutContent');
  await setDoc(docRef, content, { merge: true });
};

function AdminDashboard() {
  const { toast } = useToast();
  const [aboutContent, setAboutContent] = useState<AboutContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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

  const handleCtaSectionChange = (field: keyof HomepageCtaSection, value: string) => {
    if (aboutContent) {
      setAboutContent({ 
        ...aboutContent, 
        ctaSection: { 
            ...(aboutContent.ctaSection || { title: '', description: '', buttonText: '', buttonLink: '' }), 
            [field]: value 
        } 
      });
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
        {[...Array(3)].map((_, i) => (
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
            <CardDescription>Update the title and subtitle for the About page hero.</CardDescription>
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
            <CardTitle>Call to Action Section</CardTitle>
            <CardDescription>Update the content for the CTA section on this page.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="cta-title">Title</Label>
              <Input id="cta-title" value={aboutContent?.ctaSection?.title || ''} onChange={(e) => handleCtaSectionChange('title', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cta-description">Description</Label>
              <Textarea id="cta-description" value={aboutContent?.ctaSection?.description || ''} onChange={(e) => handleCtaSectionChange('description', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cta-button-text">Button Text</Label>
              <Input id="cta-button-text" value={aboutContent?.ctaSection?.buttonText || ''} onChange={(e) => handleCtaSectionChange('buttonText', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cta-button-link">Button Link</Label>
              <Input id="cta-button-link" value={aboutContent?.ctaSection?.buttonLink || ''} onChange={(e) => handleCtaSectionChange('buttonLink', e.target.value)} />
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
