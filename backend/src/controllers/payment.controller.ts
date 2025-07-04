import { Request, Response } from 'express';
import { razorpay, supabase, SUBSCRIPTION_PLANS, CREDIT_PACKAGES, WEBHOOK_SECRET } from '../config/razorpay.js';
import crypto from 'crypto';

interface User {
  id: string;
  email: string;
  // Add other user properties as needed
}

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

export const createSubscription = async (req: Request, res: Response) => {
  try {
    const { planId, billingCycle, userId } = req.body;
    
    // Get the selected plan
    const plan = Object.values(SUBSCRIPTION_PLANS).find(p => p.id === planId);
    if (!plan) {
      return res.status(400).json({ error: 'Invalid plan ID' });
    }

    // For free plan, just create a subscription record without payment
    if (planId === 'free') {
      const { data: subscription, error } = await supabase
        .from('subscriptions')
        .upsert({
          user_id: userId,
          plan_id: planId,
          status: 'active',
          current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
          cancel_at_period_end: false,
        })
        .select()
        .single();

      if (error) throw error;

      // Update user's credits
      await updateUserCredits(userId, plan.credits, 'subscription_created', subscription.id);
      
      return res.json({ subscription, message: 'Free subscription activated successfully' });
    }

    // For paid plans, create a Razorpay subscription
    const amount = billingCycle === 'annually' ? plan.annualPrice : plan.monthlyPrice;
    const interval = billingCycle === 'annually' ? 12 : 1;

    const subscription = await razorpay.subscriptions.create({
      plan_id: `${planId}_${billingCycle}`,
      customer_notify: 1,
      total_count: 12, // 1 year with option to cancel
      quantity: 1,
      notes: {
        userId,
        planId,
        billingCycle,
      },
    });

    res.json({
      subscriptionId: subscription.id,
      key: process.env.RAZORPAY_KEY_ID,
      amount,
      currency: 'INR',
      name: 'PostPilot AI Hub',
      description: `${plan.name} Plan (${billingCycle})`,
      prefill: {
        email: req.user?.email || '',
      },
    });
  } catch (error) {
    console.error('Subscription creation error:', error);
    res.status(500).json({ error: 'Failed to create subscription' });
  }
};

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { packageId, userId, type, serviceId } = req.body;
    
    let amount = 0;
    let credits = 0;
    let description = '';

    if (type === 'credits') {
      const creditPackage = CREDIT_PACKAGES.find(pkg => pkg.id === packageId);
      if (!creditPackage) {
        return res.status(400).json({ error: 'Invalid package ID' });
      }
      amount = creditPackage.amount;
      credits = creditPackage.credits;
      description = `Purchase of ${credits} credits`;
    } else if (type === 'hr_service' && serviceId) {
      // Fetch service details from database
      const { data: service, error } = await supabase
        .from('hr_services')
        .select('*')
        .eq('id', serviceId)
        .single();
      
      if (error || !service) {
        return res.status(400).json({ error: 'Invalid service ID' });
      }
      
      amount = service.price;
      description = `Payment for HR Service: ${service.name}`;
    } else {
      return res.status(400).json({ error: 'Invalid payment type' });
    }

    const order = await razorpay.orders.create({
      amount: amount * 100, // Convert to paise
      currency: 'INR',
      receipt: `order_${Date.now()}`,
      notes: {
        userId,
        type,
        packageId,
        serviceId,
        credits,
      },
    });

    res.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      key: process.env.RAZORPAY_KEY_ID,
      name: 'PostPilot AI Hub',
      description,
    });
  } catch (error) {
    console.error('Order creation error:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
};

export const handleWebhook = async (req: Request, res: Response) => {
  try {
    // Verify webhook signature
    const signature = req.headers['x-razorpay-signature'] as string;
    const body = JSON.stringify(req.body);
    
    const expectedSignature = crypto
      .createHmac('sha256', WEBHOOK_SECRET)
      .update(body)
      .digest('hex');

    if (signature !== expectedSignature) {
      console.error('Invalid webhook signature');
      return res.status(400).json({ status: 'error', message: 'Invalid signature' });
    }

    const { event, payload } = req.body;

    switch (event) {
      case 'subscription.activated':
        await handleSubscriptionActivated(payload);
        break;
      
      case 'subscription.cancelled':
        await handleSubscriptionCancelled(payload);
        break;
      
      case 'payment.captured':
        await handlePaymentCaptured(payload);
        break;
      
      default:
        console.log(`Unhandled event: ${event}`);
    }

    res.json({ status: 'success' });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ status: 'error', message: 'Webhook handler failed' });
  }
};

// Helper functions
async function handleSubscriptionActivated(payload: any) {
  const { subscription, customer } = payload;
  const { userId, planId, billingCycle } = subscription.notes;
  
  const plan = Object.values(SUBSCRIPTION_PLANS).find(p => p.id === planId);
  if (!plan) return;

  const { data: subscriptionData, error } = await supabase
    .from('subscriptions')
    .upsert({
      razorpay_subscription_id: subscription.id,
      user_id: userId,
      plan_id: planId,
      status: 'active',
      current_period_end: new Date(subscription.charge_at * 1000).toISOString(),
      cancel_at_period_end: false,
    })
    .select()
    .single();

  if (error) throw error;

  // Update user's credits
  await updateUserCredits(userId, plan.credits, 'subscription_activated', subscription.id);
}

async function handleSubscriptionCancelled(payload: any) {
  const { subscription } = payload;
  
  await supabase
    .from('subscriptions')
    .update({
      status: 'canceled',
      cancel_at_period_end: true,
      canceled_at: new Date().toISOString(),
    })
    .eq('razorpay_subscription_id', subscription.id);
}

async function handlePaymentCaptured(payload: any) {
  const { payment, order } = payload;
  const { userId, type, packageId, serviceId, credits } = order.notes;

  if (type === 'credits') {
    await updateUserCredits(userId, parseInt(credits), 'credit_purchase', payment.id);
  } else if (type === 'hr_service' && serviceId) {
    // Update HR service request status
    await supabase
      .from('hr_service_requests')
      .update({
        payment_status: 'paid',
        payment_id: payment.id,
        status: 'processing',
      })
      .eq('id', serviceId)
      .eq('user_id', userId);
  }
}

async function updateUserCredits(userId: string, credits: number, type: string, referenceId: string) {
  // Start a transaction
  const { data, error } = await supabase.rpc('update_user_credits', {
    user_id: userId,
    credits_to_add: credits,
    transaction_type: type,
    reference_id: referenceId,
  });

  if (error) throw error;
  return data;
}
