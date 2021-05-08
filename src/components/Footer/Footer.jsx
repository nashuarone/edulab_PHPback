import React from "react";
import s from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={s.header}>
      <div className={s.header1}>
        <header>
          <img
            src="https://pngimage.net/wp-content/uploads/2018/06/flowers-logo-png-6.png"
            alt="default-logo"
          />
        </header>
        <div className={s.header2}>eduLab</div>
        <div className={s.footer}>2021</div>
      </div>
    </div>
  );
};

export default Footer;
