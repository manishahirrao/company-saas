import { loadScript } from '@razorpay/checkout/dist/razorpay-checkout';

interface RazorpayOptions {
  key: string;
  subscription_id?: string;
  order_id?: string;
  amount?: number;
  currency?: string;
  name: string;
  description: string;
  prefill: {
    name?: string;
    email?: string;
    contact?: string;
  };
  theme: {
    color: string;
  };
  handler: (response: any) => void;
  modal: {
    ondismiss: () => void;
  };
  notes?: Record<string, string>;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

export const initRazorpay = async (): Promise<boolean> => {
  try {
    await loadScript('https://checkout.razorpay.com/v1/checkout.js');
    return true;
  } catch (error) {
    console.error('Error loading Razorpay SDK:', error);
    return false;
  }
};

export const openRazorpay = async (options: RazorpayOptions) => {
  const isLoaded = await initRazorpay();
  if (!isLoaded) {
    throw new Error('Failed to load Razorpay SDK');
  }

  return new Promise((resolve, reject) => {
    const rzp = new window.Razorpay({
      ...options,
      handler: (response: any) => {
        options.handler(response);
        resolve(response);
      },
      modal: {
        ...options.modal,
        ondismiss: () => {
          options.modal?.ondismiss?.();
          reject(new Error('Payment window closed'));
        },
      },
    });

    rzp.open();
  });
};

// Helper function to handle subscription creation
export const handleSubscription = async (planId: string, billingCycle: 'monthly' | 'annually', user: any) => {
  try {
    const response = await fetch('/api/payments/create-subscription', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        planId,
        billingCycle,
        userId: user.id,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create subscription');
    }

    const { subscriptionId, ...options } = await response.json();

    await openRazorpay({
      ...options,
      subscription_id: subscriptionId,
      handler: async (response: any) => {
        // Handle successful payment
        console.log('Payment successful:', response);
        // You might want to update the UI or redirect to a success page
      },
      modal: {
        ondismiss: () => {
          console.log('Payment window closed');
        },
      },
    });
  } catch (error) {
    console.error('Subscription error:', error);
    throw error;
  }
};

// Helper function to handle one-time payments
export const handleOneTimePayment = async (packageId: string, type: 'credits' | 'hr_service', user: any, serviceId?: string) => {
  try {
    const response = await fetch('/api/payments/create-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        packageId,
        type,
        userId: user.id,
        ...(serviceId && { serviceId }),
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create order');
    }

    const { order_id, ...options } = await response.json();

    await openRazorpay({
      ...options,
      order_id,
      handler: async (response: any) => {
        // Handle successful payment
        console.log('Payment successful:', response);
        // You might want to update the UI or redirect to a success page
      },
      modal: {
        ondismiss: () => {
          console.log('Payment window closed');
        },
      },
    });
  } catch (error) {
    console.error('Payment error:', error);
    throw error;
  }
};
