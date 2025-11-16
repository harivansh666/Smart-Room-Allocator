import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useUserStore = create((set, get) => ({
  isAdmin: true,

  getUser: async () => {
    try {
      const response = await axiosInstance.get("/user/getUser");
      console.log(response);
      set({ isAdmin: true });
    } catch (error) {
      console.log(first);
    }
  },
}));
