
"use client";

import { useState, useEffect, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Service, FaqContent, FaqItem } from '@/services/firestore';
import { Skeleton } from '@/components/ui/skeleton';
import { PlusCircle, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { Sidebar } from '@/components/layout/admin-sidebar';
import { cn } from '@/lib/utils';
import { db, storage } from '@/lib/firebase';
import { doc, getDocs, collection, addDoc, updateDoc, deleteDoc, getDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Checkbox } from '@/components/ui/checkbox';

const getClientServices = async (): Promise<Service[]> => {
    const snapshot = await getDocs(collection(db, 'services'));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Service));
};

const getClientFaqs = async (): Promise<FaqContent> => {
    const docSnap = await getDoc(doc(db, 'homepage', 'faqContent'));
    return docSnap.exists() ? docSnap.data() as FaqContent : { faqs: [] };
};

const addService = async (data: Omit<Service, 'id'>): Promise<Service> => {
    const docRef = await addDoc(collection(db, 'services'), data);
    return { id: docRef.id, ...data };
};

const updateService = async (id: string, data: Partial<Omit<Service, 'id'>>): Promise<void> => {
    await updateDoc(doc(db, 'services', id), data);
};

const deleteService = async (id: string): Promise<void> => {
    await deleteDoc(doc(db, 'services', id));
};

const uploadImageAndGetURL = async (imageFile: File): Promise<{ url: string; path: string; }> => {
  const storageRef = ref(storage, `site-assets/${Date.now()}_${imageFile.name}`);
  const snapshot = await uploadBytes(storageRef, imageFile);
  const downloadURL = await getDownloadURL(snapshot.ref);
  return { url: downloadURL, path: snapshot.ref.fullPath };
};


type EditableService = Omit<Service, 'whatYouGet'> & {
    whatYouGet: string;
};

function ServiceCard({ service, faqs, onDelete, onUpdate }: { service: EditableService, faqs: FaqItem[], onDelete: (id: string) => void, onUpdate: (id: string, data: Service) => void }) {
    const { toast } = useToast();
    const [editableService, setEditableService] = useState(service);
    const [isUploading, setIsUploading] = useState(false);

    const handleServiceChange = (field: keyof EditableService, value: string | string[]) => {
        setEditableService(prev => ({ ...prev, [field]: value }));
    };
  
    const handleFaqSelectionChange = (faqId: string, checked: boolean) => {
        setEditableService(prevService => {
            const currentFaqIds = prevService.faqIds || [];
            let newFaqIds;
            if (checked) {
                newFaqIds = [...currentFaqIds, faqId];
            } else {
                newFaqIds = currentFaqIds.filter(id => id !== faqId);
            }
            return { ...prevService, faqIds: newFaqIds };
        });
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setIsUploading(true);
            try {
                const { url } = await uploadImageAndGetURL(file);
                handleServiceChange('imageUrl', url);
                toast({ title: "Success!", description: "Image uploaded successfully. Save changes to apply." });
            } catch (error) {
                toast({ title: "Upload Error", description: "Failed to upload image. Please try again.", variant: "destructive" });
            } finally {
                setIsUploading(false);
            }
        }
    };

    const handleSaveChanges = async () => {
        const { id, whatYouGet, ...dataToUpdate } = editableService;
        const finalData = {
            ...dataToUpdate,
            whatYouGet: whatYouGet.split('\n').filter(Boolean),
        };
        try {
            await updateService(id, finalData);
            onUpdate(id, {id, ...finalData});
            toast({ title: "Success!", description: `Service "${editableService.title}" has been updated.` });
        } catch (error) {
            toast({ title: "Error!", description: "Failed to update service. Please try again.", variant: "destructive" });
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>{editableService.title}</CardTitle>
                <CardDescription>Manage the content for this service.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor={`title-${editableService.id}`}>Title</Label>
                        <Input id={`title-${editableService.id}`} value={editableService.title} onChange={(e) => handleServiceChange('title', e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor={`slug-${editableService.id}`}>Slug</Label>
                        <Input id={`slug-${editableService.id}`} value={editableService.slug} onChange={(e) => handleServiceChange('slug', e.target.value)} />
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor={`description-${editableService.id}`}>Short Description</Label>
                    <Textarea id={`description-${editableService.id}`} value={editableService.description} onChange={(e) => handleServiceChange('description', e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor={`longDescription-${editableService.id}`}>Detailed Description</Label>
                    <Textarea id={`longDescription-${editableService.id}`} value={editableService.longDescription} onChange={(e) => handleServiceChange('longDescription', e.target.value)} className="min-h-[120px]" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor={`whatYouGet-${editableService.id}`}>What You Get (one item per line)</Label>
                    <Textarea id={`whatYouGet-${editableService.id}`} value={editableService.whatYouGet} onChange={(e) => handleServiceChange('whatYouGet', e.target.value)} className="min-h-[120px]" />
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Associated FAQs</CardTitle>
                        <CardDescription>Select FAQs to display on this service's page.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2 max-h-60 overflow-y-auto">
                        {faqs.map(faq => (
                            <div key={faq.id} className="flex items-center space-x-2">
                                <Checkbox
                                    id={`faq-${editableService.id}-${faq.id}`}
                                    checked={editableService.faqIds?.includes(faq.id)}
                                    onCheckedChange={(checked) => handleFaqSelectionChange(faq.id, checked as boolean)}
                                />
                                <label htmlFor={`faq-${editableService.id}-${faq.id}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    {faq.question}
                                </label>
                            </div>
                        ))}
                    </CardContent>
                </Card>
                <div className="space-y-2">
                    <Label>Current Image</Label>
                    <div className="relative group w-full aspect-video max-w-md">
                        <Image src={editableService.imageUrl} alt={editableService.title} layout="fill" className="object-cover rounded-md"/>
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor={`imageUrl-${editableService.id}`}>Image URL</Label>
                    <Input id={`imageUrl-${editableService.id}`} value={editableService.imageUrl} onChange={(e) => handleServiceChange('imageUrl', e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor={`image-upload-${editableService.id}`}>Or Upload New Image</Label>
                    <Input id={`image-upload-${editableService.id}`} type="file" onChange={handleImageUpload} accept="image/*" disabled={isUploading} />
                    {isUploading && <p>Uploading...</p>}
                </div>
                <div className="flex justify-end gap-2">
                    <Button onClick={handleSaveChanges}>Save Changes</Button>
                    <Button variant="destructive" size="icon" onClick={() => onDelete(editableService.id)}>
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}


function AdminDashboard() {
  const { toast } = useToast();
  const [services, setServices] = useState<EditableService[]>([]);
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchContent = useCallback(async () => {
    setIsLoading(true);
    try {
      const [servicesData, faqsData] = await Promise.all([
        getClientServices(),
        getClientFaqs(),
      ]);
      setServices(servicesData.map(s => ({...s, whatYouGet: s.whatYouGet?.join('\n') || ''})));
      setFaqs(faqsData.faqs || []);
    } catch (error) {
      console.error("Failed to fetch services:", error);
      toast({
        title: "Error",
        description: "Failed to load data from the database.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  const handleAddNewService = async () => {
    try {
      const newServiceData = {
        title: "New Service",
        slug: "new-service",
        description: "A brief description of this new service.",
        longDescription: "A more detailed explanation of what this service entails.",
        whatYouGet: ["Feature 1", "Feature 2", "Feature 3"],
        imageUrl: "https://placehold.co/600x400.png",
        link: "/services",
        faqIds: [],
      };
      const newService = await addService(newServiceData);
      setServices(prev => [...prev, {...newService, whatYouGet: newService.whatYouGet.join('\n') }]);
      toast({ title: "Success", description: "New service added. You can now edit its details." });
    } catch (error) {
      toast({ title: "Error", description: "Could not add new service.", variant: "destructive" });
    }
  };

  const handleDeleteService = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this service? This cannot be undone.")) {
      return;
    }
    try {
      await deleteService(id);
      setServices(prev => prev.filter(s => s.id !== id));
      toast({ title: "Success", description: "Service has been deleted." });
    } catch (error) {
      toast({ title: "Error", description: "Could not delete service.", variant: "destructive" });
    }
  };
  
  const handleUpdateService = (id: string, updatedData: Service) => {
      setServices(prev => prev.map(s => s.id === id ? {...s, ...updatedData, whatYouGet: updatedData.whatYouGet.join('\n')} : s));
  };

  if (isLoading) {
    return (
      <div className="space-y-8">
        <h1 className="text-3xl font-medium">Services Management</h1>
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-medium">Services Management</h1>
        <Button onClick={handleAddNewService}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Service
        </Button>
      </div>

      <div className="space-y-6">
        {services.map((service) => (
          <ServiceCard 
            key={service.id} 
            service={service} 
            faqs={faqs}
            onDelete={handleDeleteService}
            onUpdate={handleUpdateService}
          />
        ))}
      </div>
    </div>
  );
}

export default function AdminServicesPage() {
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

    