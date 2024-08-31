import urlBuilder from '@/utils/helpers/urlBuilder';
import axios from 'axios';
import { useAuthStore } from '@/stores/auth';

/**
 * axios setup
 */

const api = () => {
    const axiosInstance = axios.create({
        baseURL:urlBuilder(),
        timeout: 3000,
        headers: {
            Accept: 'application/json, multipart/form-data',
            'Content-Type': 'application/json'
        },
    });

    axiosInstance.interceptors.request.use(
        (config) => {
            const authStore = useAuthStore();
            if (authStore.loggedIn) {
                const token = authStore.token;
                if (token) {
                    config.headers!.Authorization = 'Bearer ' + token;
                }
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    axiosInstance.interceptors.response.use(
        (response) => {
            return response;
        },
        async function (error) {
            const originalRequest = error.config;
            if (error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;
                const authStore = useAuthStore();
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + authStore.token;
                return axiosInstance(originalRequest);
            }
            return Promise.reject(error);
        }
    );

    return axiosInstance;
};

export default api;
