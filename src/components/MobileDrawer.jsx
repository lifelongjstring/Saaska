import React from "react";

const navLinks = [
  { href: "/dashboard", icon: "fa-home", label: "Dashboard" },
  { href: "/job-search", icon: "fa-city", label: "Job Search" },
  { href: "/resume", icon: "fa-file-alt", label: "Resumes" },
  { href: "/cover_letter", icon: "fa-envelope", label: "Cover Letters" },
  { href: "/applications", icon: "fa-briefcase", label: "Applications" },
  { href: "/interviews", icon: "fa-lightbulb", label: "Interview Practice" },
];

export default function MobileDrawer({ isOpen, onClose }) {
  return (
    <>
      {isOpen && <div className="mobile-drawer-overlay" onClick={onClose} />}
      <nav className={`mobile-drawer-nav${isOpen ? " open" : ""}`}>
        <div className="mobile-drawer-header">
          <button
            className="mobile-drawer-close"
            onClick={onClose}
            aria-label="Close menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </svg>
          </button>
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
