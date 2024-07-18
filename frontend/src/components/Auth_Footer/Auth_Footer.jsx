import React from "react";
import styles from "./Auth_Footer.module.css";

const Auth_Footer = () => {
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

export default Auth_Footer;