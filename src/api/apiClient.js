import axios from 'axios';

// Create an Axios instance. You can configure a base URL and other defaults.
const apiClient = axios.create({
  baseURL: 'https://api.bro-ker.com/api', // Example: 'https://your-api.com/v1' or just '/api' if served from same domain
  // timeout: 10000, // Optional: timeout after 10 seconds
});

// Request interceptor to add the auth token to headers
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    // You can also set other default headers here if needed
    // For example, if most of your POST/PUT requests are JSON:
    // if (config.method === 'post' || config.method === 'put') {
    //   config.headers['Content-Type'] = config.headers['Content-Type'] || 'application/json';
    // }
    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

// Optional: Response interceptor for global error handling (e.g., 401 Unauthorized)
apiClient.interceptors.response.use(
  (response) => response, // Simply return the response if it's successful
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error('Unauthorized (401). Token might be invalid or expired.');
      // Here you might want to:
      // 1. Clear the token: localStorage.removeItem('authToken');
      // 2. Redirect to login: window.location.href = '/login';
      // 3. Or try to refresh the token if you have a refresh token mechanism.
    }
    return Promise.reject(error);
  }
);

export default apiClient;

// How to use in other files:
// import apiClient from './api/apiClient'; // Adjust path as needed
//
// apiClient.get('/users')
//   .then(response => console.log(response.data))
//   .catch(error => console.error('Error fetching users:', error));
//
// apiClient.post('/items', { name: 'New Item' })
//   .then(response => console.log(response.data))
//   .catch(error => console.error('Error creating item:', error));