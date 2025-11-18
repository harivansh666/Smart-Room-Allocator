import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

type User = {
    email: string;
    password: string;
};

type UserStore = {
    authUser: null;
    isLoding: boolean;

    Login: (data: User) => Promise<any>;
    createRoom: (data: object) => Promise<void>;
    getRooms: (userId: string) => Promise<any>;
};

export const useUserStore = create<UserStore>((set) => ({
    authUser: null,
    isAdmin: true,
    isLoding: false,


    checkAuth: async () => {
        try {
            const response = await axiosInstance.get('auth/check', { withCredentials: true })
            set({ authUser: response.data })
        } catch (error) {
            console.error("Error checking authentication:", error);
            set({ authUser: null });
        }
    },

    Login: async (data) => {
        try {
            set({ isLoding: true });

            const response = await axiosInstance.post("/signin", data);
            set({ authUser: response.data, });
            return { success: true }
        } catch (error) {
            console.log(error);
            return { success: false }
        } finally {
            set({ isLoding: false });
        }
    },

    createRoom: async (data) => {
        try {
            await axiosInstance.post("/rooms/createRoom", data);
        } catch (error) {
            console.log(error);
        }
    },

    getRooms: async (userId) => {
        try {
            const response = await axiosInstance.get(`/rooms/getrooms?userId=${userId}`);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    },
}));
