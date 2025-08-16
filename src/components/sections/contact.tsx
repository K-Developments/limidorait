
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Twitter, Linkedin, Github } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

export function Contact() {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Thanks for reaching out. We'll get back to you soon.",
    });
    (e.target as HTMLFormElement).reset();
  };

  return (
    <section id="contact" aria-labelledby="contact-heading" className="w-full grid lg:grid-cols-2">
       <motion.div 
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex items-center justify-center p-8 md:p-12 lg:p-16 bg-neutral-900 text-white relative overflow-hidden min-h-[60vh] lg:min-h-screen"
      >
        <div className="absolute inset-0 w-full h-full pointer-events-none">
            <div className="absolute top-0 left-1/4 h-full w-[1px] bg-gradient-to-t from-transparent to-white/10" />
            <div className="absolute top-0 left-2/4 h-full w-[1px] bg-gradient-to-t from-transparent to-white/10" />
            <div className="absolute right-0 top-1/3 w-full h-[1px] bg-gradient-to-r from-transparent to-white/10" />
            <div className="absolute right-0 top-2/3 w-full h-[1px] bg-gradient-to-r from-transparent to-white/10" />
            <div className="absolute top-0 left-3/4 h-full w-[1px] bg-gradient-to-t from-transparent to-white/10" />
        </div>
        <div className="relative z-10 w-full max-w-md space-y-6">
          <div className="inline-block border border-white/20 px-3 py-1 text-sm text-white/80">Contact Us</div>
          <h2 id="contact-heading" className="text-4xl font-medium tracking-tighter sm:text-5xl font-body uppercase">Let's Build Something Great</h2>
          <p className="max-w-[600px] text-white/70 md:text-xl/relaxed">
            Have a project in mind or just want to say hello? We're excited to hear from you and learn about your ideas.
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
        className="flex items-center justify-center p-8 md:p-12 lg:p-16 bg-background min-h-screen"
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
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" placeholder="Tell us about your project" required className="min-h-[150px]" />
            </div>
            <Button type="submit" className="w-full">Send Message</Button>
          </form>
        </div>
      </motion.div>
    </section>
  );
}
