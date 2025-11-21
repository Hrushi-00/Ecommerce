import React from "react";
import "./ContactPage.css";

function ContactPage() {
  return (
    <div className="contact-wrapper">

      {/* LEFT SIDE CONTENT */}
      <div className="contact-left">
        <span className="contact-info-title">Information</span>
        <h2 className="contact-heading">Contact Us</h2>
        <p className="contact-desc">
         lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>

        <div className="contact-block">
          <h3>India</h3>
          <p>Underground</p>
          <p>987654323</p>
        </div>

        {/* <div className="contact-block">
          <h3>France</h3>
          <p>109 Avenue Léon, 63 Clermont-Ferrand</p>
          <p>+12 345-423-9893</p>
        </div> */}
      </div>

      {/* RIGHT SIDE FORM */}
      <div className="contact-right">
        <form className="contact-form">
          <div className="contact-row">
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email" />
          </div>

          <textarea placeholder="Message"></textarea>

          <button type="submit" className="contact-btn">
            Send Message
          </button>
        </form>
      </div>

    </div>
  );
}

export default ContactPage;
