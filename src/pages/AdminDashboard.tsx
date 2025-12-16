import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import adminService from '../services/adminService';
import './styles/AdminDashboard.css';
import AdminSidebar from '../components/AdminSidebar';

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

  const handleLogout = () => {
    adminService.logout();
    navigate('/admin/login');
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
      <AdminSidebar />
      
      <div className="admin-dashboard-content">
        <header className="dashboard-header">
          <div className="header-left">
            <h1>� Admin Blog</h1>
            <p>Welcome, {admin?.name || admin?.email || 'Admin'}</p>
          </div>
          <button onClick={handleLogout} className="btn-logout">
            Logout
          </button>
        </header>

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
                      <img src={blog.images[0]} alt={blog.title} />
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