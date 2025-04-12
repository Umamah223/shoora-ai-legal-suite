
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, MessageSquare, Info, Users, Settings, HelpCircle, Award, FileText } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatBubble from '@/components/ChatBubble';

interface Message {
  id: string;
  content: string;
  role: 'judge' | 'plaintiff' | 'defense' | 'user';
  animation?: 'gesture' | 'nod' | 'headTurn';
}

interface Participant {
  id: string;
  name: string;
  role: 'judge' | 'plaintiff' | 'defense' | 'observer';
  avatar: string;
  position: 'left' | 'center' | 'right' | 'far-right';
}

const initialMessages: Message[] = [
  {
    id: '1',
    content: "Welcome to today's hearing. We are here to address the case of John Doe vs. ABC Corporation regarding a contract dispute. Plaintiff, please present your opening statement.",
    role: 'judge',
    animation: 'gesture'
  },
  {
    id: '2',
    content: "Your Honor, my client entered into a service agreement with ABC Corporation for software development services. Despite fulfilling all requirements, the defendant has failed to make the final payment of AED 75,000 as stipulated in clause 4.2 of our contract.",
    role: 'plaintiff',
    animation: 'nod'
  },
  {
    id: '3',
    content: "Thank you. Defense, how do you respond to these allegations?",
    role: 'judge',
    animation: 'headTurn'
  },
  {
    id: '4',
    content: "Your Honor, we contest this claim. The contract specified conditions that Mr. Doe did not meet. We had outlined performance benchmarks in section 3.1, and his failure to meet them justified the withheld payment.",
    role: 'defense'
  }
];

const participants: Participant[] = [
  {
    id: '1',
    name: 'Hon. Mohammed Al Qasimi',
    role: 'judge',
    avatar: '/public/lovable-uploads/af3c0ae6-44e0-4ef8-92be-70cae312e9ee.png',
    position: 'center'
  },
  {
    id: '2',
    name: 'John Doe',
    role: 'plaintiff',
    avatar: '/public/lovable-uploads/af3c0ae6-44e0-4ef8-92be-70cae312e9ee.png',
    position: 'left'
  },
  {
    id: '3',
    name: 'ABC Corporation',
    role: 'defense',
    avatar: '/public/lovable-uploads/af3c0ae6-44e0-4ef8-92be-70cae312e9ee.png',
    position: 'right'
  },
  {
    id: '4',
    name: 'You',
    role: 'observer',
    avatar: '/public/lovable-uploads/af3c0ae6-44e0-4ef8-92be-70cae312e9ee.png',
    position: 'far-right'
  }
];

const caseTypes = [
  { id: 'contract', name: 'Contract Dispute' },
  { id: 'employment', name: 'Employment Termination' },
  { id: 'property', name: 'Property Dispute' },
  { id: 'family', name: 'Family Law Case' },
  { id: 'tenant', name: 'Tenant Disagreement' }
];

const difficultyLevels = [
  { id: 'beginner', name: 'Beginner' },
  { id: 'intermediate', name: 'Intermediate' },
  { id: 'expert', name: 'Expert' }
];

const userRoles = [
  { id: 'plaintiff', name: 'Plaintiff' },
  { id: 'defense', name: 'Defense' },
  { id: 'judge', name: 'Judge' },
  { id: 'observer', name: 'Observer' }
];

const CourtSimulation = () => {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isTyping, setIsTyping] = useState(false);
  const [activeSpeaker, setActiveSpeaker] = useState<string | null>(null);
  const [caseType, setCaseType] = useState('contract');
  const [difficultyLevel, setDifficultyLevel] = useState('beginner');
  const [userRole, setUserRole] = useState('observer');
  const [isMobileControlsOpen, setIsMobileControlsOpen] = useState(false);
  
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
    setActiveSpeaker(userRole === 'plaintiff' ? '2' : userRole === 'defense' ? '3' : '4');
    
    // Simulate response delay
    setTimeout(() => {
      setActiveSpeaker('1'); // Judge speaks next
      
      // After a delay for judge to start speaking
      setTimeout(() => {
        let response: Message;
        
        // Judge's response
        if (Math.random() > 0.5) {
          response = {
            id: (Date.now() + 1).toString(),
            content: "Thank you for your argument. I'll consider that point. The defense raises an important consideration about clause 3.1. According to UAE Civil Code Article 246, both parties must fulfill contractual obligations as per the specifics of the agreement. Can the plaintiff address the performance benchmarks mentioned?",
            role: 'judge',
            animation: 'gesture'
          };
        } else {
          // Defense's response
          setActiveSpeaker('3');
          response = {
            id: (Date.now() + 1).toString(),
            content: "Your Honor, we have documentation showing that the deliverables failed to meet the quality standards specified in section 3.1 of our agreement. Article 272 of UAE Civil Code provides that a contract may be set aside if one party fails to perform their obligations. We have evidence of the plaintiff's failure to meet these standards.",
            role: 'defense',
            animation: 'headTurn'
          };
        }
        
        setMessages((prev) => [...prev, response]);
        setIsTyping(false);
        setTimeout(() => setActiveSpeaker(null), 2000);
      }, 1000);
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
            Experience an immersive virtual courtroom environment to practice and learn about UAE legal proceedings
          </motion.p>
          
          <div className="flex flex-col lg:flex-row gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="lg:w-3/4 bg-white rounded-lg overflow-hidden shadow-lg"
            >
              <div className="relative">
                {/* Court scene background */}
                <div className="w-full h-[450px] bg-gradient-to-b from-[#e6e9f0] to-[#eef1f5] relative overflow-hidden">
                  <div className="absolute inset-0 bg-[url('/public/lovable-uploads/af3c0ae6-44e0-4ef8-92be-70cae312e9ee.png')] bg-cover bg-center opacity-10"></div>
                  
                  {/* Court bench */}
                  <div className="absolute bottom-0 left-0 right-0 h-24 bg-[#c1c161] bg-opacity-30 border-t-4 border-[#8a7b4c]"></div>
                  
                  {/* Participants */}
                  <div className="absolute bottom-24 left-0 right-0 px-4 flex justify-between">
                    {/* Judge */}
                    <div className={`w-1/4 relative ${activeSpeaker === '1' ? 'scale-105' : ''} transition-transform duration-300`}>
                      <motion.div 
                        className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
                        animate={activeSpeaker === '1' && messages[messages.length - 1]?.animation === 'gesture' 
                          ? { y: [0, -5, 0], x: [0, 5, 0] } 
                          : activeSpeaker === '1' && messages[messages.length - 1]?.animation === 'nod'
                          ? { rotate: [0, 5, 0, -5, 0] }
                          : {}}
                        transition={{ duration: 1, repeat: 1 }}
                      >
                        <div className="flex flex-col items-center">
                          <div className="text-xs font-bold mb-1 bg-[#D946EF] text-white px-2 py-0.5 rounded-full">
                            Judge
                          </div>
                          <img src={participants[0].avatar} alt="Judge" className="h-28 object-contain" />
                        </div>
                      </motion.div>
                    </div>
                    
                    {/* Plaintiff */}
                    <div className={`w-1/4 relative ${activeSpeaker === '2' ? 'scale-105' : ''} transition-transform duration-300`}>
                      <motion.div 
                        className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
                        animate={activeSpeaker === '2' ? { y: [0, -3, 0] } : {}}
                        transition={{ duration: 0.5, repeat: 2 }}
                      >
                        <div className="flex flex-col items-center">
                          <div className="text-xs font-bold mb-1 bg-[#3B82F6] text-white px-2 py-0.5 rounded-full">
                            Plaintiff
                          </div>
                          <img src={participants[1].avatar} alt="Plaintiff" className="h-24 object-contain" />
                        </div>
                      </motion.div>
                    </div>
                    
                    {/* Defense */}
                    <div className={`w-1/4 relative ${activeSpeaker === '3' ? 'scale-105' : ''} transition-transform duration-300`}>
                      <motion.div 
                        className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
                        animate={activeSpeaker === '3' ? { x: [0, 3, 0, -3, 0] } : {}}
                        transition={{ duration: 0.8, repeat: 2 }}
                      >
                        <div className="flex flex-col items-center">
                          <div className="text-xs font-bold mb-1 bg-[#F97316] text-white px-2 py-0.5 rounded-full">
                            Defense
                          </div>
                          <img src={participants[2].avatar} alt="Defense" className="h-24 object-contain" />
                        </div>
                      </motion.div>
                    </div>
                    
                    {/* User/Observer */}
                    <div className={`w-1/4 relative ${activeSpeaker === '4' ? 'scale-105' : ''} transition-transform duration-300`}>
                      <motion.div 
                        className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
                        animate={activeSpeaker === '4' ? { y: [0, -2, 0], scale: [1, 1.05, 1] } : {}}
                        transition={{ duration: 0.5, repeat: 2 }}
                      >
                        <div className="flex flex-col items-center">
                          <div className="text-xs font-bold mb-1 bg-gray-700 text-white px-2 py-0.5 rounded-full">
                            {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
                          </div>
                          <img src={participants[3].avatar} alt="User" className="h-20 object-contain" />
                        </div>
                      </motion.div>
                    </div>
                  </div>
                  
                  {/* Chat bubbles overlaid on the court image */}
                  <div className="absolute inset-0 p-4 overflow-y-auto">
                    <div className="space-y-4 mb-32">
                      {messages.map((msg, index) => (
                        <AnimatePresence key={msg.id} mode="wait">
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className={`max-w-[80%] md:max-w-[60%] ${
                              msg.role === 'judge' 
                                ? 'mx-auto' 
                                : msg.role === 'plaintiff'
                                  ? 'ml-0 mr-auto'
                                  : msg.role === 'defense'
                                    ? 'ml-auto mr-0'
                                    : 'ml-0 mr-auto'
                            }`}
                          >
                            <ChatBubble 
                              message={msg.content} 
                              isUser={msg.role === 'user'} 
                              isTyping={isTyping && index === messages.length - 1}
                            />
                          </motion.div>
                        </AnimatePresence>
                      ))}
                    </div>
                    
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
              </div>
            </motion.div>
            
            {/* Mobile toggle for controls */}
            <button
              className="lg:hidden bg-[#D4AF37] text-white p-3 rounded-lg mb-4 flex items-center justify-center mx-auto"
              onClick={() => setIsMobileControlsOpen(!isMobileControlsOpen)}
            >
              {isMobileControlsOpen ? 'Hide Controls' : 'Show Simulation Controls'}
            </button>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className={`lg:w-1/4 space-y-6 ${isMobileControlsOpen ? 'block' : 'hidden lg:block'}`}
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
                    <select 
                      className="w-full border border-gray-300 rounded-md p-2"
                      value={caseType}
                      onChange={(e) => setCaseType(e.target.value)}
                    >
                      {caseTypes.map(ct => (
                        <option key={ct.id} value={ct.id}>{ct.name}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Difficulty Level
                    </label>
                    <select 
                      className="w-full border border-gray-300 rounded-md p-2"
                      value={difficultyLevel}
                      onChange={(e) => setDifficultyLevel(e.target.value)}
                    >
                      {difficultyLevels.map(dl => (
                        <option key={dl.id} value={dl.id}>{dl.name}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Your Role
                    </label>
                    <select 
                      className="w-full border border-gray-300 rounded-md p-2"
                      value={userRole}
                      onChange={(e) => setUserRole(e.target.value)}
                    >
                      {userRoles.map(role => (
                        <option key={role.id} value={role.id}>{role.name}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="pt-2">
                    <button className="w-full bg-[#D4AF37] text-white py-2 rounded hover:bg-[#D4AF37]/80 transition-colors">
                      Start New Simulation
                    </button>
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
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold">
                      J
                    </div>
                    <div>
                      <div className="font-medium">Hon. Mohammed Al Qasimi</div>
                      <div className="text-xs text-gray-500">Judge</div>
                    </div>
                  </div>
                  
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
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold">
                      D
                    </div>
                    <div>
                      <div className="font-medium">ABC Corporation</div>
                      <div className="text-xs text-gray-500">Defense</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 font-bold">
                      Y
                    </div>
                    <div>
                      <div className="font-medium">You</div>
                      <div className="text-xs text-gray-500 capitalize">{userRole}</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Legal References */}
              <div className="bg-white p-5 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#D4AF37]" />
                  UAE Legal References
                </h3>
                
                <div className="space-y-2 text-sm">
                  <div className="p-2 bg-gray-50 rounded-md">
                    <p className="font-semibold">UAE Civil Code Article 246</p>
                    <p className="text-gray-600">Contract must be performed according to its contents and in a manner consistent with requirements of good faith.</p>
                  </div>
                  
                  <div className="p-2 bg-gray-50 rounded-md">
                    <p className="font-semibold">UAE Civil Code Article 272</p>
                    <p className="text-gray-600">If either party fails to perform, the contract may be rescinded or enforced with compensation.</p>
                  </div>
                  
                  <div className="p-2 bg-gray-50 rounded-md">
                    <p className="font-semibold">UAE Commercial Code Article 102</p>
                    <p className="text-gray-600">Disputes regarding commercial contracts must be decided in accordance with contractual terms.</p>
                  </div>
                  
                  <button className="w-full text-[#D4AF37] text-center pt-2 hover:underline">
                    View more legal references
                  </button>
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
                  <li>Practice constructing persuasive legal arguments based on UAE law</li>
                  <li>Gain familiarity with UAE court procedures and etiquette</li>
                  <li>Learn how to respond to opposing counsel's arguments</li>
                  <li>Understand how courts evaluate contractual disputes under UAE Civil Code</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
                  <Award className="w-5 h-5 text-[#D4AF37]" />
                  Case Details
                </h3>
                <p className="text-gray-700 mb-4">
                  This simulation involves a contract dispute under UAE law. The plaintiff claims non-payment for services rendered, while the defense argues that performance benchmarks were not met as required by the contract.
                </p>
                <p className="text-gray-700">
                  Practice constructing arguments based on UAE Civil Code Articles 246 and 272, which govern contractual obligations and remedies.
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
