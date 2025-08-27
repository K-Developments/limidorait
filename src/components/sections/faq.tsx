
"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { FaqContent } from "@/services/firestore";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";


const QuestionFormSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email address." }),
    question: z.string().min(10, { message: "Question must be at least 10 characters long." }),
});

type QuestionFormValues = z.infer<typeof QuestionFormSchema>;

const submitQuestion = async (data: { email: string; question: string }): Promise<void> => {
    await addDoc(collection(db, 'submittedQuestions'), { ...data, submittedAt: serverTimestamp(), status: 'new' });
};


export function Faq({ content }: { content: FaqContent | null }) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const searchParams = useSearchParams();
  const cameFromAbout = searchParams.get('from') === 'about';
  const isLoading = !content;
  
  const form = useForm<QuestionFormValues>({
    resolver: zodResolver(QuestionFormSchema),
    defaultValues: {
      email: "",
      question: "",
    },
  });

  const handleQuestionSubmit = async (data: QuestionFormValues) => {
    setIsSubmitting(true);
    try {
        await submitQuestion(data);
        toast({
            title: "Question Sent!",
            description: "Thanks for reaching out. We'll review your question and may add it to our FAQs.",
        });
        form.reset();
        // Manually close dialog if needed, assuming DialogClose is used inside the form.
    } catch (error) {
        const errorMessage = (error instanceof Error) ? error.message : "There was a problem sending your question. Please try again.";
        toast({
            title: "Submission Error",
            description: errorMessage,
            variant: "destructive",
        });
    } finally {
        setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <section id="faq" className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <Skeleton className="h-8 w-24 mx-auto mb-4" />
            <Skeleton className="h-12 w-1/2 mx-auto mb-4" />
            <Skeleton className="h-6 w-3/4 mx-auto" />
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="faq" aria-labelledby="faq-heading" className="w-full bg-background pt-12 pb-12 md:pb-24 lg:pb-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-8">
            <nav aria-label="Breadcrumb" className="flex items-center text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                <ChevronRight className="h-4 w-4 mx-1" />
                {cameFromAbout && (
                  <>
                    <Link href="/about" className="hover:text-primary transition-colors">About</Link>
                    <ChevronRight className="h-4 w-4 mx-1" />
                  </>
                )}
                <span className="font-medium text-foreground">FAQs</span>
            </nav>
        </div>
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
        >
            <Badge variant="outline" className="mb-4">FAQs</Badge>
            <h1 id="faq-heading" className="text-3xl md:text-4xl font-medium text-foreground mb-4 font-body uppercase">
              {content?.title}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {content?.description}
            </p>
        </motion.div>
        <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
        >
            <Accordion type="single" collapsible className="w-full">
            {content?.faqs.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-lg font-medium text-left">{item.question}</AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">
                    {item.answer}
                </AccordionContent>
                </AccordionItem>
            ))}
            </Accordion>
        </motion.div>
        <div className="text-center mt-12">
           <Dialog onOpenChange={(open) => !open && form.reset()}>
              <DialogTrigger asChild>
                <Button size="lg">Ask a Question</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle className="uppercase">Ask Your Question</DialogTitle>
                  <DialogDescription>
                    Can't find the answer you're looking for? Fill out the form below and we'll get back to you.
                  </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleQuestionSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="your@email.com" {...field} autoComplete="email" />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="question"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Question</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="What would you like to know?" {...field} className="min-h-[120px]" />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex justify-end">
                            <DialogClose asChild>
                                <Button type="submit" disabled={isSubmitting}>
                                    {isSubmitting ? 'Submitting...' : 'Submit Question'}
                                </Button>
                            </DialogClose>
                        </div>
                    </form>
                </Form>
              </DialogContent>
            </Dialog>
        </div>
      </div>
    </section>
  );
}
