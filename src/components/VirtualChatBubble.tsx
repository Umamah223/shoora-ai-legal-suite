
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, User } from 'lucide-react';

interface VirtualChatBubbleProps {
  message: string;
  isUser: boolean;
  timestamp?: string;
  isTyping?: boolean;
}

const VirtualChatBubble: React.FC<VirtualChatBubbleProps> = ({
  message,
  isUser,
  timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  isTyping = false,
}) => {
  // Just for demonstration, show typing indicator for a few seconds
  const [showTyping, setShowTyping] = useState(isTyping);

  // Conditionally render typing indicator or message
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div className={`flex max-w-[80%] ${isUser ? 'flex-row-reverse' : ''}`}>
        <div
          className={`flex items-center justify-center h-8 w-8 rounded-full mr-2 ${
            isUser ? 'bg-shoora-gold ml-2 mr-0' : 'bg-gray-200'
          }`}
        >
          {isUser ? <User className="h-4 w-4 text-white" /> : <MessageCircle className="h-4 w-4 text-gray-600" />}
        </div>
        <div
          className={`py-3 px-4 rounded-xl ${
            isUser
              ? 'bg-shoora-gold text-white rounded-tr-none'
              : 'bg-gray-100 text-gray-800 rounded-tl-none'
          }`}
        >
          {showTyping ? (
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-current rounded-full animate-pulse" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-current rounded-full animate-pulse" style={{ animationDelay: '100ms' }}></div>
              <div className="w-2 h-2 bg-current rounded-full animate-pulse" style={{ animationDelay: '200ms' }}></div>
              <div className="w-2 h-2 bg-current rounded-full animate-pulse" style={{ animationDelay: '300ms' }}></div>
              <div className="w-2 h-2 bg-current rounded-full animate-pulse" style={{ animationDelay: '400ms' }}></div>
            </div>
          ) : (
            <p className="whitespace-pre-wrap">{message}</p>
          )}
          <div className={`text-xs mt-1 ${isUser ? 'text-white/70' : 'text-gray-500'}`}>{timestamp}</div>
        </div>
      </div>
    </motion.div>
  );
};

export default VirtualChatBubble;
