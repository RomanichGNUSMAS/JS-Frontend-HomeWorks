import axios from "axios";

export const Axios = axios.create({
    baseURL:"http://localhost:4002"
})

axios.interceptors.request.use((req) => {
    req.headers.Authorization = localStorage.getItem('token');
    return req;
})