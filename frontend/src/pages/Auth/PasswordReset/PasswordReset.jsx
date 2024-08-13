import React, { useState } from "react";
import styles from "./PasswordReset.module.css";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../../components/Button/Button";
import Input from "../../../components/Input/Input.jsx";
import MSG from "../../../components/popUpNotification/popUpNotification.jsx";

const PasswordReset = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");

	const handleChange = (e) => {
		const emailValue = e.target.value;
		setEmail(emailValue);
		setTimeout(() => {
			validateRegex(emailValue);
		}, 1200);
	};

	function validateRegex(value) {
		const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

		if (value === "") {
			setMessage("");
		} else if (!emailRegex.test(value)) {
			setMessage("Неверный адрес электронной почты");
		} else {
			setMessage("");
			return true;
		}
	}

	const handleSumbit = async (e) => {
		e.preventDefault();
		const validate = validateRegex(email);

		if (validate) {
			try {
				navigate("send", { state: { email } });
			} catch (error) {
				console.error(error);
			}
		} else {
			setMessage("Неверный адрес электронной почты");
		}
	};

	return (
		<div className={styles.passwordReset}>
			<h1 className={styles.passwordReset__title}>Сброс пароля</h1>
			<form className={styles.form} onSubmit={handleSumbit}>
				<div className={styles.field}>
					<label htmlFor="email">
						<p className={styles.field__text}>Email</p>
						<Input required id="email" name="email" type="email" value={email} onChange={handleChange} />
					</label>
				</div>
				{!message ? <></> : <MSG iconColor={'brown'} isSuccess={false} message={message}/>}
				<div className={styles.links}>
					<Button type="submit" title={"Получить ссылку"} />
					<div className={styles.links__login}>
						<p>Вспомнили пароль?</p>
						<Link to="/auth/login">Войдите</Link>
					</div>
				</div>
			</form>
		</div>
	);
};

export default PasswordReset;
