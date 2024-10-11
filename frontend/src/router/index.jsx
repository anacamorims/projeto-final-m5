import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import SignIn from "../pages/sign-in/SignIn";
import Dashboard from "../pages/dashboard/dashboard";

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
                path: "/sign-in",
                element: <SignIn />
            },
            {
                path: "/dashboard",
                element: <Dashboard />
            }
        ]
    }
])