import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaChartLine, FaMapMarkerAlt, FaSpellCheck, FaEye, FaFileWord } from 'react-icons/fa';
import { SiGoogleads, SiOpenai, SiGoogle } from 'react-icons/si';
import QuotePricingModal from '../../components/QuotePricingModal';
import { adminService } from '../../services/adminService';
import Frame from '../../assets/Frame.svg';
import Frame1 from '../../assets/Frame-1.svg';

// Import SEO images in sequence
import SEOHeroImg from '../../assets/Seo/1.svg';
import KeywordResearchImg from '../../assets/Seo/2.svg';
import ContentAnalysisImg from '../../assets/Seo/3.png';
import OnPageSEOImg from '../../assets/Seo/4.png';
import OffPageSEOImg from '../../assets/Seo/5.png';
import LocalSEOImg from '../../assets/Seo/6.png';
import TechnicalSEOImg from '../../assets/Seo/7.svg';
import AEOImg from '../../assets/Seo/8.svg';
import FAQImg from '../../assets/Seo/9.svg';
// Images 9.svg and 10.svg are available for Stages and Works sections if needed
import './ServicePage.css';

const faqsData = [
  {
    question: "What is SEO and why is it important for my business in Nepal?",
    answer: "SEO, or Search Engine Optimization, is the practice of optimizing your website to rank higher in search engine results. For businesses in Nepal, SEO is crucial because it increases online visibility, attracts targeted local customers, and builds credibility. A strong SEO strategy helps you stand out from the competition and drives organic traffic, which is essential for sustainable growth in the digital market."
  },
  {
    question: "How long does it take to see results from SEO?",
    answer: "SEO is a long-term strategy, and results can vary based on factors like your industry, competition, and the current state of your website. Typically, you can expect to see noticeable improvements in rankings and traffic within 3 to 6 months. However, the most significant and lasting results come from consistent, ongoing optimization efforts."
  },
  {
    question: "What is the difference between on-page and off-page SEO?",
    answer: "On-page SEO involves optimizing elements on your website, such as content, keywords, meta tags, and site structure, to make it more search engine-friendly. Off-page SEO, on the other hand, focuses on building your website’s authority and reputation through external signals, like backlinks from other reputable sites, social media engagement, and local listings. Both are essential for a comprehensive SEO strategy."
  },
  {
    question: "Can I do SEO myself, or should I hire a professional?",
    answer: "While you can learn the basics of SEO, it’s a complex and ever-changing field. Hiring a professional SEO service in Nepal ensures that you have an expert dedicated to implementing the latest strategies and best practices. A professional can conduct in-depth analysis, manage technical aspects, and create a tailored strategy to help you achieve your business goals more effectively, saving you time and delivering better results."
  }
];

type PageFAQ = {
  _id: string;
  question: string;
  answer: string;
};

type PagePortfolio = {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  websiteUrl: string;
};

const SEOService = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(0);
  const [faqs, setFaqs] = useState<PageFAQ[]>([]);
  const [portfolios, setPortfolios] = useState<PagePortfolio[]>([]);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const data = await adminService.getFAQsByPage('seo-service');
        const faqList = Array.isArray(data) ? data : (data?.faqs || []);
        if (faqList.length > 0) {
          setFaqs(faqList);
        }
      } catch (error) {
        console.error('Failed to fetch FAQs:', error);
      }
    };
    
    const fetchPortfolios = async () => {
      try {
        const data = await adminService.getPortfoliosByPage('seo-service');
        const portfolioList = Array.isArray(data) ? data : [];
        if (portfolioList.length > 0) {
          setPortfolios(portfolioList);
        }
      } catch (error) {
        console.error('Failed to fetch portfolios:', error);
      }
    };
    
    fetchFAQs();
    fetchPortfolios();
  }, []);

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  return (
    <div className="service-page">
      {/* Breadcrumb */}
      <nav className="breadcrumb">
        <div className="breadcrumb-content">
          <Link to="/">Home</Link>
          <span className="separator">•</span>
          <Link to="/">Services</Link>
          <span className="separator">•</span>
          <span>Search Engine Optimization (SEO)</span>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="service-hero wp-hero">
        <div className="container hero-content">
          <div className="hero-text">
            <h1>SEO Service in Nepal</h1>
            <p>
              Boost your online presence and drive organic traffic with <span style={{ color: '#ffffff', fontWeight: 'bold' }}>Aman Mishra SEO Expert in Nepal</span>. Our tailored SEO strategies are designed to enhance your website's visibility on search engines, helping your business reach its target audience effectively. Let us help you climb the search rankings and achieve sustainable growth.
            </p>
            <button className="btn-cta"><a href="/contact">Inquiry Now →</a></button>
          </div>
          <div className="hero-image">
            <img src={SEOHeroImg} alt="SEO Service" />
          </div>
        </div>
      </section>

      {/* Services We Offer */}
      <section className="section services-offer">
        <div className="container">
          <h2 className="section-title">SEO Services We Offer</h2>
          <p className="section-subtitle">
            Imagine customers searching for exactly what you offer, but never finding your website. SEO (Search Engine Optimization) changes that. It's all about driving relevant traffic to your website through organic search results.
          </p>

          <p className="service-description">
            By strategically using relevant keywords and creating high-quality content, SEO helps your website rank higher on search engines, putting you in front of the right people at the right time. This translates into a surge of organic traffic, the lifeblood of any online business.
          </p>

          <p className="service-description">
            But it's not just about stuffing your content with keywords anymore. Today's SEO focuses on relevance and user intent. The right keywords will help your website rank higher in search results, driving organic traffic and boosting your online presence.
          </p>

          <p className="service-description">
            Don't get lost in the digital noise—partner with Aman Mishra to leverage SEO service in Nepal, get your website seen, and achieve your business goals.
          </p>
        </div>
      </section>

      {/* Keyword Research Section */}
      <section className="section custom-wordpress">
        <div className="container">
          <div className="content-with-image">
            <div className="content">
              <h2>Keyword Research</h2>
              <p>
                Keywords used to be the golden ticket in SEO, but the game has evolved. While they remain important, it's all about using them strategically.
              </p>
              <p>
                Here's the key: thorough research and thoughtful selection. Keywords are the terms people use to search online, and by using the right ones, you can connect with potential customers actively looking for what you offer. But it's not just about stuffing your content with keywords anymore. Today's SEO focuses on relevance and user intent.
              </p>
              <p>
                The right keywords will help your website rank higher in search results, driving organic traffic and boosting your online presence.
              </p>

              <div className="tech-stack">
                <h3>Technology We Offer</h3>
                <div className="tech-logos">
                  <div className="tech-logo-item">
                    <div className="tech-logo semrush">
                      <FaChartLine className="tech-icon-svg" />
                      <span>SEMRUSH</span>
                    </div>
                  </div>
                  <div className="tech-logo-item">
                    <div className="tech-logo google-ads">
                      <SiGoogleads className="tech-icon-svg" />
                      <span>Google Ads<br />KEYWORD PLANNER</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="image">
              <img src={KeywordResearchImg} alt="Keyword Research" />
            </div>
          </div>
        </div>
      </section>

      {/* Content Analysis Section */}
      <section className="section theme-development">
        <div className="container">
          <div className="content-with-image">
            <div className="image">
              <img src={ContentAnalysisImg} alt="Content Analysis" />
            </div>
            <div className="content">
              <h2>Content Analysis</h2>
              <p>
                Content is the cornerstone of any winning SEO strategy. It's the captivating force that connects with your audience and fuels your website's visibility.
              </p>
              <p>
                Think of it like this: you need to understand your audience and tailor your content to resonate with them. For example, an e-commerce store could create blog posts highlighting product benefits, addressing competitor comparisons, and offering valuable insights. This informative content positions you as a thought leader, attracts potential customers searching for answers, and ultimately positions your website as the go-to destination when they're ready to buy.
              </p>
              <p>
                But forget dry, keyword-stuffed content! Modern SEO demands engaging, shareable content that educates, entertains, and keeps your audience coming back for more. This positions you as an authority in your field, builds trust with search engines, and ensures your content stays ahead of the curve and thrives in the ever-evolving SEO landscape.
              </p>

              <div className="tech-stack">
                <h3>Technology We Offer</h3>
                <div className="tech-logos">
                  <div className="tech-logo-item">
                    <div className="tech-logo semrush">
                      <FaChartLine className="tech-icon-svg" />
                      <span>SEMRUSH</span>
                    </div>
                  </div>
                  <div className="tech-logo-item">
                    <div className="tech-logo google-ads">
                      <SiGoogleads className="tech-icon-svg" />
                      <span>Google Ads<br />KEYWORD PLANNER</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* On Page SEO Section */}
      <section className="section plugin-development">
        <div className="container">
          <div className="content-with-image">
            <div className="image">
              <img src={OnPageSEOImg} alt="On Page SEO" />
            </div>
            <div className="content">
              <h2>On Page SEO</h2>
              <p>
                Ever wondered why some particular websites always manage to make it to the top of search engine results pages? Well, all this is about page SEO, an ingredient that's crucial to making anything visible online. We can get our website to the top ranking of the result pages with smart on-page SEO strategies.
              </p>
              <p>
                On-page SEO, also called on-site SEO, refers to the optimization of web pages to enhance the ranking of a website in search engines and organic traffic.
              </p>
              <p>
                Furthermore, on-page SEO includes the optimization of your headlines, title, meta, and header HTML tags, and images, in addition to publishing high-quality relevant content. This will also mean your website demonstrates expertise, authoritativeness, and trustworthiness in high measures.
              </p>

              <div className="tech-stack">
                <h3>Technology We Offer</h3>
                <div className="tech-logos">
                  <div className="tech-logo-item">
                    <div className="tech-logo word">
                      <FaFileWord className="tech-icon-svg" />
                    </div>
                  </div>
                  <div className="tech-logo-item">
                    <div className="tech-logo grammarly">
                      <FaSpellCheck className="tech-icon-svg" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Off-Page SEO Section */}
      <section className="section api-integration">
        <div className="container">
          <div className="content-with-image">
            <div className="content">
              <h2>Off-Page SEO</h2>
              <p>
                SEO isn't just about what happens on your website. Off-page SEO focuses on external factors that boost your website's authority and credibility in the eyes of search engines.
              </p>
              <p>
                Here's how it works: backlinks. These are links from other websites that point back to yours. The more high-quality backlinks you have, the more valuable and trustworthy search engines perceive your site to be.
              </p>

              <div className="tech-stack">
                <h3>Technology We Offer</h3>
                <div className="tech-logos">
                  <div className="tech-logo-item">
                    <div className="tech-logo semrush">
                      <FaChartLine className="tech-icon-svg" />
                      <span>SEMRUSH</span>
                    </div>
                  </div>
                  <div className="tech-logo-item">
                    <div className="tech-logo ubersuggest">
                      <FaSearch className="tech-icon-svg" />
                      <span>UberSuggest</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="image">
              <img src={OffPageSEOImg} alt="Off-Page SEO" />
            </div>
          </div>
        </div>
      </section>

      {/* Local SEO Service Section */}
      <section className="section maintenance">
        <div className="container">
          <div className="content-with-image">
            <div className="image">
              <img src={LocalSEOImg} alt="Local SEO" />
            </div>
            <div className="content">
              <h2>Local SEO Service</h2>
              <p>
                The mobile revolution has made local SEO a must-have. With 60% of searches conducted on mobile devices, and nearly half local-focused, you need to be seen by nearby customers. Local SEO tailors your website for local searches. Target local keywords, claim your listings on directories, create location-specific pages, optimize for mobile, and utilize Google My Business for Google Maps presence and customer reviews.
              </p>
              <p>
                Mastering local SEO transforms local searches into loyal customers, ensuring your business appears when people search for what you offer in your area.
              </p>

              <div className="tech-stack">
                <h3>Technology We Offer</h3>
                <div className="tech-logos">
                  <div className="tech-logo-item">
                    <div className="tech-logo gmb">
                      <FaMapMarkerAlt className="tech-icon-svg" />
                      <span>GMBEverywhere.com</span>
                    </div>
                  </div>
                  <div className="tech-logo-item">
                    <div className="tech-logo brightlocal">
                      <FaMapMarkerAlt className="tech-icon-svg" />
                      <span>brightlocal</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical SEO Section */}
      <section className="section custom-wordpress">
        <div className="container">
          <div className="content-with-image">
            <div className="content">
              <h2>Technical SEO</h2>
              <p>
                Technical SEO is the practice of bringing a website up to the technical standards of modern search engines, improving its organic rankings through crawling, indexing, and rendering processes, among other architectural elements.
              </p>
              <p>
                You may have the best website and even the best content, but if your technical SEO is all wrong, you simply will not rank. Fundamentally, search engines like Google find pages on your site, crawl and render them, then index. Technical SEO involves optimizing your website so that search engines can crawl, understand, and index these pages more effectively. This process enhances both visibility and rankings on search engines.
              </p>
              <p>
                For businesses in Nepal, partnering with an SEO agency in Nepal can ensure your website meets the latest technical SEO standards. An experienced agency understands the local and global SEO landscape, offering tailored solutions to help your site achieve better performance and reach its target audience effectively.
              </p>

              <div className="tech-stack">
                <h3>Technology We Offer</h3>
                <div className="tech-logos">
                  <div className="tech-logo-item">
                    <div className="tech-logo google-ads">
                      <SiGoogleads className="tech-icon-svg" />
                      <span>Google Ads<br />KEYWORD PLANNER</span>
                    </div>
                  </div>
                  <div className="tech-logo-item">
                    <div className="tech-logo spyfu">
                      <FaEye className="tech-icon-svg" />
                      <span>SpyFu</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="image">
              <img src={TechnicalSEOImg} alt="Technical SEO" />
            </div>
          </div>
        </div>
      </section>

      {/* Answering Engine Optimization (AEO) Section */}
      <section className="section theme-development">
        <div className="container">
          <div className="content-with-image">
            <div className="image">
              <img src={AEOImg} alt="AEO" />
            </div>
            <div className="content">
              <h2>Answering Engine Optimization (AEO)</h2>
              <p>
                In today's world of digitization, users want speed and accuracy, and that too now. This is where AEO comes in: the strategy at the forefront of making your content understandable for AI-powered systems, helping your business stand out both on search engine results pages and AI-driven platforms like ChatGPT, Google Gemini, Microsoft Copilot.
              </p>
              <p>
                But why is AEO so important? With the rise of voice assistants, smart devices, and AI-driven tools, people are looking to their devices for instant answers. Be it a simple Google query or a question asked through Siri, users are looking for content that answers their needs. AEO makes sure your content is structured in such a way that it can give concise, clear answers, placing you in valuable spots, including featured snippets and answer boxes.
              </p>

              <div className="tech-stack">
                <h3>Technology We Offer</h3>
                <div className="tech-logos">
                  <div className="tech-logo-item">
                    <div className="tech-logo chatgpt">
                      <SiOpenai className="tech-icon-svg" />
                      <span>ChatGPT</span>
                    </div>
                  </div>
                  <div className="tech-logo-item">
                    <div className="tech-logo gemini">
                      <SiGoogle className="tech-icon-svg" />
                      <span>Gemini</span>
                    </div>
                  </div>
                  <div className="tech-logo-item">
                    <div className="tech-logo copilot">
                      <FaFileWord className="tech-icon-svg" />
                      <span>Copilot</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section cta-section-large">
        <div className="container">
          <h2>There's no reason to keep waiting. If you want to boost your online presence and drive organic traffic, let's get started!</h2>
          <p>
            From comprehensive SEO audits to ongoing optimization, Aman Mishra provides tailored SEO solutions that help your business reach its target audience effectively. Let's turn your website into a high-performing digital asset.
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="btn-primary-large"
          >
            Let's Create Together →
          </button>
        </div>
      </section>

      {/* Stages on SEO Service */}
      <section className="section stages-wordpress">
        <div className="container">
          <h2>Stages on SEO Service</h2>
          <p className="stages-subtitle">What are the stages we follow to ensure maximum visibility of your website? Let's find out.</p>

          <div className="stages-timeline">
            <div className="stage">
              <div className="stage-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 11l3 3L22 4" />
                  <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
                </svg>
              </div>
              <h3>Site Audit and Analysis</h3>
              <p>We'll delve deep into your website, identifying areas that shine and those needing improvement. This comprehensive audit forms the foundation of our SEO strategy.</p>
            </div>

            <div className="stage-connector"></div>

            <div className="stage">
              <div className="stage-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
              </div>
              <h3>Keyword Research</h3>
              <p>Understanding the words your target audience uses to search is key. Through comprehensive research, we identify the perfect keywords to drive organic traffic.</p>
            </div>

            <div className="stage-connector"></div>

            <div className="stage">
              <div className="stage-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              <h3>Content Strategy</h3>
              <p>Armed with keyword insights, we'll craft a content strategy that resonates with your audience's needs. This ensures your content ranks well and engages visitors.</p>
            </div>

            <div className="stage-connector"></div>

            <div className="stage">
              <div className="stage-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <h3>Page Optimization</h3>
              <p>Once we know the right keywords, we'll optimize each page of your website to rank higher in search results. This includes on-page elements, technical improvements, and user experience enhancements.</p>
            </div>

            <div className="stage-connector"></div>

            <div className="stage">
              <div className="stage-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 3v18h18" />
                  <path d="M18 17V9" />
                  <path d="M13 17V5" />
                  <path d="M8 17v-3" />
                </svg>
              </div>
              <h3>Monitor</h3>
              <p>SEO is an ongoing process. We'll continuously monitor your website's performance and adapt our strategies to ensure you stay ahead of the competition and maintain top rankings.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Works on SEO Section */}
      <section className="section services-offer">
        <div className="container">
          <h2 className="section-title">Works on SEO</h2>
          <p className="section-subtitle">
            Aman Mishra has optimized several websites to their highest potential and brought them the recognition they deserve.
          </p>

          <div className="portfolio-grid-seo">
            {portfolios.length > 0 ? (
              portfolios.map((portfolio) => (
                <div key={portfolio._id} className="portfolio-item-seo">
                  <div className="portfolio-image-seo">
                    {portfolio.imageUrl ? (
                      <img src={portfolio.imageUrl} alt={portfolio.title} />
                    ) : (
                      <div className="portfolio-placeholder-seo">{portfolio.title}</div>
                    )}
                  </div>
                  <h3>{portfolio.title}</h3>
                  {portfolio.description && <p className="portfolio-description">{portfolio.description}</p>}
                  {portfolio.websiteUrl && (
                    <a href={portfolio.websiteUrl} target="_blank" rel="noopener noreferrer" className="view-site">
                      View Site →
                    </a>
                  )}
                </div>
              ))
            ) : (
              // Fallback portfolio items
              <>
                <div className="portfolio-item-seo">
                  <div className="portfolio-image-seo">
                    <div className="portfolio-placeholder-seo">Seed Financial Academy</div>
                  </div>
                  <h3>Seed Financial Academy</h3>
                  <a href="https://makuracreations.com/portfolio/seed-financial-academy/" target="_blank" rel="noopener noreferrer" className="view-site">
                    View Site →
                  </a>
                </div>

                <div className="portfolio-item-seo">
                  <div className="portfolio-image-seo">
                    <div className="portfolio-placeholder-seo">Nepal Travel Adventure</div>
                  </div>
                  <h3>Nepal Travel Adventure</h3>
                  <a href="https://makuracreations.com/portfolio/nepal-travel-adventure/" target="_blank" rel="noopener noreferrer" className="view-site">
                    View Site →
                  </a>
                </div>

                <div className="portfolio-item-seo">
                  <div className="portfolio-image-seo">
                    <div className="portfolio-placeholder-seo">Varicon</div>
                  </div>
                  <h3>Varicon</h3>
                  <a href="https://makuracreations.com/portfolio/varicon-australia/" target="_blank" rel="noopener noreferrer" className="view-site">
                    View Site →
                  </a>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section testimonials-section">
        <div className="container">
          <h2>say about us</h2>
          <p className="testimonials-subtitle">Don't take our word for it. Hear what our clients have to say about us.</p>

          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="quote-mark">"</div>
              <p className="testimonial-text">
                I can't believe how much our online presence has grown since we started working with Aman Mishra. Our visibility was almost non-existent when we reached out to them, and now we wonder why didn't we consult them sooner.
              </p>
              <div className="testimonial-author">
                <div className="author-logo">IME Travels</div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="quote-mark">"</div>
              <p className="testimonial-text">
                In this competitive market, it is tough to rank in the 1st page of google but this difficult process became simple with Aman Mishra. The SEO team delivered on their promises and helped my business bring in more customers. Aman Mishra also identified faults in my site and solved them which also helped make a good impression on users. All in all a great experience.
              </p>
              <div className="testimonial-author">
                <div className="author-logo">Maximax Education</div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="quote-mark">"</div>
              <p className="testimonial-text">
                You cannot go wrong with Aman Mishra and their SEO team as they are simply: the best. The team at Aman Mishra will keep you updated with reports and any new updates Google rolls out. The best thing about SEO is that you can even track the progress yourself. Aman Mishra was always available to address any concerns I had and their staff were the best in their field.
              </p>
              <div className="testimonial-author">
                <div className="author-logo">MEGAtech For Complete Tech Solution</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="section faqs-section">
        <div className="container">
          <h2>curiosities?</h2>
          <p className="faq-intro">Want to learn more about search engine optimization service in Nepal and have some questions? Allow us to clear any doubts.</p>

          <div className="faqs-content">
            <div className="faq-image">
              <img src={FAQImg} alt="FAQ Illustration" />
            </div>

            <div className="faq-items">
              {(faqs.length > 0 ? faqs : faqsData).map((faq, index) => (
                <div key={index} className="faq-item">
                  <div className="faq-question" onClick={() => toggleFAQ(index)}>
                    <h3>{faq.question}</h3>
                    <span className={`faq-icon ${expandedFAQ === index ? 'expanded' : ''}`}>+</span>
                  </div>
                  {expandedFAQ === index && <p className="faq-answer">{faq.answer}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

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
                Inquiry Now →
              </button>
            </div>
          </div>

          <div className="cta-frame-right">
            <img src={Frame1} alt="Team right" className="frame-image" />
          </div>
        </div>
      </section>

      {/* Modal */}
      <QuotePricingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default SEOService;