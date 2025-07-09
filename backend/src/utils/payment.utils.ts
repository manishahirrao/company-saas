import { razorpay } from '../config/razorpay.js';
import { supabase } from '../config/razorpay.js';
import type { RazorpayCustomer, RazorpayPlan } from '../types/razorpay.js';

// Type for the Razorpay customer create parameters
interface CreateCustomerParams {
  name: string;
  email: string;
  contact: string;
  notes: Record<string, any>;
}

// Type for the Razorpay plan create parameters
interface CreatePlanParams {
  period: 'daily' | 'weekly' | 'monthly' | 'yearly';
  interval: number;
  item: {
    name: string;
    amount: number;
    currency: string;
    description: string;
  };
  notes: Record<string, any>;
}

// Helper function to convert Razorpay's customer to our type
const toRazorpayCustomer = (customer: any): RazorpayCustomer => ({
  id: customer.id,
  entity: customer.entity,
  name: customer.name || '',
  email: customer.email,
  contact: customer.contact || '',
  gstin: customer.gstin || null,
  notes: customer.notes || {},
  created_at: customer.created_at
});

// Helper function to convert Razorpay's plan to our type
const toRazorpayPlan = (plan: any): RazorpayPlan => ({
  id: plan.id,
  entity: plan.entity,
  interval: plan.interval,
  period: plan.period,
  item: {
    name: plan.item?.name || '',
    amount: plan.item?.amount || 0,
    currency: plan.item?.currency || 'INR',
    description: plan.item?.description || ''
  },
  name: plan.name || '',
  amount: plan.amount || 0,
  currency: plan.currency || 'INR',
  description: plan.description || '',
  notes: plan.notes || {},
  created_at: plan.created_at
});

export async function createRazorpayCustomer(user: any): Promise<RazorpayCustomer> {
  try {
    const customerData: CreateCustomerParams = {
      name: user.full_name || user.email.split('@')[0],
      email: user.email,
      contact: user.phone || '',
      notes: {
        userId: user.id,
        signupDate: new Date().toISOString(),
      },
    };
    
    const customer = await razorpay.customers.create(customerData);

    // Store the Razorpay customer ID in your users table
    await supabase
      .from('users')
      .update({ razorpay_customer_id: customer.id })
      .eq('id', user.id);

    return toRazorpayCustomer(customer);
  } catch (error) {
    console.error('Error creating Razorpay customer:', error);
    throw error;
  }
}

export async function getOrCreateRazorpayCustomer(user: any): Promise<RazorpayCustomer> {
  try {
    // First, check if the user already has a Razorpay customer ID
    if (user.razorpay_customer_id) {
      try {
        const customer = await razorpay.customers.fetch(user.razorpay_customer_id);
        return toRazorpayCustomer(customer);
      } catch (error) {
        console.warn('Error fetching Razorpay customer, will create a new one:', error);
        // Continue to create a new customer if fetch fails
      }
    }

    // If no customer exists or fetch failed, create a new one
    return createRazorpayCustomer(user);
  } catch (error) {
    console.error('Error in getOrCreateRazorpayCustomer:', error);
    throw error;
  }
}

export async function createRazorpayPlan(plan: any, billingCycle: 'monthly' | 'annually'): Promise<RazorpayPlan> {
  try {
    const period = billingCycle === 'monthly' ? 'monthly' : 'yearly';
    const interval = billingCycle === 'monthly' ? 1 : 12;
    const price = billingCycle === 'monthly' ? plan.price_monthly : plan.price_annual;

    const planData: CreatePlanParams = {
      period,
      interval,
      item: {
        name: `${plan.name} (${billingCycle})`,
        amount: plan.amount * 100, // Convert to paise
        currency: 'INR',
        description: plan.description,
      },
      notes: {
        planId: plan.id,
        billingCycle,
      },
    };
    
    const razorpayPlan = await razorpay.plans.create(planData);
    return toRazorpayPlan(razorpayPlan);
  } catch (error) {
    console.error('Error creating Razorpay plan:', error);
    throw error;
  }
}

export async function getOrCreateRazorpayPlan(plan: any, billingCycle: 'monthly' | 'annually'): Promise<RazorpayPlan> {
  try {
    const planId = `${plan.id}_${billingCycle}`;
    
    try {
      const existingPlan = await razorpay.plans.fetch(planId);
      if (existingPlan) {
        return toRazorpayPlan(existingPlan);
      }
    } catch (error: any) {
      if (error.statusCode !== 404) {
        console.warn('Error fetching Razorpay plan, will create a new one:', error);
      }
      // Continue to create a new plan if fetch fails or plan doesn't exist
    }
    
    // If we get here, we need to create a new plan
    return createRazorpayPlan(plan, billingCycle);
  } catch (error) {
    console.error('Error in getOrCreateRazorpayPlan:', error);
    throw error;
  }
}

export async function cancelSubscription(subscriptionId: string) {
  try {
    const subscription = await razorpay.subscriptions.cancel(subscriptionId);
    
    // Update the subscription status in your database
    await supabase
      .from('subscriptions')
      .update({
        status: 'canceled',
        cancel_at_period_end: true,
        canceled_at: new Date().toISOString(),
      })
      .eq('razorpay_subscription_id', subscriptionId);
    
    return subscription;
  } catch (error) {
    console.error('Error canceling subscription:', error);
    throw error;
  }
}

export async function verifyPaymentSignature(params: {
  orderId: string;
  paymentId: string;
  signature: string;
}) {
  try {
    const { orderId, paymentId, signature } = params;
    const text = orderId + '|' + paymentId;
    
    const crypto = require('crypto');
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || '')
      .update(text)
      .digest('hex');
    
    return expectedSignature === signature;
  } catch (error) {
    console.error('Error verifying payment signature:', error);
    return false;
  }
}
