
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
      className={`chat-bubble ${isUser ? 'chat-bubble-user' : 'chat-bubble-assistant'}`}
    >
      {isUser ? (
        <div>{message}</div>
      ) : (
        <div>
          {isTyping && !isComplete ? (
            <>
              {displayedText}
              <span className="typing-indicator"></span>
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
