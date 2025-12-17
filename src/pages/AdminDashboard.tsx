import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import adminService from '../services/adminService';
import AdminNavbar from '../components/AdminNavbar';
import AdminSidebar from '../components/AdminSidebar';
import './styles/AdminDashboard.css';

// Helper function to construct full image URL
const getImageUrl = (imagePath: string): string => {
  if (!imagePath) return '';
  // If already a full URL, return as is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  // If relative path, construct full URL
  if (imagePath.startsWith('/')) {
    return `http://localhost:5000${imagePath}`;
  }
  // If relative path without leading slash
  return `http://localhost:5000/${imagePath}`;
};

interface Blog {
  _id: string;
  title: string;
  summary?: string;
  status: 'draft' | 'published';
  views?: number;
  createdAt: string;
  category?: string;
  images?: string[];
}

const AdminDashboard: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [admin, setAdmin] = useState<{ name?: string; email?: string } | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    const user = localStorage.getItem('admin_user');
    if (user) setAdmin(JSON.parse(user));

    loadBlogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadBlogs = async () => {
    try {
      setLoading(true);
      const items = await adminService.listBlogs();
      setBlogs(items);
    } catch (err: Error | unknown) {
      console.error('Failed to load blogs:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this blog?')) return;
    try {
      await adminService.deleteBlog(id);
      setBlogs(blogs.filter((b) => b._id !== id));
    } catch {
      alert('Delete failed');
    }
  };

  const categories = [
    'All',
    'Company',
    'Digital Marketing',
    'Mobile App Development',
    'News & Updates',
    'Testing & Deployment',
    'Uncategorized',
    'Web Development',
  ];

  const visibleBlogs =
    selectedCategory === 'All'
      ? blogs
      : blogs.filter((b) => b.category === selectedCategory);

  return (
    <div className="admin-dashboard">
      <AdminNavbar 
        title="📝 Admin Blog" 
        subtitle={`Welcome, ${admin?.name || admin?.email || 'Admin'}`}
      />
      <div className="admin-dashboard-wrapper">
        <AdminSidebar />
        


        <div className="dashboard-main">
          <div className="section-header">
            <h2>📝 Blogs ({visibleBlogs.length})</h2>
            <div className="section-header-actions">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="dashboard-filter"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <button
                onClick={() => navigate('/admin/blog/new')}
                className="btn-new-blog"
              >
                + New Blog
              </button>
            </div>
          </div>

          {loading ? (
            <div className="loading">Loading blogs...</div>
          ) : visibleBlogs.length === 0 ? (
            <div className="empty-state">
              <p>No blogs found for this category. Create your first blog post!</p>
              <button
                onClick={() => navigate('/admin/blog/new')}
                className="btn-new-blog-large"
              >
                Create First Blog
              </button>
            </div>
          ) : (
            <div className="blogs-list">
              {visibleBlogs.map((blog) => (
                <div key={blog._id} className={`blog-card ${blog.status}`}>
                  {blog.images && blog.images[0] && (
                    <div className="blog-thumb">
                      <img 
                        src={getImageUrl(blog.images?.[0] || '')} 
                        alt={blog.title}
                        onError={(e) => {
                          e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="200"%3E%3Crect fill="%23f0f0f0" width="300" height="200"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%23999" font-size="16"%3E⚠️ Image failed to load%3C/text%3E%3C/svg%3E';
                        }}
                      />
                    </div>
                  )}
                  <div className="blog-content">
                    <h3>{blog.title}</h3>
                    {blog.summary && <p className="summary">{blog.summary}</p>}
                    <div className="blog-meta">
                      <span className={`status-badge ${blog.status}`}>
                        {blog.status.toUpperCase()}
                      </span>
                      {blog.status === 'published' && (
                        <span className="views-badge">
                          👁️ {blog.views || 0} views
                        </span>
                      )}
                      <span className="date">
                        {new Date(blog.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="blog-actions">
                    <button
                      onClick={() => navigate(`/admin/blog/${blog._id}`)}
                      className="btn-edit"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(blog._id)}
                      className="btn-delete"
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
  );
};

export default AdminDashboard;