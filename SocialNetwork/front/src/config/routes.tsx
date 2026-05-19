import { createBrowserRouter } from "react-router-dom";
import { Home } from "../Home";
import { Profile } from "../pages/profile/Profile";
import { Login } from "../pages/auth/Login";
import { Signup } from "../pages/auth/Signup";

export const routes = createBrowserRouter([
    { 
        path:'',
        element: <Home />,
        children: [
            {path:'', element:<Profile />},
        ]
    },
    {path:'login', element:<Login />},
    {path:'signup', element:<Signup />}
])