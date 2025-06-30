import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import { razorpay, SUBSCRIPTION_PLANS, supabase, updateUserCredits } from '../../../lib/razorpay';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const session = await getServerSession(req, res, authOptions);
  
  if (!session?.user?.email) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { planId, billingCycle, userId } = req.body;

  if (!planId || !billingCycle || !userId) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  // Get the selected plan
  const plan = (SUBSCRIPTION_PLANS as any)[planId];
  
  if (!plan) {
    return res.status(400).json({ message: 'Invalid plan ID' });
  }

  try {
    // For free plan, just create a subscription record without payment
    if (planId === 'free') {
      const { data: subscription, error } = await supabase
        .from('subscriptions')
        .upsert({
          user_id: userId,
          plan_id: planId,
          status: 'active',
          current_period_start: new Date().toISOString(),
          current_period_end: new Date(
            Date.now() + 30 * 24 * 60 * 60 * 1000 // 30 days from now
          ).toISOString(),
          cancel_at_period_end: false,
        })
        .select()
        .single();

      if (error) throw error;

      // Update user's credits
      await updateUserCredits(
        userId,
        plan.credits,
        'subscription_created',
        subscription.id
      );

      return res.json({
        subscription,
        message: 'Free subscription activated successfully',
      });
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

    // Return the subscription ID and other required data for the client
    res.json({
      subscriptionId: subscription.id,
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount,
      currency: 'INR',
      name: 'Your SaaS Platform Name',
      description: `${plan.name} Plan (${billingCycle})`,
      prefill: {
        email: session.user.email,
        name: session.user.name || '',
      },
      theme: {
        color: '#4F46E5', // indigo-600
      },
    });
  } catch (error) {
    console.error('Subscription creation error:', error);
    res.status(500).json({
      message: 'Failed to create subscription',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
