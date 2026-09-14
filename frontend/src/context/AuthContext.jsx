import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured, getCurrentUser, signInWithEmail, signUpWithEmail, signOut, signInWithGoogle } from '../services/supabaseClient';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let subscription = null;
    const initAuth = async () => {
      try {
        if (isSupabaseConfigured && supabase) {
          const u = await getCurrentUser();
          setUser(u);

          const { data } = supabase.auth.onAuthStateChange((event, session) => {
            setUser(session?.user || null);
          });
          subscription = data?.subscription;
        } else {
          // Local demo session for hackathon demo fallback
          const localUser = localStorage.getItem('demo_user_auth');
          if (localUser) {
            setUser(JSON.parse(localUser));
          }
        }
      } catch (err) {
        console.warn('Auth init note:', err);
      } finally {
        setLoading(false);
      }
    };

    initAuth();

    return () => {
      if (subscription) subscription.unsubscribe();
    };
  }, []);

  const login = async (email, password) => {
    if (isSupabaseConfigured && supabase) {
      const res = await signInWithEmail(email, password);
      if (res.data?.user) setUser(res.data.user);
      return res;
    } else {
      // Demo fallback
      const demoUser = { email, id: 'demo-beneficiary-101', role: 'Beneficiary' };
      localStorage.setItem('demo_user_auth', JSON.stringify(demoUser));
      setUser(demoUser);
      return { data: { user: demoUser }, error: null };
    }
  };

  const register = async (email, password, metadata = {}) => {
    if (isSupabaseConfigured && supabase) {
      const res = await signUpWithEmail(email, password, metadata);
      if (res.data?.user) {
        setUser(res.data.user);
      }
      return res;
    } else {
      const demoUser = { 
        email, 
        id: 'beneficiary-' + Date.now(), 
        role: 'Beneficiary',
        user_metadata: metadata
      };
      localStorage.setItem('demo_user_auth', JSON.stringify(demoUser));
      setUser(demoUser);
      return { data: { user: demoUser }, error: null };
    }
  };

  const loginWithGoogle = async () => {
    if (isSupabaseConfigured && supabase) {
      return await signInWithGoogle();
    } else {
      const demoUser = { email: 'user@google.com', id: 'google-beneficiary-101', role: 'Beneficiary' };
      localStorage.setItem('demo_user_auth', JSON.stringify(demoUser));
      setUser(demoUser);
      return { data: { user: demoUser }, error: null };
    }
  };

  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');

  const openAuthModal = (mode = 'login') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  const closeAuthModal = () => {
    setShowAuthModal(false);
  };

  const logout = async () => {
    if (isSupabaseConfigured && supabase) {
      await signOut();
    }
    localStorage.removeItem('demo_user_auth');
    setUser(null);
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        loading, 
        isConfigured: isSupabaseConfigured, 
        login, 
        register, 
        loginWithGoogle, 
        logout,
        showAuthModal,
        setShowAuthModal,
        authMode,
        setAuthMode,
        openAuthModal,
        closeAuthModal
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
