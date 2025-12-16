
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './styles/AdminSidebar.css';

const AdminSidebar: React.FC = () => {
  const location = useLocation();

  const getLinkClass = (path: string) => {
    return location.pathname === path
      ? 'sidebar-link sidebar-link-active'
      : 'sidebar-link';
  };

  return (
    <aside className="dashboard-sidebar">
      <NavLink to="/admin/blog" className={getLinkClass('/admin/blog')}>
        📝 Blog Posts
      </NavLink>
      <NavLink to="/admin/clients" className={getLinkClass('/admin/clients')}>
        🤝 Trusted Clients
      </NavLink>
      <NavLink to="/admin/pricing" className={getLinkClass('/admin/pricing')}>
        💰 Pricing
      </NavLink>
      <NavLink to="/admin/careers" className={getLinkClass('/admin/careers')}>
        💼 Careers
      </NavLink>
      <NavLink to="/admin/faq" className={getLinkClass('/admin/faq')}>
        ❓ FAQs
      </NavLink>
      <NavLink to="/admin/portfolio" className={getLinkClass('/admin/portfolio')}>
        📂 Portfolio
      </NavLink>
      <NavLink to="/admin/testimonials" className={getLinkClass('/admin/testimonials')}>
        💬 Testimonials
      </NavLink>
    </aside>
  );
};

export default AdminSidebar;