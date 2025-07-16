// Sidebar.tsx
import { useLocation } from 'react-router-dom';
import { useSidebar } from '../contexts/SidebarContext';
import React from 'react';

/**
 * Sidebar component displays the navigation sidebar with toggle functionality.
 * @returns {JSX.Element} The rendered sidebar.
 * @precondition Should be used within a layout that supports sidebar navigation.
 */
export default function Sidebar({ isDrawerOpen = false, onClose = null }) {
  const location = useLocation();
  const pathname = location.pathname;
  const { sidebarCollapsed, toggleSidebar } = useSidebar();

  // Detect mobile (≤600px)
  const isMobile = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(max-width: 600px)').matches;

  // Sidebar content
  const sidebarContent = (
    <>
      <div className="sidebar-header">
        <h2 className="nav-text">SaaSka</h2>
        {!isMobile && (
          <button onClick={toggleSidebar} id="toggleSidebar">
            <i className={`fas ${sidebarCollapsed ? 'fa-chevron-right' : 'fa-chevron-left'}`}></i>
          </button>
        )}
      </div>
      {[
        { href: '/dashboard', icon: 'fa-home', label: 'Dashboard' },
        { href: '/job-search', icon: 'fa-city', label: 'Job Search' },
        { href: '/resume', icon: 'fa-file-alt', label: 'Resumes' },
        { href: '/cover_letter', icon: 'fa-envelope', label: 'Cover Letters' },
        { href: '/applications', icon: 'fa-briefcase', label: 'Applications' },
        { href: '/interviews', icon: 'fa-lightbulb', label: 'Interview Practice' },
      ].map(({ href, icon, label }) => (
        <a
          key={href}
          href={href}
          className={`nav-item ${pathname.startsWith(href) ? 'active' : ''}`}
          onClick={isMobile && onClose ? onClose : undefined}
        >
          <i className={`fas ${icon}`}></i>
          <span className="nav-text">{label}</span>
        </a>
      ))}
    </>
  );

  if (isMobile) {
    return (
      <>
        {isDrawerOpen && (
          <div className="sidebar-overlay" onClick={onClose} />
        )}
        <aside className={`sidebar mobile-drawer${isDrawerOpen ? ' open' : ''}`} id="sidebar">
          {sidebarContent}
        </aside>
      </>
    );
  }

  // Desktop sidebar
  return (
    <aside className={`sidebar ${sidebarCollapsed ? 'collapsed' : 'expanded'}`} id="sidebar">
      {sidebarContent}
    </aside>
  );
}
