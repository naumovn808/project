import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Register.module.css";
import Input from "../../../components/Input/Input.jsx";
import Button from "../../../components/Button/Button.jsx";
import Auth_Footer from "../../../components/Auth_Footer/Auth_Footer.jsx";

const Register = () => {
	const navigate = useNavigate();
	const [lengthPassword, setLengthPassword] = useState(false);
	const [isUser, setIsUser] = useState(false);
	const [isPasswordVisible, setIsPasswordVisible] = useState(true);
	const [hidePassword, setHidePassword] = useState();

	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	useEffect(() => {
		setHidePassword(isPasswordVisible ? "text" : "password");
	}, [isPasswordVisible]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const changeStateEye = (e) => {
		setIsPasswordVisible(e);
	};

	function checkPasswordLenght(password) {
		password.length < 8 ? setLengthPassword(true) : setLengthPassword(false);
	}

	// function checkUser() {

	// }

	const handleSumbit = (e) => {
		e.preventDefault();
		console.log(formData);
		if (isUser && lengthPassword){
			// axios
		}
		checkPasswordLenght(formData.password);
	};

	return (
		<>
		<div className={styles.register}>
			<h1 className={styles.register__title}>Регистрация</h1>
			<form className={styles.form} onSubmit={handleSumbit}>
				<div className={styles.field}>
					<label htmlFor="email">
						<p className={styles.field__text}>Email</p>
						<Input
							required
							id="email"
							name="email"
							type="email"
							value={formData.email}
							onChange={handleChange} />
					</label>
				</div>

				<div className={styles.field}>
					<label htmlFor="password">
						<p className={styles.field__text}>Пароль</p>
						<Input
							required
							id="password"
							name="password"
							type={hidePassword}
							isEyeVisible={true}
							defaultEye={true}
							showPassword={changeStateEye}
							value={formData.password}
							onChange={handleChange} />
						<p className={styles.field__text__password}>Не менее 8 символов</p>
					</label>
					{lengthPassword ? (
						<div className={styles.reset__password}>Пароль должен содержать не менее 8 символов</div>
					) : (
						<></>
					)}
				</div>

				<div className={styles.links}>
					{isUser ? (
						<div>
							<p className={styles.reset__password}>Такой аккаунт уже есть.</p>
							<Link to="*">Сбросьте пароль</Link>
						</div>
					) : (
						<></>
					)}

					<Button type="submit" title={"Зарегистрироваться"} />
					<div className={styles.links__login}>
						<p>Уже есть аккаунт ?</p>
						<Link to="/auth/login">Войдите</Link>
					</div>
				</div>
			</form>
		</div>
		</>
	);
};

export default Register;
