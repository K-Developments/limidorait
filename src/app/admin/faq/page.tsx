
"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { FaqContent, FaqItem, HomepageCtaSection } from '@/services/firestore';
import { Skeleton } from '@/components/ui/skeleton';
import { X, PlusCircle } from 'lucide-react';
import { Sidebar } from '@/components/layout/admin-sidebar';
import { cn } from '@/lib/utils';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';


const defaultFaqContent: FaqContent = { heroTitle: "Help Center", heroSubtitle: "Your questions, answered. Find the information you need about our services.", title: "Frequently Asked Questions", description: "Find answers to common questions about our services, processes, and how we can help your business succeed.", faqs: [] };
const isObject = (item: any) => (item && typeof item === 'object' && !Array.isArray(item));
const deepMerge = (target: any, source: any) => { const output = { ...target }; if (isObject(target) && isObject(source)) { Object.keys(source).forEach(key => { if (isObject(source[key])) { if (!(key in target)) Object.assign(output, { [key]: source[key] }); else output[key] = deepMerge(target[key], source[key]); } else { Object.assign(output, { [key]: source[key] }); } }); } return output; }

const getClientFaqContent = async (): Promise<FaqContent> => {
    const docSnap = await getDoc(doc(db, 'homepage', 'faqContent'));
    const fetchedData = docSnap.exists() ? docSnap.data() : {};
    const merged = deepMerge(defaultFaqContent, fetchedData);
    merged.faqs = merged.faqs.map((faq: any, index: number) => ({ ...faq, id: faq.id || `faq-${Date.now()}-${index}` }));
    return merged;
};

const updateFaqContent = async (content: Partial<FaqContent>): Promise<void> => {
  const docRef = doc(db, 'homepage', 'faqContent');
  await setDoc(docRef, content, { merge: true });
};


function AdminDashboard() {
  const { toast } = useToast();
  const [faqContent, setFaqContent] = useState<FaqContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchContent = async () => {
    setIsLoading(true);
    try {
      const content = await getClientFaqContent();
      setFaqContent(content);
    } catch (error) {
      console.error("Failed to fetch FAQ content:", error);
      toast({
        title: "Error",
        description: "Failed to load content from the database.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (faqContent) {
      setFaqContent({ ...faqContent, [name]: value });
    }
  };

  const handleCtaSectionChange = (field: keyof HomepageCtaSection, value: string) => {
    if (faqContent) {
      setFaqContent({ 
        ...faqContent, 
        ctaSection: { 
            ...(faqContent.ctaSection || { title: '', description: '', buttonText: '', buttonLink: '' }), 
            [field]: value 
        } 
      });
    }
  };

  const handleFaqChange = (index: number, field: keyof FaqItem, value: string) => {
    if (faqContent) {
      const updatedFaqs = [...faqContent.faqs];
      updatedFaqs[index] = { ...updatedFaqs[index], [field]: value };
      setFaqContent({ ...faqContent, faqs: updatedFaqs });
    }
  };

  const addFaqItem = () => {
    if (faqContent) {
      const newFaqId = `faq-${Date.now()}`;
      const newFaqs = [...faqContent.faqs, { id: newFaqId, question: "New Question", answer: "New Answer", category: "General" }];
      setFaqContent({ ...faqContent, faqs: newFaqs });
    }
  };

  const removeFaqItem = (index: number) => {
    if (faqContent) {
      const updatedFaqs = faqContent.faqs.filter((_, i) => i !== index);
      setFaqContent({ ...faqContent, faqs: updatedFaqs });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!faqContent) return;

    try {
      await updateFaqContent(faqContent);
      toast({
        title: "Success!",
        description: "FAQ content has been updated successfully.",
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
        <h1 className="text-3xl font-medium">FAQ Page Management</h1>
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-48 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-medium">FAQ Page Management</h1>
      <form onSubmit={handleSubmit} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>FAQ Page Hero Section</CardTitle>
            <CardDescription>Update the title and subtitle for the FAQ page hero.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="heroTitle">Hero Title</Label>
              <Input id="heroTitle" name="heroTitle" value={faqContent?.heroTitle || ''} onChange={handleInputChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="heroSubtitle">Hero Subtitle</Label>
              <Textarea id="heroSubtitle" name="heroSubtitle" value={faqContent?.heroSubtitle || ''} onChange={handleInputChange} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>FAQ Section</CardTitle>
            <CardDescription>Update the main title and description for the FAQ section.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" value={faqContent?.title || ''} onChange={handleInputChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" value={faqContent?.description || ''} onChange={handleInputChange} className="min-h-[100px]" />
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
              <Input id="cta-title" value={faqContent?.ctaSection?.title || ''} onChange={(e) => handleCtaSectionChange('title', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cta-description">Description</Label>
              <Textarea id="cta-description" value={faqContent?.ctaSection?.description || ''} onChange={(e) => handleCtaSectionChange('description', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cta-button-text">Button Text</Label>
              <Input id="cta-button-text" value={faqContent?.ctaSection?.buttonText || ''} onChange={(e) => handleCtaSectionChange('buttonText', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cta-button-link">Button Link</Label>
              <Input id="cta-button-link" value={faqContent?.ctaSection?.buttonLink || ''} onChange={(e) => handleCtaSectionChange('buttonLink', e.target.value)} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Questions &amp; Answers</CardTitle>
            <CardDescription>Add, edit, or remove FAQ items.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {faqContent?.faqs.map((faq, index) => (
              <Card key={faq.id} className="p-4 relative">
                <Button variant="destructive" size="icon" className="absolute top-2 right-2 h-6 w-6" onClick={() => removeFaqItem(index)} aria-label={`Remove FAQ item ${index + 1}`}>
                  <X className="h-4 w-4" />
                </Button>
                <div className="space-y-2">
                  <Label htmlFor={`question-${index}`}>Question</Label>
                  <Input id={`question-${index}`} value={faq.question} onChange={(e) => handleFaqChange(index, 'question', e.target.value)} />
                </div>
                 <div className="space-y-2 mt-2">
                  <Label htmlFor={`category-${index}`}>Category</Label>
                  <Input id={`category-${index}`} value={faq.category} onChange={(e) => handleFaqChange(index, 'category', e.target.value)} />
                </div>
                <div className="space-y-2 mt-2">
                  <Label htmlFor={`answer-${index}`}>Answer</Label>
                  <Textarea id={`answer-${index}`} value={faq.answer} onChange={(e) => handleFaqChange(index, 'answer', e.target.value)} className="min-h-[100px]" />
                </div>
              </Card>
            ))}
            <Button type="button" variant="outline" onClick={addFaqItem}>
              <PlusCircle className="mr-2 h-4 w-4" /> Add FAQ Item
            </Button>
          </CardContent>
        </Card>

        <Button type="submit" size="lg">Save All Changes</Button>
      </form>
    </div>
  );
}


export default function AdminFaqPage() {
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
