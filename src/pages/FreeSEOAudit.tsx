import { useState } from 'react';
import './FreeSEOAudit.css';

const FreeSEOAudit = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="free-seo-audit-page">
      <section className="page-hero">
        <div className="container">
          <h1>Get Your Free SEO Audit</h1>
          <p>Delivered to Your Inbox</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="audit-form-container">
            <div className="audit-info">
              <h2>Why Get a Free SEO Audit?</h2>
              <ul>
                <li>Identify technical SEO issues</li>
                <li>Discover optimization opportunities</li>
                <li>Improve your search rankings</li>
                <li>Increase organic traffic</li>
                <li>Get actionable recommendations</li>
              </ul>
            </div>

            <form className="audit-form" onSubmit={handleSubmit}>
              <h2>Fill out the form</h2>
              <p>We'll send you a detailed SEO audit directly to your email</p>
              
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number (Optional)</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Enter your Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="company">Company Name</label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message (optional)</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary">Get Free SEO Audit</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FreeSEOAudit;
