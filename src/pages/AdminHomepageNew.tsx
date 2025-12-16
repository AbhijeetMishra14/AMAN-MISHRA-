import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import adminService from '../services/adminService';
import HomepagePreview from '../components/HomepagePreview';
import './styles/AdminHomepageNew.css';
import '../components/HomepagePreview.css';

interface Section {
  _id: string;
  type: string;
  title?: string;
  subtitle?: string;
  description?: string;
  order: number;
  visible: boolean;
  version?: number;
  features?: any[];
  testimonials?: any[];
  buttonText?: string;
  buttonLink?: string;
}

const AdminHomepageNew: React.FC = () => {
  const navigate = useNavigate();
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    type: 'hero',
    title: '',
    subtitle: '',
    description: '',
    buttonText: '',
    buttonLink: '',
    visible: true,
    features: [] as any[],
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
      const data = await adminService.listSections();
      setSections(Array.isArray(data) ? data : []);
      setError('');
    } catch (err: any) {
      console.error('Error fetching sections:', err);
      setError('Failed to load sections');
    } finally {
      setLoading(false);
    }
  };

  const handleEditSection = (section: Section) => {
    setFormData({
      type: section.type,
      title: section.title || '',
      subtitle: section.subtitle || '',
      description: section.description || '',
      buttonText: section.buttonText || '',
      buttonLink: section.buttonLink || '',
      visible: section.visible,
      features: section.features || [],
    });
    setEditingId(section._id);
    setShowSidebar(true);
  };

  const handleAddSection = () => {
    setFormData({
      type: 'hero',
      title: '',
      subtitle: '',
      description: '',
      buttonText: '',
      buttonLink: '',
      visible: true,
      features: [],
    });
    setEditingId(null);
    setShowSidebar(true);
  };

  const handleSaveSection = async () => {
    try {
      if (editingId) {
        await adminService.updateSection(editingId, formData);
      } else {
        await adminService.createSection(formData);
      }
      fetchSections();
      setShowSidebar(false);
      setLastSaved(new Date());
      setError('');
    } catch (err: any) {
      console.error('Error saving section:', err);
      setError('Failed to save section');
    }
  };

  const handleDeleteSection = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this section?')) {
      try {
        await adminService.deleteSection(id);
        fetchSections();
        setLastSaved(new Date());
      } catch (err: any) {
        console.error('Error deleting section:', err);
        setError('Failed to delete section');
      }
    }
  };

  const handleToggleVisibility = async (id: string) => {
    try {
      await adminService.toggleSectionVisibility(id);
      fetchSections();
      setLastSaved(new Date());
    } catch (err: any) {
      console.error('Error toggling visibility:', err);
      setError('Failed to toggle visibility');
    }
  };

  const handleDragStart = (id: string) => {
    setDraggedItem(id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = async (targetId: string) => {
    if (!draggedItem || draggedItem === targetId) return;

    const newSections = [...sections];
    const draggedIdx = newSections.findIndex(s => s._id === draggedItem);
    const targetIdx = newSections.findIndex(s => s._id === targetId);

    [newSections[draggedIdx], newSections[targetIdx]] = [newSections[targetIdx], newSections[draggedIdx]];

    setSections(newSections);

    try {
      await adminService.reorderSections(
        newSections.map((s, idx) => ({ id: s._id, order: idx }))
      );
      setLastSaved(new Date());
      setDraggedItem(null);
    } catch (err) {
      console.error('Error reordering:', err);
      fetchSections();
    }
  };

  const renderSectionPreview = (section: Section) => {
    const baseStyle = {
      opacity: section.visible ? 1 : 0.5,
      borderLeft: `4px solid ${getColorForType(section.type)}`,
    };

    return (
      <div
        key={section._id}
        className="section-card"
        style={baseStyle}
        draggable
        onDragStart={() => handleDragStart(section._id)}
        onDragOver={handleDragOver}
        onDrop={() => handleDrop(section._id)}
      >
        <div className="section-card-header">
          <div className="section-info">
            <span className="section-type">{section.type.toUpperCase()}</span>
            <h4>{section.title || `${section.type} Section`}</h4>
          </div>
          <div className="section-badge">v{section.version || 1}</div>
        </div>

        <div className="section-card-body">
          {section.subtitle && <p>{section.subtitle}</p>}
          {section.description && <p className="section-description">{section.description}</p>}
        </div>

        <div className="section-card-actions">
          <button
            className={`visibility-btn ${section.visible ? 'visible' : 'hidden'}`}
            onClick={() => handleToggleVisibility(section._id)}
            title={section.visible ? 'Hide section' : 'Show section'}
          >
            {section.visible ? '👁️' : '👁️‍🗨️'}
          </button>
          <button
            className="edit-btn"
            onClick={() => handleEditSection(section)}
          >
            ✏️ Edit
          </button>
          <button
            className="delete-btn"
            onClick={() => handleDeleteSection(section._id)}
          >
            🗑️
          </button>
        </div>
      </div>
    );
  };

  const getColorForType = (type: string) => {
    const colors: { [key: string]: string } = {
      hero: '#3498db',
      features: '#2ecc71',
      about: '#f39c12',
      testimonials: '#e74c3c',
      faq: '#9b59b6',
      cta: '#1abc9c',
      pricing: '#e67e22',
      clients: '#34495e',
    };
    return colors[type] || '#95a5a6';
  };

  return (
    <div className="admin-homepage-new">
      <header className="admin-header">
        <h1>🏠 Homepage Builder</h1>
        <div className="header-actions">
          {lastSaved && (
            <span className="last-saved">Last saved: {lastSaved.toLocaleTimeString()}</span>
          )}
          <button className="btn-add-section" onClick={handleAddSection}>
            + Add Section
          </button>
        </div>
      </header>

      <div className="homepage-builder-layout">
        <aside className={`builder-sidebar ${showSidebar ? 'open' : ''}`}>
          <div className="sidebar-header">
            <h3>{editingId ? 'Edit Section' : 'New Section'}</h3>
            <button className="close-btn" onClick={() => setShowSidebar(false)}>×</button>
          </div>

          <div className="sidebar-content">
            <div className="form-group">
              <label>Section Type *</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              >
                <option value="hero">Hero</option>
                <option value="features">Features</option>
                <option value="about">About</option>
                <option value="testimonials">Testimonials</option>
                <option value="faq">FAQ</option>
                <option value="cta">Call to Action</option>
                <option value="pricing">Pricing</option>
                <option value="clients">Clients</option>
              </select>
            </div>

            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Section title"
              />
            </div>

            <div className="form-group">
              <label>Subtitle</label>
              <input
                type="text"
                value={formData.subtitle}
                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                placeholder="Section subtitle"
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Section description"
                rows={4}
              />
            </div>

            <div className="form-group">
              <label>Button Text</label>
              <input
                type="text"
                value={formData.buttonText}
                onChange={(e) => setFormData({ ...formData, buttonText: e.target.value })}
                placeholder="e.g., Learn More"
              />
            </div>

            <div className="form-group">
              <label>Button Link</label>
              <input
                type="text"
                value={formData.buttonLink}
                onChange={(e) => setFormData({ ...formData, buttonLink: e.target.value })}
                placeholder="e.g., /about"
              />
            </div>

            <div className="form-group checkbox">
              <label>
                <input
                  type="checkbox"
                  checked={formData.visible}
                  onChange={(e) => setFormData({ ...formData, visible: e.target.checked })}
                />
                Visible on homepage
              </label>
            </div>

            <div className="sidebar-actions">
              <button className="btn-save" onClick={handleSaveSection}>
                Save Section
              </button>
              <button className="btn-cancel" onClick={() => setShowSidebar(false)}>
                Cancel
              </button>
            </div>
          </div>
        </aside>

        <main className="builder-main">
          {error && <div className="error-banner">{error}</div>}

          {loading ? (
            <div className="loading-state">
              <p>Loading sections...</p>
            </div>
          ) : sections.length === 0 ? (
            <div className="empty-state">
              <h2>No sections yet</h2>
              <p>Create your first homepage section to get started</p>
              <button className="btn-primary" onClick={handleAddSection}>
                Create First Section
              </button>
            </div>
          ) : (
            <div className="sections-preview">
              <div className="preview-header">
                <h2>Homepage Sections ({sections.filter(s => s.visible).length}/{sections.length})</h2>
                <p>Click on any section to edit. Drag to reorder.</p>
              </div>

              <div className="sections-grid">
                {sections.map((section) => (
                  <div key={section._id}>
                    {renderSectionPreview(section)}
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>

        <HomepagePreview sections={sections} />
      </div>
    </div>
  );
};

export default AdminHomepageNew;
