import { create } from "zustand";
import * as api from "@/auth/api";
import { persist } from "zustand/middleware";
import { AuthState } from "../types";
import { usePreferenceStore } from "@/preference/store/usePreferenceStore";

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: undefined,
            isLoggedIn: false,
            loading: false,
            token: undefined,
            init: async () => {
                try {
                    set({ loading: true });
                    const { data } = await api.user();
                    set({ user: data.data });
                    usePreferenceStore.getState().init({
                        preference_sources: data.data.preference_sources,
                        preference_categories: data.data.preference_categories,
                        preference_authors: data.data.preference_authors,
                    });
                } 
                finally {
                    set({ loading: false });
                }
            },
            login: async (email, password) => {
                try {
                    set({ loading: true });
                    const { data } = await api.login(email, password);
                    set({ token: data.token, user: data.data, isLoggedIn: true });
                }
                finally {
                    set({ loading: false });
                }
            },
            register: async (name, email, password) => {
                try {
                    set({ loading: true });
                    const { data } = await api.register(name, email, password);
                    set({ token: data.token, user: data.data, isLoggedIn: true });
                }
                finally {
                    set({ loading: false });
                }
            },
            expired: () => {
                set({ user: undefined, isLoggedIn: false, token: undefined, });  
            },
            logout: async () => {
                await api.logout();
                set({ user: undefined, isLoggedIn: false, token: undefined, });
            }
        }),
        {
            name: '_auth',
            partialize: (state) => ({ token: state.token, user: state.user, isLoggedIn: state.isLoggedIn, }),
        }
    )
);