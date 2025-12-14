import { useState } from 'react';
import { Link } from 'react-router-dom';
import HeroSpider from '../components/HeroSpider';
import StartProjectModal from '../components/StartProjectModal';
import Frame1 from '../assets/Frame-1.svg';
import Frame from '../assets/Frame.svg';
import { getRecentBlogPosts } from '../data/blogData';
import '../components/HeroSpider.css';
import './Home.css';
import ClientLogo1 from '../assets/Client-Track/1.png';
import ClientLogo2 from '../assets/Client-Track/2.jpg';
import ClientLogo3 from '../assets/Client-Track/3.jpg';
import ClientLogo4 from '../assets/Client-Track/4.jpg';
import ClientLogo5 from '../assets/Client-Track/5.jpg';
import ClientLogo6 from '../assets/Client-Track/6.jpg';
import ClientLogo7 from '../assets/Client-Track/7.jpg';

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="home">
      <StartProjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      
      {/* Hero Section */}
      <section className="hero">
        <HeroSpider />
        <div className="container">
          <div className="hero-wrapper">
            <div className="hero-content">
              <h1 className="hero-title">
                Connecting Ideas Digitally – We've Done It for <span className="highlight">5 Years</span> !
              </h1>
              <p className="hero-subtitle">
                We are deeply committed to delivering exceptional work with unwavering dedication and passion. 
                Our core motto encapsulates our guiding philosophy: "You Dream, We Weave" – turning your visions into reality.
              </p>
              <Link to="/contact" className="btn btn-hero">
                Check Out What We Offer →
              </Link>
              <div className="hero-badges">
                <div className="review-badge clutch-badge">
                  <div className="badge-header">REVIEWED ON</div>
                  <div className="badge-brand-clutch">
                    <span className="clutch-logo">Clutch</span>
                  </div>
                  <div className="badge-stars">
                    <span className="star red">★</span>
                    <span className="star red">★</span>
                    <span className="star red">★</span>
                    <span className="star red">★</span>
                    <span className="star red">★</span>
                  </div>
                  <div className="badge-reviews">11 REVIEWS</div>
                </div>
                <div className="review-badge google-badge">
                  <div className="badge-brand-google">
                    <span className="google-logo">Google</span>
                  </div>
                  <div className="badge-stars google-stars">
                    <span className="star yellow">★</span>
                    <span className="star yellow">★</span>
                    <span className="star yellow">★</span>
                    <span className="star yellow">★</span>
                    <span className="star yellow half">★</span>
                  </div>
                  <div className="badge-reviews-google">
                    Based on <span className="underline-green">36 reviews</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="hero-graphic">
              <svg viewBox="0 0 400 400" className="hero-svg" xmlns="http://www.w3.org/2000/svg">
                {/* Animated background circles */}
                <circle cx="200" cy="200" r="180" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2"/>
                <circle cx="200" cy="200" r="130" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="2"/>
                <circle cx="200" cy="200" r="80" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2"/>

                {/* Central node */}
                <circle cx="200" cy="200" r="15" fill="rgba(255,255,255,0.9)" className="center-node"/>

                {/* Connected nodes */}
                <circle cx="200" cy="100" r="10" fill="rgba(255,255,255,0.8)" className="node"/>
                <circle cx="270" cy="140" r="10" fill="rgba(255,255,255,0.8)" className="node"/>
                <circle cx="300" cy="200" r="10" fill="rgba(255,255,255,0.8)" className="node"/>
                <circle cx="270" cy="260" r="10" fill="rgba(255,255,255,0.8)" className="node"/>
                <circle cx="200" cy="300" r="10" fill="rgba(255,255,255,0.8)" className="node"/>
                <circle cx="130" cy="260" r="10" fill="rgba(255,255,255,0.8)" className="node"/>
                <circle cx="100" cy="200" r="10" fill="rgba(255,255,255,0.8)" className="node"/>
                <circle cx="130" cy="140" r="10" fill="rgba(255,255,255,0.8)" className="node"/>

                {/* Connection lines */}
                <line x1="200" y1="200" x2="200" y2="100" stroke="rgba(255,255,255,0.4)" strokeWidth="2" className="line"/>
                <line x1="200" y1="200" x2="270" y2="140" stroke="rgba(255,255,255,0.4)" strokeWidth="2" className="line"/>
                <line x1="200" y1="200" x2="300" y2="200" stroke="rgba(255,255,255,0.4)" strokeWidth="2" className="line"/>
                <line x1="200" y1="200" x2="270" y2="260" stroke="rgba(255,255,255,0.4)" strokeWidth="2" className="line"/>
                <line x1="200" y1="200" x2="200" y2="300" stroke="rgba(255,255,255,0.4)" strokeWidth="2" className="line"/>
                <line x1="200" y1="200" x2="130" y2="260" stroke="rgba(255,255,255,0.4)" strokeWidth="2" className="line"/>
                <line x1="200" y1="200" x2="100" y2="200" stroke="rgba(255,255,255,0.4)" strokeWidth="2" className="line"/>
                <line x1="200" y1="200" x2="130" y2="140" stroke="rgba(255,255,255,0.4)" strokeWidth="2" className="line"/>
              </svg>
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
            <div className="clients-track">
              {[ClientLogo1, ClientLogo2, ClientLogo3, ClientLogo4, ClientLogo5, ClientLogo6, ClientLogo7, ClientLogo1, ClientLogo2, ClientLogo3, ClientLogo4, ClientLogo5, ClientLogo6, ClientLogo7 ].map((client, index) => (
                <div key={index} className="client-logo">
                  <img src={client} alt={`Client ${index + 1}`} />
                </div>
              ))}
            </div>
             <div className="clients-track1">
              {[ClientLogo1, ClientLogo2, ClientLogo3, ClientLogo4, ClientLogo5, ClientLogo6, ClientLogo7, ClientLogo1, ClientLogo2, ClientLogo3, ClientLogo4, ClientLogo5, ClientLogo6, ClientLogo7].map((client, index) => (
                <div key={index} className="client-logo">
                  <img src={client} alt={`Client ${index + 1}`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section about-section">
        <div className="container">
          <h2 className="section-title">Aman Mishra: SEO Expert & Software Engineer</h2>
          <p className="section-subtitle">
            With over 4 years of experience as a SEO expert and software engineer, I am a passionate Full Stack Developer, delivering cutting-edge solutions and turning ideas into reality. From concept to completion, I tackle challenges with comprehensive software solutions tailored to specific needs.
          </p>
          <Link to="/about" className="btn btn-outline">Explore More</Link>
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

      {/* Testimonials Section */}
      <section className="section testimonials-section">
        <div className="container">
          <h2 className="section-title">Client Success Stories</h2>
          <p className="section-subtitle">Don't take my word for it. Hear what our clients have to say about me.</p>
          
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <p className="testimonial-text">
                "Aman has a different way of thinking and it shows in the work they do. 
                I have been using them for their Digital Marketing services and I have to say, 
                my business has never been better."
              </p>
              <p className="testimonial-author">— IME Travels</p>
            </div>

            <div className="testimonial-card">
              <p className="testimonial-text">
                "When I first came to Aman, I didn't know what exactly was UI/UX and its importance. 
                Fortunately for me, I found Aman. Now my website looks fresh, and also feels easy to use."
              </p>
              <p className="testimonial-author">— Nepal Travel Adventure</p>
            </div>

            <div className="testimonial-card">
              <p className="testimonial-text">
                "Aman was extremely dedicated and an expert in his field. 
                The team communicated well and always kept me in the loop. 
                I can recommend Aman wholeheartedly."
              </p>
              <p className="testimonial-author">— Prabas Travel</p>
            </div>

            <div className="testimonial-card">
              <p className="testimonial-text">
                "A big shoutout to Aman for their help and guidance in creating our website. 
                The website itself was smooth, unique and had more elements which made it fun to use."
              </p>
              <p className="testimonial-author">— Cricket Association of Nepal</p>
            </div>
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
            {getRecentBlogPosts(6).map((post, index) => (
              <Link key={index} to={`/blogs/${post.slug}`} className="blog-card">
                <div className="blog-image">
                  <div className="blog-placeholder">Blog Image</div>
                </div>
                <div className="blog-content">
                  <span className="blog-date">{post.date}</span>
                  <h3>{post.title}</h3>
                  <span className="read-more">Read More →</span>
                </div>
              </Link>
            ))}
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
            <div className="faq-item">
              <h3>What services do I get from Aman Mishra?</h3>
              <p>I provide business services from application development to social media management and branding all together so that it becomes easy for you to get your business solution all in one spot.</p>
            </div>

            <div className="faq-item">
              <h3>What services do I provide?</h3>
              <p>I offer a range of different services ranging from website development, app development, digital marketing and many more.</p>
            </div>

            <div className="faq-item">
              <h3>Do you help with social media promotions as well?</h3>
              <p>Yes, I also have a talented creative team to help your business grow on social media.</p>
            </div>

            <div className="faq-item">
              <h3>Where are you located?</h3>
              <p>
                I am based in Nepal, but I work with clients from all over the world.
              </p>
            </div>
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
            <h2 className="cta-title">Your vision, our expertise. Let's create something amazing together.</h2>
            <div className="cta-button-wrapper">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="cta-link"
              >
                Start a project
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