import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Register from './pages/Auth/Register/Register.jsx'
import AuthLayout from './pages/Layouts/AuthLayout/AuthLayout.jsx'
import Login from './pages/Auth/Login/Login.jsx'
import RegisterSend from './pages/Auth/RegisterSend/RegisterSend.jsx'
import Error from './pages/Error/Error.jsx'
import Main from './pages/Layouts/Main/Main.jsx'
import PasswordReset from './pages/Auth/PasswordReset/PasswordReset.jsx'
import PasswordSend from './pages/Auth/PasswordSend/PasswordSend.jsx'
import NewPassword from './pages/Auth/NewPassword/NewPassword.jsx'
import PageTitres from './pages/PageTitres/PageTitres.jsx'
import Cocktail from './pages/Cocktail/Cocktail.jsx'

const router = createBrowserRouter([
	{
		path: 'auth',
		element: <AuthLayout />,
		children: [
			{
				path: 'login',
				element: <Login />,
			},
			{
				path: 'register',
				element: <Register />,
			},
			{
				path: 'register/send',
				element: <RegisterSend />,
			},
			{
				path: 'reset',
				element: <PasswordReset />,
			},
			{
				path: 'reset/send',
				element: <PasswordSend />,
			},
			{
				path: 'reset/newpassword',
				element: <NewPassword />,
			},
		],
	},

	{
		path: '*',
		element: <Error />,
	},
	{
		path: 'main',
		element: <Main />,
	},
	{
		path: 'cocktail',
		element: <Cocktail />,
	},
	{
		path: '/cocktail/:id',
		element: <Cocktail />,
	},
	{
		path: 'titres',
		element: <PageTitres />,
	},
])

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
)
