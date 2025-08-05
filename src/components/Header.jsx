import React, { useState, useEffect } from "react";
import logo from "./icons8-job-80.png";

/**
 * Header component displays the site navigation and logo.
 * @returns {JSX.Element} The rendered header.
 * @precondition Should be used at the top of a page layout.
 */
const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isMobileMenuOpen) {
        closeMobileMenu();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isMobileMenuOpen]);

  return (
    <>
      <header className="header-container">
        <div className="logo">
          <img src={logo} alt="SaaSka Logo" />
          <h1>SaaSka</h1>
        </div>

        {/* Mobile hamburger button */}
        <button
          className="mobile-menu-button"
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation menu"
        >
          <span
            className={`hamburger-line ${isMobileMenuOpen ? "open" : ""}`}
          ></span>
          <span
            className={`hamburger-line ${isMobileMenuOpen ? "open" : ""}`}
          ></span>
          <span
            className={`hamburger-line ${isMobileMenuOpen ? "open" : ""}`}
          ></span>
        </button>

        {/* Desktop navigation */}
        <nav className="desktop-nav">
          <a href="/">Home</a>
          <a href="/features">Features</a>
          <a href="/pricing">Pricing</a>
          <div className="dropdown">
            <select defaultValue="iPathPro">
              <option value="iPathPro">iPathPro</option>
              <option value="Free">Free</option>
              <option value="Pro">Pro</option>
            </select>
          </div>
          <a href="/login">Login / Sign Up</a>
        </nav>
      </header>

      {/* Mobile menu overlay */}
      <div
        className={`mobile-menu-overlay ${isMobileMenuOpen ? "open" : ""}`}
        onClick={closeMobileMenu}
      >
        <nav className="mobile-nav" onClick={(e) => e.stopPropagation()}>
          <div className="mobile-nav-header">
            <button
              className="mobile-nav-close"
              onClick={closeMobileMenu}
              aria-label="Close menu"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
              </svg>
            </button>
          </div>
          <a href="/" onClick={closeMobileMenu}>
            Home
          </a>
          <a href="/features" onClick={closeMobileMenu}>
            Features
          </a>
          <a href="/pricing" onClick={closeMobileMenu}>
            Pricing
          </a>
          <div className="mobile-dropdown">
            <select defaultValue="iPathPro">
              <option value="iPathPro">iPathPro</option>
              <option value="Free">Free</option>
              <option value="Pro">Pro</option>
            </select>
          </div>
          <a href="/login" className="login-button" onClick={closeMobileMenu}>
            Login / Sign Up
          </a>
        </nav>
      </div>

      <style jsx>{`
        .header-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          margin: 20px auto;
          max-width: 1200px;
          width: calc(100% - 40px);
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .logo img {
          width: 40px;
          height: 40px;
        }

        .logo h1 {
          font-size: 24px;
          font-weight: 600;
          margin: 0;
          color: white;
        }

        .mobile-menu-button {
          display: none;
          flex-direction: column;
          justify-content: space-around;
          width: 30px;
          height: 25px;
          background: transparent;
          border: none;
          cursor: pointer;
          z-index: 1001;
          position: relative;
        }

        .hamburger-line {
          width: 30px;
          height: 3px;
          background: white;
          border-radius: 3px;
          transition: all 0.3s ease;
          transform-origin: center;
        }

        .hamburger-line.open:nth-child(1) {
          transform: rotate(45deg) translate(6px, 6px);
        }

        .hamburger-line.open:nth-child(2) {
          opacity: 0;
        }

        .hamburger-line.open:nth-child(3) {
          transform: rotate(-45deg) translate(6px, -6px);
        }

        .desktop-nav {
          display: flex;
          align-items: center;
          gap: 25px;
        }

        .desktop-nav a {
          color: white;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.3s ease;
        }

        .desktop-nav a:hover {
          color: #ff7b25;
        }

        .dropdown select {
          background: rgba(255, 255, 255, 0.3);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 5px;
          padding: 8px 12px;
          cursor: pointer;
        }

        .dropdown select option {
          background: #0077b6;
          color: white;
        }

        .mobile-menu-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 48, 73, 0.98);
          backdrop-filter: blur(10px);
          z-index: 1000;
          display: none;
          opacity: 0;
          transform: translateY(-100%);
          transition: all 0.3s ease;
        }

        .mobile-menu-overlay.open {
          display: flex;
          opacity: 1;
          transform: translateY(0);
        }

        .mobile-nav {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 100vh;
          gap: 30px;
          width: 100%;
          position: relative;
          padding-top: 80px;
        }

        .mobile-nav-header {
          position: absolute;
          top: 20px;
          left: 0;
          right: 0;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          padding: 0 10px;
        }

        .mobile-nav-close {
          background: none;
          border: none;
          color: white;
          cursor: pointer;
          padding: 8px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background-color 0.2s ease;
          margin-left: auto;
        }

        .mobile-nav-close:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .mobile-nav-close svg {
          width: 24px;
          height: 24px;
        }

        .mobile-nav a {
          color: white;
          text-decoration: none;
          font-size: 18px;
          font-weight: 500;
          padding: 15px 30px;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
          min-width: 200px;
          text-align: center;
          margin-top: 0;
        }

        .mobile-nav a:hover,
        .mobile-nav a:active {
          background: rgba(255, 123, 37, 0.8);
        }

        .mobile-dropdown {
          width: 200px;
        }

        .mobile-dropdown select {
          width: 100%;
          background: rgba(255, 255, 255, 0.1);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 10px;
          padding: 15px;
          font-size: 16px;
          cursor: pointer;
        }

        .mobile-dropdown select option {
          background: #0077b6;
          color: white;
        }

        .login-button {
          background: #ff7b25 !important;
          font-weight: 600 !important;
        }

        .login-button:hover {
          background: #ff914d !important;
        }

        /* Mobile styles */
        @media (max-width: 768px) {
          .header-container {
            margin: 10px auto;
            padding: 15px 20px;
            border-radius: 15px;
            width: calc(100% - 20px);
          }

          .logo img {
            width: 35px;
            height: 35px;
          }

          .logo h1 {
            font-size: 20px;
          }

          .mobile-menu-button {
            display: flex;
          }

          .desktop-nav {
            display: none;
          }
        }

        @media (max-width: 480px) {
          .header-container {
            margin: 5px auto;
            padding: 12px 15px;
            width: calc(100% - 10px);
          }

          .logo h1 {
            font-size: 18px;
          }

          .logo img {
            width: 30px;
            height: 30px;
          }

          .mobile-nav a {
            font-size: 16px;
            min-width: 180px;
            padding: 12px 25px;
          }

          .mobile-nav {
            gap: 25px;
          }
        }
      `}</style>
    </>
  );
};

export default Header;
