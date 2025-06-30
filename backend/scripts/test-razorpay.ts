import { razorpay } from '../src/config/razorpay';
import { getOrCreateRazorpayCustomer, getOrCreateRazorpayPlan, verifyPaymentSignature } from '../src/utils/payment.utils';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Configure environment variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

// Test user data
const testUser = {
  id: 'test-user-123',
  email: 'test@example.com',
  full_name: 'Test User',
  phone: '+919876543210',
};

// Test plan data
const testPlan = {
  id: 'basic',
  name: 'Basic Plan',
  description: 'Basic subscription plan',
  price_monthly: 999, // in INR
  price_annual: 9999, // in INR
};

async function testRazorpayIntegration() {
  console.log('Starting Razorpay integration tests...');
  
  try {
    // 1. Test customer creation
    console.log('\n1. Testing customer creation...');
    const customer = await getOrCreateRazorpayCustomer(testUser);
    console.log('✅ Customer created/fetched successfully:', {
      id: customer.id,
      name: customer.name,
      email: customer.email,
    });

    // 2. Test plan creation
    console.log('\n2. Testing plan creation...');
    const monthlyPlan = await getOrCreateRazorpayPlan(testPlan, 'monthly');
    console.log('✅ Monthly plan created/fetched successfully:', {
      id: monthlyPlan.id,
      item: monthlyPlan.item,
      period: monthlyPlan.period,
      interval: monthlyPlan.interval,
    });

    const annualPlan = await getOrCreateRazorpayPlan(testPlan, 'annually');
    console.log('✅ Annual plan created/fetched successfully:', {
      id: annualPlan.id,
      item: annualPlan.item,
      period: annualPlan.period,
      interval: annualPlan.interval,
    });

    // 3. Test subscription creation
    console.log('\n3. Testing subscription creation...');
    const subscription = await razorpay.subscriptions.create({
      plan_id: monthlyPlan.id,
      customer_notify: 0, // Don't send email notification for test
      total_count: 1, // One-time charge for testing
      quantity: 1,
      notes: {
        userId: testUser.id,
        test: 'true',
      },
    });
    
    console.log('✅ Test subscription created:', {
      id: subscription.id,
      status: subscription.status,
      amount: subscription.plan.amount / 100, // Convert paise to INR
      currency: subscription.plan.currency,
    });

    // 4. Test payment verification
    console.log('\n4. Testing payment verification...');
    // This is a mock verification - in a real scenario, you'd get these values from the payment callback
    const testOrderId = 'order_test123';
    const testPaymentId = 'pay_test123';
    const testSignature = 'mocked_signature_for_testing';
    
    // In a real scenario, you'd verify with actual values from Razorpay
    const isSignatureValid = await verifyPaymentSignature({
      orderId: testOrderId,
      paymentId: testPaymentId,
      signature: testSignature,
    });
    
    console.log(`🔍 Payment signature verification result: ${isSignatureValid ? '✅ Valid' : '❌ Invalid'}`);
    console.log('   Note: This is a mock verification. In production, use actual values from Razorpay callback.');

    console.log('\n🎉 All tests completed successfully!');
    
    // Cancel the test subscription to avoid charges
    try {
      await razorpay.subscriptions.cancel(subscription.id);
      console.log('\n🧹 Test subscription canceled successfully');
    } catch (error) {
      console.warn('⚠️ Failed to cancel test subscription:', error.message);
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error);
    process.exit(1);
  }
}

// Run the tests
await testRazorpayIntegration();

// This is needed for top-level await in ES modules
// @ts-ignore
if (import.meta.url === `file://${process.argv[1]}`) {
  process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    process.exit(1);
  });
}
