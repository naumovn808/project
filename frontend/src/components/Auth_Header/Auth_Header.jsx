import React, { useEffect, useState } from 'react';
import styles from './Auth_Header.module.css';
import Input from '../Input/Input'
import { Search, GlassWater, Dices, Martini } from 'lucide-react'

const Header = ({isAuthPage}) => {
    const [placeholder, setPlaceholder] = useState("Коктейль / ингредиент");

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 320) {
                setPlaceholder("Коктейль / ингредиент")
            } else {
                setPlaceholder("Коктейль или ингредиент");
            }
        };

        handleResize();

        window.addEventListener('resize', handleResize)

        return () => window.removeEventListener('resize', handleResize);
    }, []);
    if (isAuthPage) {
        return (
    <div className={styles.header}>
        <img src="/Partyshaker.png" alt="Partyshaker_header" className={styles.headerImg} />
    </div>
    )};
    return (
        <header className={styles.header_main}>
        <div className={styles.logoContainer}> 
        <img src="/Partyshaker.png" alt="Partyshaker_header" className={styles.logo} />
        </div>
        <div className={styles.searchContainer}>
        <Search className={styles.searchIcon} size={18} />   
        <Input 
        className={styles.searchInput}
        placeholder={placeholder}
        type="search"
        />
        </div>
        <nav className={styles.nav}>
            <a href="#" className={`${styles.navItem} ${styles.active}`}>
                <Martini size={20}/>
                <span>Коктейли</span>
            </a>
            <a href="#" className={`${styles.navItem} ${styles.yellow}`}>
                <GlassWater size={20}/>
                <span>Ингредиенты</span>
            </a>
            <a href="#" className={`${styles.navItem} ${styles.yellow}`}>
                <Dices size={20}/>
                <span>Бар</span>
            </a>
        </nav>
        <div className={styles.profileIcon}>
            <img src="/profile-icon.png" alt="Profile" />
        </div>
 </header>
    )
};

export default Header;
