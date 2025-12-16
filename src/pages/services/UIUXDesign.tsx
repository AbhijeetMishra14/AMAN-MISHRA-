import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';
import './ServicePage.css';
import './UIUXDesign.css';
import { adminService } from '../../services/adminService';
import StartProjectModal from '../../components/StartProjectModal';

interface FAQ {
  _id: string;
  question: string;
  answer: string;
  page: string;
  order: number;
  active: boolean;
}

interface Testimonial {
  _id: string;
  text: string;
  authorName: string;
  authorCompany: string;
  authorAvatar?: string;
  page: string;
  rating: number;
}

const UIUXDesign = () => {
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const defaultFaqs: FAQ[] = [
    {
      _id: '1',
      question: 'Is UI UX a coding job?',
      answer: 'No, you don\'t need to know how to code to be a UX/UI designer. Most people confuse design with programming and believe that UX/UI developers are coders.',
      page: 'ui-ux-design',
      order: 1,
      active: true,
    },
    {
      _id: '2',
      question: 'Which is better UI/UX or web development?',
      answer: 'Both UI/UX design and web development are equally important and serve different purposes. UI/UX focuses on user experience and interface design, while web development focuses on functionality and technical implementation. The best approach combines both.',
      page: 'ui-ux-design',
      order: 2,
      active: true,
    },
    {
      _id: '3',
      question: 'What\'s the difference between UI and UX?',
      answer: 'UI (User Interface) refers to the visual elements of a product - buttons, screens, colors, and layouts. UX (User Experience) is about how users interact with the product and how it makes them feel. UI is what you see, UX is how it all feels.',
      page: 'ui-ux-design',
      order: 3,
      active: true,
    },
  ];

  const defaultTestimonials: Testimonial[] = [
    {
      _id: '1',
      text: 'We were very impressed with the pace Makura Creations team worked. We had only an idea but the UI/UX team at Makura put that idea into reality in just a couple of days. Not only was the product delivered ahead of time, it was also unique and had a certain charm to it. Visually, functionally and experience-wise the site was transformed for the better. A great team.',
      authorName: 'Seed Financial Academy',
      authorCompany: 'Seed Financial Academy',
      authorAvatar: '👥',
      page: 'ui-ux-design',
      rating: 5,
    },
    {
      _id: '2',
      text: 'Makura Creations has a talented team of professionals working for them. I was informed about them through a client of mine and have never looked back since. I have still employed them and have no complaints about them. What started out as a UI/UX change turned into an all-out service including SEO, and social media advertising, and it was the best.',
      authorName: 'Varicon',
      authorCompany: 'Varicon',
      authorAvatar: '👥',
      page: 'ui-ux-design',
      rating: 5,
    },
    {
      _id: '3',
      text: 'When I first came to Makura, I didn\'t know what exactly was UI/UX and its importance. I was using an outdated design and it was affecting my business. Fortunately for me, I found Makura Creations. They advised me to change my website and after hearing their pitch, I was convinced. Now my website is fresh, and also feels easy to',
      authorName: 'Nepal Travel Adventure',
      authorCompany: 'Nepal Travel Adventure',
      authorAvatar: '👥',
      page: 'ui-ux-design',
      rating: 5,
    },
  ];

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const data = await adminService.getFAQsByPage('ui-ux-design');
        const faqList = Array.isArray(data) ? data : (data?.faqs || []);
        if (faqList.length > 0) {
          setFaqs(faqList);
        } else {
          setFaqs(defaultFaqs);
        }
      } catch (error) {
        console.error('Failed to fetch FAQs:', error);
        setFaqs(defaultFaqs);
      }
    };

    const fetchTestimonials = async () => {
      try {
        const data = await adminService.getTestimonialsByPage('ui-ux-design');
        const testList = Array.isArray(data) ? data : (data?.testimonials || []);
        if (testList.length > 0) {
          setTestimonials(testList);
        } else {
          setTestimonials(defaultTestimonials);
        }
      } catch (error) {
        console.error('Failed to fetch testimonials:', error);
        setTestimonials(defaultTestimonials);
      }
    };

    fetchFAQs();
    fetchTestimonials();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const services = [
    {
      title: 'User Research',
      description: 'Don\'t guess about your users, know them. User research is the secret weapon to creating products they\'ll love. We delve deep, using interviews, surveys, and observations to understand their needs, wants, and frustrations. This ongoing process ensures your product solves real problems and offers an intuitive, enjoyable experience. Bridge the gap between assumptions and reality – invest in user research and watch your product become a user favorite.',
      icon: '👥',
    },
    {
      title: 'Wireframing',
      description: 'Before a stunning website or app comes to life, there\'s a crucial step: wireframing. Think of it like an architect\'s blueprint. Wireframes are low-fidelity sketches that map out the essential elements of your product – what will be there, and where. This allows designers to focus on structure and functionality before getting bogged down in visual details. Just like an architect wouldn\'t decorate a room that hasn\'t been built yet, wireframing ensures a solid foundation for your digital product before the design magic happens.',
      icon: '📐',
    },
    {
      title: 'Prototyping',
      description: 'Don\'t build in the dark! UI prototyping lets you create a clickable, high-fidelity mock-up of your website or app before any coding starts. This allows real users to interact with the core features, revealing usability issues early on. Imagine getting valuable feedback and refining your design before you invest significant development resources. The result? A seamless user experience and a product that keeps your target audience happy and engaged.',
      icon: '🎬',
    },
    {
      title: 'Information Architecture',
      description: 'The foundation of a great website or app is invisible: Information Architecture (IA). Think of it as a blueprint that maps out how information is organized. Just like a well-structured building, a strong IA ensures a clear hierarchy and intuitive user experience. This translates to benefits like smarter decision-making during development, efficient project timelines, and a user-centric design that keeps users happy by letting them find what they need fast and easily.',
      icon: '🗂️',
    },
    {
      title: 'Usability Testing',
      description: 'Don\'t launch a website or app into the unknown! Usability testing lets you watch real users interact with your product, revealing any confusing elements or frustrating roadblocks. It\'s like getting a sneak peek into their experience. This valuable feedback helps identify usability issues early on, ensuring a smooth user journey and a product that keeps your target audience happy and engaged.',
      icon: '✅',
    },
  ];

  const stages = [
    {
      icon: '📋',
      title: 'Discovery & Research',
      description: 'We start by understanding your business goals, target audience, and market landscape through comprehensive research.',
    },
    {
      icon: '⚙️',
      title: 'Design & Strategy',
      description: 'Our team develops a solid UX strategy and creates detailed design solutions tailored to your needs.',
    },
    {
      icon: '🚀',
      title: 'Prototyping',
      description: 'We build interactive prototypes to test concepts and gather user feedback early in the process.',
    },
    {
      icon: '🔧',
      title: 'Iteration',
      description: 'Based on feedback, we refine and improve the design to ensure it meets all requirements.',
    },
    {
      icon: '📊',
      title: 'Testing & Refinement',
      description: 'Thorough usability testing ensures your final design is intuitive, accessible, and user-friendly.',
    },
  ];

  return (
    <div className="uiux-page">
      <StartProjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Breadcrumb */}
      <nav className="breadcrumb">
        <div className="breadcrumb-content">
          <Link to="/">Home</Link>
          <span className="separator">•</span>
          <Link to="/">Services</Link>
          <span className="separator">•</span>
          <span>UI/UX Design</span>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="service-hero uiux-hero">
        <div className="container hero-content">
          <div className="hero-text">
            <div className="breadcrumb-hero">Home • Services • UI/UX Design</div>
            <h1>UI/UX Design Services</h1>
            <p>
              Forget fighting for fleeting attention spans. UI/UX design in content marketing is your secret weapon. Stunning visuals grab users, flawless navigation keeps them engaged, and a smooth, enjoyable experience leaves a lasting impression.
            </p>
            <p>
              By prioritizing user experience, UI/UX design elevates your content, ensuring it resonates deeply and drives results. Don't just inform, inspire. Invest in UI/UX design agency and watch your content marketing strategy take flight.
            </p>
            <button onClick={() => setIsModalOpen(true)} className="btn-cta">Inquire Now →</button>
          </div>
          <div className="hero-image">
            <div className="hero-illustration">🎨✨</div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section services-offer">
        <div className="container">
          <h2 className="section-title">Services We Offer in UI/UX Design</h2>
          <p className="section-subtitle">
            UI and UX, while often confused, are two sides of the same coin. UI, the User Interface, is like the beautiful plate your food arrives on – it's the visual elements you directly interact with, like buttons, screens, and scrolling. UX, the User Experience, considers the entire dining experience – from the ambiance to the service.
          </p>

          <div className="services-grid-large">
            {services.map((service, idx) => (
              <div key={idx} className="service-block-large">
                <div className="service-icon-large">{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stages Section */}
      <section className="section stages-section">
        <div className="container">
          <h2 className="section-title">Stages of UI/UX Design</h2>
          <p className="section-subtitle">
            Let's explore the steps we take to ensure a smooth and trouble-free experience for our users.
          </p>

          <div className="stages-timeline-large">
            {stages.map((stage, idx) => (
              <div key={idx} className="stage-bubble-item">
                <div className="stage-circle">{stage.icon}</div>
                <h3>{stage.title}</h3>
                <p>{stage.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section testimonials-section">
        <div className="container">
          <h2 className="section-title">What our customers say about us</h2>
          
          <div className="testimonials-grid-large">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="testimonial-card-large">
                <div className="quote-mark">"</div>
                <p className="testimonial-text">{testimonial.text}</p>
                <div className="testimonial-author">
                  <div className="author-avatar">{testimonial.authorAvatar || '👥'}</div>
                  <div>
                    <h4>{testimonial.authorName}</h4>
                    <p>{testimonial.authorCompany}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="section faqs-section">
        <div className="container">
          <h2 className="section-title">What are your curiosities?</h2>
          <p className="section-subtitle">
            Want to learn more about UI/UX and have some queries? Allow us to clear any doubts.
          </p>

          <div className="faqs-content-large">
            <div className="faqs-left">
              <div className="faq-illustration">❓</div>
            </div>

            <div className="faqs-right">
              {faqs.map((faq, idx) => (
                <div key={faq._id} className="faq-item">
                  <button
                    className="faq-question"
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
        </div>
      </section>

      {/* CTA Section */}
      <section className="section cta-section">
        <div className="container">
          <h2>A user interface is like a joke. If you have to explain it, it's not that good.</h2>
          <button onClick={() => setIsModalOpen(true)} className="btn btn-cta">
            Start Project
          </button>
        </div>
      </section>
    </div>
  );
};

export default UIUXDesign;