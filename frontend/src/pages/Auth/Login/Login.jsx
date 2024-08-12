import React, { useEffect, useState } from 'react'
import styles from './Login.module.css'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../../../components/Input/Input.jsx'
import Button from '../../../components/Button/Button.jsx'
import MSG from '../../../components/popUpNotification/popUpNotification.jsx'
import axios from 'axios'
const Login = () => {
	const navigate = useNavigate()
	const [error, setError] = useState(false)
	const [isPasswordVisible, setIsPasswordVisible] = useState(true)
	const [hidePassword, setHidePassword] = useState()
	const [message, setMessage] = useState('')

	const [formData, setFormData] = useState({
		email: '',
		password: '',
	})

	useEffect(() => {
		setHidePassword(isPasswordVisible ? 'text' : 'password')
	}, [isPasswordVisible])

	const handleChange = e => {
		const { name, value } = e.target
		setFormData({ ...formData, [name]: value })
		setTimeout(() => {
			validateRegex(name, value)
		}, 1200)
	}

	const changeStateEye = e => {
		setIsPasswordVisible(e)
	}

	function validateRegex(name, value) {
		const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

		if (name === 'email') {
			if (value === '') {
				setMessage('')
			} else if (!emailRegex.test(value)) {
				setMessage('Неверный адрес электронной почты')
			} else {
				setMessage('')
				return true
			}
		}

		if (name === 'password') {
			if (value === '') {
				setMessage('')
			} else if (!/^.{8,}$/.test(value)) {
				setMessage('Пароль должен содержать не менее 8 символов')
			} else {
				if (!/^[A-Za-z0-9]+$/.test(value)) {
					setMessage('Пароль должен содержать латинские буквы и цифры')
				} else {
					if (/^\d+$/.test(value)) {
						setMessage('Пароль должен содержать хотя бы одну букву')
					} else if (/^[A-Za-z]+$/.test(value)) {
						setMessage('Пароль должен содержать хотя бы одну цифру')
					} else {
						setMessage('')
						return true
					}
				}
			}
		}
	}

	const handleSumbit = async e => {
		e.preventDefault()
		const validate =
			validateRegex('password', formData.password) &&
			validateRegex('email', formData.email)

		if (validate) {
			try {
				await axios.post('http://localhost:1000/auth/login', formData)
				navigate('/')
			} catch (error) {
				setError(true)
				console.error(error)
			}
		} else if (formData.email && formData.password === '') {
			setMessage('Введите данные')
		} else {
			setMessage('Неверный email или пароль')
		}
	}

	return (
		<div className={styles.login}>
			<h1 className={styles.login__title}>...или по-старинке</h1>
			<form className={styles.form} onSubmit={handleSumbit}>
				<div className={styles.field}>
					<label htmlFor='email'>
						<p className={styles.field__text}>Email</p>
						<Input
							required
							id='email'
							name='email'
							type='email'
							value={formData.email}
							onChange={handleChange}
						/>
					</label>
				</div>

				<div className={styles.field}>
					<label htmlFor='password'>
						<p className={styles.field__text}>Пароль</p>
						<Input
							required
							id='password'
							name='password'
							type={hidePassword}
							isEyeVisible={true}
							defaultEye={false}
							showPassword={changeStateEye}
							value={formData.password}
							onChange={handleChange}
						/>
						<div className={styles.forgot}>
							<Link to={'/auth/reset'}>Забыли пароль?</Link>
						</div>
					</label>
				</div>
				{!message ? (
					<></>
				) : (
					<MSG iconColor={'brown'} isSuccess={false} message={message} />
				)}
				<div className={styles.links}>
					{error ? (
						<div className={styles.reset__password}>
							<p>Неправильный email или пароль</p>
						</div>
					) : (
						<></>
					)}

					<Button type='submit' title={'Войти'} />
					<div className={styles.links__login}>
						<p>Нет аккаунта?</p>
						<Link to='/auth/register'>Зарегистрируйтесь</Link>
					</div>
				</div>
			</form>
		</div>
	)
}

export default Login
