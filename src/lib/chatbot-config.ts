
import { createChatBotMessage, type IConfig } from 'react-chatbot-kit';

const config: IConfig = {
  initialMessages: [createChatBotMessage(`Welcome to Limidora! How can I help you today?`)],
  botName: 'LimidoraAssistant',
  customStyles: {
    botMessageBox: {
      backgroundColor: 'hsl(var(--primary))',
    },
    chatButton: {
      backgroundColor: 'hsl(var(--primary))',
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
      backgroundColor: 'hsl(var(--secondary))',
      color: 'hsl(var(--secondary-foreground))',
    },
    chatbotContainer: {
      width: '100%',
      height: '100%',
    }
  },
};

export default config;
