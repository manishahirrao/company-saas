import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '@supabase/auth-helpers-react';
import SubscriptionStatus from '../components/SubscriptionStatus';
import SubscriptionPlans from '../components/SubscriptionPlans';
import CreditPurchase from '../components/CreditPurchase';
import { supabase } from '../lib/supabaseClient';

const SubscriptionPage: React.FC = () => {
  const router = useRouter();
  const user = useUser();
  const [activeTab, setActiveTab] = useState<'plans' | 'credits'>('plans');
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) {
        router.push('/login?redirect=/subscription');
        return;
      }

      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error) throw error;
        
        setUserData({
          ...user,
          ...data,
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();

    // Check for URL hash to set active tab
    if (window.location.hash === '#buy-credits') {
      setActiveTab('credits');
    }
  }, [user, router]);

  const handleSuccess = () => {
    // Refresh the page to show updated subscription/credits
    window.location.reload();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6 text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Authentication Required</h3>
            <p className="text-gray-600 mb-4">Please sign in to view your subscription details.</p>
            <button
              onClick={() => router.push('/login')}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Billing & Subscription</h1>
          <p className="mt-2 text-sm text-gray-600">
            Manage your subscription plan, billing information, and credit balance.
          </p>
        </div>

        {/* Current Subscription Status */}
        <div className="mb-12">
          <SubscriptionStatus userId={userData.id} />
        </div>

        {/* Tabs for Plans and Credits */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('plans')}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'plans'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Subscription Plans
              </button>
              <button
                onClick={() => setActiveTab('credits')}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'credits'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Buy Credits & Services
              </button>
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === 'plans' ? (
            <SubscriptionPlans user={userData} onSuccess={handleSuccess} />
          ) : (
            <CreditPurchase user={userData} onSuccess={handleSuccess} />
          )}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;
