import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import path from 'path';

// https://vitejs.dev/config/
// Determine the base URL based on the environment
const isProduction = process.env.NODE_ENV === 'production';
const isPreview = process.env.VITE_PREVIEW === 'true';

export default defineConfig({
  // Use absolute path for Vercel production, relative for development and preview
  base: isPreview ? './' : isProduction ? 'https://company-saas-frontend.vercel.app/' : '/',
  appType: 'spa',
  
  // Development server configuration
  server: {
    port: 3000,
    open: true,
    host: true, // Listen on all network interfaces
    strictPort: true,
    hmr: {
      clientPort: 3000,
      protocol: 'ws',
      host: 'localhost',
    },
    proxy: {
      '/api': {
        target: process.env.VITE_API_URL || 'http://localhost:5000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  
  // Build configuration
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    sourcemap: true,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          vendor: ['framer-motion', 'lucide-react']
        }
      }
    }
  },
  
  // Plugins
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      // Service worker configuration
      srcDir: 'src',
      filename: 'service-worker.js',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'robots.txt', 'safari-pinned-tab.svg'],
      manifest: {
        name: 'VORTEX AI Platform',
        short_name: 'VORTEX',
        description: 'Enterprise AI Operations Platform',
        theme_color: '#0f172a',
        background_color: '#0f172a',
        display: 'standalone',
        start_url: '/',
        scope: '/',
        // Add proper icon paths
        icons: [
          {
            src: '/apple-touch-icon.png',
            sizes: '180x180',
            type: 'image/png',
            purpose: 'any maskable'
          },
          {
            src: '/apple-touch-icon.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable'
          },
          {
            src: '/apple-touch-icon.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,jpeg,gif,webp,woff,woff2,ttf,eot,json}'],
        navigateFallback: isPreview ? 'index.html' : '/index.html',
        navigateFallbackDenylist: [/^\/api/, /\/.*\/api\/.*/],
        clientsClaim: true,
        skipWaiting: true,
        dontCacheBustURLsMatching: /\.[0-9a-f]{8}\./,
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // 5MB
        cleanupOutdatedCaches: true,
        // Configure runtime caching
        runtimeCaching: [
          // Cache same-origin requests (HTML, JS, CSS, images, etc.)
          {
            urlPattern: /^https?:\/\/(localhost|([^/]+\.)?vercel\.app)/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'app-assets',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
              },
              matchOptions: {
                ignoreSearch: true,
                ignoreVary: true
              }
            }
          },
          // Google Fonts stylesheets
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'google-fonts-stylesheets',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
              },
            },
          },
          // Google Fonts webfonts
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-webfonts',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
              },
            },
          },
          // jsDelivr CDN
          {
            urlPattern: /^https:\/\/cdn\.jsdelivr\.net\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'jsdelivr-cdn',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
              },
            },
          },
        ],
      },
      // Ensure the service worker is properly scoped
      selfDestroying: false
    })
  ],
  
  // Resolve configuration
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  
  // CSS configuration
  css: {
    postcss: {
      plugins: [
        tailwindcss,
        autoprefixer,
      ],
    },
  },
  
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
    esbuildOptions: {
      target: 'es2020',
    },
  }
});
