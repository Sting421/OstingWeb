import { useEffect } from 'react';
import '@n8n/chat/style.css';
import { createChat } from '@n8n/chat';
import './ChatBot.css';

const ChatBot = () => {
  useEffect(() => {
    // Initialize the n8n chat bot with the provided webhook URL
    createChat({
      webhookUrl: 'https://primary-production-1218.up.railway.app/webhook/8c6b3453-58f7-4d3c-a4df-d9b210367162/chat',
      mode: 'fullscreen',
      target: '#n8n-chat',
      showWelcomeScreen: true,
      autoStart: true, // Automatically start a new conversation without user clicking the button
      avatar: {
        src: 'https://i.imgur.com/6YQ1oPB.png', // Replace with your actual avatar URL
        name: 'Austin Assistant',
      },
      initialMessages: [
        "Hello! I'm Austin's virtual assistant. How can I help you with your real estate needs today? I'm here to answer any questions you may have about buying, selling, or financing a property."
      ],
      conversationStarters: [
        { text: "What properties are available?", value: "Can you show me what properties are currently available?" },
        { text: "Help me find a home", value: "I'm looking to buy a home. Can you help me get started?" },
        { text: "Selling my property", value: "I'm interested in selling my property. What's the process?" },
        { text: "Financing options", value: "What financing options are available for home buyers?" },
        { text: "Schedule a consultation", value: "I'd like to schedule a consultation with Austin." }
      ],
      i18n: {
        en: {
          title: 'Austin Assistant',
          subtitle: "",
          getStarted: 'New Conversation',
          inputPlaceholder: 'Type your message...',
          closeButtonTooltip: 'Close chat'
        },
      },
    });

    // Add custom CSS variables to match the blue and white design
    document.documentElement.style.setProperty('--chat--color-primary', '#2962FF');
    document.documentElement.style.setProperty('--chat--color-primary-shade-50', '#2558E6');
    document.documentElement.style.setProperty('--chat--color-primary-shade-100', '#214FCC');
    document.documentElement.style.setProperty('--chat--color-secondary', '#2962FF');
    document.documentElement.style.setProperty('--chat--color-secondary-shade-50', '#2558E6');
    document.documentElement.style.setProperty('--chat--header--background', '#2962FF');
    document.documentElement.style.setProperty('--chat--color-dark', '#333333');
    document.documentElement.style.setProperty('--chat--message--bot--background', '#F0F0F0');
    document.documentElement.style.setProperty('--chat--message--bot--color', '#333333');
    document.documentElement.style.setProperty('--chat--message--user--background', '#2962FF');
    document.documentElement.style.setProperty('--chat--message--user--color', '#FFFFFF');
    document.documentElement.style.setProperty('--chat--toggle--background', '#2962FF');
    document.documentElement.style.setProperty('--chat--toggle--hover--background', '#2558E6');
  }, []);

  return (
    <div id="n8n-chat" className="chatbot-container"></div>
  );
};

export default ChatBot;