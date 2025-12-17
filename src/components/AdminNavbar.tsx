import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import adminService from '../services/adminService';
import './styles/AdminNavbar.css';

interface AdminNavbarProps {
  title?: string;
  subtitle?: string;
  onMenuToggle?: (isOpen: boolean) => void;
}

const AdminNavbar: React.FC<AdminNavbarProps> = ({ title, subtitle, onMenuToggle }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const handleLogout = () => {
    adminService.logout();
    navigate('/admin/login');
  };

  const toggleMobileMenu = () => {
    const newState = !isMobileMenuOpen;
    setIsMobileMenuOpen(newState);
    onMenuToggle?.(newState);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    onMenuToggle?.(false);
  };

  const menuItems = [
    { path: '/admin/pages', label: '📄 Page Sections' },
    { path: '/admin/blog', label: '📝 Blog Posts' },
    { path: '/admin/clients', label: '🤝 Trusted Clients' },
    { path: '/admin/pricing', label: '💰 Pricing' },
    { path: '/admin/careers', label: '💼 Careers' },
    { path: '/admin/faq', label: '❓ FAQs' },
    { path: '/admin/portfolio', label: '📂 Portfolio' },
    { path: '/admin/testimonials', label: '💬 Testimonials' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <nav className="admin-navbar">
        <div className="navbar-container">
          {/* Logo/Brand */}
          <div className="navbar-brand">
            <button className="hamburger-menu" onClick={toggleMobileMenu}>
              <span></span>
              <span></span>
              <span></span>
            </button>
            <div className="brand-logo">
              <span className="logo-icon">⚙️</span>
              <span className="logo-text">Admin Panel</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="navbar-menu-desktop">
            {menuItems.map((item) => (
              <a
                key={item.path}
                href={item.path}
                className={`navbar-menu-item ${isActive(item.path) ? 'active' : ''}`}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Right Section */}
          <div className="navbar-right">
            <div className="profile-menu">
              <button
                className="profile-button"
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              >
                <span className="profile-icon">👤</span>
                <span className="profile-text">Admin</span>
                <span className={`chevron ${isProfileMenuOpen ? 'open' : ''}`}>▼</span>
              </button>

              {isProfileMenuOpen && (
                <div className="profile-dropdown">
                  <button className="dropdown-item" onClick={handleLogout}>
                    🚪 Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="admin-mobile-menu">
          <div className="mobile-menu-content">
            {menuItems.map((item) => (
              <a
                key={item.path}
                href={item.path}
                className={`mobile-menu-item ${isActive(item.path) ? 'active' : ''}`}
                onClick={closeMobileMenu}
              >
                {item.label}
              </a>
            ))}
            <button className="mobile-logout-btn" onClick={handleLogout}>
              🚪 Logout
            </button>
          </div>
        </div>
      )}

      {/* Mobile Header */}
      {title && (
        <div className="admin-mobile-header">
          <div className="mobile-header-content">
            <h1>{title}</h1>
            {subtitle && <p>{subtitle}</p>}
          </div>
        </div>
      )}
    </>
  );
};

export default AdminNavbar;
