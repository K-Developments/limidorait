
"use client";

import { useState } from 'react';
import Chatbot from 'react-chatbot-kit';
import config from '@/lib/chatbot-config';
import MessageParser from '@/lib/chatbot-parser';
import ActionProvider from '@/lib/chatbot-actions';
import { Button } from './ui/button';
import { MessageSquare, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);

  const chatbotWindowVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: 30, scale: 0.95 }
  };

  return (
    <>
      <Button 
        size="icon"
        className="fixed bottom-6 left-6 h-16 w-16 rounded-full shadow-lg z-50"
        onClick={() => setIsOpen(true)}
        aria-label="Open Chatbot"
      >
        <MessageSquare className="h-8 w-8" />
      </Button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={chatbotWindowVariants}
            transition={{ type: 'spring', stiffness: 200, damping: 25 }}
            className="fixed bottom-24 left-6 w-full max-w-sm h-[500px] bg-background border rounded-lg shadow-2xl z-50 flex flex-col"
          >
            <header className="flex items-center justify-between p-4 border-b">
                <h3 className="font-semibold text-lg">Limidora Assistant</h3>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} aria-label="Close Chatbot">
                    <X className="h-5 w-5" />
                </Button>
            </header>
            <div className="flex-grow p-4 overflow-y-auto">
                 <Chatbot
                    config={config}
                    messageParser={MessageParser}
                    actionProvider={ActionProvider}
                />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
