import React from "react";
import { Outlet } from "react-router-dom";
import './AuthLayout.css'

const AuthLayout = () => {
  return (
	<div className="container">
			<Header />
			<div className="content__outlet">
				<Outlet />
			</div>
			<Footer />
		</div>
  )
}

export default AuthLayout
