import React from "react";
import styles from "./Auth_Footer.module.css";
import SocialButton from "../SocialButton/SocialButton"
import { Dices, GlassWater, Martini } from "lucide-react";
const Auth_Footer = ({isAuthPage}) => {
		const renderMobileDownloadButtons = () => (
			<div className={styles.mobile_download_buttons}>
			  <p>Скачайте мобильное приложение</p>
			  <div className={styles.buttons_container}>
				<SocialButton 
				  iconSrc="/Apple.png"
				  text="App Store"
				  borderRadius="8px"
				  padding="8px 12px"
				/>
				<SocialButton 
				  iconSrc="/GooglePlay.png"
				  text="Google Play"
				  borderRadius='8px'
				  padding="8px 12px"
				/>
			  </div>
			</div>
		  );
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
			{renderMobileDownloadButtons()}
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
		{renderMobileDownloadButtons()}
		<nav className={styles.nav}>
				<a href="#" className={styles.navItemLine}>
					<Martini className={`${styles.navIcon} ${styles.activeNavItem}`}/>
					<span className={styles.navText}>Коктейли</span>
				</a>
				<a href="#" className={styles.navItem}>
					<GlassWater className={`${styles.navIcon} ${styles.yellowIcon}` }/>
				</a>
				<a href="#" className={styles.navItem}>
					<Dices className={`${styles.navIcon} ${styles.yellowIcon}`}/>
				</a>
				<a href="#" className={styles.navItem}>
					<img src="profile-icon.png" alt="profile" className={styles.profileImage} />
				</a>
			</nav>
	</footer>
	);
};
	
	

export default Auth_Footer;
