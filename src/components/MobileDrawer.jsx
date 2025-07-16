import React from 'react';

const navLinks = [
  { href: '/dashboard', icon: 'fa-home', label: 'Dashboard' },
  { href: '/job-search', icon: 'fa-city', label: 'Job Search' },
  { href: '/resume', icon: 'fa-file-alt', label: 'Resumes' },
  { href: '/cover_letter', icon: 'fa-envelope', label: 'Cover Letters' },
  { href: '/applications', icon: 'fa-briefcase', label: 'Applications' },
  { href: '/interviews', icon: 'fa-lightbulb', label: 'Interview Practice' },
];

export default function MobileDrawer({ isOpen, onClose }) {
  return (
    <>
      {isOpen && <div className="mobile-drawer-overlay" onClick={onClose} />}
      <nav className={`mobile-drawer-nav${isOpen ? ' open' : ''}`}>
        <div className="mobile-drawer-header">
          <span className="mobile-drawer-title">SaaSka</span>
          <button className="mobile-drawer-close" onClick={onClose} aria-label="Close menu">&times;</button>
        </div>
        <div className="mobile-drawer-links">
          {navLinks.map(({ href, icon, label }) => (
            <a
              key={href}
              href={href}
              className="mobile-drawer-link"
              onClick={onClose}
            >
              <i className={`fas ${icon}`}></i>
              <span>{label}</span>
            </a>
          ))}
        </div>
      </nav>
    </>
  );
} 