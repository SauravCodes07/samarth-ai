import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import FormPage from './pages/FormPage';
import SchemesPage from './pages/SchemesPage';
import CalculatorPage from './pages/CalculatorPage';
import ProfilePage from './pages/ProfilePage';

import AIChatbot from './components/AIChatbot';

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <Router>
            <div className="min-h-screen flex flex-col bg-[#F8FAFC] dark:bg-[#090D16] text-[#0F172A] dark:text-[#F8FAFC] selection:bg-amber-200 dark:selection:bg-blue-600/40 selection:text-amber-900 dark:selection:text-blue-200 transition-colors duration-300">
              <Navbar />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/advisory" element={<FormPage />} />
                  <Route path="/schemes" element={<SchemesPage />} />
                  <Route path="/calculator" element={<CalculatorPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                </Routes>
              </main>
              <Footer />
              <AIChatbot />
            </div>
          </Router>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
