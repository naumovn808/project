import React, { useEffect, useState } from "react";
import styles from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../../components/Input/Input.jsx";
import Button from "../../../components/Button/Button.jsx";

const Login = () => {
	const navigate = useNavigate();
	const [error, setError] = useState(false)
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

	const handleSumbit = async (e) => {
		e.preventDefault();

		try {
            // await axios.post("login", formData);
            navigate("/");
        } catch (error) {
            setError(true)
            console.error(error);
        }
	};

	return (
		<div className={styles.login}>
			<h1 className={styles.login__title}>...или по-старинке</h1>
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
						<div className={styles.forgot}>
							<Link to={"/auth/reset"}>Забыли пароль?</Link>
						</div>
					</label>
				</div>

				<div className={styles.links}>
					{error ? (
						<div className={styles.reset__password}>
							<p>Неправильный email или пароль</p>
						</div>
					) : (
						<></>
					)}

					<Button type="submit" title={"Войти"} />
					<div className={styles.links__login}>
						<p>Нет аккаунта?</p>
						<Link to="/auth/register">Зарегистрируйтесь</Link>
					</div>
				</div>
			</form>
		</div>
	);
};

export default Login;
