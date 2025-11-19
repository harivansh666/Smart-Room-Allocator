import axios from "axios"
export const axiosInstance = axios.create({
    baseURL: "http://localhost:3000/api",
    withCredentials: true,
    // baseURL: import.meta.env.VITE_API_URL,
    // baseURL: "https://smart-room-allocator.vercel.app/api",
});
