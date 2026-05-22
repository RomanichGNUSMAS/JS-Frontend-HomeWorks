import axios from "axios";

export const Axios = axios.create({
    baseURL: "http://localhost:4002"
});

Axios.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');
    
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    
    return req;
}, (error) => {
    return Promise.reject(error);
});
