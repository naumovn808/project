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

	useEffect(() => {
		setHidePassword(isPasswordVisible ? "text" : "password");
	}, [isPasswordVisible]);

	const changeStateEye = (e) => {
		setIsPasswordVisible(e);
	};

	const handleChange = (e) => {
		const passwordValue = e.target.value;
		setPassword(passwordValue);
	};

	const handleSumbit = async (e) => {
		e.preventDefault();

		const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
		const validateRegex = passwordRegex.test(password);

		if (validateRegex) {
			try {
				// axios
				navigate("auth/login");
			} catch (error) {
				console.error(error);
			}
		} else {
			console.log(
				"Пароль должен содержать не менее 8 символов и включать в себя хотя бы одну букву и одну цифру."
			);
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
				<Button type="submit" title={"Сохранить и войти"} />
			</form>
		</div>
	);
};

export default NewPassword;
