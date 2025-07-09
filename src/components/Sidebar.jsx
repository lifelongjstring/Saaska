// Sidebar.tsx
import { useLocation } from 'react-router-dom';
import { useSidebar } from '../contexts/SidebarContext';

/**
 * Sidebar component displays the navigation sidebar with toggle functionality.
 * @returns {JSX.Element} The rendered sidebar.
 * @precondition Should be used within a layout that supports sidebar navigation.
 */
export default function Sidebar() {
  const location = useLocation();
  const pathname = location.pathname;
  const { sidebarCollapsed, toggleSidebar } = useSidebar();

  return (
    <aside className={`sidebar ${sidebarCollapsed ? 'collapsed' : 'expanded'}`} id="sidebar">
      <div className="sidebar-header">
        <h2 className="nav-text">SaaSka</h2>
        <button onClick={toggleSidebar} id="toggleSidebar">
          <i className={`fas ${sidebarCollapsed ? 'fa-chevron-right' : 'fa-chevron-left'}`}></i>
        </button>
      </div>

      {[
        { href: '/dashboard', icon: 'fa-home', label: 'Dashboard' },
        { href: '/job-search', icon: 'fa-city', label: 'Job Search' },
        { href: '/resume', icon: 'fa-file-alt', label: 'Resumes' },
        { href: '/cover_letter', icon: 'fa-envelope', label: 'Cover Letters' },
        { href: '/applications', icon: 'fa-briefcase', label: 'Applications' },
        { href: '/interviews', icon: 'fa-lightbulb', label: 'Interview Practice' },
      ].map(({ href, icon, label }) => (
        /**
         * Render a single sidebar navigation item.
         * @param {string} href - The link destination.
         * @param {string} icon - The icon class.
         * @param {string} label - The label for the nav item.
         * @returns {JSX.Element} The rendered nav item.
         * @precondition href, icon, and label must be valid strings.
         */
        <a
          key={href}
          href={href}
          className={`nav-item ${pathname.startsWith(href) ? 'active' : ''}`}
        >
          <i className={`fas ${icon}`}></i>
          <span className="nav-text">{label}</span>
        </a>
      ))}
    </aside>
  );
}
