"use client";
import React from "react";
import { FaFacebookF, FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";
import Styles from "../styles/Footer.module.scss";

function Footer() {
  return (
    <div className={Styles.footer}>
      <a
        id="social-icon"
        target="_blank"
        rel="noreferrer"
        href="https://www.facebook.com/jishnu.pavithran.3"
        className={`${Styles.footer__iconWrapper} ${Styles.footer__facebook}`}
      >
        <span className="icon-facebook">
          <FaFacebookF />
        </span>
      </a>

      <a
        id="social-icon"
        href="https://www.instagram.com/jishnu__pavithran/"
        target="_blank"
        rel="noreferrer"
        className={`${Styles.footer__iconWrapper} ${Styles.footer__instagram}`}
      >
        <span className="icon-instagram2">
          <FaInstagram />
        </span>
      </a>

      <a
        id="social-icon"
        href="https://www.linkedin.com/in/jishnu-pavithran/"
        target="_blank"
        rel="noreferrer"
        className={`${Styles.footer__iconWrapper} ${Styles.footer__linkedin}`}
      >
        <span className="icon-linkedin2">
          <FaLinkedin />
        </span>
      </a>

      <a
        id="social-icon"
        href="https://github.com/jishnu007"
        target="_blank"
        rel="noreferrer"
        className={`${Styles.footer__iconWrapper} ${Styles.footer__github}`}
      >
        <span className="icon-vimeo">
          <FaGithub />
        </span>
      </a>
    </div>
  );
}

export default Footer;
