import Razorpay from 'razorpay';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Initialize Razorpay
const razorpayKeyId = process.env.RAZORPAY_KEY_ID;
const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET;

export const razorpay = new Razorpay({
  key_id: razorpayKeyId || '',
  key_secret: razorpayKeySecret,
});

// Subscription plans configuration
export const SUBSCRIPTION_PLANS = {
  free: {
    id: 'free',
    name: 'Free',
    description: 'Perfect for trying out our platform',
    monthlyPrice: 0,
    annualPrice: 0,
    credits: 10,
    features: [
      '10 credits/month',
      'Basic support',
      'Access to free templates',
    ],
  },
  basic: {
    id: 'basic',
    name: 'Basic',
    description: 'For individuals getting started',
    monthlyPrice: 999,
    annualPrice: 9588, // 20% discount
    credits: 100,
    features: [
      '100 credits/month',
      'Priority support',
      'All templates',
      'Basic analytics',
    ],
  },
  premium: {
    id: 'premium',
    name: 'Premium',
    description: 'For growing businesses',
    monthlyPrice: 2499,
    annualPrice: 23988, // 20% discount
    credits: 500,
    features: [
      '500 credits/month',
      '24/7 priority support',
      'All templates',
      'Advanced analytics',
      'API access',
    ],
  },
  enterprise: {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'For large organizations',
    monthlyPrice: 4999,
    annualPrice: 47988, // 20% discount
    credits: -1, // Unlimited
    features: [
      'Unlimited credits',
      '24/7 dedicated support',
      'Custom templates',
      'Advanced analytics',
      'API access',
      'Custom integrations',
      'Dedicated account manager',
    ],
  },
};

// Credit packages for one-time purchase
export const CREDIT_PACKAGES = [
  {
    id: 'small',
    name: 'Small Pack',
    credits: 50,
    amount: 49900, // in paise
  },
  {
    id: 'medium',
    name: 'Medium Pack',
    credits: 150,
    amount: 129900, // in paise
    popular: true,
  },
  {
    id: 'large',
    name: 'Large Pack',
    credits: 500,
    amount: 399900, // in paise
  },
];

// Webhook secret for verifying webhook signatures
export const WEBHOOK_SECRET = process.env.RAZORPAY_WEBHOOK_SECRET || '';

// Utility function to verify webhook signature
export const verifyWebhookSignature = (webhookBody: any, signature: string) => {
  const expectedSignature = crypto
    .createHmac('sha256', WEBHOOK_SECRET)
    .update(JSON.stringify(webhookBody))
    .digest('hex');

  return expectedSignature === signature;
};

// Utility function to update user credits
export const updateUserCredits = async (
  userId: string,
  credits: number,
  type: string,
  referenceId: string
) => {
  // Start a transaction
  const { data: userCredit, error: creditError } = await supabase.rpc('increment_credits', {
    user_id: userId,
    credit_amount: credits,
  });

  if (creditError) throw creditError;

  // Record the transaction
  const { error: transactionError } = await supabase
    .from('credit_transactions')
    .insert([
      {
        user_id: userId,
        amount: credits,
        type,
        reference_id: referenceId,
      },
    ]);

  if (transactionError) throw transactionError;

  return userCredit;
};
