import React from "react";
import { FaFacebookF, FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";
import Styles from "../styles/Footer.module.scss";
function Footer() {
  return (
    <div className={Styles.footer}>
      <a
        id="social-icon"
        href="#"
        className={[Styles.footer__iconWrapper, Styles.footer__facebook].join(
          " "
        )}
      >
        <span className="icon-facebook">
          <FaFacebookF />
        </span>
      </a>

      <a
        id="social-icon"
        href="#"
        className={[Styles.footer__iconWrapper, Styles.footer__instagram].join(
          " "
        )}
      >
        <span className="icon-instagram2">
          <FaInstagram />
        </span>
      </a>
      <a
        id="social-icon"
        href="#"
        className={[Styles.footer__iconWrapper, Styles.footer__linkedin].join(
          " "
        )}
      >
        <span className="icon-linkedin2">
          <FaLinkedin />
        </span>
      </a>
      <a
        id="social-icon"
        href="#"
        className={[Styles.footer__iconWrapper, Styles.footer__github].join(
          " "
        )}
      >
        <span className="icon-vimeo">
          <FaGithub />
        </span>
      </a>
    </div>
  );
}

export default Footer;
