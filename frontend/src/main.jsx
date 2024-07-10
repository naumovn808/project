import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

// Import Login, Register & AuthLayout.

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
	},

	{
		path: "*",
		element: <Error />,
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);