
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Twitter, Linkedin, Github } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getContactContent, ContactContent, getServices, Service } from "@/services/firestore";
import { Skeleton } from "../ui/skeleton";

export function Contact() {
  const { toast } = useToast();
  const [content, setContent] = useState<ContactContent | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const [contactData, servicesData] = await Promise.all([
          getContactContent(),
          getServices()
        ]);
        setContent(contactData);
        setServices(servicesData);
      } catch (error) {
        console.error("Failed to fetch contact page content:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchContent();
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Thanks for reaching out. We'll get back to you soon.",
    });
    (e.target as HTMLFormElement).reset();
  };
  
  if (isLoading) {
    return (
        <section className="w-full grid lg:grid-cols-2 min-h-screen">
             <div className="flex items-center justify-center p-8 md:p-12 lg:p-16 bg-neutral-900">
                <Skeleton className="w-full max-w-md h-64" />
             </div>
             <div className="flex items-center justify-center p-8 md:p-12 lg:p-16 bg-background">
                <Skeleton className="w-full max-w-md h-96" />
            </div>
        </section>
    )
  }

  return (
    <section id="contact" aria-labelledby="contact-heading" className="w-full grid lg:grid-cols-2 min-h-screen">
       <motion.div 
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex items-center justify-center p-8 md:p-12 lg:p-16 bg-neutral-900 text-white relative overflow-hidden min-h-[60vh] lg:min-h-0 lg:order-last"
      >
           {/* Gentle Decorative Lines */}
           <div className="absolute inset-0 w-full h-full pointer-events-none">
     {/* Vertical Lines */}
<div className="absolute top-0 left-1/4 h-full w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent overflow-hidden">
  {/* Gentle moving highlight */}
  <motion.div
    className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-white/40 via-white/20 to-transparent"
    animate={{ y: ["-100%", "100%"], opacity: [0, 0.5, 0] }}
    transition={{ duration: 2, repeat: Infinity, repeatDelay: 1, ease: "easeInOut" }}
  />
</div>

<div className="absolute top-0 left-2/4 h-full w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent overflow-hidden">
  <motion.div
    className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-white/40 via-white/20 to-transparent"
    animate={{ y: ["-100%", "100%"], opacity: [0, 0.5, 0] }}
    transition={{ duration: 2, repeat: Infinity, repeatDelay: 1, delay: 0, ease: "easeInOut" }}
  />
</div>

<div className="absolute top-0 left-3/4 h-full w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent overflow-hidden">
  <motion.div
    className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-white/40 via-white/20 to-transparent"
    animate={{ y: ["-100%", "100%"], opacity: [0, 0.5, 0] }}
    transition={{ duration: 2, repeat: Infinity, repeatDelay: 1, delay: 0, ease: "easeInOut" }}
  />
</div>

{/* Horizontal Lines */}
<div className="absolute right-0 top-1/3 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent overflow-hidden">
  <motion.div
    className="absolute top-0 right-0 w-32 h-full bg-gradient-to-r from-white/40 via-white/20 to-transparent"
    animate={{ x: ["100%", "-100%"], opacity: [0, 0.4, 0] }}
    transition={{ duration: 6, repeat: Infinity, repeatDelay: 9, ease: "easeInOut" }}
  />
</div>

<div className="absolute right-0 top-2/3 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent overflow-hidden">
  <motion.div
    className="absolute top-0 right-0 w-32 h-full bg-gradient-to-r from-white/40 via-white/20 to-transparent"
    animate={{ x: ["100%", "-100%"], opacity: [0, 0.4, 0] }}
    transition={{ duration: 2, repeat: Infinity, repeatDelay: 1, delay: 0, ease: "easeInOut" }}
  />
</div>


          <div className="absolute right-0 top-2/3 w-full h-[1px] overflow-hidden">
            <motion.div
              className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-white/30 via-white/10 to-transparent"
              animate={{ x: ["100%", "-100%"], opacity: [0, 0.4, 0] }}
              transition={{ duration: 4, repeat: Infinity, repeatDelay: 1, delay: 0, ease: "easeInOut" }}
            />
          </div>

          {/* Ambient Glow */}
          <motion.div
            className="absolute top-1/4 left-1/3 w-32 h-32 bg-white/5 rounded-full blur-2xl"
            animate={{ scale: [0.9, 1.1, 0.9], opacity: [0.2, 0.35, 0.2] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/3 w-24 h-24 bg-white/5 rounded-full blur-2xl"
            animate={{ scale: [1, 0.85, 1], opacity: [0.15, 0.3, 0.15] }}
            transition={{ duration: 4, repeat: Infinity, delay: 2, ease: "easeInOut" }}
          />
        </div>


        <div className="relative z-10 w-full max-w-md space-y-6">
          <div className="inline-block border border-white/20 px-3 py-1 text-sm text-white/80">Contact Us</div>
          <h2 id="contact-heading" className="text-4xl font-medium tracking-tighter sm:text-5xl font-body uppercase">{content?.title}</h2>
          <p className="max-w-[600px] text-white/70 md:text-xl/relaxed">
            {content?.description}
          </p>
          <div className="flex space-x-4 pt-4">
            <a href="#" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
              <Twitter className="h-6 w-6 text-white/60 hover:text-white transition-colors" />
            </a>
            <a href="#" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
              <Linkedin className="h-6 w-6 text-white/60 hover:text-white transition-colors" />
            </a>
            <a href="#" aria-label="GitHub" target="_blank" rel="noopener noreferrer">
              <Github className="h-6 w-6 text-white/60 hover:text-white transition-colors" />
            </a>
          </div>
        </div>
      </motion.div>
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex items-center justify-center p-8 md:p-12 lg:p-16 bg-background min-h-screen lg:min-h-0"
      >
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="text-3xl font-medium tracking-tighter sm:text-4xl font-body uppercase">Get in Touch</h2>
            <p className="mt-2 text-muted-foreground">Fill out the form and we'll get back to you as soon as possible.</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Your Name" required autoComplete="name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="your@email.com" required autoComplete="email" />
              </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" placeholder="Your Phone Number" autoComplete="tel" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="service">Service</Label>
                <Select name="service">
                    <SelectTrigger id="service">
                        <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                        {services.map(service => (
                             <SelectItem key={service.id} value={service.id}>{service.title}</SelectItem>
                        ))}
                        <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" placeholder="Tell us about your project" required className="min-h-[150px]" />
            </div>
            <Button type="submit" className="w-full">Send Message</Button>
          </form>
           <p className="text-center text-sm text-muted-foreground">
              We will contact you soon.
            </p>
        </div>
      </motion.div>
    </section>
  );
}
