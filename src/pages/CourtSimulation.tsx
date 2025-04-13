
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, MessageSquare, Info, Users, Settings, HelpCircle, FileText, Award } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
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
    }
  ]);
  
  const [activeSpeaker, setActiveSpeaker] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [caseType, setCaseType] = useState('contract');
  const [difficultyLevel, setDifficultyLevel] = useState('beginner');
  const [userRole, setUserRole] = useState('defense');
  const [isMobileControlsOpen, setIsMobileControlsOpen] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const participants: Participant[] = [
    {
      id: '1',
      name: 'Hon. Jamal Al-Mahdi',
      role: 'judge',
      avatar: '/lovable-uploads/af3c0ae6-44e0-4ef8-92be-70cae312e9ee.png',
      initials: 'JM',
      color: 'bg-purple-100 text-purple-600'
    },
    {
      id: '2',
      name: 'Rafat',
      role: 'plaintiff',
      avatar: '/lovable-uploads/af3c0ae6-44e0-4ef8-92be-70cae312e9ee.png',
      initials: 'RA',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      id: '3',
      name: 'Rooz',
      role: 'defense',
      avatar: '/lovable-uploads/af3c0ae6-44e0-4ef8-92be-70cae312e9ee.png',
      initials: 'RO',
      color: 'bg-orange-100 text-orange-600'
    },
    {
      id: '4',
      name: 'John Wilson',
      role: 'witness',
      avatar: '/lovable-uploads/af3c0ae6-44e0-4ef8-92be-70cae312e9ee.png',
      initials: 'JW',
      color: 'bg-green-100 text-green-600'
    },
    {
      id: '5',
      name: 'You',
      role: 'user',
      avatar: '/lovable-uploads/af3c0ae6-44e0-4ef8-92be-70cae312e9ee.png',
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
      sender: "You (Defense)",
      role: 'defense'
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
          content: "Thank you for your statement. Under UAE Civil Code Article 246, contracts must be performed according to their contents. Based on the evidence presented, I'll now consider both perspectives on the quality standards dispute.",
          sender: "Hon. Jamal Al-Mahdi",
          role: 'judge'
        };
        
        setMessages((prev) => [...prev, judgeResponse]);
        setIsTyping(false);
        setActiveSpeaker(null);
      }, 2000);
    }, 1500);
  };
  
  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-gray-100 py-6 px-4">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Virtual Court Simulation
          </h1>
          
          <p className="text-gray-600 text-center mb-6 max-w-3xl mx-auto">
            Experience an immersive virtual courtroom environment based on UAE legal proceedings
          </p>
          
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="lg:w-2/3 bg-white rounded-lg overflow-hidden shadow-lg">
              {/* Courtroom Scene */}
              <div className="relative">
                <div className="w-full h-[350px] relative overflow-hidden">
                  {/* Courtroom background */}
                  <img 
                    src="/lovable-uploads/a945de97-dcce-44e2-aca2-dd1c7bf05463.png" 
                    alt="Courtroom" 
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  
                  {/* Overlay to make text more readable */}
                  <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                  
                  {/* Chat bubbles overlaid on the courtroom */}
                  <div className="absolute inset-0 p-4 overflow-y-auto">
                    <div className="space-y-4 mb-16 pt-4">
                      {messages.map((msg) => (
                        <AnimatePresence key={msg.id} mode="wait">
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
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
                    <div className="flex gap-2">
                      <Textarea
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        placeholder="Type your defense statement..."
                        className="min-h-[60px] resize-none"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleUserMessage();
                          }
                        }}
                      />
                      <Button 
                        onClick={handleUserMessage}
                        className="bg-[#cc9c24] hover:bg-[#B7973A] text-white self-end"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Mobile toggle for controls */}
            <button
              className="lg:hidden bg-[#cc9c24] text-white p-3 rounded-lg mb-4 flex items-center justify-center mx-auto"
              onClick={() => setIsMobileControlsOpen(!isMobileControlsOpen)}
            >
              {isMobileControlsOpen ? 'Hide Controls' : 'Show Simulation Controls'}
            </button>
            
            <div className={`lg:w-1/3 space-y-5 ${isMobileControlsOpen ? 'block' : 'hidden lg:block'}`}>
              {/* Simulation controls */}
              <div className="bg-white p-5 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-800">
                  <Settings className="w-5 h-5 text-[#cc9c24]" />
                  Simulation Settings
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Case Type
                    </label>
                    <select 
                      className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-[#cc9c24] focus:border-transparent"
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
                      className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-[#cc9c24] focus:border-transparent"
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
                      className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-[#cc9c24] focus:border-transparent"
                      value={userRole}
                      onChange={(e) => setUserRole(e.target.value)}
                    >
                      {userRoles.map(role => (
                        <option key={role.id} value={role.id}>{role.name}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="pt-2">
                    <button className="w-full bg-[#cc9c24] text-white py-2 rounded hover:bg-[#cc9c24]/80 transition-colors">
                      Start New Simulation
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Participants */}
              <div className="bg-white p-5 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-800">
                  <Users className="w-5 h-5 text-[#cc9c24]" />
                  Participants
                </h3>
                
                <div className="space-y-3">
                  {participants.map((participant) => (
                    <div key={participant.id} className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-50 transition-colors">
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
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-800">
                  <FileText className="w-5 h-5 text-[#cc9c24]" />
                  UAE Legal References
                </h3>
                
                <div className="space-y-2 text-sm">
                  <div className="p-2.5 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
                    <p className="font-semibold">UAE Civil Code Article 246</p>
                    <p className="text-gray-600">Contract must be performed according to its contents and in a manner consistent with requirements of good faith.</p>
                  </div>
                  
                  <div className="p-2.5 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
                    <p className="font-semibold">UAE Civil Code Article 272</p>
                    <p className="text-gray-600">If either party fails to perform, the contract may be rescinded or enforced with compensation.</p>
                  </div>
                  
                  <button className="w-full text-[#cc9c24] text-center pt-2 hover:underline font-medium">
                    View more legal references
                  </button>
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
