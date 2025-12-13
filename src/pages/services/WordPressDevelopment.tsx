import { Link } from 'react-router-dom';
import './ServicePage.css';

const WordPressDevelopment = () => {
  return (
    <div className="service-page">
      <section className="page-hero">
        <div className="container">
          <h1>WordPress Development</h1>
          <p>Custom WordPress solutions for your business</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">WordPress Development Services</h2>
          <p className="section-subtitle">
            We specialize in creating custom WordPress websites that are fast, secure, and optimized for success.
          </p>
          
          <div className="service-features">
            <div className="feature-card">
              <h3>Custom Theme Development</h3>
              <p>Unique WordPress themes tailored to your brand</p>
            </div>
            <div className="feature-card">
              <h3>Plugin Development</h3>
              <p>Custom plugins to extend functionality</p>
            </div>
            <div className="feature-card">
              <h3>WordPress Migration</h3>
              <p>Seamless migration to WordPress platform</p>
            </div>
            <div className="feature-card">
              <h3>Performance Optimization</h3>
              <p>Speed optimization and caching solutions</p>
            </div>
            <div className="feature-card">
              <h3>Security Hardening</h3>
              <p>Enhanced security measures for your site</p>
            </div>
            <div className="feature-card">
              <h3>Maintenance & Updates</h3>
              <p>Regular updates and maintenance services</p>
            </div>
          </div>

          <div className="service-cta">
            <Link to="/contact" className="btn btn-primary">Get Started</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WordPressDevelopment;
