import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              Connecting Ideas Digitally – We've Done It for 12 Years !
            </h1>
            <p className="hero-subtitle">
              We are deeply committed to delivering exceptional work with unwavering dedication and passion. 
              Our core motto encapsulates our guiding philosophy: "You Dream, We Weave" – turning your visions into reality.
            </p>
            <Link to="/contact" className="btn btn-primary">
              Check Out What We Offer
            </Link>
            <div className="hero-rating">
              <p>Based on 36 reviews</p>
            </div>
          </div>
        </div>
      </section>

      {/* Client Logos */}
      <section className="clients-section">
        <div className="container">
          <div className="clients-grid">
            {['CAN', 'Midas Technologies', '360 Education Logo', 'GIZ', 'Himalayan Glacier', 
              'Hamro Khelkud', 'Green Park Chitwan', 'CEA', 'Maximax Education'].map((client, index) => (
              <div key={index} className="client-logo">
                {client}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section about-section">
        <div className="container">
          <h2 className="section-title">Makura Creations: Best IT Company in Nepal</h2>
          <p className="section-subtitle">
            We're a leading IT company in Nepal, consistently delivering cutting-edge solutions for clients 
            both domestically and internationally. From concept to completion, we tackle your challenges 
            with comprehensive software solutions tailored to your specific needs.
          </p>
          <Link to="/about" className="btn btn-outline">Explore More</Link>
        </div>
      </section>

      {/* Services Section */}
      <section className="section services-section">
        <div className="container">
          <h2 className="section-title">Unleash Innovation. Achieve Excellence. Together</h2>
          <p className="section-subtitle">
            We at Makura Creations are a team fueled by a shared passion for cutting-edge solutions and 
            collaborative success. We leverage the latest IT advancements to empower your business transformation.
          </p>
          <Link to="/service/web-development-service" className="btn btn-primary">Services</Link>
        </div>
      </section>

      {/* Communication Section */}
      <section className="section communication-section">
        <div className="container">
          <h2 className="section-title">Building Success Through Open Communication</h2>
          <p className="section-subtitle">
            At Makura Creations, exceptional results are fueled by exceptional communication. 
            We go beyond great work by fostering a culture of open dialogue and collaboration.
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

      {/* Portfolio Section */}
      <section className="section portfolio-section">
        <div className="container">
          <h2 className="section-title">Release Your Brand's Potential: See Our Design Portfolio</h2>
          <p className="section-subtitle">
            At Makura Creations, we believe great design is a powerful tool for brand growth.
          </p>
          
          <div className="portfolio-grid">
            {['UWS Nepal', 'Lambda Payments', 'CAN', 'Miss Nepal', 'Seed Financial Academy', 'Varicon', 'Nepal Travel Adventure'].map((item, index) => (
              <Link key={index} to={`/portfolio/${item.toLowerCase().replace(/\s+/g, '-')}`} className="portfolio-item">
                <div className="portfolio-image">
                  <div className="portfolio-placeholder">{item}</div>
                </div>
                <h3>{item}</h3>
                <span className="view-site">View Site →</span>
              </Link>
            ))}
          </div>
          
          <div className="text-center" style={{ marginTop: '40px' }}>
            <Link to="/portfolio" className="btn btn-outline">View All Works</Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section testimonials-section">
        <div className="container">
          <h2 className="section-title">Client Success Stories</h2>
          <p className="section-subtitle">Don't take our word for it. Hear what our clients have to say about us.</p>
          
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <p className="testimonial-text">
                "Makura Creations has a different way of thinking and it shows in the work they do. 
                I have been using them for their Digital Marketing services and I have to say, 
                my business has never been better."
              </p>
              <p className="testimonial-author">— IME Travels</p>
            </div>

            <div className="testimonial-card">
              <p className="testimonial-text">
                "When I first came to Makura, I didn't know what exactly was UI/UX and its importance. 
                Fortunately for me, I found Makura Creations. Now my website looks fresh, and also feels easy to use."
              </p>
              <p className="testimonial-author">— Nepal Travel Adventure</p>
            </div>

            <div className="testimonial-card">
              <p className="testimonial-text">
                "Makura Creations were extremely dedicated and experts in their field. 
                The team communicated well and always kept me in the loop. 
                I can recommend Makura Creations wholeheartedly."
              </p>
              <p className="testimonial-author">— Prabas Travel</p>
            </div>

            <div className="testimonial-card">
              <p className="testimonial-text">
                "A big shoutout to Makura Creations for their help and guidance in creating our website. 
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
            {[
              { title: 'Best ChatGPT SEO Agencies To Watch', date: '10, Dec 2025' },
              { title: 'How To Monetize Youtube Channel In Nepal', date: '10, Dec 2025' },
              { title: 'How To Monetize Facebook Page In Nepal', date: '03, Dec 2025' },
              { title: 'SEO Agency in Australia: Proven Strategies', date: '21, Nov 2025' },
              { title: 'Website Development for School', date: '17, Oct 2025' },
              { title: 'AI Chatbot for Website', date: '08, Oct 2025' }
            ].map((post, index) => (
              <Link key={index} to={`/blogs/${post.title.toLowerCase().replace(/\s+/g, '-')}`} className="blog-card">
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
          <p className="section-subtitle">Some common inquiries concerning our company are addressed below.</p>
          
          <div className="faq-grid">
            <div className="faq-item">
              <h3>What services do I get in Makura Creations?</h3>
              <p>Makura Creations has been providing business services from application development to social media management and branding all together so that it becomes easy for you to get your business solution all in one spot.</p>
            </div>

            <div className="faq-item">
              <h3>What services do Makura Creations provide?</h3>
              <p>Makura offers a range of different services ranging from website development, app development, digital marketing and many more.</p>
            </div>

            <div className="faq-item">
              <h3>Does Makura Creations help with social media promotions as well?</h3>
              <p>Yes, Makura Creations also has a talented creative team to help your business grow on social media.</p>
            </div>

            <div className="faq-item">
              <h3>Where is Makura Creations located?</h3>
              <p>
                Makura Creations Pvt Ltd<br />
                Pulchowk, opposite to Machhapuchhre bank<br />
                Lalitpur, Nepal<br />
                Tel: 984-1969727
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
