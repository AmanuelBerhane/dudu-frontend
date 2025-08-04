import React from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import '../styles/components/Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Contact Info */}
          <div className="contact-info">
            <h3>Get In Touch</h3>
            <div className="contact-details">
              <div className="contact-item">
                <FaMapMarkerAlt className="contact-icon" />
                <div className="contact-text">
                  <p>1,Bole<br />Addis Ababa, Ethiopia</p>
                </div>
              </div>
              <div className="contact-item">
                <FaPhone className="contact-icon" />
                <div className="contact-text">
                  <p>+251 912 345 678</p>
                </div>
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="map-container">
            <div className="map-placeholder">
              <div>
                <FaMapMarkerAlt size={32} style={{ display: 'block', margin: '0 auto 10px', color: 'var(--primary-color)' }} />
                <p>Our Store Location<br />Map would be displayed here</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p className="copyright">
            &copy; {currentYear} Dudu's Clothing. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
