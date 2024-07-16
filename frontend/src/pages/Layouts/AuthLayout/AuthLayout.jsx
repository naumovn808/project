import React from "react";
import { Outlet } from "react-router-dom";
import styles from "./AuthLayout.module.css";
import AuthHeader from "../../../components/Auth_Header/Auth_Header.jsx";
import AuthFooter from "../../../components/Auth_Footer/Auth_Footer.jsx";

const AuthLayout = () => {
	return (
		<div className={styles.container__outlet}>
			<div>
				<AuthHeader />
				<div className={styles.outlet__card}>
					<Outlet />
				</div>
			</div>
			<AuthFooter />
		</div>
	);
};

export default AuthLayout;
