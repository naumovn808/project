import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Register from './pages/Auth/Register/Register.jsx';
import AuthLayout from './pages/Layouts/AuthLayout/AuthLayout.jsx';
import Login from './pages/Auth/Login/Login.jsx';
import Error from './pages/Error/Error.jsx';
import ProfileForm from './pages/ProfileForm/ProfileForm.jsx';

const router = createBrowserRouter([
  {
    path: "auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
        children: [],
      },
      {
        path: "register",
        element: <Register />,
        children: [],
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
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
