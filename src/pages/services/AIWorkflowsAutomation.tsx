import { Link } from 'react-router-dom';
import './ServicePage.css';

const AIWorkflowsAutomation = () => {
  return (
    <div className="service-page">
      <section className="page-hero">
        <div className="container">
          <h1>AI Workflows Automation</h1>
          <p>Automate your business processes with AI</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">AI Automation Services</h2>
          <p className="section-subtitle">
            We help businesses automate workflows and processes using AI and machine learning.
          </p>
          
          <div className="service-features">
            <div className="feature-card">
              <h3>Workflow Automation</h3>
              <p>Automate repetitive business processes</p>
            </div>
            <div className="feature-card">
              <h3>AI Chatbots</h3>
              <p>Intelligent chatbots for customer service</p>
            </div>
            <div className="feature-card">
              <h3>Data Processing</h3>
              <p>Automate data extraction and processing</p>
            </div>
            <div className="feature-card">
              <h3>Email Automation</h3>
              <p>Automated email workflows and responses</p>
            </div>
            <div className="feature-card">
              <h3>Integration Services</h3>
              <p>Connect different systems and platforms</p>
            </div>
            <div className="feature-card">
              <h3>Custom AI Solutions</h3>
              <p>Tailored AI solutions for your business</p>
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

export default AIWorkflowsAutomation;
