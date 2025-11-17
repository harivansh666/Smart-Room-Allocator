import { create } from 'zustand'
import { axiosInstance } from '../lib/axios';


export const useUserStore = create((set) => ({

    isAdmin: true,

    getUser: async () => {
        try {
            const response = await axiosInstance.get("/user/getUser");
            console.log(response);
            set({ isAdmin: true });
        } catch (error) {
            console.log(error);
        }
    },

    createRoom: async (data) => {
        try {
            const response = await axiosInstance.post("api/user/createRoom", { data });
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    },
}))

