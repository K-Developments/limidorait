"use client";

import Chatbot from 'react-chatbot-kit';
import config from '@/lib/chatbot-config.tsx';
import MessageParser from '@/lib/chatbot-parser';
import ActionProvider from '@/lib/chatbot-actions';
import { X } from 'lucide-react';
import { Button } from './ui/button';

interface RuleBasedChatbotProps {
  onClose: () => void;
}

const RuleBasedChatbot = ({ onClose }: RuleBasedChatbotProps) => {
  return (
    <div className="relative w-full h-full p-0">
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={onClose} 
        aria-label="Close chat"
        className="absolute top-2 right-2 z-20 text-foreground hover:bg-white/20"
      >
        <X className="h-5 w-5" />
      </Button>
      <div className="w-full h-full">
        <Chatbot
          config={config}
          messageParser={MessageParser}
          actionProvider={ActionProvider}
        />
      </div>
    </div>
  );
};

export default RuleBasedChatbot;
