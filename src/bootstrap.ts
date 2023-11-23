import axios, { AxiosError } from "axios";
import { useAuthStore } from "@/auth/store/useAuthStore";
import { toast } from "./common/components/ui/use-toast";

axios.defaults.baseURL = 'http://localhost';

axios.defaults.headers.common['Accept'] = 'application/json';

axios.interceptors.request.use((config) => {

    const authStore = useAuthStore.getState();

    if (authStore.token) {
        config.headers.Authorization = `Bearer ${authStore.token}`;
    }

    return config;
});

axios.interceptors.response.use(undefined, (error: AxiosError) => {

    if (error.response?.status === 422) {
        toast({
            variant: "destructive",
            // @ts-expect-error server validation error response
            description: Object.values(error.response.data['errors'])[0][0]
        });
    }

    if (error.response?.status === 401) {
        
        useAuthStore.getState().expired();

        toast({
            variant: "destructive",
            description: "Session expired. Please login again."
        });
    }

    throw error;
});