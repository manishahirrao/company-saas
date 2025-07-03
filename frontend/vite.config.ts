import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  base: './', // ✅ important for Vercel/static hosting
  // This tells Vite to treat the app as a Single Page Application (SPA)
  // which is necessary for client-side routing to work properly
  appType: 'spa',
  
  server: {
    host: "::",
    port: 3001,
    strictPort: true,
    // This ensures that the server falls back to index.html for 404s
    // which is necessary for client-side routing to work properly
    // When a user refreshes the page or navigates directly to a URL,
    // the server will serve index.html and React Router will handle the routing
    fs: {
      strict: true,
    },
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    },
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  plugins: [
    react(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  },
  // Handle SPA fallback for client-side routing
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  }
});
