import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
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
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Services</h3>
            <ul className="footer-links">
              <li><Link to="/service/wordpress-development">WordPress Development</Link></li>
              <li><Link to="/service/seo-service-nepal">SEO Service in Nepal</Link></li>
              <li><Link to="/service/ui-ux-design">UI/UX Design</Link></li>
              <li><Link to="/service/digital-marketing">Digital Marketing</Link></li>
              <li><Link to="/service/promotional-video">Promotional Video</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Socials</h3>
            <ul className="footer-social">
              <li><a href="https://www.facebook.com/aman.mishra.661419" target="_blank" rel="noopener noreferrer"><FaFacebook size={20} /> Facebook</a></li>
              <li><a href="https://www.instagram.com/_motoholic_aman_/" target="_blank" rel="noopener noreferrer"><FaInstagram size={20} /> Instagram</a></li>
              <li><a href="https://www.linkedin.com/in/aman-mishra-seo-expert/" target="_blank" rel="noopener noreferrer"><FaLinkedin size={20} /> LinkedIn</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Locations</h3>
            <div className="footer-location">
              <h4>Nepal</h4>
              <p><FaMapMarkerAlt size={16} style={{ marginRight: '8px' }} /><a href="https://www.google.com/maps/place/Flowrage+-+SEO+Agency+in+Nepal/@27.6651495,85.3358366,20z/data=!4m6!3m5!1s0x39eb19014b11d41d:0x15f4651a9f208b6e!8m2!3d27.6650984!4d85.3358996!16s%2Fg%2F11mllk54cp?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D">Gwarko At the opposite of Buddha Stupa</a></p>
              <p><FaPhone size={16} style={{ marginRight: '8px' }} /><a href="tel:+977 9823820301">+977 9823820301</a></p>
              <p><FaEnvelope size={16} style={{ marginRight: '8px' }} /><a href="mailto:amandreamsbig@gmail.com">amandreamsbig@gmail.com</a></p>
            </div>
          </div>
        </div>

        <div className="footer-bottom color-white">
          <p>&copy; 2025 Aman Mishra  All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;