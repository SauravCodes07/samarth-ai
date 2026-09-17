import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured, getCurrentUser, signInWithEmail, signUpWithEmail, signOut, signInWithGoogle } from '../services/supabaseClient';
import { apiRegisterUser, apiLoginUser, apiUpdateProfile, apiChangePassword } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const localUser = localStorage.getItem('demo_user_auth');
      return localUser ? JSON.parse(localUser) : null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(() => {
    try {
      return !localStorage.getItem('demo_user_auth') && isSupabaseConfigured;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    let subscription = null;
    const initAuth = async () => {
      try {
        const localUser = localStorage.getItem('demo_user_auth');
        if (localUser) {
          const parsed = JSON.parse(localUser);
          setUser(parsed);
        }
        if (isSupabaseConfigured && supabase) {
          const u = await getCurrentUser();
          if (u) setUser(u);

          const { data } = supabase.auth.onAuthStateChange((event, session) => {
            if (session?.user) {
              setUser(session.user);
            }
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

    // Sole Chief Nodal Officer & Administrator login bypass
    if (cleanEmail === 'ghansushayal@gmail.com' && cleanPass === 'Samarth@2026') {
      const adminUser = { 
        email: 'ghansushayal@gmail.com', 
        id: 'samarth-nodal-admin-01', 
        role: 'Admin',
        full_name: 'Chief Nodal Officer & Administrator',
        user_metadata: { 
          full_name: 'Chief Nodal Officer & Administrator',
          role: 'Admin',
          department: 'MoSJE / State Channelizing Agency'
        }
      };
      localStorage.setItem('demo_user_auth', JSON.stringify(adminUser));
      localStorage.setItem('samarth_admin_user', JSON.stringify({
        email: 'ghansushayal@gmail.com',
        name: 'Chief Nodal Officer & Administrator',
        role: 'Chief Scheme Ingestion & Verification Officer'
      }));
      setUser(adminUser);
      return { data: { user: adminUser }, error: null };
    }

    // 1. Authenticate against database via backend API
    try {
      const backendRes = await apiLoginUser(cleanEmail, cleanPass);
      if (backendRes?.user) {
        const u = backendRes.user;
        localStorage.setItem('demo_user_auth', JSON.stringify(u));
        if (u.role === 'Admin' || cleanEmail === 'ghansushayal@gmail.com') {
          localStorage.setItem('samarth_admin_user', JSON.stringify({
            email: u.email,
            name: u.full_name || 'Chief Nodal Officer & Administrator',
            role: 'Chief Scheme Ingestion & Verification Officer'
          }));
        }
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

    // 1. Strictly block creating an account with the reserved Admin email
    if (cleanEmail === 'ghansushayal@gmail.com') {
      return { 
        data: null, 
        error: { message: "This administrative email address already exists. Please sign in instead." } 
      };
    }

    // 2. Prevent re-registering if already logged in to this account
    if (user && user.email === cleanEmail) {
      return {
        data: null,
        error: { message: "You are already logged into this account. Sign out first if you wish to register another account." }
      };
    }
    
    try {
      // 3. Register in backend database
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
      const detail = err.response?.data?.detail || err.message || "An account with this email address already exists. Please sign in instead.";
      return { data: null, error: { message: detail } };
    }

    return {
      data: null,
      error: { message: "Registration could not be completed. If you already have an account, please sign in." }
    };
  };

  const updateUserProfile = async (profileData) => {
    if (!user) throw new Error("No active user session.");
    const email = user.email;

    try {
      const res = await apiUpdateProfile({
        email,
        full_name: profileData.full_name,
        phone: profileData.phone,
        state: profileData.state
      });

      if (res?.user) {
        const updated = {
          ...user,
          ...res.user,
          user_metadata: {
            ...user.user_metadata,
            ...res.user.user_metadata
          }
        };
        localStorage.setItem('demo_user_auth', JSON.stringify(updated));
        setUser(updated);
        return updated;
      }
    } catch (err) {
      console.warn("Backend update error, falling back locally:", err);
    }

    // Fallback update
    const updated = {
      ...user,
      full_name: profileData.full_name ?? user.full_name,
      phone: profileData.phone ?? user.phone,
      state: profileData.state ?? user.state,
      user_metadata: {
        ...user.user_metadata,
        full_name: profileData.full_name ?? (user.user_metadata?.full_name || user.full_name),
        phone: profileData.phone ?? (user.user_metadata?.phone || user.phone),
        state: profileData.state ?? (user.user_metadata?.state || user.state)
      }
    };
    localStorage.setItem('demo_user_auth', JSON.stringify(updated));
    setUser(updated);
    return updated;
  };

  const changeUserPassword = async (currentPassword, newPassword) => {
    if (!user) throw new Error("No active user session.");
    return await apiChangePassword({
      email: user.email,
      current_password: currentPassword,
      new_password: newPassword
    });
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
        updateUserProfile,
        changeUserPassword,
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
