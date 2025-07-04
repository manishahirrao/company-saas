import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import AuthProvider from './contexts/AuthContext';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/toaster';
// Import the main App component
import App from './App';

// Debug: Log environment info
console.log('Environment:', {
  NODE_ENV: import.meta.env.MODE,
  VITE_SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL ? 'Set' : 'Not Set',
  VITE_SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY ? 'Set' : 'Not Set',
  React: React.version,
  UserAgent: navigator.userAgent
});

// Register service worker in production
const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator && import.meta.env.PROD) {
    try {
      const registration = await navigator.serviceWorker.register('/service-worker.js', {
        scope: '/',
      });
      
      if (registration.installing) {
        console.log('Service worker installing');
      } else if (registration.waiting) {
        console.log('Service worker installed');
      } else if (registration.active) {
        console.log('Service worker active');
      }
    } catch (error) {
      console.error('Service worker registration failed:', error);
    }
  }
};

// Initialize the app
function initializeApp() {
  console.log('1. Starting application initialization...');
  
  // Register service worker
  registerServiceWorker();
  
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    const errorMsg = 'FATAL: Root element (#root) not found in the DOM';
    console.error(errorMsg);
    document.write(`<div style="color: red; padding: 20px; font-family: Arial, sans-serif;">
      <h2>Critical Error</h2>
      <p>${errorMsg}</p>
      <p>Please check your index.html file for a div with id="root"</p>
    </div>`);
    return;
  }

  console.log('2. Root element found, creating React root...');

  try {
    const root = createRoot(rootElement);
    console.log('3. React root created, starting render...');
    
    root.render(
      <React.StrictMode>
        <BrowserRouter>
          <TooltipProvider>
            <AuthProvider>
              <App />
              <Toaster />
            </AuthProvider>
          </TooltipProvider>
        </BrowserRouter>
      </React.StrictMode>
    );
    
    console.log('4. React render completed successfully');
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error('FATAL: Failed to render application:', error);
    
    // More detailed error display
    rootElement.innerHTML = `
      <div style="
        max-width: 800px;
        margin: 50px auto;
        padding: 30px;
        border: 1px solid #e2e8f0;
        border-radius: 8px;
        background: #fff;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        color: #1a202c;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      ">
        <h1 style="
          color: #e53e3e;
          font-size: 24px;
          margin-top: 0;
          margin-bottom: 20px;
          font-weight: 600;
        ">
          Application Error
        </h1>
        
        <div style="
          background: #fff5f5;
          border-left: 4px solid #feb2b2;
          padding: 16px;
          margin-bottom: 20px;
          border-radius: 4px;
          font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
          white-space: pre-wrap;
          word-break: break-word;
          font-size: 14px;
          color: #c53030;
        ">
          ${errorMsg.replace(/</g, '&lt;').replace(/>/g, '&gt;')}
        </div>
        
        <h2 style="font-size: 18px; margin-top: 24px; margin-bottom: 12px; font-weight: 600;">
          Next Steps:
        </h2>
        <ol style="margin-top: 0; padding-left: 20px;">
          <li>Check the browser console for detailed error messages</li>
          <li>Verify your environment variables are properly set</li>
          <li>Ensure all dependencies are installed (run 'npm install')</li>
          <li>Try clearing your browser cache and hard refreshing (Ctrl+F5 or Cmd+Shift+R)</li>
        </ol>
        
        <button 
          onclick="window.location.reload()"
          style="
            margin-top: 20px;
            background: #4299e1;
            color: white;
            border: none;
            padding: 10px 16px;
            border-radius: 4px;
            font-weight: 500;
            cursor: pointer;
            font-size: 14px;
            transition: background 0.2s;
          "
          onmouseover="this.style.background='#3182ce'"
          onmouseout="this.style.background='#4299e1'"
        >
          Reload Page
        </button>
      </div>
    `;
  }
}

// Start the app
console.log('0. Starting VORTEX application...');

try {
  initializeApp();
} catch (error) {
  console.error('Fatal error in initializeApp:', error);
  const rootElement = document.getElementById('root');
  if (rootElement) {
    rootElement.innerHTML = `
      <div style="padding: 2rem; color: #991b1b; font-family: Arial, sans-serif;">
        <h2>Application Error</h2>
        <p>${error instanceof Error ? error.message : 'Unknown error occurred'}</p>
        <p>Please check the console for more details.</p>
      </div>
    `;
  }
}