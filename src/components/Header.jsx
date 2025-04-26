import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../ComponentsStyling/Header.css';
import { FaSun, FaMoon, FaBars, FaTimes } from 'react-icons/fa';

const Logo = ({ isDarkMode }) => {
  const navigate = useNavigate();
  const handleLogoClick = (e) => {
    e.preventDefault(); 
    navigate('/');
    window.scrollTo(0, 0);
  };

  return (
    <div className="header-logo">
      <Link to="/" onClick={handleLogoClick}>
        <img
          src={isDarkMode ? `${process.env.PUBLIC_URL}/images/IEEE-Logo-base.png` : `${process.env.PUBLIC_URL}/images/IEEE-Logo-base-black.png`}
          alt="Logo"
          className="logo-image"
        />
      </Link>
    </div>
  );
};

const NavigationMenu = ({ isMobileMenuOpen, setIsMobileMenuOpen, onNavigation, currentPage }) => {
  const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleDropdownToggle = (e) => {
    e.preventDefault();
    setIsAboutDropdownOpen(!isAboutDropdownOpen);
  };

  const handleLinkClick = (sectionId) => (e) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    setIsAboutDropdownOpen(false);
    
    const isHomePage = location.pathname === '/';
    
    if (sectionId === '#') {
      if (isHomePage) {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      } else {
        navigate('/');
        window.scrollTo(0, 0);
      }
    } else if (sectionId.startsWith('#')) {
      if (isHomePage) {
        const element = document.getElementById(sectionId.substring(1));
        if (element) {
          const headerHeight = document.querySelector('.main-header')?.offsetHeight || 100;
          const topOffset = element.getBoundingClientRect().top + window.pageYOffset - headerHeight;
          
          window.scrollTo({
            top: topOffset,
            behavior: 'smooth'
          });
        }
      } else {
        navigate('/');
        setTimeout(() => {
          const element = document.getElementById(sectionId.substring(1));
          if (element) {
            const headerHeight = document.querySelector('.main-header')?.offsetHeight || 100;
            const topOffset = element.offsetTop - headerHeight;
            
            window.scrollTo({
              top: topOffset,
              behavior: 'smooth'
            });
          }
        }, 100);
      }
    } else {
      navigate(sectionId);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsAboutDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <nav className={`header-nav ${isMobileMenuOpen ? 'mobile-menu-open' : ''}`}>
      <ul className="horizontal-menu">
        <li><a href="#" onClick={handleLinkClick('#')}>Home</a></li>
        <li 
          className="dropdown-container" 
          ref={dropdownRef}
          onMouseEnter={() => setIsAboutDropdownOpen(true)}
          onMouseLeave={() => setIsAboutDropdownOpen(false)}
        >
          <a href="#about-us" onClick={handleLinkClick('#about-us')}>
            About Us {isAboutDropdownOpen ? '▲' : '▼'}
          </a>
          {isAboutDropdownOpen && (
            <ul className="dropdown-menu">
              <li><a href="#mission-vision" onClick={handleLinkClick('#mission-vision')}>Mission & Vision</a></li>
              <li><a href="#goals" onClick={handleLinkClick('#goals')}>Goals</a></li>
              <li><a href="#team-in-numbers" onClick={handleLinkClick('#team-in-numbers')}>Team in Numbers</a></li>
              <li><a href="#committees" onClick={handleLinkClick('#committees')}>Committees</a></li>
              <li><a href="#our-teams" onClick={handleLinkClick('#our-teams')}>Our Teams</a></li>
              <li><a href="#stars-of-month" onClick={handleLinkClick('#stars-of-month')}>Stars of the Month</a></li>
              <li><a href="#web-masters" onClick={handleLinkClick('#web-masters')}>Web Masters</a></li>
            </ul>
          )}
        </li>
        <li><a href="#events-workshops" onClick={handleLinkClick('#events-workshops')}>Events</a></li>
        <li><a href="#blog" onClick={handleLinkClick('#blog')}>Blog</a></li>
        <li><Link to="/faq" onClick={() => {
          setIsMobileMenuOpen(false);
          setIsAboutDropdownOpen(false);
        }}>FAQ</Link></li>
        <li><Link to="/all-events" onClick={() => {
          setIsMobileMenuOpen(false);
          setIsAboutDropdownOpen(false);
        }}>All Events</Link></li>
      </ul>
    </nav>
  );
};

const ThemeToggle = ({ onToggle, isDarkMode }) => {
  return (
    <div className="header-toggle">
      <div className="form-check form-switch mode-switch" data-bs-toggle="mode">
        <input
          type="checkbox"
          className="form-check-input"
          id="theme-mode"
          checked={isDarkMode}
          onChange={onToggle}
        />
        <label className="form-check-label d-none d-sm-block" htmlFor="theme-mode">
          {isDarkMode ? <FaMoon /> : <FaSun />}
        </label>
      </div>
    </div>
  );
};

const MobileMenuToggle = ({ isMobileMenuOpen, toggleMobileMenu }) => {
  return (
    <div className="mobile-menu-toggle">
      <button onClick={toggleMobileMenu}>
        {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
      </button>
    </div>
  );
};

const Header = ({ onToggleTheme, isDarkMode, onNavigation, currentPage = 'home' }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <header className="main-header">
      <Logo isDarkMode={isDarkMode} />
      {windowWidth <= 768 ? (
        <MobileMenuToggle 
          isMobileMenuOpen={isMobileMenuOpen} 
          toggleMobileMenu={toggleMobileMenu} 
        />
      ) : null}
      <NavigationMenu 
        isMobileMenuOpen={isMobileMenuOpen} 
        setIsMobileMenuOpen={setIsMobileMenuOpen} 
        onNavigation={onNavigation}
        currentPage={currentPage}
      />
      <ThemeToggle onToggle={onToggleTheme} isDarkMode={isDarkMode} />
    </header>
  );
};

export default Header;