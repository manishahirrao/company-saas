import { Router, Request, Response } from 'express';
import { razorpay, CREDIT_PACKAGES } from '../../config/razorpay.js';
import { validateRequest } from '../../middleware/validation.js';
import { body } from 'express-validator';
import { logger } from '../../config/logger.js';

const router = Router();

// Test Razorpay connection
router.get('/razorpay-test', async (_req: Request, res: Response) => {
  try {
    logger.info('Testing Razorpay connection...');
    
    // Test Razorpay connection by fetching payment methods
    const paymentMethods = await razorpay.payments.all({ count: 1 });
    
    logger.info('Successfully connected to Razorpay');
    
    return res.status(200).json({
      success: true,
      message: 'Razorpay connection successful',
      data: {
        paymentMethods: paymentMethods.items || []
      }
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    logger.error('Razorpay test error:', { error: errorMessage });
    
    return res.status(500).json({
      success: false,
      message: 'Failed to connect to Razorpay',
      error: errorMessage
    });
  }
});

// Test credit purchase
router.post(
  '/test-credit-purchase',
  [
    body('packageId').isString().isIn(['small', 'medium', 'large']),
    body('userId').isString().notEmpty(),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    try {
      const { packageId, userId } = req.body;
      logger.info(`Creating test credit purchase for user ${userId}, package ${packageId}`);
      
      const creditPackage = CREDIT_PACKAGES.find((pkg: { id: string }) => pkg.id === packageId);
      
      if (!creditPackage) {
        logger.warn(`Invalid package ID: ${packageId}`);
        return res.status(400).json({
          success: false,
          message: 'Invalid package ID'
        });
      }

      // Create a test order
      const order = await razorpay.orders.create({
        amount: creditPackage.amount * 100, // Convert to paise
        currency: 'INR',
        receipt: `test_rcpt_${Date.now()}`,
        notes: {
          userId,
          packageId,
          credits: creditPackage.credits,
          test: true
        },
      });

      logger.info(`Test order created: ${order.id} for amount ${order.amount}`);

      return res.status(201).json({
        success: true,
        message: 'Test order created successfully',
        data: {
          orderId: order.id,
          amount: order.amount,
          currency: order.currency,
          status: order.status,
          package: creditPackage
        }
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      logger.error('Test credit purchase error:', { error: errorMessage });
      
      return res.status(500).json({
        success: false,
        message: 'Failed to create test order',
        error: errorMessage
      });
    }
  }
);

export default router;
