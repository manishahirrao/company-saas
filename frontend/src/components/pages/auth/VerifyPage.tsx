import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Mail, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export function VerifyPage() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const { user, resendVerificationEmail } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to dashboard if email is already verified
    if (user?.email_confirmed_at) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleResendEmail = async () => {
    try {
      setStatus('loading');
      setMessage('Sending verification email...');
      
      await resendVerificationEmail();
      
      setStatus('success');
      setMessage('Verification email sent! Please check your inbox.');
    } catch (error) {
      console.error('Error resending verification email:', error);
      setStatus('error');
      setMessage('Failed to send verification email. Please try again.');
    } finally {
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
            {status === 'success' ? (
              <CheckCircle className="h-6 w-6 text-green-600" />
            ) : status === 'error' ? (
              <AlertCircle className="h-6 w-6 text-red-600" />
            ) : (
              <Mail className="h-6 w-6 text-blue-600" />
            )}
          </div>
          <CardTitle className="text-2xl font-bold">
            {status === 'success' ? 'Check Your Inbox' : 'Verify Your Email'}
          </CardTitle>
          <CardDescription>
            {status === 'success'
              ? 'We\'ve sent a verification link to your email address.'
              : 'Please verify your email address to continue.'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <p className="text-sm text-gray-600">
            We've sent a verification link to <span className="font-medium">{user?.email}</span>.
            Please click the link to verify your email address.
          </p>
          
          {message && (
            <div className={`p-3 rounded-md text-sm ${
              status === 'error' 
                ? 'bg-red-50 text-red-700' 
                : status === 'success'
                ? 'bg-green-50 text-green-700'
                : 'bg-blue-50 text-blue-700'
            }`}>
              {message}
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button 
            onClick={handleResendEmail}
            disabled={status === 'loading'}
            className="w-full"
          >
            {status === 'loading' ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              'Resend Verification Email'
            )}
          </Button>
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => navigate('/login')}
          >
            Back to Login
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default VerifyPage;
