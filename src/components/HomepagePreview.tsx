import React from 'react';

interface Section {
  _id: string;
  type: string;
  title?: string;
  subtitle?: string;
  description?: string;
  order: number;
  visible: boolean;
  features?: any[];
  buttonText?: string;
  buttonLink?: string;
}

interface HomepagePreviewProps {
  sections: Section[];
}

const HomepagePreview: React.FC<HomepagePreviewProps> = ({ sections }) => {
  const renderSection = (section: Section) => {
    if (!section.visible) return null;

    switch (section.type) {
      case 'hero':
        return (
          <section key={section._id} className="preview-hero">
            <div className="preview-container">
              <h1>{section.title || 'Your Hero Title'}</h1>
              <p>{section.subtitle || 'Your subtitle goes here'}</p>
              {section.buttonText && (
                <a href={section.buttonLink || '#'} className="preview-btn">
                  {section.buttonText}
                </a>
              )}
            </div>
          </section>
        );

      case 'about':
        return (
          <section key={section._id} className="preview-about">
            <div className="preview-container">
              <h2>{section.title || 'About Us'}</h2>
              <p>{section.description || 'About section content'}</p>
              {section.buttonText && (
                <a href={section.buttonLink || '#'} className="preview-btn-secondary">
                  {section.buttonText}
                </a>
              )}
            </div>
          </section>
        );

      case 'features':
        return (
          <section key={section._id} className="preview-features">
            <div className="preview-container">
              <h2>{section.title || 'Features'}</h2>
              {section.features && section.features.length > 0 ? (
                <div className="features-grid">
                  {section.features.map((feature, idx) => (
                    <div key={idx} className="feature-item">
                      <h3>{feature.title}</h3>
                      <p>{feature.description}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="placeholder">No features added yet</p>
              )}
            </div>
          </section>
        );

      case 'cta':
        return (
          <section key={section._id} className="preview-cta">
            <div className="preview-container">
              <h2>{section.title || 'Ready to Get Started?'}</h2>
              <p>{section.subtitle || 'Contact us today'}</p>
              {section.buttonText && (
                <a href={section.buttonLink || '#'} className="preview-btn-primary">
                  {section.buttonText}
                </a>
              )}
            </div>
          </section>
        );

      case 'testimonials':
        return (
          <section key={section._id} className="preview-testimonials">
            <div className="preview-container">
              <h2>{section.title || 'What Our Customers Say'}</h2>
              <p>{section.description || 'Testimonials section'}</p>
            </div>
          </section>
        );

      case 'faq':
        return (
          <section key={section._id} className="preview-faq">
            <div className="preview-container">
              <h2>{section.title || 'Frequently Asked Questions'}</h2>
              <p className="placeholder">{section.description || 'FAQ section'}</p>
            </div>
          </section>
        );

      case 'pricing':
        return (
          <section key={section._id} className="preview-pricing">
            <div className="preview-container">
              <h2>{section.title || 'Our Pricing'}</h2>
              <p className="placeholder">{section.description || 'Pricing plans section'}</p>
            </div>
          </section>
        );

      case 'clients':
        return (
          <section key={section._id} className="preview-clients">
            <div className="preview-container">
              <h2>{section.title || 'Our Trusted Clients'}</h2>
              <p className="placeholder">{section.description || 'Client logos section'}</p>
            </div>
          </section>
        );

      default:
        return null;
    }
  };

  const visibleSections = sections.filter(s => s.visible);

  return (
    <div className="homepage-preview">
      {visibleSections.length === 0 ? (
        <div className="preview-empty">
          <p>No visible sections. Enable some sections to preview homepage.</p>
        </div>
      ) : (
        visibleSections.map(section => renderSection(section))
      )}
    </div>
  );
};

export default HomepagePreview;
