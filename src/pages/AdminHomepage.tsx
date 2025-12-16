import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminService } from '../services/adminService';
import './styles/AdminHomepage.css';

interface Section {
  _id?: string;
  type: string;
  title?: string;
  subtitle?: string;
  description?: string;
  order?: number;
  visible?: boolean;
  buttonText?: string;
  buttonLink?: string;
}

const AdminHomepage: React.FC = () => {
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState<Section | null>(null);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      navigate('/admin');
      return;
    }
    void loadSections();
  }, []);

  const loadSections = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await adminService.listSections();
      setSections(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error('Failed to load sections', e);
      setError('Failed to load homepage sections');
    } finally {
      setLoading(false);
    }
  };

  const handleSectionClick = (section: Section) => {
    setFormData({ ...section });
    setShowSidebar(true);
  };

  const handleFormChange = (field: keyof Section, value: string | boolean | number) => {
    setFormData((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  const handleSaveSection = async () => {
    if (!formData) return;
    try {
      setSaving(true);
      setError('');
      setSuccess('');

      if (formData._id) {
        await adminService.updateSection(formData._id, formData);
      } else {
        await adminService.createSection(formData);
      }

      await loadSections();
      setFormData(null);
      setShowSidebar(false);
      const now = new Date();
      setLastSaved(now);
      setSuccess('Section saved successfully.');
      setTimeout(() => setSuccess(''), 3000);
    } catch (e) {
      console.error('Failed to save section', e);
      setError('Failed to save section');
    } finally {
      setSaving(false);
    }
  };

  const handleToggleVisible = async (section: Section) => {
    try {
      await adminService.toggleSectionVisibility(section._id as string);
      await loadSections();
    } catch (e) {
      console.error('Failed to toggle visibility', e);
      setError('Failed to toggle section visibility');
    }
  };

  const renderEditForm = () => {
    if (!formData) return null;

    return (
      <div className="edit-form">
        <h3>Edit {formData.type.toUpperCase()} Section</h3>

        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            value={formData.title || ''}
            onChange={(e) => handleFormChange('title', e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Subtitle</label>
          <input
            type="text"
            value={formData.subtitle || ''}
            onChange={(e) => handleFormChange('subtitle', e.target.value)}
          />
        </div>

        {formData.type !== 'clients' && (
          <div className="form-group">
            <label>Description</label>
            <textarea
              value={formData.description || ''}
              onChange={(e) => handleFormChange('description', e.target.value)}
              rows={4}
            />
          </div>
        )}

        {formData.type !== 'testimonials' && formData.type !== 'clients' && (
          <>
            <div className="form-group">
              <label>Button Text</label>
              <input
                type="text"
                value={formData.buttonText || ''}
                onChange={(e) => handleFormChange('buttonText', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Button Link</label>
              <input
                type="text"
                value={formData.buttonLink || ''}
                onChange={(e) => handleFormChange('buttonLink', e.target.value)}
              />
            </div>
          </>
        )}

        <div className="form-actions">
          <button className="btn-save" onClick={handleSaveSection} disabled={saving}>
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
          <button
            className="btn-cancel"
            onClick={() => {
              setFormData(null);
              setShowSidebar(false);
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  };

  const renderPreview = () => {
    return (
      <div className="homepage-full-preview">
        {sections
          .slice()
          .sort((a, b) => (a.order || 0) - (b.order || 0))
          .map((section) => (
            <div
              key={section._id}
              className={`preview-section preview-${section.type} ${section.visible === false ? 'preview-hidden' : ''}`}
            >
              <div className="section-toolbar">
                <button className="edit-btn" onClick={() => handleSectionClick(section)}>
                  ✏️ Edit
                </button>
                <button className="visibility-btn" onClick={() => handleToggleVisible(section)}>
                  {section.visible === false ? '👁️ Show' : '🙈 Hide'}
                </button>
              </div>

              {section.type === 'hero' && (
                <div className="preview-hero" onClick={() => handleSectionClick(section)}>
                  <h1>{section.title || 'Your Hero Title'}</h1>
                  <p>{section.subtitle || 'Your subtitle goes here'}</p>
                  {section.buttonText && <a className="btn">{section.buttonText}</a>}
                </div>
              )}

              {section.type === 'about' && (
                <div className="preview-about" onClick={() => handleSectionClick(section)}>
                  <h2>{section.title || 'About'}</h2>
                  <p>{section.description || 'About content'}</p>
                  {section.buttonText && <a className="btn">{section.buttonText}</a>}
                </div>
              )}

              {section.type === 'features' && (
                <div className="preview-features" onClick={() => handleSectionClick(section)}>
                  <h2>{section.title || 'Features'}</h2>
                  <p className="placeholder">{section.description || 'Features section'}</p>
                </div>
              )}

              {section.type === 'cta' && (
                <div className="preview-cta" onClick={() => handleSectionClick(section)}>
                  <h2>{section.title || 'Ready to Get Started?'}</h2>
                  <p>{section.subtitle || 'Let us help you'}</p>
                  {section.buttonText && <a className="btn">{section.buttonText}</a>}
                </div>
              )}

              {section.type === 'testimonials' && (
                <div className="preview-testimonials" onClick={() => handleSectionClick(section)}>
                  <h2>{section.title || 'What Our Customers Say'}</h2>
                  <p className="placeholder">{section.description || 'Testimonials'}</p>
                </div>
              )}

              {section.type === 'faq' && (
                <div className="preview-faq" onClick={() => handleSectionClick(section)}>
                  <h2>{section.title || 'FAQs'}</h2>
                  <p className="placeholder">{section.description || 'Frequently Asked Questions'}</p>
                </div>
              )}

              {section.type === 'pricing' && (
                <div className="preview-pricing" onClick={() => handleSectionClick(section)}>
                  <h2>{section.title || 'Our Pricing'}</h2>
                  <p className="placeholder">{section.description || 'Pricing plans'}</p>
                </div>
              )}

              {section.type === 'clients' && (
                <div className="preview-clients" onClick={() => handleSectionClick(section)}>
                  <h2>{section.title || 'Our Trusted Clients'}</h2>
                  <p className="placeholder">{section.description || 'Client logos'}</p>
                </div>
              )}
            </div>
          ))}
      </div>
    );
  };

  return (
    <div className="admin-homepage">
      <header className="admin-header">
        <h1>🏠 Homepage</h1>
        <div className="header-actions">
          {lastSaved && <span className="last-saved">Last saved: {lastSaved.toLocaleTimeString()}</span>}
        </div>
      </header>

      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="homepage-layout">
          <div className="preview-container">{renderPreview()}</div>

          {showSidebar && (
            <aside className="edit-sidebar">
              <button className="close-sidebar" onClick={() => setShowSidebar(false)}>
                ×
              </button>
              {renderEditForm()}
            </aside>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminHomepage;
