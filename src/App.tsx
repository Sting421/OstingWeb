import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import Layout component
import Layout from './components/Layout';



// Import page components
import HomePage from './pages/HomePage';
// import ListingsPage from './pages/ListingsPage';
// import CalculatorPage from './pages/CalculatorPage';
import ContactPage from './pages/ContactPage';
import NeighborhoodMapPage from './pages/NeighborhoodMapPage';
import ReviewsPage from './pages/ReviewsPage';
import SoldPropertiesPage from './pages/SoldPropertiesPage';
import CalculatorPage from './pages/CalculatorPage';

function App() {


  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* <Route path="/listings" element={<ListingsPage />} />
          <Route path="/calculator" element={<CalculatorPage />} /> */}
          <Route path="/Neighborhood Map" element={<NeighborhoodMapPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/calculator" element={<CalculatorPage />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/sold-properties" element={<SoldPropertiesPage />} />
        </Routes>
        
      </Layout>
    </Router>
  );
}

export default App;
