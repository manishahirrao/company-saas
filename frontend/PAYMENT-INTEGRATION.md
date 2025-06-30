# Razorpay Payment Integration

This document outlines the Razorpay payment integration for the SaaS platform, including subscription management, one-time payments, and webhook handling.

## Features

- Subscription billing for multiple pricing tiers (free, basic, premium, enterprise)
- One-time payments for credit top-ups and HR service purchases
- Webhook handling to sync Razorpay events to Supabase tables
- Credit system update based on successful payments
- Secure API key and signature handling

## Setup Instructions

### 1. Environment Variables

Copy the `.env.example` file to `.env.local` and fill in the required values:

```bash
cp .env.example .env.local
```

### 2. Database Setup

Run the SQL migrations in `src/lib/database.sql` to create the necessary tables and functions.

### 3. Razorpay Configuration

1. Create a Razorpay account at https://razorpay.com/
2. Create a new Razorpay key pair in the Razorpay dashboard
3. Set up webhooks in the Razorpay dashboard with the following events:
   - `subscription.activated`
   - `subscription.cancelled`
   - `payment.captured`
   - `subscription.charged`

### 4. Webhook URL

Set the webhook URL in your Razorpay dashboard to:

```
https://your-domain.com/api/payments/webhook
```

## API Endpoints

### Create Subscription

`POST /api/payments/create-subscription`

**Request Body:**

```json
{
  "planId": "basic",
  "billingCycle": "monthly",
  "userId": "user-uuid"
}
```

### Create Order (One-time Payment)

`POST /api/payments/create-order`

**Request Body:**

```json
{
  "packageId": "medium",
  "type": "credits",
  "userId": "user-uuid"
}
```

### Webhook

`POST /api/payments/webhook`

Handles Razorpay webhook events.

## Database Schema

### Tables

#### subscriptions
- `id` (UUID): Primary key
- `user_id` (UUID): Reference to users table
- `plan_id` (TEXT): Reference to subscription_plans table
- `status` (TEXT): Subscription status (active, cancelled, etc.)
- `current_period_start` (TIMESTAMPTZ): Start of current billing period
- `current_period_end` (TIMESTAMPTZ): End of current billing period
- `cancel_at_period_end` (BOOLEAN): Whether to cancel at period end
- `razorpay_subscription_id` (TEXT): Razorpay subscription ID

#### payments
- `id` (UUID): Primary key
- `razorpay_payment_id` (TEXT): Razorpay payment ID
- `user_id` (UUID): Reference to users table
- `amount` (DECIMAL): Payment amount
- `currency` (TEXT): Payment currency (e.g., 'INR')
- `status` (TEXT): Payment status
- `method` (TEXT): Payment method
- `invoice_id` (TEXT): Razorpay invoice ID
- `notes` (JSONB): Additional payment details

#### credits_system
- `user_id` (UUID): Reference to users table (primary key)
- `credits_remaining` (INTEGER): Current credit balance
- `last_updated` (TIMESTAMPTZ): Last update timestamp

#### credit_transactions
- `id` (UUID): Primary key
- `user_id` (UUID): Reference to users table
- `amount` (INTEGER): Credit amount (positive or negative)
- `type` (TEXT): Transaction type
- `reference_id` (TEXT): Reference to related entity
- `description` (TEXT): Transaction description
- `created_at` (TIMESTAMPTZ): Creation timestamp

## Components

### SubscriptionPlans
Displays available subscription plans and handles subscription creation.

### CreditPurchase
Handles one-time credit purchases and HR service bookings.

### SubscriptionStatus
Displays the user's current subscription status and credit balance.

## Security Considerations

1. **API Keys**: Never commit actual API keys to version control. Use environment variables.
2. **Webhook Security**: Always verify webhook signatures to ensure requests are from Razorpay.
3. **Row Level Security**: Use Supabase RLS to restrict data access.
4. **Rate Limiting**: Implement rate limiting on API endpoints.
5. **Error Handling**: Properly handle and log errors without exposing sensitive information.

## Testing

1. **Test Mode**: Use Razorpay's test mode for development and testing.
2. **Webhook Testing**: Use tools like ngrok to test webhooks locally.
3. **Test Cards**: Use Razorpay's test card numbers for payment testing.

## Deployment

1. Set up environment variables in your hosting platform.
2. Run database migrations before starting the application.
3. Configure SSL for secure connections.
4. Set up monitoring and alerts for payment-related issues.

## Troubleshooting

- **Webhook Failures**: Check server logs for webhook processing errors.
- **Payment Issues**: Verify API keys and test with Razorpay's test cards.
- **Database Issues**: Ensure all migrations have been applied correctly.

## Support

For issues with the payment integration, please contact support@yourcompany.com.
