import { Link } from 'react-router-dom';
import './ServicePage.css';

const DigitalMarketing = () => {
  return (
    <div className="service-page">
      <section className="page-hero">
        <div className="container">
          <h1>Digital Marketing</h1>
          <p>Grow your online presence and reach your target audience</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">Digital Marketing Services</h2>
          <p className="section-subtitle">
            We help businesses grow their online presence through strategic digital marketing campaigns.
          </p>
          
          <div className="service-features">
            <div className="feature-card">
              <h3>Social Media Marketing</h3>
              <p>Engage your audience on social platforms</p>
            </div>
            <div className="feature-card">
              <h3>Search Engine Optimization</h3>
              <p>Improve your search engine rankings</p>
            </div>
            <div className="feature-card">
              <h3>Pay-Per-Click Advertising</h3>
              <p>Targeted ads for immediate results</p>
            </div>
            <div className="feature-card">
              <h3>Content Marketing</h3>
              <p>Create valuable content that attracts customers</p>
            </div>
            <div className="feature-card">
              <h3>Email Marketing</h3>
              <p>Nurture leads and retain customers</p>
            </div>
            <div className="feature-card">
              <h3>Analytics & Reporting</h3>
              <p>Track performance and optimize campaigns</p>
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

export default DigitalMarketing;