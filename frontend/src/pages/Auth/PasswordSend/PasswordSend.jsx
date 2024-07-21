import React from "react";
import Button from "../../../components/Button/Button";
import styles from "./PasswordSend.module.css";
import { useLocation } from "react-router-dom";

const PasswordSend = () => {
    const location = useLocation();
	const email = location.state?.email;
    
	return (
		<div className={styles.passwordSend}>
			<h1 className={styles.passwordSend__title}>Проверьте почту</h1>
			<div className={styles.passwordSend__text}>
				<p>
					Мы отправили ссылку для сброса пароля по адресу <b>{email}</b>.
					<br />
					<br />
					Если письма долго нет, проверьте спам.
					<br />
					<br />А если оказались здесь случайно, просто удалите письмо — тогда ваш пароль не изменится.
				</p>
			</div>
			<Button className={styles.button} title={"Перейти в почту"} />
		</div>
	);
};

export default PasswordSend;
