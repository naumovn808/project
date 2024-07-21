import React from "react";
import styles from "./Auth_Footer.module.css";

const Auth_Footer = ({isAuthPage}) => {
	if (isAuthPage) {


	return (
		<footer className={styles.footer}>
			<div className={styles.round__mobile}>
				<img src="/footer_logo.png" alt="logo" className={styles.footer__logo__mobile} />
			</div>
			<div className={styles.information}>
				<div className={styles.round}>
					<img src="/footer_logo.png" alt="logo" className={styles.footer__logo} />
				</div>
				<div>
					<p className={styles.information__name}>Partyshaker</p>
					<a className={styles.information__link} href="mailto:info@partyshaker.ru">
						info@partyshaker.ru
					</a>
				</div>
			</div>
			<div>
				{/* LINK */}
				<a href="#" className={styles.privacy__policy}>
					Политика конфиденциальности
				</a>
				<div></div>
			</div>
		</footer>
	);
};
	return (
		<footer className={styles.footer}>
		<div className={styles.round__mobile_main}>
			<img src="/footer_logo.png" alt="logo" className={styles.footer__logo__mobile_main} />
		</div>
		<div className={styles.information_main}>
			<div className={styles.round}>
				<img src="/footer_logo.png" alt="logo" className={styles.footer__logo} />
			</div>
			<div className={styles.main_info}>
				<p className={styles.information__name}>Partyshaker</p>
				<a className={styles.information__link} href="mailto:info@partyshaker.ru">
					info@partyshaker.ru
				</a>
			</div>
			<div className={styles.footer_drinks}>
				<a href="#">Коктейли</a>
				<a href="#">Ингредиенты</a>
				<a href="#">Бар</a>
			</div>
			<div className={styles.footer_command}>
				<a href="#">Команда проекта</a>
				<a href="#">Политика конфиденциальности</a>
			</div>
			<div className={styles.footer_mobile_app}>
				<p>Скачайте мобильное приложение</p>
				<img src="/it_academy.png" alt="academy" />
			</div>
		</div>
	</footer>
	)
};
	
	

export default Auth_Footer;