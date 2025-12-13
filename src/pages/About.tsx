import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <section className="page-hero">
        <div className="container">
          <h1>About Us</h1>
          <p>Leading IT Company in Nepal | You Dream, We Weave</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">Our Story</h2>
          <p className="section-subtitle">
            We are deeply committed to delivering exceptional work with unwavering dedication and passion. 
            Our core motto encapsulates our guiding philosophy: "You Dream, We Weave" – turning your visions into reality.
          </p>
          <p>
            Makura Creations has been a leading IT company in Nepal for over 12 years, consistently delivering 
            cutting-edge solutions for clients both domestically and internationally. From concept to completion, 
            we tackle your challenges with comprehensive software solutions tailored to your specific needs.
          </p>
        </div>
      </section>

      <section className="section values-section">
        <div className="container">
          <h2 className="section-title">Our Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <h3>Innovation</h3>
              <p>We leverage the latest IT advancements to empower your business transformation.</p>
            </div>
            <div className="value-card">
              <h3>Excellence</h3>
              <p>We are committed to delivering exceptional work with unwavering dedication.</p>
            </div>
            <div className="value-card">
              <h3>Collaboration</h3>
              <p>We foster a culture of open dialogue and collaborative success.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
