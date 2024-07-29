import React from 'react'
import styles from './LoginClick.module.css'
import Sbutton from '../../../components/SocialButton/SocialButton'

const LoginClick = () => {
	return (
		<div className={styles.login}>
			<h1 className={styles.login__title}>Вход по клику</h1>
			<div className={styles.buttons}>
				<Sbutton iconSrc={'/VK.png'} text={'ВКонтакте'} />
				<Sbutton iconSrc={'/MailRu.png'} text={'Mail.ru'} />
				<Sbutton iconSrc={'/Yandex.png'} text={'Яндекс'} />
				<Sbutton iconSrc={'/Google.png'} text={'Google'} />
				<Sbutton iconSrc={'/OK.png'} text={'Одноклассники'} />
			</div>
		</div>
	)
}

export default LoginClick
