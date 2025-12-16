import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';
import StartProjectModal from '../components/StartProjectModal';
import Frame1 from '../assets/Frame-1.svg';
import Frame from '../assets/Frame.svg';
import { adminService } from '../services/adminService';
import '../components/HeroSpider.css';
import './Home.css';
import ClientLogo1 from '../assets/Client-Track/1.png';
import ClientLogo2 from '../assets/Client-Track/2.jpg';
import ClientLogo3 from '../assets/Client-Track/3.jpg';
import ClientLogo4 from '../assets/Client-Track/4.jpg';
import ClientLogo5 from '../assets/Client-Track/5.jpg';
import ClientLogo6 from '../assets/Client-Track/6.jpg';
import ClientLogo7 from '../assets/Client-Track/7.jpg';
import ClientLogo8 from '../assets/Client-Track/8.jpg';
import ClientLogo9 from '../assets/Client-Track/9.png'
import ClientLogo10 from '../assets/Client-Track/10.png';
import ClientLogo12 from '../assets/Client-Track/12.jpg';
import ClientLogo13 from '../assets/Client-Track/13.jpg';
import ClientLogo14 from '../assets/Client-Track/14.jpg';
import ClientLogo15 from '../assets/Client-Track/15.jpg';

type Blog = {
  _id: string;
  slug: string;
  images?: string[];
  title: string;
  createdAt: string;
};

type ClientLogo = {
  _id: string;
  name: string;
  imageUrl: string;
};

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

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [recentBlogs, setRecentBlogs] = useState<Blog[]>([]);
  const [loadingBlogs, setLoadingBlogs] = useState(true);
  const [clientLogos, setClientLogos] = useState<ClientLogo[]>([]);
  const [faqs, setFaqs] = useState<FAQ[]>(DEFAULT_FAQS);
  const [heroTitle, setHeroTitle] = useState('Connecting Ideas Digitally – We\'ve Done It for 5 Years!');
  const [heroSubtitle, setHeroSubtitle] = useState('We are deeply committed to delivering exceptional work with unwavering dedication and passion. Our core motto encapsulates our guiding philosophy: "You Dream, We Weave" – turning your visions into reality.');
  const [heroButtonText, setHeroButtonText] = useState('Check Out What We Offer →');
  const [heroButtonLink, setHeroButtonLink] = useState('/contact');
  const [aboutTitle, setAboutTitle] = useState('Aman Mishra: SEO Expert & Software Engineer');
  const [aboutSubtitle, setAboutSubtitle] = useState('With over 4 years of experience as a SEO expert and software engineer, I am a passionate Full Stack Developer, delivering cutting-edge solutions and turning ideas into reality.');
  const [aboutButtonText, setAboutButtonText] = useState('Explore More');
  const [aboutButtonLink, setAboutButtonLink] = useState('/about');
  const [ctaTitle, setCtaTitle] = useState('Ready to Transform Your Digital Presence?');
  const [ctaSubtitle, setCtaSubtitle] = useState('Let\'s discuss your project');
  const [ctaButtonText, setCtaButtonText] = useState('Start your project →');

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogs = await adminService.listBlogs();
        setRecentBlogs(blogs.slice(0, 6));
      } catch (error) {
        console.error('Failed to fetch blogs:', error);
      } finally {
        setLoadingBlogs(false);
      }
    };
    
    const fetchClients = async () => {
      try {
        const logos = await adminService.listClientLogos();
        setClientLogos(logos);
      } catch (error) {
        console.error('Failed to fetch client logos:', error);
      }
    };

    const fetchHomepageContent = async () => {
      try {
        const content = await adminService.getHomepageSections();
        if (content.hero) {
          setHeroTitle(content.hero.title || heroTitle);
          setHeroSubtitle(content.hero.subtitle || heroSubtitle);
          setHeroButtonText(content.hero.buttonText || heroButtonText);
          setHeroButtonLink(content.hero.buttonLink || heroButtonLink);
        }
        if (content.about) {
          setAboutTitle(content.about.title || aboutTitle);
          setAboutSubtitle(content.about.subtitle || aboutSubtitle);
          setAboutButtonText(content.about.buttonText || aboutButtonText);
          setAboutButtonLink(content.about.buttonLink || aboutButtonLink);
        }
        if (content.cta) {
          setCtaTitle(content.cta.title || ctaTitle);
          setCtaSubtitle(content.cta.subtitle || ctaSubtitle);
          setCtaButtonText(content.cta.buttonText || ctaButtonText);
        }
      } catch (error) {
        console.error('Failed to fetch homepage content:', error);
      }
    };

    const fetchFAQs = async () => {
      try {
        const faqData = await adminService.listFAQs();
        const faqs = Array.isArray(faqData) ? faqData : (faqData?.faqs || []);
        console.log('FAQ Data fetched:', faqs);
        // If we have FAQs from the database, use them; otherwise use defaults
        if (faqs.length > 0) {
          setFaqs(faqs);
        } else {
          setFaqs(DEFAULT_FAQS);
        }
      } catch (error) {
        console.error('Failed to fetch FAQs, using defaults:', error);
        // Always use default FAQs on error
        setFaqs(DEFAULT_FAQS);
      }
    };

    fetchBlogs();
    fetchClients();
    fetchHomepageContent();
    fetchFAQs();
  }, []);

  return (
    <div className="home">
      <StartProjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Hero Section */}
      <section className="hero">
        <Particles
          id="tsparticles"
          init={loadSlim}
          options={{
            fullScreen: false,
            background: {
              color: {
                value: 'transparent',
              },
            },
            fpsLimit: 60,
            particles: {
              number: {
                value: 80,
                density: {
                  enable: false,
                },
              },
              color: {
                value: '#ffffff',
              },
              shape: {
                type: 'circle',
              },
              opacity: {
                value: 0.6,
              },
              size: {
                value: { min: 2, max: 4 },
              },
              move: {
                enable: true,
                speed: 0.5,
                direction: 'none',
                outModes: {
                  default: 'bounce',
                },
              },
            },
            interactivity: {
              events: {
                onHover: {
                  enable: true,
                  mode: 'grab',
                },
                onClick: {
                  enable: true,
                  mode: 'push',
                },
              },
              modes: {
                grab: {
                  distance: 200,
                  line_linked: {
                    opacity: 0.8,
                    color: '#ffffff',
                    width: 2,
                  },
                },
                push: {
                  quantity: 4,
                },
              },
            },
            links: {
              enable: true,
              distance: 180,
              color: '#ffffff',
              opacity: 0.5,
              width: 1.5,
            },
          }}
          className="hero-particles"
        />
        <div className="container">
          <div className="hero-wrapper">
            <div className="hero-content">
              <h1 className="hero-title">
                {heroTitle}
              </h1>
              <p className="hero-subtitle">
                {heroSubtitle}
              </p>
              <Link to={heroButtonLink} className="btn btn-hero">
                {heroButtonText}
              </Link>
              {/* Elfsight Google Reviews | Untitled Google Reviews */}
              <div className="hero-badges">
                <div
                  className="elfsight-app-6a832851-97dd-4d75-9616-d8e049dd1f71"
                  data-elfsight-app-lazy
                ></div>
              </div>
              <script src="https://elfsightcdn.com/platform.js" async></script>
            </div>
            <div className="hero-graphic">
            </div>
          </div>
        </div>
      </section>

      {/* Top Banner Section with Scrolling Images */}
      <section className="bg-secondary background-dark py-80 HOME TOP-BANNER-SECTION">
        <div className="container">
          <div className="row align-items-center">
            {/* Scrolling Images - moved to be a direct child of row, before the column */}
            <div className=""></div>
            <div className="col-lg-6 col-md-6 col-12 mx-auto order-md-2">
              {/* Content column */}
            </div>
          </div>
        </div>
      </section>

      {/* Client Logos */}
      <section className="clients-section">
        <div className="container">
          <h2 className="clients-title">Our Trusted Clients</h2>
          <div className="clients-carousel">
            {(() => {
              const staticLogos = [
                ClientLogo1,
                ClientLogo2,
                ClientLogo3,
                ClientLogo4,
                ClientLogo5,
                ClientLogo6,
                ClientLogo7,
                ClientLogo8,
                ClientLogo9,
                ClientLogo10,
                ClientLogo12,
                ClientLogo13,
                ClientLogo14,
                ClientLogo15,
              ];
              const dynamicLogos = clientLogos.map((c) => c.imageUrl);
              // Show newly added (dynamic) first, then static as fallback
              const allLogos = [...dynamicLogos, ...staticLogos];
              // Duplicate sequence so CSS translateX(-50%) loop is seamless
              const loopedLogos = [...allLogos, ...allLogos];

              return (
                <>
                  <div className="clients-track">
                    {loopedLogos.map((logo, index) => (
                      <div key={index} className="client-logo">
                        <img src={logo} alt={`Client ${index + 1}`} />
                      </div>
                    ))}
                  </div>
                  <div className="clients-track1">
                    {loopedLogos.map((logo, index) => (
                      <div key={index} className="client-logo">
                        <img src={logo} alt={`Client ${index + 1}`} />
                      </div>
                    ))}
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section about-section">
        <div className="container">
          <h2 className="section-title">{aboutTitle}</h2>
          <p className="section-subtitle">
            {aboutSubtitle}
          </p>
          <Link to={aboutButtonLink} className="btn btn-outline">{aboutButtonText}</Link>
        </div>
      </section>

      {/* Services Section */}
      <section className="section services-section">
        <div className="container">
          <h2 className="section-title">Unleash Innovation. Achieve Excellence. Together</h2>
          <p className="section-subtitle">
            I am fueled by a shared passion for cutting-edge solutions and collaborative success. I leverage the latest IT advancements to empower your business transformation.
          </p>
          <Link to="/service/web-development-service" className="btn btn-primary">Services</Link>
        </div>
      </section>

      {/* Communication Section */}
      <section className="section communication-section">
        <div className="container">
          <h2 className="section-title">Building Success Through Open Communication</h2>
          <p className="section-subtitle">
            For me, exceptional results are fueled by exceptional communication. I go beyond great work by fostering a culture of open dialogue and collaboration.
          </p>
          <Link to="/contact" className="btn btn-primary">Contact Us</Link>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section services-grid-section">
        <div className="container">
          <h2 className="section-title">Your Chosen IT Company for Digital Transformation</h2>
          <p className="section-subtitle">
            Setting out on the journey of starting a business or navigating the growth path of a company,
            you can rely on us to provide tailored solutions that perfectly match your goals.
          </p>

          <div className="services-grid">
            <div className="service-card">
              <h3>Branding and Design</h3>
              <ul>
                <li>Logo</li>
                <li>Brand Guidelines</li>
                <li>Infographics</li>
                <li>Packaging</li>
                <li>Banner</li>
                <li>Mockup</li>
                <li>Icon</li>
                <li>Booklet</li>
                <li>Social Media</li>
                <li>Print Media</li>
                <li>Email Signature</li>
                <li>Sketch</li>
                <li>Short Videos</li>
                <li>Reels</li>
                <li>2D/3D Video</li>
              </ul>
            </div>

            <div className="service-card">
              <h3>Web & Mobile App Development</h3>
              <ul>
                <li>UI/UX</li>
                <li>Front-End Development</li>
                <li>App</li>
                <li>Angular & React</li>
                <li>WordPress</li>
                <li>CMS</li>
                <li>Laravel</li>
                <li>Dashboard</li>
                <li>Landing Page</li>
                <li>Websites</li>
                <li>Flutter</li>
                <li>Responsive</li>
                <li>Design System</li>
              </ul>
            </div>

            <div className="service-card">
              <h3>Marketing and Promotions</h3>
              <ul>
                <li>Social Media Marketing</li>
                <li>SEO</li>
                <li>PPC</li>
                <li>Content</li>
                <li>SEM</li>
                <li>Email Marketing</li>
                <li>Content/Copy Writing</li>
                <li>Influencers</li>
                <li>Affiliate Marketing</li>
                <li>Consultation</li>
                <li>SMS Campaigns</li>
                <li>Lead Generation</li>
              </ul>
            </div>
          </div>

          <div className="text-center" style={{ marginTop: '40px' }}>
            <p>Not listed here?</p>
            <p>Request a consultation and comprehensive planning session with our expert team.</p>
            <Link to="/contact" className="btn btn-primary" style={{ marginTop: '20px' }}>Contact Us</Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section – Google Reviews */}
      <section className="section testimonials-section">
        <div className="container">
          <h2 className="section-title">What Our Clients Say</h2>

          <p className="section-subtitle">
            Real feedback from our customers on Google, sharing their experience,
            satisfaction, and trust in our services.
          </p>

          <div className="elfsight-widget-wrapper">
            <div
              className="elfsight-app-d5c13747-028a-4c96-a155-0362e916a3a4"
              data-elfsight-app-lazy
            ></div>
          </div>
        </div>
      </section>


      {/* Blog Section */}
      <section className="section blog-section">
        <div className="container">
          <h2 className="section-title">Blogs</h2>
          <p className="section-subtitle">
            Keep up to date with the industry and gain insights into the field through our educational blog posts.
          </p>

          <div className="blog-grid">
            {loadingBlogs ? (
              Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="blog-card shimmer">
                  <div className="blog-image"></div>
                  <div className="blog-content">
                    <span className="blog-date"></span>
                    <h3></h3>
                    <span className="read-more"></span>
                  </div>
                </div>
              ))
            ) : recentBlogs.length > 0 ? (
              recentBlogs.map((post) => (
                <Link key={post._id} to={`/blogs/${post.slug}`} className="blog-card">
                  <div className="blog-image">
                    {post.images && post.images[0] ? (
                      <img src={post.images[0]} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <div className="blog-placeholder">Blog Image</div>
                    )}
                  </div>
                  <div className="blog-content">
                    <span className="blog-date">{new Date(post.createdAt).toLocaleDateString()}</span>
                    <h3>{post.title}</h3>
                    <span className="read-more">Read More →</span>
                  </div>
                </Link>
              ))
            ) : (
              <div style={{ textAlign: 'center', gridColumn: '1 / -1', padding: '40px' }}>
                <p>No blogs published yet</p>
              </div>
            )}
          </div>

          <div className="text-center" style={{ marginTop: '40px' }}>
            <Link to="/blogs" className="btn btn-outline">View All Blogs</Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section faq-section">
        <div className="container">
          <h2 className="section-title">The Help Section</h2>
          <p className="section-subtitle">Some common inquiries concerning my services are addressed below.</p>

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

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-wrapper">
          <div className="cta-frame-left">
            <img src={Frame} alt="Team left" className="frame-image" />
          </div>

          <div className="cta-content">
            <h2 className="cta-title">{ctaTitle}</h2>
            <p style={{ fontSize: '16px', marginBottom: '20px', color: '#fff' }}>{ctaSubtitle}</p>
            <div className="cta-button-wrapper">
              <button
                onClick={() => setIsModalOpen(true)}
                className="cta-link"
              >
                {ctaButtonText}
              </button>
            </div>
          </div>

          <div className="cta-frame-right">
            <img src={Frame1} alt="Team right" className="frame-image" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;