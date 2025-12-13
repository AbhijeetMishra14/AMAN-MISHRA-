import './FreeResources.css';

const FreeResources = () => {
  return (
    <div className="free-resources-page">
      <section className="page-hero">
        <div className="container">
          <h1>Free Resources</h1>
          <p>Helpful tools and resources for your business</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="resources-grid">
            <div className="resource-card">
              <h3>SEO Checklist</h3>
              <p>Download our comprehensive SEO checklist to optimize your website.</p>
              <a href="#" className="btn btn-primary">Download</a>
            </div>
            <div className="resource-card">
              <h3>Website Audit Template</h3>
              <p>Use our template to audit your website and identify areas for improvement.</p>
              <a href="#" className="btn btn-primary">Download</a>
            </div>
            <div className="resource-card">
              <h3>Social Media Calendar</h3>
              <p>Plan your social media content with our free calendar template.</p>
              <a href="#" className="btn btn-primary">Download</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FreeResources;
