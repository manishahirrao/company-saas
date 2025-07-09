import { Router, Request, Response } from 'express';

// Create a new router instance with proper typing
const healthRouter: Router = Router();

export { healthRouter };

healthRouter.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    nodeVersion: process.version,
    memoryUsage: process.memoryUsage(),
  });
});

export default healthRouter;
