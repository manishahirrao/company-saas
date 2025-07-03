import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabaseClient';

// User type based on our database schema
interface UserProfile {
  id: string;
  email: string;
  full_name: string | null;
  phone: string | null;
  profile_picture_url: string | null;
  user_type: 'job_seeker' | 'employer' | 'hr_agency' | 'content_creator' | 'admin';
  subscription_tier: 'free' | 'basic' | 'premium' | 'enterprise';
  email_verified: boolean;
  verification_status: 'pending' | 'verified' | 'rejected';
  company_name: string | null;
  created_at: string;
  updated_at: string;
}

interface SignInResult {
  error: Error | null;
  userNotFound?: boolean;
  emailNotVerified?: boolean;
  invalidCredentials?: boolean;
}

interface SignUpResult {
  error: Error | null;
  userExists?: boolean;
  user?: any;
}

interface UpdateProfileResult {
  error: Error | null;
}

interface ResendVerificationResult {
  error: Error | null;
}

interface ResetPasswordResult {
  error: Error | null;
  success: boolean;
}

interface AuthContextType {
  session: Session | null;
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  error: Error | null;
  signIn: (email: string, password: string, role?: string) => Promise<SignInResult>;
  signUp: (email: string, password: string, metadata: { 
    full_name: string; 
    user_type: 'job_seeker' | 'employer' | 'hr_agency' | 'content_creator' | 'admin';
    phone?: string;
    company_name?: string;
  }) => Promise<SignUpResult>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<Omit<UserProfile, 'id' | 'created_at' | 'updated_at'>>) => Promise<UpdateProfileResult>;
  resendVerificationEmail: () => Promise<ResendVerificationResult>;
  resetPassword: (email: string) => Promise<ResetPasswordResult>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchUserProfile = useCallback(async (userId: string) => {
    console.log(`[AuthContext] Fetching profile for user: ${userId}`);
    try {
      const { data, error: profileError, status, statusText } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single();

      console.log(`[AuthContext] Profile fetch response:`, { 
        status, 
        statusText,
        data,
        error: profileError 
      });

      if (profileError) {
        console.error('[AuthContext] Error fetching profile:', profileError);
        throw profileError;
      }
      
      if (!data) {
        console.warn(`[AuthContext] No profile data found for user: ${userId}`);
        return null;
      }
      
      console.log('[AuthContext] Successfully fetched profile:', data);
      return data as UserProfile;
    } catch (error) {
      console.error('[AuthContext] Error in fetchUserProfile:', error);
      throw error;
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    
    const getSession = async () => {
      console.log('[AuthContext] Getting initial session...');
      try {
        setLoading(true);
        const { data: authData, error: authError } = await supabase.auth.getSession();
        const currentSession = authData?.session;
        
        console.log('[AuthContext] Session response:', { 
          hasSession: !!currentSession,
          user: currentSession?.user,
          error: authError 
        });

        if (!isMounted) return;
        
        setSession(currentSession || null);
        setUser(currentSession?.user || null);

        if (currentSession?.user) {
          console.log('[AuthContext] User found, fetching profile...');
          try {
            const userProfile = await fetchUserProfile(currentSession.user.id);
            if (isMounted) {
              setProfile(userProfile);
              console.log('[AuthContext] Profile set:', userProfile);
            }
          } catch (profileError) {
            console.error('[AuthContext] Error fetching profile:', profileError);
            if (isMounted) {
              setProfile(null);
            }
          }
        } else {
          console.log('[AuthContext] No user session found');
          if (isMounted) {
            setProfile(null);
          }
        }
      } catch (error) {
        console.error('[AuthContext] Error in getSession:', error);
        if (isMounted) {
          setError(error instanceof Error ? error : new Error('Failed to get session'));
        }
      } finally {
        if (isMounted) {
          console.log('[AuthContext] Initial load complete');
          setLoading(false);
        }
      }
    };

    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, newSession) => {
      console.log('[AuthContext] Auth state changed:', { event, hasSession: !!newSession });
      
      if (newSession?.user) {
        console.log('[AuthContext] New session detected, user:', newSession.user.email);
        try {
          const userProfile = await fetchUserProfile(newSession.user.id);
          if (isMounted) {
            setSession(newSession);
            setUser(newSession.user);
            setProfile(userProfile);
            console.log('[AuthContext] Updated session and profile');
          }
        } catch (error) {
          console.error('[AuthContext] Error updating profile on auth change:', error);
          if (isMounted) {
            setProfile(null);
          }
        }
      } else {
        console.log('[AuthContext] No session found on auth change');
        if (isMounted) {
          setSession(null);
          setUser(null);
          setProfile(null);
        }
      }
    });
    
    // Initial session load
    getSession();
    
    // Cleanup function
    return () => {
      console.log('[AuthContext] Cleaning up auth listener');
      isMounted = false;
      subscription?.unsubscribe();
    };
  }, [fetchUserProfile]);

  const signIn = async (email: string, password: string, role?: string): Promise<SignInResult> => {
    try {
      setLoading(true);
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        if (signInError.message.includes('Invalid login credentials')) {
          return { 
            error: new Error('Invalid email or password. Please try again.'),
            userNotFound: true
          };
        }
        if (signInError.message.includes('Email not confirmed')) {
          return { 
            error: new Error('Please verify your email before logging in.'),
            emailNotVerified: true
          };
        }
        throw signInError;
      }

      if (data.user) {
        const userProfile = await fetchUserProfile(data.user.id);
        if (role && userProfile?.user_type !== role) {
          await supabase.auth.signOut();
          return { error: new Error(`Please log in with a ${role} account.`) };
        }
        setUser(data.user);
        setProfile(userProfile);
      }

      return { error: null };
    } catch (error) {
      console.error('Sign in error:', error);
      return { 
        error: error instanceof Error ? error : new Error('An error occurred during sign in') 
      };
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, metadata: { 
    full_name: string; 
    user_type: 'job_seeker' | 'employer' | 'hr_agency' | 'content_creator' | 'admin';
    phone?: string;
    company_name?: string;
  }): Promise<SignUpResult> => {
    try {
      setLoading(true);
      // 1. First try to sign up the user with email confirmation
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`,
          data: {
            full_name: metadata.full_name,
            user_type: metadata.user_type,
            phone: metadata.phone || '',
            company_name: metadata.company_name || ''
          },
        },
      });

      if (signUpError) {
        if (signUpError.message.includes('already registered')) {
          // If user exists but not verified, send another verification email
          const { error: signInError } = await signIn(email, password);
          if (signInError) {
            return { 
              error: new Error('This email is already registered. Please check your email for verification.'),
              userExists: true 
            };
          }
        } else {
          throw signUpError;
        }
      }

      // The trigger will handle creating the user profile
      // Return success and the user data
      return { 
        error: null, 
        userExists: false,
        user: data.user // Return the user data for potential redirect
      };
    } catch (error) {
      console.error('Sign up error:', error);
      return { 
        error: error instanceof Error ? error : new Error('An error occurred during sign up'),
        userExists: error instanceof Error && error.message.includes('already registered')
      };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async (): Promise<void> => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
      setProfile(null);
      setSession(null);
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<Omit<UserProfile, 'id' | 'created_at' | 'updated_at'>>): Promise<UpdateProfileResult> => {
    try {
      setLoading(true);
      if (!user) throw new Error('No user is currently signed in');
      
      const { error } = await supabase
        .from('user_profiles')
        .update(updates)
        .eq('id', user.id);

      if (error) throw error;

      // Refresh the profile
      const updatedProfile = await fetchUserProfile(user.id);
      setProfile(updatedProfile);
      return { error: null } as UpdateProfileResult;
    } catch (error) {
      console.error('Error updating profile:', error);
      return { 
        error: error instanceof Error ? error : new Error('Failed to update profile') 
      } as UpdateProfileResult;
    }
  };

  const resendVerificationEmail = async (): Promise<ResendVerificationResult> => {
    try {
      if (!user) {
        throw new Error('No user is currently signed in');
      }
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: user.email!,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`,
        },
      });
      if (error) throw error;
      return { error: null } as ResendVerificationResult;
    } catch (error) {
      console.error('Error resending verification email:', error);
      return { 
        error: error instanceof Error ? error : new Error('Failed to resend verification email') 
      } as ResendVerificationResult;
    }
  };

  const resetPassword = async (email: string): Promise<ResetPasswordResult> => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        console.error('Error sending password reset email:', error);
        return { 
          error: new Error(error.message || 'Failed to send password reset email'),
          success: false 
        };
      }

      return { 
        error: null, 
        success: true 
      };
    } catch (error) {
      console.error('Error in resetPassword:', error);
      return { 
        error: error instanceof Error ? error : new Error('An error occurred while processing your request'),
        success: false
      };
    } finally {
      setLoading(false);
    }
  };

  const value = {
    session,
    user,
    profile,
    loading,
    error,
    signIn,
    signUp,
    signOut,
    updateProfile,
    resendVerificationEmail,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
};

// Export the useAuth hook with proper TypeScript types
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Re-export the AuthContext for advanced use cases
export { AuthContext };

// Export the AuthProvider as both default and named export
export { AuthProvider };
export default AuthProvider;
