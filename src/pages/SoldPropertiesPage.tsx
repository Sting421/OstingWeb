import Layout from '../components/Layout';

function SoldPropertiesPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-600 mb-4">Sold Properties</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            View our recently sold properties in the Columbus area.
          </p>
        </div>
        
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-100 mb-8">
          <h3 className="text-lg font-medium text-blue-800 mb-2">Looking to sell your property?</h3>
          <p className="text-blue-700 mb-4">
            Contact Austin today to get a comprehensive market analysis and selling strategy tailored to your property.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="mailto:austin@reafco.com" 
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors inline-flex items-center justify-center"
            >
              Email: austin@reafco.com
            </a>
            <a 
              href="tel:+16147104827" 
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors inline-flex items-center justify-center"
            >
              Call: (614) 710-4827
            </a>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Placeholder for sold properties - to be populated with actual data */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-48 bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">Property Image</span>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg mb-2">SOLD: 123 Main Street</h3>
              <p className="text-gray-700 mb-2">Columbus, OH 43215</p>
              <p className="text-blue-600 font-semibold">$350,000</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-48 bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">Property Image</span>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg mb-2">SOLD: 456 Oak Avenue</h3>
              <p className="text-gray-700 mb-2">Dublin, OH 43017</p>
              <p className="text-blue-600 font-semibold">$425,000</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-48 bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">Property Image</span>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg mb-2">SOLD: 789 Maple Drive</h3>
              <p className="text-gray-700 mb-2">Westerville, OH 43081</p>
              <p className="text-blue-600 font-semibold">$380,000</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default SoldPropertiesPage;
