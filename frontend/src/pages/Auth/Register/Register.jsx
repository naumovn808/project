import React from "react";
import styles from "./Register.module.css";
import Input from '../../../components/Input/Input.jsx'
import Button from '../../../components/Button/Button.jsx'

const Register = () => {
	return (
		<div className={styles.container}>
			<h1>Регистрация</h1>
			<Input placeholder={'REG'} className={'test'}/>
			<Button title={'REG'}/>
		</div>
	);
};

export default Register;
