import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    if (!loading && !user) {
      // Redirect to login if not authenticated
      navigate(`/login?redirect=${encodeURIComponent(location.pathname + location.search)}`);
    } else if (!loading && requiredRole && user?.user_metadata?.user_type !== requiredRole) {
      // Redirect to unauthorized if role doesn't match
      navigate('/unauthorized');
    }
  }, [user, loading, requiredRole, navigate, location.pathname, location.search]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (!user) {
    return null; // Will be redirected by the effect
  }

  if (requiredRole && user.user_metadata?.user_type !== requiredRole) {
    return null; // Will be redirected by the effect
  }

  return <>{children}</>;
};

export default ProtectedRoute;
