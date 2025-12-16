import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './PromotionalVideo.css';
import { adminService } from '../../services/adminService';
import StartProjectModal from '../../components/StartProjectModal';

const PromotionalVideo = () => {
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [faqs, setFaqs] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const data = await adminService.getFAQsByPage('promotional-video');
        const faqList = Array.isArray(data) ? data : (data?.faqs || []);
        if (faqList.length > 0) {
          setFaqs(faqList);
        }
      } catch (error) {
        console.error('Failed to fetch FAQs:', error);
      }
    };
    fetchFAQs();
  }, []);

  const stages = [
    {
      icon: '📋',
      title: 'Pre-Production',
      description: "This is where the groundwork is laid. We'll collaborate with you to develop a concept, craft a script, storyboard your vision, and meticulously plan every detail from filming locations to equipment needs.",
    },
    {
      icon: '🎥',
      title: 'Production',
      description: "Cameras roll! Our experienced crew brings your concept to life, using professional equipment and expertise to capture your vision with stunning visuals and flawless audio.",
    },
    {
      icon: '✨',
      title: 'Post-Production',
      description: 'The magic happens here. Our editors meticulously transform raw footage into a polished masterpiece, incorporating music, sound effects, and visual effects to elevate storytelling.',
    },
    {
      icon: '👁️',
      title: 'Review and Revision',
      description: "We value your feedback. This stage allows for collaborative refinement, ensuring the final video perfectly aligns with your vision.",
    },
    {
      icon: '📊',
      title: 'Delivery and Distribution',
      description: "Your video is ready to shine! We strategically distribute it across relevant platforms and channels, maximizing its reach and impact on your target audience.",
    },
  ];

  const services = [
    {
      title: 'Concept Development',
      description: 'Unlocking the power of promotional videos requires collaboration. We partner with you to understand your brand, audience, and goals. Through deep dives and creative brainstorming, we craft innovative video concepts featuring captivating storylines, stunning visuals, and a mood that perfectly embodies your brand essence. The result? A promotional video masterpiece that resonates with viewers and fuel success.',
      icon: '🧠',
    },
    {
      title: 'Scriptwriting',
      description: 'From concept to captivating script, our team brings your video to life. Our skilled copywriters transform creative ideas into engaging scripts, meticulously detailing the plot, narration, and calls to action. These scripts not only convey your brand\'s story and value proposition but also evoke the desired emotional response and motivate viewers to take action.',
      icon: '✍️',
    },
    {
      title: 'Video Production',
      description: 'This is where the magic happens. From meticulously planned professional filming with top-notch equipment, our video team brings your script to life. We handle location scouting, crew coordination, and every aspect of filming to ensure high-quality footage that perfectly translates your brand story and script\'s vision onto the screen.',
      icon: '🎬',
    },
    {
      title: 'Post-Production Editing',
      description: 'Our post-production wizards transform raw footage into a polished masterpiece. Using specialized software, they weave in visual effects, music, sound design, and color grading to elevate the storytelling and emotional impact. Every detail, from precise editing to seamless transitions, is meticulously crafted to ensure your promotional video captivates viewers and delivers a lasting impact.',
      icon: '🎞️',
    },
    {
      title: 'Distribution and Promotion',
      description: "The show's not over after the final cut! We'll take your polished video and distribute it across the web, maximizing its impact. This includes sharing it on popular platforms, optimizing it for search engines, and even leveraging targeted advertising to reach specific demographics. We can also explore influencer partnerships to further amplify your reach.",
      icon: '📢',
    },
  ];

  const defaultFaqs = [
    {
      question: 'Why use promotional videos?',
      answer: 'Many companies opt to produce a promotional video instead of using other advertising methods to connect with their audience in a way that text cannot. Video plays a vital role in marketing by capturing the audience\'s attention and demonstrating the value that your company offers to them.',
    },
    {
      question: 'Is a promotional video an advertisement?',
      answer: 'A promotional video can serve as an advertisement, but it goes beyond traditional advertising. It tells your brand story, showcases your products or services, and creates a personal connection with viewers through compelling narratives and visual storytelling.',
    },
    {
      question: 'What is the impact of a promotional video?',
      answer: 'Promotional videos can significantly increase brand awareness, engagement, and conversion rates. They help communicate your message more effectively, build trust with your audience, and can lead to new leads and customers through increased visibility and emotional connection.',
    },
  ];

  const testimonials = [
    {
      name: 'Edupro',
      company: 'Edupro',
      image: '👥',
    },
    {
      text: 'Not only does Makura Creations have a good script writer and videographer, their post production editing is also top-notch. The editors gladly accepted any changes we had and provided the updated video swiftly. The pacing, audio, color selection are all perfect for each respective video delivery and visual presentation are something',
      name: 'Hello Topik',
      company: 'Hello Topik',
      image: '👥',
    },
    {
      text: 'The best way to engage an audience is with promotional videos and no one does it better than Makura Creations. My business needed a bit of storytelling to bring in more clients and the team at Makura Creations were just perfect for the job. The video led to new leads and brought in more customers. They subtly showcased my products wit',
      name: 'Seed Finance',
      company: 'Seed Finance',
      image: '👥',
    },
  ];

  return (
    <div className="promo-video-page">
      <StartProjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Hero Section */}
      <section className="promo-hero">
        <div className="promo-container">
          <div className="hero-content">
            <h1>Promotional Video</h1>
            <p>
              In a world where attention spans are short, promotional videos are marketing game-changers. They grab attention with visuals, tell captivating stories that connect on an emotional level, and showcase your products or services in action. This versatility, combined with SEO benefits and the ability to reach a wide audience, makes promotional videos a must-have for any marketing strategy.
            </p>
            <Link to="/contact" className="btn btn-promo-primary">
              Inquiry Now →
            </Link>
          </div>
          <div className="hero-illustration">
            <div className="illustration-placeholder">📹</div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="promo-services">
        <div className="promo-container">
          <h2>Services We Offer in Promotional Video</h2>
          <p className="section-subtitle">
            Promotional videos are more than just commercials. They're powerful tools to showcase your brand, build connections, and ultimately drive sales.
          </p>

          <div className="services-grid">
            {services.map((service, idx) => (
              <div key={idx} className="service-block">
                <div className="service-block-icon">{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stages Section */}
      <section className="promo-stages">
        <div className="promo-container">
          <h2>Stages on Video Creation</h2>
          <p className="section-subtitle">
            What are the procedures for creating a promotional video? Let's discover them.
          </p>

          <div className="stages-timeline">
            {stages.map((stage, idx) => (
              <div key={idx} className="stage-item">
                <div className="stage-icon">{stage.icon}</div>
                <div className="stage-content">
                  <h3>{stage.title}</h3>
                  <p>{stage.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="promo-testimonials">
        <div className="promo-container">
          <h2>What our customers say about us</h2>
          <p className="testimonials-intro">
          We have been serving for a long time and our clients have always been happy with our services.
          </p>

          <div className="testimonials-grid">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="testimonial-card">
                <div className="testimonial-quote">❝</div>
                <p className="testimonial-text">{testimonial.text}</p>
                <div className="testimonial-author">
                  <div className="author-avatar">{testimonial.image}</div>
                  <div className="author-info">
                    <h4>{testimonial.name}</h4>
                    <p>{testimonial.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="promo-faqs">
        <div className="promo-container">
          <h2>FAQs</h2>
          <p className="section-subtitle">What are your curiosities?</p>
          <p className="faq-intro">
            Want to learn more about search engine optimization and have some questions? Allow us to clear any doubts.
          </p>

          <div className="faqs-container">
            {faqs.map((faq, idx) => (
              <div key={idx} className="faq-item">
                <button
                  className={`faq-question ${expandedFAQ === idx ? 'active' : ''}`}
                  onClick={() => setExpandedFAQ(expandedFAQ === idx ? null : idx)}
                >
                  <span>{faq.question}</span>
                  <span className="faq-toggle">{expandedFAQ === idx ? '−' : '+'}</span>
                </button>
                {expandedFAQ === idx && (
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="promo-final-cta">
        <div className="promo-container">
          <div className="cta-content">
            <h2>It takes a team to run a business, and we are here every step of the way.</h2>
            <button onClick={() => setIsModalOpen(true)} className="btn btn-cta">
              Start Project
            </button>
          </div>
          <div className="cta-illustration">👥</div>
        </div>
      </section>
    </div>
  );
};

export default PromotionalVideo;