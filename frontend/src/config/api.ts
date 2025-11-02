/**
 * API Configuration
 * 
 * Centralized configuration for API endpoints.
 * Update the API_BASE_URL here to change the backend URL across the entire application.
 */

// Use environment variable if available, otherwise fall back to default
export const API_BASE_URL = 
  import.meta.env.VITE_API_BASE_URL || 'http://192.168.1.2:8080';

/**
 * Helper function to construct full API endpoint URLs
 * @param endpoint - The API endpoint path (e.g., '/auth/login', '/recipe/all')
 * @returns Full URL string
 */
export const getApiUrl = (endpoint: string): string => {
  // Remove leading slash if present to avoid double slashes
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${API_BASE_URL}${cleanEndpoint}`;
};

// Common API endpoints
export const API_ENDPOINTS = {
  // Authentication
  AUTH_LOGIN: '/auth/login',
  AUTH_SIGNUP: '/auth/signup',
  
  // Recipes
  RECIPE_ALL: '/recipe/all',
  RECIPE_LOAD: '/recipe/load',
  RECIPE_SEARCH: '/recipe/search',
  RECIPE_BY_ID: (id: string | number) => `/recipe/${id}`,
} as const;

