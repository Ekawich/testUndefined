import React, { Children } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Default from "../components/Layout/Default";
import Auth from "../components/Layout/Auth";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Logout from "../pages/Logout"
import { checkLogin } from "../utils/auth";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Default />,
        children: [
            { index: true, element: <Login /> },
            { path: "/register", element: <Register />},
            { path: "/logout", element: <Logout/>, loader: checkLogin },
            {
                path: "/dashboard",
                element: <Auth/>,
                children: [
                    {
                        index:true,
                        element: <Dashboard/>,
                        loader: checkLogin
                    }
                ]
            }
        ],
    },
]);

const Routes = () => {
    return <RouterProvider router={router} />;
};

export default Routes;
