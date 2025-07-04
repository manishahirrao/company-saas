# VORTEX AI Platform - PWA Setup

This document outlines the Progressive Web App (PWA) configuration for the VORTEX AI Platform.

## Features

- 🚀 Offline support with service workers
- 📱 Installable on mobile devices
- 🔄 Background sync for data updates
- 📦 Asset caching for fast loading
- 📱 Responsive design for all screen sizes

## Configuration

### Manifest Files
- `public/manifest.webmanifest` - Web app manifest for PWA
- `public/manifest.json` - Fallback manifest for compatibility
- `public/browserconfig.xml` - Configuration for Microsoft applications

### Service Worker
- `vite.config.ts` - Vite PWA plugin configuration
- `workbox-config.js` - Workbox configuration for service worker

### Icons
- `public/apple-touch-icon.png` - App icon for iOS devices
- `public/favicon.ico` - Favicon for browsers
- `public/safari-pinned-tab.svg` - Safari pinned tab icon

## Development

### Running Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Building for Production

```bash
# Build the application
npm run build

# Preview the production build
npm run preview
```

## Deployment

The application is configured for deployment on Vercel. The following files control the deployment:

- `vercel.json` - Vercel configuration
- `public/_headers` - HTTP headers for security and caching
- `public/_redirects` - URL rewriting rules

## Testing PWA Features

1. **Install the PWA**
   - Open the site in Chrome/Edge
   - Click the install button in the address bar (desktop) or Add to Home Screen (mobile)

2. **Test Offline Mode**
   - Open Chrome DevTools
   - Go to the Application tab
   - Check "Offline" in the Service Workers section
   - Refresh the page to test offline functionality

3. **Audit with Lighthouse**
   - Open Chrome DevTools
   - Go to the Lighthouse tab
   - Run an audit for PWA, Performance, Accessibility, and more

## Troubleshooting

### Service Worker Not Registering
- Ensure the site is served over HTTPS in production
- Check the console for any registration errors
- Clear site data and hard refresh the page

### Manifest Issues
- Verify the manifest file is accessible at `/manifest.webmanifest`
- Check for any syntax errors in the manifest
- Ensure all icon paths are correct

### Caching Problems
- Clear the site data and service worker
- Check the Cache Storage in DevTools > Application > Cache Storage
- Verify the Workbox configuration in `vite.config.ts`

## Resources

- [Web App Manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest)
- [Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [Workbox](https://developers.google.com/web/tools/workbox)
- [Vite PWA Plugin](https://vite-pwa-org.netlify.app/)
