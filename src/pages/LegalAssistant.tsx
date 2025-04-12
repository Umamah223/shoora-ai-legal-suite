
import { useState, useEffect, useRef } from 'react';
import { MessageSquare, FileText, Upload, Paperclip, Send, ChevronDown, Info, Check, Link, File } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatBubble from '@/components/ChatBubble';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';

const exampleQuestions = [
  {
    id: 1,
    question: "What is considered a criminal breach of trust under UAE law?",
    answer: "According to Article 404 of the UAE Federal Penal Code, criminal breach of trust involves the misappropriation or disposal of movable property that was entrusted to a person under a contract such as deposit, lease, loan, or agency. It is punishable by imprisonment or fine.\n\nYou can find more information in the following resources:\n- [UAE Federal Penal Code](https://www.adjd.gov.ae/sites/Authoring/AR/ELibrary%20Books/E-Library/PDFs/Criminal%20Law.pdf)\n- [Guide to UAE Criminal Law](https://www.tamimi.com/law-update-articles/breach-of-trust-a-practical-insight/)"
  },
  {
    id: 2,
    question: "How can I file for labor complaint in the UAE if my employer hasn't paid my salary?",
    answer: "You can file a complaint through the Ministry of Human Resources and Emiratisation (MOHRE) via the MOHRE app or by calling 80060. If not resolved within 14 days, the complaint is escalated to the UAE labor court automatically.\n\nUseful resources:\n- [MOHRE Official Website](https://www.mohre.gov.ae/en/services/labour-relations/labour-complaints.aspx)\n- [UAE Labour Law Guide](https://u.ae/en/information-and-services/jobs/labour-law)"
  },
  {
    id: 3,
    question: "What is the procedure for filing a tenancy dispute in Dubai?",
    answer: "All tenancy disputes in Dubai must be submitted to the Dubai Rental Dispute Settlement Centre (RDSC). File online or visit the RDSC office. Attach your Ejari, tenancy contract, Emirates ID, and evidence of the dispute. A fee (3.5% of the annual rent) is applicable.\n\nMore details available at:\n- [RDSC Official Portal](https://www.rdsc.gov.ae/)\n- [Dubai Land Department](https://dubailand.gov.ae/en/eservices/rental-disputes-center/)"
  },
  {
    id: 4,
    question: "Can foreigners own property in the UAE?",
    answer: "Yes. Under Law No. 7 of 2006, non-GCC expatriates can own freehold properties in designated areas of Dubai, Abu Dhabi, and other emirates. Ownership rights include selling, leasing, or inheriting the property.\n\nFor more information, consult:\n- [Dubai Land Department Guidelines](https://dubailand.gov.ae/en/open-data/real-estate-legislation/)\n- [UAE Property Ownership Guide](https://u.ae/en/information-and-services/housing/buying-and-owning-a-home-in-the-uae)"
  }
];

interface Message {
  id: string;
  content: string;
  isUser: boolean;
}

const LegalAssistant = () => {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [activeTab, setActiveTab] = useState<'ask' | 'draft' | 'summarize' | 'documents'>('ask');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [selectedMatchOptions, setSelectedMatchOptions] = useState<string[]>(["Match Law"]);
  const [uploadedDocuments, setUploadedDocuments] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isMobile = useIsMobile();
  
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
      if (activeTab === 'draft' && inputValue.toLowerCase().includes('rental agreement')) {
        const aiResponse = {
          id: (Date.now() + 1).toString(),
          content: "To get started, could you please provide the following details:\n\n- Full name of the landlord\n- Full name of the tenant\n- Property address\n- Monthly rent amount\n- Duration of the lease (e.g., 12 months, 1 year)\n- Start and end dates of the lease\n- Security deposit amount (if any)\n- Any special terms or conditions (e.g., maintenance responsibilities, renewal clauses)\n\nOnce I have this information, I'll generate a customized rental agreement compliant with UAE laws.",
          isUser: false
        };
        setMessages((prev) => [...prev, aiResponse]);
      } else {
        const aiResponse = {
          id: (Date.now() + 1).toString(),
          content: "Under UAE Civil Procedure Law (Federal Law No. 11 of 1992), parties are typically required to submit a response within 15 days of being notified of the lawsuit, unless otherwise specified by the court. If your deadline is approaching, you should immediately file a request for extension or submit your defense documents electronically via the Dubai Courts e-services portal to avoid judgment in absentia.\n\nYou can access the portal here: [Dubai Courts eServices](https://www.dc.gov.ae/PublicServices).\n\nRemember: Failure to respond within the specified timeline may result in the court issuing a default judgment.",
          isUser: false
        };
        setMessages((prev) => [...prev, aiResponse]);
      }
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
  
  const toggleMatchOption = (option: string) => {
    if (selectedMatchOptions.includes(option)) {
      setSelectedMatchOptions(prev => prev.filter(item => item !== option));
    } else {
      setSelectedMatchOptions(prev => [...prev, option]);
    }
  };
  
  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setUploadedDocuments(prev => [...prev, ...newFiles]);
      
      // Add a message about the uploaded document
      const fileNames = newFiles.map(file => file.name).join(", ");
      const userMessage = {
        id: Date.now().toString(),
        content: `I've uploaded: ${fileNames}`,
        isUser: true
      };
      
      setMessages(prev => [...prev, userMessage]);
      setIsTyping(true);
      
      // Simulate AI response
      setTimeout(() => {
        const aiResponse = {
          id: (Date.now() + 1).toString(),
          content: `I've received your document${newFiles.length > 1 ? 's' : ''}: ${fileNames}. What would you like me to do with ${newFiles.length > 1 ? 'them' : 'it'}? I can summarize the content, extract key information, or answer specific questions about the document.`,
          isUser: false
        };
        
        setMessages(prev => [...prev, aiResponse]);
        setIsTyping(false);
      }, 1500);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex flex-col bg-white">
        <div className="w-full h-full flex">
          {/* Left sidebar */}
          <div className="w-16 md:w-20 bg-gray-100 border-r flex flex-col items-center py-5 hidden md:flex">
            <div className="w-10 h-10 rounded-full bg-[#D4AF37]/20 flex items-center justify-center mb-8">
              <span className="font-bold text-[#987B30]">P</span>
            </div>
            
            <div className="space-y-8 mt-4">
              <div className="flex flex-col items-center text-gray-500 cursor-pointer hover:text-[#D4AF37] transition-colors">
                <MessageSquare className="w-5 h-5" />
                <span className="text-xs mt-1">Chat</span>
              </div>
              <div className="flex flex-col items-center text-gray-500 cursor-pointer hover:text-[#D4AF37] transition-colors">
                <FileText className="w-5 h-5" />
                <span className="text-xs mt-1">Docs</span>
              </div>
            </div>
          </div>
          
          {/* Main content area */}
          <div className="flex-grow flex flex-col">
            {/* Header */}
            <div className="p-4 md:p-5 border-b">
              <h2 className="text-xl font-semibold text-gray-800">Welcome back, Alex</h2>
              <p className="text-gray-600 text-sm">Let's get started. Which legal task can AI accelerate for you today?</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 mt-4">
                <button
                  onClick={() => setActiveTab('ask')}
                  className={`flex items-center justify-center md:justify-start gap-2 p-2 md:p-3 rounded border text-sm md:text-base ${
                    activeTab === 'ask' 
                      ? 'bg-[#D4AF37] text-white border-[#D4AF37]' 
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <MessageSquare className="h-4 w-4 md:h-5 md:w-5" />
                  <span>Ask</span>
                </button>
                
                <button
                  onClick={handleDraft}
                  className={`flex items-center justify-center md:justify-start gap-2 p-2 md:p-3 rounded border text-sm md:text-base ${
                    activeTab === 'draft' 
                      ? 'bg-[#D4AF37] text-white border-[#D4AF37]' 
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <FileText className="h-4 w-4 md:h-5 md:w-5" />
                  <span>Draft</span>
                </button>
                
                <button
                  onClick={handleSummarize}
                  className={`flex items-center justify-center md:justify-start gap-2 p-2 md:p-3 rounded border text-sm md:text-base ${
                    activeTab === 'summarize' 
                      ? 'bg-[#D4AF37] text-white border-[#D4AF37]' 
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <FileText className="h-4 w-4 md:h-5 md:w-5" />
                  <span>Summarize</span>
                </button>
                
                <button
                  onClick={handleDocuments}
                  className={`flex items-center justify-center md:justify-start gap-2 p-2 md:p-3 rounded border text-sm md:text-base ${
                    activeTab === 'documents' 
                      ? 'bg-[#D4AF37] text-white border-[#D4AF37]' 
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <Upload className="h-4 w-4 md:h-5 md:w-5" />
                  <span>Documents</span>
                </button>
              </div>
            </div>
          
            {/* Chat area */}
            {messages.length === 0 ? (
              <div className="flex-grow p-4 md:p-5 overflow-y-auto">
                <div className="mt-2">
                  <p className="font-medium text-gray-700 mb-3">Examples of legal questions to ask:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {exampleQuestions.map((q) => (
                      <div
                        key={q.id}
                        onClick={() => handleExampleQuestion(q.question, q.answer)}
                        className="p-3 bg-gray-50 rounded border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors"
                      >
                        {q.question}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mt-8">
                  <p className="text-sm text-gray-500 mb-1">Includes:</p>
                  <div className="flex flex-wrap gap-3">
                    <span className="text-sm px-3 py-1 bg-gray-100 rounded-full text-gray-700">Case Law</span>
                    <span className="text-sm px-3 py-1 bg-gray-100 rounded-full text-gray-700">Codes, Rules & Constitutions</span>
                    <span className="text-sm px-3 py-1 bg-gray-100 rounded-full text-gray-700">Practical Guidance</span>
                    <span className="text-sm px-3 py-1 bg-gray-100 rounded-full text-gray-700">Treatises</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex-grow p-4 md:p-5 overflow-y-auto">
                <div className="space-y-4 max-w-4xl mx-auto">
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
            
            {/* Footer with input */}
            <div className="border-t p-3 md:p-4">
              <div className="max-w-4xl mx-auto">
                <div className="flex flex-wrap mb-3 gap-2">
                  {["Match Law", "Match Case", "Match Journal"].map(option => (
                    <button 
                      key={option}
                      onClick={() => toggleMatchOption(option)}
                      className={`px-3 py-1 text-xs rounded-full flex items-center gap-1
                        ${selectedMatchOptions.includes(option) 
                          ? 'bg-[#D4AF37] text-white' 
                          : 'bg-gray-100 text-gray-700'}`}
                    >
                      {selectedMatchOptions.includes(option) && <Check className="w-3 h-3" />}
                      {option}
                    </button>
                  ))}
                </div>
                
                {activeTab === 'documents' && (
                  <div className="mb-4">
                    <div className="mb-3">
                      <p className="text-sm font-medium text-gray-700 mb-2">Uploaded Documents:</p>
                      {uploadedDocuments.length === 0 ? (
                        <p className="text-sm text-gray-500">No documents uploaded yet.</p>
                      ) : (
                        <div className="space-y-2">
                          {uploadedDocuments.map((doc, index) => (
                            <div key={index} className="flex items-center p-2 bg-gray-50 rounded border">
                              <File className="h-4 w-4 text-gray-500 mr-2" />
                              <span className="text-sm">{doc.name}</span>
                              <span className="ml-auto text-xs text-gray-500">{(doc.size / 1024).toFixed(1)} KB</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <Button 
                      onClick={() => fileInputRef.current?.click()}
                      className="bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-white w-full flex items-center justify-center gap-2"
                    >
                      <Upload className="h-4 w-4" />
                      Upload Document
                    </Button>
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      className="hidden" 
                      onChange={handleFileUpload} 
                      multiple
                    />
                  </div>
                )}
                
                <div className="flex items-center gap-2 bg-gray-50 rounded border focus-within:border-[#D4AF37]">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder={activeTab === 'ask' 
                      ? "Can foreigners own property in the UAE?" 
                      : activeTab === 'draft'
                      ? "I need to draft a rental agreement"
                      : activeTab === 'summarize'
                      ? "Ask a question about your uploaded document"
                      : "Ask about your uploaded documents"
                    }
                    className="flex-grow py-3 px-4 bg-transparent outline-none"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleSendMessage();
                      }
                    }}
                  />
                  {(activeTab === 'summarize' || activeTab === 'documents') && (
                    <button 
                      className="p-2 text-gray-500 hover:text-[#D4AF37]"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Paperclip className="w-5 h-5" />
                    </button>
                  )}
                  <button 
                    onClick={handleSendMessage}
                    className="bg-[#D4AF37] text-white p-2 m-1 rounded-full hover:bg-[#D4AF37]/80"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="flex justify-between items-center mt-3 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <span>Jurisdiction: UAE</span>
                    <ChevronDown className="w-3 h-3" />
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button 
                      className="hover:text-gray-700"
                      onClick={() => setMessages([])}
                    >
                      Clear conversation
                    </button>
                    <Info className="w-4 h-4" />
                  </div>
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

export default LegalAssistant;
