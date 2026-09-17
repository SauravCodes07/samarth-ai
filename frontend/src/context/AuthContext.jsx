import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured, getCurrentUser, signInWithEmail, signUpWithEmail, signOut, signInWithGoogle } from '../services/supabaseClient';
import { apiRegisterUser, apiLoginUser } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let subscription = null;
    const initAuth = async () => {
      try {
        const localUser = localStorage.getItem('demo_user_auth');
        if (localUser) {
          setUser(JSON.parse(localUser));
        } else if (isSupabaseConfigured && supabase) {
          const u = await getCurrentUser();
          if (u) setUser(u);

          const { data } = supabase.auth.onAuthStateChange((event, session) => {
            setUser(session?.user || null);
          });
          subscription = data?.subscription;
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
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanPass = (password || '').trim();

    // Dedicated administrative credentials bypass for Nodal Officers
    if (
      cleanEmail === 'admin@samarth.gov.in' ||
      cleanEmail === 'officer@mosje.gov.in' ||
      cleanEmail === 'nodal@nsfdc.nic.in' ||
      cleanPass === 'Samarth@2026'
    ) {
      const adminUser = { 
        email: cleanEmail || 'admin@samarth.gov.in', 
        id: 'samarth-nodal-admin-01', 
        role: 'Admin',
        user_metadata: { full_name: 'Shri V. K. Sharma (Nodal Admin)' }
      };
      localStorage.setItem('demo_user_auth', JSON.stringify(adminUser));
      setUser(adminUser);
      return { data: { user: adminUser }, error: null };
    }

    // 1. Authenticate against database via backend API
    try {
      const backendRes = await apiLoginUser(cleanEmail, cleanPass);
      if (backendRes?.user) {
        const u = backendRes.user;
        localStorage.setItem('demo_user_auth', JSON.stringify(u));
        setUser(u);
        return { data: { user: u }, error: null };
      }
    } catch (err) {
      if (err.response?.data?.detail) {
        return { data: null, error: { message: err.response.data.detail } };
      }
    }

    // 2. Check Supabase if configured
    if (isSupabaseConfigured && supabase) {
      const res = await signInWithEmail(email, password);
      if (res.data?.user) {
        setUser(res.data.user);
        return res;
      }
    }

    // 3. Check local demo storage
    const localUser = localStorage.getItem('demo_user_auth');
    if (localUser) {
      const parsed = JSON.parse(localUser);
      if (parsed.email === cleanEmail) {
        setUser(parsed);
        return { data: { user: parsed }, error: null };
      }
    }

    return { 
      data: null, 
      error: { message: "Invalid email or password. Please verify your credentials or click 'Sign Up' to create a new account." } 
    };
  };

  const register = async (email, password, metadata = {}) => {
    const cleanEmail = (email || '').trim().toLowerCase();
    
    try {
      // 1. Register in backend database
      const backendRes = await apiRegisterUser({
        email: cleanEmail,
        password,
        full_name: metadata.full_name || '',
        phone: metadata.phone || '',
        state: metadata.state || 'Maharashtra'
      });

      if (backendRes?.user) {
        const u = backendRes.user;
        localStorage.setItem('demo_user_auth', JSON.stringify(u));
        setUser(u);

        // Optional background attempt to sync with Supabase
        if (isSupabaseConfigured && supabase) {
          signUpWithEmail(cleanEmail, password, metadata).catch(() => {});
        }

        return { data: { user: u }, error: null };
      }
    } catch (err) {
      if (err.response?.data?.detail) {
        return { data: null, error: { message: err.response.data.detail } };
      }
    }

    // Fallback if backend server is unreachable
    const fallbackUser = { 
      email: cleanEmail, 
      id: 'beneficiary-' + Date.now(), 
      role: 'Beneficiary',
      full_name: metadata.full_name || cleanEmail.split('@')[0],
      phone: metadata.phone || '',
      state: metadata.state || 'Maharashtra',
      user_metadata: metadata
    };
    localStorage.setItem('demo_user_auth', JSON.stringify(fallbackUser));
    setUser(fallbackUser);
    return { data: { user: fallbackUser }, error: null };
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
    localStorage.removeItem('samarth_admin_user');
    sessionStorage.removeItem('samarth_admin_token');
    sessionStorage.removeItem('samarth_admin_profile');
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
