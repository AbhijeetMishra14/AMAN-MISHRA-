import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import adminService from '../services/adminService';
import AdminNavbar from '../components/AdminNavbar';
import AdminSidebar from '../components/AdminSidebar';
import './styles/AdminDashboard.css';

interface Feature {
  title: string;
  description: string;
  icon?: string;
  image?: string;
}

interface PageSection {
  _id?: string;
  type: string;
  title?: string;
  subtitle?: string;
  description?: string;
  order: number;
  visible: boolean;
  buttonText?: string;
  buttonLink?: string;
  ctaButtonText?: string;
  ctaButtonLink?: string;
  features?: Feature[];
  backgroundColor?: string;
  textColor?: string;
  version?: number;
}

const AdminPageSections: React.FC = () => {
  const navigate = useNavigate();
  const [sections, setSections] = useState<PageSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [seeding, setSeeding] = useState(false);

  const [formData, setFormData] = useState<PageSection>({
    type: 'hero',
    title: '',
    subtitle: '',
    description: '',
    buttonText: '',
    buttonLink: '',
    ctaButtonText: '',
    ctaButtonLink: '',
    visible: true,
    order: 0,
    features: [],
    backgroundColor: '',
    textColor: '',
  });

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      navigate('/admin/login');
    } else {
      fetchSections();
    }
  }, [navigate]);

  const fetchSections = async () => {
    try {
      setLoading(true);
      const data = await adminService.listPageSections();
      setSections(Array.isArray(data) ? data.sort((a, b) => a.order - b.order) : []);
      setError('');
    } catch (err) {
      console.error('Error fetching sections:', err);
      setError('Failed to load page sections');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
      ...(name === 'order' && { order: parseInt(value) || 0 }),
    }));
  };

  const handleEditSection = (section: PageSection) => {
    setFormData(section);
    setEditingId(section._id || null);
    setShowForm(true);
  };

  const handleAddSection = () => {
    setFormData({
      type: 'hero',
      title: '',
      subtitle: '',
      description: '',
      buttonText: '',
      buttonLink: '',
      ctaButtonText: '',
      ctaButtonLink: '',
      visible: true,
      order: sections.length,
      features: [],
      backgroundColor: '',
      textColor: '',
    });
    setEditingId(null);
    setShowForm(true);
  };

  const handleSaveSection = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.title?.trim()) {
      setError('Title is required');
      return;
    }

    try {
      let result;
      if (editingId) {
        result = await adminService.updatePageSection(editingId, formData);
        setSections(sections.map((s) => (s._id === editingId ? result : s)));
        setSuccess('Section updated successfully!');
      } else {
        result = await adminService.createPageSection(formData);
        setSections([...sections, result].sort((a, b) => a.order - b.order));
        setSuccess('Section created successfully!');
      }
      setShowForm(false);
      setEditingId(null);
    } catch (err) {
      setError('Failed to save section');
    }
  };

  const handleDeleteSection = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this section?')) return;

    try {
      await adminService.deletePageSection(id);
      setSections(sections.filter((s) => s._id !== id));
      setSuccess('Section deleted successfully!');
    } catch (err) {
      setError('Failed to delete section');
    }
  };

  const handleSeedDatabase = async () => {
    if (!window.confirm('This will populate the database with default sections. Continue?')) return;

    setSeeding(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('http://localhost:5000/api/pageSections/seed', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('admin_token')}`,
        },
      });

      if (!response.ok) throw new Error('Seeding failed');

      const result = await response.json();
      setSuccess(`Database seeded successfully! Created ${result.count} sections.`);
      fetchSections();
    } catch (err) {
      setError('Failed to seed database');
    } finally {
      setSeeding(false);
    }
  };

  const handleMigrateFromCode = async () => {
    if (!window.confirm('This will migrate current page data from code to database. Continue?')) return;

    try {
      const response = await fetch('http://localhost:5000/api/pageSections/migrate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('admin_token')}`,
        },
      });

      if (!response.ok) throw new Error('Migration failed');

      const result = await response.json();
      setSuccess(`Migration successful! Migrated ${result.count} sections.`);
      fetchSections();
    } catch (err) {
      setError('Failed to migrate data from code');
    }
  };

  if (loading) {
    return (
      <div className="admin-dashboard">
        <AdminNavbar title="📄 Page Sections" subtitle="Manage homepage sections" />
        <div className="admin-dashboard-wrapper">
          <AdminSidebar />
          <div style={{ flex: 1, padding: '20px' }}>Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <AdminNavbar 
        title="📄 Page Sections" 
        subtitle="Update hero, about, features, and other sections across all pages"
      />
      <div className="admin-dashboard-wrapper">
        <AdminSidebar />
        <div className="admin-dashboard-content">

          {error && <div style={{ backgroundColor: '#fee', color: '#c00', padding: '12px', borderRadius: '4px', marginBottom: '20px' }}>{error}</div>}
          {success && <div style={{ backgroundColor: '#efe', color: '#060', padding: '12px', borderRadius: '4px', marginBottom: '20px' }}>{success}</div>}

          <div style={{ display: 'flex', gap: '10px', marginBottom: '30px', flexWrap: 'wrap' }}>
            <button
              onClick={handleAddSection}
              style={{
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              ➕ Add New Section
            </button>
            <button
              onClick={handleSeedDatabase}
              disabled={seeding}
              style={{
                backgroundColor: '#2196F3',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '4px',
                cursor: seeding ? 'not-allowed' : 'pointer',
                opacity: seeding ? 0.6 : 1,
              }}
            >
              {seeding ? '🔄 Seeding...' : '🌱 Seed Database'}
            </button>
            <button
              onClick={handleMigrateFromCode}
              style={{
                backgroundColor: '#FF9800',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              📥 Migrate from Code
            </button>
          </div>

          {showForm && (
            <div
              style={{
                backgroundColor: 'white',
                padding: '30px',
                borderRadius: '8px',
                marginBottom: '30px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              }}
            >
              <h2>{editingId ? 'Edit Section' : 'Create New Section'}</h2>

              <form onSubmit={handleSaveSection}>
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Section Type *</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                    }}
                  >
                    <option value="hero">Hero Section</option>
                    <option value="about">About Section</option>
                    <option value="features">Features Section</option>
                    <option value="testimonials">Testimonials</option>
                    <option value="faq">FAQ Section</option>
                    <option value="cta">Call to Action</option>
                    <option value="pricing">Pricing Section</option>
                    <option value="clients">Clients Section</option>
                  </select>
                </div>

                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title || ''}
                    onChange={handleInputChange}
                    placeholder="Section title"
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Subtitle</label>
                  <input
                    type="text"
                    name="subtitle"
                    value={formData.subtitle || ''}
                    onChange={handleInputChange}
                    placeholder="Section subtitle"
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Description</label>
                  <textarea
                    name="description"
                    value={formData.description || ''}
                    onChange={handleInputChange}
                    placeholder="Section description"
                    rows={4}
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div style={{ marginBottom: '15px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Button Text</label>
                    <input
                      type="text"
                      name="buttonText"
                      value={formData.buttonText || ''}
                      onChange={handleInputChange}
                      placeholder="e.g., Start Your Free Consultation"
                      style={{
                        width: '100%',
                        padding: '10px',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Button Link</label>
                    <input
                      type="text"
                      name="buttonLink"
                      value={formData.buttonLink || ''}
                      onChange={handleInputChange}
                      placeholder="/contact"
                      style={{
                        width: '100%',
                        padding: '10px',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '15px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Background Color</label>
                    <input
                      type="text"
                      name="backgroundColor"
                      value={formData.backgroundColor || ''}
                      onChange={handleInputChange}
                      placeholder="#ffffff"
                      style={{
                        width: '100%',
                        padding: '10px',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Text Color</label>
                    <input
                      type="text"
                      name="textColor"
                      value={formData.textColor || ''}
                      onChange={handleInputChange}
                      placeholder="#000000"
                      style={{
                        width: '100%',
                        padding: '10px',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '15px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Order</label>
                    <input
                      type="number"
                      name="order"
                      value={formData.order}
                      onChange={handleInputChange}
                      style={{
                        width: '100%',
                        padding: '10px',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 0 }}>
                      <input
                        type="checkbox"
                        name="visible"
                        checked={formData.visible}
                        onChange={handleInputChange}
                      />
                      <span>Visible on Site</span>
                    </label>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    type="submit"
                    style={{
                      backgroundColor: '#4CAF50',
                      color: 'white',
                      border: 'none',
                      padding: '10px 20px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                    }}
                  >
                    {editingId ? 'Update Section' : 'Create Section'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setEditingId(null);
                    }}
                    style={{
                      backgroundColor: '#ccc',
                      color: '#333',
                      border: 'none',
                      padding: '10px 20px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          <div>
            <h2>Current Sections ({sections.length})</h2>
            {sections.length === 0 ? (
              <p>No sections found. Create one or seed the database.</p>
            ) : (
              <div style={{ display: 'grid', gap: '15px' }}>
                {sections.map((section) => (
                  <div
                    key={section._id}
                    style={{
                      backgroundColor: 'white',
                      padding: '20px',
                      borderRadius: '8px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                      borderLeft: `4px solid ${section.visible ? '#4CAF50' : '#ddd'}`,
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '10px' }}>
                      <div>
                        <h3 style={{ margin: '0 0 5px 0' }}>
                          {section.type.toUpperCase()} - {section.title}
                        </h3>
                        <p style={{ margin: '0', color: '#666', fontSize: '14px' }}>
                          Order: {section.order} | Status: {section.visible ? '✅ Visible' : '❌ Hidden'}
                        </p>
                      </div>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <button
                          onClick={() => handleEditSection(section)}
                          style={{
                            backgroundColor: '#2196F3',
                            color: 'white',
                            border: 'none',
                            padding: '8px 16px',
                            borderRadius: '4px',
                            cursor: 'pointer',
                          }}
                        >
                          ✏️ Edit
                        </button>
                        <button
                          onClick={() => section._id && handleDeleteSection(section._id)}
                          style={{
                            backgroundColor: '#f44336',
                            color: 'white',
                            border: 'none',
                            padding: '8px 16px',
                            borderRadius: '4px',
                            cursor: 'pointer',
                          }}
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </div>
                    {section.subtitle && <p style={{ margin: '5px 0', color: '#666' }}>{section.subtitle}</p>}
                    {section.description && (
                      <p
                        style={{
                          margin: '5px 0',
                          color: '#999',
                          fontSize: '14px',
                          lineHeight: '1.4',
                        }}
                      >
                        {section.description.substring(0, 100)}...
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPageSections;
