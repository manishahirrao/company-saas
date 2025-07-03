import React from 'react';

const Pricing = () => {
  const plans = [
    {
      name: 'Starter',
      price: 19,
      period: 'month',
      features: [
        'Up to 10 users',
        '5GB storage',
        'Basic support',
        'Email support'
      ]
    },
    {
      name: 'Professional',
      price: 49,
      period: 'month',
      featured: true,
      features: [
        'Up to 50 users',
        '50GB storage',
        'Priority support',
        '24/7 support',
        'API access'
      ]
    },
    {
      name: 'Enterprise',
      price: 149,
      period: 'month',
      features: [
        'Unlimited users',
        'Unlimited storage',
        '24/7 priority support',
        'Dedicated account manager',
        'Custom integrations'
      ]
    }
  ];

  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-4">Pricing Plans</h1>
        <p className="text-xl text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Choose the perfect plan for your business needs. No hidden fees, cancel anytime.
        </p>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`bg-white rounded-lg shadow-md overflow-hidden ${
                plan.featured ? 'transform scale-105 border-2 border-blue-500' : 'border border-gray-200'
              }`}
            >
              {plan.featured && (
                <div className="bg-blue-500 text-white text-center py-1 text-sm font-semibold">
                  MOST POPULAR
                </div>
              )}
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2">{plan.name}</h2>
                <div className="mb-6">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  <span className="text-gray-600">/{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-3 px-4 rounded-md font-semibold ${
                    plan.featured
                      ? 'bg-blue-500 hover:bg-blue-600 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                  }`}
                >
                  Get Started
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;
