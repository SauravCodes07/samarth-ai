import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// If credentials are not set yet, fallback gracefully without crashing
export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  !supabaseUrl.includes('placeholder') &&
  !supabaseAnonKey.includes('placeholder')
);

export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

/**
 * Authentication Helpers for Supabase Auth
 */
export const signUpWithEmail = async (email, password) => {
  if (!supabase) return { data: null, error: { message: "Supabase not configured" } };
  return await supabase.auth.signUp({ email, password });
};

export const signInWithEmail = async (email, password) => {
  if (!supabase) return { data: null, error: { message: "Supabase not configured" } };
  return await supabase.auth.signInWithPassword({ email, password });
};

export const signOut = async () => {
  if (!supabase) return { error: null };
  return await supabase.auth.signOut();
};

export const getCurrentUser = async () => {
  if (!supabase) return null;
  const { data: { user } } = await supabase.auth.getUser();
  return user;
};

/**
 * Helper to sync an advisory inquiry or calculation directly into Supabase live database
 * Table: 'advisory_inquiries'
 */
export const logInquiryToSupabase = async (payload) => {
  if (!isSupabaseConfigured || !supabase) {
    // Graceful offline/local mode
    return { data: null, error: null, offline: true };
  }
  try {
    const { data, error } = await supabase
      .from('advisory_inquiries')
      .insert([
        {
          business_type: payload.business_type,
          business_title: payload.business_title,
          margin_capital: payload.margin_capital,
          investment_amount: payload.investment_amount,
          loan_amount: payload.loan_amount,
          monthly_emi: payload.monthly_emi,
          state: payload.state,
          district: payload.district,
          experience_level: payload.experience_level,
          created_at: new Date().toISOString()
        }
      ]);
    return { data, error, offline: false };
  } catch (err) {
    console.warn('Supabase logging skipped/failed:', err);
    return { data: null, error: err, offline: false };
  }
};
