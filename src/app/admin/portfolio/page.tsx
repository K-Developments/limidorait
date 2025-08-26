
"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { getClientPortfolioContent, updatePortfolioContent, PortfolioContent, getClientProjects, Project, updateProject, addProject, deleteProject, uploadImageAndGetURL, ClientLogo } from '@/services/firestore';
import { Skeleton } from '@/components/ui/skeleton';
import { PlusCircle, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { Sidebar } from '@/components/layout/admin-sidebar';
import { cn } from '@/lib/utils';

type EditableProject = Omit<Project, 'features' | 'highlights' | 'services'> & {
    features: string;
    highlights: string;
    services: string;
    link: string;
};


function AdminDashboard() {
  const { toast } = useToast();
  const [portfolioContent, setPortfolioContent] = useState<PortfolioContent | null>(null);
  const [projects, setProjects] = useState<EditableProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState<Record<string, boolean>>({});

   const fetchContent = async () => {
    setIsLoading(true);
    try {
      const content = await getClientPortfolioContent();
      const projectData = await getClientProjects();
      setPortfolioContent(content);
      setProjects(projectData.map(p => ({
          ...p,
          features: p.features?.join(', ') || '',
          highlights: p.highlights?.join(', ') || '',
          services: p.services?.join(', ') || '',
          link: `/portfolio/${p.slug}`,
      })));
    } catch (error) {
      console.error("Failed to fetch portfolio content:", error);
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

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    if (portfolioContent) {
        setPortfolioContent({ ...portfolioContent, [name]: value });
    }
  };
  
  const handleClientsSectionChange = (field: keyof PortfolioContent['clientsSection'], value: string) => {
    if (portfolioContent) {
        setPortfolioContent({
            ...portfolioContent,
            clientsSection: {
                ...portfolioContent.clientsSection,
                [field]: value,
            }
        });
    }
  };

  const handleClientLogoChange = (index: number, field: keyof ClientLogo, value: string) => {
      if (portfolioContent) {
          const updatedLogos = [...portfolioContent.clientsSection.logos];
          updatedLogos[index] = { ...updatedLogos[index], [field]: value };
          setPortfolioContent({
              ...portfolioContent,
              clientsSection: {
                  ...portfolioContent.clientsSection,
                  logos: updatedLogos
              }
          });
      }
  };

  const addClientLogo = () => {
      if (portfolioContent) {
          const newLogos = [...portfolioContent.clientsSection.logos, { name: "New Client", logoUrl: "https://placehold.co/144x80.png" }];
          setPortfolioContent({
              ...portfolioContent,
              clientsSection: {
                  ...portfolioContent.clientsSection,
                  logos: newLogos
              }
          });
      }
  };

  const removeClientLogo = (index: number) => {
      if (portfolioContent) {
          const updatedLogos = portfolioContent.clientsSection.logos.filter((_, i) => i !== index);
           setPortfolioContent({
              ...portfolioContent,
              clientsSection: {
                  ...portfolioContent.clientsSection,
                  logos: updatedLogos
              }
          });
      }
  };

  const handleProjectChange = (id: string, field: keyof EditableProject, value: string) => {
    setProjects(projects.map(p => p.id === id ? { ...p, [field]: value } : p));
  };
  
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, projectId: string, field: 'imageUrl' | 'heroImageUrl') => {
    if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        setIsUploading(prev => ({...prev, [`${projectId}-${field}`]: true}));
        try {
            const { url } = await uploadImageAndGetURL(file);
            handleProjectChange(projectId, field, url);
            toast({
                title: "Success!",
                description: "Image uploaded successfully. Save changes to apply.",
            });
        } catch (error) {
            toast({
                title: "Upload Error",
                description: `Failed to upload image. Please try again.`,
                variant: "destructive",
            });
        } finally {
            setIsUploading(prev => ({...prev, [`${projectId}-${field}`]: false}));
        }
    }
  };

  const handleAddNewProject = async () => {
    try {
        const newProjectData = {
            title: "New Project",
            slug: "new-project",
            category: "Category",
            imageUrl: "https://placehold.co/600x400.png",
            aiHint: "new project",
        };
        const newProject = await addProject(newProjectData as any);
        setProjects([...projects, {
            ...newProject,
            features: newProject.features.join(', '),
            highlights: newProject.highlights.join(', '),
            services: newProject.services.join(', '),
        }]);
        toast({ title: "Success", description: "New project added. You can now edit its details." });
    } catch (error) {
        toast({ title: "Error", description: "Could not add new project.", variant: "destructive" });
    }
  };
  
  const handleDeleteProject = async (id: string) => {
      if (!window.confirm("Are you sure you want to delete this project? This cannot be undone.")) {
          return;
      }
      try {
          await deleteProject(id);
          setProjects(projects.filter(p => p.id !== id));
          toast({ title: "Success", description: "Project has been deleted." });
      } catch (error) {
          toast({ title: "Error", description: "Could not delete project.", variant: "destructive" });
      }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!portfolioContent) return;

    try {
      await updatePortfolioContent(portfolioContent);
      
      const projectsToUpdate = projects.map(p => {
          const { id, features, highlights, services, link, ...rest } = p;
          return {
              id,
              ...rest,
              features: features.split(',').map(s => s.trim()).filter(Boolean),
              highlights: highlights.split(',').map(s => s.trim()).filter(Boolean),
              services: services.split(',').map(s => s.trim()).filter(Boolean),
          };
      });

      await Promise.all(projectsToUpdate.map(p => updateProject(p.id, p)));

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
        <h1 className="text-3xl font-medium">Portfolio Page Management</h1>
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-medium">Portfolio Page Management</h1>
      <form onSubmit={handleSubmit} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Portfolio Page Hero Section</CardTitle>
            <CardDescription>Update the title and subtitle for the Portfolio page hero.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="heroTitle">Hero Title</Label>
              <Input
                id="heroTitle"
                name="heroTitle"
                value={portfolioContent?.heroTitle || ''}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="heroSubtitle">Hero Subtitle</Label>
              <Textarea
                id="heroSubtitle"
                name="heroSubtitle"
                value={portfolioContent?.heroSubtitle || ''}
                onChange={handleInputChange}
                className="min-h-[100px]"
              />
            </div>
          </CardContent>
        </Card>
        
        <Card>
            <CardHeader>
                <CardTitle>Clients Section</CardTitle>
                <CardDescription>Manage the content for the "Trusted by" section on the portfolio page.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="clients-title">Title</Label>
                    <Input id="clients-title" value={portfolioContent?.clientsSection?.title || ''} onChange={(e) => handleClientsSectionChange('title', e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="clients-subtitle">Subtitle</Label>
                    <Textarea id="clients-subtitle" value={portfolioContent?.clientsSection?.subtitle || ''} onChange={(e) => handleClientsSectionChange('subtitle', e.target.value)} />
                </div>
                <div className="space-y-4">
                    <Label>Client Logos</Label>
                    {portfolioContent?.clientsSection?.logos.map((logo, index) => (
                        <Card key={index} className="p-4 flex items-center gap-4">
                            <Image src={logo.logoUrl} alt={logo.name} width={100} height={40} className="object-contain bg-muted p-1 rounded-md" />
                            <div className="flex-grow space-y-2">
                                <Input value={logo.name} onChange={(e) => handleClientLogoChange(index, 'name', e.target.value)} placeholder="Client Name" />
                                <Input value={logo.logoUrl} onChange={(e) => handleClientLogoChange(index, 'logoUrl', e.target.value)} placeholder="Logo URL" />
                            </div>
                            <Button type="button" variant="destructive" size="icon" onClick={() => removeClientLogo(index)}>
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </Card>
                    ))}
                     <Button type="button" variant="outline" onClick={addClientLogo}>
                        <PlusCircle className="mr-2 h-4 w-4" /> Add Client Logo
                    </Button>
                </div>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <div className="flex justify-between items-center">
                    <div>
                        <CardTitle>Portfolio Projects</CardTitle>
                        <CardDescription>Manage the projects displayed on your portfolio page.</CardDescription>
                    </div>
                    <Button type="button" variant="outline" onClick={handleAddNewProject}>
                        <PlusCircle className="mr-2 h-4 w-4" /> Add New Project
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                {projects.map((project) => (
                    <Card key={project.id} className="p-4 space-y-4 relative">
                         <Button variant="destructive" size="icon" className="absolute top-2 right-2 h-7 w-7" onClick={() => handleDeleteProject(project.id)}>
                            <Trash2 className="h-4 w-4" />
                        </Button>
                        <h4 className="text-lg font-semibold">Project: {project.title}</h4>
                        
                        <Card>
                            <CardHeader><CardTitle className="text-base">List Page Details</CardTitle></CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor={`title-${project.id}`}>Title</Label>
                                        <Input id={`title-${project.id}`} value={project.title} onChange={(e) => handleProjectChange(project.id, 'title', e.target.value)} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor={`category-${project.id}`}>Category</Label>
                                        <Input id={`category-${project.id}`} value={project.category} onChange={(e) => handleProjectChange(project.id, 'category', e.target.value)} />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label>Current List Image</Label>
                                     <div className="relative group w-full aspect-video max-w-md">
                                        <Image src={project.imageUrl} alt={project.title} layout="fill" className="object-cover rounded-md"/>
                                     </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor={`imageUrl-${project.id}`}>Image URL</Label>
                                    <Input id={`imageUrl-${project.id}`} value={project.imageUrl} onChange={(e) => handleProjectChange(project.id, 'imageUrl', e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor={`image-upload-${project.id}`}>Or Upload New Image</Label>
                                    <Input id={`image-upload-${project.id}`} type="file" onChange={(e) => handleImageUpload(e, project.id, 'imageUrl')} accept="image/*" disabled={isUploading[`${project.id}-imageUrl`]} />
                                    {isUploading[`${project.id}-imageUrl`] && <p>Uploading...</p>}
                                </div>
                                 <div className="space-y-2">
                                    <Label htmlFor={`aiHint-${project.id}`}>AI Hint (for image search)</Label>
                                    <Input id={`aiHint-${project.id}`} value={project.aiHint} onChange={(e) => handleProjectChange(project.id, 'aiHint', e.target.value)} />
                                </div>
                            </CardContent>
                        </Card>
                         <Card>
                            <CardHeader><CardTitle className="text-base">Detail Page Details</CardTitle></CardHeader>
                            <CardContent className="space-y-4">
                               <div className="space-y-2">
                                    <Label>Detail Page Background Image</Label>
                                     <div className="relative group w-full aspect-video max-w-md">
                                        <Image src={project.heroImageUrl} alt={`${project.title} hero image`} layout="fill" className="object-cover rounded-md"/>
                                     </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor={`heroImageUrl-${project.id}`}>Background Image URL</Label>
                                    <Input id={`heroImageUrl-${project.id}`} value={project.heroImageUrl} onChange={(e) => handleProjectChange(project.id, 'heroImageUrl', e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor={`hero-image-upload-${project.id}`}>Or Upload New Background Image</Label>
                                    <Input id={`hero-image-upload-${project.id}`} type="file" onChange={(e) => handleImageUpload(e, project.id, 'heroImageUrl')} accept="image/*" disabled={isUploading[`${project.id}-heroImageUrl`]} />
                                    {isUploading[`${project.id}-heroImageUrl`] && <p>Uploading...</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor={`about-${project.id}`}>About Project</Label>
                                    <Textarea id={`about-${project.id}`} value={project.about} onChange={(e) => handleProjectChange(project.id, 'about', e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor={`features-${project.id}`}>Features (comma-separated)</Label>
                                    <Textarea id={`features-${project.id}`} value={project.features} onChange={(e) => handleProjectChange(project.id, 'features', e.target.value)} />
                                </div>
                                 <div className="space-y-2">
                                    <Label htmlFor={`highlights-${project.id}`}>Highlights (comma-separated)</Label>
                                    <Textarea id={`highlights-${project.id}`} value={project.highlights} onChange={(e) => handleProjectChange(project.id, 'highlights', e.target.value)} />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                     <div className="space-y-2">
                                        <Label htmlFor={`services-${project.id}`}>Services (comma-separated)</Label>
                                        <Input id={`services-${project.id}`} value={project.services} onChange={(e) => handleProjectChange(project.id, 'services', e.target.value)} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor={`date-${project.id}`}>Date</Label>
                                        <Input id={`date-${project.id}`} value={project.date} onChange={(e) => handleProjectChange(project.id, 'date', e.target.value)} />
                                    </div>
                                </div>
                            </CardContent>
                         </Card>
                    </Card>
                ))}
            </CardContent>
        </Card>
        
        <Button type="submit" size="lg">Save All Changes</Button>
      </form>
    </div>
  );
}

export default function AdminPortfolioPage() {
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
