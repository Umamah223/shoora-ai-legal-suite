
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, MessageSquare, Info, Users, Settings, HelpCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

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
      
      <main className="flex-grow bg-gray-100">
        <div className="container mx-auto max-w-6xl py-8 px-4">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-center mb-6"
          >
            Virtual Court Simulation
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-gray-600 text-center mb-8 max-w-3xl mx-auto"
          >
            Experience an immersive virtual courtroom environment to practice and learn about legal proceedings
          </motion.p>
          
          <div className="flex flex-col lg:flex-row gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="lg:w-3/4 bg-white rounded-lg overflow-hidden shadow-lg"
            >
              <div className="relative">
                {/* Court scene image */}
                <img
                  src="/public/lovable-uploads/af3c0ae6-44e0-4ef8-92be-70cae312e9ee.png"
                  alt="Virtual Courtroom"
                  className="w-full h-[450px] object-cover"
                />
                
                {/* Chat bubbles overlaid on the court image */}
                <div className="absolute inset-0 p-4 overflow-y-auto">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`max-w-[80%] md:max-w-[60%] mb-4 ${
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
                          ? 'bg-white/80 text-black' 
                          : msg.role === 'plaintiff'
                            ? 'bg-blue-100/90 text-blue-800'
                            : msg.role === 'defense'
                              ? 'bg-green-100/90 text-green-800'
                              : 'bg-gray-100/90 text-gray-800'
                        }
                      `}>
                        <div className="text-xs font-semibold mb-1">
                          {msg.role.charAt(0).toUpperCase() + msg.role.slice(1)}
                        </div>
                        {msg.content}
                      </div>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="max-w-[60%] mr-auto">
                      <div className="bg-white/80 rounded-lg p-3 shadow-md">
                        <div className="text-xs font-semibold mb-1">
                          Judge
                        </div>
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
                      placeholder="Enter your statement or response..."
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
                    className="bg-[#D4AF37] text-white p-3 rounded-lg hover:bg-[#D4AF37]/80 h-12 w-12 flex items-center justify-center"
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:w-1/4 space-y-6"
            >
              {/* Simulation controls */}
              <div className="bg-white p-5 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Settings className="w-5 h-5 text-[#D4AF37]" />
                  Simulation Settings
                </h3>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Case Type
                    </label>
                    <select className="w-full border border-gray-300 rounded-md p-2">
                      <option>Employment Dispute</option>
                      <option>Contract Breach</option>
                      <option>Property Dispute</option>
                      <option>Family Law Case</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Difficulty Level
                    </label>
                    <select className="w-full border border-gray-300 rounded-md p-2">
                      <option>Beginner</option>
                      <option>Intermediate</option>
                      <option>Advanced</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Your Role
                    </label>
                    <select className="w-full border border-gray-300 rounded-md p-2">
                      <option>Plaintiff</option>
                      <option>Defense</option>
                      <option>Observer</option>
                    </select>
                  </div>
                </div>
              </div>
              
              {/* Participants */}
              <div className="bg-white p-5 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#D4AF37]" />
                  Participants
                </h3>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                      P
                    </div>
                    <div>
                      <div className="font-medium">John Doe</div>
                      <div className="text-xs text-gray-500">Plaintiff</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold">
                      D
                    </div>
                    <div>
                      <div className="font-medium">ABC Corporation</div>
                      <div className="text-xs text-gray-500">Defense</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold">
                      J
                    </div>
                    <div>
                      <div className="font-medium">Hon. Jane Smith</div>
                      <div className="text-xs text-gray-500">Judge</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 font-bold">
                      Y
                    </div>
                    <div>
                      <div className="font-medium">You</div>
                      <div className="text-xs text-gray-500">Observer</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Help */}
              <div className="bg-white p-5 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-[#D4AF37]" />
                  Help & Resources
                </h3>
                
                <div className="space-y-2">
                  <button className="w-full text-left px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-md transition-colors">
                    How to participate effectively
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-md transition-colors">
                    Court etiquette and procedures
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-md transition-colors">
                    Legal terminology reference
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-md transition-colors">
                    View case precedents
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
          
          <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">About This Simulation</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
                  <Info className="w-5 h-5 text-[#D4AF37]" />
                  Learning Objectives
                </h3>
                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                  <li>Practice constructing persuasive legal arguments</li>
                  <li>Gain familiarity with court procedures and etiquette</li>
                  <li>Learn how to respond to opposing counsel's arguments</li>
                  <li>Understand how courts evaluate contractual disputes</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-[#D4AF37]" />
                  Case Details
                </h3>
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
      </main>
      
      <Footer />
    </div>
  );
};

export default CourtSimulation;
