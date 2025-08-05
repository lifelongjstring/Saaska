import React, { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import ResumeCard from "../components/ResumeCard";
import "../styles/resume.css";
import "../App.css";
import MobileDrawer from "../components/MobileDrawer";

/**
 * ResumePage component displays a list of resumes and allows creation of new ones.
 * @returns {JSX.Element} The rendered resume page.
 * @precondition Should be used within a React Router context.
 */
export default function ResumePage() {
  // Mobile drawer state
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Detect mobile
  const isMobile =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(max-width: 600px)").matches;

  /**
   * List of resumes to display on the page.
   * @type {Array<{title: string, lastEdited: string}>}
   * @precondition Must be a valid array of resume objects.
   */
  const resumes = [
    { title: "Marketing Manager Resume", lastEdited: "May 30, 2025" },
    { title: "UX Designer Resume", lastEdited: "May 25, 2025" },
    { title: "Software Engineer Resume", lastEdited: "May 20, 2025" },
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
                <h2 className="greeting-title">Your Resumes</h2>
                <p className="greeting-subtitle">
                  {resumes.length === 0
                    ? "Create your first professional resume"
                    : `Managing ${resumes.length} resume${resumes.length !== 1 ? "s" : ""}`}
                </p>
              </div>
            </div>

            {/* Stats Cards - Resume Metrics */}
            <div className="clean-stats-section">
              <div className="clean-stats-row">
                <div className="clean-stat-item">
                  <div className="clean-stat-number">{resumes.length}</div>
                  <div className="clean-stat-label">Resumes</div>
                </div>
                <div className="clean-stat-item">
                  <div className="clean-stat-number">
                    {resumes.length > 0 ? "1" : "0"}
                  </div>
                  <div className="clean-stat-label">Active</div>
                </div>
              </div>
              <div className="clean-stats-row">
                <div className="clean-stat-item">
                  <div className="clean-stat-number">5</div>
                  <div className="clean-stat-label">Downloads</div>
                </div>
                <div className="clean-stat-item">
                  <div className="clean-stat-number">12</div>
                  <div className="clean-stat-label">Views</div>
                </div>
              </div>
            </div>

            {/* Primary Actions - Main Resume Actions */}
            <div className="clean-actions-section">
              <Link
                to="/resume-maker-page"
                className="clean-action-card primary-action"
                style={{ textDecoration: "none" }}
              >
                <div className="action-icon">📄</div>
                <div className="action-content">
                  <div className="action-title">Create New Resume</div>
                  <div className="action-subtitle">
                    Build your professional resume
                  </div>
                </div>
              </Link>

              <div className="clean-action-card secondary-action">
                <div className="action-icon">⚡</div>
                <div className="action-content">
                  <div className="action-title">Quick Edit</div>
                  <div className="action-subtitle">
                    Update your latest resume
                  </div>
                </div>
              </div>
            </div>

            {/* Resume List */}
            {resumes.length > 0 && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                {resumes.map((resume, index) => (
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
                        📄 {resume.title}
                      </h3>
                      <div
                        style={{
                          color: "#64748b",
                          fontSize: "0.9rem",
                        }}
                      >
                        Last edited: {resume.lastEdited}
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
                            "linear-gradient(135deg, #0077b6 0%, #003049 100%)",
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
                <span className="secondary-text">Export PDF</span>
              </div>
              <div className="secondary-action-btn">
                <span className="secondary-icon">📋</span>
                <span className="secondary-text">Copy Resume</span>
              </div>
              <div className="secondary-action-btn">
                <span className="secondary-icon">📊</span>
                <span className="secondary-text">Analytics</span>
              </div>
            </div>

            {/* Today's Tip */}
            <div className="clean-tip-card">
              <div className="tip-header">
                <span className="tip-icon">💡</span>
                <span className="tip-title">Resume Tip</span>
              </div>
              <p className="tip-text">
                {resumes.length === 0
                  ? "Start with a strong summary that highlights your key achievements and skills."
                  : "Keep your resume updated with your latest accomplishments and tailor it for each job application."}
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
            <div className="section-title">Your Resumes</div>
            <div className="card-grid">
              <Link to="/resume-maker-page" className="card new-resume-card">
                <i className="fas fa-plus-circle"></i>
                <div>Create New Resume</div>
              </Link>
              {resumes.map((resume, index) => (
                /**
                 * Render a single resume card.
                 * @param {Object} resume - The resume object.
                 * @param {string} resume.title - The title of the resume.
                 * @param {string} resume.lastEdited - The last edited date.
                 * @param {number} index - The index of the resume in the array.
                 * @returns {JSX.Element} The rendered resume card.
                 * @precondition resume must be a valid resume object.
                 */
                <ResumeCard
                  key={index}
                  title={resume.title}
                  lastEdited={resume.lastEdited}
                />
              ))}
            </div>
          </div>
        )}
      </main>

      {!isMobile && <Footer />}
    </div>
  );
}
