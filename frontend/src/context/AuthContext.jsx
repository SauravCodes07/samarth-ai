import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured, getCurrentUser, signInWithEmail, signUpWithEmail, signOut } from '../services/supabaseClient';

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

  const register = async (email, password) => {
    if (isSupabaseConfigured && supabase) {
      return await signUpWithEmail(email, password);
    } else {
      const demoUser = { email, id: 'demo-beneficiary-101', role: 'Beneficiary' };
      localStorage.setItem('demo_user_auth', JSON.stringify(demoUser));
      setUser(demoUser);
      return { data: { user: demoUser }, error: null };
    }
  };

  const logout = async () => {
    if (isSupabaseConfigured && supabase) {
      await signOut();
    }
    localStorage.removeItem('demo_user_auth');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, isConfigured: isSupabaseConfigured, login, register, logout }}>
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
