import { Link } from 'react-router-dom';
import './ServicePage.css';

const SEOService = () => {
  return (
    <div className="service-page">
      <section className="page-hero">
        <div className="container">
          <h1>SEO Service in Nepal</h1>
          <p>Improve your search engine rankings and drive organic traffic</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">SEO Services</h2>
          <p className="section-subtitle">
            We provide comprehensive SEO services to help your website rank higher in search results.
          </p>
          
          <div className="service-features">
            <div className="feature-card">
              <h3>On-Page SEO</h3>
              <p>Optimize your website's content and structure</p>
            </div>
            <div className="feature-card">
              <h3>Off-Page SEO</h3>
              <p>Build quality backlinks and improve domain authority</p>
            </div>
            <div className="feature-card">
              <h3>Technical SEO</h3>
              <p>Fix technical issues affecting your rankings</p>
            </div>
            <div className="feature-card">
              <h3>Local SEO</h3>
              <p>Improve visibility in local search results</p>
            </div>
            <div className="feature-card">
              <h3>Keyword Research</h3>
              <p>Identify the best keywords for your business</p>
            </div>
            <div className="feature-card">
              <h3>SEO Audits</h3>
              <p>Comprehensive analysis of your website's SEO</p>
            </div>
          </div>

          <div className="service-cta">
            <Link to="/free-seo-audit" className="btn btn-primary">Get Free SEO Audit</Link>
            <Link to="/contact" className="btn btn-outline" style={{ marginLeft: '20px' }}>Contact Us</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SEOService;
