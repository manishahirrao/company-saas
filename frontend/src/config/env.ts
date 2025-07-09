// Helper function to safely get environment variables
function getEnvVar(key: string, defaultValue: string = ''): string {
  const value = import.meta.env[key];
  if (value === undefined || value === null) {
    console.warn(`Environment variable ${key} is not set. Using default value.`);
    return defaultValue;
  }
  return value;
}

// Environment configuration
const env = {
  // API Configuration
  API_BASE_URL: getEnvVar('VITE_API_BASE_URL', 'http://localhost:3002'),
  
  // Supabase Configuration
  SUPABASE_URL: getEnvVar('VITE_SUPABASE_URL'),
  SUPABASE_ANON_KEY: getEnvVar('VITE_SUPABASE_ANON_KEY'),
  
  // App Configuration
  NODE_ENV: getEnvVar('MODE', 'development'),
  IS_DEV: import.meta.env.DEV,
  IS_PROD: import.meta.env.PROD,
  
  // Validate required environment variables
  validate: (): boolean => {
    const requiredVars = ['VITE_API_BASE_URL', 'VITE_SUPABASE_URL', 'VITE_SUPABASE_ANON_KEY'];
    let isValid = true;
    
    requiredVars.forEach(varName => {
      if (!import.meta.env[varName]) {
        console.error(`Missing required environment variable: ${varName}`);
        isValid = false;
      }
    });
    
    return isValid;
  },
  
  // Log environment for debugging
  log: (): void => {
    if (import.meta.env.DEV) {
      console.group('Environment Configuration');
      console.log('NODE_ENV:', env.NODE_ENV);
      console.log('IS_DEV:', env.IS_DEV);
      console.log('IS_PROD:', env.IS_PROD);
      console.log('API_BASE_URL:', env.API_BASE_URL);
      console.log('SUPABASE_URL:', env.SUPABASE_URL ? '***' : 'Not set');
      console.groupEnd();
    }
  }
};

// Validate environment variables on load
if (!env.validate()) {
  console.error('Missing required environment variables. Please check your .env file.');
}

// Log environment in development
if (import.meta.env.DEV) {
  env.log();
}

export default env;
