import { useState } from 'react';
import './HelpWidget.css';
import AmanLogo from '../assets/AMAN.png';
import AmanImage from '../assets/image.png';
import { FaHome, FaEnvelope, FaQuestionCircle, FaChevronRight, FaPen, FaLightbulb, FaEnvelopeOpenText, FaWhatsapp, FaFacebookMessenger, FaPhone } from 'react-icons/fa';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export default function HelpWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);

  const faqItems: FAQItem[] = [
    {
      id: '1',
      question: 'What services does Aman Mishra offer?',
      answer: 'We offer web development, SEO services, digital marketing, UI/UX design, mobile app development, WordPress development, and AI workflow automation.',
    },
    {
      id: '2',
      question: 'How can I get started with your SEO services?',
      answer: 'You can contact us through our contact form, and our team will discuss your requirements and create a customized SEO strategy for your business.',
    },
    {
      id: '3',
      question: 'Do you work with international clients or only in Nepal?',
      answer: 'We work with both international clients and clients in Nepal. Our team is experienced in serving businesses worldwide.',
    },
    {
      id: '4',
      question: 'What makes Aman\'s SEO different from others?',
      answer: 'We combine cutting-edge technology with proven strategies and personalized approach to deliver measurable results for your business.',
    },
    {
      id: '5',
      question: 'How long does it take to see SEO results?',
      answer: 'SEO is a long-term strategy. Typically, you can see initial improvements within 3-6 months, with significant results developing over 6-12 months.',
    },
  ];

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const toggleFAQ = (id: string) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  return (
    <>
      {/* Help Widget Button */}
      <button
        className="help-widget-button"
        onClick={handleToggle}
        aria-label="Open help widget"
      >
        <div className="help-widget-icon-container">
          <img src={AmanLogo} alt="Aman" className="help-widget-button-logo" />
        </div>
      </button>

      {/* Popup Modal */}
      {isOpen && (
        <div className="help-widget-modal-overlay" onClick={handleToggle}>
          <div
            className="help-widget-modal"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="help-widget-header">
              <div className="help-widget-header-content">
                <div className="help-widget-logo">
                  <img src={AmanLogo} alt="Aman Logo" className="help-widget-logo-img" />
                </div>
                <div className="help-widget-header-text">
                  <h2>Hello, nice to see you here 👋</h2>
                </div>
              </div>
              <button
                className="help-widget-close-btn"
                onClick={handleToggle}
                aria-label="Close help widget"
              >
                ×
              </button>
            </div>

            {/* Content Area */}
            <div className="help-widget-content">
              {activeTab === 'home' && (
                <>
                  {/* Contact Card */}
                  <div className="help-widget-contact-card">
                    <div className="help-widget-contact-avatar">
                        <img src={AmanImage} alt="Aman Mishra" className="help-widget-contact-avatar-img" />
                      </div>
                    <div className="help-widget-contact-info">
                      <p className="help-widget-contact-name">Aman Mishra</p>
                      <p className="help-widget-contact-subtitle">Write to us</p>
                    </div>
                  </div>

                  {/* Contact Button */}
                  <button onClick={() => setActiveTab('contact')} className="help-widget-contact-button">
                    Contact us
                  </button>

                  {/* Quick Answers Section */}
                  <div className="help-widget-faq-section">
                    <h3 className="help-widget-faq-title">
                      <FaLightbulb size={20} className="help-widget-faq-icon" />
                      Quick answers
                    </h3>

                    {faqItems.map((item) => (
                      <div
                        key={item.id}
                        className="help-widget-faq-item"
                      >
                        <button
                          className="help-widget-faq-question"
                          onClick={() => toggleFAQ(item.id)}
                        >
                          <span>{item.question}</span>
                          <span
                            className={`help-widget-faq-toggle ${
                              expandedFAQ === item.id ? 'active' : ''
                            }`}
                          >
                            ⌄
                          </span>
                        </button>
                        {expandedFAQ === item.id && (
                          <div className="help-widget-faq-answer">
                            {item.answer}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </>
              )}

              {activeTab === 'contact' && (
                <div className="help-widget-contact-content">
                  {/* Email Section */}
                  <div className="help-widget-contact-section">
                    <h4 className="help-widget-section-title">Email</h4>
                    <button className="help-widget-contact-option">
                      <FaEnvelopeOpenText size={24} className="help-widget-contact-icon" />
                      <span>Leave a message</span>
                      <FaChevronRight size={20} className="help-widget-arrow" />
                    </button>
                  </div>

                  {/* Socials Section */}
                  <div className="help-widget-contact-section">
                    <h4 className="help-widget-section-title">Socials</h4>
                    
                    <button className="help-widget-contact-option">
                      <FaWhatsapp size={24} className="help-widget-contact-icon" />
                      <span>WhatsApp</span>
                      <FaChevronRight size={20} className="help-widget-arrow" />
                    </button>

                    <button className="help-widget-contact-option">
                      <FaFacebookMessenger size={24} className="help-widget-contact-icon" />
                      <span>Messenger</span>
                      <FaChevronRight size={20} className="help-widget-arrow" />
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'help' && (
                <div className="help-widget-help-content">
                  <h3 className="help-widget-help-title" style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>Quick answers</h3>

                  <div className="help-widget-faq-list">
                    {faqItems.map((item) => (
                      <div
                        key={item.id}
                        className="help-widget-faq-item"
                      >
                        <button
                          className="help-widget-faq-question"
                          onClick={() => toggleFAQ(item.id)}
                          style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}
                        >
                          <span>{item.question}</span>
                          <span
                            className={`help-widget-faq-toggle ${
                              expandedFAQ === item.id ? 'active' : ''
                            }`}
                          >
                            ⌄
                          </span>
                        </button>
                        {expandedFAQ === item.id && (
                          <div className="help-widget-faq-answer" style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
                            {item.answer}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="help-widget-not-found">
                    <p style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", marginBottom: '12px' }}>Didn't find what you were looking for?</p>
                    <button className="help-widget-write-button" style={{ marginBottom: '12px' }}>
                      <span>Write to us</span>
                      <FaPen size={20} />
                    </button>
                    <button className="help-widget-write-button">
                      <span>Call us</span>
                      <FaPhone size={20} />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Navigation */}
            <div className="help-widget-nav">
              <button
                className={`help-widget-nav-item ${
                  activeTab === 'home' ? 'active' : ''
                }`}
                onClick={() => setActiveTab('home')}
              >
                <FaHome size={24} />
                <span>Home</span>
              </button>
              <button
                className={`help-widget-nav-item ${
                  activeTab === 'contact' ? 'active' : ''
                }`}
                onClick={() => setActiveTab('contact')}
              >
                <FaEnvelope size={24} />
                <span>Contact</span>
              </button>
              <button
                className={`help-widget-nav-item ${
                  activeTab === 'help' ? 'active' : ''
                }`}
                onClick={() => setActiveTab('help')}
              >
                <FaQuestionCircle size={24} />
                <span>Help</span>
              </button>
            </div>

            {/* Footer */}
            <div className="help-widget-footer">
              Powered by <span className="help-widget-powered-logo">Aman Mishra</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
