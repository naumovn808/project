import React, { useState } from "react";
import Button from "../../../components/Button/Button";
import styles from "./PasswordSend.module.css";
import { useLocation } from "react-router-dom";
import PopUpNotification from "../../../components/popUpNotification/popUpNotification";

const PasswordSend = () => {
    const location = useLocation();
	const email = location.state?.email;

	const [showPopup, setShowPopup] = useState(false);

	const handleClose = () => setShowPopup(false);
    
	return (
		<div className={styles.passwordSend}>
			<div>
				{showPopup && (
					<PopUpNotification
					message='Отправили ссылку на ваш email'
					isSuccess={true}
					onClose={handleClose}
					backgroundColor='#48455F'
					textColor="#fff"
					iconColor='#4CAF50'
					/>
				)}
				<button onClick={() => setShowPopup(true)}>Show Popup</button>
			</div>
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
