
import { createChatBotMessage } from 'react-chatbot-kit';
import type { IConfig } from 'react-chatbot-kit';
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import ActionProvider from './chatbot-actions';

const config = (router: AppRouterInstance): IConfig => ({
  initialMessages: [createChatBotMessage("Welcome to Limidora! How can I help you today?")],
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
  actionProvider: (createChatBotMessage: any, setStateFunc: any, createClientMessage: any, stateRef: any, createCustomMessage: any) => {
    return new ActionProvider(createChatBotMessage, setStateFunc, router);
  },
});

export default config;
