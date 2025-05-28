import { create } from "zustand";
import { persist } from "zustand/middleware";

export type User = {
    id: string;
    email: string;
    name: string;
    role: string
}

type UserStore = {
    user: User | null;
    setUser: (user: User) => void;
    clearUser: () => void;
}

export const useUserStore = create(
    persist<UserStore>((set) => ({
        user: null,
        setUser: (
            user: User
        ) => {
            set((state) => ({ ...state, user }));
        },
        clearUser: () => set((state) => ({ ...state, user: null }))
    }),
    {
        name: "user-storage"
    }
))