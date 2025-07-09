const http = require('http');
const PORT = 3002;

// Log environment information
console.log('Node.js version:', process.version);
console.log('Platform:', process.platform);
console.log('Current directory:', process.cwd());

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

const requestHandler = (req, res) => {
  console.log(`Received ${req.method} request for ${req.url}`);
  
  if (req.url === '/api/test' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Simple JS server is working!' }));
    console.log('Test endpoint hit');
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
};

const server = http.createServer(requestHandler);

// Handle server errors
server.on('error', (error) => {
  console.error('Server error:', error);
  if (error.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use`);
  }
  process.exit(1);
});

// Start the server
server.listen(PORT, '0.0.0.0', () => {
  const address = server.address();
  console.log(`Server running at:`, address);
  console.log(`Test with: curl http://localhost:${PORT}/api/test`);
  
  // Test the server immediately
  const testUrl = `http://localhost:${PORT}/api/test`;
  console.log(`Testing server at ${testUrl}...`);
  
  http.get(testUrl, (testRes) => {
    let data = '';
    testRes.on('data', (chunk) => {
      data += chunk;
    });
    testRes.on('end', () => {
      console.log('Server test response:', data);
    });
  }).on('error', (err) => {
    console.error('Server test error:', err);
  });
});

// Handle process termination
const shutdown = () => {
  console.log('Shutting down server...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

// Keep the process running
console.log('Process started. Press Ctrl+C to exit.');
process.stdin.resume();

// Log that the server is still running
setInterval(() => {
  console.log('Server is still running at:', new Date().toISOString());
}, 5000);
