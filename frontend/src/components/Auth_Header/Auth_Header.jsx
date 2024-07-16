import React from 'react';
import styles from './Auth_Header.module.css';

const Header = () => (
    <div className={styles.header}>
        <img src="/Partyshaker.png" alt="Partyshaker_header" className={styles.headerImg} />
    </div>
);

export default Header;