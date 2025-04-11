
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, FileText, List, Upload, ChevronDown, Send, X, Paperclip, BookOpen, Shield, Scale, AlertCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatBubble from '@/components/ChatBubble';

const exampleQuestions = [
  {
    id: 1,
    question: "What is considered a criminal breach of trust under UAE law?",
    answer: "According to Article 404 of the UAE Federal Penal Code, criminal breach of trust involves the misappropriation or disposal of movable property that was entrusted to a person under a contract such as deposit, lease, loan, or agency. It is punishable by imprisonment or fine."
  },
  {
    id: 2,
    question: "How can I file for labor complaint in the UAE if my employer hasn't paid my salary?",
    answer: "You can file a complaint through the Ministry of Human Resources and Emiratisation (MOHRE) via the MOHRE app or by calling 80060. If not resolved within 14 days, the complaint is escalated to the UAE labor court automatically."
  },
  {
    id: 3,
    question: "What is the procedure for filing a tenancy dispute in Dubai?",
    answer: "All tenancy disputes in Dubai must be submitted to the Dubai Rental Dispute Settlement Centre (RDSC). File online or visit the RDSC office. Attach your Ejari, tenancy contract, Emirates ID, and evidence of the dispute. A fee (3.5% of the annual rent) is applicable."
  },
  {
    id: 4,
    question: "Can foreigners own property in the UAE?",
    answer: "Yes. Under Law No. 7 of 2006, non-GCC expatriates can own freehold properties in designated areas of Dubai, Abu Dhabi, and other emirates. Ownership rights include selling, leasing, or inheriting the property."
  }
];

interface Message {
  id: string;
  content: string;
  isUser: boolean;
}

const LegalAssistant = () => {
  const [activeTab, setActiveTab] = useState<'ask' | 'draft' | 'summarize' | 'documents'>('ask');
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    
    const userMessage = {
      id: Date.now().toString(),
      content: inputValue,
      isUser: true
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    
    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        content: "Under UAE Civil Procedure Law (Federal Law No. 11 of 1992), parties are typically required to submit a response within 15 days of being notified of the lawsuit, unless otherwise specified by the court. If your deadline is approaching, you should immediately file a request for extension or submit your defense documents electronically via the Dubai Courts e-services portal to avoid judgment in absentia. You can access the portal here: Dubai Courts eServices. Remember: Failure to respond within the specified timeline may result in the court issuing a default judgment.",
        isUser: false
      };
      
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };
  
  const handleExampleQuestion = (question: string, answer: string) => {
    const userMessage = {
      id: Date.now().toString(),
      content: question,
      isUser: true
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);
    
    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        content: answer,
        isUser: false
      };
      
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };
  
  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleFileRemove = () => {
    setSelectedFile(null);
  };
  
  const handleDraft = () => {
    setActiveTab('draft');
    setMessages([
      {
        id: "system-1",
        content: "What type of legal document would you like me to help you draft?",
        isUser: false
      }
    ]);
  };
  
  const handleSummarize = () => {
    setActiveTab('summarize');
    setMessages([
      {
        id: "system-2",
        content: "Please upload a legal document that you'd like me to summarize for you. I'll analyze it and provide a comprehensive summary of its key points and legal implications.",
        isUser: false
      }
    ]);
  };
  
  const handleDocuments = () => {
    setActiveTab('documents');
    setMessages([
      {
        id: "system-3",
        content: "You can upload legal documents here for analysis or storage. I can help you organize, search through, and understand your legal documents more efficiently.",
        isUser: false
      }
    ]);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex bg-gradient-to-br from-[#F8F4E3] via-[#F8F7F1] to-[#FDFBF0]">
        <div className="container mx-auto max-w-screen-xl p-4 flex h-[calc(100vh-184px)]">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-[#F0E6C6]/60 backdrop-blur-sm rounded-l-lg hidden md:flex flex-col w-16 border-r border-[#D4AF37]/20"
          >
            <div className="flex flex-col items-center gap-6 py-6">
              <div className="w-8 h-8 bg-[#D4AF37]/20 rounded-lg flex items-center justify-center">
                <span className="text-[#987B30] font-bold text-lg">S</span>
              </div>
              
              <div className="flex flex-col items-center gap-6 mt-8">
                <div className="flex flex-col items-center text-[#987B30] hover:text-[#D4AF37] cursor-pointer group">
                  <BookOpen className="h-6 w-6" />
                  <span className="text-xs mt-1">Legal Research</span>
                </div>
                
                <div className="flex flex-col items-center text-[#987B30] hover:text-[#D4AF37] cursor-pointer group">
                  <Scale className="h-6 w-6" />
                  <span className="text-xs mt-1">Practical Guidance</span>
                </div>
                
                <div className="flex flex-col items-center text-[#987B30] hover:text-[#D4AF37] cursor-pointer group">
                  <Shield className="h-6 w-6" />
                  <span className="text-xs mt-1">Document Analysis</span>
                </div>
                
                <div className="flex flex-col items-center text-[#987B30] hover:text-[#D4AF37] cursor-pointer group">
                  <AlertCircle className="h-6 w-6" />
                  <span className="text-xs mt-1">Legal News Hub</span>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white/90 backdrop-blur-sm flex-grow rounded-r-lg overflow-hidden flex flex-col shadow-lg"
          >
            <div className="p-6 bg-gradient-to-r from-[#F0E6C6] to-[#F8F7F1] backdrop-blur-sm border-b border-[#D4AF37]/20">
              <h1 className="text-2xl font-bold text-[#987B30]">Welcome back, Alex</h1>
              <p className="text-gray-600">Let's get started. Which legal task can AI accelerate for you today?</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                <button
                  onClick={() => setActiveTab('ask')}
                  className={`flex items-center justify-center gap-2 p-4 rounded-lg font-medium ${
                    activeTab === 'ask' 
                      ? 'bg-[#D4AF37] text-white' 
                      : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <MessageSquare className="h-5 w-5" />
                  <span>Ask</span>
                </button>
                
                <button
                  onClick={handleDraft}
                  className={`flex items-center justify-center gap-2 p-4 rounded-lg font-medium ${
                    activeTab === 'draft' 
                      ? 'bg-[#D4AF37] text-white' 
                      : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <FileText className="h-5 w-5" />
                  <span>Draft</span>
                </button>
                
                <button
                  onClick={handleSummarize}
                  className={`flex items-center justify-center gap-2 p-4 rounded-lg font-medium ${
                    activeTab === 'summarize' 
                      ? 'bg-[#D4AF37] text-white' 
                      : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <List className="h-5 w-5" />
                  <span>Summarize</span>
                </button>
                
                <button
                  onClick={handleDocuments}
                  className={`flex items-center justify-center gap-2 p-4 rounded-lg font-medium ${
                    activeTab === 'documents' 
                      ? 'bg-[#D4AF37] text-white' 
                      : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <Upload className="h-5 w-5" />
                  <span>Documents</span>
                </button>
              </div>
            </div>
            
            <div className="flex-grow flex flex-col overflow-hidden">
              {messages.length === 0 ? (
                <div className="flex-grow flex flex-col p-6 overflow-y-auto">
                  <div className="mt-4">
                    <p className="font-medium text-gray-700 mb-3">Examples of legal questions to ask:</p>
                    <div className="space-y-2">
                      {exampleQuestions.map((q) => (
                        <div
                          key={q.id}
                          onClick={() => handleExampleQuestion(q.question, q.answer)}
                          className="p-4 bg-white rounded-lg border border-[#D4AF37]/20 cursor-pointer hover:bg-[#F0E6C6]/20 transition-colors duration-200"
                        >
                          {q.question}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <p className="text-sm text-gray-600 mb-2">Includes:</p>
                    <div className="flex flex-wrap gap-4">
                      <span className="text-sm text-[#987B30]">Case Law</span>
                      <span className="text-sm text-gray-400">|</span>
                      <span className="text-sm text-[#987B30]">Codes, Rules & Constitutions</span>
                      <span className="text-sm text-gray-400">|</span>
                      <span className="text-sm text-[#987B30]">Practical Guidance</span>
                      <span className="text-sm text-gray-400">|</span>
                      <span className="text-sm text-[#987B30]">Treatises</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex-grow p-6 overflow-y-auto bg-[#FDFBF0]/50">
                  <div className="space-y-4">
                    {messages.map((msg) => (
                      <ChatBubble 
                        key={msg.id} 
                        message={msg.content} 
                        isUser={msg.isUser} 
                        isTyping={isTyping && !msg.isUser && msg.id === messages[messages.length - 1].id}
                      />
                    ))}
                    
                    {isTyping && messages[messages.length - 1]?.isUser && (
                      <ChatBubble message="" isUser={false} isTyping={true} />
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </div>
              )}
              
              <div className="p-4 border-t border-[#D4AF37]/20 bg-white">
                <div className="flex items-center gap-2 mb-2">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className={`text-xs px-2 py-1 rounded-full border ${
                      showFilters ? 'bg-[#D4AF37] text-white border-[#D4AF37]' : 'border-gray-300 text-gray-700'
                    }`}
                  >
                    <span className="flex items-center gap-1">
                      Filters <ChevronDown className="h-3 w-3" />
                    </span>
                  </button>
                  
                  {showFilters && (
                    <>
                      <button className="text-xs px-2 py-1 rounded-full border border-gray-300 hover:bg-gray-50">
                        Match Law
                      </button>
                      <button className="text-xs px-2 py-1 rounded-full border border-gray-300 hover:bg-gray-50">
                        Match Case
                      </button>
                      <button className="text-xs px-2 py-1 rounded-full border border-gray-300 hover:bg-gray-50">
                        Match Journal
                      </button>
                    </>
                  )}
                </div>
                
                <div className="relative">
                  {selectedFile && (
                    <div className="absolute bottom-full mb-2 flex items-center gap-2 bg-[#F0E6C6]/40 rounded-md p-2">
                      <div className="flex items-center gap-2">
                        <Paperclip className="h-4 w-4 text-[#987B30]" />
                        <span className="text-sm text-gray-700 truncate max-w-[200px]">
                          {selectedFile.name}
                        </span>
                      </div>
                      <button 
                        onClick={handleFileRemove}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-2 bg-[#F8F7F1] rounded-lg pr-2">
                    <input
                      type="text"
                      placeholder="Ask a legal question"
                      className="flex-grow py-3 px-4 bg-transparent border-none focus:outline-none"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleSendMessage();
                        }
                      }}
                    />
                    
                    <label className="cursor-pointer text-[#987B30] hover:text-[#D4AF37]">
                      <Paperclip className="h-5 w-5" />
                      <input 
                        type="file" 
                        className="hidden"
                        onChange={handleFileChange}
                      />
                    </label>
                    
                    <button
                      onClick={handleSendMessage}
                      className="bg-[#D4AF37] text-white p-2 rounded-full hover:bg-[#987B30] transition-colors"
                    >
                      <Send className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                
                <div className="flex justify-between items-center mt-2">
                  <div className="flex items-center gap-2">
                    <button className="text-xs text-gray-500 hover:text-[#987B30]">Select Jurisdiction</button>
                    <ChevronDown className="h-3 w-3 text-gray-500" />
                  </div>
                  
                  <div className="flex gap-2">
                    <button className="text-xs text-gray-500 hover:text-[#987B30]">Terms & Conditions</button>
                    <span className="text-gray-500">|</span>
                    <button className="text-xs text-gray-500 hover:text-[#987B30]">Privacy Policy</button>
                    <span className="text-gray-500">|</span>
                    <button className="text-xs text-gray-500 hover:text-[#987B30]">Cookie Policy</button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default LegalAssistant;
