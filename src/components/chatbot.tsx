
"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CornerDownLeft, X, Bot } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { chat } from "@/ai/flows/chat";
import { useToast } from "@/hooks/use-toast";

interface Message {
  role: "user" | "bot";
  text: string;
}

interface ChatbotProps {
  onClose: () => void;
}

export function Chatbot({ onClose }: ChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: "Hello! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (input.trim() === "" || isLoading) return;

    const userMessage: Message = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const history = [...messages, userMessage]
        .map((m) => `${m.role}: ${m.text}`)
        .join("\n");
      
      const botResponse = await chat({ history });
      
      setMessages((prev) => [...prev, { role: "bot", text: botResponse.response }]);
    } catch (error) {
      console.error("Chatbot error:", error);
      toast({
        title: "Error",
        description: "Sorry, I couldn't get a response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="relative w-full max-w-lg h-[70vh] bg-card/80 backdrop-blur-lg border border-border/20 rounded-lg shadow-2xl flex flex-col"
    >
      <header className="flex items-center justify-between p-4 border-b border-border/20">
        <div className="flex items-center gap-3">
          <Bot className="h-6 w-6 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Limidora Assistant</h2>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-5 w-5 text-muted-foreground" />
        </Button>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={index}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`flex items-end gap-2 ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {message.role === 'bot' && (
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <Bot className="h-5 w-5 text-primary" />
                </div>
              )}
              <div
                className={`max-w-[75%] rounded-lg px-4 py-2 ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                <p className="text-sm break-words">{message.text}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-end gap-2 justify-start"
          >
            <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                <Bot className="h-5 w-5 text-primary" />
            </div>
            <div className="max-w-[75%] rounded-lg px-4 py-3 bg-muted">
              <div className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 bg-primary rounded-full animate-pulse [animation-delay:-0.3s]"></span>
                  <span className="h-1.5 w-1.5 bg-primary rounded-full animate-pulse [animation-delay:-0.15s]"></span>
                  <span className="h-1.5 w-1.5 bg-primary rounded-full animate-pulse"></span>
              </div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-border/20">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="relative"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything..."
            className="pr-12 bg-background/50"
            disabled={isLoading}
          />
          <Button
            type="submit"
            size="icon"
            variant="ghost"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
            disabled={isLoading || input.trim() === ""}
          >
            <CornerDownLeft className="h-5 w-5" />
          </Button>
        </form>
      </div>
    </motion.div>
  );
}
