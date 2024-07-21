import React, { useState } from "react";
import styles from "./PasswordReset.module.css";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../../components/Button/Button";
import Input from "../../../components/Input/Input.jsx";

const PasswordReset = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");

	const handleChange = (e) => {
		const emailValue = e.target.value;
		setEmail(emailValue);
	};

	const handleSumbit = async (e) => {
		e.preventDefault();

		const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
		const validateRegex = emailRegex.test(email);

		if (validateRegex) {
			try {
				navigate("send", { state: { email } });
			} catch (error) {
				console.error(error);
			}
		} else {
			console.error("error");
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
