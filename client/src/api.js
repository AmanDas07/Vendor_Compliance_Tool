// api.js
import axios from 'axios';

// Function to get the CSRF token from cookies
const getCsrfToken = () => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; XSRF-TOKEN=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
};

// Create an Axios instance
const api = axios.create({
    baseURL: 'http://localhost:3001/api/v1', // Your backend base URL
    withCredentials: true // Send cookies with every request
});

// Interceptor to include the CSRF token in every request header
api.interceptors.request.use(
    (config) => {
        const csrfToken = getCsrfToken();
        if (csrfToken) {
            config.headers['X-XSRF-TOKEN'] = csrfToken; // Include the CSRF token in the header
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
