import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

type AuthUser = {
    email?: string;
    name?: string;
    roomsAllocated?: any[];
    isAdmin?: boolean;
};

type User = {
    email: string;
    password: string;
};

type UserStore = {
    authUser: AuthUser | null;
    isAdmin: boolean;
    isLoding: boolean;

    warmUp: () => Promise<void>;
    checkAuth: () => Promise<void>;

    Login: (data: User) => Promise<{ success: boolean }>;
    Signup: (data: any) => Promise<{ success: boolean }>;
    logout: () => Promise<void>;

    createRoom: (data: object) => Promise<void>;
    getRooms: (userId: string) => Promise<any>;
};

export const useUserStore = create<UserStore>((set) => ({
    authUser: null,
    isAdmin: false,
    isLoding: false,

    warmUp: async () => {
        try {
            const response = await axiosInstance.get("/check");
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    },

    checkAuth: async () => {
        try {
            const response = await axiosInstance.get("auth/check", {
                withCredentials: true,
            });

            set({
                authUser: response.data,
                isAdmin: response.data.isAdmin || false,
            });
        } catch (error) {
            console.error("Error checking authentication:", error);
            set({ authUser: null, isAdmin: false });
        }
    },

    Login: async (data) => {
        try {
            set({ isLoding: true });

            const response = await axiosInstance.post("/signin", data);

            set({
                authUser: response.data,
                isAdmin: response.data?.isAdmin || false,
            });

            return { success: true };
        } catch (error) {
            console.log(error);
            return { success: false };
        } finally {
            set({ isLoding: false });
        }
    },

    Signup: async (data) => {
        try {
            set({ isLoding: true });

            const response = await axiosInstance.post("/signup", data);

            set({
                authUser: response.data,
                isAdmin: response.data?.isAdmin || false,
            });

            return { success: true };
        } catch (error) {
            console.log(error);
            return { success: false };
        } finally {
            set({ isLoding: false });
        }
    },

    logout: async () => {
        try {
            set({ isLoding: true });

            const response = await axiosInstance.post(
                "/logout",
                {},
                { withCredentials: true }
            );

            if (response.data.success === "success") {
                set({ authUser: null, isAdmin: false });
                window.location.href = "/login";
            }
        } catch (error) {
            console.log(error);
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
            const response = await axiosInstance.get("/rooms/getrooms", {
                params: { userId },
            });
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    },
}));
