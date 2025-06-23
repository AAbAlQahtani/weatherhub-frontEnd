import React from 'react'
import Nav from "../components/Nav";
import {
    createBrowserRouter,
    RouterProvider,
    Outlet
} from "react-router-dom";

import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Weather from '../pages/Weather';
import History from '../pages/History';
import Footer from '../components/Footer';


function Layout() {
    return (

        <>
            <Nav />
            <Outlet />
            <Footer />
        </>

    );


}

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            { path: "/", element: <Home /> },
            { path: "/weather", element: <Weather /> },
                        { path: "/history", element: <History /> },





        ],
    },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Signup /> },
]);


export default function Router() {
    return (
        <>
            <RouterProvider router={router} />
        </>
    )
}

