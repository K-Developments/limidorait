
import { createChatBotMessage } from 'react-chatbot-kit';
import type { IConfig } from 'react-chatbot-kit';
import ActionProvider from './chatbot-actions';

const config: IConfig = {
  initialMessages: [createChatBotMessage("Welcome to Limidora! How can I help you today?")],
  botName: 'LimidoraAssistant',
  customComponents: {
    botAvatar: () => null,
    botChatMessage: (props: any) => {
      if (props.message.includes('<a href')) {
        return (
            <div className="react-chatbot-kit-chat-bot-message">
              <div dangerouslySetInnerHTML={{ __html: props.message }} />
            </div>
        );
      }
      return <div className="react-chatbot-kit-chat-bot-message">{props.message}</div>;
    },
  },
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
        height: 'auto',
        minHeight: '100%',
        boxShadow: 'none',
        border: 'none',
        background: 'transparent',
    },
    messagesContainer: {
        height: '100%',
        background: 'transparent',
        padding: '0 !important',
        overflow: 'visible',
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
  actionProvider: ActionProvider as any,
};

export default config;
