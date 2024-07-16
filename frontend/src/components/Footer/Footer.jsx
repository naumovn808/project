import React from 'react';
import style from './Footer.module.css';

const Footer = () => (
  <>
    <div className={style["footer"]}>
      <div className={style["footer-left"]}>
        <img src="/footer_logo.png" alt="PartyShaker Logo" className={style["footer-logo"]} />
        <div>
          <p>Partyshaker</p>
          <p><a href="#">info@partyshaker.ru</a></p>
        </div>
      </div>
      <div className="footer-right">
        <a href="#">Политика конфиденциальности</a>
      </div>
    </div>
  </>
);

export default Footer;