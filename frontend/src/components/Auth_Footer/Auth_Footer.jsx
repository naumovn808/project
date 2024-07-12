import React from 'react';
import styles from './Auth_Footer.module.css';

const Footer = () => (
    <div className={styles.footer}>
        <div className={styles.footerLeft}>
            <div className={styles.round}>
                <img src="/footer_logo.png" alt="PartyShaker Logo" className={styles.footerLogo} />
            </div>
            <div className={styles.container}>
            <div className={styles.footerInfo}>
                <p className={styles.footer_p}>Partyshaker</p>
                <p><a href="mailto:info@partyshaker.ru">info@partyshaker.ru</a></p>            
                </div>            
                </div>
                </div>
        <div className={styles.footerRight}>
            <a href="#">Политика конфиденциальности</a>
            </div>
    </div>
);

export default Footer;