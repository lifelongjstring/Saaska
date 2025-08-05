import React, { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import "../styles/resume.css";
import "../App.css";
import MobileDrawer from "../components/MobileDrawer";

/**
 * CoverLetterPage component displays a list of cover letters and allows creation of new ones.
 * @returns {JSX.Element} The rendered cover letter page.
 * @precondition Should be used within a React Router context.
 */
export default function CoverLetterPage() {
  // Mobile drawer state
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Detect mobile
  const isMobile =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(max-width: 600px)").matches;

  /**
   * List of cover letters to display on the page.
   * @type {Array<{title: string, lastEdited: string}>}
   * @precondition Must be a valid array of cover letter objects.
   */
  const letters = [
    { title: "Marketing Cover Letter", lastEdited: "May 29, 2025" },
    { title: "UX Design Cover Letter", lastEdited: "May 26, 2025" },
    { title: "Engineering Cover Letter", lastEdited: "May 21, 2025" },
  ];

  return (
    <div className="resume-page-wrapper">
      {/* Hamburger for mobile */}
      {isMobile && (
        <button
          className="hamburger-btn"
          aria-label={drawerOpen ? "Close sidebar menu" : "Open sidebar menu"}
          aria-expanded={drawerOpen}
          onClick={() => setDrawerOpen(!drawerOpen)}
          style={{
            position: "fixed",
            top: 12,
            left: 12,
            zIndex: 2003,
            background: "none",
            border: "none",
            fontSize: 28,
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 44,
            height: 44,
            borderRadius: 8,
            boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
          }}
        >
          <span style={{ display: "inline-block", width: 28, height: 28 }}>
            {drawerOpen ? (
              <svg
                viewBox="0 0 24 24"
                width="28"
                height="28"
                fill="currentColor"
              >
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
              </svg>
            ) : (
              <svg viewBox="0 0 100 80" width="28" height="28">
                <rect width="100" height="12" rx="6" fill="currentColor" />
                <rect
                  y="30"
                  width="100"
                  height="12"
                  rx="6"
                  fill="currentColor"
                />
                <rect
                  y="60"
                  width="100"
                  height="12"
                  rx="6"
                  fill="currentColor"
                />
              </svg>
            )}
          </span>
        </button>
      )}

      {isMobile ? (
        <MobileDrawer
          isOpen={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        />
      ) : (
        <Sidebar />
      )}

      <main className="main-content">
        {/* Mobile: Ultra-clean streamlined experience */}
        {isMobile ? (
          <div className="ultra-clean-mobile-dashboard">
            {/* Greeting Section */}
            <div className="mobile-greeting-card">
              <div className="greeting-content">
                <h2 className="greeting-title">Your Cover Letters</h2>
                <p className="greeting-subtitle">
                  {letters.length === 0
                    ? "Create your first compelling cover letter"
                    : `Managing ${letters.length} cover letter${letters.length !== 1 ? "s" : ""}`}
                </p>
              </div>
            </div>

            {/* Stats Cards - Cover Letter Metrics */}
            <div className="clean-stats-section">
              <div className="clean-stats-row">
                <div className="clean-stat-item">
                  <div className="clean-stat-number">{letters.length}</div>
                  <div className="clean-stat-label">Letters</div>
                </div>
                <div className="clean-stat-item">
                  <div className="clean-stat-number">
                    {letters.length > 0 ? "3" : "0"}
                  </div>
                  <div className="clean-stat-label">Templates</div>
                </div>
              </div>
              <div className="clean-stats-row">
                <div className="clean-stat-item">
                  <div className="clean-stat-number">8</div>
                  <div className="clean-stat-label">Sent</div>
                </div>
                <div className="clean-stat-item">
                  <div className="clean-stat-number">2</div>
                  <div className="clean-stat-label">Responses</div>
                </div>
              </div>
            </div>

            {/* Primary Actions - Main Cover Letter Actions */}
            <div className="clean-actions-section">
              <Link
                to="/cover-letter-maker-page"
                className="clean-action-card primary-action"
                style={{ textDecoration: "none" }}
              >
                <div className="action-icon">✉️</div>
                <div className="action-content">
                  <div className="action-title">Write Cover Letter</div>
                  <div className="action-subtitle">
                    Craft compelling applications
                  </div>
                </div>
              </Link>

              <div className="clean-action-card secondary-action">
                <div className="action-icon">🎯</div>
                <div className="action-content">
                  <div className="action-title">Use Template</div>
                  <div className="action-subtitle">
                    Start with proven formats
                  </div>
                </div>
              </div>
            </div>

            {/* Cover Letter List */}
            {letters.length > 0 && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                {letters.map((letter, index) => (
                  <div
                    key={index}
                    style={{
                      background: "rgba(255, 255, 255, 0.95)",
                      backdropFilter: "blur(10px)",
                      borderRadius: "16px",
                      padding: "20px",
                      border: "1px solid rgba(255, 255, 255, 0.3)",
                      boxShadow: "0 4px 15px rgba(0, 0, 0, 0.08)",
                    }}
                  >
                    <div style={{ marginBottom: "12px" }}>
                      <h3
                        style={{
                          margin: "0 0 4px 0",
                          fontSize: "1.1rem",
                          fontWeight: "600",
                          color: "#1f2937",
                        }}
                      >
                        ✉️ {letter.title}
                      </h3>
                      <div
                        style={{
                          color: "#64748b",
                          fontSize: "0.9rem",
                        }}
                      >
                        Last edited: {letter.lastEdited}
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <button
                        style={{
                          flex: 1,
                          padding: "8px 12px",
                          background: "#f1f5f9",
                          color: "#475569",
                          border: "1px solid #e2e8f0",
                          borderRadius: "8px",
                          fontSize: "0.9rem",
                          cursor: "pointer",
                        }}
                      >
                        👁️ View
                      </button>
                      <button
                        style={{
                          flex: 1,
                          padding: "8px 12px",
                          background:
                            "linear-gradient(135deg, #ff7b25 0%, #ff914d 100%)",
                          color: "white",
                          border: "none",
                          borderRadius: "8px",
                          fontSize: "0.9rem",
                          cursor: "pointer",
                        }}
                      >
                        ✏️ Edit
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Secondary Actions - Quick Links */}
            <div className="clean-secondary-actions">
              <div className="secondary-action-btn">
                <span className="secondary-icon">📤</span>
                <span className="secondary-text">Send Letter</span>
              </div>
              <div className="secondary-action-btn">
                <span className="secondary-icon">📋</span>
                <span className="secondary-text">Copy Text</span>
              </div>
              <div className="secondary-action-btn">
                <span className="secondary-icon">📊</span>
                <span className="secondary-text">Templates</span>
              </div>
            </div>

            {/* Today's Tip */}
            <div className="clean-tip-card">
              <div className="tip-header">
                <span className="tip-icon">💡</span>
                <span className="tip-title">Cover Letter Tip</span>
              </div>
              <p className="tip-text">
                {letters.length === 0
                  ? "Start with a strong opening that mentions the specific role and company to grab the hiring manager's attention."
                  : "Customize each cover letter to match the job requirements and company culture for better results."}
              </p>
            </div>
          </div>
        ) : (
          <div
            className="dashboard-gradient-box"
            style={{
              width: "100%",
              maxWidth: "1020px",
              margin: "24px auto 16px auto",
            }}
          >
            <div className="section-title">Your Cover Letters</div>
            <div className="card-grid">
              <Link
                to="/cover-letter-maker-page"
                className="card new-resume-card"
              >
                <i className="fas fa-plus-circle"></i>
                <div>Create New Letter</div>
              </Link>
              {letters.map((letter, index) => (
                /**
                 * Render a single cover letter card.
                 * @param {Object} letter - The cover letter object.
                 * @param {string} letter.title - The title of the cover letter.
                 * @param {string} letter.lastEdited - The last edited date.
                 * @param {number} index - The index of the letter in the array.
                 * @returns {JSX.Element} The rendered cover letter card.
                 * @precondition letter must be a valid cover letter object.
                 */
                <div className="card" key={index}>
                  <div className="card-title">{letter.title}</div>
                  <div className="card-meta">
                    Last edited: {letter.lastEdited}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
