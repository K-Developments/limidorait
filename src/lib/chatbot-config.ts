
import { createChatBotMessage, type IConfig } from 'react-chatbot-kit';

const config: IConfig = {
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
    }
  },
};

export default config;
