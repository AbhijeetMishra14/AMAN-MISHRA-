import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminService } from '../services/adminService';
import './styles/AdminPortfolio.css';
import AdminNavbar from '../components/AdminNavbar';
import AdminSidebar from '../components/AdminSidebar';

interface Portfolio {
  _id: string;
  title: string;
  description: string;
  page: string;
  imageUrl: string;
  websiteUrl: string;
  order: number;
  active: boolean;
}

const AdminPortfolio: React.FC = () => {
  const navigate = useNavigate();
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [selectedPage, setSelectedPage] = useState('seo-service');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    page: 'seo-service',
    imageUrl: '',
    websiteUrl: '',
    order: 0,
    active: true,
  });

  const pages = [
    { value: 'seo-service', label: 'SEO Service' },
    { value: 'wordpress-development', label: 'WordPress Development' },
    { value: 'promotional-video', label: 'Promotional Video' },
    { value: 'ui-ux-design', label: 'UI/UX Design' },
  ];

  // Check authentication
  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      navigate('/admin/login');
    } else {
      fetchPortfolios();
    }
  }, [navigate]);

  const fetchPortfolios = async () => {
    try {
      setLoading(true);
      const data = await adminService.listAllPortfolios();
      setPortfolios(data.portfolios || []);
      setError('');
    } catch (err: Error | unknown) {
      console.error('Error fetching portfolios:', err);
      setError('Failed to load portfolios');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      page: 'seo-service',
      imageUrl: '',
      websiteUrl: '',
      order: 0,
      active: true,
    });
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (portfolio: Portfolio) => {
    setFormData({
      title: portfolio.title,
      description: portfolio.description,
      page: portfolio.page,
      imageUrl: portfolio.imageUrl,
      websiteUrl: portfolio.websiteUrl,
      order: portfolio.order,
      active: portfolio.active,
    });
    setEditingId(portfolio._id);
    setShowForm(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const isCheckbox = (e.target as HTMLInputElement).type === 'checkbox';
    const checked = (e.target as HTMLInputElement).checked;

    setFormData(prev => ({
      ...prev,
      [name]: isCheckbox ? checked : name === 'order' ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      setError('Title is required');
      return;
    }

    try {
      if (editingId) {
        await adminService.updatePortfolio(editingId, formData);
      } else {
        await adminService.createPortfolio(formData);
      }
      fetchPortfolios();
      resetForm();
      setError('');
    } catch (err: Error | unknown) {
      console.error('Error saving portfolio:', err);
      setError('Failed to save portfolio');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this portfolio item?')) {
      try {
        await adminService.deletePortfolio(id);
        fetchPortfolios();
        setError('');
      } catch (err: Error | unknown) {
        console.error('Error deleting portfolio:', err);
        setError('Failed to delete portfolio');
      }
    }
  };

  const toggleActive = async (portfolio: Portfolio) => {
    try {
      await adminService.updatePortfolio(portfolio._id, {
        title: portfolio.title,
        description: portfolio.description,
        page: portfolio.page,
        imageUrl: portfolio.imageUrl,
        websiteUrl: portfolio.websiteUrl,
        order: portfolio.order,
        active: !portfolio.active,
      });
      fetchPortfolios();
    } catch (err: any) {
      console.error('Error toggling portfolio:', err);
      setError('Failed to update portfolio');
    }
  };

  const filteredPortfolios = selectedPage === 'all' 
    ? portfolios 
    : portfolios.filter(p => p.page === selectedPage);

  return (
    <div className="admin-dashboard">
      <AdminNavbar 
        title="📂 Portfolio Management" 
        subtitle="Manage your portfolio items across all service pages"
      />
      <div className="admin-dashboard-wrapper">
        <AdminSidebar />

        <div className="admin-portfolio-content">
        <header className="admin-header">
          <h1>Welcome, Admin!</h1>
          <button className="btn-logout">
            Logout
          </button>
        </header>

        <div className="dashboard-main">
          <div className="section-header">
            <h2>📂 Portfolio Items ({filteredPortfolios.length})</h2>
            <button 
              className="btn-new-blog"
              onClick={() => {
                resetForm();
                setShowForm(true);
              }}
            >
              + Add Portfolio Item
            </button>
          </div>

          <div className="filter-section">
            <label>Filter by Page:</label>
            <select value={selectedPage} onChange={(e) => setSelectedPage(e.target.value)}>
              <option value="all">All Pages</option>
              {pages.map(page => (
                <option key={page.value} value={page.value}>{page.label}</option>
              ))}
            </select>
          </div>

          {error && <div className="error-message">{error}</div>}
          {loading && <div className="loading">Loading portfolio items...</div>}

          {showForm && (
            <div className="portfolio-form-section">
              <h3>{editingId ? 'Edit Portfolio Item' : 'Add New Portfolio Item'}</h3>
              <form onSubmit={handleSubmit} className="portfolio-form">
                <div className="form-group">
                  <label>Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Enter portfolio title"
                  />
                </div>

                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Enter portfolio description"
                    rows={4}
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Page *</label>
                    <select
                      name="page"
                      value={formData.page}
                      onChange={handleInputChange}
                    >
                      {pages.map(page => (
                        <option key={page.value} value={page.value}>{page.label}</option>
                      ))}
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
                </div>

                <div className="form-group">
                  <label>Image URL</label>
                  <input
                    type="text"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleInputChange}
                    placeholder="Enter image URL"
                  />
                </div>

                <div className="form-group">
                  <label>Website URL</label>
                  <input
                    type="text"
                    name="websiteUrl"
                    value={formData.websiteUrl}
                    onChange={handleInputChange}
                    placeholder="Enter website URL"
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
                    {editingId ? 'Update Item' : 'Create Item'}
                  </button>
                  <button type="button" className="cancel-btn" onClick={resetForm}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="portfolio-list">
            {filteredPortfolios.length === 0 ? (
              <div className="empty-state">
                <p>No portfolio items found. Create your first portfolio item!</p>
              </div>
            ) : (
              <div className="portfolio-items">
                {filteredPortfolios.map((portfolio) => (
                  <div key={portfolio._id} className={`portfolio-item ${portfolio.active ? 'active' : 'inactive'}`}>
                    <div className="portfolio-preview">
                      {portfolio.imageUrl ? (
                        <img src={portfolio.imageUrl} alt={portfolio.title} />
                      ) : (
                        <div className="no-image">No Image</div>
                      )}
                    </div>
                    <div className="portfolio-content">
                      <h4>{portfolio.title}</h4>
                      <p className="description">{portfolio.description || 'No description'}</p>
                      <div className="portfolio-meta">
                        <span className="page">{pages.find(p => p.value === portfolio.page)?.label}</span>
                        <span className="order">Order: {portfolio.order}</span>
                        <span className={`status ${portfolio.active ? 'active' : 'inactive'}`}>
                          {portfolio.active ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      {portfolio.websiteUrl && (
                        <a href={portfolio.websiteUrl} target="_blank" rel="noopener noreferrer" className="site-link">
                          View Site →
                        </a>
                      )}
                    </div>
                    <div className="portfolio-actions">
                      <button 
                        className="status-btn"
                        onClick={() => toggleActive(portfolio)}
                        title={portfolio.active ? 'Deactivate' : 'Activate'}
                      >
                        {portfolio.active ? '✓' : '○'}
                      </button>
                      <button 
                        className="edit-btn"
                        onClick={() => handleEdit(portfolio)}
                      >
                        Edit
                      </button>
                      <button 
                        className="delete-btn"
                        onClick={() => handleDelete(portfolio._id)}
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
      </div>
    </div>
  );
};

export default AdminPortfolio;