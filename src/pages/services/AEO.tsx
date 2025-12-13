import { Link } from 'react-router-dom';
import './ServicePage.css';

const AEO = () => {
  return (
    <div className="service-page">
      <section className="page-hero">
        <div className="container">
          <h1>Answer Engine Optimization (AEO)</h1>
          <p>Optimize for AI-powered search engines</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">AEO Services</h2>
          <p className="section-subtitle">
            Optimize your content for AI-powered answer engines like ChatGPT, Perplexity, and Google Gemini.
          </p>
          
          <div className="service-features">
            <div className="feature-card">
              <h3>ChatGPT Optimization</h3>
              <p>Optimize content for ChatGPT visibility</p>
            </div>
            <div className="feature-card">
              <h3>Perplexity Optimization</h3>
              <p>Improve visibility in Perplexity AI</p>
            </div>
            <div className="feature-card">
              <h3>Google Gemini Optimization</h3>
              <p>Optimize for Google's AI assistant</p>
            </div>
            <div className="feature-card">
              <h3>Content Structuring</h3>
              <p>Structure content for AI understanding</p>
            </div>
            <div className="feature-card">
              <h3>AI Training Data</h3>
              <p>Ensure your content is used by AI models</p>
            </div>
            <div className="feature-card">
              <h3>LLMs.txt Implementation</h3>
              <p>Implement LLMs.txt for better AI visibility</p>
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

export default AEO;
