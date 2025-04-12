
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, MessageSquare, Info, Users, Settings, HelpCircle, FileText, Award } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import VirtualChatBubble from '@/components/VirtualChatBubble';

interface Message {
  id: string;
  content: string;
  sender: string;
  role: 'judge' | 'plaintiff' | 'defense' | 'user' | 'witness';
  isActive?: boolean;
}

interface Participant {
  id: string;
  name: string;
  role: 'judge' | 'plaintiff' | 'defense' | 'witness' | 'user';
  avatar: string;
  initials: string;
  color: string;
}

const CourtSimulation = () => {
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Welcome to the session. Today we'll be addressing the case of Rafat vs. Afaq regarding the contract dispute. Plaintiff, please begin with your opening statement.",
      sender: "Hon. Jamal Al-Mahdi",
      role: 'judge'
    },
    {
      id: '2',
      content: "Your Honor, my client entered into a service agreement with Afaq Corp for software development. Despite delivering the work, the defendant has failed to pay the agreed amount of AED 75,000.",
      sender: "Rafat (Plaintiff)",
      role: 'plaintiff'
    },
    {
      id: '3',
      content: "Thank you. Defense, your response?",
      sender: "Hon. Jamal Al-Mahdi",
      role: 'judge'
    },
    {
      id: '4',
      content: "Your Honor, we dispute this claim. The deliverables did not meet the quality standards specified in our agreement, justifying our decision to withhold payment.",
      sender: "Rooz (Representing Afaq)",
      role: 'defense'
    }
  ]);
  
  const [activeSpeaker, setActiveSpeaker] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [caseType, setCaseType] = useState('contract');
  const [difficultyLevel, setDifficultyLevel] = useState('beginner');
  const [userRole, setUserRole] = useState('observer');
  const [isMobileControlsOpen, setIsMobileControlsOpen] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const participants: Participant[] = [
    {
      id: '1',
      name: 'Hon. Jamal Al-Mahdi',
      role: 'judge',
      avatar: '/public/lovable-uploads/af3c0ae6-44e0-4ef8-92be-70cae312e9ee.png',
      initials: 'JM',
      color: 'bg-purple-100 text-purple-600'
    },
    {
      id: '2',
      name: 'Rafat',
      role: 'plaintiff',
      avatar: '/public/lovable-uploads/af3c0ae6-44e0-4ef8-92be-70cae312e9ee.png',
      initials: 'RA',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      id: '3',
      name: 'Rooz',
      role: 'defense',
      avatar: '/public/lovable-uploads/af3c0ae6-44e0-4ef8-92be-70cae312e9ee.png',
      initials: 'RO',
      color: 'bg-orange-100 text-orange-600'
    },
    {
      id: '4',
      name: 'John Wilson',
      role: 'witness',
      avatar: '/public/lovable-uploads/af3c0ae6-44e0-4ef8-92be-70cae312e9ee.png',
      initials: 'JW',
      color: 'bg-green-100 text-green-600'
    },
    {
      id: '5',
      name: 'You',
      role: 'user',
      avatar: '/public/lovable-uploads/af3c0ae6-44e0-4ef8-92be-70cae312e9ee.png',
      initials: 'YO',
      color: 'bg-gray-100 text-gray-600'
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
  
  const handleUserMessage = () => {
    if (!userInput.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: userInput,
      sender: "You",
      role: 'user'
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setUserInput('');
    setActiveSpeaker('5'); // User is speaking
    setIsTyping(true);
    
    // Simulate response delay
    setTimeout(() => {
      setActiveSpeaker('1'); // Judge speaks next
      setIsTyping(true);
      
      // After a delay for judge to start speaking
      setTimeout(() => {
        const judgeResponse: Message = {
          id: (Date.now() + 1).toString(),
          content: "Thank you for your input. Under UAE Civil Code Article 246, contracts must be performed according to their contents. Based on the evidence presented, I'll now consider both perspectives on the quality standards dispute.",
          sender: "Hon. Jamal Al-Mahdi",
          role: 'judge'
        };
        
        setMessages((prev) => [...prev, judgeResponse]);
        setIsTyping(false);
        
        // Switch to defense after judge finishes
        setTimeout(() => {
          setActiveSpeaker('3');
          setIsTyping(true);
          
          setTimeout(() => {
            const defenseResponse: Message = {
              id: (Date.now() + 2).toString(),
              content: "Your Honor, I'd like to present documentation showing that the deliverables failed to meet the quality standards specified in section 3.1 of our agreement. UAE Civil Code Article 272 provides that a contract may be set aside if obligations aren't fulfilled.",
              sender: "Rooz (Representing Afaq)",
              role: 'defense'
            };
            
            setMessages((prev) => [...prev, defenseResponse]);
            setIsTyping(false);
            
            setTimeout(() => setActiveSpeaker(null), 1000);
          }, 2000);
        }, 2000);
      }, 2000);
    }, 1500);
  };
  
  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const getAvatarPosition = (role: string) => {
    switch(role) {
      case 'judge': return 'top-10 left-1/2 transform -translate-x-1/2';
      case 'plaintiff': return 'bottom-10 left-1/4 transform -translate-x-1/2';
      case 'defense': return 'bottom-10 right-1/4 transform translate-x-1/2';
      case 'witness': return 'bottom-10 left-10';
      case 'user': return 'bottom-10 right-10';
      default: return '';
    }
  };
  
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
            Experience an immersive virtual courtroom environment based on UAE legal proceedings
          </motion.p>
          
          <div className="flex flex-col lg:flex-row gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="lg:w-3/4 bg-white rounded-lg overflow-hidden shadow-lg"
            >
              {/* Courtroom Scene */}
              <div className="relative">
                <div className="w-full h-[450px] bg-gradient-to-b from-[#f5f3ee] to-[#e6e0d4] relative overflow-hidden">
                  {/* Courtroom background with subtle wood texture */}
                  <div className="absolute inset-0 bg-[url('/public/lovable-uploads/af3c0ae6-44e0-4ef8-92be-70cae312e9ee.png')] bg-cover bg-center opacity-5"></div>
                  
                  {/* Court bench */}
                  <div className="absolute top-0 left-0 right-0 h-32 bg-[#8a7b4c] bg-opacity-20 border-b-4 border-[#8a7b4c]"></div>
                  <div className="absolute bottom-0 left-0 right-0 h-24 bg-[#8a7b4c] bg-opacity-10 border-t-2 border-[#8a7b4c]"></div>
                  
                  {/* Participants with their positions */}
                  {participants.map((participant) => (
                    <motion.div
                      key={participant.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: Number(participant.id) * 0.1 }}
                      className={`absolute ${getAvatarPosition(participant.role)}`}
                    >
                      <motion.div
                        animate={activeSpeaker === participant.id 
                          ? { y: [0, -5, 0], scale: [1, 1.05, 1] } 
                          : {}}
                        transition={{ duration: 0.5, repeat: activeSpeaker === participant.id ? 1 : 0 }}
                        className="flex flex-col items-center"
                      >
                        <div className={`text-xs font-bold mb-1 px-2 py-0.5 rounded-full 
                          ${participant.role === 'judge' ? 'bg-[#D946EF] text-white' : 
                           participant.role === 'plaintiff' ? 'bg-[#3B82F6] text-white' : 
                           participant.role === 'defense' ? 'bg-[#F97316] text-white' :
                           participant.role === 'witness' ? 'bg-[#10B981] text-white' :
                           'bg-gray-700 text-white'}
                        `}>
                          {participant.role.charAt(0).toUpperCase() + participant.role.slice(1)}
                        </div>
                        <div className="relative">
                          <Avatar className={`h-16 w-16 ${activeSpeaker === participant.id ? 'ring-2 ring-[#D4AF37]' : ''}`}>
                            <AvatarImage src={participant.avatar} alt={participant.name} />
                            <AvatarFallback className={participant.color}>{participant.initials}</AvatarFallback>
                          </Avatar>
                          {activeSpeaker === participant.id && (
                            <motion.div 
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 rounded-full"
                            />
                          )}
                        </div>
                        <div className="text-xs font-medium mt-1 text-center max-w-[80px] truncate">
                          {participant.name}
                        </div>
                      </motion.div>
                    </motion.div>
                  ))}
                  
                  {/* Chat bubbles overlaid on the courtroom */}
                  <div className="absolute inset-0 p-4 overflow-y-auto">
                    <div className="space-y-4 mb-32 pt-28">
                      {messages.map((msg) => (
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
                                  ? 'ml-20 mr-auto'
                                  : msg.role === 'defense'
                                    ? 'ml-auto mr-20'
                                    : msg.role === 'user'
                                      ? 'ml-auto mr-4'
                                      : 'ml-4 mr-auto'
                            }`}
                          >
                            <VirtualChatBubble 
                              message={msg.content}
                              sender={msg.sender}
                              role={msg.role}
                              isActive={activeSpeaker === participants.find(p => p.role === msg.role)?.id}
                              isTyping={isTyping && msg.id === messages[messages.length - 1].id}
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
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">
                      Your Response to the current court proceeding...
                    </label>
                    <div className="flex items-center gap-2">
                      <Textarea
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        placeholder="Type your response as the selected role..."
                        className="min-h-[80px] resize-none"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleUserMessage();
                          }
                        }}
                      />
                    </div>
                    <Button 
                      onClick={handleUserMessage}
                      className="bg-[#D4AF37] hover:bg-[#B7973A] text-white ml-auto"
                    >
                      <Send className="h-4 w-4 mr-2" /> Submit Response
                    </Button>
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
                  {participants.map((participant) => (
                    <div key={participant.id} className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${participant.color}`}>
                        {participant.initials}
                      </div>
                      <div>
                        <div className="font-medium">{participant.name}</div>
                        <div className="text-xs text-gray-500 capitalize">{participant.role}</div>
                      </div>
                    </div>
                  ))}
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
