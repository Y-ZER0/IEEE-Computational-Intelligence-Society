import React from 'react';
import '../ComponentsStyling/Footer.css';
import { FaInstagram, FaLinkedinIn, FaFacebook, FaMapMarkerAlt, FaEnvelope, FaChevronRight } from 'react-icons/fa';

const Footer = ({ isDarkMode }) => {
  const handleNavLinkClick = (e, sectionId) => {
    e.preventDefault();
    
    const targetSection = document.getElementById(sectionId.substring(1));
    
    if (targetSection) {
      const headerHeight = document.querySelector('.main-header')?.offsetHeight || 100;
      
      const topOffset = targetSection.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      
      window.scrollTo({
        top: topOffset,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className={`footer ${isDarkMode ? 'footer-dark' : 'footer-light'}`}>
      <div className="footer-container">
        <div className="footer-section brand-section">
          <div className="logo-container">
            <img 
              src= {isDarkMode ? `${process.env.PUBLIC_URL}/images/IEEE-Logo-base.png` :  `${process.env.PUBLIC_URL}/images/IEEE-Logo-base-black.png`}
              alt="IEEE CIS UJ Logo" 
              className="footer-logo" 
            />
          </div>
          <div className="brand-content">
            <h3>IEEE CIS UJ</h3>
            <p>We are a student led club that belongs to the Institute of Electrical and Electronics Engineering (IEEE) Computer Intelligence Society which is a world-leading organization dedicated to computer Intelligence society and technology.</p>
          </div>
        </div>

        <div className="footer-section nav-section">
          <h4>Know More About Us</h4>
          <ul className="footer-nav">
            <li><a href="#about-us" onClick={(e) => handleNavLinkClick(e, '#about-us')}><FaChevronRight className="nav-icon" /> About Us</a></li>
            <li><a href="#mission-vision" onClick={(e) => handleNavLinkClick(e, '#mission-vision')}><FaChevronRight className="nav-icon" /> Mission & Vision</a></li>
            <li><a href="#goals" onClick={(e) => handleNavLinkClick(e, '#goals')}><FaChevronRight className="nav-icon" /> Our Goals</a></li>
            <li><a href="#team-in-numbers" onClick={(e) => handleNavLinkClick(e, '#team-in-numbers')}><FaChevronRight className="nav-icon" /> Us in Numbers</a></li>
          </ul>
        </div>

        <div className="footer-section discover-section">
          <h4>Discover More</h4>
          <ul className="footer-nav">
            <li><a href="#committees" onClick={(e) => handleNavLinkClick(e, '#committees')}><FaChevronRight className="nav-icon" /> Our Committees</a></li>
            <li><a href="#our-teams" onClick={(e) => handleNavLinkClick(e, '#our-teams')}><FaChevronRight className="nav-icon" /> Our Teams</a></li>
            <li><a href="#events-workshops" onClick={(e) => handleNavLinkClick(e, '#events-workshops')}><FaChevronRight className="nav-icon" /> Events</a></li>
            <li><a href="#blog" onClick={(e) => handleNavLinkClick(e, '#blog')}><FaChevronRight className="nav-icon" /> Blog</a></li>
          </ul>
        </div>

        <div className="footer-section contact-section">
          <h4>Get In Touch</h4>
          <div className="contact-info">
            <div className="contact-item">
              <FaMapMarkerAlt className="contact-icon" />
              <a href="https://maps.google.com/?q=IEEE+CIS+AI+JU" target="_blank" rel="noopener noreferrer">
                IEEE CIS, Jordan University
              </a>
            </div>
            <div className="contact-item">
              <FaEnvelope className="contact-icon" />
              <a href="mailto:contact@ieeecisaiju.org">Email</a>
            </div>
          </div>

          <div className="social-links">
            <a href="https://www.instagram.com/ieeecisuj?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <div className="social-icon instagram">
                <FaInstagram />
              </div>
            </a>
            <a href="https://www.linkedin.com/company/ieeecisju/posts/?feedView=all" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <div className="social-icon linkedin">
                <FaLinkedinIn />
              </div>
            </a>
            <a href="https://www.facebook.com/IEEE.CIS.JU" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <div className="social-icon facebook">
                <FaFacebook />
              </div>
            </a>
          </div>
        </div>
      </div>

      <div className="footer-divider"></div>

      <div className="footer-bottom">
        <div className="copyright">
          <p>Designed By IEEE CS © {new Date().getFullYear()} All Rights Reserved</p>
        </div>
        <div className="bottom-social-links">
          <a href="https://www.facebook.com/IEEE.CIS.JU" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <FaFacebook className="bottom-icon" />
          </a>
          <a href="https://www.instagram.com/ieeecisuj?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <FaInstagram className="bottom-icon" />
          </a>
          <a href="https://www.linkedin.com/company/ieeecisju/posts/?feedView=all" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <FaLinkedinIn className="bottom-icon" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;