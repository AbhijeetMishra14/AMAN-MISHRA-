import React, { useState, useEffect, useRef } from 'react';
import './ClientLogoModal.css';

interface ClientLogo {
  _id: string;
  name: string;
  imageUrl: string;
  website?: string;
}

interface ClientLogoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; imageUrl: string; website?: string }) => void;
  initialData?: ClientLogo;
  isUploading: boolean;
  onUpload: (file: File) => void;
}

const ClientLogoModal: React.FC<ClientLogoModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isUploading,
  onUpload,
}) => {
  const [name, setName] = useState('');
  const [website, setWebsite] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [manualImageUrl, setManualImageUrl] = useState('');
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      const resetModal = () => {
        if (initialData) {
          setName(initialData.name);
          setWebsite(initialData.website || '');
          setImageUrl(initialData.imageUrl);
        } else {
          setName('');
          setWebsite('');
          setImageUrl('');
          setManualImageUrl('');
        }
        setError('');
      };
      resetModal();
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const finalImageUrl = imageUrl || manualImageUrl.trim();
    if (!name.trim() || !finalImageUrl) {
      setError('Logo name and image are required');
      return;
    }
    onSubmit({
      name: name.trim(),
      imageUrl: finalImageUrl,
      website: website.trim() || undefined,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onUpload(file);
    }
  };

  return (
    <div className="client-modal-overlay">
      <div className="client-modal">
        <div className="client-modal-header">
          <h2>{initialData ? 'Edit Client Logo' : 'Add Client Logo'}</h2>
          <button
            type="button"
            className="client-modal-close"
            onClick={onClose}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="client-modal-form">
          <div className="client-modal-body">
            <div className="form-group">
              <label>
                Client / Brand Name <span className="required">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. The Himalayan Odyssey Treks"
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
              <label>Logo Image <span className="required">*</span></label>
              <div className="upload-section">
                <button
                  type="button"
                  className="btn-upload"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                >
                  {isUploading ? 'Uploading...' : 'Upload Logo Image'}
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                />
              </div>

              <div className="divider">OR</div>

              <label>Paste image URL</label>
              <input
                type="url"
                value={manualImageUrl}
                onChange={(e) => setManualImageUrl(e.target.value)}
                placeholder="https://example.com/logo.png"
              />
            </div>

            {imageUrl && (
              <div className="image-preview">
                <span>Preview</span>
                <img src={imageUrl} alt="Client logo preview" />
              </div>
            )}

            {error && <div className="form-error">{error}</div>}
          </div>

          <div className="client-modal-preview">
            <h3>Preview</h3>
            <div className="preview-content">
              {imageUrl ? (
                <>
                  <div className="preview-logo">
                    <img src={imageUrl} alt="Logo preview" />
                  </div>
                  <div className="preview-info">
                    <p><strong>{name || 'Client Name'}</strong></p>
                    {website && <p>{website}</p>}
                  </div>
                </>
              ) : (
                <div className="preview-logo-empty">
                  <span>Upload or paste an image</span>
                </div>
              )}
            </div>
          </div>

          <div className="client-modal-footer">
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
              disabled={isUploading}
            >
              {initialData ? 'Update Logo' : 'Add Logo'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClientLogoModal;
