import { FaCheckCircle, FaSearch, FaAward, FaHeadset } from 'react-icons/fa';
import './About.css';

const About = () => {
  const services = [
    'Search Engine Optimization (SEO)',
    'Social Media Marketing',
    'Data Analytics & Reporting',
    'Google Ads (PPC Marketing)',
    'Content Strategy & Optimization',
    'Website Design & Development'
  ];

  const whyChooseUs = [
    {
      icon: FaSearch,
      title: 'Find the Problem',
      description: 'We look at what\'s holding your business back from your website to your online presence and find the gaps that need fixing.'
    },
    {
      icon: FaAward,
      title: 'Perfect Solution',
      description: 'Every business is different, so we create the right mix of SEO, Google Ads, and social media to help you grow faster.'
    },
    {
      icon: FaAward,
      title: 'Trusted Services',
      description: 'Clients trust us because we focus on results. Our strategies are simple, clear, and built for long-term success.'
    },
    {
      icon: FaHeadset,
      title: '24/7 Support',
      description: 'We\'re here whenever you need us — ready to answer, guide, and keep your business moving forward.'
    }
  ];

  const clients = [
    'The Himalayan Odyssey Treks PVT. LTD.',
    'HARDIK IVF and Fertility Center',
    'MAGMANI INTERNATIONAL',
    'VENUS Hospital',
    'SEEKShya Academy',
    'AI'
  ];

  return (
    <div className="about-page">
      <section className="page-hero">
        <div className="container">
          <h1>About Aman Mishra SEO Specialist in Nepal</h1>
          <p>SEO Expert in Nepal</p>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="section about-intro">
        <div className="container">
          <div className="about-intro-content">
            <div className="intro-text">
              <h2 className="section-title">Who We Are</h2>
              <p className="intro-description">
                A result-driven SEO Expert in Nepal, dedicated to helping businesses grow with smart and data-driven digital marketing strategies. What We Do We specialize in SEO, Google Ads, Social Media Marketing, and Content Optimization to increase your online visibility, traffic, and sales.
              </p>
              
              <div className="services-grid">
                <div className="services-column">
                  {services.slice(0, 3).map((service, index) => (
                    <div key={index} className="service-item">
                      <FaCheckCircle className="service-icon" />
                      <span>{service}</span>
                    </div>
                  ))}
                </div>
                <div className="services-column">
                  {services.slice(3, 6).map((service, index) => (
                    <div key={index} className="service-item">
                      <FaCheckCircle className="service-icon" />
                      <span>{service}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="contact-phone">
                <span className="phone-icon">📞</span>
                <a href="tel:+977 9765417792">+977 9765417792</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Target Section */}
      <section className="section mission-section">
        <div className="container">
          <div className="quote-section">
            <h3 className="quote">
              "We are always looking ahead to stay on top of the latest design & technology."
            </h3>
          </div>

          <div className="mission-target-grid">
            <div className="mission-card">
              <div className="card-image">
                <div className="card-placeholder">DIGITAL MARKETING</div>
              </div>
              <h3>Our target</h3>
              <p>
                Our target is to become a trusted partner for businesses and individuals seeking measurable online growth. We aim to bridge creativity with data-driven strategies, ensuring that every solution we deliver enhances visibility, attracts the right audience, and drives long-term success. By setting clear goals and staying ahead of digital trends, we help brands achieve their full potential in today's competitive market.
              </p>
            </div>

            <div className="mission-card">
              <div className="card-image">
                <div className="card-placeholder">MARKETING STRATEGY</div>
              </div>
              <h3>Our Mission</h3>
              <p>
                Our mission is to empower businesses with innovative, sustainable, and result-oriented digital strategies. We combine creativity with cutting-edge SEO, design, and marketing solutions to deliver meaningful impact. Every project we take on is focused on building stronger connections, improving online presence, and generating measurable results that foster long-term growth and brand authority.
              </p>
            </div>
          </div>

          <div className="founder-section">
            <div className="founder-info">
              <h4 className="founder-name">Aman Kumar Mishra</h4>
              <p className="founder-title">(SEO Expert)</p>
            </div>
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section className="section clients-section">
        <div className="container">
          <h2 className="section-title">Our Trusted Clients</h2>
          <div className="clients-grid">
            {clients.map((client, index) => (
              <div key={index} className="client-card">
                <p>{client}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="section why-choose-us">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Why Choose Us</span>
            <h2 className="section-title">We Execute Our Ideas Form the Start to Finish</h2>
          </div>

          <div className="why-choose-grid">
            {whyChooseUs.map((item, index) => (
              <div key={index} className="why-card">
                <div className="why-card-icon">
                  <item.icon size={40} />
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <a href="#" className="read-more">READ MORE</a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
