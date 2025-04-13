
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ChevronLeft, ChevronRight, ArrowLeft, ArrowRight, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BookCard from '@/components/BookCard';
import TopicCard from '@/components/TopicCard';
import { Input } from '@/components/ui/input';

// Sample data
const legalTopics = [
  { id: 1, title: 'Administrative Law', icon: '/lovable-uploads/administrative law.png' },
  { id: 2, title: 'Agricultural Law', icon: '/lovable-uploads/agricultural law.png' },
  { id: 3, title: 'Alternative Dispute Resolution', icon: '/lovable-uploads/alternative dispute reolsution.png' },
  { id: 4, title: 'Antitrust', icon: '/lovable-uploads/antitrust.png' },
  { id: 5, title: 'Banking Law', icon: '/lovable-uploads/banking law.png' },
  { id: 6, title: 'Constitutional Law', icon: '📜' },
  { id: 7, title: 'Contract Law', icon: '/lovable-uploads/contract law.png' },
  { id: 8, title: 'Corporate Law', icon: '/lovable-uploads/corporate law.jpg' }
];

const books = [
  { 
    id: 1, 
    title: 'UAE Labour Law 5th Edition', 
    author: 'Abdel Latif Jumah', 
    year: '2018', 
    coverImage: '/lovable-uploads/image.png' 
  },
  { 
    id: 2, 
    title: 'Mastering UAE Labour Law', 
    author: 'Kavitha G. Raghwendra', 
    year: '2024', 
    coverImage: '/lovable-uploads/image copy 2.png' 
  },
  { 
    id: 3, 
    title: 'Criminal Procedure Law', 
    author: 'Abdel Latif Jumah', 
    year: '2020', 
    coverImage: '/lovable-uploads/image copy 6.png' 
  },
  { 
    id: 4, 
    title: 'Encyclopedia of American Civil Liberties', 
    author: 'Various Authors', 
    year: '2013', 
    coverImage: '/lovable-uploads/image copy 3.png' 
  },
  { 
    id: 5, 
    title: 'Construction Law', 
    author: 'Julian Bailey', 
    year: '2016', 
    coverImage: '/lovable-uploads/image copy 4.png' 
  },
  { 
    id: 6, 
    title: 'The Ethics of Public Health, Volumes 1-3', 
    author: 'Various Authors', 
    year: '2018', 
    coverImage: '/lovable-uploads/image copy 5.png' 
  }
];

const subtopics = [
  { id: 1, title: 'Employment Contracts', count: '126 articles' },
  { id: 2, title: 'Termination Procedures', count: '89 articles' },
  { id: 3, title: 'Compensation Claims', count: '112 articles' },
  { id: 4, title: 'Workplace Safety', count: '74 articles' },
  { id: 5, title: 'Working Hours', count: '56 articles' },
  { id: 6, title: 'Maternity Leave', count: '32 articles' }
];

const Library = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('explore');
  const [selectedJurisdiction, setSelectedJurisdiction] = useState('Jurisdiction');
  const [selectedMonth, setSelectedMonth] = useState('December');
  const [selectedYear, setSelectedYear] = useState('2022');
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  
  // Jurisdiction dropdown
  const [showJurisdictionDropdown, setShowJurisdictionDropdown] = useState(false);
  const [showMonthDropdown, setShowMonthDropdown] = useState(false);
  const [showYearDropdown, setShowYearDropdown] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-white">
        <div className="container mx-auto max-w-7xl px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <BookOpen className="text-[#cc9c24] h-8 w-8" />
              <div>
                <motion.h1
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-3xl md:text-4xl font-bold text-left"
                >
                  AI Powered Legal Library
                </motion.h1>
                <p className="text-gray-600 text-sm md:text-base">Access comprehensive legal resources with advanced AI search capabilities.</p>
              </div>
            </div>
            
            <div className="w-full md:w-auto">
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input 
                  type="text" 
                  placeholder="Search by author, ISBN & topic" 
                  className="pl-10 pr-4 py-2 w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
          
          <div className="flex border-b border-gray-200 mb-8">
            <button
              className={`py-2 px-4 font-medium ${
                activeTab === 'explore' ? 'text-shoora-gold border-b-2 border-shoora-gold' : 'text-gray-600'
              }`}
              onClick={() => setActiveTab('explore')}
            >
              Explore
            </button>
            <button
              className={`py-2 px-4 font-medium ${
                activeTab === 'books' ? 'text-shoora-gold border-b-2 border-shoora-gold' : 'text-gray-600'
              }`}
              onClick={() => setActiveTab('books')}
            >
              Books
            </button>
            <button
              className={`py-2 px-4 font-medium ${
                activeTab === 'subtopics' ? 'text-shoora-gold border-b-2 border-shoora-gold' : 'text-gray-600'
              }`}
              onClick={() => setActiveTab('subtopics')}
            >
              Subtopics
            </button>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-100 rounded-lg p-6 mb-8"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[#cc9c24] text-xl">✦</span>
              <h2 className="text-xl font-semibold">Dive deeper with our AI-powered index</h2>
            </div>
            <p className="text-gray-700">
              Advanced legal library search system with jurisdiction, court level, date, and legal topic filters along with
              AI-powered semantic search that retrieves relevant case laws
            </p>
          </motion.div>
          
          {activeTab === 'explore' && (
            <>
              <div className="mb-12">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Find by topic</h2>
                  <button className="text-[#cc9c24] font-medium">View all</button>
                </div>
                
                <div className="relative">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm text-gray-500">1 of 10</div>
                    <div className="flex gap-2">
                      <button className="p-1 rounded-full border border-gray-300">
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <button className="p-1 rounded-full border border-gray-300">
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {legalTopics.map((topic, index) => (
                      <TopicCard 
                        key={topic.id}
                        icon={<span className="text-2xl">{topic.icon}</span>}
                        title={topic.title}
                        index={index}
                      />
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mb-12">
                <h2 className="text-xl font-semibold mb-4">Find by Jurisdiction, Date and language</h2>
                
                <div className="flex flex-wrap items-center justify-end gap-4 mb-6">
                  <img 
                    src="/lovable-uploads/5c9969f1-298b-49e9-a8ca-641b262bd4c6.png" 
                    alt="Filter options" 
                    className="w-full md:w-auto h-auto"
                  />
                  
                  <div className="hidden">
                    <div className="relative">
                      <button
                        className="flex items-center justify-between gap-2 px-4 py-2 border border-gray-300 rounded-lg bg-white min-w-[180px]"
                        onClick={() => setShowJurisdictionDropdown(!showJurisdictionDropdown)}
                      >
                        <span>{selectedJurisdiction}</span>
                        <ChevronDown className="h-4 w-4" />
                      </button>
                      
                      {showJurisdictionDropdown && (
                        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                          {['UAE', 'Saudi Arabia', 'Qatar', 'Kuwait', 'USA', 'UK'].map((item) => (
                            <div
                              key={item}
                              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                              onClick={() => {
                                setSelectedJurisdiction(item);
                                setShowJurisdictionDropdown(false);
                              }}
                            >
                              {item}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <div className="relative">
                      <button
                        className="flex items-center justify-between gap-2 px-4 py-2 border border-gray-300 rounded-lg bg-white min-w-[180px]"
                        onClick={() => setShowMonthDropdown(!showMonthDropdown)}
                      >
                        <span>{selectedMonth}</span>
                        <ChevronDown className="h-4 w-4" />
                      </button>
                      
                      {showMonthDropdown && (
                        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                          {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((item) => (
                            <div
                              key={item}
                              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                              onClick={() => {
                                setSelectedMonth(item);
                                setShowMonthDropdown(false);
                              }}
                            >
                              {item}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <div className="relative">
                      <button
                        className="flex items-center justify-between gap-2 px-4 py-2 border border-gray-300 rounded-lg bg-white min-w-[120px]"
                        onClick={() => setShowYearDropdown(!showYearDropdown)}
                      >
                        <span>{selectedYear}</span>
                        <ChevronDown className="h-4 w-4" />
                      </button>
                      
                      {showYearDropdown && (
                        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                          {Array.from({ length: 30 }, (_, i) => 2024 - i).map((year) => (
                            <div
                              key={year}
                              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                              onClick={() => {
                                setSelectedYear(year.toString());
                                setShowYearDropdown(false);
                              }}
                            >
                              {year}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <div className="relative">
                      <button
                        className="flex items-center justify-between gap-2 px-4 py-2 border border-gray-300 rounded-lg bg-white min-w-[150px]"
                        onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                      >
                        <span>{selectedLanguage}</span>
                        <ChevronDown className="h-4 w-4" />
                      </button>
                      
                      {showLanguageDropdown && (
                        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                          {['English', 'Arabic', 'Spanish', 'French', 'German'].map((item) => (
                            <div
                              key={item}
                              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                              onClick={() => {
                                setSelectedLanguage(item);
                                setShowLanguageDropdown(false);
                              }}
                            >
                              {item}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
          
          {activeTab === 'books' && (
            <div className="mb-12">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Featured Books</h2>
                <div className="flex items-center gap-2">
                  <div className="text-sm text-gray-500">1 of 4</div>
                  <div className="flex gap-2">
                    <button className="p-1 rounded-full border border-gray-300">
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button className="p-1 rounded-full border border-gray-300">
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {books.map((book, index) => (
                  <BookCard
                    key={book.id}
                    title={book.title}
                    author={book.author}
                    year={book.year}
                    coverImage={book.coverImage}
                    index={index}
                  />
                ))}
              </div>
            </div>
          )}
          
          {activeTab === 'subtopics' && (
            <div className="mb-12">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Labor Law Subtopics</h2>
                <button className="text-[#cc9c24] font-medium">View all</button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {subtopics.map((subtopic) => (
                  <div 
                    key={subtopic.id} 
                    className="p-4 border border-gray-200 rounded-lg hover:border-[#cc9c24] hover:shadow-md transition-all"
                  >
                    <h3 className="font-medium text-lg">{subtopic.title}</h3>
                    <p className="text-sm text-gray-500">{subtopic.count}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Trending</h2>
              <div className="flex items-center gap-2">
                <div className="text-sm text-gray-500">1 of 20</div>
                <div className="flex gap-2">
                  <button className="p-1 rounded-full border border-gray-300">
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button className="p-1 rounded-full border border-gray-300">
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {books.map((book, index) => (
                <BookCard
                  key={book.id}
                  title={book.title}
                  author={book.author}
                  year={book.year}
                  coverImage={book.coverImage}
                  index={index}
                />
              ))}
            </div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mt-12 p-6 rounded-lg bg-shoora-gray/30 border border-gray-200"
          >
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold mb-1">AI-powered RAG model for efficient legal research</h3>
                <p className="text-gray-600">and seamless access to case laws, documents, and training materials.</p>
              </div>
              <Link to="/assistant">
                <button className="shoora-btn-primary bg-[#cc9c24] hover:bg-[#cc9c24]/90">
                  Try AI Assistant <ArrowRight className="h-4 w-4" />
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

const ChevronDown = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 20 20" 
    fill="currentColor" 
    className={className}
  >
    <path 
      fillRule="evenodd" 
      d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" 
      clipRule="evenodd" 
    />
  </svg>
);

export default Library;
