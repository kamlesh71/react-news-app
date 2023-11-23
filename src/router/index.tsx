import { createBrowserRouter } from "react-router-dom";
import Layout from "@/common/components/ui/layout";
import { routes } from "./routes";
import { ProtectedRoute } from "./protected-route";

const router = createBrowserRouter(routes.map((item) => {
    const Element = item.element;
    return {
        ...item,
        element: (
            <Layout>
                <ProtectedRoute isPublic={item.isPublic ?? true} isGuest={item.isGuest ?? false}>
                    <Element />
                </ProtectedRoute>
            </Layout>
        )
    }
}));

export default router;