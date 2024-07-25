import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Register.module.css";
import Input from "../../../components/Input/Input.jsx";
import Button from "../../../components/Button/Button.jsx";
import axios from "../../../utils/axios.js";
import MSG from '../../../components/popUpNotification/popUpNotification.jsx'

const Register = () => {
	const navigate = useNavigate();
	const [isUser, setIsUser] = useState(false);
	const [isPasswordVisible, setIsPasswordVisible] = useState(true);
	const [hidePassword, setHidePassword] = useState();
	const [message, setMessage] = useState("");

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
		setTimeout(() => {
			validateRegex(name, value);
		}, 1200);
	};

	const changeStateEye = (e) => {
		setIsPasswordVisible(e);
	};

	function validateRegex(name, value) {
		const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

		if (name === "email") {
			if (value === "") {
				setMessage("");
			} else if (!emailRegex.test(value)) {
				setMessage("Неверный адрес электронной почты");
			} else {
				setMessage("");
				return true
			}
		}

		if (name === "password") {
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
						return true
					}
				}
			}
		}
	}

	// function checkUser() {

	// }

	const handleSumbit = async (e) => {
		e.preventDefault();
		const email = formData.email;
		const validate = validateRegex("password", formData.password) && validateRegex("email", formData.email);

		//  find
		const findUser = false;

		if (validate) {
			if (!findUser) {
				try {
					// await axios.post("register", formData);
					navigate("send", { state: { email } });
				} catch (error) {
					console.error(error);
				}
			} else {
				setIsUser(true);
			}
		} else if (formData.email && formData.password === "") {
			setMessage("Введите данные");
		} else {
			setMessage("Неверный email или пароль");
		}
	};

	return (
		<div className={styles.register}>
			{/* <Title className={styles.register__title}>Регистрация</Title> */}
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
							onChange={handleChange}
						/>
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
							defaultEye={false}
							showPassword={changeStateEye}
							value={formData.password}
							onChange={handleChange}
						/>
						<p className={styles.field__text__password}>Не менее 8 символов</p>
					</label>
					{!message ? <></> : <MSG iconColor={'brown'} isSuccess={false} message={message}/>}
				</div>

				<div className={styles.links}>
					{isUser ? (
						<div>
							<p className={styles.reset__password}>Такой аккаунт уже есть.</p>
							<Link to="/auth/reset/newpassword">Сбросьте пароль</Link>
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
	);
};

export default Register;
