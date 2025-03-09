import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Calculator, Phone, Mail, MapPin, Facebook, Instagram, Linkedin, Menu, X, Search, Map, Star, CheckSquare } from 'lucide-react';
import ChatBot from './ChatBot';
import BackgroundAnimation from './BackgroundAnimation';

// Navbar Component
function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();
  
  // Get current active page based on URL path
  const getActivePage = () => {
    const path = location.pathname;
    if (path === '/') return 'home';
    if (path === '/listings') return 'listings';
    if (path === '/sold-properties') return 'sold-properties';
    if (path === '/reviews') return 'reviews';
    if (path === '/calculator') return 'calculator';
    if (path === '/Neighborhood%20Map') return 'neighborhood-map';
    if (path === '/contact') return 'contact';
    return 'home';
  };
  
  const activePage = getActivePage();

  // Active link style - more prominent indicator
  const activeLinkStyle = "text-blue-600 font-semibold border-b-2 border-blue-600";
  const inactiveLinkStyle = "text-gray-700 hover:text-blue-600 hover:border-b-2 hover:border-blue-300";

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Home className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-semibold">Austin McClain</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              to="/" 
              className={`flex items-center px-3 py-2 transition-all duration-200 ${activePage === 'home' ? activeLinkStyle : inactiveLinkStyle}`}
            >
              <Home className="h-5 w-5 mr-1" />
              <span>Home</span>
            </Link>
            {/* <Link 
              to="/listings" 
              className={`flex items-center px-3 py-2 transition-all duration-200 ${activePage === 'listings' ? activeLinkStyle : inactiveLinkStyle}`}
            >
              <Search className="h-5 w-5 mr-1" />
              <span>Listings</span>
            </Link> */}
            <Link 
              to="/calculator" 
              className={`flex items-center px-3 py-2 transition-all duration-200 ${activePage === 'calculator' ? activeLinkStyle : inactiveLinkStyle}`}
            >
              <Calculator className="h-5 w-5 mr-1" />
              <span>Calculator</span>
            </Link>
            <Link 
              to="/Neighborhood%20Map" 
              className={`flex items-center px-3 py-2 transition-all duration-200 ${activePage === 'neighborhood-map' ? activeLinkStyle : inactiveLinkStyle}`}
            >
              <Map className="h-5 w-5 mr-1" />
              <span>Neighborhood Map</span>
            </Link>
            <Link 
              to="/reviews" 
              className={`flex items-center px-3 py-2 transition-all duration-200 ${activePage === 'reviews' ? activeLinkStyle : inactiveLinkStyle}`}
            >
              <Star className="h-5 w-5 mr-1" />
              <span>Client Reviews</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-2">
              <Link 
                to="/" 
                className={`flex items-center px-3 py-2 transition-all duration-200 ${activePage === 'home' ? 'text-blue-600 font-semibold bg-blue-50 rounded-md' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50 hover:rounded-md'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <Home className="h-5 w-5 mr-1" />
                <span>Home</span>
              </Link>
              <Link 
                to="/listings" 
                className={`flex items-center px-3 py-2 transition-all duration-200 ${activePage === 'listings' ? 'text-blue-600 font-semibold bg-blue-50 rounded-md' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50 hover:rounded-md'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <Search className="h-5 w-5 mr-1" />
                <span>Listings</span>
              </Link>
              <Link 
                to="/sold-properties" 
                className={`flex items-center px-3 py-2 transition-all duration-200 ${activePage === 'sold-properties' ? 'text-blue-600 font-semibold bg-blue-50 rounded-md' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50 hover:rounded-md'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <CheckSquare className="h-5 w-5 mr-1" />
                <span>Sold Properties</span>
              </Link>
              <Link 
                to="/reviews" 
                className={`flex items-center px-3 py-2 transition-all duration-200 ${activePage === 'reviews' ? 'text-blue-600 font-semibold bg-blue-50 rounded-md' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50 hover:rounded-md'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <Star className="h-5 w-5 mr-1" />
                <span>Client Reviews</span>
              </Link>
              <Link 
                to="/calculator" 
                className={`flex items-center px-3 py-2 transition-all duration-200 ${activePage === 'calculator' ? 'text-blue-600 font-semibold bg-blue-50 rounded-md' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50 hover:rounded-md'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <Calculator className="h-5 w-5 mr-1" />
                <span>Calculator</span>
              </Link>
              <Link 
                to="/Neighborhood Map" 
                className={`flex items-center px-3 py-2 transition-all duration-200 ${activePage === 'neighborhood-map' ? 'text-blue-600 font-semibold bg-blue-50 rounded-md' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50 hover:rounded-md'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <Map className="h-5 w-5 mr-1" />
                <span>Neighborhood Map</span>
              </Link>
              <Link 
                to="/contact" 
                className={`flex items-center px-3 py-2 transition-all duration-200 ${activePage === 'contact' ? 'text-blue-600 font-semibold bg-blue-50 rounded-md' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50 hover:rounded-md'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <Phone className="h-5 w-5 mr-1" />
                <span>Contact</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

// Footer Component
function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Austin McClain</h3>
            <p className="text-gray-300">Your trusted real estate partner</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact</h3>
            {/* <div className="flex items-center mb-2">
              <MapPin className="h-5 w-5 mr-2" />
              <span>123 Main St, Austin, TX 78701</span>
            </div> */}
            <div className="flex items-center mb-2">
              <Phone className="h-5 w-5 mr-2" />
              <span>(614) 710-4827</span>
            </div>
            <div className="flex items-center">
              <Mail className="h-5 w-5 mr-2" />
              <span>austin@reafco.com</span>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/McClainTeamReafco" className="hover:text-blue-400" target="_blank" rel="noopener noreferrer">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="https://www.instagram.com/austinmcclain_realtor?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" className="hover:text-pink-400" target="_blank" rel="noopener noreferrer">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="https://www.linkedin.com/in/austinmcclain1/" className="hover:text-blue-400" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-6 w-6" />
              </a>
              <a href="https://www.zillow.com/profile/awmcclain" className="hover:text-blue-500" target="_blank" rel="noopener noreferrer">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="h-6 w-6"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} Austin McClain Real Estate. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

// Layout Component
function Layout({ children }: { children: React.ReactNode }) {
  

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <BackgroundAnimation />
      <Navbar />
      <main className="container mx-auto px-4 py-8 flex-grow">
        {children}
      </main>
      <Footer />
    
    </div>
  );
}

export default Layout;
