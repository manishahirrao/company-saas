import React, { useState } from 'react';
import { handleSubscription } from '../utils/razorpay';

interface Plan {
  id: string;
  name: string;
  description: string;
  price: {
    monthly: number;
    annual: number;
  };
  features: string[];
  credits: number;
  isPopular?: boolean;
}

const plans: Plan[] = [
  {
    id: 'free',
    name: 'Free',
    description: 'Perfect for trying out our platform',
    price: {
      monthly: 0,
      annual: 0,
    },
    features: [
      '10 credits/month',
      'Basic support',
      'Access to free templates',
    ],
    credits: 10,
  },
  {
    id: 'basic',
    name: 'Basic',
    description: 'For individuals getting started',
    price: {
      monthly: 999,
      annual: 9588, // 20% discount for annual
    },
    features: [
      '100 credits/month',
      'Priority support',
      'All templates',
      'Basic analytics',
    ],
    credits: 100,
    isPopular: true,
  },
  {
    id: 'premium',
    name: 'Premium',
    description: 'For growing businesses',
    price: {
      monthly: 2499,
      annual: 23988, // 20% discount for annual
    },
    features: [
      '500 credits/month',
      '24/7 priority support',
      'All templates',
      'Advanced analytics',
      'API access',
    ],
    credits: 500,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'For large organizations',
    price: {
      monthly: 4999,
      annual: 47988, // 20% discount for annual
    },
    features: [
      'Unlimited credits',
      '24/7 dedicated support',
      'Custom templates',
      'Advanced analytics',
      'API access',
      'Custom integrations',
      'Dedicated account manager',
    ],
    credits: -1, // Unlimited
  },
];

interface SubscriptionPlansProps {
  user: any; // Replace with your user type
  onSuccess?: () => void;
}

const SubscriptionPlans: React.FC<SubscriptionPlansProps> = ({ user, onSuccess }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubscribe = async (planId: string) => {
    try {
      setIsLoading(planId);
      setError(null);
      
      await handleSubscription(planId, billingCycle === 'monthly' ? 'monthly' : 'annually', user);
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process subscription');
      console.error('Subscription error:', err);
    } finally {
      setIsLoading(null);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Choose the right plan for you
        </h2>
        <p className="mt-4 text-xl text-gray-600">
          Simple, transparent pricing that scales with your needs.
        </p>
        
        <div className="mt-8 flex justify-center">
          <div className="inline-flex rounded-md shadow-sm">
            <button
              type="button"
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-2 text-sm font-medium rounded-l-md ${
                billingCycle === 'monthly'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setBillingCycle('annual')}
              className={`px-4 py-2 text-sm font-medium rounded-r-md ${
                billingCycle === 'annual'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Annual (20% off)
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border-l-4 border-red-400 p-4">
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
      )}

      <div className="mt-10 space-y-10 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-8">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`relative rounded-2xl border border-gray-200 bg-white p-8 shadow-sm ${
              plan.isPopular ? 'ring-2 ring-indigo-500' : ''
            }`}
          >
            {plan.isPopular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 transform">
                <span className="inline-flex items-center rounded-full bg-indigo-600 px-4 py-1 text-xs font-semibold text-white">
                  Most popular
                </span>
              </div>
            )}
            <h3 className="text-lg font-semibold leading-5 text-gray-900">{plan.name}</h3>
            <p className="mt-4 text-sm text-gray-500">{plan.description}</p>
            <div className="mt-6 flex items-baseline">
              <span className="text-4xl font-extrabold text-gray-900">
                {formatPrice(
                  billingCycle === 'monthly' ? plan.price.monthly : plan.price.annual
                )}
              </span>
              <span className="ml-1 text-lg font-medium text-gray-500">
                /{billingCycle === 'monthly' ? 'month' : 'year'}
              </span>
            </div>
            <ul className="mt-8 space-y-3">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start">
                  <svg
                    className="h-5 w-5 shrink-0 text-green-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="ml-3 text-sm text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <button
                type="button"
                onClick={() => handleSubscribe(plan.id)}
                disabled={isLoading === plan.id}
                className={`w-full rounded-md px-6 py-3 text-center text-sm font-medium ${
                  plan.id === 'free'
                    ? 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700'
                } focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                  isLoading === plan.id ? 'opacity-75 cursor-not-allowed' : ''
                }`}
              >
                {isLoading === plan.id ? 'Processing...' : plan.id === 'free' ? 'Get Started' : 'Subscribe'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionPlans;
