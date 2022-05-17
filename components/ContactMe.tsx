import React from "react";
import ContactForm from "./ContactForm";
import Footer from "./Footer";
import Styles from "../styles/contactme.module.scss";
function ContactMe() {
  return (
    <div className={Styles.contactMeInner}>
      <h3>Get in Touch</h3>
      {/* <div className="flex"> */}
      <div className="contect-me__left">
        {/* <div className="contact-me__phone-sec">
            <h4>Phone</h4>
            <p>7012532364</p>
          </div>
          <div className="contact-me__address-sec">
            <h4>Address</h4>
            <p>7012532364</p>
          </div>
          <div className="contact-me__social-sec">
            <h4>Email</h4>
            <p>jishnupavithran007@gmail.com</p>
          </div> */}
      </div>
      <div className="contect-me__right ">
        <ContactForm />
      </div>
      {/* </div> */}
      <Footer />
    </div>
  );
}

export default ContactMe;
