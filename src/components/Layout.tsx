import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Calculator, Phone, Mail, MapPin, Facebook, Instagram, Linkedin, Menu, X, Search } from 'lucide-react';

// Navbar Component
function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();
  
  // Get current active page based on URL path
  const getActivePage = () => {
    const path = location.pathname;
    if (path === '/') return 'home';
    if (path === '/listings') return 'listings';
    if (path === '/calculator') return 'calculator';
    if (path === '/contact') return 'contact';
    return 'home';
  };
  
  const activePage = getActivePage();

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
              className={`flex items-center px-3 py-2 ${activePage === 'home' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
            >
              <Home className="h-5 w-5 mr-1" />
              <span>Home</span>
            </Link>
            <Link 
              to="/listings" 
              className={`flex items-center px-3 py-2 ${activePage === 'listings' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
            >
              <Search className="h-5 w-5 mr-1" />
              <span>Listings</span>
            </Link>
            <Link 
              to="/calculator" 
              className={`flex items-center px-3 py-2 ${activePage === 'calculator' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
            >
              <Calculator className="h-5 w-5 mr-1" />
              <span>Calculator</span>
            </Link>
            <Link 
              to="/contact" 
              className={`flex items-center px-3 py-2 ${activePage === 'contact' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
            >
              <Phone className="h-5 w-5 mr-1" />
              <span>Contact</span>
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
                className={`flex items-center px-3 py-2 ${activePage === 'home' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <Home className="h-5 w-5 mr-1" />
                <span>Home</span>
              </Link>
              <Link 
                to="/listings" 
                className={`flex items-center px-3 py-2 ${activePage === 'listings' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <Search className="h-5 w-5 mr-1" />
                <span>Listings</span>
              </Link>
              <Link 
                to="/calculator" 
                className={`flex items-center px-3 py-2 ${activePage === 'calculator' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <Calculator className="h-5 w-5 mr-1" />
                <span>Calculator</span>
              </Link>
              <Link 
                to="/contact" 
                className={`flex items-center px-3 py-2 ${activePage === 'contact' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
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
            <p className="text-gray-300">Your trusted real estate partner in Austin, TX.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact</h3>
            <div className="flex items-center mb-2">
              <MapPin className="h-5 w-5 mr-2" />
              <span>123 Main St, Austin, TX 78701</span>
            </div>
            <div className="flex items-center mb-2">
              <Phone className="h-5 w-5 mr-2" />
              <span>(512) 555-1234</span>
            </div>
            <div className="flex items-center">
              <Mail className="h-5 w-5 mr-2" />
              <span>contact@austinmcclain.com</span>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-400">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="hover:text-pink-400">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="hover:text-blue-500">
                <Linkedin className="h-6 w-6" />
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
      <Navbar />
      <main className="container mx-auto px-4 py-8 flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
