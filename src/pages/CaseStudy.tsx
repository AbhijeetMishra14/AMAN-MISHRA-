import { Link } from 'react-router-dom';
import './CaseStudy.css';

const CaseStudy = () => {
  const caseStudies = [
    { title: 'CAN - Digital Transformation', description: 'Case study description...' },
    { title: 'UWS Nepal - Website Development', description: 'Case study description...' },
    { title: 'Lambda Payments - Payment Solution', description: 'Case study description...' }
  ];

  return (
    <div className="case-study-page">
      <section className="page-hero">
        <div className="container">
          <h1>Case Studies</h1>
          <p>Real results from real clients</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="case-studies-grid">
            {caseStudies.map((study, index) => (
              <div key={index} className="case-study-card">
                <div className="case-study-image">
                  <div className="case-study-placeholder">Case Study Image</div>
                </div>
                <h3>{study.title}</h3>
                <p>{study.description}</p>
                <Link to="#" className="btn btn-primary">Read More</Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CaseStudy;
