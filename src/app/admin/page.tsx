
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { HeroContent, Service, HomepageWork, HomepageTestimonial, HomepageAboutSection, HomepageCtaSection, SocialLink, SocialPlatform } from '@/services/firestore';
import { Skeleton } from '@/components/ui/skeleton';
import { Textarea } from '@/components/ui/textarea';
import { PlusCircle, Trash2 } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sidebar } from '@/components/layout/admin-sidebar';
import { cn } from '@/lib/utils';
import { db, storage } from '@/lib/firebase';
import { doc, getDoc, setDoc, getDocs, collection } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const defaultHeroContent: Omit<HeroContent, 'services'> = { title: "Creative Agency", logoText: "Limidora", logoUrl: "", slides: [ { type: 'video', url: 'https://cdn.pixabay.com/video/2024/05/27/211904_large.mp4' }, { type: 'image', url: 'https://placehold.co/1920x1080/eeece9/6e3d23', alt: 'Placeholder image 1' }, { type: 'image', url: 'https://placehold.co/1920x1080/6e3d23/eeece9', alt: 'Placeholder image 2' }, ], buttonText: "View Our Work", buttonLink: "/portfolio", socialLinks: [ { platform: 'Facebook', url: '#' }, { platform: 'Instagram', url: '#' }, { platform: 'WhatsApp', url: '#' }, ], featuredServices: [], works: [ { title: "E-commerce Platform", category: "Web Development", imageUrl: "https://placehold.co/800x600.png", link: "/portfolio/ecommerce-platform" }, { title: "Mobile Banking App", category: "UI/UX Design", imageUrl: "https://placehold.co/600x400.png", link: "/portfolio/mobile-banking" }, { title: "SaaS Dashboard", category: "Web Development", imageUrl: "https://placehold.co/600x400.png", link: "/portfolio/saas-dashboard" } ], testimonials: [ { quote: "Limidora transformed our online presence. Their team is professional, creative, and delivered beyond our expectations. We've seen a significant increase in engagement since the launch.", author: "Jane Doe", company: "Tech Solutions Inc.", avatarUrl: "https://placehold.co/100x100.png" }, { quote: "The best web development agency we've worked with. Their attention to detail and commitment to quality is unparalleled. Highly recommended for any business looking to grow.", author: "John Smith", company: "Innovate Co.", avatarUrl: "https://placehold.co/100x100.png" }, { quote: "From start to finish, the process was seamless. The team at Limidora was always available to answer our questions and provided valuable insights that helped shape our project.", author: "Emily White", company: "Creative Minds", avatarUrl: "https://placehold.co/100x100.png" }, { quote: "An absolutely stellar experience. The final product was not only beautiful but also highly functional and user-friendly. We couldn't be happier with the results.", author: "Michael Brown", company: "Future Enterprises", avatarUrl: "https://placehold.co/100x100.png" } ], ctaSection: { title: "Let's Build Something Great", description: "Have a project in mind or just want to say hello? We're excited to hear from you and learn about your ideas.", buttonText: "Get in Touch", buttonLink: "/contact" }, aboutSection: { badge: "Who We Are", title: "About Limidora", description: "We are a creative agency that blends design, technology, and strategy to build exceptional digital experiences. Our passion is to help businesses thrive in the digital world.", buttonText: "More About Limidora", buttonLink: "/about", imageUrl: "https://placehold.co/800x600.png" } };
const isObject = (item: any) => (item && typeof item === 'object' && !Array.isArray(item));
const deepMerge = (target: any, source: any) => { const output = { ...target }; if (isObject(target) && isObject(source)) { Object.keys(source).forEach(key => { if (isObject(source[key])) { if (!(key in target)) Object.assign(output, { [key]: source[key] }); else output[key] = deepMerge(target[key], source[key]); } else { Object.assign(output, { [key]: source[key] }); } }); } return output; }


const getClientHeroContent = async (): Promise<HeroContent> => {
    const docSnap = await getDoc(doc(db, 'homepage', 'heroContent'));
    return docSnap.exists() ? deepMerge(defaultHeroContent, docSnap.data()) : defaultHeroContent;
};

const getClientServices = async (): Promise<Service[]> => {
    const snapshot = await getDocs(collection(db, 'services'));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Service));
};

const updateHeroContent = async (content: Partial<HeroContent>): Promise<void> => {
  const docRef = doc(db, 'homepage', 'heroContent');
  const { services, ...restOfContent } = content;
  await setDoc(docRef, restOfContent, { merge: true });
};


const socialPlatforms: SocialPlatform[] = ['Facebook', 'Instagram', 'WhatsApp', 'Twitter', 'LinkedIn', 'Github'];

function AdminDashboard() {
  const { toast } = useToast();
  const [heroContent, setHeroContent] = useState<HeroContent | null>(null);
  const [allServices, setAllServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const content = await getClientHeroContent();
        const services = await getClientServices();
        setHeroContent(content);
        setAllServices(services);
      } catch (error) {
        console.error("Failed to fetch content:", error);
        toast({ title: "Error", description: "Failed to load content from the database.", variant: "destructive", });
      } finally {
        setIsLoading(false);
      }
    };
    fetchContent();
  }, [toast]);

  const handleInputChange = (field: keyof HeroContent, value: string) => {
    if (heroContent) {
      setHeroContent({ ...heroContent, [field]: value });
    }
  };

  const handleSlideChange = (index: number, value: string) => {
    if (heroContent) {
      const newSlides = [...heroContent.slides];
      const type = value.match(/\.(mp4|webm|ogg)$/) ? 'video' : 'image';
      newSlides[index] = { ...newSlides[index], url: value, type };
      setHeroContent({ ...heroContent, slides: newSlides });
    }
  };

  const handleFeaturedServiceChange = (serviceId: string, checked: boolean) => {
    if (heroContent) {
      let currentFeatured = heroContent.featuredServices || [];
      if (checked) {
        if (currentFeatured.length < 4) {
          currentFeatured.push(serviceId);
        } else {
          toast({ title: "Limit Reached", description: "You can only feature up to 4 services on the homepage.", variant: "destructive" });
          return;
        }
      } else {
        currentFeatured = currentFeatured.filter(id => id !== serviceId);
      }
      setHeroContent({ ...heroContent, featuredServices: currentFeatured });
    }
  };

  const handleWorkChange = (index: number, field: keyof HomepageWork, value: string) => {
    if (heroContent) {
      const newWorks = [...heroContent.works];
      newWorks[index] = { ...newWorks[index], [field]: value };
      setHeroContent({ ...heroContent, works: newWorks });
    }
  };

  const handleTestimonialChange = (index: number, field: keyof HomepageTestimonial, value: string) => {
    if (heroContent) {
      const newTestimonials = [...heroContent.testimonials];
      newTestimonials[index] = { ...newTestimonials[index], [field]: value };
      setHeroContent({ ...heroContent, testimonials: newTestimonials });
    }
  };

  const addTestimonial = () => {
    if (heroContent) {
      const newTestimonials = [...heroContent.testimonials, { quote: "", author: "", company: "", avatarUrl: "https://placehold.co/100x100.png" }];
      setHeroContent({ ...heroContent, testimonials: newTestimonials });
    }
  };

  const removeTestimonial = (index: number) => {
    if (heroContent) {
      const newTestimonials = heroContent.testimonials.filter((_, i) => i !== index);
      setHeroContent({ ...heroContent, testimonials: newTestimonials });
    }
  };

  const handleCtaSectionChange = (field: keyof HomepageCtaSection, value: string) => {
    if (heroContent) {
      setHeroContent({ ...heroContent, ctaSection: { ...(heroContent.ctaSection || { title: '', description: '', buttonText: '', buttonLink: '' }), [field]: value, }, });
    }
  };

  const handleAboutSectionChange = (field: keyof HomepageAboutSection, value: string) => {
    if (heroContent) {
      setHeroContent({ ...heroContent, aboutSection: { ...heroContent.aboutSection, [field]: value, }, });
    }
  };

  const handleSocialLinkChange = (index: number, field: keyof SocialLink, value: string) => {
    if (heroContent) {
      const newSocialLinks = [...heroContent.socialLinks];
      newSocialLinks[index] = { ...newSocialLinks[index], [field]: value };
      setHeroContent({ ...heroContent, socialLinks: newSocialLinks });
    }
  };

  const addSocialLink = () => {
    if (heroContent) {
      const newSocialLinks = [...heroContent.socialLinks, { platform: 'Facebook', url: '' }];
      setHeroContent({ ...heroContent, socialLinks: newSocialLinks });
    }
  };

  const removeSocialLink = (index: number) => {
    if (heroContent) {
      const newSocialLinks = heroContent.socialLinks.filter((_, i) => i !== index);
      setHeroContent({ ...heroContent, socialLinks: newSocialLinks });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!heroContent) return;
    try {
      await updateHeroContent(heroContent);
      toast({ title: "Success!", description: "Content has been updated successfully.", });
    } catch (error) {
      toast({ title: "Error!", description: "Failed to update content. Please try again.", variant: "destructive", });
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-8">
        <h1 className="text-3xl font-medium uppercase">Content Management</h1>
        {[...Array(6)].map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-8 w-1/2" />
              <Skeleton className="h-4 w-3/4" />
            </CardHeader>
            <CardContent className="space-y-6">
              <Skeleton className="h-10 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-medium uppercase">Homepage Content Management</h1>
      <form onSubmit={handleSubmit} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Site Logo</CardTitle>
            <CardDescription>Update your company logo. This will appear in the header and footer.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Current Logo</Label>
              <div className="relative h-16 w-48 bg-muted rounded-md flex items-center justify-center overflow-hidden">
                {heroContent?.logoUrl ? (
                  <img src={heroContent.logoUrl} alt="Current Logo" className="h-full w-full object-contain p-2" onError={(e) => { const target = e.target as HTMLImageElement; target.style.display = 'none'; const parent = target.parentElement; if (parent) { parent.innerHTML = `<p class="text-sm text-muted-foreground">${heroContent?.logoText || 'Limidora'}</p>`; } }} />
                ) : (
                  <p className="text-sm text-muted-foreground">{heroContent?.logoText || 'Limidora'}</p>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="logoUrl">Logo URL</Label>
              <Input id="logoUrl" name="logoUrl" value={heroContent?.logoUrl || ''} onChange={(e) => handleInputChange('logoUrl', e.target.value)} placeholder="https://example.com/logo.png" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="logoText">Logo Text Fallback</Label>
              <Input id="logoText" name="logoText" value={heroContent?.logoText || ''} onChange={(e) => handleInputChange('logoText', e.target.value)} placeholder="Limidora" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Hero Section Title</CardTitle>
            <CardDescription>Update the main title for the hero section.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="heroTitle">Title</Label>
              <Input id="heroTitle" value={heroContent?.title || ''} onChange={(e) => handleInputChange('title', e.target.value)} />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Hero Section Slider</CardTitle>
            <CardDescription>Update the video and images for the hero section slider.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {heroContent?.slides.map((slide, index) => (
              <div key={index} className="space-y-2">
                <Label htmlFor={`slide-${index}`}>Slide {index + 1} (Video or Image URL)</Label>
                <Input id={`slide-${index}`} value={slide.url} onChange={(e) => handleSlideChange(index, e.target.value)} placeholder="https://example.com/video.mp4 or https://example.com/image.png" />
                <p className="text-sm text-muted-foreground"> Detected type: <span className="font-semibold">{slide.type}</span> </p>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Hero Button</CardTitle>
            <CardDescription>Update the text and link for the button in the hero section.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="buttonText">Button Text</Label>
              <Input id="buttonText" value={heroContent?.buttonText || ''} onChange={(e) => handleInputChange('buttonText', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="buttonLink">Button Link</Label>
              <Input id="buttonLink" value={heroContent?.buttonLink || ''} onChange={(e) => handleInputChange('buttonLink', e.target.value)} />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Social Media Links</CardTitle>
            <CardDescription>Manage the social media links displayed in the footer.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {heroContent?.socialLinks.map((link, index) => (
              <Card key={index} className="p-4 space-y-4 relative">
                <Button variant="destructive" size="icon" className="absolute top-2 right-2 h-7 w-7" onClick={() => removeSocialLink(index)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Platform</Label>
                    <Select value={link.platform} onValueChange={(value) => handleSocialLinkChange(index, 'platform', value as SocialPlatform)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a platform" />
                      </SelectTrigger>
                      <SelectContent>
                        {socialPlatforms.map(platform => (
                          <SelectItem key={platform} value={platform}>{platform}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`social-url-${index}`}>URL</Label>
                    <Input id={`social-url-${index}`} value={link.url} onChange={(e) => handleSocialLinkChange(index, 'url', e.target.value)} placeholder="https://example.com/profile" />
                  </div>
                </div>
              </Card>
            ))}
            <Button type="button" variant="outline" onClick={addSocialLink}>
              <PlusCircle className="mr-2 h-4 w-4" /> Add Social Link
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Featured Homepage Services</CardTitle>
            <CardDescription>Select up to 4 services to feature on the homepage. Manage all services on the <Link href="/admin/services" className="underline text-primary">Services page</Link>.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {allServices.map(service => (
              <div key={service.id} className="flex items-center space-x-2">
                <Checkbox id={`service-${service.id}`} checked={heroContent?.featuredServices?.includes(service.id)} onCheckedChange={(checked) => handleFeaturedServiceChange(service.id, checked as boolean)} disabled={!heroContent?.featuredServices?.includes(service.id) && (heroContent?.featuredServices?.length ?? 0) >= 4} />
                <label htmlFor={`service-${service.id}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" >
                  {service.title}
                </label>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Homepage Works</CardTitle>
            <CardDescription>Update the content for the featured works section on the homepage.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {heroContent?.works.map((work, index) => (
              <Card key={index} className="p-4 space-y-4">
                <h4 className="text-lg font-semibold">Work Item {index + 1}</h4>
                <div className="space-y-2">
                  <Label htmlFor={`work-title-${index}`}>Title</Label>
                  <Input id={`work-title-${index}`} value={work.title} onChange={(e) => handleWorkChange(index, 'title', e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`work-category-${index}`}>Category</Label>
                  <Input id={`work-category-${index}`} value={work.category} onChange={(e) => handleWorkChange(index, 'category', e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`work-image-${index}`}>Image URL</Label>
                  <Input id={`work-image-${index}`} value={work.imageUrl} onChange={(e) => handleWorkChange(index, 'imageUrl', e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`work-link-${index}`}>Link</Label>
                  <Input id={`work-link-${index}`} value={work.link} onChange={(e) => handleWorkChange(index, 'link', e.target.value)} />
                </div>
              </Card>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Homepage Testimonials</CardTitle>
            <CardDescription>Update the testimonials section on the homepage.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {heroContent?.testimonials.map((testimonial, index) => (
              <Card key={index} className="p-4 space-y-4 relative">
                <Button variant="destructive" size="icon" className="absolute top-2 right-2 h-7 w-7" onClick={() => removeTestimonial(index)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
                <h4 className="text-lg font-semibold">Testimonial {index + 1}</h4>
                <div className="space-y-2">
                  <Label htmlFor={`testimonial-quote-${index}`}>Quote</Label>
                  <Textarea id={`testimonial-quote-${index}`} value={testimonial.quote} onChange={(e) => handleTestimonialChange(index, 'quote', e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`testimonial-author-${index}`}>Author</Label>
                  <Input id={`testimonial-author-${index}`} value={testimonial.author} onChange={(e) => handleTestimonialChange(index, 'author', e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`testimonial-company-${index}`}>Company</Label>
                  <Input id={`testimonial-company-${index}`} value={testimonial.company} onChange={(e) => handleTestimonialChange(index, 'company', e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`testimonial-avatar-${index}`}>Avatar URL</Label>
                  <Input id={`testimonial-avatar-${index}`} value={testimonial.avatarUrl} onChange={(e) => handleTestimonialChange(index, 'avatarUrl', e.target.value)} />
                </div>
              </Card>
            ))}
            <Button type="button" variant="outline" onClick={addTestimonial}>
              <PlusCircle className="mr-2 h-4 w-4" /> Add Testimonial
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Call to Action Section</CardTitle>
            <CardDescription>Update the content for the CTA section on the homepage.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="cta-title">Title</Label>
              <Input id="cta-title" value={heroContent?.ctaSection?.title || ''} onChange={(e) => handleCtaSectionChange('title', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cta-description">Description</Label>
              <Textarea id="cta-description" value={heroContent?.ctaSection?.description || ''} onChange={(e) => handleCtaSectionChange('description', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cta-button-text">Button Text</Label>
              <Input id="cta-button-text" value={heroContent?.ctaSection?.buttonText || ''} onChange={(e) => handleCtaSectionChange('buttonText', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cta-button-link">Button Link</Label>
              <Input id="cta-button-link" value={heroContent?.ctaSection?.buttonLink || ''} onChange={(e) => handleCtaSectionChange('buttonLink', e.target.value)} />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Homepage About Section</CardTitle>
            <CardDescription>Update the content for the 'About' section on the homepage.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="about-badge">Badge Text</Label>
              <Input id="about-badge" value={heroContent?.aboutSection.badge || ''} onChange={(e) => handleAboutSectionChange('badge', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="about-title">Title</Label>
              <Input id="about-title" value={heroContent?.aboutSection.title || ''} onChange={(e) => handleAboutSectionChange('title', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="about-description">Description</Label>
              <Textarea id="about-description" value={heroContent?.aboutSection.description || ''} onChange={(e) => handleAboutSectionChange('description', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="about-button-text">Button Text</Label>
              <Input id="about-button-text" value={heroContent?.aboutSection.buttonText || ''} onChange={(e) => handleAboutSectionChange('buttonText', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="about-button-link">Button Link</Label>
              <Input id="about-button-link" value={heroContent?.aboutSection.buttonLink || ''} onChange={(e) => handleAboutSectionChange('buttonLink', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="about-image-url">Image URL</Label>
              <Input id="about-image-url" value={heroContent?.aboutSection.imageUrl || ''} onChange={(e) => handleAboutSectionChange('imageUrl', e.target.value)} />
            </div>
          </CardContent>
        </Card>
        <Button type="submit" size="lg">Save All Changes</Button>
      </form>
    </div>
  );
}

export default function AdminHomePage() {
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

    