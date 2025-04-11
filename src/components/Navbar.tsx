
import { Link } from 'react-router-dom';
import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-[#D4AF37] w-full py-2.5 px-4 md:px-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="font-bold text-2xl text-white">Shoora</Link>
          
          <div className="hidden md:flex items-center gap-5">
            <Link to="/library" className="text-white hover:text-shoora-offwhite">
              Digital Library
            </Link>
            
            <Link to="/assistant" className="text-white hover:text-shoora-offwhite">
              Legal Assistant
            </Link>
            
            <Link to="/court-simulation" className="text-white hover:text-shoora-offwhite">
              Virtual Court Simulation
            </Link>
            
            <Link to="/accessibility" className="text-white hover:text-shoora-offwhite">
              Accessibility
            </Link>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" className="bg-white text-shoora-gold hover:bg-shoora-offwhite">
            Login
          </Button>
          
          <Link to="/signup">
            <Button className="bg-shoora-darkgray text-white hover:bg-shoora-darkgray/90">
              Sign up to read
            </Button>
          </Link>
          
          <div className="p-2 hover:bg-shoora-gold-dark/20 rounded-full cursor-pointer">
            <Globe className="h-5 w-5 text-white" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
