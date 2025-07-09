import express from 'express';

const app = express();
const PORT = 3001;

// Simple route
app.get('/api/test', (req, res) => {
  console.log('Test endpoint hit');
  res.json({ message: 'Minimal server is working!' });
});

// Start server
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`Minimal server running on http://0.0.0.0:${PORT}`);
  console.log(`Test with: curl http://localhost:${PORT}/api/test`);
});

// Keep the process running
process.stdin.resume();

// Log that the server is still running
setInterval(() => {
  console.log('Minimal server is still running...');
}, 10000);
