
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
import { getContactContent, ContactContent, submitContactForm } from "@/services/firestore";
import { Skeleton } from "../ui/skeleton";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";


const ContactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  phone: z.string().optional(),
  service: z.string({ required_error: "Please select a service." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type ContactFormValues = z.infer<typeof ContactFormSchema>;


export function Contact() {
  const { toast } = useToast();
  const [content, setContent] = useState<ContactContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const contactData = await getContactContent();
        setContent(contactData);
      } catch (error) {
        console.error("Failed to fetch contact page content:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchContent();
  }, []);

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    try {
        await submitContactForm(data);
        toast({
            title: "Message Sent!",
            description: "Thanks for reaching out. We'll get back to you soon.",
        });
        form.reset();
    } catch (error) {
        toast({
            title: "Error",
            description: "There was a problem sending your message. Please try again later.",
            variant: "destructive",
        });
    } finally {
        setIsSubmitting(false);
    }
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
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="your@email.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Your Phone Number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="service"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Service</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {content?.serviceOptions.map(option => (
                          <SelectItem key={option} value={option}>{option}</SelectItem>
                        ))}
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Tell us about your project" className="min-h-[120px]" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </Form>
           <p className="text-center text-sm text-muted-foreground">
              We will contact you soon.
            </p>
        </div>
      </motion.div>
    </section>
  );
}

    