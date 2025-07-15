
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { X } from "lucide-react";

type Panel = "faq" | "testimonials" | "solutions";

const panelData = {
  faq: {
    title: "FAQs",
    imageUrl: "https://placehold.co/800x600.png",
    aiHint: "question mark abstract",
    content: {
        title: "Frequently Asked Questions",
        text: "Find answers to common questions about our services, processes, and technology. We believe in transparency and are here to provide the clarity you need.",
    }
  },
  testimonials: {
    title: "Testimonials",
    imageUrl: "https://placehold.co/800x600.png",
    aiHint: "customer review happy",
    content: {
        title: "What Our Clients Say",
        text: "Our clients' success is our success. Read stories and testimonials from businesses we've helped transform with our digital solutions.",
    }
  },
  solutions: {
    title: "Solutions",
    imageUrl: "https://placehold.co/800x600.png",
    aiHint: "business solution puzzle",
    content: {
        title: "Our Service Overview",
        text: "From web development and UI/UX design to comprehensive brand strategies, we offer a full suite of services to bring your digital vision to life.",
    }
  },
};

export function InteractivePanels() {
  const [activePanel, setActivePanel] = useState<Panel | null>(null);

  const handlePanelClick = (panel: Panel) => {
    setActivePanel(panel);
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActivePanel(null);
  }

  return (
    <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 md:h-[400px] gap-4">
            {(Object.keys(panelData) as Panel[]).map((panelId) => {
                const isHidden = activePanel && activePanel !== panelId;
                const isActive = activePanel === panelId;

                return (
                    <motion.div
                        key={panelId}
                        layout
                        onClick={() => handlePanelClick(panelId)}
                        className={cn(
                            "relative rounded-lg overflow-hidden cursor-pointer h-48 md:h-auto",
                            isActive ? "md:col-span-3" : "md:col-span-1",
                            isHidden ? "hidden" : "block"
                        )}
                        transition={{ duration: 0.5, type: "spring" }}
                    >
                        <Image
                            src={panelData[panelId].imageUrl}
                            alt={panelData[panelId].title}
                            fill
                            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                            data-ai-hint={panelData[panelId].aiHint}
                        />
                         <div className="absolute inset-0 bg-black/50" />
                         <div className="relative z-10 flex flex-col justify-end h-full p-6 text-white">
                           <AnimatePresence>
                            {!activePanel && (
                                <motion.h3 
                                    initial={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 20 }}
                                    className="text-2xl font-bold"
                                >
                                    {panelData[panelId].title}
                                </motion.h3>
                            )}
                            </AnimatePresence>

                            <AnimatePresence>
                            {isActive && (
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 30 }}
                                    transition={{ delay: 0.3 }}
                                    className="space-y-4"
                                >
                                    <button onClick={handleClose} className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 p-2 rounded-full z-20">
                                        <X className="h-6 w-6 text-white"/>
                                        <span className="sr-only">Close</span>
                                    </button>
                                    <h3 className="text-4xl font-bold">{panelData[panelId].content.title}</h3>
                                    <p className="text-lg max-w-2xl">{panelData[panelId].content.text}</p>
                                </motion.div>
                            )}
                            </AnimatePresence>
                         </div>
                    </motion.div>
                );
            })}
        </div>
    </div>
  );
}
