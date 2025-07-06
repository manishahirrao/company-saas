const fs = require('fs');
const path = require('path');

// Base64 encoded 1x1 transparent PNG
const transparentPixel = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';

// Create public directory if it doesn't exist
const publicDir = path.join(__dirname, '../public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Create icon files
fs.writeFileSync(path.join(publicDir, 'icon-192x192.png'), transparentPixel, 'base64');
fs.writeFileSync(path.join(publicDir, 'icon-512x512.png'), transparentPixel, 'base64');

console.log('Placeholder icons created. Please replace them with your actual icons.');
