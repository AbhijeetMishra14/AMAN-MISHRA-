import { Link } from 'react-router-dom';
import Asset120 from '../assets/Asset-120-1.svg';
import './Career.css';

const Career = () => {
  return (
    <div className="career-page">
      {/* Hero Section */}
      <section className="career-hero">
        <div className="container">
          <nav className="breadcrumb-nav">
            <Link to="/">Home</Link>
            <span className="separator">•</span>
            <span>Vacancies</span>
          </nav>
          
          <div className="hero-content-wrapper">
            <div className="hero-text">
              <h1>Open Positions</h1>
              <p>
                Search for a role that fits your profile and if you can't find one, send us a general application with your resume attached. We want the brightest minds to work with us so that we can innovate, team up, and set the road for providing the best achievable consumer experience in the future.
              </p>
            </div>
            <div className="hero-illustration">
              <img src={Asset120} alt="Vacancies Illustration" className="illustration-image" />
            </div>
          </div>
        </div>
      </section>

      {/* No Openings Section */}
      <section className="no-openings-section">
        <div className="container">
          <div className="no-openings-content">
            <p className="no-openings-text">
              We are currently hiring! If you're interested in joining our team, please reach out to us at <a href="mailto:amandreamsbig@gmail.com">amandreamsbig@gmail.com</a> with your resume and portfolio.
            </p>

            <div className="hiring-section">
              <h3 className="hiring-title">We are currently open for hiring:</h3>
              <ul className="hiring-list">
                <li>SEO Intern</li>
                <li>UI/UX Designer</li>
              </ul>
              <p className="hiring-note">
                If you are interested, please add your skills and experience in your application email.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Career;
