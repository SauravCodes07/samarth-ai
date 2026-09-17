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
import AdminPage from './pages/AdminPage';

import ProtectedRoute from './components/ProtectedRoute';
import AIChatbot from './components/AIChatbot';
import ErrorBoundary from './components/ErrorBoundary';
import { useAuth } from './context/AuthContext';
import { Navigate } from 'react-router-dom';

const HomeRoute = () => {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  if (user) {
    return <Navigate to="/schemes" replace />;
  }
  return <Home />;
};

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <Router>
            <div className="min-h-screen flex flex-col bg-[#F8FAFC] dark:bg-[#090D16] text-[#0F172A] dark:text-[#F8FAFC] selection:bg-amber-200 dark:selection:bg-blue-600/40 selection:text-amber-900 dark:selection:text-blue-200 transition-colors duration-300">
              <Navbar />
              <main className="flex-grow">
                <ErrorBoundary>
                  <Routes>
                    <Route path="/" element={<HomeRoute />} />
                    <Route path="/advisory" element={<ProtectedRoute><FormPage /></ProtectedRoute>} />
                    <Route path="/schemes" element={<ProtectedRoute><SchemesPage /></ProtectedRoute>} />
                    <Route path="/calculator" element={<ProtectedRoute><CalculatorPage /></ProtectedRoute>} />
                    <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
                    <Route path="/admin" element={<AdminPage />} />
                  </Routes>
                </ErrorBoundary>
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
