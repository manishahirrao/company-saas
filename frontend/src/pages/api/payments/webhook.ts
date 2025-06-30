import { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';
import { razorpay, supabase, updateUserCredits, SUBSCRIPTION_PLANS } from '../../../lib/razorpay';

export const config = {
  api: {
    bodyParser: false,
  },
};

async function buffer(readable: any) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get the raw body
    const rawBody = await buffer(req);
    const body = JSON.parse(rawBody.toString());
    
    // Get the signature from the headers
    const signature = req.headers['x-razorpay-signature'] as string;
    
    if (!signature) {
      return res.status(400).json({ error: 'Missing signature' });
    }

    // Verify the webhook signature
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET || '')
      .update(rawBody)
      .digest('hex');

    if (signature !== expectedSignature) {
      console.error('Invalid webhook signature');
      return res.status(400).json({ error: 'Invalid signature' });
    }

    // Handle different webhook events
    const eventType = body.event;
    const payload = body.payload;

    console.log('Webhook received:', eventType, JSON.stringify(payload, null, 2));

    try {
      switch (eventType) {
        case 'subscription.activated':
          await handleSubscriptionActivated(payload);
          break;
        case 'subscription.cancelled':
          await handleSubscriptionCancelled(payload);
          break;
        case 'payment.captured':
          await handlePaymentCaptured(payload);
          break;
        case 'subscription.charged':
          await handleSubscriptionCharged(payload);
          break;
        default:
          console.log(`Unhandled event type: ${eventType}`);
      }

      res.status(200).json({ received: true });
    } catch (error) {
      console.error('Error processing webhook:', error);
      res.status(500).json({ error: 'Error processing webhook' });
    }
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(400).json({ error: 'Error processing webhook' });
  }
}

async function handleSubscriptionActivated(payload: any) {
  const { subscription } = payload;
  const { notes } = subscription;

  if (!notes || !notes.userId || !notes.planId) {
    console.error('Missing required fields in subscription activation');
    return;
  }

  const { userId, planId, billingCycle } = notes;
  const plan = (SUBSCRIPTION_PLANS as any)[planId];

  if (!plan) {
    console.error(`Plan not found: ${planId}`);
    return;
  }

  // Calculate period end date
  const currentDate = new Date();
  const periodEnd = new Date(currentDate);
  periodEnd.setMonth(periodEnd.getMonth() + (billingCycle === 'annually' ? 12 : 1));

  // Create or update subscription in database
  const { error } = await supabase
    .from('subscriptions')
    .upsert({
      user_id: userId,
      plan_id: planId,
      razorpay_subscription_id: subscription.id,
      status: 'active',
      current_period_start: currentDate.toISOString(),
      current_period_end: periodEnd.toISOString(),
      cancel_at_period_end: false,
    });

  if (error) {
    console.error('Error updating subscription:', error);
    throw error;
  }

  // Update user's credits
  if (plan.credits > 0) {
    await updateUserCredits(
      userId,
      plan.credits,
      'subscription_activated',
      subscription.id
    );
  }
}

async function handleSubscriptionCancelled(payload: any) {
  const { subscription } = payload;

  // Update subscription status in database
  const { error } = await supabase
    .from('subscriptions')
    .update({
      status: 'cancelled',
      canceled_at: new Date().toISOString(),
      cancel_at_period_end: true,
    })
    .eq('razorpay_subscription_id', subscription.id);

  if (error) {
    console.error('Error cancelling subscription:', error);
    throw error;
  }
}

async function handlePaymentCaptured(payload: any) {
  const { payment } = payload;
  const { notes, order_id } = payment;

  if (!notes) {
    console.error('No notes found in payment payload');
    return;
  }

  const { userId, type, credits } = notes;

  // Update payment status in database
  const { error: paymentError } = await supabase
    .from('payments')
    .upsert({
      razorpay_payment_id: payment.id,
      razorpay_order_id: order_id,
      user_id: userId,
      amount: payment.amount / 100, // Convert from paise to INR
      currency: payment.currency,
      status: payment.status,
      method: payment.method,
      invoice_id: payment.invoice_id || null,
      notes: notes,
    });

  if (paymentError) {
    console.error('Error saving payment:', paymentError);
    throw paymentError;
  }

  // If this is a credit purchase, update user's credits
  if (type === 'credits' && credits) {
    await updateUserCredits(
      userId,
      parseInt(credits, 10),
      'credit_purchase',
      payment.id
    );
  }

  // If this is an HR service purchase, create a service request
  if (type === 'hr_service') {
    const { error: serviceError } = await supabase
      .from('hr_service_requests')
      .insert([
        {
          user_id: userId,
          payment_id: payment.id,
          status: 'pending',
          service_type: notes.serviceType || 'general',
          notes: notes.serviceNotes || '',
        },
      ]);

    if (serviceError) {
      console.error('Error creating service request:', serviceError);
      throw serviceError;
    }
  }
}

async function handleSubscriptionCharged(payload: any) {
  const { subscription } = payload;
  const { invoice } = subscription;

  // Update subscription's next billing date
  const nextBillingDate = new Date(subscription.current_end * 1000);
  
  const { error: subError } = await supabase
    .from('subscriptions')
    .update({
      current_period_start: new Date(subscription.current_start * 1000).toISOString(),
      current_period_end: nextBillingDate.toISOString(),
      status: subscription.status,
    })
    .eq('razorpay_subscription_id', subscription.id);

  if (subError) {
    console.error('Error updating subscription period:', subError);
    throw subError;
  }

  // Record the payment
  const { error: paymentError } = await supabase
    .from('payments')
    .upsert({
      razorpay_payment_id: invoice.payment_id,
      razorpay_invoice_id: invoice.id,
      user_id: subscription.notes?.userId,
      subscription_id: subscription.id,
      amount: invoice.amount_paid / 100, // Convert from paise to INR
      currency: invoice.currency,
      status: 'captured',
      method: invoice.payment ? invoice.payment.method : null,
      invoice_id: invoice.id,
      notes: subscription.notes || {},
    });

  if (paymentError) {
    console.error('Error recording subscription payment:', paymentError);
    throw paymentError;
  }

  // Add credits if this is a subscription with credits
  const plan = Object.values(SUBSCRIPTION_PLANS).find(
    (p: any) => p.id === subscription.notes?.planId
  ) as any;

  if (plan?.credits > 0) {
    await updateUserCredits(
      subscription.notes.userId,
      plan.credits,
      'subscription_renewal',
      subscription.id
    );
  }
}
