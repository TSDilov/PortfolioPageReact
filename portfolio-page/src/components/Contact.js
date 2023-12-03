import React from 'react';
import './Contact.css'
import myImage from '../images/picture.jpg';

const Contact = () => {
  return (
    <div className="contact-container">
      <h2 className="contact-title">Contact Me</h2>
      <p className="contact-info">Email: Tsvetelin.dev91@gmail.com</p>
      <p className="contact-info">
        LinkedIn: <a href='https://www.linkedin.com/in/tsvetelin-dilov-95ba7a191/' className="contact-link">My LinkedIn</a>
        <br />
        Github: <a href='https://github.com/TSDilov' className="contact-link">My Github</a>
      </p>
      <div className="profile-image-container">
        <img
          src={myImage}
          alt="Tsvetelin Dilov"
          className="profile-image"
        />
      </div>
    </div>
  );
}

export default Contact;