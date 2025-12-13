import { Link } from 'react-router-dom';
import './Portfolio.css';

const Portfolio = () => {
  const portfolioItems = [
    { slug: 'uws-nepal', title: 'UWS Nepal' },
    { slug: 'lambda-payments', title: 'Lambda Payments' },
    { slug: 'can', title: 'CAN' },
    { slug: 'miss-nepal', title: 'Miss Nepal' },
    { slug: 'seed-financial-academy', title: 'Seed Financial Academy' },
    { slug: 'varicon-australia', title: 'Varicon' },
    { slug: 'nepal-travel-adventure', title: 'Nepal Travel Adventure' },
    { slug: 'himalayan-glacier', title: 'Himalayan Glacier' }
  ];

  return (
    <div className="portfolio-page">
      <section className="page-hero">
        <div className="container">
          <h1>Portfolio</h1>
          <p>Release Your Brand's Potential: See Our Design Portfolio</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="portfolio-filters">
            <button className="filter-btn active">All Works</button>
            <button className="filter-btn">Branding & Graphics</button>
            <button className="filter-btn">Website and Mobile App</button>
            <button className="filter-btn">Digital Marketing</button>
          </div>

          <div className="portfolio-grid">
            {portfolioItems.map((item, index) => (
              <Link key={index} to={`/portfolio/${item.slug}`} className="portfolio-item">
                <div className="portfolio-image">
                  <div className="portfolio-placeholder">{item.title}</div>
                </div>
                <h3>{item.title}</h3>
                <span className="view-site">View Site →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
