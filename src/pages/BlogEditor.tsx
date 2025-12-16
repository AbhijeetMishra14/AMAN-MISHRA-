import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import { adminService } from '../services/adminService';
import './styles/BlogEditor.css';

interface TableOfContentsItem {
  id: string;
  level: number;
  title: string;
}

const BlogEditor: React.FC = () => {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [category, setCategory] = useState<string>('Uncategorized');
  const [status, setStatus] = useState<'draft' | 'published'>('draft');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);
  const [showPreview, setShowPreview] = useState(true);
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [linkText, setLinkText] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [showImageSelector, setShowImageSelector] = useState(false);
  const [tableOfContents, setTableOfContents] = useState<TableOfContentsItem[]>([]);
  const [showTOCEditor, setShowTOCEditor] = useState(false);
  
  const imageInputRef = useRef<HTMLInputElement>(null);
  const editorRef = useRef<HTMLDivElement>(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const categories = [
    'Uncategorized',
    'Company',
    'Digital Marketing',
    'Mobile App Development',
    'News & Updates',
    'Testing & Deployment',
    'Web Development'
  ];

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
        link: { openOnClick: false },
      }),
      Image.configure({
        allowBase64: true,
      }),
    ],
    content: '',
    editorProps: {
      attributes: {
        class: 'tiptap-editor',
      },
    },
  });

  // Handle image upload
  const handleImageUpload = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB');
      return;
    }

    setUploadingImage(true);
    try {
      const res = await adminService.uploadImage(file);
      const imageUrl = res.url;
      setImages([...images, imageUrl]);
      setError('');
    } catch (err: unknown) {
      let message = 'Unknown error';
      if (err && typeof err === 'object' && 'response' in err) {
        const e = err as { response?: { data?: { error?: string } } };
        message = e.response?.data?.error ?? message;
      } else if (err instanceof Error) {
        message = err.message;
      }
      setError('Image upload failed: ' + message);
    } finally {
      setUploadingImage(false);
      if (imageInputRef.current) imageInputRef.current.value = '';
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  // Drag and drop handlers
  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer?.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      handleImageUpload(file);
    }
  };

  // Link dialog handler
  const insertLink = () => {
    if (!linkUrl.trim()) {
      setError('Please enter a URL');
      return;
    }

    const url = linkUrl.startsWith('http') ? linkUrl : `https://${linkUrl}`;
    const text = linkText.trim();
    
    if (editor) {
      if (text) {
        // If custom text is provided, insert text with link
        editor
          .chain()
          .focus()
          .insertContent({
            type: 'text',
            text: text,
            marks: [{ type: 'link', attrs: { href: url } }],
          })
          .run();
      } else {
        // Otherwise apply link to selected text or insert default
        const { selection } = editor.state;
        if (!selection.empty) {
          // If there's selected text, apply link to it
          editor
            .chain()
            .focus()
            .setLink({ href: url })
            .run();
        } else {
          // Otherwise insert a default link
          editor
            .chain()
            .focus()
            .insertContent({
              type: 'text',
              text: 'Link',
              marks: [{ type: 'link', attrs: { href: url } }],
            })
            .run();
        }
      }
    }
    
    setShowLinkDialog(false);
    setLinkUrl('');
    setLinkText('');
  };

  // Insert image into content
  const insertImage = (imageUrl: string) => {
    editor?.chain()
      .focus()
      .insertContent({
        type: 'image',
        attrs: {
          src: imageUrl,
          alt: 'Blog image',
        },
      })
      .run();
    
    setShowImageSelector(false);
  };

  // Remove image from gallery
  const handleRemoveImage = (imageUrl: string) => {
    setImages(images.filter(img => img !== imageUrl));
  };

  // Generate table of contents from headings
  const generateTableOfContents = () => {
    if (!editor) return;
    
    const html = editor.getHTML();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const headings = doc.querySelectorAll('h2, h3');
    
    const toc: TableOfContentsItem[] = [];
    headings.forEach((heading, index) => {
      const level = parseInt(heading.tagName[1]);
      const title = heading.textContent || '';
      const id = `heading-${index}-${Date.now()}`;
      
      if (title.trim()) {
        toc.push({ id, level, title });
      }
    });
    
    setTableOfContents(toc);
  };

  // Update TOC item
  const updateTOCItem = (index: number, field: keyof TableOfContentsItem, value: string | number) => {
    const updated = [...tableOfContents];
    updated[index] = { ...updated[index], [field]: value };
    setTableOfContents(updated);
  };

  // Remove TOC item
  const removeTOCItem = (index: number) => {
    setTableOfContents(tableOfContents.filter((_, i) => i !== index));
  };

  // Load blog data if editing
  useEffect(() => {
    const loadBlog = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const blog = await adminService.getBlogById(id);
        setTitle(blog.title);
        setSummary(blog.summary);
        setMetaTitle(blog.metaTitle || '');
        setMetaDescription(blog.metaDescription || '');
        setCategory(blog.category || 'Uncategorized');
        setStatus(blog.status);
        setImages(blog.images || []);
        setTableOfContents(blog.tableOfContents || []);
        if (editor && blog.content) {
          editor.commands.setContent(blog.content);
        }
      } catch (err: unknown) {
        let message = 'Unknown error';
        if (err && typeof err === 'object' && 'response' in err) {
          const e = err as { response?: { data?: { error?: string } } };
          message = e.response?.data?.error ?? message;
        } else if (err instanceof Error) {
          message = err.message;
        }
        setError('Failed to load blog: ' + message);
      } finally {
        setLoading(false);
      }
    };
    
    loadBlog();
  }, [id, editor]);

  // Save blog
  const handleSave = async (publish: boolean) => {
    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    if (!editor?.getHTML() || editor.getHTML() === '<p></p>') {
      setError('Content is required');
      return;
    }

    setLoading(true);
    try {
      const blogData = {
        title: title.trim(),
        summary: summary.trim(),
        metaTitle: metaTitle.trim(),
        metaDescription: metaDescription.trim(),
        content: editor.getHTML(),
        images,
        category,
        tableOfContents,
        status: publish ? 'published' : 'draft',
      };

      if (id) {
        await adminService.updateBlog(id, blogData);
      } else {
        await adminService.createBlog(blogData);
      }

      setError('');
      navigate('/admin/');
    } catch (err: unknown) {
      let message = 'Unknown error';
      if (err && typeof err === 'object' && 'response' in err) {
        const e = err as { response?: { data?: { error?: string } } };
        message = e.response?.data?.error ?? message;
      } else if (err instanceof Error) {
        message = err.message;
      }
      setError('Failed to save blog: ' + message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="blog-editor">
      <div className="editor-header">
        <h1>{id ? 'Edit Blog' : 'New Blog'}</h1>
        <div className="header-actions">
          <button 
            onClick={() => setShowPreview(!showPreview)} 
            className="btn-toggle-preview"
          >
            {showPreview ? '👁️ Hide Preview' : '👁️ Show Preview'}
          </button>
          <button onClick={() => navigate('/admin')} className="btn-back">
            ← Back
          </button>
        </div>
      </div>

      <div className={`editor-container ${showPreview ? 'with-preview' : ''}`}>
        <div className="editor-form">
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Blog title"
              className="input-large"
            />
          </div>

          <div className="form-group">
            <label>Summary</label>
            <textarea
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Brief summary for blog list"
              className="textarea-summary"
              rows={3}
            />
          </div>

          <div className="form-group">
            <label>Meta Title (for SEO)</label>
            <input
              type="text"
              value={metaTitle}
              onChange={(e) => setMetaTitle(e.target.value)}
              placeholder="Meta title for SEO"
              className="input-large"
            />
          </div>

          <div className="form-group">
            <label>Meta Description (for SEO)</label>
            <textarea
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              placeholder="Meta description for SEO"
              className="textarea-summary"
              rows={3}
            />
          </div>

          <div className="form-group">
            <label>Content</label>
            <div className="editor-toolbar">
              <button onClick={() => editor?.chain().focus().toggleBold().run()} className="toolbar-btn" title="Bold">
                <strong>B</strong>
              </button>
              <button onClick={() => editor?.chain().focus().toggleItalic().run()} className="toolbar-btn" title="Italic">
                <em>I</em>
              </button>
              <button onClick={() => editor?.chain().focus().toggleStrike().run()} className="toolbar-btn" title="Strike">
                S
              </button>
              <button onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()} className="toolbar-btn" title="Heading">
                H2
              </button>
              <button onClick={() => editor?.chain().focus().toggleBulletList().run()} className="toolbar-btn" title="Bullet List">
                • List
              </button>
              <button onClick={() => editor?.chain().focus().toggleOrderedList().run()} className="toolbar-btn" title="Ordered List">
                # List
              </button>
              <button onClick={() => editor?.chain().focus().toggleBlockquote().run()} className="toolbar-btn" title="Blockquote">
                "
              </button>
              <button onClick={() => editor?.chain().focus().toggleCodeBlock().run()} className="toolbar-btn" title="Code Block">
                {'<>'}
              </button>
              <button onClick={() => setShowLinkDialog(true)} className="toolbar-btn" title="Link">
                🔗
              </button>
              {images.length > 0 && (
                <button onClick={() => setShowImageSelector(true)} className="toolbar-btn" title="Insert Image">
                  🖼️
                </button>
              )}
              <button onClick={() => editor?.chain().focus().clearNodes().run()} className="toolbar-btn" title="Clear Formatting">
                ✕
              </button>
            </div>
            <div
              ref={editorRef}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`editor-content ${dragActive ? 'drag-active' : ''}`}
            >
              {dragActive && <div className="drag-overlay">Drop images here</div>}
              <EditorContent editor={editor} />
            </div>
          </div>

          <div className="form-group">
            <label>Images (Drag & Drop or Click)</label>
            <div 
              className={`image-upload-zone ${dragActive ? 'active' : ''}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                type="file"
                ref={imageInputRef}
                accept="image/*"
                onChange={handleFileInputChange}
                disabled={uploadingImage}
                style={{ display: 'none' }}
              />
              <div className="upload-content">
                <button
                  type="button"
                  onClick={() => imageInputRef.current?.click()}
                  disabled={uploadingImage}
                  className="btn-upload"
                >
                  {uploadingImage ? '⏳ Uploading...' : '📸 Upload Image from PC'}
                </button>
                <p className="upload-hint">Or drag & drop images here</p>
                <p className="upload-hint">Max file size: 5MB (JPG, PNG, GIF, WebP)</p>
              </div>
            </div>

            <div className="image-gallery">
              {images.length > 0 && <h4>Uploaded Images ({images.length})</h4>}
              <div className="gallery-grid">
                {images.map((img, idx) => (
                  <div key={idx} className="image-item">
                    <img src={img} alt={`Blog ${idx}`} />
                    <div className="image-item-actions">
                      <button
                        type="button"
                        onClick={() => insertImage(img)}
                        className="btn-insert-in-content"
                        title="Insert into content"
                      >
                        📝 Insert
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(img)}
                        className="btn-remove-img"
                        title="Remove this image"
                      >
                        ✕ Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="form-group">
            <label>Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="select-category"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as 'draft' | 'published')}
              className="select-status"
            >
              <option value="draft">Draft (Not visible on site)</option>
              <option value="published">Published (Visible on site)</option>
            </select>
          </div>

          <div className="form-group">
            <label>Table of Contents</label>
            <div className="toc-editor-controls">
              <button
                type="button"
                onClick={() => {
                  generateTableOfContents();
                  setShowTOCEditor(!showTOCEditor);
                }}
                className="btn-toc-generate"
              >
                {showTOCEditor ? '🔽 Hide TOC Editor' : '🔼 Show TOC Editor'}
              </button>
              {tableOfContents.length > 0 && (
                <span className="toc-count">{tableOfContents.length} items</span>
              )}
            </div>

            {showTOCEditor && (
              <div className="toc-editor">
                {tableOfContents.length === 0 ? (
                  <p className="toc-empty">No headings found. Add headings (H2, H3) to your content first.</p>
                ) : (
                  <div className="toc-items-list">
                    {tableOfContents.map((item, index) => (
                      <div key={index} className="toc-item-editor">
                        <div className="toc-item-inputs">
                          <input
                            type="text"
                            value={item.title}
                            onChange={(e) => updateTOCItem(index, 'title', e.target.value)}
                            placeholder="Section title"
                            className="toc-title-input"
                          />
                          <select
                            value={item.level}
                            onChange={(e) => updateTOCItem(index, 'level', parseInt(e.target.value))}
                            className="toc-level-select"
                          >
                            <option value="2">Heading 2</option>
                            <option value="3">Heading 3</option>
                          </select>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeTOCItem(index)}
                          className="btn-remove-toc"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {error && <p className="error-message">{error}</p>}

          <div className="form-actions">
            <button
              onClick={() => handleSave(false)}
              disabled={loading}
              className="btn-save"
            >
              {loading ? 'Saving...' : '💾 Save as Draft'}
            </button>
            <button
              onClick={() => handleSave(true)}
              disabled={loading}
              className="btn-publish"
            >
              {loading ? 'Publishing...' : '🚀 Publish Now'}
            </button>
          </div>
        </div>

        {showPreview && (
          <div className="editor-preview">
            <div className="preview-header">
              <h3>📱 Preview</h3>
              <p className="preview-hint">How your blog will look</p>
            </div>
            <div className="preview-content">
              {images[0] && (
                <div className="preview-featured-image">
                  <img src={images[0]} alt="Featured" />
                </div>
              )}
              <h1 className="preview-title">{title || 'Blog Title'}</h1>
              <p className="preview-date">{new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</p>
              <p className="preview-summary">{summary || 'Blog summary will appear here'}</p>
              
              <div className="preview-body">
                {editor?.getHTML() ? (
                  <div dangerouslySetInnerHTML={{ __html: editor.getHTML() }} />
                ) : (
                  <p style={{ color: '#999' }}>Blog content will appear here...</p>
                )}
              </div>

              {images.length > 1 && (
                <div className="preview-gallery">
                  <h4>Gallery</h4>
                  <div className="gallery-preview">
                    {images.slice(1).map((img, idx) => (
                      <img key={idx} src={img} alt={`Gallery ${idx}`} />
                    ))}
                  </div>
                </div>
              )}

              <div className="preview-status-badge">
                Status: <strong>{status.toUpperCase()}</strong>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Link Dialog Modal */}
      {showLinkDialog && (
        <div className="modal-overlay" onClick={() => setShowLinkDialog(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>🔗 Add Link</h3>
              <button 
                onClick={() => setShowLinkDialog(false)} 
                className="modal-close"
              >
                ✕
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Link URL</label>
                <input
                  type="url"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  placeholder="https://example.com or example.com"
                  className="input-large"
                  autoFocus
                />
              </div>
              <div className="form-group">
                <label>Link Text (Optional)</label>
                <input
                  type="text"
                  value={linkText}
                  onChange={(e) => setLinkText(e.target.value)}
                  placeholder="Display text for link"
                  className="input-large"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button 
                onClick={() => setShowLinkDialog(false)}
                className="btn-cancel"
              >
                Cancel
              </button>
              <button 
                onClick={insertLink}
                className="btn-insert-link"
              >
                Add Link
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Image Selector Modal */}
      {showImageSelector && (
        <div className="modal-overlay" onClick={() => setShowImageSelector(false)}>
          <div className="modal-content modal-large" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>🖼️ Insert Image</h3>
              <button 
                onClick={() => setShowImageSelector(false)} 
                className="modal-close"
              >
                ✕
              </button>
            </div>
            <div className="modal-body">
              <div className="image-selector-grid">
                {images.map((img, idx) => (
                  <div 
                    key={idx} 
                    className="image-selector-item"
                    onClick={() => insertImage(img)}
                  >
                    <img src={img} alt={`Upload ${idx}`} />
                    <div className="image-selector-overlay">Click to Insert</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogEditor;