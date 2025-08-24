
"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { getContactContent, updateContactContent, ContactContent, getContactSubmissions, ContactSubmission, deleteContactSubmission } from '@/services/firestore';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';
import { Trash2, PlusCircle, X } from 'lucide-react';

export default function AdminContactPage() {
  const { toast } = useToast();
  const [contactContent, setContactContent] = useState<ContactContent | null>(null);
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchContent = async () => {
    setIsLoading(true);
    try {
      const [content, submissionsData] = await Promise.all([
        getContactContent(),
        getContactSubmissions(),
      ]);
      setContactContent(content);
      setSubmissions(submissionsData);
    } catch (error) {
      console.error("Failed to fetch contact content:", error);
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
  }, [toast]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (contactContent) {
      setContactContent({ ...contactContent, [name]: value });
    }
  };

  const handleServiceOptionChange = (index: number, value: string) => {
    if (contactContent) {
      const updatedOptions = [...contactContent.serviceOptions];
      updatedOptions[index] = value;
      setContactContent({ ...contactContent, serviceOptions: updatedOptions });
    }
  };

  const addServiceOption = () => {
    if (contactContent) {
      const updatedOptions = [...contactContent.serviceOptions, "New Service"];
      setContactContent({ ...contactContent, serviceOptions: updatedOptions });
    }
  };

  const removeServiceOption = (index: number) => {
    if (contactContent) {
      const updatedOptions = contactContent.serviceOptions.filter((_, i) => i !== index);
      setContactContent({ ...contactContent, serviceOptions: updatedOptions });
    }
  };
  
  const handleDeleteSubmission = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;
    try {
      await deleteContactSubmission(id);
      setSubmissions(prev => prev.filter(s => s.id !== id));
      toast({
        title: "Success",
        description: "Submission deleted successfully."
      });
    } catch (error) {
       toast({
        title: "Error",
        description: "Could not delete submission.",
        variant: "destructive"
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactContent) return;

    try {
      await updateContactContent(contactContent);
      toast({
        title: "Success!",
        description: "Contact page content has been updated successfully.",
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
        <h1 className="text-3xl font-medium">Contact Page Management</h1>
        <Card>
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
        <Card>
            <CardHeader>
                <Skeleton className="h-8 w-1/3" />
            </CardHeader>
            <CardContent>
                <Skeleton className="h-48 w-full" />
            </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-medium">Contact Page Management</h1>
      <form onSubmit={handleSubmit} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Contact Page Content</CardTitle>
            <CardDescription>Update the title and description for the main content area on the Contact page.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={contactContent?.title || ''}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={contactContent?.description || ''}
                onChange={handleInputChange}
                className="min-h-[150px]"
              />
            </div>
            <p className="text-sm text-muted-foreground">Note: Social media links are managed in the Footer section of the site.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact Form Services</CardTitle>
            <CardDescription>Manage the service options available in the contact form dropdown.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {contactContent?.serviceOptions.map((option, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  value={option}
                  onChange={(e) => handleServiceOptionChange(index, e.target.value)}
                />
                <Button type="button" variant="destructive" size="icon" onClick={() => removeServiceOption(index)} aria-label="Remove service option">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" onClick={addServiceOption}>
              <PlusCircle className="mr-2 h-4 w-4" /> Add Service Option
            </Button>
          </CardContent>
        </Card>
        
        <Button type="submit" size="lg">Save All Changes</Button>
      </form>
      
      <Card>
          <CardHeader>
              <CardTitle>Contact Submissions</CardTitle>
              <CardDescription>View messages submitted through your contact form.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
              {submissions.length > 0 ? (
                  submissions.map(submission => (
                      <Card key={submission.id} className="p-4 space-y-3 relative">
                          <Button
                            variant="destructive"
                            size="icon"
                            className="absolute top-2 right-2 h-7 w-7"
                            onClick={() => handleDeleteSubmission(submission.id)}
                          >
                              <Trash2 className="h-4 w-4" />
                          </Button>
                          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                            <p><span className="font-semibold">From:</span> {submission.name}</p>
                            <p><span className="font-semibold">Email:</span> {submission.email}</p>
                            {submission.phone && <p><span className="font-semibold">Phone:</span> {submission.phone}</p>}
                            <p><span className="font-semibold">Service:</span> {submission.service}</p>
                          </div>
                          <p className="text-base border-t pt-3 mt-3">{submission.message}</p>
                          <p className="text-xs text-muted-foreground">
                            Received: {format(new Date(submission.submittedAt), "PPP p")}
                          </p>
                      </Card>
                  ))
              ) : (
                  <p className="text-muted-foreground text-center py-8">No submissions yet.</p>
              )}
          </CardContent>
      </Card>

    </div>
  );
}

    