import { createBrowserRouter } from "react-router-dom";
import { Home } from "../App";
import { Products } from "../components/Products/Products";
import { AddProduct } from "../components/Products/AddProduct";
import { About } from "../components/Feautures/About";
import { ProductDetails } from "../components/Products/ProductDetails";
import { NotFound } from "../components/Feautures/404";
import { Login } from "../components/Authentication/Login";
import { Signup } from "../components/Authentication/Signup";
import { EditProduct } from "../components/Products/EditProduct";
import { LogOut } from "../components/Authentication/LogOut";


export const routes = createBrowserRouter([
    {
        path: '',
        element: <Home />,
        children: [
            { path: 'products', element: <Products /> },
            { path: 'products/:id', element: <ProductDetails /> },
            { path: 'edit/:id', element: <EditProduct /> },
            { path: 'add', element: <AddProduct /> },
            { path: 'About', element: <About /> },
            { path: 'login', element: <Login /> },
            { path: 'signup', element: <Signup /> },
            { path: 'logout', element: <LogOut /> }
        ]
    },
    { path: '*', element: <NotFound /> }
])