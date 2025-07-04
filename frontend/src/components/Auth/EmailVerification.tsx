import { useEffect, useState, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2, MailCheck, AlertCircle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const EmailVerification = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, resendVerificationEmail } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [countdown, setCountdown] = useState(30);
  const [canResend, setCanResend] = useState(false);

  // Get email from location state or user object
  const [email, setEmail] = useState(location.state?.email || user?.email || '');
  const from = location.state?.from || { pathname: '/dashboard' };

  // Update email state when user changes
  useEffect(() => {
    if (user?.email && !email) {
      setEmail(user.email);
    }
  }, [user, email]);

  // Check if user is already verified or not logged in
  useEffect(() => {
    if (!user) {
      // If no user is logged in, redirect to login
      navigate('/login', { 
        state: { 
          message: 'Please log in to verify your email.' 
        },
        replace: true 
      });
      return;
    }

    if (user.email_confirmed_at) {
      // If email is already confirmed, redirect to dashboard
      navigate(from, { replace: true });
    } else {
      // Email state is handled by separate effect
    }
  }, [user, email, from, navigate]);

  // Handle resend verification email with countdown
  const handleResendEmail = useCallback(async () => {
    if (!user?.email) {
      setError('No email address found. Please try signing in again.');
      return;
    }

    try {
      setIsLoading(true);
      setError('');
      setMessage('');
      
      const { error } = await resendVerificationEmail();
      
      if (error) {
        setError(error.message || 'Failed to send verification email. Please try again.');
        return;
      }
      
      setMessage('A new verification email has been sent! Please check your inbox.');
      setCanResend(false);
      setCountdown(30);
      
      // Start countdown
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      // Cleanup interval on unmount
      return () => clearInterval(timer);
      
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      console.error('Resend verification error:', err);
    } finally {
      setIsLoading(false);
    }
  }, [user, resendVerificationEmail]);

  // Initial email send on component mount
  useEffect(() => {
    if (user?.email && !user.email_confirmed_at) {
      handleResendEmail();
    }
  }, [user, handleResendEmail]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <MailCheck className="h-8 w-8 text-primary mr-2" />
            <CardTitle className="text-2xl font-bold">Verify Your Email</CardTitle>
          </div>
          <CardDescription className="text-center">
            We've sent a verification link to
          </CardDescription>
          <div className="text-center font-medium">{email}</div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {message && (
            <div className="p-3 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-md text-sm">
              {message}
            </div>
          )}
          
          {error && (
            <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-md text-sm flex items-start">
              <AlertCircle className="h-4 w-4 mt-0.5 mr-2 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}
          
          <div className="text-sm text-muted-foreground text-center">
            Please check your email and click the verification link to complete your registration.
            If you don't see the email, please check your spam folder.
          </div>
        </CardContent>
        
        <CardFooter className="flex flex-col space-y-4">
          <Button 
            onClick={handleResendEmail} 
            disabled={isLoading || !canResend}
            className="w-full"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              `Resend Email${!canResend ? ` (${countdown}s)` : ''}`
            )}
          </Button>
          
          <div className="flex flex-col space-y-2 text-sm text-muted-foreground text-center">
            <div>
              Already verified?{' '}
              <button 
                onClick={() => window.location.reload()}
                className="text-primary hover:underline font-medium"
              >
                Refresh page
              </button>
            </div>
            <div>
              <Link 
                to="/login" 
                className="inline-flex items-center text-primary hover:underline font-medium"
              >
                <ArrowLeft className="h-4 w-4 mr-1" /> Back to login
              </Link>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default EmailVerification;
