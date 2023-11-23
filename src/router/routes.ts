import LoginPage from "@/auth/pages/login-page";
import RegisterPage from "@/auth/pages/register-page";

import NewsPage from "@/news/pages/news-page";
import PersonalizedNewsPage from "@/news/pages/personalized-news-page";

interface Route {
    path: string;
    element: () => JSX.Element,
    isPublic?: boolean,
    isGuest?: boolean,
}

const routes: Route[] = [
    {
        path: '/',
        element: NewsPage,
    },
    {
        path: '/personalized',
        isPublic: false,
        element: PersonalizedNewsPage,
    },
    {
        path: '/auth/login',
        element:  LoginPage,
        isGuest: true,
    },
    {
        path: '/auth/create-account',
        element:RegisterPage,
        isGuest: true,
    },
];

export { routes };