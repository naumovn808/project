import React from 'react'
import styles from './SocialButton.module.css'

const SocialButton = ({
	iconSrc,
	text,
	backgroundColor,
	textColor,
	borderRadius,
	padding,
	onclick,
}) => {
	const buttonStyle = {
		backgroundColor: backgroundColor || '#595975',
		color: textColor || '#ffffff',
		borderRadius: borderRadius || '12px',
		padding: padding || '10px 15px',
	}

	return (
		<button
			onClick={onclick}
			className={styles.socialButton}
			style={buttonStyle}>
			<img src={iconSrc} alt={`${text} icon`} className={styles.icon} />
			<span className={styles.buttonText}>{text}</span>
		</button>
	)
}

export default SocialButton
