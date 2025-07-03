import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient';
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const VerifyEmailPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { signIn } = useAuth();

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get('token');
      const type = searchParams.get('type') || 'signup';
      const email = searchParams.get('email');

      if (!token || !email) {
        setStatus('idle');
        return;
      }

      setStatus('loading');

      try {
        // Verify the email with the token
        const { error: verifyError, data } = await supabase.auth.verifyOtp({
          email,
          token,
          type: 'email',
        });

        if (verifyError) throw verifyError;

        // If we have a session, the user is already logged in
        if (data.session) {
          setStatus('success');
          navigate('/dashboard', { replace: true });
          return;
        }

        // If no session, try to sign in with the email
        if (email) {
          // This will trigger the magic link flow if needed
          const { error: signInError } = await signIn(email, '', 'employer');
          
          if (signInError) throw signInError;
          
          setStatus('success');
          navigate('/dashboard', { replace: true });
        }
      } catch (error) {
        console.error('Email verification error:', error);
        setError(error instanceof Error ? error.message : 'Failed to verify email');
        setStatus('error');
      }
    };

    verifyEmail();
  }, [searchParams, navigate, signIn]);

  if (status === 'loading') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-white dark:from-slate-900 dark:to-slate-800 p-4">
        <div className="w-full max-w-md p-8 text-center bg-white dark:bg-slate-800 rounded-lg shadow-lg">
          <Loader2 className="w-12 h-12 mx-auto mb-4 text-blue-600 dark:text-blue-400 animate-spin" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Verifying Your Email</h2>
          <p className="mt-4 text-gray-600 dark:text-gray-300">Please wait while we verify your email address...</p>
        </div>
      </div>
    );
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-white dark:from-slate-900 dark:to-slate-800 p-4">
        <div className="w-full max-w-md p-8 text-center bg-white dark:bg-slate-800 rounded-lg shadow-lg">
          <CheckCircle className="w-12 h-12 mx-auto mb-4 text-green-500" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Email Verified!</h2>
          <p className="mt-4 text-gray-600 dark:text-gray-300">Your email has been successfully verified. Redirecting you to the dashboard...</p>
          <Button 
            className="mt-6" 
            onClick={() => navigate('/dashboard')}
          >
            Go to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-white dark:from-slate-900 dark:to-slate-800 p-4">
        <div className="w-full max-w-md p-8 text-center bg-white dark:bg-slate-800 rounded-lg shadow-lg">
          <AlertCircle className="w-12 h-12 mx-auto mb-4 text-red-500" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Verification Failed</h2>
          <p className="mt-4 text-gray-600 dark:text-gray-300">
            {error || 'There was an error verifying your email. The link may have expired or is invalid.'}
          </p>
          <div className="mt-6 space-y-3">
            <Button 
              variant="outline" 
              onClick={() => window.location.reload()}
              className="w-full"
            >
              Try Again
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => navigate('/login')}
              className="w-full"
            >
              Back to Login
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Default view when no token is present
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-white dark:from-slate-900 dark:to-slate-800 p-4">
      <div className="w-full max-w-md p-8 text-center bg-white dark:bg-slate-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Check Your Email</h2>
        <p className="mt-4 text-gray-600 dark:text-gray-300">
          We've sent a verification link to your email address. Please click the link to activate your account.
        </p>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          (You can close this window after verification.)
        </p>
        <Button 
          variant="outline" 
          onClick={() => navigate('/login')}
          className="mt-6 w-full"
        >
          Back to Login
        </Button>
      </div>
    </div>
  );
};

export default VerifyEmailPage;
