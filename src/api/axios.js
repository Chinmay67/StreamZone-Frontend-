// frontend/src/api/axios.js

import axios from 'axios';
import { refreshAccessToken } from './userService';
 // Import the refresh token function

const instance = axios.create({
    baseURL: 'http://localhost:8000/api/v1', // Your API base URL
    withCredentials: true, // Ensure cookies are sent with requests
});

// Response interceptor to handle 401 Unauthorized errors
// instance.interceptors.response.use(
//     response => response,
//     async (error) => {
//         const originalRequest = error.config;

//         if (error.response.status === 401 && !originalRequest._retry) {
//             originalRequest._retry = true;
//             const newAccessToken = await refreshAccessToken();
//             if (newAccessToken) {
//                 // Retry the original request with the new token
//                 originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
//                 return instance(originalRequest);
//             } else {
//                 // Handle the case where token refresh fails
//                 console.error('Token refresh failed. Logging out user.');
//                 // Perform any logout actions or state clearing
//                 return Promise.reject(error);
//             }
//         }

//         return Promise.reject(error);
//     }
// );

export default instance;
