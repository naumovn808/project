import React from 'react'
import styles from './LoginClick.module.css'
import Sbutton from '../../../components/SocialButton/SocialButton'

const LoginClick = ({onclick}) => {
  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:1000/auth/login/oauth/google';
  };
  const handleVKLogin = () => {
    window.location.href = 'https://e451-92-253-199-248.ngrok-free.app/auth/login/oauth/vk';
  };
  const handleYandexLogin = () => {
    window.location.href = 'http://localhost:1000/auth/login/oauth/yandex';
  };
  const handleOkLogin = () => {
    window.location.href = 'http://localhost:1000/auth/odnoklassniki';
  };
  const handleMailruLogin = () => {
    window.location.href = 'http://localhost:1000/auth/login/oauth/mailru';
  };

  return (
    <div className={styles.login}>
        <h1 className={styles.login__title}>Вход по клику</h1>
        <div className={styles.buttons}>
            <Sbutton onclick={handleVKLogin} iconSrc={'/VK.png'} text={'ВКонтакте'}/>
            <Sbutton onclick={handleMailruLogin} iconSrc={'/MailRu.png'} text={'Mail.ru'}/>
            <Sbutton onclick={handleYandexLogin}  iconSrc={'/Yandex.png'} text={'Яндекс'}/>
            <Sbutton onclick={handleGoogleLogin} iconSrc={'/Google.png'} text={'Google'}/>
            <Sbutton onclick={handleOkLogin} iconSrc={'/OK.png'} text={'Одноклассники'}/>
        </div>
    </div>
  )
}

export default LoginClick