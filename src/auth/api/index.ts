import axios from "axios";

export const login = (email: string, password: string) => axios.post('/api/auth/login', {
    email,
    password,
});

export const register = (name: string, email: string, password: string) => axios.post('/api/auth/register', {
    name,
    email,
    password,
});

export const user = () => axios.get('/api/account/me');

export const logout = () => axios.post('/api/auth/logout');