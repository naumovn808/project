import React from "react";
import styles from "./RegisterSend.module.css";
import Button from "../../../components/Button/Button.jsx";
import { useLocation } from "react-router-dom";

const RegisterSend = () => {
	const location = useLocation();
	const email = location.state?.email;

	return (
		<div className={styles.RegisterSend}>
			<h1 className={styles.RegisterSend__title}>Проверьте почту</h1>
			<div className={styles.RegisterSend__text}>
				<p>
					Мы отправили ссылку для активации аккаунта по адресу <b>{email}</b>.
					<br />
					<br />
					Если письма долго нет, проверьте спам.
				</p>
			</div>
			<div className={styles.buttons}>
				<Button className={styles.button} title={"Перейти в почту"} />
				<Button className={styles.button} title={"Отправить еще раз"} />
			</div>
		</div>
	);
};

export default RegisterSend;
