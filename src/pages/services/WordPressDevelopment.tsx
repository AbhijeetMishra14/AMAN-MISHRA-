import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaPhp, FaHtml5, FaCss3Alt, FaJs, FaDatabase, FaWordpress, FaCheckCircle, FaReact } from 'react-icons/fa';
import { SiNextdotjs } from 'react-icons/si';
import QuotePricingModal from '../../components/QuotePricingModal';
import { adminService } from '../../services/adminService';
import WordPressImg from '../../assets/wordpress-website-development.png';
import CustomWPImg from '../../assets/custom-wordpress-development.svg';
import PluginImg from '../../assets/plugin-development.svg';
import APIImg from '../../assets/API-Development.svg';
import MaintenanceImg from '../../assets/wordpress-maintainence.svg';
import FAQImg from '../../assets/faqs-blue-2.png';
import './ServicePage.css';

type PageFAQ = {
  _id: string;
  question: string;
  answer: string;
};

const DEFAULT_WP_FAQS: PageFAQ[] = [
  {
    _id: '1',
    question: 'What is the purpose of WordPress?',
    answer: 'WordPress is essentially a tool for creating websites without knowing any code. It is the most popular website construction program in the world because of its versatility and ease of use.',
  },
  {
    _id: '2',
    question: 'Is WordPress Reliable?',
    answer: 'Yes, WordPress is highly reliable and secure when properly maintained. It powers over 40% of all websites on the internet and is backed by a large community of developers constantly improving the platform.',
  },
  {
    _id: '3',
    question: 'Who requires WordPress?',
    answer: 'WordPress is suitable for everyone from small business owners to large enterprises. Whether you need a blog, e-commerce store, portfolio, or corporate website, WordPress can be customized to meet your needs.',
  },
];

const WordPressDevelopment = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [faqs, setFaqs] = useState<PageFAQ[]>(DEFAULT_WP_FAQS);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const data = await adminService.getFAQsByPage('wordpress-development');
        const faqList = Array.isArray(data) ? data : (data?.faqs || []);
        if (faqList.length > 0) {
          setFaqs(faqList);
        } else {
          setFaqs(DEFAULT_WP_FAQS);
        }
      } catch (error) {
        console.error('Failed to fetch FAQs:', error);
        setFaqs(DEFAULT_WP_FAQS);
      }
    };
    fetchFAQs();
  }, []);

  return (
    <div className="service-page">
      {/* Breadcrumb */}
      <nav className="breadcrumb">
        <div className="breadcrumb-content">
          <Link to="/">Home</Link>
          <span className="separator">•</span>
          <Link to="/">Services</Link>
          <span className="separator">•</span>
          <span>WordPress Development Service</span>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="service-hero wp-hero">
        <div className="container hero-content">
          <div className="hero-text">
            <h1>WordPress Development Service</h1>
            <p>
              WordPress is an open-source online platform for creating websites that work with PHP. To put it another way, since its launch in 2003, it has been the most user-friendly and potent blogging and CMS (website content management system). It is now among the most popular open-source content management systems available.
            </p>
            <button onClick={() => setIsModalOpen(true)} className="btn-cta">Start a Project →</button>
          </div>
          <div className="hero-image">
            <img src={WordPressImg} alt="WordPress Development" />
          </div>
        </div>
      </section>

      {/* Services We Offer */}
      <section className="section services-offer">
        <div className="container">
          <h2 className="section-title">Services We Offer in WordPress</h2>
          <p className="section-subtitle">
            Are you thinking about utilizing WordPress but unsure of its benefits?
          </p>

          <p className="service-description">
            Although there are several website builders available, WordPress.org is the most widely used. Actually, 40% of the internet is powered by it! The enormous degree of customization offered by WordPress is largely responsible for its success.
          </p>

          <p className="service-description">
            You may easily accomplish anything with WordPress thanks to its thousands of plugins that span a wide range of website functionalities.
          </p>
        </div>
      </section>

      {/* Custom WordPress Website Development */}
      <section className="section custom-wordpress">
        <div className="container">
          <div className="content-with-image">
            <div className="content">
              <h2>Custom WordPress Website Development</h2>
              <p>
                Choosing a template is not enough to create a website that accurately reflects your business. Custom WordPress website design provides companies with the freedom and authority to construct a website that complements their own objectives and identity. Every part of your website, including the style, functionality, visual components, and user experience, may be customized with custom WordPress web design.
              </p>
              <p>
                Rather than utilizing a pre-made template or theme, a custom WordPress website design is created especially for the user's particular requirements. Complete control over the look, feel, and performance of the website is possible with this kind of design.
              </p>
              <p>
                Businesses are able to incorporate their logo into every element of a custom WordPress website design. This entails selecting layouts, colors, and typefaces that are consistent with the company's identity.
              </p>
            </div>
            <div className="image">
              <img src={CustomWPImg} alt="Custom Development" />
            </div>
          </div>
        </div>
      </section>

      {/* Theme Development and Customization */}
      <section className="section theme-development">
        <div className="container">
          <div className="content-with-image">
            <div className="image">
              <img src={WordPressImg} alt="Theme Development" />
            </div>
            <div className="content">
              <h2>Theme Development and Customization</h2>
              <p>
                The visual and functional characteristics of your website are determined by the WordPress theme, which serves as its skin. It is made up of multiple files that work together to control the look and feel of your website.
              </p>

              <p>
                To make websites, our developers primarily use a variety of coding languages and scripts, such as PHP for database connectivity, JavaScript for dynamic content, CSS for visual design, and HTML for structure. The content that WordPress stores is displayed in the browser by themes.
              </p>

              <p>
                The way that content appears and is presented is up to you when you design a WordPress theme. You can choose from a wide range of features while creating your theme. Your imagination is the biggest limit when it comes to Theme Development.
              </p>

              <div className="tech-stack">
                <h3>Technology We Offer</h3>
                <div className="tech-icons">
                  <div className="tech-icon" title="PHP"><FaPhp /></div>
                  <div className="tech-icon" title="HTML"><FaHtml5 /></div>
                  <div className="tech-icon" title="CSS"><FaCss3Alt /></div>
                  <div className="tech-icon" title="JavaScript"><FaJs /></div>
                  <div className="tech-icon" title="React"><FaReact /></div>
                  <div className="tech-icon" title="Vue">Vue</div>
                  <div className="tech-icon" title="Next.js"><SiNextdotjs /></div>
                  <div className="tech-icon" title="MySQL"><FaDatabase /></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WordPress Plugin Development */}
      <section className="section plugin-development">
        <div className="container">
          <div className="content-with-image">
            <div className="image">
              <img src={PluginImg} alt="Plugin Development" />
            </div>
            <div className="content">
              <h2>WordPress Plugin Development and Integration</h2>
              <p>
                The process of developing software extensions, or plugins, for WordPress websites is known as WordPress plugin development. Without altering the core WordPress platform, these plugins introduce new capabilities or change pre existing functionalities.
              </p>
              <p>
                PHP is used to write plugins, which can do a variety of functions like enhancing website performance, integrating social media, and producing unique widgets. They enable users to alter their websites to suit their own requirements and tastes.
              </p>

              <div className="tech-stack">
                <h3>Technology We Offer</h3>
                <div className="tech-icons">
                  <div className="tech-icon" title="MERN Stack">MERN</div>
                  <div className="tech-icon" title="React"><FaReact /></div>
                  <div className="tech-icon" title="PHP"><FaPhp /></div>
                  <div className="tech-icon" title="JavaScript"><FaJs /></div>
                  <div className="tech-icon" title="WordPress"><FaWordpress /></div>
                  <div className="tech-icon" title="Database"><FaDatabase /></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* API Integration */}
      <section className="section api-integration">
        <div className="container">
          <div className="content-with-image">
            <div className="image">
              <img src={APIImg} alt="API Integration" />
            </div>
            <div className="content">
              <h2>API Integration</h2>
              <p>
                "Application programming interface," or API for short, refers to software that allows two or more applications to communicate with one another by exchanging data (messages). An API can be compared to a touch screen or other virtual interface that you can use to send and receive data, read data, and enter data. The internet makes it easy to access web-based APIs.
              </p>

              <p>
                WordPress API integration is the process of utilizing APIs to link WordPress with other programs or systems. By making a portion of an application's data and functionality publicly available, APIs enable communication between other software programs.
              </p>

              <div className="tech-stack">
                <h3>Technology We Offer</h3>
                <div className="tech-icons">
                  <div className="tech-icon" title="PHP"><FaPhp /></div>
                  <div className="tech-icon" title="JavaScript"><FaJs /></div>
                  <div className="tech-icon" title="React"><FaReact /></div>
                  <div className="tech-icon" title="Next.js"><SiNextdotjs /></div>
                  <div className="tech-icon" title="Database"><FaDatabase /></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WordPress Based Maintenance */}
      <section className="section maintenance">
        <div className="container">
          <div className="content-with-image">
            <div className="image">
              <img src={MaintenanceImg} alt="Maintenance" />
            </div>
            <div className="content">
              <h2>WordPress Based Maintenance</h2>
              <p>
                WordPress maintenance includes a variety of activities meant to guarantee a WordPress website's lifespan, security, and seamless operation. WordPress is a dynamic platform that powers millions of websites globally, thus maintaining WordPress sites on a regular basis is essential to their optimal performance.
              </p>

              <p>
                A WordPress website's long-term viability depends on regular maintenance. We make sure your WordPress websites stay safe, effective, and user-friendly by carrying out routine upgrades, backups, security improvements, performance optimization, database maintenance, content management, and monitoring.
              </p>

              <div className="tech-stack">
                <h3>Technology We Offer</h3>
                <div className="tech-icons">
                  <div className="tech-icon" title="WordPress"><FaWordpress /></div>
                  <div className="tech-icon" title="Database"><FaDatabase /></div>
                  <div className="tech-icon" title="Security"><FaCheckCircle /></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section cta-section-large">
        <div className="container">
          <h2>Wanna Build a Stunning WordPress Website?</h2>
          <p>
            From sleek business sites to dynamic eCommerce platforms, Aman Mishra builds custom WordPress solutions tailored to your brand. Let's turn your vision into a high-performing digital experience.
          </p>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="btn-primary-large"
          >
            Let's Create Together →
          </button>
        </div>
      </section>

      {/* Stages on WordPress */}
      <section className="section stages-wordpress">
        <div className="container">
          <h2>Stages on WordPress</h2>
          <p className="stages-subtitle">What procedures do we follow to guarantee that the final product fulfills your vision? Let's see.</p>

          <div className="stages-timeline">
            <div className="stage">
              <div className="stage-icon">📋</div>
              <h3>Design</h3>
              <p>Naturally, a major factor in the success of the website is its visual design and layout. The goal of the design team is to realize the client's vision.</p>
            </div>

            <div className="stage-connector"></div>

            <div className="stage">
              <div className="stage-icon">⚙️</div>
              <h3>Data Migration</h3>
              <p>Sometimes a client can be seeking a fresh WordPress installation or moving from another content management system. In this instance, the development cycle will include data migration.</p>
            </div>

            <div className="stage-connector"></div>

            <div className="stage">
              <div className="stage-icon">🚀</div>
              <h3>Development</h3>
              <p>The active development phase will start as soon as the final designs are accepted. Based on the needs of the client, the developers will create the site's functionality and unique features.</p>
            </div>

            <div className="stage-connector"></div>

            <div className="stage">
              <div className="stage-icon">✓</div>
              <h3>Quality Assurance and User Acceptance Testing</h3>
              <p>The QA and testing phase should start as soon as all development jobs are finished. This is to make sure that everything works properly before launching the website.</p>
            </div>

            <div className="stage-connector"></div>

            <div className="stage">
              <div className="stage-icon">📊</div>
              <h3>Site Launch and Support</h3>
              <p>Every new website will have a different strategy. Additionally, we will offer a support phase to clients for a predetermined amount of time following launch.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section testimonials-section">
        <div className="container">
          <h2>What our customers say about us</h2>
          <p className="testimonials-subtitle">Don't take our word for it. Hear what our clients have to say about us.</p>

          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="quote-mark">"</div>
              <p className="testimonial-text">
                Choosing Aman Mishra to build my WordPress website while I spent time organizing my resources and crafting narratives was undoubtedly the right choice. The end product is a website that looks professional and has all the newest features available. In conclusion, I am overjoyed to have partnered with Aman Mishra.
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">CG</div>
                <div>
                  <div className="author-name">Chandan Goopta</div>
                  <div className="author-company">RAIN</div>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="quote-mark">"</div>
              <p className="testimonial-text">
                Aman Mishra was easy and quick to work with. There were on schedule, had wonderful communication throughout, and created a fantastic WordPress website that was customized to my needs. Extremely happy with their assistance!
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">SD</div>
                <div>
                  <div className="author-name">Samyukta Dawadi</div>
                  <div className="author-company">UWS Nepal</div>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="quote-mark">"</div>
              <p className="testimonial-text">
                The work that Aman Mishra made on my WordPress website was superb. They were punctual, professional, and responsive. The user-friendly design has greatly increased the traffic to my website. I heartily endorse their services!
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">AP</div>
                <div>
                  <div className="author-name">Arsheena Piya</div>
                  <div className="author-company">Piya Plastics</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="section faqs-section">
        <div className="container">
          <h2>What are your curiosities?</h2>

          <div className="faqs-content">
            <div className="faq-image">
              <img src={FAQImg} alt="FAQ Illustration" />
            </div>

            <div className="faq-items">
              {(faqs && faqs.length > 0 ? faqs : DEFAULT_WP_FAQS).map((faq) => (
                <div key={faq._id} className="faq-item">
                  <h3>{faq.question}</h3>
                  <p>{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      <QuotePricingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default WordPressDevelopment;