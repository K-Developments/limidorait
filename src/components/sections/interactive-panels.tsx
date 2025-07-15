
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
  const [activePanel, setActivePanel] = useState<Panel>('faq');

  const handlePanelClick = (panel: Panel) => {
    setActivePanel(panel);
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    // On mobile, instead of closing, we could set a default or do nothing.
    // For now, let's prevent closing on any screen if it's the only one open.
    // To allow closing, we would set it to null.
    // setActivePanel(null);
  }

  const panels = Object.keys(panelData) as Panel[];

  return (
    <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:h-[400px] rounded-lg overflow-hidden border">
            {panels.map((panelId) => {
                const isActive = activePanel === panelId;
                const isInactive = activePanel !== null && !isActive;

                return (
                    <motion.div
                        key={panelId}
                        layout
                        onClick={() => handlePanelClick(panelId)}
                        className={cn(
                            "relative overflow-hidden cursor-pointer h-48 md:h-auto border-b md:border-b-0 md:border-r last:border-b-0 last:md:border-r-0",
                        )}
                        style={{
                            flexBasis: isInactive ? '10%' : isActive ? '80%' : '33.33%',
                            flexGrow: isInactive ? 0.001 : isActive ? 1 : 0.5,
                        }}
                        transition={{ type: "spring", stiffness: 100, damping: 20 }}
                    >
                        <motion.div 
                            className="absolute inset-0 w-full h-full"
                            initial={{ scale: 1.05 }}
                            animate={{ scale: isActive ? 1.1 : 1.05 }}
                            transition={{ type: "spring", stiffness: 100, damping: 20 }}
                        >
                            <Image
                                src={panelData[panelId].imageUrl}
                                alt={panelData[panelId].title}
                                fill
                                className="object-cover"
                                data-ai-hint={panelData[panelId].aiHint}
                            />
                        </motion.div>
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
                             {isInactive && (
                                <motion.h3 
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: 20 }}
                                  className="text-2xl font-bold [writing-mode:vertical-rl] rotate-180"
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
                                    <button onClick={handleClose} className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 p-2 rounded-full z-20 hidden md:block">
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
