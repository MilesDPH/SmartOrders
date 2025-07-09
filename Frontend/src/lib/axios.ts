// src/lib/axios.ts
import axios from 'axios';
import Cookies from 'js-cookie';

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,   // http://localhost:8500
    withCredentials: true,                        // envía cookies
    withXSRFToken: true,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        Accept: 'application/json',
    },
});

/* 🚀 Inyector de XSRF  --------------------------------------------- */
api.interceptors.request.use((config) => {
    const token = Cookies.get('XSRF-TOKEN');
    if (token) {
        // Laravel espera el valor **sin codificar**
        config.headers['X-XSRF-TOKEN'] = decodeURIComponent(token);
    }
    return config;
});
/* ----------------------------------------------------------------- */

export const getCsrf = () => api.get('/sanctum/csrf-cookie');
export default api;