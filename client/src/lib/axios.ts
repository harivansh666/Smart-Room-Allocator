import axios from "axios"
export const axiosInstance = axios.create({
    // baseURL: import.meta.env.VITE_API_URL,
    baseURL: "https://smart-room-allocator.vercel.app/api",
    withCredentials: true,
});
