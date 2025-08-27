
"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { TermsOfServiceContent, TermSection } from '@/services/firestore';
import { Skeleton } from '@/components/ui/skeleton';
import { X, PlusCircle } from 'lucide-react';
import { Sidebar } from '@/components/layout/admin-sidebar';
import { cn } from '@/lib/utils';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const defaultTermsOfServiceContent: TermsOfServiceContent = {
  pageTitle: "Terms of Service",
  sections: [
    { id: "1", title: "Agreement to Terms", content: "By using our Services, you agree to be bound by these Terms. If you don’t agree to be bound by these Terms, do not use the Services." },
  ]
};

const isObject = (item: any) => (item && typeof item === 'object' && !Array.isArray(item));
const deepMerge = (target: any, source: any) => {
  const output = { ...target };
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      if (isObject(source[key])) {
        if (!(key in target)) Object.assign(output, { [key]: source[key] });
        else output[key] = deepMerge(target[key], source[key]);
      } else {
        Object.assign(output, { [key]: source[key] });
      }
    });
  }
  return output;
};

const getClientTermsOfServiceContent = async (): Promise<TermsOfServiceContent> => {
    const docSnap = await getDoc(doc(db, 'homepage', 'termsOfServiceContent'));
    const fetchedData = docSnap.exists() ? docSnap.data() : {};
    const merged = deepMerge(defaultTermsOfServiceContent, fetchedData);
    merged.sections = merged.sections.map((section: any, index: number) => ({ ...section, id: section.id || `section-${Date.now()}-${index}` }));
    return merged;
};

const updateTermsOfServiceContent = async (content: Partial<TermsOfServiceContent>): Promise<void> => {
  const docRef = doc(db, 'homepage', 'termsOfServiceContent');
  await setDoc(docRef, content, { merge: true });
};

function AdminDashboard() {
  const { toast } = useToast();
  const [termsContent, setTermsContent] = useState<TermsOfServiceContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const content = await getClientTermsOfServiceContent();
        setTermsContent(content);
      } catch (error) {
        console.error("Failed to fetch content:", error);
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (termsContent) {
      setTermsContent({ ...termsContent, [name]: value });
    }
  };

  const handleSectionChange = (index: number, field: keyof Omit<TermSection, 'id'>, value: string) => {
    if (termsContent) {
      const updatedSections = [...termsContent.sections];
      updatedSections[index] = { ...updatedSections[index], [field]: value };
      setTermsContent({ ...termsContent, sections: updatedSections });
    }
  };

  const addSection = () => {
    if (termsContent) {
      const newId = `section-${Date.now()}`;
      const updatedSections = [...termsContent.sections, { id: newId, title: "New Section Title", content: "New section content." }];
      setTermsContent({ ...termsContent, sections: updatedSections });
    }
  };

  const removeSection = (index: number) => {
    if (termsContent) {
      const updatedSections = termsContent.sections.filter((_, i) => i !== index);
      setTermsContent({ ...termsContent, sections: updatedSections });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!termsContent) return;

    try {
      await updateTermsOfServiceContent(termsContent);
      toast({
        title: "Success!",
        description: "Terms of Service has been updated successfully.",
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
        <h1 className="text-3xl font-medium">Terms of Service Management</h1>
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-medium">Terms of Service Management</h1>
      <form onSubmit={handleSubmit} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Main Title</CardTitle>
            <CardDescription>Set the main title for the Terms of Service page.</CardDescription>
          </CardHeader>
          <CardContent>
            <Label htmlFor="pageTitle">Page Title</Label>
            <Input
              id="pageTitle"
              name="pageTitle"
              value={termsContent?.pageTitle || ''}
              onChange={handleInputChange}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Terms Sections</CardTitle>
            <CardDescription>Add, edit, or remove sections of your terms of service.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {termsContent?.sections.map((section, index) => (
              <Card key={section.id} className="p-4 relative">
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 h-6 w-6"
                  onClick={() => removeSection(index)}
                  aria-label={`Remove section ${index + 1}`}
                >
                  <X className="h-4 w-4" />
                </Button>
                <div className="space-y-2">
                  <Label htmlFor={`section-title-${index}`}>Section Title</Label>
                  <Input
                    id={`section-title-${index}`}
                    value={section.title}
                    onChange={(e) => handleSectionChange(index, 'title', e.target.value)}
                  />
                </div>
                <div className="space-y-2 mt-2">
                  <Label htmlFor={`section-content-${index}`}>Content</Label>
                  <Textarea
                    id={`section-content-${index}`}
                    value={section.content}
                    onChange={(e) => handleSectionChange(index, 'content', e.target.value)}
                    className="min-h-[120px]"
                  />
                </div>
              </Card>
            ))}
            <Button type="button" variant="outline" onClick={addSection}>
              <PlusCircle className="mr-2 h-4 w-4" /> Add Section
            </Button>
          </CardContent>
        </Card>
        
        <Button type="submit" size="lg">Save All Changes</Button>
      </form>
    </div>
  );
}

export default function AdminTermsOfServicePage() {
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
