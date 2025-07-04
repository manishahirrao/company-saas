import { Router } from 'express';
import { createSubscription, createOrder, handleWebhook } from '../../controllers/payment.controller.js';
import { validateRequest } from '../../middleware/validation.js';
import { body } from 'express-validator';

const router = Router();

// Create a new subscription
router.post(
  '/create-subscription',
  [
    body('planId').isString().notEmpty(),
    body('billingCycle').isIn(['monthly', 'annually']),
    body('userId').isUUID(),
  ],
  validateRequest,
  createSubscription
);

// Create a one-time payment order
router.post(
  '/create-order',
  [
    body('packageId').isString().notEmpty(),
    body('userId').isUUID(),
    body('type').isIn(['credits', 'hr_service']),
    body('serviceId').optional().isUUID(),
  ],
  validateRequest,
  createOrder
);

// Webhook endpoint for Razorpay events
router.post('/webhook', handleWebhook);

export default router;
