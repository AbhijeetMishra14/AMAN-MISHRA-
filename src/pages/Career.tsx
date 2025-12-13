import './Career.css';

const Career = () => {
  return (
    <div className="career-page">
      <section className="page-hero">
        <div className="container">
          <h1>Career</h1>
          <p>Join our team and be part of something great</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">Why Work With Us?</h2>
          <p className="section-subtitle">
            We are a team fueled by a shared passion for cutting-edge solutions and collaborative success.
          </p>
          <div className="benefits-grid">
            <div className="benefit-card">
              <h3>Growth Opportunities</h3>
              <p>Continuous learning and professional development</p>
            </div>
            <div className="benefit-card">
              <h3>Innovative Projects</h3>
              <p>Work on cutting-edge technologies and solutions</p>
            </div>
            <div className="benefit-card">
              <h3>Collaborative Environment</h3>
              <p>Open communication and teamwork</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section open-positions-section">
        <div className="container">
          <h2 className="section-title">Open Positions</h2>
          <p className="section-subtitle">We're always looking for talented individuals to join our team.</p>
          <div className="positions-list">
            <div className="position-card">
              <h3>Web Developer</h3>
              <p>We are looking for an experienced web developer to join our team.</p>
              <a href="mailto:career@makuracreations.com" className="btn btn-primary">Apply Now</a>
            </div>
            <div className="position-card">
              <h3>UI/UX Designer</h3>
              <p>Join our creative team as a UI/UX designer and help create amazing user experiences.</p>
              <a href="mailto:career@makuracreations.com" className="btn btn-primary">Apply Now</a>
            </div>
            <div className="position-card">
              <h3>Digital Marketing Specialist</h3>
              <p>We need a digital marketing expert to help our clients grow their online presence.</p>
              <a href="mailto:career@makuracreations.com" className="btn btn-primary">Apply Now</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Career;
