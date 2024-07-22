import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import styles from "./AuthLayout.module.css";
import AuthHeader from "../../../components/Auth_Header/Auth_Header.jsx";
import AuthFooter from "../../../components/Auth_Footer/Auth_Footer.jsx";
import LoginClick from "../../Auth/LoginClick/LoginClick.jsx";

const AuthLayout = () => {
	const location = useLocation();

	return (
		<div className={styles.container__outlet}>
			<div>
				<AuthHeader isAuthPage={true} />
				{location.pathname === "/auth/login" && <div className={styles.login__card}><LoginClick/></div>}
				<div className={styles.outlet__card}>
					<Outlet />
				</div>
			</div>
			<AuthFooter isAuthPage={true} />
		</div>
	);
};

export default AuthLayout;
