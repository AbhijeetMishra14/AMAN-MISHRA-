import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminService } from '../services/adminService';
import './styles/AdminDashboard.css';

interface Job {
  _id: string;
  title: string;
  location?: string;
  type?: string;
  description?: string;
  order?: number;
  active?: boolean;
}

const emptyJob: Omit<Job, '_id'> = {
  title: '',
  location: '',
  type: '',
  description: '',
  order: 0,
  active: true,
};

const AdminCareer: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState<Job | null>(null);
  const [form, setForm] = useState<Omit<Job, '_id'>>(emptyJob);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    void loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      setLoading(true);
      const data = await adminService.listJobs();
      setJobs(Array.isArray(data) ? data : []);
      setError('');
    } catch (e) {
      console.error('Failed to load jobs', e);
      setError('Failed to load jobs');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEditing(null);
    setForm({ ...emptyJob, order: jobs.length });
    setError('');
  };

  const handleChange = (field: keyof Omit<Job, '_id'>, value: string | number | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) {
      setError('Job title is required');
      return;
    }
    try {
      if (editing?._id) {
        const updated = await adminService.updateJob(editing._id, form);
        setJobs(jobs.map((j) => (j._id === editing._id ? updated : j)));
      } else {
        const created = await adminService.createJob(form);
        setJobs([created, ...jobs]);
      }
      resetForm();
    } catch (e) {
      console.error('Failed to save job', e);
      setError('Failed to save job');
    }
  };

  const handleEdit = (job: Job) => {
    setEditing(job);
    setForm({
      title: job.title,
      location: job.location || '',
      type: job.type || '',
      description: job.description || '',
      order: job.order ?? 0,
      active: job.active !== false,
    });
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this job?')) return;
    try {
      await adminService.deleteJob(id);
      setJobs(jobs.filter((j) => j._id !== id));
      if (editing?._id === id) resetForm();
    } catch (e) {
      console.error('Failed to delete job', e);
      setError('Failed to delete job');
    }
  };

  const handleLogout = () => {
    adminService.logout();
    navigate('/admin/login');
  };

  return (
    <div className="admin-dashboard">
      <header className="dashboard-header">
        <div className="header-left">
          <h1>👨‍💻 Careers Management</h1>
          <p>Manage open positions displayed on the Careers page.</p>
        </div>
        <button onClick={handleLogout} className="btn-logout">
          Logout
        </button>
      </header>

      <div className="dashboard-layout">
        <aside className="dashboard-sidebar">
          <button type="button" className="sidebar-link" onClick={() => navigate('/admin/dashboard')}>
            📝 Blog Posts
          </button>
          <button type="button" className="sidebar-link" onClick={() => navigate('/admin/clients')}>
            🤝 Trusted Clients
          </button>
          <button type="button" className="sidebar-link" onClick={() => navigate('/admin/pricing')}>
            💰 Pricing
          </button>
          <button type="button" className="sidebar-link sidebar-link-active">
            👨‍💻 Careers
          </button>
          <button type="button" className="sidebar-link" onClick={() => navigate('/admin/faq')}>
            ❓ FAQs
          </button>
        </aside>

        <div className="dashboard-main">
          <div className="section-header">
            <h2>Open Positions</h2>
          </div>

          <div className="clients-admin-grid">
            <form className="client-form-card" onSubmit={handleSubmit}>
              <h3>{editing ? 'Edit Position' : 'Add New Position'}</h3>

              <label className="client-form-label">
                Job Title
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  placeholder="e.g. SEO Intern"
                />
              </label>

              <label className="client-form-label">
                Location
                <input
                  type="text"
                  value={form.location || ''}
                  onChange={(e) => handleChange('location', e.target.value)}
                  placeholder="e.g. Remote / Kathmandu"
                />
              </label>

              <label className="client-form-label">
                Type
                <input
                  type="text"
                  value={form.type || ''}
                  onChange={(e) => handleChange('type', e.target.value)}
                  placeholder="e.g. Internship / Full-time"
                />
              </label>

              <label className="client-form-label">
                Description
                <textarea
                  rows={4}
                  value={form.description || ''}
                  onChange={(e) => handleChange('description', e.target.value)}
                  placeholder="Short description of responsibilities, skills, etc."
                />
              </label>

              <label className="client-form-label">
                Order (lower shows first)
                <input
                  type="number"
                  value={form.order ?? 0}
                  onChange={(e) => handleChange('order', Number(e.target.value))}
                  min={0}
                />
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px' }}>
                <input
                  type="checkbox"
                  checked={form.active !== false}
                  onChange={(e) => handleChange('active', e.target.checked)}
                />
                Active (visible on site)
              </label>

              {error && <p className="client-error">{error}</p>}

              <div style={{ display: 'flex', gap: '10px' }}>
                <button type="submit" className="btn-new-blog">
                  {editing ? 'Update Position' : 'Add Position'}
                </button>
                {editing && (
                  <button type="button" className="btn-delete" onClick={resetForm}>
                    Cancel
                  </button>
                )}
              </div>
            </form>

            <div className="client-list-card">
              <h3>Current Positions</h3>
              {loading ? (
                <p className="loading">Loading positions...</p>
              ) : jobs.length === 0 ? (
                <p className="empty-state">No positions defined yet.</p>
              ) : (
                <div className="client-logo-list">
                  {jobs.map((job) => (
                    <div key={job._id} className="client-logo-row" style={{ gridTemplateColumns: '1fr auto auto' }}>
                      <div className="client-logo-info">
                        <strong>{job.title}</strong>
                        <span style={{ fontSize: '12px', color: '#6b7280' }}>
                          {job.location || 'Location not specified'} • {job.type || 'Type not specified'}{' '}
                          {job.active === false ? '• Hidden' : ''}
                        </span>
                      </div>
                      <button type="button" className="btn-edit" onClick={() => handleEdit(job)}>
                        Edit
                      </button>
                      <button type="button" className="btn-delete" onClick={() => handleDelete(job._id)}>
                        Delete
                      </button>
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

export default AdminCareer;
