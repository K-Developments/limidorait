
"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Service, FaqContent } from '@/services/firestore';
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

function AdminDashboard() {
  const { toast } = useToast();
  const [services, setServices] = useState<EditableService[]>([]);
  const [faqs, setFaqs] = useState<FaqContent['faqs']>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState<Record<string, boolean>>({});

  const fetchContent = async () => {
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
  };

  useEffect(() => {
    fetchContent();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleServiceChange = (id: string, field: keyof EditableService, value: string | string[]) => {
    setServices(services.map(s => s.id === id ? { ...s, [field]: value } : s));
  };
  
  const handleFaqSelectionChange = (serviceId: string, faqId: string, checked: boolean) => {
    setServices(services.map(s => {
        if (s.id === serviceId) {
            const currentFaqIds = s.faqIds || [];
            if (checked) {
                return { ...s, faqIds: [...currentFaqIds, faqId] };
            } else {
                return { ...s, faqIds: currentFaqIds.filter(id => id !== faqId) };
            }
        }
        return s;
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, serviceId: string) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setIsUploading(prev => ({...prev, [serviceId]: true}));
      try {
        const { url } = await uploadImageAndGetURL(file);
        handleServiceChange(serviceId, 'imageUrl', url);
        toast({
          title: "Success!",
          description: "Image uploaded successfully. Save changes to apply.",
        });
      } catch (error) {
        toast({
          title: "Upload Error",
          description: "Failed to upload image. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsUploading(prev => ({...prev, [serviceId]: false}));
      }
    }
  };

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
      setServices([...services, {...newService, whatYouGet: newService.whatYouGet.join('\n') }]);
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
      setServices(services.filter(s => s.id !== id));
      toast({ title: "Success", description: "Service has been deleted." });
    } catch (error) {
      toast({ title: "Error", description: "Could not delete service.", variant: "destructive" });
    }
  };

  const handleSaveChanges = async (serviceId: string) => {
    const serviceToUpdate = services.find(s => s.id === serviceId);
    if (!serviceToUpdate) return;
    
    const { id, whatYouGet, ...dataToUpdate } = serviceToUpdate;
    const finalData = {
        ...dataToUpdate,
        whatYouGet: whatYouGet.split('\n').filter(Boolean),
    };

    try {
      await updateService(serviceId, finalData);
      toast({
        title: "Success!",
        description: `Service "${serviceToUpdate.title}" has been updated.`,
      });
    } catch (error) {
      toast({
        title: "Error!",
        description: "Failed to update service. Please try again.",
        variant: "destructive",
      });
    }
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
          <Card key={service.id}>
            <CardHeader>
              <CardTitle>{service.title}</CardTitle>
              <CardDescription>Manage the content for this service.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`title-${service.id}`}>Title</Label>
                  <Input id={`title-${service.id}`} value={service.title} onChange={(e) => handleServiceChange(service.id, 'title', e.target.value)} />
                </div>
                 <div className="space-y-2">
                  <Label htmlFor={`slug-${service.id}`}>Slug</Label>
                  <Input id={`slug-${service.id}`} value={service.slug} onChange={(e) => handleServiceChange(service.id, 'slug', e.target.value)} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor={`description-${service.id}`}>Short Description</Label>
                <Textarea id={`description-${service.id}`} value={service.description} onChange={(e) => handleServiceChange(service.id, 'description', e.target.value)} />
              </div>
               <div className="space-y-2">
                <Label htmlFor={`longDescription-${service.id}`}>Detailed Description</Label>
                <Textarea id={`longDescription-${service.id}`} value={service.longDescription} onChange={(e) => handleServiceChange(service.id, 'longDescription', e.target.value)} className="min-h-[120px]" />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`whatYouGet-${service.id}`}>What You Get (one item per line)</Label>
                <Textarea id={`whatYouGet-${service.id}`} value={service.whatYouGet} onChange={(e) => handleServiceChange(service.id, 'whatYouGet', e.target.value)} className="min-h-[120px]" />
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
                            id={`faq-${service.id}-${faq.id}`}
                            checked={service.faqIds?.includes(faq.id)}
                            onCheckedChange={(checked) => handleFaqSelectionChange(service.id, faq.id, checked as boolean)}
                        />
                        <label htmlFor={`faq-${service.id}-${faq.id}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            {faq.question}
                        </label>
                    </div>
                  ))}
                </CardContent>
              </Card>


              <div className="space-y-2">
                  <Label>Current Image</Label>
                  <div className="relative group w-full aspect-video max-w-md">
                      <Image src={service.imageUrl} alt={service.title} layout="fill" className="object-cover rounded-md"/>
                  </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor={`imageUrl-${service.id}`}>Image URL</Label>
                <Input id={`imageUrl-${service.id}`} value={service.imageUrl} onChange={(e) => handleServiceChange(service.id, 'imageUrl', e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`image-upload-${service.id}`}>Or Upload New Image</Label>
                <Input id={`image-upload-${service.id}`} type="file" onChange={(e) => handleImageUpload(e, service.id)} accept="image/*" disabled={isUploading[service.id]} />
                {isUploading[service.id] && <p>Uploading...</p>}
              </div>
              <div className="flex justify-end gap-2">
                <Button onClick={() => handleSaveChanges(service.id)}>Save Changes</Button>
                <Button variant="destructive" size="icon" onClick={() => handleDeleteService(service.id)}>
                    <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
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

    