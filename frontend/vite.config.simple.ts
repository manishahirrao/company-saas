import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@components': path.resolve(__dirname, './src/components'),
        '@lib': path.resolve(__dirname, './src/lib'),
      },
    },
    server: {
      port: 3003,
      host: true,
      open: true,
      // HMR is automatically configured by Vite in development mode
      hmr: mode === 'development' ? { overlay: true } : false,
    },
    preview: {
      port: 3003,
      host: true,
    },
    define: {
      // Define environment variables that will be available in the client code
      'process.env.NODE_ENV': JSON.stringify(mode),
      // Clear any global variables that might interfere
      'process.env': {}
    },
    optimizeDeps: {
      esbuildOptions: {
        target: 'es2020',
      },
    },
    build: {
      target: 'es2020',
      sourcemap: mode === 'development',
      minify: mode === 'production' ? 'terser' : false,
      rollupOptions: {
        output: {
          manualChunks: {
            react: ['react', 'react-dom', 'react-router-dom'],
            vendor: ['framer-motion', 'lucide-react'],
          }
        }
      }
    },
  };
});
