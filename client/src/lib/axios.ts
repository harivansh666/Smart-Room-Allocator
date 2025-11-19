import axios from "axios"
export const axiosInstance = axios.create({
    baseURL: "https://smart-room-allocator.vercel.app/api",
    withCredentials: true,
});
