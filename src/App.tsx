import './bootstrap';
import { RouterProvider } from "react-router-dom"
import router from "./router"
import { useAuthStore } from './auth/store/useAuthStore';
import { Toaster } from './common/components/ui/toaster';
import { useMountedEffect } from './common/hooks/useMountedEffect';

function App() {

  const { init, isLoggedIn } = useAuthStore(state => ({ init: state.init, isLoggedIn: state.isLoggedIn }));

  useMountedEffect(() => {
    if (isLoggedIn) {
     init();
    }
  });

  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  )
}

export default App;
