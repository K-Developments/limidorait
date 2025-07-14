
"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export default function AdminPage() {
  const { toast } = useToast();
  // In a real app, you'd fetch this from your CMS/database
  const [heroTitle, setHeroTitle] = useState("We Create Digital Experiences That Matter");
  const [heroSubtitle, setHeroSubtitle] = useState("Award-winning creative agency focused on branding, web design and development");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the updated data to your backend/API
    console.log("Updated Hero Content:", { heroTitle, heroSubtitle });
    toast({
      title: "Success!",
      description: "Hero section content has been updated.",
    });
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-28">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Content Management</h1>

        <Card>
          <CardHeader>
            <CardTitle>Home Page Hero Section</CardTitle>
            <CardDescription>Update the title and subtitle for the main hero section.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="heroTitle">Hero Title</Label>
                <Textarea
                  id="heroTitle"
                  value={heroTitle}
                  onChange={(e) => setHeroTitle(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="heroSubtitle">Hero Subtitle</Label>
                <Textarea
                  id="heroSubtitle"
                  value={heroSubtitle}
                  onChange={(e) => setHeroSubtitle(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
              <Button type="submit">Save Changes</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
