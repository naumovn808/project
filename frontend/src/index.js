import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Register from './pages/Auth/Register/Register.jsx';
import AuthLayout from './pages/Layouts/AuthLayout/AuthLayout.jsx';
import Login from './pages/Auth/Login/Login.jsx';
import RegisterSend from './pages/Auth/RegisterSend/RegisterSend.jsx';
import Error from './pages/Error/Error.jsx';
import Main from './pages/Layouts/Main/Main.jsx';
import PasswordReset from './pages/Auth/PasswordReset/PasswordReset.jsx';
import ProfileForm from './pages/ProfileForm/ProfileForm.jsx';
import PasswordSend from './pages/Auth/PasswordSend/PasswordSend.jsx';
import NewPassword from './pages/Auth/NewPassword/NewPassword.jsx';
import PageTitres from './pages/PageTitres/PageTitres.jsx';
import './index.css';

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
                path: "register/send",
                element: <RegisterSend />,
            },
            {
                path: "reset",
                element: <PasswordReset />,
            },
            {
                path: "reset/send",
                element: <PasswordSend />,
            },
            {
                path: "reset/newpassword",
                element: <NewPassword />,
            },

        ],
    },
    {
        path: '/profile',
        element: <ProfileForm />,
        children: []
    },

    {
        path: "*",
        element: <Error />,
    },
    {
        path: 'titres',
        element: <PageTitres />
    }


]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
