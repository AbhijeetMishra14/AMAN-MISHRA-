import { useState } from 'react';
import { Link } from 'react-router-dom';
import AmanLogo from '../../assets/AMAN.png';
import StartProjectModal from '../StartProjectModal';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const [isCompanyOpen, setIsCompanyOpen] = useState(false);
  const [isWebDevOpen, setIsWebDevOpen] = useState(false);
  const [isDigitalMarketingOpen, setIsDigitalMarketingOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsServicesOpen(false);
    setIsResourcesOpen(false);
    setIsCompanyOpen(false);
  };

  return (
    <header className="header">
      <StartProjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            <div className="logo-icon">
              <img src={AmanLogo} alt="Aman Mishra" className="logo-image" />
            </div>
            <div className="logo-text-container">
              <span className="logo-text-main">AMAN</span>
              <span className="logo-text-main2">MISHRA</span>
            </div>
          </Link>

          <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
            <Link to="/" className="nav-link" onClick={closeMenu}>Home</Link>
            
            <div 
              className="nav-dropdown"
              onMouseEnter={() => setIsCompanyOpen(true)}
              onMouseLeave={() => setIsCompanyOpen(false)}
            >
              <span className="nav-link">
                About
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              <div className={`dropdown-menu ${isCompanyOpen ? 'show' : ''}`}>
                <Link to="/about" className="dropdown-item" onClick={closeMenu}>About Me</Link>
                <Link to="/contact" className="dropdown-item" onClick={closeMenu}>Contact</Link>
                <Link to="/career" className="dropdown-item" onClick={closeMenu}>Career</Link>
              </div>
            </div>

            <div 
              className="nav-dropdown"
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}
            >
              <span className="nav-link">
                Services
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              <div className={`dropdown-menu ${isServicesOpen ? 'show' : ''}`}>
                {/* Web Development */}
                <div 
                  className="dropdown-submenu"
                  onMouseEnter={() => setIsWebDevOpen(true)}
                  onMouseLeave={() => setIsWebDevOpen(false)}
                >
                  <span className="dropdown-item dropdown-submenu-trigger">
                    Web Development
                    <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 1L5 5L1 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  <div className={`dropdown-submenu-menu ${isWebDevOpen ? 'show' : ''}`}>
                    <Link to="/service/wordpress-development" className="dropdown-item" onClick={closeMenu}>WordPress Development</Link>
                  </div>
                </div>

                {/* Digital Marketing */}
                <div 
                  className="dropdown-submenu"
                  onMouseEnter={() => setIsDigitalMarketingOpen(true)}
                  onMouseLeave={() => setIsDigitalMarketingOpen(false)}
                >
                  <span className="dropdown-item dropdown-submenu-trigger">
                    Digital Marketing
                    <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 1L5 5L1 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  <div className={`dropdown-submenu-menu ${isDigitalMarketingOpen ? 'show' : ''}`}>
                    <Link to="/service/seo-service-nepal" className="dropdown-item" onClick={closeMenu}>Search Engine Optimization (SEO)</Link>
                    <Link to="/service/promotional-video" className="dropdown-item" onClick={closeMenu}>Promotional Video</Link>
                  </div>
                </div>

                {/* Individual Services */}
                <Link to="/service/ui-ux-design" className="dropdown-item" onClick={closeMenu}>UI/UX Design</Link>
              </div>
            </div>

            <div 
              className="nav-dropdown"
              onMouseEnter={() => setIsResourcesOpen(true)}
              onMouseLeave={() => setIsResourcesOpen(false)}
            >
              <span className="nav-link">
                Resources
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              <div className={`dropdown-menu ${isResourcesOpen ? 'show' : ''}`}>
                <Link to="/pricing" className="dropdown-item" onClick={closeMenu}>Pricing</Link>
              </div>
            </div>

            <Link to="/blogs" className="nav-link" onClick={closeMenu}>Blog</Link>
          </nav>

          <button 
            className="btn btn-nav"
            onClick={() => {
              setIsModalOpen(true);
              closeMenu();
            }}
          >
            Start your project →
          </button>

          <button 
            className="mobile-menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
