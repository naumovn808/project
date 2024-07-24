import React, { useEffect, useState } from "react";
import cn from "classnames";
import styles from "./Input.module.css";

const Input = ({ className, containerClassName, showPassword, defaultEye, isEyeVisible = false, ...props }) => {
	const [eye, setEye] = useState("/eye.png");
	const [isEye, setIsEye] = useState(defaultEye);

	useEffect(() => {
		defaultEye === false && showPassword(isEye);
		setEye(!isEye ? "/eyeHide.png" : "/eye.png");
	}, [isEye]);

	const handleChange = () => {
		setIsEye(!isEye);
		showPassword(!isEye);
		setEye(isEye ? "/eyeHide.png" : "/eye.png");
	};

	return (
		<div className={cn(styles.container, containerClassName)}>
			<input className={cn(styles.input, className)} {...props} />
			{isEyeVisible ? (
				<div onClick={handleChange}>
					<img src={eye} alt="eye" className={cn(styles.eye, { [styles.eye__hide]: isEye === true })} />
				</div>
			) : undefined}
		</div>
	);
};

export default Input;
