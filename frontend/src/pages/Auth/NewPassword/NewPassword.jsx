import React, { useEffect, useState } from "react";
import styles from "./NewPassword.module.css";
import Button from "../../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import Input from "../../../components/Input/Input";

const NewPassword = () => {
	const navigate = useNavigate();
	const [password, setPassword] = useState("");
	const [isPasswordVisible, setIsPasswordVisible] = useState(true);
	const [hidePassword, setHidePassword] = useState();
	const [message, setMessage] = useState("");

	useEffect(() => {
		setHidePassword(isPasswordVisible ? "text" : "password");
	}, [isPasswordVisible]);

	const changeStateEye = (e) => {
		setIsPasswordVisible(e);
	};

	const handleChange = (e) => {
		const passwordValue = e.target.value;
		setPassword(passwordValue);
		setTimeout(() => {
			validateRegex(passwordValue);
		}, 1200);
	};

	function validateRegex(value) {
		if (value === "") {
			setMessage("");
		} else if (!/^.{8,}$/.test(value)) {
			setMessage("Пароль должен содержать не менее 8 символов");
		} else {
			if (!/^[A-Za-z0-9]+$/.test(value)) {
				setMessage("Пароль должен содержать латинские буквы и цифры");
			} else {
				if (/^\d+$/.test(value)) {
					setMessage("Пароль должен содержать хотя бы одну букву");
				} else if (/^[A-Za-z]+$/.test(value)) {
					setMessage("Пароль должен содержать хотя бы одну цифру");
				} else {
					setMessage("");
					return true;
				}
			}
		}
	}

	const handleSumbit = async (e) => {
		e.preventDefault();
		const validate = validateRegex(password);

		if (validate) {
			try {
				// axios
				navigate("/auth/login");
			} catch (error) {
				console.error(error);
			}
		} else {
			setMessage("Невалидный пароль");
		}
	};

	return (
		<div className={styles.newPassword}>
			<h1 className={styles.newPassword__title}>Новый пароль</h1>
			<form className={styles.form} onSubmit={handleSumbit}>
				<div className={styles.field}>
					<label htmlFor="password">
						<Input
							required
							id="password"
							name="password"
							type={hidePassword}
							isEyeVisible={true}
							defaultEye={false}
							showPassword={changeStateEye}
							value={password}
							onChange={handleChange}
						/>
						<p className={styles.field__text__password}>Не менее 8 символов</p>
					</label>
				</div>
				{message}
				<Button type="submit" title={"Сохранить и войти"} />
			</form>
		</div>
	);
};

export default NewPassword;
