import { Link } from 'react-router-dom';
import './ServicePage.css';

const WebDevelopment = () => {
  return (
    <div className="service-page">
      <section className="page-hero">
        <div className="container">
          <h1>Web Development Service</h1>
          <p>Custom web solutions tailored to your business needs</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">Our Web Development Services</h2>
          <p className="section-subtitle">
            We create modern, responsive, and high-performing websites that drive results.
          </p>
          
          <div className="service-features">
            <div className="feature-card">
              <h3>Front-End Development</h3>
              <p>Modern, responsive user interfaces built with the latest technologies</p>
            </div>
            <div className="feature-card">
              <h3>Back-End Development</h3>
              <p>Robust server-side solutions for scalable applications</p>
            </div>
            <div className="feature-card">
              <h3>Full-Stack Development</h3>
              <p>End-to-end solutions from front-end to back-end</p>
            </div>
            <div className="feature-card">
              <h3>E-Commerce Solutions</h3>
              <p>Custom online stores with payment integration</p>
            </div>
            <div className="feature-card">
              <h3>API Development</h3>
              <p>RESTful APIs and integrations for seamless connectivity</p>
            </div>
            <div className="feature-card">
              <h3>Maintenance & Support</h3>
              <p>Ongoing support and updates for your website</p>
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

export default WebDevelopment;
