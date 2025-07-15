
import { createChatBotMessage, type IConfig } from 'react-chatbot-kit';
import type { NextRouter } from 'next/router';

const config = (router: NextRouter): IConfig => ({
  initialMessages: [createChatBotMessage(`Welcome to Limidora! How can I help you today?`)],
  botName: 'LimidoraAssistant',
  customStyles: {
    botMessageBox: {
      backgroundColor: 'transparent',
      color: 'hsl(var(--foreground))',
    },
    chatButton: {
      backgroundColor: 'hsla(var(--primary) / 0.8)',
    },
    chatContainer: {
        width: '100%',
        height: '100%',
        boxShadow: 'none',
        border: 'none',
        background: 'transparent',
    },
    chatInnerContainer: {
      backgroundColor: 'transparent',
    },
    messagesContainer: {
        height: '100%',
        background: 'transparent',
    },
    userMessageBox: {
      backgroundColor: 'transparent',
      color: 'hsl(var(--foreground))',
    },
    chatbotContainer: {
      width: '100%',
      height: '100%',
      backgroundColor: 'transparent',
    }
  },
   state: {
    router: router,
  },
});

export default config;
