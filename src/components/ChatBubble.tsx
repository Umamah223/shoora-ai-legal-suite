
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface ChatBubbleProps {
  message: string;
  isUser: boolean;
  isTyping?: boolean;
}

const ChatBubble = ({ message, isUser, isTyping = false }: ChatBubbleProps) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (isTyping && !isUser) {
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
      }, 15); // Adjust typing speed
      
      return () => clearInterval(interval);
    } else {
      setDisplayedText(message);
      setIsComplete(true);
    }
  }, [message, isTyping, isUser]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`rounded-lg p-4 max-w-[80%] ${
        isUser 
          ? 'bg-[#F0E6C6] ml-auto text-gray-800' 
          : 'bg-white border border-[#D4AF37]/20 mr-auto shadow-sm'
      }`}
    >
      {isUser ? (
        <div className="font-medium">{message}</div>
      ) : (
        <div className="prose prose-sm max-w-none text-gray-700">
          {isTyping && !isComplete ? (
            <>
              {displayedText}
              <span className="inline-block w-2 h-4 bg-[#D4AF37] ml-1 animate-pulse rounded-full"></span>
            </>
          ) : (
            displayedText
          )}
        </div>
      )}
    </motion.div>
  );
};

export default ChatBubble;
