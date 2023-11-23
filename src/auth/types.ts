export type User = {
    name: string;
    email: string;
    preference_sources: string[];
    preference_categories: string[];
    preference_authors: string[];
};

export type AuthState = {
    user?: User,
    loading: boolean;
    isLoggedIn: boolean;
    token?: string;
    login: (email: string, password: string) => void;
    register: (name: string, email: string, password: string) => void;
    logout: () => void;
    expired: () => void;
    init: () => void;
}