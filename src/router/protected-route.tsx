import { useAuthStore } from "@/auth/store/useAuthStore"
import { Navigate } from "react-router-dom";

type Props = React.PropsWithChildren<{
    isPublic: boolean;
    isGuest: boolean;
}>;

const ProtectedRoute: React.FC<Props> = ({ isPublic, isGuest, children }) => {
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

    if (! isPublic && ! isLoggedIn) {
        return <Navigate to="/auth/login" />;
    }

    if (isLoggedIn && isGuest) {
        return <Navigate to="/" />;
    }

     return children;
}

export { ProtectedRoute }