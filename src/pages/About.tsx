import { FaCheckCircle, FaSearch, FaAward, FaHeadset } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { adminService } from '../services/adminService';
import './About.css';

type FAQ = {
  _id: string;
  question: string;
  answer: string;
  order?: number;
  active?: boolean;
};

const DEFAULT_FAQS: FAQ[] = [
  {
    _id: '1',
    question: 'What services do I get from Aman Mishra?',
    answer: 'I provide business services from application development to social media management and branding all together so that it becomes easy for you to get your business solution all in one spot.',
  },
  {
    _id: '2',
    question: 'What services do I provide?',
    answer: 'I offer a range of different services ranging from website development, app development, digital marketing and many more.',
  },
  {
    _id: '3',
    question: 'Do you help with social media promotions as well?',
    answer: 'Yes, I also have a talented creative team to help your business grow on social media.',
  },
  {
    _id: '4',
    question: 'Where are you located?',
    answer: 'I am based in Nepal, but I work with clients from all over the world.',
  },
];

const About = () => {
  const [faqs, setFaqs] = useState<FAQ[]>(DEFAULT_FAQS);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const faqData = await adminService.listFAQs();
        const faqList = Array.isArray(faqData) ? faqData : (faqData?.faqs || []);
        if (faqList.length > 0) {
          setFaqs(faqList);
        } else {
          setFaqs(DEFAULT_FAQS);
        }
      } catch (error) {
        console.error('Failed to fetch FAQs:', error);
        setFaqs(DEFAULT_FAQS);
      }
    };
    fetchFAQs();
  }, []);

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
      <nav className="breadcrumb">
        <div className="breadcrumb-content">
          <Link to="/">Home</Link>
          <span className="separator">•</span>
          <span>About</span>
        </div>
      </nav>

      <section className="page-hero">
        <div className="container">
          <h1>About Aman Mishra – SEO Specialist & Full Stack Developer</h1>
          <p>Helping brands grow online with data-driven SEO and clean, scalable technology.</p>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="section about-intro">
        <div className="container">
          <div className="about-intro-content">
            <div className="intro-text">
              <h2 className="section-title">Who We Are</h2>
              <p className="intro-description">
                A results-driven SEO expert based in Nepal, focused on helping businesses grow through smart, data-backed digital strategies.
                We specialize in SEO, Google Ads, social media marketing, and content optimization to improve your visibility, attract the right
                audience, and convert traffic into measurable results.
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
              <h3>Our Target</h3>
              <p>
                Our target is to be a trusted partner for businesses and individuals seeking measurable online growth. We bridge creativity with
                data-driven strategies so every campaign improves visibility, attracts the right audience, and drives sustainable success.
                By setting clear goals and staying ahead of digital trends, we help brands reach their full potential in a competitive market.
              </p>
            </div>

            <div className="mission-card">
              <div className="card-image">
                <div className="card-placeholder">MARKETING STRATEGY</div>
              </div>
              <h3>Our Mission</h3>
              <p>
                Our mission is to empower businesses with innovative, sustainable, and result-oriented digital strategies. We combine creativity
                with modern SEO, thoughtful design, and marketing solutions that deliver real impact. Every project is focused on building
                stronger connections, improving your online presence, and generating results that support long-term growth and brand authority.
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

      {/* Experience & Clients Section */}
      <section className="section clients-section">
        <div className="container">
          <div className="clients-header">
            <div>
              <h2 className="section-title">Experience & Trusted Clients</h2>
              <p className="intro-description">
                Over 4 years of experience in SEO, digital marketing, and development, partnering with brands across healthcare, education,
                travel, and technology.
              </p>
            </div>
          </div>
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
            <h2 className="section-title">We Execute Ideas From Strategy to Results</h2>
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

      {/* FAQ Section */}
      <section className="section faq-section">
        <div className="container">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle">Common questions about our services and how we can help your business grow.</p>

          <div className="faq-grid">
            {(faqs && faqs.length > 0 ? faqs : DEFAULT_FAQS).map((faq) => (
              <div key={faq._id} className="faq-item">
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
