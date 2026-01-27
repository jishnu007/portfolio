import React from "react";
import ContactForm from "./ContactForm";
import Footer from "./Footer";
import Styles from "../styles/contactme.module.scss";
import StylesFooter from "../styles/Footer.module.scss";
import { FaMapMarkerAlt } from "react-icons/fa";

function ContactMe() {
  return (
    <div className={Styles.contactMeInner}>
      <h3>Get in Touch</h3>
      <div className={Styles.contactMeInnerLeft}>
        {/* <a className={Styles.contactMeInnerAddress}>
          <div
            className={`${StylesFooter.footer__iconWrapper} ${StylesFooter.footer__facebook}`}
          >
            <span className="icon-facebook">
              <FaMapMarkerAlt />
            </span>
          </div>
          Thalassery, Kerala
        </a>

        <a className={Styles.contactMeInnerPhone}>
          <div
            className={`${StylesFooter.footer__iconWrapper} ${StylesFooter.footer__facebook}`}
          >
            <span className="icon-facebook">
              <FaMapMarkerAlt />
            </span>
          </div>
          7012532364
        </a>

        <a className={Styles.contactMeInnerEmail}>
          <div
            className={`${StylesFooter.footer__iconWrapper} ${StylesFooter.footer__facebook}`}
          >
            <span className="icon-facebook">
              <FaMapMarkerAlt />
            </span>
          </div>
          jishnupavithran007@gmail.com
        </a> */}
      </div>
      <div className={Styles.contactMeInnerRight}>
        <ContactForm />
      </div>
      <Footer />
    </div>
  );
}

export default ContactMe;
