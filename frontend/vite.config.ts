// https://vitejs.dev/config/
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import path from 'path';

const isPreview = process.env.VITE_PREVIEW === 'true';

export default defineConfig({
  // Base URL configuration for Vercel
  base: '/',
  appType: 'spa',
  publicDir: 'public',
  define: {
    __DEFINES__: JSON.stringify({}),
    __BASE__: JSON.stringify(process.env.VITE_BASE_URL), // Legacy: migrate all code to use import.meta.env.VITE_BASE_URL
    __SERVER_HOST__: JSON.stringify(process.env.VITE_SERVER_HOST), // Legacy: migrate all code to use import.meta.env.VITE_SERVER_HOST
    global: 'window',
    __HMR_CONFIG_NAME__: JSON.stringify('vite'),
    'import.meta.env.HMR': 'true'
  },
  
  // Development server configuration
  server: {
    port: 3000,
    host: true,
    open: true,
    strictPort: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
    },
  },
  
  // Build configuration
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    copyPublicDir: true,
    // Disable sourcemaps in production
    sourcemap: false,
    // Use terser for better minification in production
    minify: 'terser',
    chunkSizeWarningLimit: 1000,
    manifest: true,
    terserOptions: {
      compress: {
        // Remove debugger and console logs in production
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          vendor: ['framer-motion', 'lucide-react'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu']
        }
      },
    },
  },
  
  // Plugins
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'sw.js',
      includeAssets: [
        'favicon.ico',
        'apple-touch-icon.png',
        'masked-icon.svg',
        'robots.txt',
        'icon-192x192.png',
        'icon-512x512.png'
      ],
      injectManifest: {
        injectionPoint: 'self.__WB_MANIFEST',
        maximumFileSizeToCacheInBytes: 5000000, // 5MB
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,jpeg,gif,webp,woff,woff2,ttf,eot,json}'],
        navigateFallback: isPreview ? 'index.html' : '/index.html',
        navigateFallbackDenylist: [/^\/api/, /\/.*\/api\//],
        sourcemap: true,
        cleanupOutdatedCaches: true,
        skipWaiting: true,
        clientsClaim: true,
        runtimeCaching: [
          {
            urlPattern: new RegExp('^https?://.*'),
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 200,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      },

      manifest: {
        name: 'Company SaaS',
        short_name: 'CompanySaaS',
        description: 'Company SaaS Application',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: '/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable'
          },
          {
            src: '/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },

      devOptions: {
        enabled: true, // Enable PWA in development
        type: 'module',
        navigateFallback: 'index.html',
        suppressWarnings: true,
        disableRuntimeConfig: true
      }
    })
  ],
  
  // Resolve configuration
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, './src') },
      { find: '@components', replacement: path.resolve(__dirname, './src/components') },
      { find: '@pages', replacement: path.resolve(__dirname, './src/pages') },
      { find: '@assets', replacement: path.resolve(__dirname, './src/assets') }
    ]
  },
  
  // CSS configuration
  css: {
    postcss: {
      plugins: [
        tailwindcss,
        autoprefixer
      ]
    }
  }
});
