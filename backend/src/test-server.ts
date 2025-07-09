import express from 'express';
import cors from 'cors';

export function createTestServer(port = 3001) {
  const app = express();
  
  // Middleware
  app.use(cors());
  app.use(express.json());
  
  // Test route
  app.get('/api/test', (req, res) => {
    res.json({ message: 'Backend is working!' });
  });
  
  // Start server
  const server = app.listen(port, () => {
    console.log(`Test server running on http://localhost:${port}`);
  });
  
  return { app, server };
}

// Start the test server if this file is run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const { PORT = 3001 } = process.env;
  const { server } = createTestServer(Number(PORT));
  
  // Handle graceful shutdown
  process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server');
    server.close(() => {
      console.log('HTTP server closed');
    });
  });
  
  // Prevent the process from exiting immediately
  process.stdin.resume();
}
