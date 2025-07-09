import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';
import api from '@/services/api';
import env from '@/config/env';

const TestApiConnection: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  const testConnection = async () => {
    setLoading(true);
    setStatus('idle');
    setError(null);

    try {
      const response = await api.get('/api/test');
      if (response.data.message === 'Simple JS server is working!') {
        setStatus('success');
      } else {
        throw new Error('Unexpected response from server');
      }
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
      console.error('API connection test failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto mt-8">
      <CardHeader>
        <CardTitle>API Connection Test</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Backend Status:</span>
            {status === 'idle' && <span className="text-sm text-gray-500">Not tested</span>}
            {status === 'success' && (
              <span className="flex items-center text-sm text-green-600">
                <CheckCircle className="w-4 h-4 mr-1" /> Connected
              </span>
            )}
            {status === 'error' && (
              <span className="flex items-center text-sm text-red-600">
                <XCircle className="w-4 h-4 mr-1" /> Connection failed
              </span>
            )}
          </div>
          
          {error && (
            <div className="p-3 text-sm bg-red-50 text-red-700 rounded-md">
              Error: {error}
            </div>
          )}
          
          <Button 
            onClick={testConnection} 
            disabled={loading}
            className="w-full"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Testing...
              </>
            ) : (
              'Test Connection'
            )}
          </Button>
          
          <div className="text-xs text-gray-500 mt-2">
            <p>Backend URL: {env.API_BASE_URL}</p>
            <p>Environment: {env.NODE_ENV}</p>
            <p>This will test the connection to the backend API.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TestApiConnection;
