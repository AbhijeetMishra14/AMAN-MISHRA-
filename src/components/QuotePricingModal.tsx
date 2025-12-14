import { useState } from 'react';
import './QuotePricingModal.css';

interface QuotePricingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const QuotePricingModal = ({ isOpen, onClose }: QuotePricingModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    additionalDetails: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Here you would send the form data to your backend
      console.log('Form submitted:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSubmitMessage('Quote request sent successfully! We will contact you soon.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        additionalDetails: '',
      });

      setTimeout(() => {
        setSubmitMessage('');
        onClose();
      }, 2000);
    } catch (error) {
      setSubmitMessage('Error sending request. Please try again.');
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        
        <h2>Get a Quote</h2>
        <p>Fill in your details and we'll contact you with a personalized quote</p>

        {submitMessage && (
          <div className={`submit-message ${submitMessage.includes('Error') ? 'error' : 'success'}`}>
            {submitMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              placeholder="Your name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              placeholder="your.email@example.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone *</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
              placeholder="+977-9xxxxxxxxx"
            />
          </div>

          <div className="form-group">
            <label htmlFor="additionalDetails">Additional Details</label>
            <textarea
              id="additionalDetails"
              name="additionalDetails"
              value={formData.additionalDetails}
              onChange={handleInputChange}
              placeholder="Tell us about your project or requirements"
              rows={4}
            ></textarea>
          </div>

          <button 
            type="submit" 
            className="submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Send Quote Request'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default QuotePricingModal;
