import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { User } from "@/interfaces/authInterface";

export interface UserStore {
  user: User | null;
  token: string | null;
  setUser: (user: User,token:string) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      setUser: (user,token:string) => set({ user,token }),
      clearUser: () => set({ user: null, token: null }),
    }),
    {
      name: "user-storage", // key name in storage
      storage: createJSONStorage(() => localStorage), // ✅ correct and type-safe
    }
  )
);
