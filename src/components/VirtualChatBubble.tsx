
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface VirtualChatBubbleProps {
  message: string;
  sender: string;
  role: 'judge' | 'plaintiff' | 'defense' | 'user' | 'witness';
  isActive?: boolean;
  isTyping?: boolean;
}

const VirtualChatBubble = ({ 
  message, 
  sender, 
  role, 
  isActive = false, 
  isTyping = false 
}: VirtualChatBubbleProps) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (isTyping) {
      let index = 0;
      setDisplayedText('');
      setIsComplete(false);
      
      const interval = setInterval(() => {
        if (index < message.length) {
          setDisplayedText((prev) => prev + message.charAt(index));
          index++;
        } else {
          clearInterval(interval);
          setIsComplete(true);
        }
      }, 20); // Adjust typing speed
      
      return () => clearInterval(interval);
    } else {
      setDisplayedText(message);
      setIsComplete(true);
    }
  }, [message, isTyping]);

  const getBubbleStyle = () => {
    switch(role) {
      case 'judge':
        return 'bg-purple-50 border-purple-200 text-gray-800';
      case 'plaintiff':
        return 'bg-blue-50 border-blue-200 text-gray-800';
      case 'defense':
        return 'bg-orange-50 border-orange-200 text-gray-800';
      case 'witness':
        return 'bg-green-50 border-green-200 text-gray-800';
      case 'user':
        return 'bg-gray-50 border-gray-200 text-gray-800';
      default:
        return 'bg-white border-gray-200 text-gray-800';
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`rounded-lg p-4 border shadow-sm ${getBubbleStyle()} ${
        isActive ? 'ring-2 ring-[#D4AF37]' : ''
      }`}
    >
      {sender && (
        <div className="font-semibold text-sm mb-1">
          {sender}
        </div>
      )}
      <div className="prose prose-sm max-w-none">
        {isTyping && !isComplete ? (
          <>
            {displayedText}
            <span className="inline-block w-2 h-4 bg-[#D4AF37] ml-1 animate-pulse rounded-full"></span>
          </>
        ) : (
          displayedText
        )}
      </div>
    </motion.div>
  );
};

export default VirtualChatBubble;
