import { useState } from 'react';
import { Link } from 'react-router-dom';
import StartProjectModal from '../components/StartProjectModal';
import './Contact.css';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import Asset119 from '../assets/Asset-119.svg';
import Asset123 from '../assets/Asset-123.svg';

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ firstName: '', lastName: '', email: '', message: '' });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="contact-page">
      <StartProjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Breadcrumb */}
      <section className="breadcrumb-section">
        <div className="container">
          <nav className="breadcrumb">
            <Link to="/">Home</Link>
            <span className="separator">•</span>
            <span>Contact</span>
          </nav>
        </div>
      </section>

      {/* Get in Touch Section */}
      <section className="section get-in-touch-section">
        <div className="container">
          <div className="get-in-touch-wrapper">
            {/* Left Side - Illustration */}
            <div className="touch-illustration">
              <img src={Asset123} alt="Get in Touch Illustration" className="illustration-image" />
            </div>

            {/* Right Side - Content & Contact Info */}
            <div className="touch-content">
              <h2>Get in Touch</h2>
              <p className="touch-description">
                Have an idea to execute or wanna know about us? Ring us up
              </p>

              {/* Contact Info Cards */}
              <div className="contact-info-items">
                <div className="contact-info-item">
                  <div className="contact-icon phone-icon">
                    <FaPhone size={20} />
                  </div>
                  <div className="contact-text">
                    <p className="contact-label">Phone Number</p>
                    <a href="tel:+977-9841969727" className="contact-value">
                      977-9841969727
                    </a>
                  </div>
                </div>

                <div className="contact-info-item">
                  <div className="contact-icon email-icon">
                    <FaEnvelope size={20} />
                  </div>
                  <div className="contact-text">
                    <p className="contact-label">Email</p>
                    <a href="mailto:amandreamsbig@gmail.com" className="contact-value">
                      amandreamsbig@gmail.com
                    </a>
                  </div>
                </div>

                <div className="contact-info-item">
                  <div className="contact-icon location-icon">
                    <FaMapMarkerAlt size={20} />
                  </div>
                  <div className="contact-text">
                    <p className="contact-label">Address</p>
                    <a 
                      href="https://www.google.com/maps/place/Flowrage+-+SEO+Agency+in+Nepal/@27.6651495,85.3358366,20z/data=!4m6!3m5!1s0x39eb19014b11d41d:0x15f4651a9f208b6e!8m2!3d27.6650984!4d85.3358996!16s%2Fg%2F11mllk54cp?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-value"
                    >
                      Gwarko, Lalitpur, Nepal
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Let's Talk Section */}
      <section className="section lets-talk-section">
        <div className="container">
          <div className="lets-talk-wrapper">
            {/* Left Side - Illustration */}
            <div className="talk-illustration">
              <img src={Asset119} alt="Let's Talk Illustration" className="illustration-image" />
            </div>

            {/* Right Side - Form */}
            <div className="talk-form">
              <h2>Let's Talk</h2>
              <p className="talk-description">
                Aman Mishra loves hearing from you. Whether it be your general concern or addressing your problems. Write to us and we will get back to you.
              </p>

              {submitted && (
                <div className="success-message">
                  <p>✓ Thank you! Your message has been sent successfully.</p>
                </div>
              )}

              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="Enter your First Name"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Enter your Last Name"
                      required
                    />
                  </div>
                </div>

                <div className="form-group full-width">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                    required
                  />
                </div>

                <div className="form-group full-width">
                  <label htmlFor="message">Message:</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Enter your message here."
                    rows={6}
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn-submit">
                  Submit Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;