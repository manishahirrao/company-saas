import axios from 'axios';
import env from '@/config/env';

// Create axios instance with base URL from environment variables
const api = axios.create({
  baseURL: env.API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
  timeout: 10000, // 10 second timeout
});

// Add a request interceptor to include the auth token in requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('supabase.auth.token');
    if (token) {
      config.headers.Authorization = `Bearer ${JSON.parse(token)}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Handle specific status codes
      if (error.response.status === 401) {
        // Handle unauthorized access
        console.error('Unauthorized access - please log in again');
        // You might want to redirect to login here
      } else if (error.response.status === 404) {
        console.error('The requested resource was not found');
      } else if (error.response.status >= 500) {
        console.error('Server error - please try again later');
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received from server - please check your connection');
    } else {
      // Something happened in setting up the request
      console.error('Error setting up request:', error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
