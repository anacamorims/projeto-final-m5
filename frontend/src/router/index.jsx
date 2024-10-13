import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/home.jsx";
import SignIn from "../pages/sign-in/SignIn.jsx";
import SignUp from "../pages/sign-up/SignUp.jsx";
import Dashboard from "../pages/dashboard/index.jsx";
import PrivateRoute from "../services/auth/auth.jsx"; // Importe o componente

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/sign/in",
                element: <SignIn />
            },
            {
                path: "/sign/up",
                element: <SignUp />
            },
            {
                path: "/dashboard",
                element: (
                    <PrivateRoute>
                        <Dashboard />
                    </PrivateRoute>
                )
            }
        ]
    }
]);
