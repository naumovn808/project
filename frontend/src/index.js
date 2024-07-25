import * as React from "react";
import * as ReactDOM from "react-dom/client";
import AuthLayout from './pages/Layouts/AuthLayout/AuthLayout.jsx';
import Main from './pages/Layouts/Main/Main.jsx';
import Login from './pages/Auth/Login/Login.jsx'
import Register from './pages/Auth/Register/Register.jsx'
import RegisterSend from './pages/Auth/RegisterSend/RegisterSend.jsx'
import PasswordReset from './pages/Auth/PasswordReset/PasswordReset.jsx';
import PasswordSend from './pages/Auth/PasswordSend/PasswordSend.jsx';
import NewPassword from './pages/Auth/NewPassword/NewPassword.jsx';
import Error from './pages/Error/Error.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ProfileForm from './pages/ProfileForm/ProfileForm.jsx';

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
        path: "profile",
        element: <ProfileForm />,
        children: []
    },

    {
        path: "*",
        element: <Error />,
    },
    {
        path: "main",
        element: <Main />
    }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
