import { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, User, Bot } from 'lucide-react';
import '../ChatBot.css';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm Austin's virtual assistant. How can I help you with your real estate needs today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Scroll only the messages container to the bottom
  const scrollToBottom = () => {
    if (messagesEndRef.current && messagesContainerRef.current) {
      const scrollContainer = messagesContainerRef.current;
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputValue('');
    setIsLoading(true);
    
    // Simulate bot response after a delay
    setTimeout(() => {
      const botResponse: Message = {
        id: Date.now(),
        text: getBotResponse(inputValue),
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prevMessages => [...prevMessages, botResponse]);
      setIsLoading(false);
    }, 1500);
  };
  
  // Simple bot response logic
  const getBotResponse = (userInput: string) => {
    const input = userInput.toLowerCase();
    
    if (input.includes('hello') || input.includes('hi') || input.includes('hey')) {
      return "Hello! How can I assist you with your real estate needs today?";
    } else if (input.includes('property') || input.includes('house') || input.includes('home')) {
      return "I have several properties that might interest you. Would you like to see our listings page?";
    } else if (input.includes('price') || input.includes('cost') || input.includes('afford')) {
      return "Property prices in Austin vary by neighborhood. We have homes starting from $250,000. Would you like to use our mortgage calculator to see what you can afford?";
    } else if (input.includes('location') || input.includes('area') || input.includes('neighborhood')) {
      return "Austin has many great neighborhoods like Downtown, South Congress, Westlake, and Round Rock. Which area are you interested in?";
    } else if (input.includes('contact') || input.includes('call') || input.includes('email')) {
      return "You can reach us at contact@austinmcclain.com or call (512) 555-1234. Would you like me to schedule a consultation for you?";
    } else if (input.includes('buy') || input.includes('purchase')) {
      return "Looking to buy a property? That's great! I can help you find the perfect home. What's your budget range and preferred location?";
    } else if (input.includes('sell') || input.includes('selling')) {
      return "Interested in selling your property? We can help you get the best value. Would you like to schedule a property valuation?";
    } else if (input.includes('mortgage') || input.includes('loan') || input.includes('finance')) {
      return "We work with several trusted mortgage providers. Our calculator can help you estimate monthly payments based on your down payment and interest rate.";
    } else {
      return "Thank you for your message. How else can I help you with your real estate journey?";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden max-w-md mx-auto border border-gray-200">
      <div className="bg-blue-600 text-white p-4 flex items-center gap-2">
        <MessageSquare className="h-6 w-6" />
        <h2 className="font-semibold">Austin McClain Real Estate Assistant</h2>
      </div>
      
      <div 
        ref={messagesContainerRef}
        className="h-96 overflow-y-auto p-4 bg-gray-50 scroll-smooth"
      >
        {messages.map(message => (
          <div 
            key={message.id} 
            className={`flex mb-4 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {message.sender === 'bot' && (
              <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white mr-2 flex-shrink-0">
                <Bot size={18} />
              </div>
            )}
            
            <div 
              className={`max-w-[80%] rounded-lg p-3 ${
                message.sender === 'user' 
                  ? 'bg-blue-600 text-white rounded-tr-none' 
                  : 'bg-gray-200 text-gray-800 rounded-tl-none'
              }`}
            >
              <p className="text-sm">{message.text}</p>
              <span className={`text-xs mt-1 block ${message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
            
            {message.sender === 'user' && (
              <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center text-white ml-2 flex-shrink-0">
                <User size={18} />
              </div>
            )}
          </div>
        ))}
        
        {isLoading && (
          <div className="flex mb-4 justify-start">
            <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white mr-2 flex-shrink-0">
              <Bot size={18} />
            </div>
            <div className="bg-gray-200 text-gray-800 rounded-lg rounded-tl-none p-3">
              <div className="flex space-x-1">
                <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '200ms' }}></span>
                <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '400ms' }}></span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSubmit} className="p-3 border-t border-gray-200 flex">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Type your message..."
          className="flex-1 border border-gray-300 rounded-l-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button 
          type="submit" 
          className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-center"
        >
          <Send size={18} />
        </button>
      </form>
      
      <div className="bg-gray-50 p-2 text-center border-t border-gray-200">
        <span className="text-xs text-gray-500">Powered by ProttoBots</span>
      </div>
    </div>
  );
}

export default ChatBot;
