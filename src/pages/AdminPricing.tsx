import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminService } from '../services/adminService';
import PricingModal from '../components/PricingModal';
import './styles/AdminDashboard.css';

type PricingPlan = {
  _id: string;
  name: string;
  subtitle?: string;
  price: number;
  popular?: boolean;
  badge?: string;
  features: string[];
  interval?: string;
  order?: number;
  active?: boolean;
};

const emptyPlan: PricingPlan = {
  _id: '',
  name: '',
  subtitle: '',
  price: 0,
  popular: false,
  badge: '',
  features: [],
  interval: 'Monthly',
  order: 0,
  active: true,
};

const defaultPlans: Omit<PricingPlan, '_id'>[] = [
  {
    name: 'Standard Package',
    subtitle: 'For Small Business',
    price: 300,
    popular: false,
    badge: '',
    features: [
      'Initial Website Analysis',
      'Upto 5 Keyword Ranking',
      'Site Audit',
      'Competitor Analysis',
      'Google Analytics Setup',
      'Google Search Console Setup',
      'Robots.Txt Creation',
      'Sitemap Creation',
      'On Page Setup',
      'Keyword Research',
      'Few Major Pages Meta And Heading Tag Optimization',
      'URL Optimization',
      'Image Optimization',
      '2 SEO Optimized Blog Articles',
      'Few Existing Content Optimization',
      'Technical SEO',
      'Canonical URL Addition',
      'Custom 404 Page Setup',
      'OG Tags',
      'Page Redirection',
      'Browser Compatibility Check',
      'Page Speed Optimization',
      'Off Page SEO',
      'Quora Posting',
      'Reddit Posting',
      'Local SEO',
      'GMB Setup & Optimization',
      'Google Map Creation',
      'Monthly Report',
      'Work Done Report',
    ],
    interval: 'Monthly',
    order: 0,
    active: true,
  },
  {
    name: 'Professional Package',
    subtitle: 'For Medium Business',
    price: 400,
    popular: true,
    badge: 'Recommended',
    features: [
      'Initial Website Analysis',
      'Upto 10 Keyword Ranking',
      'Site Audit',
      'Competitor Analysis',
      'Google Analytics Setup',
      'Google Search Console Setup',
      'Robots.Txt Creation',
      'Sitemap Creation',
      'On Page Setup',
      'Keyword Research',
      'Keyword Mapping',
      'Few Major Pages Meta And Heading Tag Optimization',
      'URL Optimization',
      'Image Optimization',
      '4 SEO Optimized Blog Articles',
      'Few Existing Content Optimization',
      'Technical SEO',
      'Canonical URL Addition',
      'Custom 404 Page Setup',
      'OG Tags',
      'Page Redirection',
      'Browser Compatibility Check',
      'Page Speed Optimization',
      'Broken Link Fixing',
      'Site Architecture',
      'Mobile Friendliness',
      'Solve Keyword Cannibalization',
      'Hreflang Tags',
      'Competitor Backlink Research',
      'Off Page SEO',
      'Quora Posting',
      'Reddit Posting',
      'Guest Blogging',
      'Link Building',
      'Few Directory Submission',
      'Few Weekly Post On Quora',
      'Schema Implementation',
      'Few Infographic Creation And Sharing',
      'Local SEO',
      'GMB Setup & Optimization',
      'GMB Posting',
      'Few Local Citation',
      'Google Map Creation',
      'List Item',
      'Monthly Report',
      'Work Done Report',
      'On Page Report',
      'Backlink Report',
      'Traffic By Country',
      'Traffic Comparison',
      'Top 10 Performing Pages',
      'Top 10 Keywords',
      'Clicks, Impression, Position',
    ],
    interval: 'Monthly',
    order: 1,
    active: true,
  },
  {
    name: 'Premium',
    subtitle: 'For Large Business',
    price: 500,
    popular: false,
    badge: '',
    features: [
      'Initial Website Analysis',
      'Upto 20 Keyword Ranking',
      'Site Audit',
      'Competitor Analysis',
      'Google Analytics Setup',
      'Google Search Console Setup',
      'Robots.Txt Creation',
      'Sitemap Creation',
      'On Page Setup',
      'Keyword Research',
      'Keyword Mapping',
      'Few Major Pages Meta And Heading Tag Optimization',
      'URL Optimization',
      'Image Optimization',
      '6 SEO Optimized Blog Articles',
      'Existing Major Page Content Optimization',
      'Technical SEO',
      'Canonical URL Addition',
      'Custom 404 Page Setup',
      'OG Tags',
      'Page Redirection',
      'Sitemap',
      'Robots.Txt',
      'Browser Compatibility Check',
      'Page Speed Optimization',
      'Broken Link Fixing',
      'Site Architecture',
      'Mobile Friendliness',
      'Solve Keyword Cannibalization',
      'Hreflang Tags',
      'Competitor Backlink Research',
      'Off Page SEO',
      'Quora Posting',
      'Reddit Posting',
      'Guest Blogging',
      'Link Building',
      'Few Directory Submission',
      'Few Weekly Post On Quora',
      'Schema Implementation',
      'Conversion Tracking',
      'Few Infographic Creation And Sharing',
      'Local SEO',
      'GMB Setup & Optimization',
      'GMB Posting',
      'Few Local Citation',
      'Google Map Creation',
      'List Item',
      'Monthly Report',
      'Work Done Report',
      'On Page Report',
      'Backlink Report',
      'Traffic By Country',
      'Traffic Comparison',
      'Top 10 Performing Pages',
      'Top 10 Keywords',
      'Clicks, Impression, Position',
    ],
    interval: 'Monthly',
    order: 2,
    active: true,
  },
];
const AdminPricing: React.FC = () => {
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState<PricingPlan | null>(null);
  const [featurePool, setFeaturePool] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    loadPlans();
  }, []);

  const loadPlans = async () => {
    try {
      setLoading(true);
      const data = await adminService.listPricing();
      setPlans(data);
      const pool = Array.from(
        new Set(
          data.flatMap((p: PricingPlan) => (p.features ? p.features : []))
        )
      );
      setFeaturePool(pool);
    } catch (e) {
      setError('Failed to load pricing plans');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEditing(null);
    setIsModalOpen(false);
    setError('');
  };

  const openAddModal = () => {
    setEditing(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (plan: PricingPlan) => {
    setEditing(plan);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this pricing plan?')) return;
    try {
      await adminService.deletePricing(id);
      setPlans(plans.filter((p) => p._id !== id));
      if (editing?._id === id) resetForm();
    } catch {
      setError('Failed to delete pricing plan');
    }
  };

  const toggleFeature = (feature: string, checked: boolean) => {
    setFeaturePool((prev) => {
      const set = new Set(prev);
      if (checked && !prev.includes(feature)) {
        return [...prev, feature];
      }
      return prev;
    });
  };

  const importDefaults = async () => {
    try {
      setLoading(true);
      const createdPlans: PricingPlan[] = [];
      for (const plan of defaultPlans) {
        const saved = await adminService.createPricing(plan);
        createdPlans.push(saved);
      }
      const newPlans = [...createdPlans, ...plans];
      setPlans(newPlans);
      const pool = Array.from(
        new Set(newPlans.flatMap((p) => (p.features ? p.features : [])))
      );
      setFeaturePool(pool);
      resetForm();
    } catch {
      setError('Failed to import default plans');
    } finally {
      setLoading(false);
    }
  };

  const handleModalSubmit = async (formData: PricingPlan) => {
    try {
      if (editing?._id) {
        const updated = await adminService.updatePricing(editing._id, formData);
        setPlans(plans.map((p) => (p._id === editing._id ? updated : p)));
      } else {
        const created = await adminService.createPricing(formData);
        setPlans([created, ...plans]);
      }
      resetForm();
    } catch {
      setError('Failed to save pricing plan');
    }
  };

  return (
    <div className="admin-dashboard">
      <PricingModal
        isOpen={isModalOpen}
        onClose={resetForm}
        onSubmit={handleModalSubmit}
        initialData={editing || undefined}
        featurePool={featurePool}
        totalPlans={plans.length}
      />

      <header className="dashboard-header">
        <div className="header-left">
          <h1>💰 Pricing Management</h1>
          <p>Manage pricing plans displayed on the Pricing page.</p>
        </div>
        <button onClick={() => { adminService.logout(); navigate('/admin/login'); }} className="btn-logout">
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
          <button type="button" className="sidebar-link sidebar-link-active">
            💰 Pricing
          </button>
          <button type="button" className="sidebar-link" onClick={() => navigate('/admin/faq')}>
            ❓ FAQs
          </button>
        </aside>

        <div className="dashboard-main">
          <div className="section-header">
            <h2>Pricing Plans</h2>
            <div className="section-header-actions">
              <button type="button" className="btn-new-blog" onClick={openAddModal}>
                + Add Pricing Plan
              </button>
            </div>
          </div>

          <div className="clients-list-full">
            <div className="client-list-card">
              <h3>Existing Plans</h3>
              {error && <p className="client-error" style={{ marginBottom: '16px' }}>{error}</p>}
              {loading ? (
                <p className="loading">Loading pricing plans...</p>
              ) : plans.length === 0 ? (
                <>
                  <p className="empty-text">No pricing plans yet.</p>
                  <button type="button" className="btn-new-blog" onClick={importDefaults}>
                    Import Default Plans
                  </button>
                </>
              ) : (
                <div className="client-logo-list">
                  {plans.map((plan) => (
                    <div key={plan._id} className="client-logo-row" style={{ gridTemplateColumns: '1fr auto auto' }}>
                      <div className="client-logo-info">
                        <strong>{plan.name}</strong>
                        <span style={{ fontSize: '12px', color: '#6b7280' }}>
                          {plan.subtitle || '—'} • ${plan.price}/{plan.interval || 'Monthly'} {plan.popular ? '• Popular' : ''} {!plan.active ? '• Hidden' : ''}
                        </span>
                      </div>
                      <button type="button" className="btn-edit" onClick={() => handleEditClick(plan)}>
                        Edit
                      </button>
                      <button type="button" className="btn-delete" onClick={() => handleDelete(plan._id)}>
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

export default AdminPricing;

