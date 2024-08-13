import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Register from './pages/Auth/Register/Register.jsx';
import AuthLayout from './pages/Layouts/AuthLayout/AuthLayout.jsx';
import Login from './pages/Auth/Login/Login.jsx';
import RegisterSend from './pages/Auth/RegisterSend/RegisterSend.jsx';
import Error from './pages/Error/Error.jsx';
import Main from './pages/Layouts/Main/Main.jsx';
import PasswordReset from './pages/Auth/PasswordReset/PasswordReset.jsx';
import PasswordSend from './pages/Auth/PasswordSend/PasswordSend.jsx';
import NewPassword from './pages/Auth/NewPassword/NewPassword.jsx';
import Cocktail from './pages/Cocktail/Cocktail.jsx';
import axios from 'axios';

const mainLoader = async () => {
    try {
      const response = await axios.post("http://localhost:1000/product", { page: 1 });
      return { initialCocktails: response.data };
    } catch (error) {
      console.error("Error fetching initial cocktails:", error);
      return { initialCocktails: [] };
    }
  };

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
        path: "*",
        element: <Error />,
    },
    {
        path: "/",
        element: <Main />,
        loader: mainLoader
    },
    {
        path: "cocktail",
        element: <Cocktail />
    },
    {
        path: "/cocktail/:id",
        element: <Cocktail />
    }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
