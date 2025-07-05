import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import path from 'path';

// https://vitejs.dev/config/
const isPreview = process.env.VITE_PREVIEW === 'true';

export default defineConfig({
  // Base URL configuration for Vercel
  base: './',
  appType: 'spa',
  
  // Development server configuration
  server: {
    port: 3000,
    open: true,
    host: true, // Listen on all network interfaces
    strictPort: true,
    headers: {
      'Content-Type': 'application/javascript',
      'X-Content-Type-Options': 'nosniff',
      'Cache-Control': 'public, max-age=0, must-revalidate'
    },
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
    sourcemap: isPreview ? true : false,
    minify: 'esbuild',
    chunkSizeWarningLimit: 1000,
    manifest: true,
    // Ensure Vite's output is compatible with Vercel
    target: 'es2020',
    ssr: false,
    // Disable dynamic imports for better compatibility
    dynamicImportVarsOptions: {
      exclude: [],
    },
    // Ensure proper MIME types for all assets
    assetsInlineLimit: 0,
    // Configure Rollup output
    rollupOptions: {
      output: {
        // Ensure consistent file naming
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: (assetInfo) => {
          if (!assetInfo.name) return 'assets/[name].[hash][extname]';
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1].toLowerCase();
          if (ext === 'css') {
            return 'assets/[name].[hash].css';
          }
          return 'assets/[name].[hash][extname]';
        },
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          vendor: ['framer-motion', 'lucide-react'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu']
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
      strategies: 'generateSW',
      srcDir: 'dist',
      filename: 'sw.js',
      includeAssets: [
        'favicon.ico',
        'apple-touch-icon.png',
        'safari-pinned-tab.svg',
        'robots.txt',
        'site.webmanifest',
        '**/*.{js,css,html,png,jpg,jpeg,svg,gif,ico,webp,woff,woff2,ttf,eot,json}'
      ],
      manifest: {
        name: 'VORTEX AI Platform',
        short_name: 'VORTEX',
        description: 'Enterprise-grade AI automation platform for modern businesses',
        theme_color: '#0f172a',
        background_color: '#0f172a',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable'
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          },
          {
            src: '/pwa-maskable-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'maskable'
          },
          {
            src: '/pwa-maskable-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ],
        shortcuts: [
          {
            name: 'Dashboard',
            short_name: 'Dashboard',
            description: 'Go to Dashboard',
            url: '/dashboard',
            icons: [{ src: '/pwa-192x192.png', sizes: '192x192' }]
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,jpeg,gif,webp,woff,woff2,ttf,eot,json}'],
        navigateFallback: isPreview ? 'index.html' : '/index.html',
        navigateFallbackDenylist: [/^\/api/, /\/.*\/api\//],
        clientsClaim: true,
        skipWaiting: true,
        dontCacheBustURLsMatching: /\.[0-9a-f]{8}\./,
        maximumFileSizeToCacheInBytes: 10 * 1024 * 1024, // 10MB
        cleanupOutdatedCaches: true,
        runtimeCaching: [
          // Google Fonts
          {
            urlPattern: /^https?:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          // Google Fonts static
          {
            urlPattern: /^https?:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'gstatic-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          // Static assets
          {
            urlPattern: /\.[a-f0-9]{8}\.[a-z0-9]+\.[a-z0-9]+$/i,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'static-assets-cache',
              expiration: {
                maxEntries: 200,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          // API requests
          {
            urlPattern: /^https?:\/\/api\./i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              networkTimeoutSeconds: 10,
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 5 // 5 minutes
              },
              cacheableResponse: {
                statuses: [0, 200, 404]
              }
            }
          },
          // Images
          {
            urlPattern: /\.(?:png|jpg|jpe?g|svg|gif|webp|avif|ico)$/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'image-cache',
              expiration: {
                maxEntries: 200,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          // Fonts
          {
            urlPattern: /\.(?:woff2?|ttf|eot|otf)$/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'font-cache',
              expiration: {
                maxEntries: 20,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      },
      devOptions: {
        enabled: isPreview,
        type: 'module',
        navigateFallback: 'index.html',
        suppressWarnings: true
      },
      // Add version to force update
      injectManifest: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,jpeg,gif,webp,woff,woff2,ttf,eot,json}']
      }
    })
  ],
  
  // Resolve configuration
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  
  // CSS configuration
  css: {
    devSourcemap: isPreview,
    modules: {
      localsConvention: 'camelCaseOnly'
    },
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/variables.scss";`
      }
    },
    postcss: {
      plugins: [
        tailwindcss,
        autoprefixer
      ]
    }
  },
  
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
    exclude: ['@vitejs/plugin-react']
  }
});
