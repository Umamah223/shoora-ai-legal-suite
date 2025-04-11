
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, User, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <nav className="sticky top-0 z-50 bg-[#D4AF37] w-full py-2.5 px-4 md:px-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="font-bold text-2xl text-white">Shoora</Link>
          
          <div className="hidden md:flex relative w-[400px]">
            <input
              type="text"
              placeholder="Search by title, author, ISBN & topic"
              className="py-2 px-4 pr-10 w-full rounded-md text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-500" />
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <Link to="/court-simulation" className="text-white hover:text-shoora-offwhite">
            Court Training Simulation
          </Link>
          
          <Link to="/assistant" className="text-white hover:text-shoora-offwhite">
            Legal Assistant
          </Link>
          
          <Link to="/library" className="text-white hover:text-shoora-offwhite">
            Library
          </Link>
          
          <Link to="/accessibility" className="text-white hover:text-shoora-offwhite">
            Accessibility
          </Link>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" className="bg-white text-shoora-gold hover:bg-shoora-offwhite">
              Login
            </Button>
            
            <Button className="bg-shoora-darkgray text-white hover:bg-shoora-darkgray/90">
              Sign up to read
            </Button>
            
            <div className="p-2 hover:bg-shoora-gold-dark/20 rounded-full cursor-pointer">
              <Globe className="h-5 w-5 text-white" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
