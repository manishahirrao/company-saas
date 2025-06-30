import React, { useState } from 'react';
import { handleOneTimePayment } from '../utils/razorpay';

interface CreditPackage {
  id: string;
  name: string;
  credits: number;
  amount: number;
  popular?: boolean;
}

interface ServicePackage {
  id: string;
  name: string;
  description: string;
  amount: number;
  duration: string;
}

const creditPackages: CreditPackage[] = [
  { id: 'small', name: 'Small Pack', credits: 50, amount: 499 },
  { id: 'medium', name: 'Medium Pack', credits: 150, amount: 1299, popular: true },
  { id: 'large', name: 'Large Pack', credits: 500, amount: 3999 },
];

const servicePackages: ServicePackage[] = [
  {
    id: 'basic_hr',
    name: 'Basic HR Support',
    description: 'Basic HR consultation and support',
    amount: 999,
    duration: '1 hour',
  },
  {
    id: 'premium_hr',
    name: 'Premium HR Support',
    description: 'Comprehensive HR services and support',
    amount: 2999,
    duration: '3 hours',
  },
];

interface CreditPurchaseProps {
  user: any; // Replace with your user type
  onSuccess?: () => void;
}

const CreditPurchase: React.FC<CreditPurchaseProps> = ({ user, onSuccess }) => {
  const [activeTab, setActiveTab] = useState<'credits' | 'services'>('credits');
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handlePurchase = async (packageId: string, type: 'credits' | 'hr_service') => {
    try {
      setIsLoading(`${type}-${packageId}`);
      setError(null);
      
      await handleOneTimePayment(
        packageId,
        type,
        user,
        type === 'hr_service' ? packageId : undefined
      );
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process payment');
      console.error('Payment error:', err);
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
          Purchase Credits & Services
        </h2>
        <p className="mt-4 text-xl text-gray-600">
          Buy credits or HR services to get the most out of our platform.
        </p>
      </div>

      <div className="mb-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('credits')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'credits'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Credit Packs
            </button>
            <button
              onClick={() => setActiveTab('services')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'services'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              HR Services
            </button>
          </nav>
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

      {activeTab === 'credits' ? (
        <div className="grid gap-6 md:grid-cols-3">
          {creditPackages.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative rounded-lg border ${
                pkg.popular ? 'border-indigo-500 ring-2 ring-indigo-200' : 'border-gray-200'
              } p-6 shadow-sm`}
            >
              {pkg.popular && (
                <div className="absolute -top-3 right-4 bg-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  Best Value
                </div>
              )}
              <h3 className="text-lg font-medium text-gray-900">{pkg.name}</h3>
              <p className="mt-2 text-3xl font-bold text-gray-900">
                {formatPrice(pkg.amount)}
              </p>
              <p className="mt-1 text-sm text-gray-500">{pkg.credits} credits</p>
              <div className="mt-6">
                <button
                  onClick={() => handlePurchase(pkg.id, 'credits')}
                  disabled={isLoading === `credits-${pkg.id}`}
                  className={`w-full rounded-md px-4 py-2 text-center text-sm font-medium ${
                    pkg.popular
                      ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                      : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                  } focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                    isLoading === `credits-${pkg.id}` ? 'opacity-75 cursor-not-allowed' : ''
                  }`}
                >
                  {isLoading === `credits-${pkg.id}` ? 'Processing...' : 'Buy Now'}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {servicePackages.map((service) => (
            <div
              key={service.id}
              className="rounded-lg border border-gray-200 p-6 shadow-sm"
            >
              <h3 className="text-lg font-medium text-gray-900">{service.name}</h3>
              <p className="mt-2 text-3xl font-bold text-gray-900">
                {formatPrice(service.amount)}
              </p>
              <p className="mt-1 text-sm text-gray-500">{service.duration} session</p>
              <p className="mt-4 text-sm text-gray-600">{service.description}</p>
              <div className="mt-6">
                <button
                  onClick={() => handlePurchase(service.id, 'hr_service')}
                  disabled={isLoading === `hr_service-${service.id}`}
                  className={`w-full rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                    isLoading === `hr_service-${service.id}` ? 'opacity-75 cursor-not-allowed' : ''
                  }`}
                >
                  {isLoading === `hr_service-${service.id}` ? 'Processing...' : 'Book Now'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CreditPurchase;
