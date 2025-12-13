import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const [isCompanyOpen, setIsCompanyOpen] = useState(false);

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            <span className="logo-text">Makura Creations</span>
          </Link>

          <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
            <Link to="/" className="nav-link">Home</Link>
            
            <div 
              className="nav-dropdown"
              onMouseEnter={() => setIsCompanyOpen(true)}
              onMouseLeave={() => setIsCompanyOpen(false)}
            >
              <span className="nav-link">Company</span>
              <div className={`dropdown-menu ${isCompanyOpen ? 'show' : ''}`}>
                <Link to="/about" className="dropdown-item">About Us</Link>
                <Link to="/contact" className="dropdown-item">Contact</Link>
                <Link to="/career" className="dropdown-item">Career</Link>
              </div>
            </div>

            <div 
              className="nav-dropdown"
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}
            >
              <span className="nav-link">Services</span>
              <div className={`dropdown-menu ${isServicesOpen ? 'show' : ''}`}>
                <Link to="/service/web-development-service" className="dropdown-item">Web Development</Link>
                <Link to="/service/wordpress-development" className="dropdown-item">WordPress Development</Link>
                <Link to="/service/digital-marketing" className="dropdown-item">Digital Marketing</Link>
                <Link to="/service/seo-service-nepal" className="dropdown-item">Search Engine Optimization (SEO)</Link>
                <Link to="/service/answer-engine-optimization-aeo" className="dropdown-item">Answer Engine Optimization (AEO)</Link>
                <Link to="/service/promotional-video" className="dropdown-item">Promotional Video</Link>
                <Link to="/service/ui-ux-design" className="dropdown-item">UI/UX Design</Link>
                <Link to="/service/mobile-app-development" className="dropdown-item">Mobile App Development</Link>
                <Link to="/service/ai-workflow-automation" className="dropdown-item">AI Workflows Automation</Link>
              </div>
            </div>

            <div 
              className="nav-dropdown"
              onMouseEnter={() => setIsResourcesOpen(true)}
              onMouseLeave={() => setIsResourcesOpen(false)}
            >
              <span className="nav-link">Resources</span>
              <div className={`dropdown-menu ${isResourcesOpen ? 'show' : ''}`}>
                <Link to="/portfolio" className="dropdown-item">Portfolio</Link>
                <Link to="/case-study" className="dropdown-item">Case Study</Link>
                <Link to="/free-resources" className="dropdown-item">Free Resources</Link>
              </div>
            </div>

            <Link to="/blogs" className="nav-link">Blog</Link>
            <Link to="/free-seo-audit" className="nav-link">Free SEO Audit</Link>
          </nav>

          <Link to="/contact" className="btn btn-primary">
            Start your project
          </Link>

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
