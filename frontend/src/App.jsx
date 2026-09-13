import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import FormPage from './pages/FormPage';
import SchemesPage from './pages/SchemesPage';
import CalculatorPage from './pages/CalculatorPage';

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F172A] selection:bg-amber-200 selection:text-amber-900">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/advisory" element={<FormPage />} />
                <Route path="/schemes" element={<SchemesPage />} />
                <Route path="/calculator" element={<CalculatorPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
