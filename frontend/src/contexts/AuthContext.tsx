import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabaseClient';

// Define the user profile type based on your public.users table
export type Profile = {
  id: string;
  full_name: string;
  user_type: 'job_seeker' | 'employer' | 'hr_agency' | 'content_creator';
  email_verified: boolean;
  verification_status: 'pending' | 'verified' | 'rejected';
  // Add other fields from your users table here
};

type AuthContextType = {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  signIn: (email: string, password: string, role?: string) => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string, metadata: { full_name: string; user_type: string }) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const setData = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Error getting session:', error);
        setLoading(false);
        return;
      }

      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        const { data: userProfile } = await supabase
          .from('users')
          .select('*')
          .eq('id', session.user.id)
          .single();
        setProfile(userProfile as Profile | null);
      }
      setLoading(false);
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        supabase
          .from('users')
          .select('*')
          .eq('id', session.user.id)
          .single()
          .then(({ data }) => setProfile(data as Profile | null));
      } else {
        setProfile(null);
      }
    });

    setData();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string, role?: string) => {
    try {
      // 1. Check if user exists and is verified
      const { data: userProfile, error: profileError } = await supabase
        .from('users')
        .select('email_verified, verification_status, user_type')
        .eq('email', email)
        .single();

      if (profileError || !userProfile) {
        return { error: new Error('Account not found. Please register.') };
      }

      // Check if the user has the required role (if specified)
      if (role && userProfile.user_type !== role) {
        return { error: new Error(`Please log in with a ${role} account.`) };
      }

      if (!userProfile.email_verified || userProfile.verification_status !== 'verified') {
        return { error: new Error('Please verify your email before logging in.') };
      }

      // 2. If checks pass, attempt to sign in
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      return { error };
    } catch (error) {
      console.error('Sign in error:', error);
      return { error: error instanceof Error ? error : new Error('An error occurred during sign in') };
    }
  };

  const signUp = async (email: string, password: string, metadata: { full_name: string; user_type: string }) => {
    // The trigger 'handle_new_user' will automatically create the public.users record.
    // We just need to pass the metadata during signup.
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata, // This data is accessible in the trigger
      },
    });

    if (error) {
      return { error };
    }

    // Supabase sends a verification email by default if enabled in your project settings.
    return { error: null };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
    setSession(null);
  };

  const value = {
    session,
    user,
    profile,
    loading,
    signIn,
    signUp,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
