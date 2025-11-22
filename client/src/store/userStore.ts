import { create } from "zustand";
import toast from "react-hot-toast";

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
    dbTeachers: any[];

    warmUp: () => Promise<void>;
    checkAuth: () => Promise<void>;

    Login: (data: User) => Promise<{ success: boolean }>;
    Signup: (data: any) => Promise<{ success: boolean }>;
    logout: () => Promise<void>;

    getTeachers: () => Promise<void>;
    createRoom: (data: object) => Promise<void>;
    getRooms: (userId: string) => Promise<any>;
};

export const useUserStore = create<UserStore>((set) => ({
    authUser: null,
    isAdmin: false,
    isLoding: false,
    dbTeachers: [],

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
            toast.success("Successfully SignIN")

            return { success: true };
        } catch (error) {
            toast.error("Error In Signin")

            console.log(error);
            return { success: false };
        } finally {
            set({ isLoding: false });
        }
    },

    Signup: async (data) => {
        try {
            console.log(data)
            set({ isLoding: true });

            const response = await axiosInstance.post("/signup", data);

            set({
                authUser: response.data,
                isAdmin: response.data?.isAdmin || false,
            });
            toast.success("Successfully Signup")

            return { success: true };
        } catch (error) {
            toast.error("Error In SignUp")

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
                toast.success("Successfully Logout")

            }
        } catch (error) {
            console.log(error);
            toast.error("Error In Logout")

        } finally {
            set({ isLoding: false });
        }
    },

    getTeachers: async () => {
        try {
            const response = await axiosInstance.get("/rooms/getteachers")
            set({ dbTeachers: response.data.teachers })
            // console.log(response.data.teachers)
            toast.success("teachers fetch done")

        } catch (error) {
            toast.error("Error Fetching Teachers ")

            console.log("Error In Getting Teachers:-", error)
        }
    },

    createRoom: async (data) => {
        try {
            await axiosInstance.post("/rooms/createRoom", data);
            toast.success("Room Created")

        } catch (error) {
            toast.error("Error During Room Creating")
            console.log(error);
        }
    },

    getRooms: async (userId) => {
        try {
            const response = await axiosInstance.get("/rooms/getrooms", {
                params: { userId },
            });
            toast.success("Here is All Rooms")

            console.log(response.data);
            return response.data;

        } catch (error) {
            toast.error("Error During Fetching Rooms")
            console.log(error);
        }
    },
}));
