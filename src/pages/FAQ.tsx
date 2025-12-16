import React, { useState, useEffect } from 'react';
import adminService from '../services/adminService';
import './styles/FAQ.css';

interface FAQ {
  _id: string;
  question: string;
  answer: string;
}

const FAQPage: React.FC = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        setLoading(true);
        const data = await adminService.listFAQs();
        setFaqs(Array.isArray(data) ? data.filter(faq => faq.active) : []);
        setError('');
      } catch (err) {
        console.error('Error fetching FAQs:', err);
        setError('Failed to load FAQs. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchFAQs();
  }, []);

  return (
    <div className="faq-page">
      <div className="faq-header">
        <h1>Frequently Asked Questions</h1>
        <p>Find answers to common questions about our services and processes.</p>
      </div>

      {loading && <div className="loading">Loading FAQs...</div>}
      {error && <div className="error-message">{error}</div>}

      {!loading && !error && (
        <div className="faq-list">
          {faqs.length > 0 ? (
            faqs.map(faq => (
              <div key={faq._id} className="faq-item">
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </div>
            ))
          ) : (
            <div className="no-faqs">
              <p>No FAQs have been added yet. Please check back later.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FAQPage;