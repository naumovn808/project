import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import styles from "./AuthLayout.module.css";
import AuthHeader from "../../../components/Auth_Header/Auth_Header.jsx";
import AuthFooter from "../../../components/Auth_Footer/Auth_Footer.jsx";
import LoginClick from "../../Auth/LoginClick/LoginClick.jsx";

const AuthLayout = () => {
<<<<<<< HEAD
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
=======
	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		if (location.pathname === "/auth") {
			navigate("/main");
		}
	}, []);

	return (
		<div className={styles.container__outlet}>
			<div>
				<AuthHeader isAuthPage={true} />
				{location.pathname === "/auth/login" && (
					<div className={styles.login__card}>
						<LoginClick />
					</div>
				)}
				<div className={styles.outlet__card}>
					<Outlet />
				</div>
			</div>
			<AuthFooter isAuthPage={true} />
		</div>
	);
>>>>>>> friend-repo/development
};

export default AuthLayout;
