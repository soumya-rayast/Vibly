import axios from 'axios';

const BASE_URL = import.meta.env.BACKEND_API;

export const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
});
