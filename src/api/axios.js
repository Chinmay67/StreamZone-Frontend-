// frontend/src/api/axios.js

import axios from 'axios';
import { refreshAccessToken } from './userService'; // Import the refresh token function

const instance = axios.create({
    baseURL: 'http://localhost:8000/api/v1', // Your API base URL
    withCredentials: true, // Ensure cookies are sent with requests
});



instance.interceptors.request.use(config => {
    const accessToken = localStorage.getItem('accessToken'); // or retrieve from a global state/context
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});



// Interceptor to handle 401 Unauthorized errors
instance.interceptors.response.use(
    response => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const newAccessToken = await refreshAccessToken();
            if (newAccessToken) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
                return axios(originalRequest);
            }
        }

        return Promise.reject(error);
    }
);

export default instance;
