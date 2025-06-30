import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import { razorpay, CREDIT_PACKAGES, supabase, updateUserCredits } from '../../../lib/razorpay';

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

  const { packageId, type, userId, serviceId } = req.body;

  if (!packageId || !type || !userId) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    let amount = 0;
    let description = '';
    let credits = 0;

    if (type === 'credits') {
      const creditPackage = CREDIT_PACKAGES.find((pkg: any) => pkg.id === packageId);
      if (!creditPackage) {
        return res.status(400).json({ message: 'Invalid package ID' });
      }
      amount = creditPackage.amount;
      credits = creditPackage.credits;
      description = `Purchase of ${credits} credits`;
    } else if (type === 'hr_service') {
      // Fetch service details from database if needed
      // For now, we'll use a placeholder
      amount = 99900; // in paise
      description = 'HR Service Package';
    } else {
      return res.status(400).json({ message: 'Invalid payment type' });
    }

    // Create a Razorpay order
    const order = await razorpay.orders.create({
      amount: amount.toString(),
      currency: 'INR',
      receipt: `order_${Date.now()}`,
      notes: {
        userId,
        packageId,
        type,
        ...(serviceId && { serviceId }),
        ...(credits > 0 && { credits }),
      },
    });

    // Return the order ID and other required data for the client
    res.json({
      order_id: order.id,
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Your SaaS Platform Name',
      description,
      prefill: {
        email: session.user.email,
        name: session.user.name || '',
      },
      theme: {
        color: '#4F46E5', // indigo-600
      },
    });
  } catch (error) {
    console.error('Order creation error:', error);
    res.status(500).json({
      message: 'Failed to create order',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
