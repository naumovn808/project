import React from "react";
import { Outlet } from "react-router-dom";
import styles from './Main.module.css'
import Auth_Footer from "../../../components/Auth_Footer/Auth_Footer";
import Auth_Header from '../../../components/Auth_Header/Auth_Header'
import SocialButton from "../../../components/SocialButton/SocialButton";
import ProfileFrom from '../../ProfileForm/ProfileForm'

const Main = () => {
    return (
        <div className={styles.main_page}>
            <Auth_Header/>            
            <ProfileFrom />
            <Auth_Footer/>
        </div>


    )
}

export default Main;