import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './ChatBot.css';

// Import Layout component
import Layout from './components/Layout';

// Import page components
import HomePage from './pages/HomePage';
import ListingsPage from './pages/ListingsPage';
import CalculatorPage from './pages/CalculatorPage';
import ContactPage from './pages/ContactPage';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/listings" element={<ListingsPage />} />
          <Route path="/calculator" element={<CalculatorPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
