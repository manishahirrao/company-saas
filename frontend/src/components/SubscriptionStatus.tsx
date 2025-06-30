import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

interface Subscription {
  id: string;
  plan_id: string;
  status: string;
  current_period_end: string;
  cancel_at_period_end: boolean;
  plan_name?: string;
  plan_description?: string;
}

interface CreditBalance {
  credits_remaining: number;
  last_updated: string;
}

interface SubscriptionStatusProps {
  userId: string;
}

const SubscriptionStatus: React.FC<SubscriptionStatusProps> = ({ userId }) => {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [creditBalance, setCreditBalance] = useState<CreditBalance | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubscriptionData = async () => {
      try {
        setLoading(true);
        
        // Fetch subscription data
        const { data: subscriptionData, error: subscriptionError } = await supabase
          .from('subscriptions')
          .select(`
            *,
            plan:subscription_plans(
              name,
              description
            )
          `)
          .eq('user_id', userId)
          .single();

        if (subscriptionError && subscriptionError.code !== 'PGRST116') { // PGRST116 = no rows returned
          throw subscriptionError;
        }

        // Fetch credit balance
        const { data: creditData, error: creditError } = await supabase
          .from('credits_system')
          .select('*')
          .eq('user_id', userId)
          .single();

        if (creditError && creditError.code !== 'PGRST116') {
          throw creditError;
        }

        setSubscription(subscriptionData || null);
        setCreditBalance(creditData || null);
      } catch (err) {
        console.error('Error fetching subscription data:', err);
        setError('Failed to load subscription information');
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchSubscriptionData();
    }
  }, [userId]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Subscription & Billing
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Manage your subscription and payment details
        </p>
      </div>
      
      <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
        <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Current Plan</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {subscription ? (
                <>
                  <span className="font-medium">
                    {subscription.plan?.name || 'Unknown Plan'}
                  </span>
                  <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {subscription.status === 'active' ? 'Active' : subscription.status}
                  </span>
                </>
              ) : (
                'No active subscription'
              )}
            </dd>
          </div>
          
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">
              {subscription?.cancel_at_period_end ? 'Ends on' : 'Next Billing Date'}
            </dt>
            <dd className="mt-1 text-sm text-gray-900">
              {subscription ? formatDate(subscription.current_period_end) : 'N/A'}
              {subscription?.cancel_at_period_end && (
                <span className="ml-2 text-yellow-600 text-xs">(Will not renew)</span>
              )}
            </dd>
          </div>
          
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Available Credits</dt>
            <dd className="mt-1 text-2xl font-bold text-indigo-600">
              {creditBalance ? (
                <>
                  {creditBalance.credits_remaining}
                  <span className="ml-1 text-sm font-normal text-gray-500">
                    credits
                  </span>
                </>
              ) : (
                'N/A'
              )}
            </dd>
            {creditBalance && (
              <p className="mt-1 text-xs text-gray-500">
                Last updated: {formatDate(creditBalance.last_updated)}
              </p>
            )}
          </div>
          
          <div className="sm:col-span-2">
            <dt className="text-sm font-medium text-gray-500">Actions</dt>
            <dd className="mt-1 text-sm text-gray-900">
              <div className="flex space-x-4">
                {subscription?.status === 'active' && (
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={() => {
                      // Implement cancel subscription logic
                      alert('Cancel subscription functionality would be implemented here');
                    }}
                  >
                    {subscription.cancel_at_period_end ? 'Resume Subscription' : 'Cancel Subscription'}
                  </button>
                )}
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={() => {
                    // Navigate to billing portal or show upgrade options
                    alert('Manage subscription functionality would be implemented here');
                  }}
                >
                  {subscription ? 'Manage Subscription' : 'Upgrade Plan'}
                </button>
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={() => {
                    // Navigate to purchase credits
                    window.location.hash = 'buy-credits';
                  }}
                >
                  Buy More Credits
                </button>
              </div>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default SubscriptionStatus;
