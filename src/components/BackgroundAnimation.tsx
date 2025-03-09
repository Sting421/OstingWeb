import React, { useEffect, useState } from 'react';
import './BackgroundAnimation.css';

interface AnimatedElement {
  id: number;
  type: string;
  left: string;
  delay: string;
  duration: string;
  size: string;
}

const BackgroundAnimation: React.FC = () => {
  const [elements, setElements] = useState<AnimatedElement[]>([]);
  
  useEffect(() => {
    // Generate random animated elements
    const generateElements = () => {
      const types = ['house1', 'house2', 'house3', 'key', 'location'];
      const newElements: AnimatedElement[] = [];
      
      // Create 15 random elements
      for (let i = 0; i < 15; i++) {
        newElements.push({
          id: i,
          type: types[Math.floor(Math.random() * types.length)],
          left: `${Math.random() * 100}%`,
          delay: `${Math.random() * 15}s`,
          duration: `${15 + Math.random() * 20}s`,
          size: `${30 + Math.random() * 40}px`
        });
      }
      
      setElements(newElements);
    };
    
    generateElements();
    
    // Regenerate elements periodically for variety
    const interval = setInterval(() => {
      generateElements();
    }, 30000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="background-animation">
      <div className="grid-pattern"></div>
      <div className="gradient-bg"></div>
      
      {elements.map((element) => (
        <div
          key={element.id}
          className={`house ${element.type}`}
          style={{
            left: element.left,
            width: element.size,
            height: element.size,
            animationDelay: element.delay,
            animationDuration: element.duration
          }}
        />
      ))}
    </div>
  );
};

export default BackgroundAnimation;
