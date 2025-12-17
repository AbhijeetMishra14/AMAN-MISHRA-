import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminService } from '../services/adminService';
import ClientLogoModal from '../components/ClientLogoModal';
import AdminNavbar from '../components/AdminNavbar';
import './styles/AdminDashboard.css';
import ClientLogo1 from '../assets/Client-Track/1.png';
import ClientLogo2 from '../assets/Client-Track/2.jpg';
import ClientLogo3 from '../assets/Client-Track/3.jpg';
import ClientLogo4 from '../assets/Client-Track/4.jpg';
import ClientLogo5 from '../assets/Client-Track/5.jpg';
import ClientLogo6 from '../assets/Client-Track/6.jpg';
import ClientLogo7 from '../assets/Client-Track/7.jpg';
import ClientLogo8 from '../assets/Client-Track/8.jpg';
import ClientLogo9 from '../assets/Client-Track/9.png';
import ClientLogo10 from '../assets/Client-Track/10.png';
import ClientLogo12 from '../assets/Client-Track/12.jpg';
import ClientLogo13 from '../assets/Client-Track/13.jpg';
import ClientLogo14 from '../assets/Client-Track/14.jpg';
import ClientLogo15 from '../assets/Client-Track/15.jpg';
import AdminSidebar from '../components/AdminSidebar';

interface ClientLogo {
  _id: string;
  name: string;
  imageUrl: string;
  website?: string;
  createdAt: string;
}

const AdminClients: React.FC = () => {
  const [clients, setClients] = useState<ClientLogo[]>([]);
  const [name, setName] = useState('');
  const [website, setWebsite] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [manualImageUrl, setManualImageUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isLogoModalOpen, setIsLogoModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<ClientLogo | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    loadClients();
  }, []);

  const loadClients = async () => {
    try {
      setLoading(true);
      const data = await adminService.listClientLogos();
      setClients(data);
    } catch (e) {
      setError('Failed to load clients');
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (file: File) => {
    setError('');
    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB');
      return;
    }

    setUploading(true);
    try {
      const res = await adminService.uploadImage(file);
      const url = res.url.startsWith('http') ? res.url : `http://localhost:5000${res.url}`;
      setImageUrl(url);
    } catch {
      setError('Image upload failed. Please try again.');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      void handleUpload(file);
    }
  };

  const handleModalSubmit = async (data: {
    name: string;
    imageUrl: string;
    website?: string;
  }) => {
    try {
      const created = await adminService.createClientLogo(data);
      setClients([created, ...clients]);
      resetModal();
    } catch {
      setError('Failed to add client logo');
    }
  };

  const resetModal = () => {
    setIsAddModalOpen(false);
    setIsLogoModalOpen(false);
    setEditingClient(null);
    setImageUrl('');
    setManualImageUrl('');
    setName('');
    setWebsite('');
    setError('');
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const finalImageUrl = imageUrl || manualImageUrl.trim();
    if (!name.trim() || !finalImageUrl) {
      setError('Logo name and image are required');
      return;
    }
    try {
      const created = await adminService.createClientLogo({
        name: name.trim(),
        imageUrl: finalImageUrl,
        website: website.trim() || undefined,
      });
      setClients([created, ...clients]);
      resetModal();
    } catch {
      setError('Failed to add client logo');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Remove this client logo?')) return;
    try {
      await adminService.deleteClientLogo(id);
      setClients(clients.filter((c) => c._id !== id));
    } catch {
      setError('Failed to delete client logo');
    }
  };

  return (
    <div className="admin-dashboard">
      <AdminNavbar 
        title="🤝 Trusted Clients" 
        subtitle="Manage client logos and information"
      />
      <div className="admin-dashboard-wrapper">
        <AdminSidebar />
        
        <div className="admin-dashboard-content">

          <div className="dashboard-main">
          <ClientLogoModal
            isOpen={isLogoModalOpen}
            onClose={resetModal}
            onSubmit={handleModalSubmit}
            initialData={editingClient || undefined}
            isUploading={uploading}
            onUpload={handleUpload}
          />

          {/* Add Client Logo Modal */}
          {isAddModalOpen && (
            <div className="modal-overlay" onClick={resetModal}>
              <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                  <h2>Add New Client Logo</h2>
                  <button className="modal-close" onClick={resetModal}>✕</button>
                </div>
                <form onSubmit={handleCreate} className="modal-form">
                    <div className="form-group">
                      <label>Client / Brand Name *</label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. The Himalayan Odyssey Treks"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Website (optional)</label>
                      <input
                        type="url"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        placeholder="https://example.com"
                      />
                    </div>
                    <div className="form-group">
                      <label>Upload Logo Image</label>
                      <button
                        type="button"
                        className="btn-new-blog"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploading}
                      >
                        {uploading ? 'Uploading...' : '📤 Choose File'}
                      </button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                      />
                    </div>
                    <div className="form-group">
                      <label>Or paste image URL</label>
                      <input
                        type="url"
                        value={manualImageUrl}
                        onChange={(e) => setManualImageUrl(e.target.value)}
                        placeholder="https://example.com/logo.png"
                      />
                    </div>
                    {imageUrl && (
                      <div style={{ padding: '10px', backgroundColor: '#f3f4f6', borderRadius: '6px', marginBottom: '16px' }}>
                        <span style={{ fontSize: '12px', fontWeight: '600', color: '#6b7280' }}>Preview</span>
                        <img src={imageUrl} alt="Client logo preview" style={{ maxHeight: '80px', marginTop: '8px' }} />
                      </div>
                    )}

                    {error && <p className="client-error">{error}</p>}

                    <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '20px' }}>
                      <button type="button" className="btn-secondary" onClick={resetModal}>
                        Cancel
                      </button>
                      <button type="submit" className="btn-new-blog" disabled={uploading}>
                        Save Client Logo
                      </button>
                    </div>
            </form>
              </div>
            </div>
          )}

            <div className="section-header">
              <h2>Our Trusted Clients Logos ({clients.length})</h2>
              <button 
                className="btn-new-blog"
                onClick={() => setIsAddModalOpen(true)}
              >
                + Add Client Logo
              </button>
            </div>

            <div className="client-list-card">
              <h4 style={{ marginTop: '0px', marginBottom: '8px', fontSize: '13px', color: '#6b7280' }}>
                Static logos in code (always shown)
              </h4>
              <div className="client-logo-list" style={{ marginBottom: '12px' }}>
                {[
                  ClientLogo1,
                  ClientLogo2,
                  ClientLogo3,
                  ClientLogo4,
                  ClientLogo5,
                  ClientLogo6,
                  ClientLogo7,
                  ClientLogo8,
                  ClientLogo9,
                  ClientLogo10,
                  ClientLogo12,
                  ClientLogo13,
                  ClientLogo14,
                  ClientLogo15,
                ].map((logo, idx) => (
                  <div key={idx} className="client-logo-row">
                    <div className="client-logo-thumb">
                      <img src={logo} alt={`Static Client ${idx + 1}`} />
                    </div>
                    <div className="client-logo-info">
                      <strong>Client {idx + 1}</strong>
                      <span style={{ fontSize: '12px', color: '#9ca3af' }}>Static asset</span>
                    </div>
                  </div>
                ))}
              </div>

              <h4 style={{ marginTop: '10px', marginBottom: '6px', fontSize: '13px', color: '#6b7280' }}>
                Managed logos (from database)
              </h4>
              {loading ? (
                <p className="loading">Loading client logos...</p>
              ) : clients.length === 0 ? (
                <p className="empty-text">No client logos added yet.</p>
              ) : (
                <div className="client-logo-list">
                  {clients.map((client) => (
                    <div key={client._id} className="client-logo-row" style={{ gridTemplateColumns: '1fr auto' }}>
                      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                        <div className="client-logo-thumb">
                          <img src={client.imageUrl} alt={client.name} />
                        </div>
                        <div className="client-logo-info">
                          <strong>{client.name}</strong>
                          {client.website && (
                            <a
                              href={client.website}
                              target="_blank"
                              rel="noreferrer"
                            >
                              {client.website}
                            </a>
                          )}
                        </div>
                      </div>
                      <button
                        type="button"
                        className="btn-delete"
                        onClick={() => handleDelete(client._id)}
                      >
                        Remove
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

export default AdminClients;