
"use client";

import Chatbot from 'react-chatbot-kit';
import config from '@/lib/chatbot-config';
import MessageParser from '@/lib/chatbot-parser';
import ActionProvider from '@/lib/chatbot-actions';
import { X } from 'lucide-react';
import { Button } from './ui/button';

interface RuleBasedChatbotProps {
  onClose: () => void;
}

const RuleBasedChatbot = ({ onClose }: RuleBasedChatbotProps) => {
  return (
    <div className="relative w-full h-full p-4 rounded-lg flex flex-col">
       <div className="flex justify-between items-center pb-2 border-b border-white/20 mb-2">
            <h3 className="font-bold text-lg text-white">Limidora Assistant</h3>
            <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close chat">
                <X className="h-5 w-5 text-white/80" />
            </Button>
       </div>
       <div className="flex-grow overflow-y-auto">
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
