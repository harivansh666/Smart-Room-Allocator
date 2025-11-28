import axios from "axios"
export const axiosInstance = axios.create({
    // baseURL: "https://smart-room-allocator.vercel.app/api",
    withCredentials: true,
    baseURL: "http://localhost:3000/api",
    // baseURL: import.meta.env.VITE_API_URL,
});
