import ChatBot from '../components/ChatBot';
import { Home, Search, Calculator, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">Austin McClain</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">YOUR TRUSTED REAL ESTATE AGENT IN OHIO.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
        <div className="flex flex-col justify-center">
          <h2 className="text-2xl font-semibold mb-6">How can we help you today?</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <Link to="/listings" className="flex items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-4">
                <Search size={24} />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Browse Listings</h3>
                <p className="text-sm text-gray-500">Find your dream home</p>
              </div>
            </Link>
            
            <Link to="/calculator" className="flex items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-4">
                <Calculator size={24} />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Mortgage Calculator</h3>
                <p className="text-sm text-gray-500">Plan your financing</p>
              </div>
            </Link>
            
            <Link to="/" className="flex items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-4">
                <Home size={24} />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Selling Options</h3>
                <p className="text-sm text-gray-500">Get the best value</p>
              </div>
            </Link>
            
            <Link to="/contact" className="flex items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-4">
                <Phone size={24} />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Contact Us</h3>
                <p className="text-sm text-gray-500">Get personalized help</p>
              </div>
            </Link>
          </div>
          
          <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
            <h3 className="text-lg font-medium text-blue-800 mb-2">Why Choose Austin McClain Real Estate?</h3>
            <ul className="text-blue-700 space-y-2">
              <li>✓ Local expertise in the Austin market</li>
              <li>✓ Personalized service tailored to your needs</li>
              <li>✓ Access to exclusive listings</li>
              <li>✓ Transparent and stress-free process</li>
            </ul>
          </div>
        </div>
        
        <div>
          <ChatBot />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
