import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

// Error handling for uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

// Error handling for unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

const app = express();
const PORT = Number(process.env.PORT) || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get('/api/test', (req, res) => {
  console.log('Test endpoint hit');
  res.json({ message: 'Backend is working!' });
});

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
  console.log(`Test with: curl http://localhost:${PORT}/api/test`);
  
  // Test the server immediately
  const testUrl = `http://localhost:${PORT}/api/test`;
  console.log(`Testing server at ${testUrl}...`);
  
  // Use fetch for testing
  fetch(testUrl)
    .then(response => response.json())
    .then(data => console.log('Server test response:', data))
    .catch(err => console.error('Server test error:', err));
});

// Handle graceful shutdown
const shutdown = () => {
  console.log('Shutting down server...');
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

// Keep the process running
console.log('Process started. Press Ctrl+C to exit.');
process.stdin.resume();

// Prevent the process from closing immediately
setInterval(() => {
  console.log('Server is still running...');
}, 30000);
