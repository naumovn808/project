import React from 'react';
import './Footer.css';

const Footer = () => (
    <>
  <div className="footer">
    <div className="footer-left">
      <img src="/footer_logo.png" alt="PartyShaker Logo" className="footer-logo" />
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
{/* Надо доделать стили */}
export default Footer;