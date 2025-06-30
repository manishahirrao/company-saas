import { razorpay } from '../config/razorpay';
import { supabase } from '../config/razorpay';

export async function createRazorpayCustomer(user: any) {
  try {
    const customer = await razorpay.customers.create({
      name: user.full_name || user.email.split('@')[0],
      email: user.email,
      contact: user.phone || '',
      notes: {
        userId: user.id,
        signupDate: new Date().toISOString(),
      },
    });

    // Store the Razorpay customer ID in your users table
    await supabase
      .from('users')
      .update({ razorpay_customer_id: customer.id })
      .eq('id', user.id);

    return customer;
  } catch (error) {
    console.error('Error creating Razorpay customer:', error);
    throw error;
  }
}

export async function getOrCreateRazorpayCustomer(user: any) {
  try {
    // First, check if the user already has a Razorpay customer ID
    if (user.razorpay_customer_id) {
      try {
        const customer = await razorpay.customers.fetch(user.razorpay_customer_id);
        if (customer) return customer;
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

export async function createRazorpayPlan(plan: any, billingCycle: 'monthly' | 'annually') {
  try {
    const period = billingCycle === 'monthly' ? 'monthly' : 'yearly';
    const interval = billingCycle === 'monthly' ? 1 : 12;
    const price = billingCycle === 'monthly' ? plan.price_monthly : plan.price_annual;

    const razorpayPlan = await razorpay.plans.create({
      period,
      interval,
      item: {
        name: `${plan.name} Plan (${billingCycle})`,
        amount: price * 100, // Convert to paise
        currency: 'INR',
        description: plan.description || '',
      },
      notes: {
        planId: plan.id,
        billingCycle,
      },
    });

    return razorpayPlan;
  } catch (error) {
    console.error('Error creating Razorpay plan:', error);
    throw error;
  }
}

export async function getOrCreateRazorpayPlan(plan: any, billingCycle: 'monthly' | 'annually') {
  try {
    const planId = `${plan.id}_${billingCycle}`;
    
    // Try to fetch the plan first
    try {
      const razorpayPlan = await razorpay.plans.fetch(planId);
      if (razorpayPlan) return razorpayPlan;
    } catch (error) {
      console.log(`Plan ${planId} not found, creating a new one...`);
    }
    
    // If plan doesn't exist, create it
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
