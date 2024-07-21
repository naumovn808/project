import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Register from './pages/Auth/Register/Register.jsx';
import AuthLayout from './pages/Layouts/AuthLayout/AuthLayout.jsx';
import Login from './pages/Auth/Login/Login.jsx';
import RegisterSend from './pages/Auth/RegisterSend/RegisterSend.jsx';
import Error from './pages/Error/Error.jsx';
import Main from './pages/Layouts/Main/Main.jsx'

const router = createBrowserRouter([
    {
        path: "auth",
        element: <AuthLayout />,
        children: [
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "register",
                element: <Register />,
            },
            {
                path: "register/registerSend",
                element: <RegisterSend />,
            },
        ],
    },

    {
        path: "*",
        element: <Error />,
    },
    {
        path: "main",
        element: <Main/>
    }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
