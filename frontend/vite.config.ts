// https://vitejs.dev/config/
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory
  const env = loadEnv(mode, process.cwd(), '');
  
  // Set base URL - use VITE_BASE_URL in production, default to '/' in development
  const base = mode === 'production' ? env.VITE_BASE_URL || '/' : '/';
  const isDev = mode === 'development';
  
  // Log environment variables for debugging
  console.log('Vite Config - Environment Variables:', {
    VITE_BASE_URL: base,
    VITE_API_BASE_URL: env.VITE_API_BASE_URL || 'Not set',
    VITE_SUPABASE_URL: env.VITE_SUPABASE_URL ? '***' : 'Not set',
    VITE_SUPABASE_ANON_KEY: env.VITE_SUPABASE_ANON_KEY ? '***' : 'Not set',
    NODE_ENV: process.env.NODE_ENV,
    MODE: mode
  });
  
  return {
    // Base URL configuration
    base,
    appType: 'spa',
    publicDir: 'public',
    cacheDir: '.vite', // Clear cache directory
    define: {
      __BASE__: JSON.stringify(base),
      __DEFINES__: JSON.stringify({}),
      // Use import.meta.env.VITE_BASE_URL directly instead of __BASE__
      __SERVER_HOST__: JSON.stringify(env.VITE_SERVER_HOST || 'http://localhost:3002'),
      global: 'window'
    },
    
    // Development server configuration
    server: {
      port: 3003,
      host: '0.0.0.0', // Listen on all network interfaces
      open: 'http://localhost:3003',
      strictPort: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
      },
      proxy: {
        '/api': {
          target: 'http://localhost:3002',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    },
    
    // Build configuration
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      emptyOutDir: true,
      copyPublicDir: true,
      sourcemap: isDev, // Only enable sourcemaps in development
      minify: isDev ? false : 'terser',
      chunkSizeWarningLimit: 1000,
      manifest: true,
      terserOptions: {
        compress: {
          drop_console: !isDev,
          drop_debugger: !isDev,
        },
      },
      rollupOptions: {
        output: {
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
          maximumFileSizeToCacheInBytes: 5000000 // 5MB
        },
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,jpeg,gif,webp,woff,woff2,ttf,eot,json}'],
          navigateFallback: isDev ? 'index.html' : '/index.html',
          navigateFallbackDenylist: [/^\/api/, /\/.*\/api\//],
          sourcemap: isDev,
          cleanupOutdatedCaches: true,
          skipWaiting: true,
          clientsClaim: true,
          runtimeCaching: [
            {
              urlPattern: /^https?:\/\/.*/i,
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
          start_url: base,
          icons: [
            {
              src: `${base}icon-192x192.png`,
              sizes: '192x192',
              type: 'image/png',
              purpose: 'any maskable'
            },
            {
              src: `${base}icon-512x512.png`,
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any maskable'
            }
          ]
        },
        devOptions: {
          enabled: isDev,
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
  };
});
