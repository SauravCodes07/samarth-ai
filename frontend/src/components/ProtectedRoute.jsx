import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { lang } = useLanguage();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-xs font-semibold text-slate-500">
          {lang === 'mr' ? 'खाते पडताळणी सुरू आहे...' : lang === 'hi' ? 'खाता सत्यापन हो रहा है...' : 'Verifying authentication...'}
        </p>
      </div>
    );
  }

  if (!user) {
    // Cleanly redirect unauthenticated visitors to homepage so modals do not lock or trap them
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
