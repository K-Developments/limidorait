
"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

const faqData = [
    {
      question: "What services do you offer?",
      answer: "We offer a wide range of services including custom web development, UI/UX design, brand strategy, and mobile application development. Our goal is to provide comprehensive digital solutions tailored to your business needs."
    },
    {
      question: "How long does a typical project take?",
      answer: "The timeline for a project varies depending on its scope and complexity. A simple website might take 4-6 weeks, while a complex web application could take several months. We provide a detailed project timeline after our initial discovery phase."
    },
    {
      question: "What is your development process?",
      answer: "Our process is collaborative and transparent. We start with a discovery phase to understand your goals, followed by strategy, design, development, testing, and deployment. We maintain open communication throughout the project to ensure we're aligned with your vision."
    },
    {
      question: "How much does a project cost?",
      answer: "Project costs are based on the specific requirements and complexity of the work. We provide a detailed proposal and quote after discussing your needs. We offer flexible pricing models to accommodate various budgets."
    },
    {
      question: "Do you provide support after the project is launched?",
      answer: "Yes, we offer ongoing support and maintenance packages to ensure your website or application remains secure, up-to-date, and performs optimally. We're here to be your long-term technology partner."
    }
];
  
export function Faq() {
  return (
    <section id="faq" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
        >
            <Badge variant="outline" className="mb-4">FAQs</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Find answers to common questions about our services, processes, and how we can help your business succeed.
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
            {faqData.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-lg font-medium text-left">{item.question}</AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">
                    {item.answer}
                </AccordionContent>
                </AccordionItem>
            ))}
            </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
