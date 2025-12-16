import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import adminService from '../services/adminService';
import AdminSidebar from '../components/AdminSidebar';
import './styles/AdminDashboard.css';
import './styles/AdminTestimonials.css';

interface Testimonial {
  _id: string;
  text: string;
  authorName: string;
  authorCompany: string;
  authorAvatar?: string;
  page: string;
  order: number;
  active: boolean;
  rating: number;
  createdAt: string;
  updatedAt: string;
}

const AdminTestimonials: React.FC = () => {
  const navigate = useNavigate();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedPage, setSelectedPage] = useState<string>('all');

  const [formData, setFormData] = useState({
    text: '',
    authorName: '',
    authorCompany: '',
    authorAvatar: '',
    page: 'home',
    rating: 5,
  });

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      navigate('/admin/login');
    } else {
      fetchTestimonials();
    }
  }, [navigate]);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const data = await adminService.listTestimonials();
      setTestimonials(Array.isArray(data) ? data : []);
      setError('');
    } catch (err: Error | unknown) {
      console.error('Error fetching testimonials:', err);
      setError('Failed to load testimonials');
    } finally {
      setLoading(false);
    }
  };

  const handleEditTestimonial = (testimonial: Testimonial) => {
    setFormData({
      text: testimonial.text,
      authorName: testimonial.authorName,
      authorCompany: testimonial.authorCompany,
      authorAvatar: testimonial.authorAvatar || '',
      page: testimonial.page,
      rating: testimonial.rating,
    });
    setEditingId(testimonial._id);
    setShowForm(true);
  };

  const handleAddTestimonial = () => {
    setFormData({
      text: '',
      authorName: '',
      authorCompany: '',
      authorAvatar: '',
      page: 'home',
      rating: 5,
    });
    setEditingId(null);
    setShowForm(true);
  };

  const handleSaveTestimonial = async () => {
    if (!formData.text.trim() || !formData.authorName.trim()) {
      setError('Please fill in testimonial text and author name');
      return;
    }

    try {
      if (editingId) {
        await adminService.updateTestimonial(editingId, formData);
      } else {
        await adminService.createTestimonial(formData);
      }
      fetchTestimonials();
      setShowForm(false);
      setError('');
    } catch (err: Error | unknown) {
      console.error('Error saving testimonial:', err);
      setError('Failed to save testimonial');
    }
  };

  const handleDeleteTestimonial = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this testimonial?')) {
      try {
        await adminService.deleteTestimonial(id);
        fetchTestimonials();
      } catch (err: Error | unknown) {
        console.error('Error deleting testimonial:', err);
        setError('Failed to delete testimonial');
      }
    }
  };

  const handleToggleVisibility = async (id: string) => {
    try {
      await adminService.toggleTestimonialVisibility(id);
      fetchTestimonials();
    } catch (err: Error | unknown) {
      console.error('Error toggling visibility:', err);
      setError('Failed to toggle visibility');
    }
  };

  const filteredTestimonials = selectedPage === 'all' 
    ? testimonials 
    : testimonials.filter(t => t.page === selectedPage);

  const pages = ['google-dta', 'ui-ux-design', 'wordpress-development', 'promotional-video', 'seo-service'];

  return (
    <div className="admin-dashboard">
      <AdminSidebar />
      
      <div className="admin-dashboard-content">
        <header className="dashboard-header">
          <div className="header-left">
            <h1>💬 Testimonials Management</h1>
            <p>Manage testimonials displayed on service pages</p>
          </div>
          <button onClick={() => { adminService.logout(); navigate('/admin/login'); }} className="btn-logout">
            Logout
          </button>
        </header>

        <div className="dashboard-main">

          <div className="section-header">
            <h2>💬 Testimonials ({filteredTestimonials.length})</h2>
            <div className="section-header-actions">
              <button className="btn-new-blog" onClick={handleAddTestimonial}>
                + Add Testimonial
              </button>
            </div>
          </div>

      {error && <div className="error-banner">{error}</div>}

      {showForm && (
        <div className="testimonial-form-container">
          <div className="testimonial-form">
            <h2>{editingId ? 'Edit Testimonial' : 'New Testimonial'}</h2>
            
            <div className="form-group">
              <label>Page</label>
              <select
                value={formData.page}
                onChange={(e) => setFormData({ ...formData, page: e.target.value })}
              >
                <option value="google-dta">Google DTA</option>
                <option value="ui-ux-design">UI/UX Design</option>
                <option value="wordpress-development">WordPress Development</option>
                <option value="promotional-video">Promotional Video</option>
                <option value="seo-service">SEO Service</option>
              </select>
            </div>

            <div className="form-group">
              <label>Testimonial Text *</label>
              <textarea
                value={formData.text}
                onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                placeholder="Enter the testimonial..."
                rows={5}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Author Name *</label>
                <input
                  type="text"
                  value={formData.authorName}
                  onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
                  placeholder="Client name"
                />
              </div>

              <div className="form-group">
                <label>Works on</label>
                <input
                  type="text"
                  value={formData.authorCompany}
                  onChange={(e) => setFormData({ ...formData, authorCompany: e.target.value })}
                  placeholder="e.g. SEO, Web Development"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Avatar (emoji or initials)</label>
                <input
                  type="text"
                  value={formData.authorAvatar}
                  onChange={(e) => setFormData({ ...formData, authorAvatar: e.target.value })}
                  placeholder="e.g., 👤 or ABC"
                  maxLength={5}
                />
              </div>

              <div className="form-group">
                <label>Rating</label>
                <select
                  value={formData.rating}
                  onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
                >
                  <option value={5}>★★★★★ (5 stars)</option>
                  <option value={4}>★★★★ (4 stars)</option>
                  <option value={3}>★★★ (3 stars)</option>
                  <option value={2}>★★ (2 stars)</option>
                  <option value={1}>★ (1 star)</option>
                </select>
              </div>
            </div>

            <div className="form-actions">
              <button className="btn-save" onClick={handleSaveTestimonial}>
                Save Testimonial
              </button>
              <button className="btn-cancel" onClick={() => setShowForm(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="page-filter">
        <label>Filter by Page:</label>
        <select value={selectedPage} onChange={(e) => setSelectedPage(e.target.value)}>
          <option value="all">All Pages</option>
          {pages.map(page => (
            <option key={page} value={page}>
              {page.replace('-', ' ').toUpperCase()}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="loading-state">
          <p>Loading testimonials...</p>
        </div>
      ) : filteredTestimonials.length === 0 ? (
        <div className="empty-state">
          <h2>No testimonials yet</h2>
          <p>Create your first testimonial to get started</p>
          <button className="btn-primary" onClick={handleAddTestimonial}>
            Create First Testimonial
          </button>
        </div>
      ) : (
        <div className="testimonials-grid">
          {filteredTestimonials.map((testimonial) => (
            <div 
              key={testimonial._id}
              className={`testimonial-card-admin ${!testimonial.active ? 'hidden' : ''}`}
            >
              <div className="card-header">
                <div className="badge">{testimonial.page}</div>
                <div className="rating">{'★'.repeat(testimonial.rating)}</div>
              </div>

              <p className="testimonial-text">{testimonial.text}</p>

              <div className="author-info">
                <div className="avatar">{testimonial.authorAvatar || '👤'}</div>
                <div className="author-details">
                  <div className="author-name">{testimonial.authorName}</div>
                  <div className="author-company">{testimonial.authorCompany}</div>
                </div>
              </div>

              <div className="testimonial-details">
                <div className="detail-item"><strong>Order:</strong> {testimonial.order}</div>
                <div className="detail-item"><strong>Active:</strong> {testimonial.active ? 'Yes' : 'No'}</div>
                <div className="detail-item"><strong>Created:</strong> {new Date(testimonial.createdAt).toLocaleString()}</div>
                <div className="detail-item"><strong>Updated:</strong> {new Date(testimonial.updatedAt).toLocaleString()}</div>
              </div>

              <div className="card-actions">
                <button
                  className={`btn-visibility ${testimonial.active ? 'visible' : 'hidden'}`}
                  onClick={() => handleToggleVisibility(testimonial._id)}
                  title={testimonial.active ? 'Hide' : 'Show'}
                >
                  {testimonial.active ? '👁️' : '👁️‍🗨️'}
                </button>
                <button
                  className="btn-edit"
                  onClick={() => handleEditTestimonial(testimonial)}
                >
                  ✏️ Edit
                </button>
                <button
                  className="btn-delete"
                  onClick={() => handleDeleteTestimonial(testimonial._id)}
                >
                  🗑️ Delete
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

export default AdminTestimonials;