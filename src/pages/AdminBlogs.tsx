import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import adminService from '../services/adminService';
import AdminNavbar from '../components/AdminNavbar';
import AdminSidebar from '../components/AdminSidebar';
import './styles/AdminDashboard.css';
import './styles/AdminBlogs.css';

interface Blog {
  _id: string;
  title: string;
  createdAt: string;
}

const AdminBlogs: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    
    const fetchBlogs = async () => {
      try {
        const response = await adminService.listBlogs();
        setBlogs(response);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, [navigate]);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      try {
        await adminService.deleteBlog(id);
        setBlogs(blogs.filter(blog => blog._id !== id));
      } catch (error) {
        console.error('Error deleting blog:', error);
      }
    }
  };

  return (
    <div className="admin-dashboard">
      <AdminNavbar 
        title="📝 Blog Posts" 
        subtitle="Manage and create blog posts"
      />
      <div className="admin-dashboard-wrapper">
        <AdminSidebar />
        
        <div className="admin-dashboard-content">

          <div className="dashboard-main">
          <div className="section-header">
            <h2>All Posts ({blogs.length})</h2>
            <div className="section-header-actions">
              <Link to="/admin/blog/new" className="btn-new-blog">
                + Create New Post
              </Link>
            </div>
          </div>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Date Created</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map(blog => (
            <tr key={blog._id}>
              <td>{blog.title}</td>
              <td>{new Date(blog.createdAt).toLocaleDateString()}</td>
              <td>
                <Link to={`/admin/blog/${blog._id}`} className="btn btn-secondary">
                  Edit
                </Link>
                <button onClick={() => handleDelete(blog._id)} className="btn btn-danger">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
        </div>
      </div>
      </div>
    </div>
  );
};

export default AdminBlogs;