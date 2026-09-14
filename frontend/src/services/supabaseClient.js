import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://zcbvtrglxlrhgsfgoyuh.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpjYnZ0cmdseGxyaGdzZmdveXVoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODkzMDczNjMsImV4cCI6MjEwNDg4MzM2M30.bKITwGhfHmHGMOwRNUHIXS91yi801MYZIItmVUWRy6U';

// Always active with fallback credentials
export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  !supabaseUrl.includes('placeholder')
);

export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey, {
      realtime: {
        params: {
          eventsPerSecond: 10,
        },
      },
    })
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

export const signInWithGoogle = async () => {
  if (!supabase) return { data: null, error: { message: "Supabase not configured" } };
  return await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: window.location.origin
    }
  });
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
    return { data: null, error: null, offline: true };
  }
  try {
    const user = await getCurrentUser();
    const { data, error } = await supabase
      .from('advisory_inquiries')
      .insert([
        {
          user_id: user?.id || null,
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
      ])
      .select();
    return { data, error, offline: false };
  } catch (err) {
    console.warn('Supabase logging skipped/failed:', err);
    return { data: null, error: err, offline: false };
  }
};

/**
 * Fetch live inquiries from Supabase
 */
export const fetchRecentInquiries = async (limit = 10) => {
  if (!supabase) return [];
  try {
    const { data, error } = await supabase
      .from('advisory_inquiries')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);
    if (error) throw error;
    return data || [];
  } catch (err) {
    console.warn('Failed to fetch inquiries:', err);
    return [];
  }
};

/**
 * Subscribe to real-time changes across all connected devices
 */
export const subscribeToInquiries = (callback) => {
  if (!supabase) return () => {};
  const channel = supabase
    .channel('realtime_inquiries')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'advisory_inquiries' },
      (payload) => {
        callback && callback(payload);
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
};
