import Razorpay from 'razorpay';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

// Types
export interface SubscriptionPlan {
  id: string;
  name: string;
  monthlyPrice: number;
  annualPrice: number;
  credits: number;
  features: string[];
}

export interface CreditPackage {
  id: string;
  name: string;
  amount: number;
  credits: number;
}

// Validate required environment variables
const requiredEnvVars = [
  'RAZORPAY_KEY_ID',
  'RAZORPAY_KEY_SECRET',
  'NEXT_PUBLIC_SUPABASE_URL',
  'SUPABASE_SERVICE_ROLE_KEY',
  'RAZORPAY_WEBHOOK_SECRET'
];

const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
if (missingVars.length > 0) {
  console.error('Missing required environment variables:', missingVars.join(', '));
  if (process.env.NODE_ENV === 'production') {
    throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
  }
}

// Initialize Razorpay
export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || '',
  key_secret: process.env.RAZORPAY_KEY_SECRET || ''
});

// Initialize Supabase client
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

// Webhook secret for verifying webhook signatures
export const WEBHOOK_SECRET = process.env.RAZORPAY_WEBHOOK_SECRET || '';

// Subscription plans configuration
export const SUBSCRIPTION_PLANS: Record<string, SubscriptionPlan> = {
  FREE: {
    id: 'free',
    name: 'Free',
    monthlyPrice: 0,
    annualPrice: 0,
    credits: 10,
    features: ['Basic features', 'Limited credits']
  },
  BASIC: {
    id: 'basic',
    name: 'Basic',
    monthlyPrice: 999,
    annualPrice: 9999,
    credits: 100,
    features: ['All basic features', '100 credits/month']
  },
  PREMIUM: {
    id: 'premium',
    name: 'Premium',
    monthlyPrice: 2499,
    annualPrice: 24999,
    credits: 300,
    features: ['All basic features', '300 credits/month', 'Priority support']
  },
  ENTERPRISE: {
    id: 'enterprise',
    name: 'Enterprise',
    monthlyPrice: 4999,
    annualPrice: 49999,
    credits: 1000,
    features: ['All premium features', '1000+ credits/month', 'Dedicated account manager']
  }
};

// Credit packages for one-time purchases
export const CREDIT_PACKAGES: CreditPackage[] = [
  { id: 'small', name: 'Small Package', amount: 499, credits: 50 },
  { id: 'medium', name: 'Medium Package', amount: 899, credits: 100 },
  { id: 'large', name: 'Large Package', amount: 1699, credits: 200 },
];

// Helper function to get plan by ID
export function getPlanById(planId: string): SubscriptionPlan | undefined {
  return Object.values(SUBSCRIPTION_PLANS).find(plan => plan.id === planId);
}

// Helper function to get credit package by ID
export function getCreditPackageById(packageId: string): CreditPackage | undefined {
  return CREDIT_PACKAGES.find(pkg => pkg.id === packageId);
}

export default {
  razorpay,
  supabase,
  WEBHOOK_SECRET,
  SUBSCRIPTION_PLANS,
  CREDIT_PACKAGES,
  getPlanById,
  getCreditPackageById
};
