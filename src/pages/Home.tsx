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
    question: 'What comprehensive services do you offer?',
    answer: 'We provide end-to-end digital solutions from custom web and mobile app development to strategic digital marketing, branding, and growth consulting. All your business needs—delivered by one trusted partner with proven expertise.',
  },
  {
    _id: '2',
    question: 'Can you handle my entire digital presence?',
    answer: 'Absolutely! From UI/UX design and development to SEO, social media management, and brand strategy—we manage your complete digital ecosystem. One team, unified vision, exceptional results.',
  },
  {
    _id: '3',
    question: 'Do you provide digital marketing and social media growth services?',
    answer: 'Yes! Our expert team specializes in social media strategy, content creation, influencer partnerships, PPC campaigns, and SEO. We grow your audience, boost engagement, and drive qualified leads.',
  },
  {
    _id: '4',
    question: 'Do you work with international clients?',
    answer: 'Yes, we proudly serve clients worldwide. Based in Nepal with a global network, we deliver timely support and culturally-aware solutions for businesses everywhere.',
  },
];

function getImageUrl(imagePath?: string): string {
  if (!imagePath) return '';
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  const baseUrl = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace('/api', '') : 'http://localhost:5000';
  if (imagePath.startsWith('/')) {
    return `${baseUrl}${imagePath}`;
  }
  return `${baseUrl}/${imagePath}`;
}

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [recentBlogs, setRecentBlogs] = useState<Blog[]>([]);
  const [loadingBlogs, setLoadingBlogs] = useState(true);
  const [clientLogos, setClientLogos] = useState<ClientLogo[]>([]);
  const [faqs, setFaqs] = useState<FAQ[]>(DEFAULT_FAQS);
  const [heroTitle, setHeroTitle] = useState('Your Digital Growth Partner – Proven Results, Trusted by Leaders');
  const [heroSubtitle, setHeroSubtitle] = useState('Custom web & mobile apps, data-driven marketing, and strategic SEO that deliver real ROI. 5+ years transforming ambitious businesses into digital powerhouses. Let\'s build something remarkable together.');
  const [heroButtonText, setHeroButtonText] = useState('Start Your Free Consultation →');
  const [heroButtonLink, setHeroButtonLink] = useState('/contact');
  const [aboutTitle, setAboutTitle] = useState('Meet Your Full-Stack Digital Expert: Aman Mishra');
  const [aboutSubtitle, setAboutSubtitle] = useState('5+ years of proven expertise spanning full-stack development, SEO mastery, and strategic growth consulting. I\'ve helped 50+ businesses scale revenue, boost online visibility, and dominate their markets. When you work with me, you get a dedicated partner invested in your success—not just a vendor.');
  const [aboutButtonText, setAboutButtonText] = useState('Discover My Story & Approach');
  const [aboutButtonLink, setAboutButtonLink] = useState('/about');
  const [ctaTitle, setCtaTitle] = useState('Ready to Accelerate Your Growth?');
  const [ctaSubtitle, setCtaSubtitle] = useState('Limited availability for new projects this quarter. Let\'s discuss your vision and create a winning strategy today.');
  const [ctaButtonText, setCtaButtonText] = useState('Schedule Your Strategy Call →');

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
        const sections = await adminService.listSections();
        const sectionArray = Array.isArray(sections) ? sections : sections.sections || [];
        
        type Section = { type: string; title?: string; subtitle?: string; buttonText?: string; buttonLink?: string };
        
        const heroSection = sectionArray.find((s: Section) => s.type === 'hero');
        if (heroSection) {
          setHeroTitle(heroSection.title || heroTitle);
          setHeroSubtitle(heroSection.subtitle || heroSubtitle);
          setHeroButtonText(heroSection.buttonText || heroButtonText);
          setHeroButtonLink(heroSection.buttonLink || heroButtonLink);
        }
        
        const aboutSection = sectionArray.find((s: Section) => s.type === 'about');
        if (aboutSection) {
          setAboutTitle(aboutSection.title || aboutTitle);
          setAboutSubtitle(aboutSection.subtitle || aboutSubtitle);
          setAboutButtonText(aboutSection.buttonText || aboutButtonText);
          setAboutButtonLink(aboutSection.buttonLink || aboutButtonLink);
        }
        
        const ctaSection = sectionArray.find((s: Section) => s.type === 'cta');
        if (ctaSection) {
          setCtaTitle(ctaSection.title || ctaTitle);
          setCtaSubtitle(ctaSection.subtitle || ctaSubtitle);
          setCtaButtonText(ctaSection.buttonText || ctaButtonText);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                value: 40,
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
                value: 0.5,
              },
              size: {
                value: { min: 1.5, max: 3 },
              },
              move: {
                enable: true,
                speed: 0.3,
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
              distance: 150,
              color: '#ffffff',
              opacity: 0.4,
              width: 1,
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
              <div className="hero-button-group">
                <Link to={heroButtonLink} className="btn btn-hero">
                  {heroButtonText}
                </Link>
              </div>
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
          <h2 className="clients-title">Trusted by Industry Leaders & Innovators</h2>
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
          <h2 className="section-title">Cutting-Edge Technology Meets Strategic Execution</h2>
          <p className="section-subtitle">
            We combine the latest technologies with proven strategies to deliver solutions that drive real business value. From concept to scale, we're your partner in transformation.
          </p>
          <Link to="/service/web-development-service" className="btn btn-primary">Explore Our Services</Link>
        </div>
      </section>

      {/* Communication Section */}
      <section className="section communication-section">
        <div className="container">
          <h2 className="section-title">Partnership Built on Transparency & Results</h2>
          <p className="section-subtitle">
            We believe in clarity over complexity. Regular updates, honest feedback, and collaborative problem-solving—because your success is a shared responsibility.
          </p>
          <Link to="/contact" className="btn btn-primary">Get In Touch</Link>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section services-grid-section">
        <div className="container">
          <h2 className="section-title">Complete Digital Solutions Under One Roof</h2>
          <p className="section-subtitle">
            Whether you're launching or scaling, we deliver customized solutions across design, development, and marketing. Every service integrated for maximum impact and efficiency.
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
            <p>Don't see exactly what you need?</p>
            <p>We customize solutions for unique business challenges. Schedule a strategic consultation with our experts today.</p>
            <Link to="/contact" className="btn btn-primary" style={{ marginTop: '20px' }}>Schedule Consultation</Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section – Google Reviews */}
      <section className="section testimonials-section">
        <div className="container">
          <h2 className="section-title">Client Success Stories & Reviews</h2>

          <p className="section-subtitle">
            Don't just take our word for it. See what our clients say about their experience working with us and the tangible results we delivered.
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
          <h2 className="section-title">Industry Insights & Strategy Tips</h2>
          <p className="section-subtitle">
            Stay ahead of trends with expert articles on digital strategy, tech innovation, and growth tactics. Actionable insights to power your business forward.
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
                    {post.images && post.images[0] && (
                      <img 
                        src={getImageUrl(post.images[0])} 
                        alt={post.title} 
                        loading="lazy"
                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} 
                      />
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
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle">Quick answers to help you understand how we work and what we can deliver for your business.</p>

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