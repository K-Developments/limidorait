
"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { getClientFaqContent, updateFaqContent, FaqContent, FaqItem, getSubmittedQuestions, SubmittedQuestion, deleteSubmittedQuestion } from '@/services/firestore';
import { Skeleton } from '@/components/ui/skeleton';
import { X, PlusCircle, Trash2 } from 'lucide-react';
import { Sidebar } from '@/components/layout/admin-sidebar';
import { cn } from '@/lib/utils';


function AdminDashboard() {
  const { toast } = useToast();
  const [faqContent, setFaqContent] = useState<FaqContent | null>(null);
  const [submittedQuestions, setSubmittedQuestions] = useState<SubmittedQuestion[]>([]);
  const [newAnswers, setNewAnswers] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchContent = async () => {
    setIsLoading(true);
    try {
      const content = await getClientFaqContent();
      const questions = await getSubmittedQuestions();
      setFaqContent(content);
      setSubmittedQuestions(questions);
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

  const handleFaqChange = (index: number, field: keyof FaqItem, value: string) => {
    if (faqContent) {
      const updatedFaqs = [...faqContent.faqs];
      updatedFaqs[index] = { ...updatedFaqs[index], [field]: value };
      setFaqContent({ ...faqContent, faqs: updatedFaqs });
    }
  };

  const addFaqItem = () => {
    if (faqContent) {
      const newFaqs = [...faqContent.faqs, { question: "New Question", answer: "New Answer" }];
      setFaqContent({ ...faqContent, faqs: newFaqs });
    }
  };

  const removeFaqItem = (index: number) => {
    if (faqContent) {
      const updatedFaqs = faqContent.faqs.filter((_, i) => i !== index);
      setFaqContent({ ...faqContent, faqs: updatedFaqs });
    }
  };

  const handleAddToFaqs = async (question: SubmittedQuestion) => {
    const answer = newAnswers[question.id];
    if (!answer || !faqContent) {
        toast({ title: "Error", description: "Please provide an answer before adding.", variant: "destructive" });
        return;
    }
    const newFaqItem: FaqItem = { question: question.question, answer };
    const updatedFaqs = [...faqContent.faqs, newFaqItem];
    
    try {
        await updateFaqContent({ ...faqContent, faqs: updatedFaqs });
        await handleDeleteSubmitted(question.id); // Remove from submitted questions
        toast({ title: "Success!", description: "FAQ added and updated successfully." });
    } catch (error) {
        toast({ title: "Error", description: "Could not add FAQ.", variant: "destructive" });
    }
  };

  const handleDeleteSubmitted = async (id: string) => {
    try {
        await deleteSubmittedQuestion(id);
        setSubmittedQuestions(prev => prev.filter(q => q.id !== id));
        toast({ title: "Success", description: "Submitted question has been deleted." });
    } catch (error) {
        toast({ title: "Error", description: "Could not delete question.", variant: "destructive" });
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
                <CardTitle>Submitted Questions</CardTitle>
                <CardDescription>Review questions submitted by users, answer them, and add them to the FAQ page.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {submittedQuestions.length > 0 ? (
                    submittedQuestions.map(q => (
                        <Card key={q.id} className="p-4 space-y-3">
                            <div>
                                <p className="text-sm text-muted-foreground">From: {q.email}</p>
                                <p className="font-semibold">{q.question}</p>
                            </div>
                            <Textarea
                                placeholder="Write your answer here..."
                                value={newAnswers[q.id] || ''}
                                onChange={e => setNewAnswers({ ...newAnswers, [q.id]: e.target.value })}
                            />
                            <div className="flex justify-end gap-2">
                                <Button type="button" size="sm" onClick={() => handleAddToFaqs(q)} disabled={!newAnswers[q.id]}>
                                    Add to FAQs
                                </Button>
                                <Button type="button" variant="destructive" size="icon" onClick={() => handleDeleteSubmitted(q.id)} aria-label="Delete submitted question">
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </Card>
                    ))
                ) : (
                    <p className="text-muted-foreground">No new questions have been submitted.</p>
                )}
            </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Questions &amp; Answers</CardTitle>
            <CardDescription>Add, edit, or remove FAQ items.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {faqContent?.faqs.map((faq, index) => (
              <Card key={index} className="p-4 relative">
                <Button variant="destructive" size="icon" className="absolute top-2 right-2 h-6 w-6" onClick={() => removeFaqItem(index)} aria-label={`Remove FAQ item ${index + 1}`}>
                  <X className="h-4 w-4" />
                </Button>
                <div className="space-y-2">
                  <Label htmlFor={`question-${index}`}>Question</Label>
                  <Input id={`question-${index}`} value={faq.question} onChange={(e) => handleFaqChange(index, 'question', e.target.value)} />
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
