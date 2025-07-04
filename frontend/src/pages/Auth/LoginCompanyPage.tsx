import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardDescription, CardFooter } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabaseClient';
import { ArrowRight, Building2, Eye, EyeOff, Mail, Lock, Loader2, AlertCircle } from 'lucide-react';
import { toast } from 'react-toastify';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const LoginCompanyPage: React.FC = () => {
  // Debug: Test Supabase connection
  useEffect(() => {
    const testConnection = async () => {
      console.log('Testing Supabase connection...');
      try {
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .limit(1);
          
        if (error) {
          console.error('Supabase connection error:', error);
        } else {
          console.log('Successfully connected to Supabase!');
        }
      } catch (err) {
        console.error('Error testing Supabase connection:', err);
      }
    };

    testConnection();
  }, []);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showResetDialog, setShowResetDialog] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [isResetting, setIsResetting] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  
  const navigate = useNavigate();
  const { signIn, resetPassword } = useAuth();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dashboard';

  // Check for email and message in location state (e.g., after registration or when user exists)
  useEffect(() => {
    if (location.state?.email) {
      setEmail(location.state.email);
      
      // Show message if provided (e.g., when redirected from registration)
      if (location.state?.message) {
        toast.info(location.state.message);
      }
      
      // Clear the state to avoid keeping it after refresh
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Basic validation
    if (!email || !password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    try {
      const { error, userNotFound, emailNotVerified, invalidCredentials } = await signIn(email, password, 'employer');
      
      if (userNotFound) {
        // Redirect to registration with email pre-filled
        navigate('/company/register', { 
          state: { 
            email,
            message: 'No account found with this email. Please register.'
          },
          replace: true 
        });
        return;
      }

      if (emailNotVerified) {
        // Redirect to verification page with email pre-filled
        navigate('/verify-email', { 
          state: { 
            email,
            from: from, // Keep the original destination
            message: 'Please verify your email before logging in. A new verification email has been sent.'
          },
          replace: true 
        });
        return;
      }

      if (invalidCredentials) {
        setLoginAttempts(prev => prev + 1);
        setError('Incorrect password. Please try again.');
        return;
      }

      if (error) {
        throw error;
      }
      
      // Reset login attempts on successful login
      setLoginAttempts(0);
      
      // On successful login, redirect to the dashboard or previous location
      navigate(from, { replace: true });
      toast.success('Successfully logged in!');
    } catch (error) {
      console.error('Login error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to sign in. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    if (!resetEmail) {
      toast.error('Please enter your email address');
      return;
    }

    setIsResetting(true);
    try {
      const { error, success } = await resetPassword(resetEmail);
      
      if (error) {
        toast.error(error.message || 'Failed to send password reset email');
      } else if (success) {
        setResetSent(true);
        toast.success('Password reset link sent to your email!');
        setShowResetDialog(false);
        setResetEmail('');
      }
    } catch (error) {
      console.error('Password reset error:', error);
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <Building2 className="h-8 w-8 text-primary mr-2" />
            <span className="text-2xl font-bold text-foreground">Company Login</span>
          </div>
          <CardDescription className="text-center text-muted-foreground">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  {error}
                  {loginAttempts > 2 && (
                    <div className="mt-2">
                      <button 
                        type="button" 
                        onClick={() => setShowResetDialog(true)}
                        className="text-sm font-medium text-primary hover:underline"
                      >
                        Forgot your password?
                      </button>
                    </div>
                  )}
                </AlertDescription>
              </Alert>
            )}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@company.com"
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-foreground">Password</Label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-sm text-primary hover:underline dark:text-primary-foreground"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="pl-10 pr-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => {
                  setResetEmail(email);
                  setShowResetDialog(true);
                }}
                className="text-sm text-primary hover:underline"
              >
                Forgot password?
              </button>
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign in
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>
          <div className="mt-4 text-center">
            <Link
              to="/login"
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              ← Back to regular login
            </Link>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{' '}
            <Link to="/company/register" className="text-primary hover:underline font-medium dark:text-primary-foreground">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>

      {/* Password Reset Dialog */}
      <Dialog open={showResetDialog} onOpenChange={setShowResetDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Reset Password</DialogTitle>
            <DialogDescription>
              {resetSent 
                ? 'Check your email for a link to reset your password.'
                : 'Enter your email address and we\'ll send you a link to reset your password.'}
            </DialogDescription>
          </DialogHeader>
          
          {!resetSent ? (
            <>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="reset-email" className="text-right">
                    Email
                  </Label>
                  <Input
                    id="reset-email"
                    type="email"
                    className="col-span-3"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    placeholder="your@email.com"
                    disabled={isResetting}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button 
                  type="button" 
                  onClick={handlePasswordReset}
                  disabled={isResetting}
                >
                  {isResetting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    'Send Reset Link'
                  )}
                </Button>
              </DialogFooter>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-6">
              <div className="bg-green-100 p-3 rounded-full mb-4">
                <Mail className="h-8 w-8 text-green-600" />
              </div>
              <p className="text-center text-foreground mb-4">
                We've sent a password reset link to <span className="font-medium">{resetEmail}</span>
              </p>
              <p className="text-sm text-muted-foreground text-center">
                Didn't receive the email? Check your spam folder or try again.
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LoginCompanyPage;
