
"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { PrivacyPolicyContent, PolicySection } from '@/services/firestore';
import { Skeleton } from '@/components/ui/skeleton';
import { X, PlusCircle } from 'lucide-react';
import { Sidebar } from '@/components/layout/admin-sidebar';
import { cn } from '@/lib/utils';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const defaultPrivacyPolicyContent: PrivacyPolicyContent = {
  pageTitle: "Privacy Policy",
  sections: [
    { id: "1", title: "Introduction", content: "Welcome to Limidora Digital. We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website." },
    { id: "2", title: "Collection of Your Information", content: "We may collect information about you in a variety of ways, including personally identifiable information that you voluntarily give to us when you register or participate in activities on the Site." },
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

const getClientPrivacyPolicyContent = async (): Promise<PrivacyPolicyContent> => {
    const docSnap = await getDoc(doc(db, 'homepage', 'privacyPolicyContent'));
    const fetchedData = docSnap.exists() ? docSnap.data() : {};
    const merged = deepMerge(defaultPrivacyPolicyContent, fetchedData);
    merged.sections = merged.sections.map((section: any, index: number) => ({ ...section, id: section.id || `section-${Date.now()}-${index}` }));
    return merged;
};

const updatePrivacyPolicyContent = async (content: Partial<PrivacyPolicyContent>): Promise<void> => {
  const docRef = doc(db, 'homepage', 'privacyPolicyContent');
  await setDoc(docRef, content, { merge: true });
};

function AdminDashboard() {
  const { toast } = useToast();
  const [policyContent, setPolicyContent] = useState<PrivacyPolicyContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const content = await getClientPrivacyPolicyContent();
        setPolicyContent(content);
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
    if (policyContent) {
      setPolicyContent({ ...policyContent, [name]: value });
    }
  };

  const handleSectionChange = (index: number, field: keyof Omit<PolicySection, 'id'>, value: string) => {
    if (policyContent) {
      const updatedSections = [...policyContent.sections];
      updatedSections[index] = { ...updatedSections[index], [field]: value };
      setPolicyContent({ ...policyContent, sections: updatedSections });
    }
  };

  const addSection = () => {
    if (policyContent) {
      const newId = `section-${Date.now()}`;
      const updatedSections = [...policyContent.sections, { id: newId, title: "New Section Title", content: "New section content." }];
      setPolicyContent({ ...policyContent, sections: updatedSections });
    }
  };

  const removeSection = (index: number) => {
    if (policyContent) {
      const updatedSections = policyContent.sections.filter((_, i) => i !== index);
      setPolicyContent({ ...policyContent, sections: updatedSections });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!policyContent) return;

    try {
      await updatePrivacyPolicyContent(policyContent);
      toast({
        title: "Success!",
        description: "Privacy Policy has been updated successfully.",
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
        <h1 className="text-3xl font-medium">Privacy Policy Management</h1>
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-medium">Privacy Policy Management</h1>
      <form onSubmit={handleSubmit} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Main Title</CardTitle>
            <CardDescription>Set the main title for the privacy policy page.</CardDescription>
          </CardHeader>
          <CardContent>
            <Label htmlFor="pageTitle">Page Title</Label>
            <Input
              id="pageTitle"
              name="pageTitle"
              value={policyContent?.pageTitle || ''}
              onChange={handleInputChange}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Policy Sections</CardTitle>
            <CardDescription>Add, edit, or remove sections of your privacy policy.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {policyContent?.sections.map((section, index) => (
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

export default function AdminPrivacyPolicyPage() {
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
