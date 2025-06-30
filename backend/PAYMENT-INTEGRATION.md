# Payment Integration Guide

This document provides an overview of the Razorpay payment integration in the PostPilot AI Hub backend.

## Table of Contents
- [Overview](#overview)
- [Setup](#setup)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Webhook Handling](#webhook-handling)
- [Testing](#testing)
- [Security Considerations](#security-considerations)

## Overview

The payment system integrates with Razorpay to handle:
- Subscription billing (monthly/annual plans)
- One-time payments for credits
- HR service payments

## Setup

1. **Environment Variables**
   Add these to your `.env` file:
   ```
   # Razorpay
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_key_secret
   RAZORPAY_WEBHOOK_SECRET=your_webhook_secret
   ```

2. **Database Setup**
   Run the migration to create required tables:
   ```bash
   npm run migrate
   ```

## API Endpoints

### Create Subscription
```
POST /api/payments/create-subscription
```

**Request Body:**
```json
{
  "planId": "basic",
  "billingCycle": "monthly",
  "userId": "user-uuid-here"
}
```

### Create Order (One-time Payment)
```
POST /api/payments/create-order
```

**Request Body:**
```json
{
  "packageId": "small",
  "userId": "user-uuid-here",
  "type": "credits"
}
```

### Webhook Endpoint
```
POST /api/payments/webhook
```

## Database Schema

### subscription_plans
Stores available subscription plans with pricing and features.

### subscriptions
Tracks user subscriptions with status and billing cycle information.

### credit_transactions
Records all credit transactions (additions/deductions).

### credits_system
Maintains current credit balance for each user.

## Webhook Handling

The webhook endpoint handles these events:
- `subscription.activated`: When a subscription is activated
- `subscription.cancelled`: When a subscription is cancelled
- `payment.captured`: When a payment is captured

## Testing

1. **Unit Tests**
   ```bash
   npm test
   ```

2. **Integration Test**
   ```bash
   npm run test:integration
   ```

3. **Manual Testing with Razorpay Test Mode**
   - Use test API keys
   - Test card: 4111 1111 1111 1111
   - Test UPI: success@razorpay

## Security Considerations

1. **Webhook Security**
   - Always verify the webhook signature
   - Never trust the request body without verification

2. **API Security**
   - Use HTTPS for all API calls
   - Implement rate limiting
   - Validate all input data

3. **Data Protection**
   - Never log sensitive payment information
   - Mask sensitive data in logs
   - Follow PCI DSS compliance guidelines

## Troubleshooting

1. **Webhook Issues**
   - Check the webhook logs for errors
   - Verify the webhook secret matches between Razorpay dashboard and your .env
   - Ensure your endpoint is publicly accessible

2. **Payment Failures**
   - Check the Razorpay dashboard for detailed error messages
   - Verify your account has sufficient balance
   - Check for any restrictions on your Razorpay account

## Support

For any issues, contact support@postpilot.ai with the following information:
- Error message
- Request/response logs (with sensitive data redacted)
- Steps to reproduce the issue
