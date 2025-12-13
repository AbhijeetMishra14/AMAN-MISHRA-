import { Link } from 'react-router-dom';
import './ServicePage.css';

const MobileAppDevelopment = () => {
  return (
    <div className="service-page">
      <section className="page-hero">
        <div className="container">
          <h1>Mobile App Development</h1>
          <p>Build powerful mobile applications for iOS and Android</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">Mobile App Development Services</h2>
          <p className="section-subtitle">
            We create native and cross-platform mobile applications that deliver exceptional user experiences.
          </p>
          
          <div className="service-features">
            <div className="feature-card">
              <h3>iOS Development</h3>
              <p>Native iOS apps using Swift and Objective-C</p>
            </div>
            <div className="feature-card">
              <h3>Android Development</h3>
              <p>Native Android apps using Kotlin and Java</p>
            </div>
            <div className="feature-card">
              <h3>React Native</h3>
              <p>Cross-platform apps with React Native</p>
            </div>
            <div className="feature-card">
              <h3>Flutter Development</h3>
              <p>Cross-platform apps with Flutter</p>
            </div>
            <div className="feature-card">
              <h3>App Design</h3>
              <p>UI/UX design for mobile applications</p>
            </div>
            <div className="feature-card">
              <h3>App Maintenance</h3>
              <p>Ongoing support and updates</p>
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

export default MobileAppDevelopment;
