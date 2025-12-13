import { Link } from 'react-router-dom';
import './ServicePage.css';

const PromotionalVideo = () => {
  return (
    <div className="service-page">
      <section className="page-hero">
        <div className="container">
          <h1>Promotional Video</h1>
          <p>Create engaging video content that converts</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">Video Production Services</h2>
          <p className="section-subtitle">
            We create compelling promotional videos that tell your story and drive engagement.
          </p>
          
          <div className="service-features">
            <div className="feature-card">
              <h3>Video Production</h3>
              <p>Professional video production services</p>
            </div>
            <div className="feature-card">
              <h3>Video Editing</h3>
              <p>Professional editing and post-production</p>
            </div>
            <div className="feature-card">
              <h3>Animation</h3>
              <p>2D and 3D animation services</p>
            </div>
            <div className="feature-card">
              <h3>Social Media Videos</h3>
              <p>Short-form videos for social platforms</p>
            </div>
            <div className="feature-card">
              <h3>Corporate Videos</h3>
              <p>Professional corporate video content</p>
            </div>
            <div className="feature-card">
              <h3>Video Marketing</h3>
              <p>Strategic video marketing campaigns</p>
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

export default PromotionalVideo;
