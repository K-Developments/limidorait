
"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { AboutContent, HomepageCtaSection, WhyUsCard, WhyUsSection, WorkProcessStep } from '@/services/firestore';
import { Skeleton } from '@/components/ui/skeleton';
import { Sidebar } from '@/components/layout/admin-sidebar';
import { cn } from '@/lib/utils';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { PlusCircle, Trash2 } from 'lucide-react';

const defaultAboutContent: AboutContent = { heroTitle: "Building Brands With Purpose", heroSubtitle: "We are a team of passionate creators, thinkers, and innovators dedicated to building exceptional digital experiences that drive success and inspire change.", aboutTitle: "Our Vision", aboutDescription: "At Limidora, we are always trying to innovate new things with next-level ideas. In this time, everyone needs to touch the technology, and we are making solutions with technology to improve the lives and businesses of our clients.", whyUsSection: { title: "Our Core Values", subtitle: "We are defined by our commitment to excellence, innovation, and our clients' success.", cards: [ { id: "1", iconUrl: "", title: "Innovative Solutions", description: "We leverage the latest technologies to build cutting-edge solutions that give you a competitive edge." }, { id: "2", iconUrl: "", title: "Client-Centric Approach", description: "Your success is our priority. We work closely with you to understand your needs and deliver tailored results." }, { id: "3", iconUrl: "", title: "Quality & Reliability", description: "We are committed to delivering high-quality, reliable, and scalable solutions that stand the test of time." }, ] }, workProcessSection: [ { id: "1", iconUrl: "", title: "1. Discovery & Strategy", description: "We start by understanding your goals, audience, and challenges to create a tailored roadmap for success." }, { id: "2", iconUrl: "", title: "2. Design & Prototyping", description: "Our team designs intuitive UI/UX and creates interactive prototypes to visualize the end product." }, { id: "3", iconUrl: "", title: "3. Development & Testing", description: "We write clean, efficient code and rigorously test every feature to ensure a flawless final product." }, { id: "4", iconUrl: "", title: "4. Launch & Optimization", description: "After a successful launch, we monitor performance and provide ongoing support to ensure continued growth." } ] };
const isObject = (item: any) => (item && typeof item === 'object' && !Array.isArray(item));
const deepMerge = (target: any, source: any) => { const output = { ...target }; if (isObject(target) && isObject(source)) { Object.keys(source).forEach(key => { if (isObject(source[key])) { if (!(key in target)) Object.assign(output, { [key]: source[key] }); else output[key] = deepMerge(target[key], source[key]); } else { Object.assign(output, { [key]: source[key] }); } }); } return output; }


const getClientAboutContent = async (): Promise<AboutContent> => {
    const docSnap = await getDoc(doc(db, 'homepage', 'aboutContent'));
    const fetchedData = docSnap.exists() ? docSnap.data() : {};
    const merged = deepMerge(defaultAboutContent, fetchedData);
    if (merged.whyUsSection) {
        merged.whyUsSection.cards = (merged.whyUsSection.cards || []).map((card: any, index: number) => ({ ...card, id: card.id || `why-us-${Date.now()}-${index}` }));
    }
    if (merged.workProcessSection) {
        merged.workProcessSection = (merged.workProcessSection || []).map((step: any, index: number) => ({ ...step, id: step.id || `work-step-${Date.now()}-${index}` }));
    }
    return merged;
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

  const handleWhyUsChange = (field: keyof WhyUsSection, value: string) => {
    if (aboutContent) {
        setAboutContent({
            ...aboutContent,
            whyUsSection: {
                ...(aboutContent.whyUsSection || { title: '', subtitle: '', cards: [] }),
                [field]: value
            }
        });
    }
  };

  const handleWhyUsCardChange = (index: number, field: keyof Omit<WhyUsCard, 'id'>, value: string) => {
    if (aboutContent?.whyUsSection) {
        const updatedCards = [...aboutContent.whyUsSection.cards];
        updatedCards[index] = { ...updatedCards[index], [field]: value };
        setAboutContent({
            ...aboutContent,
            whyUsSection: {
                ...aboutContent.whyUsSection,
                cards: updatedCards
            }
        });
    }
  };

  const addWhyUsCard = () => {
    if (aboutContent?.whyUsSection) {
        const newCard: WhyUsCard = { id: `why-us-${Date.now()}`, iconUrl: '', title: 'New Feature', description: 'Briefly describe this feature.' };
        const updatedCards = [...aboutContent.whyUsSection.cards, newCard];
        setAboutContent({
            ...aboutContent,
            whyUsSection: {
                ...aboutContent.whyUsSection,
                cards: updatedCards
            }
        });
    }
  };

  const removeWhyUsCard = (index: number) => {
    if (aboutContent?.whyUsSection) {
        const updatedCards = aboutContent.whyUsSection.cards.filter((_, i) => i !== index);
        setAboutContent({
            ...aboutContent,
            whyUsSection: {
                ...aboutContent.whyUsSection,
                cards: updatedCards
            }
        });
    }
  };

  const handleWorkStepChange = (index: number, field: keyof Omit<WorkProcessStep, 'id'>, value: string) => {
    if (aboutContent?.workProcessSection) {
        const updatedSteps = [...aboutContent.workProcessSection];
        updatedSteps[index] = { ...updatedSteps[index], [field]: value };
        setAboutContent({
            ...aboutContent,
            workProcessSection: updatedSteps
        });
    }
  };

  const addWorkStep = () => {
    if (aboutContent) {
        const newStep: WorkProcessStep = { id: `work-step-${Date.now()}`, iconUrl: '', title: 'New Step', description: 'Briefly describe this step.' };
        const updatedSteps = [...(aboutContent.workProcessSection || []), newStep];
        setAboutContent({
            ...aboutContent,
            workProcessSection: updatedSteps
        });
    }
  };

  const removeWorkStep = (index: number) => {
    if (aboutContent?.workProcessSection) {
        const updatedSteps = aboutContent.workProcessSection.filter((_, i) => i !== index);
        setAboutContent({
            ...aboutContent,
            workProcessSection: updatedSteps
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
        <h1 className="text-3xl font-semibold">About Page Management</h1>
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
      <h1 className="text-3xl font-semibold">About Page Management</h1>
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
                <CardTitle>Why Us Section</CardTitle>
                <CardDescription>Manage the content for the 'Why Us' section.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="whyUsTitle">Section Title</Label>
                    <Input id="whyUsTitle" value={aboutContent?.whyUsSection?.title || ''} onChange={(e) => handleWhyUsChange('title', e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="whyUsSubtitle">Section Subtitle</Label>
                    <Textarea id="whyUsSubtitle" value={aboutContent?.whyUsSection?.subtitle || ''} onChange={(e) => handleWhyUsChange('subtitle', e.target.value)} />
                </div>

                <div className="space-y-4">
                    <Label>Feature Cards</Label>
                    {aboutContent?.whyUsSection?.cards.map((card, index) => (
                        <Card key={card.id} className="p-4 relative">
                            <Button type="button" variant="destructive" size="icon" className="absolute top-2 right-2 h-6 w-6" onClick={() => removeWhyUsCard(index)}>
                                <Trash2 className="h-4 w-4" />
                            </Button>
                            <div className="space-y-2">
                                <Label htmlFor={`why-us-card-title-${index}`}>Card Title</Label>
                                <Input id={`why-us-card-title-${index}`} value={card.title} onChange={(e) => handleWhyUsCardChange(index, 'title', e.target.value)} />
                            </div>
                            <div className="space-y-2 mt-2">
                                <Label htmlFor={`why-us-card-desc-${index}`}>Card Description</Label>
                                <Textarea id={`why-us-card-desc-${index}`} value={card.description} onChange={(e) => handleWhyUsCardChange(index, 'description', e.target.value)} />
                            </div>
                            <div className="space-y-2 mt-2">
                                <Label htmlFor={`why-us-card-icon-${index}`}>Icon URL (SVG/PNG)</Label>
                                <Input id={`why-us-card-icon-${index}`} value={card.iconUrl} onChange={(e) => handleWhyUsCardChange(index, 'iconUrl', e.target.value)} placeholder="https://example.com/icon.svg" />
                            </div>
                        </Card>
                    ))}
                    <Button type="button" variant="outline" onClick={addWhyUsCard}>
                        <PlusCircle className="mr-2 h-4 w-4" /> Add Card
                    </Button>
                </div>
            </CardContent>
        </Card>
        
        <Card>
            <CardHeader>
                <CardTitle>Work Process Section</CardTitle>
                <CardDescription>Manage the steps in the work process section.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                 <div className="space-y-4">
                    <Label>Process Steps</Label>
                    {aboutContent?.workProcessSection?.map((step, index) => (
                        <Card key={step.id} className="p-4 relative">
                            <Button type="button" variant="destructive" size="icon" className="absolute top-2 right-2 h-6 w-6" onClick={() => removeWorkStep(index)}>
                                <Trash2 className="h-4 w-4" />
                            </Button>
                            <div className="space-y-2">
                                <Label htmlFor={`work-step-title-${index}`}>Step Title</Label>
                                <Input id={`work-step-title-${index}`} value={step.title} onChange={(e) => handleWorkStepChange(index, 'title', e.target.value)} />
                            </div>
                            <div className="space-y-2 mt-2">
                                <Label htmlFor={`work-step-desc-${index}`}>Step Description</Label>
                                <Textarea id={`work-step-desc-${index}`} value={step.description} onChange={(e) => handleWorkStepChange(index, 'description', e.target.value)} />
                            </div>
                            <div className="space-y-2 mt-2">
                                <Label htmlFor={`work-step-icon-${index}`}>Icon URL (SVG/PNG)</Label>
                                <Input id={`work-step-icon-${index}`} value={step.iconUrl} onChange={(e) => handleWorkStepChange(index, 'iconUrl', e.target.value)} placeholder="https://example.com/icon.svg" />
                            </div>
                        </Card>
                    ))}
                    <Button type="button" variant="outline" onClick={addWorkStep}>
                        <PlusCircle className="mr-2 h-4 w-4" /> Add Step
                    </Button>
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
