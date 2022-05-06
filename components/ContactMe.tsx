import React from "react";
import ContactForm from "./ContactForm";
import Footer from "./Footer";
import Styles from "../styles/contactme.module.scss";
function ContactMe() {
  return (
    <div className={Styles.contactMeInner}>
      <h3 data-aos="fade-up">Get in Touch</h3>
      <div className="contect-me__left">
        {/* <div className="contact-me__phone-sec">
          <h3>Phone</h3>
          <p>7012532364</p>
        </div>
        <div className="contact-me__address-sec">
          <h3>Address</h3>
          <p>7012532364</p>
        </div>
        <div className="contact-me__social-sec">
          <h3>Email</h3>
          <p>jishnupavithran007@gmail.com</p>
        </div> */}
      </div>
      <div className="contect-me__right ">
        <ContactForm />
      </div>
      <Footer />
    </div>
  );
}

export default ContactMe;
