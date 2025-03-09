import React, { useState } from 'react';
import { MessageSquare, Send, User, Bot } from 'lucide-react';
import ChatBot from '../components/ChatBot';

const NeighborhoodMapPage: React.FC = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Welcome to our Neighborhood Map! How can I help you today?", sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage = {
      id: Date.now(),
      text: inputValue,
      sender: 'user'
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputValue('');
    
    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: Date.now(),
        text: getBotResponse(inputValue),
        sender: 'bot'
      };
      setMessages(prevMessages => [...prevMessages, botResponse]);
    }, 1000);
  };
  
  const getBotResponse = (userInput: string) => {
    const input = userInput.toLowerCase();
    
    if (input.includes('neighborhood') || input.includes('area')) {
      return "This map shows various neighborhoods in Columbus, Ohio. You can click on different areas to learn more about them.";
    } else if (input.includes('property') || input.includes('house') || input.includes('home')) {
      return "Property values in these neighborhoods range from $150,000 to $500,000 depending on the location and size.";
    } else if (input.includes('school') || input.includes('education')) {
      return "Most of these neighborhoods have excellent schools with high ratings. The blue markers on the map indicate school locations.";
    } else if (input.includes('amenities') || input.includes('facilities')) {
      return "These neighborhoods offer various amenities including parks, shopping centers, and restaurants. Look for the green markers on the map.";
    } else {
      return "I'm here to help you navigate the neighborhood map. Feel free to ask about specific areas, property values, schools, or amenities.";
    }
  };

  return (
    <div className="neighborhood-map-container">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="map-wrapper flex-1">
          <iframe 
            src="https://www.google.com/maps/d/u/0/embed?mid=1A0dmA2i1Ptobe10tRuicZAba8bUN97I&ehbc=2E312F&noprof=1&ll=40.41811680866469%2C-83.001659&z=8"
            width="100%" 
            height="600px" 
            style={{ border: 0 }} 
            allowFullScreen={true} 
            loading="lazy"
            title="Neighborhood Map"
          />
        </div>
        
        <ChatBot />
      </div>
    </div>
  );
};

export default NeighborhoodMapPage;
