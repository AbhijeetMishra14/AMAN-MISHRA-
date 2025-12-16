import React, { useState, useEffect } from 'react';
import './PricingModal.css';

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

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: PricingPlan) => void;
  initialData?: PricingPlan;
  featurePool: string[];
  totalPlans: number;
}

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

const PricingModal: React.FC<PricingModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  featurePool,
  totalPlans,
}) => {
  const [form, setForm] = useState<PricingPlan>(emptyPlan);
  const [newFeature, setNewFeature] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialData) {
      setForm({
        ...initialData,
        order: initialData.order ?? totalPlans,
        interval: initialData.interval || 'Monthly',
        features: initialData.features || [],
      });
    } else {
      setForm({ ...emptyPlan, order: totalPlans });
    }
    setError('');
    setNewFeature('');
  }, [isOpen, initialData, totalPlans]);

  if (!isOpen) return null;

  const handleChange = (field: keyof PricingPlan, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const toggleFeature = (feature: string, checked: boolean) => {
    setForm((prev) => {
      const set = new Set(prev.features || []);
      if (checked) set.add(feature);
      else set.delete(feature);
      return { ...prev, features: Array.from(set) };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!form.name.trim()) {
      setError('Name is required');
      return;
    }
    onSubmit(form);
  };

  return (
    <div className="pricing-modal-overlay">
      <div className="pricing-modal">
        <div className="pricing-modal-header">
          <h2>{initialData ? 'Edit Pricing Plan' : 'Add Pricing Plan'}</h2>
          <button
            type="button"
            className="pricing-modal-close"
            onClick={onClose}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="pricing-modal-form">
          <div className="pricing-modal-body">
            <div className="form-group">
              <label>
                Plan Name <span className="required">*</span>
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="e.g. Standard Package"
              />
            </div>

            <div className="form-group">
              <label>Subtitle</label>
              <input
                type="text"
                value={form.subtitle}
                onChange={(e) => handleChange('subtitle', e.target.value)}
                placeholder="For Small Business"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>
                  Price <span className="required">*</span>
                </label>
                <input
                  type="number"
                  value={form.price}
                  onChange={(e) => handleChange('price', Number(e.target.value))}
                  placeholder="300"
                  min={0}
                />
              </div>

              <div className="form-group">
                <label>Billing Interval</label>
                <input
                  type="text"
                  value={form.interval || 'Monthly'}
                  onChange={(e) => handleChange('interval', e.target.value)}
                  placeholder="Monthly"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>
                  <input
                    type="checkbox"
                    checked={!!form.popular}
                    onChange={(e) => handleChange('popular', e.target.checked)}
                  />
                  <span>Popular plan?</span>
                </label>
              </div>

              <div className="form-group">
                <label>Badge</label>
                <input
                  type="text"
                  value={form.badge || ''}
                  onChange={(e) => handleChange('badge', e.target.value)}
                  placeholder="Recommended"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Order (lower shows first)</label>
              <input
                type="number"
                value={form.order ?? 0}
                onChange={(e) => handleChange('order', Number(e.target.value))}
                min={0}
              />
            </div>

            <div className="form-group">
              <label>Active (visible on site)</label>
              <label>
                <input
                  type="checkbox"
                  checked={form.active !== false}
                  onChange={(e) => handleChange('active', e.target.checked)}
                />
                <span>Show this plan on the website</span>
              </label>
            </div>

            <div className="form-group">
              <label>Features</label>
              <div className="features-list">
                {featurePool.length === 0 ? (
                  <p className="no-features">No features yet. Add one below.</p>
                ) : (
                  featurePool.map((feat) => (
                    <label key={feat} className="feature-checkbox">
                      <input
                        type="checkbox"
                        checked={(form.features || []).includes(feat)}
                        onChange={(e) => toggleFeature(feat, e.target.checked)}
                      />
                      <span>{feat}</span>
                    </label>
                  ))
                )}
              </div>

              <div className="add-feature-group">
                <input
                  type="text"
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  placeholder="Add new feature"
                />
                <button
                  type="button"
                  className="btn-add-feature"
                  onClick={() => {
                    const feature = newFeature.trim();
                    if (feature && !featurePool.includes(feature)) {
                      toggleFeature(feature, true);
                      setNewFeature('');
                    } else if (feature) {
                      toggleFeature(feature, true);
                      setNewFeature('');
                    }
                  }}
                >
                  Add
                </button>
              </div>
            </div>

            {error && <div className="form-error">{error}</div>}
          </div>

          <div className="pricing-modal-footer">
            <button
              type="button"
              className="btn-cancel"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-submit"
            >
              {initialData ? 'Update Plan' : 'Add Plan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PricingModal;
