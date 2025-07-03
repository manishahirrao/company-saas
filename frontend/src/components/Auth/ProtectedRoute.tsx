import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'job_seeker' | 'employer' | 'hr_agency' | 'content_creator' | 'admin';
  redirectTo?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredRole,
  redirectTo = '/login'
}) => {
  const { user, profile, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [authChecked, setAuthChecked] = useState(false);
  const [error, setError] = useState<string | null>(null);
  let timeoutId: NodeJS.Timeout | null = null;

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // If we're still loading initial auth state, wait
        if (loading) return;
        
        // If no user is authenticated, redirect to login
        if (!user) {
          navigate(redirectTo, { 
            state: { 
              from: location,
              message: 'Please sign in to access this page.'
            },
            replace: true 
          });
          return;
        }
        
        // If we have a user but no profile yet, wait for it to load
        if (user && !profile) {
          // Clear any existing timeout
          if (timeoutId) clearTimeout(timeoutId);
          
          // Set a new timeout
          timeoutId = setTimeout(() => {
            if (!profile) {
              console.warn('User profile not loaded after delay');
              setError('Failed to load user profile. Please try again.');
            }
          }, 5000); // 5 second timeout for profile loading
          
          return () => {
            if (timeoutId) clearTimeout(timeoutId);
          };
        }
        
        // Check if user has the required role if specified
        if (requiredRole && profile?.user_type !== requiredRole) {
          navigate('/unauthorized', { 
            state: { 
              from: location,
              message: 'You do not have permission to access this page',
              requiredRole
            },
            replace: true 
          });
          return;
        }
        
        // If we get here, all checks passed
        setAuthChecked(true);
        
      } catch (err) {
        console.error('Authentication error:', err);
        setError('An error occurred during authentication. Please try again.');
        await signOut();
        navigate(redirectTo, { 
          state: { 
            from: location,
            message: 'Session error. Please sign in again.'
          },
          replace: true 
        });
      }
    };
    
    checkAuth();
    
    // Cleanup function
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [user, profile, loading, requiredRole, navigate, location, redirectTo, signOut]);
  
  // Show loading state
  if (loading || !authChecked) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }
  
  // Show error state if something went wrong
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background p-4">
        <div className="max-w-md w-full space-y-4 text-center">
          <AlertCircle className="h-12 w-12 mx-auto text-destructive" />
          <h2 className="text-2xl font-bold">Authentication Error</h2>
          <p className="text-muted-foreground">{error}</p>
          <Button 
            onClick={() => window.location.reload()}
            className="mt-4"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }
  
  // If we get here, all checks passed and we can render the children
  return <>{children}</>;
};

export default ProtectedRoute;
