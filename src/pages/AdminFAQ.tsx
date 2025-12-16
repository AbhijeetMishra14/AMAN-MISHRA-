import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import adminService from '../services/adminService';
import './styles/AdminFAQ.css';

interface FAQ {
  _id: string;
  question: string;
  answer: string;
  page: string;
  order: number;
  active: boolean;
}

const AdminFAQ: React.FC = () => {
  const navigate = useNavigate();
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    page: '',
    order: 0,
    active: true,
  });

  const [showSidebar, setShowSidebar] = useState(false);

  // Check authentication
  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      navigate('/admin/login');
    } else {
      fetchFAQs();
    }
  }, [navigate]);

  const fetchFAQs = async () => {
    try {
      setLoading(true);
      const data = await adminService.listAllFAQs();
      setFaqs(Array.isArray(data) ? data : data.faqs || []);
      setError('');
    } catch (err: any) {
      console.error('Error fetching FAQs:', err);
      setError('Failed to load FAQs');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      question: '',
      answer: '',
      page: '',
      order: 0,
      active: true,
    });
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (faq: FAQ) => {
    setFormData({
      question: faq.question,
      answer: faq.answer,
      page: faq.page,
      order: faq.order,
      active: faq.active,
    });
    setEditingId(faq._id);
    setShowForm(true);
    setShowSidebar(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : name === 'order' ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.question.trim() || !formData.answer.trim()) {
      setError('Please fill in all fields');
      return;
    }

    try {
      if (editingId) {
        await adminService.updateFAQ(editingId, formData);
      } else {
        await adminService.createFAQ(formData);
      }
      fetchFAQs();
      resetForm();
      setError('');
    } catch (err: any) {
      console.error('Error saving FAQ:', err);
      setError('Failed to save FAQ');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this FAQ?')) {
      try {
        await adminService.deleteFAQ(id);
        fetchFAQs();
        setError('');
      } catch (err: any) {
        console.error('Error deleting FAQ:', err);
        setError('Failed to delete FAQ');
      }
    }
  };

  const toggleActive = async (faq: FAQ) => {
    try {
      await adminService.updateFAQ(faq._id, {
        ...faq,
        active: !faq.active,
      });
      fetchFAQs();
    } catch (err: any) {
      console.error('Error toggling FAQ:', err);
      setError('Failed to update FAQ');
    }
  };

  return (
    <div className="admin-faq-container">
      {/* Sidebar Navigation */}
      <div className={`admin-sidebar ${showSidebar ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>Admin Panel</h2>
          <button className="close-btn" onClick={() => setShowSidebar(false)}>×</button>
        </div>
        <nav className="sidebar-nav">
          <button onClick={() => navigate('/admin')}>📝 Blog Posts</button>
          <button onClick={() => navigate('/admin/clients')}>🤝 Trusted Clients</button>
          <button onClick={() => navigate('/admin/pricing')}>💰 Pricing</button>
          <button onClick={() => navigate('/admin/careers')}>👨‍💻 Careers</button>
          <button className="active" onClick={() => navigate('/admin/faq')}>❓ FAQs</button>
        </nav>
      </div>

      <div className="admin-faq-content">
        <button className="toggle-sidebar" onClick={() => setShowSidebar(!showSidebar)}>
          ☰
        </button>

        <div className="admin-faq-header">
          <h1>FAQ Management</h1>
          <button 
            className="add-btn" 
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
          >
            + Add FAQ
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}
        {loading && <div className="loading">Loading FAQs...</div>}

        {showForm && (
          <div className="faq-form-section">
            <h3>{editingId ? 'Edit FAQ' : 'Add New FAQ'}</h3>
            <form onSubmit={handleSubmit} className="faq-form">
              <div className="form-group">
                <label>Question *</label>
                <input
                  type="text"
                  name="question"
                  value={formData.question}
                  onChange={handleInputChange}
                  placeholder="Enter FAQ question"
                />
              </div>

              <div className="form-group">
                <label>Answer *</label>
                <textarea
                  name="answer"
                  value={formData.answer}
                  onChange={handleInputChange}
                  placeholder="Enter FAQ answer"
                  rows={6}
                />
              </div>

              <div className="form-group">
                <label>Page</label>
                <select
                  name="page"
                  value={formData.page}
                  onChange={handleInputChange}
                >
                  <option value="">Select a page</option>
                  <option value="home">Home</option>
                  <option value="about">About</option>
                  <option value="contact">Contact</option>
                  <option value="career">Career</option>
                  <option value="pricing">Pricing</option>
                  <option value="wordpress-development">WordPress Development</option>
                  <option value="digital-marketing">Digital Marketing</option>
                  <option value="seo-service">SEO Service</option>
                  <option value="promotional-video">Promotional Video</option>
                  <option value="ui-ux-design">UI/UX Design</option>
                </select>
              </div>

              <div className="form-group">
                <label>Display Order</label>
                <input
                  type="number"
                  name="order"
                  value={formData.order}
                  onChange={handleInputChange}
                  placeholder="0"
                />
              </div>

              <div className="form-group checkbox">
                <label>
                  <input
                    type="checkbox"
                    name="active"
                    checked={formData.active}
                    onChange={handleInputChange}
                  />
                  Active
                </label>
              </div>

              <div className="form-actions">
                <button type="submit" className="save-btn">
                  {editingId ? 'Update FAQ' : 'Create FAQ'}
                </button>
                <button type="button" className="cancel-btn" onClick={resetForm}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="faq-list">
          <h3>All FAQs ({faqs.length})</h3>
          {faqs.length === 0 ? (
            <div className="empty-state">
              <p>No FAQs found. Create your first FAQ!</p>
            </div>
          ) : (
            <div className="faq-items">
              {faqs.map((faq) => (
                <div key={faq._id} className={`faq-item ${faq.active ? 'active' : 'inactive'}`}>
                  <div className="faq-content">
                    <h4>{faq.question}</h4>
                    <p>{faq.answer.substring(0, 100)}...</p>
                    <div className="faq-meta">
                      <span className="page">Page: {faq.page}</span>
                      <span className="order">Order: {faq.order}</span>
                      <span className={`status ${faq.active ? 'active' : 'inactive'}`}>
                        {faq.active ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>
                  <div className="faq-actions">
                    <button 
                      className="status-btn"
                      onClick={() => toggleActive(faq)}
                      title={faq.active ? 'Deactivate' : 'Activate'}
                    >
                      {faq.active ? '✓' : '○'}
                    </button>
                    <button 
                      className="edit-btn"
                      onClick={() => handleEdit(faq)}
                    >
                      Edit
                    </button>
                    <button 
                      className="delete-btn"
                      onClick={() => handleDelete(faq._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminFAQ;