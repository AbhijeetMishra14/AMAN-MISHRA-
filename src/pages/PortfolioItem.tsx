import { useParams, Link } from 'react-router-dom';
import './PortfolioItem.css';

const PortfolioItem = () => {
  const { slug } = useParams();

  // In a real app, you would fetch the portfolio item data based on the slug
  const portfolioItem = {
    title: 'Portfolio Item',
    description: 'This is a portfolio item description...'
  };

  return (
    <div className="portfolio-item-page">
      <div className="container">
        <nav className="breadcrumb">
          <Link to="/">Home</Link> / <Link to="/portfolio">Portfolio</Link> / <span>{portfolioItem.title}</span>
        </nav>

        <article className="portfolio-item-content">
          <h1>{portfolioItem.title}</h1>
          <div className="portfolio-image-large">
            <div className="portfolio-placeholder">Portfolio Image</div>
          </div>
          <div className="portfolio-description">
            <p>{portfolioItem.description}</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
              incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <div className="portfolio-navigation">
            <Link to="/portfolio" className="btn btn-outline">Back to Portfolio</Link>
            <a href="#" className="btn btn-primary">View Site</a>
          </div>
        </article>
      </div>
    </div>
  );
};

export default PortfolioItem;
