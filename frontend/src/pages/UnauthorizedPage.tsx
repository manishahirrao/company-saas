import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export default function UnauthorizedPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white dark:from-slate-900 dark:to-slate-800 p-4">
      <div className="w-full max-w-md p-8 text-center bg-white dark:bg-slate-800 rounded-lg shadow-lg">
        <div className="flex justify-center mb-4">
          <AlertTriangle className="h-12 w-12 text-yellow-500" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Unauthorized Access
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          You don't have permission to access this page. Please contact the administrator if you believe this is an error.
        </p>
        <div className="space-y-3">
          <Button 
            onClick={() => navigate(-1)}
            className="w-full"
          >
            Go Back
          </Button>
          <Button 
            variant="outline" 
            onClick={() => navigate('/')}
            className="w-full"
          >
            Return Home
          </Button>
        </div>
      </div>
    </div>
  );
}
