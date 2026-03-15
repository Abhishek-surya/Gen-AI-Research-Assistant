import axios from 'axios';
import { auth } from './firebase';

const api = axios.create({
    baseURL: 'http://localhost:8000/api', // Adjust path based on your backend
    headers: {
        'Content-Type': 'application/json'
    }
});

// Interceptor to add Firebase ID Token to requests automatically
api.interceptors.request.use(async (config) => {
    if (auth && auth.currentUser) {
        try {
            const token = await auth.currentUser.getIdToken();
            config.headers.Authorization = `Bearer ${token}`;
        } catch (error) {
            console.error("Error getting fresh token:", error);
        }
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api;
