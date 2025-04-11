
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatBubble from '@/components/ChatBubble';

interface Message {
  id: string;
  content: string;
  role: 'judge' | 'plaintiff' | 'defense' | 'user';
}

const initialMessages: Message[] = [
  {
    id: '1',
    content: "Welcome to today's hearing. We are here to address the case of John Doe vs. ABC Corporation. Plaintiff, please present your opening statement",
    role: 'judge'
  },
  {
    id: '2',
    content: "Your Honor, I was wrongfully terminated from my job at ABC Corporation without proper cause. I seek justice and compensation for my losses.",
    role: 'plaintiff'
  },
  {
    id: '3',
    content: "Understood. Defense, how do you respond?",
    role: 'judge'
  },
  {
    id: '4',
    content: "Your Honor, the contract specified conditions that Mr. Doe did not meet. We had outlined performance benchmarks, and his failure to meet them justified the withheld payment.",
    role: 'defense'
  }
];

const CourtSimulation = () => {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const handleUserMessage = () => {
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      role: 'user'
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    
    // Simulate response delay
    setTimeout(() => {
      let response: Message;
      
      // Judge's response
      if (Math.random() > 0.5) {
        response = {
          id: (Date.now() + 1).toString(),
          content: "Thank you for your argument. Let me consider that point. Can the defense respond to this specific claim?",
          role: 'judge'
        };
      } else {
        // Defense's response
        response = {
          id: (Date.now() + 1).toString(),
          content: "Your Honor, we would like to contest this claim. The plaintiff was given multiple warnings and opportunities to address performance issues, as documented in our HR records.",
          role: 'defense'
        };
      }
      
      setMessages((prev) => [...prev, response]);
      setIsTyping(false);
    }, 1500);
  };
  
  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="bg-gray-100 py-8 px-4">
          <div className="container mx-auto max-w-6xl">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold text-center mb-8"
            >
              Virtual Court Simulation - Contract Dispute Resolution
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg overflow-hidden shadow-lg"
            >
              <div className="relative">
                {/* Court scene image */}
                <img
                  src="/public/lovable-uploads/024e5132-d431-40bb-8a1c-e7105a2cf5dd.png"
                  alt="Virtual Courtroom"
                  className="w-full h-[400px] object-cover"
                />
                
                {/* Chat bubbles overlaid on the court image */}
                <div className="absolute inset-0 p-4 overflow-y-auto">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`max-w-[90%] md:max-w-[60%] mb-4 ${
                        msg.role === 'judge' 
                          ? 'mr-auto ml-auto text-center' 
                          : msg.role === 'plaintiff'
                            ? 'mr-auto'
                            : msg.role === 'defense'
                              ? 'ml-auto'
                              : 'mr-auto'
                      }`}
                    >
                      <div className={`
                        rounded-lg p-3 shadow-md 
                        ${msg.role === 'judge' 
                          ? 'bg-white text-black' 
                          : msg.role === 'plaintiff'
                            ? 'bg-blue-100 text-blue-800'
                            : msg.role === 'defense'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                        }
                      `}>
                        {msg.content}
                      </div>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="max-w-[60%] mr-auto">
                      <div className="bg-white rounded-lg p-3 shadow-md">
                        <span className="typing-indicator">Typing</span>
                      </div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>
              </div>
              
              {/* User input area */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex items-center gap-2">
                  <div className="flex-grow">
                    <textarea
                      placeholder="Your Response to the current court proceeding ..."
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-shoora-gold/50 min-h-[80px] resize-none"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleUserMessage();
                        }
                      }}
                    />
                  </div>
                  
                  <button
                    onClick={handleUserMessage}
                    className="shoora-btn-primary h-10"
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </motion.div>
            
            <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">About This Simulation</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Learning Objectives</h3>
                  <ul className="list-disc pl-5 space-y-1 text-gray-700">
                    <li>Practice constructing persuasive legal arguments</li>
                    <li>Gain familiarity with court procedures and etiquette</li>
                    <li>Learn how to respond to opposing counsel's arguments</li>
                    <li>Understand how courts evaluate contractual disputes</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Case Details</h3>
                  <p className="text-gray-700 mb-4">
                    This simulation involves a wrongful termination dispute. The plaintiff claims they were terminated without proper cause, while the defense argues that performance benchmarks were not met.
                  </p>
                  <p className="text-gray-700">
                    Practice constructing arguments based on UAE labor law and contract law principles.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CourtSimulation;
