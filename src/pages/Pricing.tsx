import { useState } from 'react';
import { Link } from 'react-router-dom';
import QuotePricingModal from '../components/QuotePricingModal';
import './Pricing.css';

const Pricing = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const packages = [
    {
      id: 1,
      name: 'Standard Package',
      subtitle: 'For Small Business',
      price: 300,
      popular: false,
      features: [
        'Initial Website Analysis',
        'Upto 5 Keyword Ranking',
        'Site Audit',
        'Competitor Analysis',
        'Google Analytics Setup',
        'Google Search Console Setup',
        'Robots.Txt Creation',
        'Sitemap Creation',
        'On Page Setup',
        'Keyword Research',
        'Few Major Pages Meta And Heading Tag Optimization',
        'URL Optimization',
        'Image Optimization',
        '2 SEO Optimized Blog Articles',
        'Few Existing Content Optimization',
        'Technical SEO',
        'Canonical URL Addition',
        'Custom 404 Page Setup',
        'OG Tags',
        'Page Redirection',
        'Sitemap',
        'Robots.Txt',
        'Browser Compatibility Check',
        'Page Speed Optimization',
        'Off Page SEO',
        'Quora Posting',
        'Reddit Posting',
        'Local SEO',
        'GMB Setup & Optimization',
        'Google Map Creation',
        'Monthly Report',
        'Work Done Report',
      ]
    },
    {
      id: 2,
      name: 'Professional Package',
      subtitle: 'For Medium Business',
      price: 400,
      popular: true,
      badge: 'Recommended',
      features: [
        'Initial Website Analysis',
        'Upto 10 Keyword Ranking',
        'Site Audit',
        'Competitor Analysis',
        'Google Analytics Setup',
        'Google Search Console Setup',
        'Robots.Txt Creation',
        'Sitemap Creation',
        'On Page Setup',
        'Keyword Research',
        'Keyword Mapping',
        'Few Major Pages Meta And Heading Tag Optimization',
        'URL Optimization',
        'Image Optimization',
        '4 SEO Optimized Blog Articles',
        'Few Existing Content Optimization',
        'Technical SEO',
        'Canonical URL Addition',
        'Custom 404 Page Setup',
        'OG Tags',
        'Page Redirection',
        'Sitemap',
        'Robots.Txt',
        'Browser Compatibility Check',
        'Page Speed Optimization',
        'Broken Link Fixing',
        'Site Architecture',
        'Mobile Friendliness',
        'Solve Keyword Cannibalization',
        'Hreflang Tags',
        'Competitor Backlink Research',
        'Off Page SEO',
        'Quora Posting',
        'Reddit Posting',
        'Guest Blogging',
        'Link Building',
        'Few Directory Submission',
        'Few Weekly Post On Quora',
        'Schema Implementation',
        'Few Infographic Creation And Sharing',
        'Local SEO',
        'GMB Setup & Optimization',
        'GMB Posting',
        'Few Local Citation',
        'Google Map Creation',
        'List Item',
        'Monthly Report',
        'Work Done Report',
        'On Page Report',
        'Backlink Report',
        'Traffic By Country',
        'Traffic Comparison',
        'Top 10 Performing Pages',
        'Top 10 Keywords',
        'Clicks, Impression, Position',
      ]
    },
    {
      id: 3,
      name: 'Premium',
      subtitle: 'For Large Business',
      price: 500,
      popular: false,
      features: [
        'Initial Website Analysis',
        'Upto 20 Keyword Ranking',
        'Site Audit',
        'Competitor Analysis',
        'Google Analytics Setup',
        'Google Search Console Setup',
        'Robots.Txt Creation',
        'Sitemap Creation',
        'On Page Setup',
        'Keyword Research',
        'Keyword Mapping',
        'Few Major Pages Meta And Heading Tag Optimization',
        'URL Optimization',
        'Image Optimization',
        '6 SEO Optimized Blog Articles',
        'Existing Major Page Content Optimization',
        'Technical SEO',
        'Canonical URL Addition',
        'Custom 404 Page Setup',
        'OG Tags',
        'Page Redirection',
        'Sitemap',
        'Robots.Txt',
        'Browser Compatibility Check',
        'Page Speed Optimization',
        'Broken Link Fixing',
        'Site Architecture',
        'Mobile Friendliness',
        'Solve Keyword Cannibalization',
        'Hreflang Tags',
        'Competitor Backlink Research',
        'Off Page SEO',
        'Quora Posting',
        'Reddit Posting',
        'Guest Blogging',
        'Link Building',
        'Few Directory Submission',
        'Few Weekly Post On Quora',
        'Schema Implementation',
        'Conversion Tracking',
        'Few Infographic Creation And Sharing',
        'Local SEO',
        'GMB Setup & Optimization',
        'GMB Posting',
        'Few Local Citation',
        'Google Map Creation',
        'List Item',
        'Monthly Report',
        'Work Done Report',
        'On Page Report',
        'Backlink Report',
        'Traffic By Country',
        'Traffic Comparison',
        'Top 10 Performing Pages',
        'Top 10 Keywords',
        'Clicks, Impression, Position',
      ]
    },
    {
      id: 4,
      name: 'Premium Plus',
      subtitle: 'For Competitive Large Business',
      price: 600,
      popular: false,
      features: [
        'Initial Website Analysis',
        'Upto 30 Keyword Ranking',
        'Site Audit',
        'Competitor Analysis',
        'Google Analytics Setup',
        'Google Search Console Setup',
        'Robots.Txt Creation',
        'Sitemap Creation',
        'On Page Setup',
        'Keyword Research',
        'Keyword Mapping',
        'Few Major Pages Meta And Heading Tag Optimization',
        'URL Optimization',
        'Image Optimization',
        '8 SEO Optimized Blog Articles',
        'Existing Major Page Content Optimization',
        'Technical SEO',
        'Canonical URL Addition',
        'Custom 404 Page Setup',
        'OG Tags',
        'Page Redirection',
        'Sitemap',
        'Robots.Txt',
        'Browser Compatibility Check',
        'Page Speed Optimization',
        'Broken Link Fixing',
        'Site Architecture',
        'Mobile Friendliness',
        'Solve Keyword Cannibalization',
        'Hreflang Tags',
        'Competitor Backlink Research',
        'Off Page SEO',
        'Quora Posting',
        'Reddit Posting',
        'Guest Blogging',
        'Link Building',
        'Few Directory Submission',
        'Few Weekly Post On Quora',
        'Schema Implementation',
        'Conversion Tracking',
        'Few Infographic Creation And Sharing',
        'Local SEO',
        'GMB Setup & Optimization',
        'GMB Posting',
        'Few Local Citation',
        'Google Map Creation',
        'List Item',
        'Monthly Report',
        'Work Done Report',
        'On Page Report',
        'Backlink Report',
        'Traffic By Country',
        'Traffic Comparison',
        'Top 10 Performing Pages',
        'Top 10 Keywords',
        'Clicks, Impression, Position',
      ]
    }
  ];

  return (
    <div className="pricing-page">
      {/* Breadcrumb */}
      <nav className="breadcrumb">
        <div className="breadcrumb-content">
          <Link to="/">Home</Link>
          <span className="separator">•</span>
          <span>Pricing</span>
        </div>
      </nav>

      {/* Pricing Header */}
      <section className="pricing-header">
        <h1>Our Pricing Plans</h1>
        <p className="subtitle">Choose the SEO package that fits your business needs</p>
      </section>

      {/* Pricing Cards */}
      <section className="pricing-section">
        <div className="pricing-container">
          {packages.map((pkg) => (
            <div key={pkg.id} className={`pricing-card ${pkg.popular ? 'popular' : ''}`}>
              {pkg.popular && <div className="badge">{pkg.badge}</div>}
              
              <div className="card-header">
                <h3>{pkg.name}</h3>
                <p className="package-subtitle">{pkg.subtitle}</p>
              </div>

              <div className="price-section">
                <span className="currency">$</span>
                <span className="amount">{pkg.price}</span>
                <span className="period">/Monthly</span>
              </div>

              <button 
                onClick={() => setIsModalOpen(true)}
                className="get-quote-btn"
              >
                <span>GET A QUOTE</span>
              </button>

              <div className="features-list">
                {pkg.features.map((feature, index) => (
                  <div key={index} className="feature-item">
                    <span className="checkmark">✓</span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modal */}
      <QuotePricingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Pricing;
