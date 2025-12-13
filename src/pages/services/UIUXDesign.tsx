import { Link } from 'react-router-dom';
import './ServicePage.css';

const UIUXDesign = () => {
  return (
    <div className="service-page">
      <section className="page-hero">
        <div className="container">
          <h1>UI/UX Design</h1>
          <p>Create beautiful and intuitive user experiences</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">UI/UX Design Services</h2>
          <p className="section-subtitle">
            We design user-centered interfaces that are both beautiful and functional.
          </p>
          
          <div className="service-features">
            <div className="feature-card">
              <h3>User Research</h3>
              <p>Understand your users' needs and behaviors</p>
            </div>
            <div className="feature-card">
              <h3>Wireframing</h3>
              <p>Create structural layouts for your designs</p>
            </div>
            <div className="feature-card">
              <h3>Prototyping</h3>
              <p>Interactive prototypes to test concepts</p>
            </div>
            <div className="feature-card">
              <h3>Visual Design</h3>
              <p>Beautiful and cohesive visual designs</p>
            </div>
            <div className="feature-card">
              <h3>Usability Testing</h3>
              <p>Test and refine your designs</p>
            </div>
            <div className="feature-card">
              <h3>Design Systems</h3>
              <p>Create consistent design systems</p>
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

export default UIUXDesign;
