import axios from 'axios';

// Create an Axios instance. You can configure a base URL and other defaults.
const apiClient = axios.create({
  baseURL: 'https://api.bro-ker.com/api', // Example: 'https://your-api.com/v1' or just '/api' if served from same domain
  // timeout: 10000, // Optional: timeout after 10 seconds
});

// In-memory cache store and default duration
const cache = new Map();
const DEFAULT_CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

// Request interceptor to add the auth token to headers



apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    // You can also set other default headers here if needed
    // For example, if most of your POST/PUT requests are JSON:
    // if ((config.method === 'post' || config.method === 'put') && !config.headers['Content-Type']) {
    //   config.headers['Content-Type'] = 'application/json';
    // }
    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

// Response interceptor for global error handling
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Only handle 401 errors for authenticated endpoints
    if (error.response?.status === 401 && !error.config.url.includes('/auth')) {
      // Don't remove the token - just mark the error as auth-related
      // This lets the application handle auth errors appropriately without
      // immediately removing the token
      return Promise.reject({
        ...error,
        isAuthError: true,
        message: 'Authentication required. Please try again.'
      });
    }
    return Promise.reject(error);
  }
);

// --- Caching logic for GET requests ---
// Store the original apiClient.get method
const originalGet = apiClient.get;

apiClient.get = async (url, config = {}) => {
  // Allow per-request cache configuration or bypass
  // e.g., apiClient.get('/data', { useCache: false })
  // e.g., apiClient.get('/data', { cacheDuration: 10 * 60 * 1000 }) // 10 minutes
  const { useCache = true, cacheDuration = DEFAULT_CACHE_DURATION } = config;

  if (!useCache) {
    return originalGet.call(apiClient, url, config);
  }

  // Create a cache key. Includes URL and stringified params to differentiate requests.
  // Note: If other config options (like specific headers) vary the response,
  // they might also need to be part of the cacheKey for more precise caching.
  const paramsString = config.params ? JSON.stringify(config.params) : '';
  const cacheKey = `GET:${url}:${paramsString}`;

  const cachedItem = cache.get(cacheKey);

  if (cachedItem && Date.now() < cachedItem.expiry) {
    console.log(`[Cache] HIT for ${cacheKey}`);
    // Return a promise that resolves with the cached data,
    // mimicking Axios response structure and adding an isFromCache flag.
    return Promise.resolve({ ...cachedItem.axiosResponse, data: cachedItem.data, isFromCache: true });
  }

  console.log(`[Cache] MISS for ${cacheKey}. Fetching from API...`);
  try {
    const response = await originalGet.call(apiClient, url, config);
    // Cache the successful response
    cache.set(cacheKey, {
      data: response.data, // The actual response data
      axiosResponse: { // Store other relevant parts of the Axios response object
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
        config: response.config, // The original request config
      },
      expiry: Date.now() + cacheDuration,
    });
    return response;
  } catch (error) {
    // Do not cache errors by default.
    // If an error occurs, it will be thrown and handled by the caller.
    throw error;
  }
};

// --- Utility functions to manage the cache ---
export function clearApiCache() {
  cache.clear();
  console.log('[Cache] All API cache entries cleared.');
}

export default apiClient;
