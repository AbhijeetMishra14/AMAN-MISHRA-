import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">Quick Links</h3>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/portfolio">Portfolio</Link></li>
              <li><Link to="/case-study">Case Studies</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Services</h3>
            <ul className="footer-links">
              <li><Link to="/service/wordpress-development">WordPress Development</Link></li>
              <li><Link to="/service/seo-service-nepal">SEO Service in Nepal</Link></li>
              <li><Link to="/service/answer-engine-optimization-aeo">Answer Engine Optimization (AEO)</Link></li>
              <li><Link to="/service/ui-ux-design">UI/UX Design</Link></li>
              <li><Link to="/service/web-development-service">Website Development</Link></li>
              <li><Link to="/service/mobile-app-development">Mobile App Development</Link></li>
              <li><Link to="/service/digital-marketing">Digital Marketing</Link></li>
              <li><Link to="/service/promotional-video">Promotional Video</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Socials</h3>
            <ul className="footer-social">
              <li><a href="#" target="_blank" rel="noopener noreferrer">Facebook</a></li>
              <li><a href="#" target="_blank" rel="noopener noreferrer">Instagram</a></li>
              <li><a href="#" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
              <li><a href="#" target="_blank" rel="noopener noreferrer">TikTok</a></li>
              <li><a href="#" target="_blank" rel="noopener noreferrer">Dribbble</a></li>
              <li><a href="#" target="_blank" rel="noopener noreferrer">Behance</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Locations</h3>
            <div className="footer-location">
              <h4>Nepal</h4>
              <p>Pulchowk, Lalitpur</p>
              <p>01-5430240</p>
              <p>9841969727</p>
              <p>info@makuracreations.com</p>
            </div>
            <div className="footer-location">
              <h4>USA</h4>
              <p>9412 redstart ln fort worth TX 76118</p>
              <p>+1 972 505 2458</p>
              <p>9849772853</p>
              <p>info@makuracreations.com</p>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2025 Makura Creations Pvt. Ltd. All rights reserved.</p>
          <p>Registered under the Government of Nepal (Regd. No: 115274/070/071) | VAT No: 604162573</p>
          <p className="footer-since">proudly SINCE 2013</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
