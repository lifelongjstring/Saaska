// ApplicationsPage.tsx
import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import ApplicationsTable from "../components/ApplicationsTable";
import Footer from "../components/Footer";
import MobileDrawer from "../components/MobileDrawer";
import "../styles/resume.css";
import "../App.css";

/**
 * ApplicationsPage component displays the user's job applications.
 * @returns {JSX.Element} The rendered applications page.
 * @precondition Should be used within a React Router context.
 */
const ApplicationsPage = () => {
  // Mobile drawer state
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Detect mobile
  const isMobile =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(max-width: 600px)").matches;

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
                <h2 className="greeting-title">Your Applications</h2>
                <p className="greeting-subtitle">
                  Track your job search progress in one place
                </p>
              </div>
            </div>

            {/* Stats Cards - Application Metrics */}
            <div className="clean-stats-section">
              <div className="clean-stats-row">
                <div className="clean-stat-item">
                  <div className="clean-stat-number">12</div>
                  <div className="clean-stat-label">Total</div>
                </div>
                <div className="clean-stat-item">
                  <div className="clean-stat-number">3</div>
                  <div className="clean-stat-label">Pending</div>
                </div>
              </div>
              <div className="clean-stats-row">
                <div className="clean-stat-item">
                  <div className="clean-stat-number">2</div>
                  <div className="clean-stat-label">Interviews</div>
                </div>
                <div className="clean-stat-item">
                  <div className="clean-stat-number">1</div>
                  <div className="clean-stat-label">Offers</div>
                </div>
              </div>
            </div>

            {/* Primary Actions - Main Application Actions */}
            <div className="clean-actions-section">
              <div className="clean-action-card primary-action">
                <div className="action-icon">📝</div>
                <div className="action-content">
                  <div className="action-title">Add Application</div>
                  <div className="action-subtitle">
                    Track a new job application
                  </div>
                </div>
              </div>

              <div className="clean-action-card secondary-action">
                <div className="action-icon">📊</div>
                <div className="action-content">
                  <div className="action-title">View Analytics</div>
                  <div className="action-subtitle">
                    See your application insights
                  </div>
                </div>
              </div>
            </div>

            {/* Application List */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              <div
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
                    🏢 Frontend Developer
                  </h3>
                  <div style={{ color: "#0077b6", fontWeight: "500" }}>
                    Tech Solutions Inc.
                  </div>
                  <div
                    style={{
                      color: "#64748b",
                      fontSize: "0.9rem",
                      margin: "4px 0",
                    }}
                  >
                    📅 Applied 2 days ago • 📍 New York, NY
                  </div>
                  <div
                    style={{
                      display: "inline-block",
                      padding: "4px 8px",
                      borderRadius: "12px",
                      fontSize: "0.8rem",
                      fontWeight: "500",
                      background: "#dbeafe",
                      color: "#1d4ed8",
                      marginTop: "4px",
                    }}
                  >
                    ✅ Applied
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
                    ✏️ Update
                  </button>
                </div>
              </div>

              <div
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
                    🎯 Product Manager
                  </h3>
                  <div style={{ color: "#0077b6", fontWeight: "500" }}>
                    Innovatech
                  </div>
                  <div
                    style={{
                      color: "#64748b",
                      fontSize: "0.9rem",
                      margin: "4px 0",
                    }}
                  >
                    📅 Applied 1 week ago • 🌐 Remote
                  </div>
                  <div
                    style={{
                      display: "inline-block",
                      padding: "4px 8px",
                      borderRadius: "12px",
                      fontSize: "0.8rem",
                      fontWeight: "500",
                      background: "#fef3c7",
                      color: "#d97706",
                      marginTop: "4px",
                    }}
                  >
                    📞 Interview
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
                    ✏️ Update
                  </button>
                </div>
              </div>
            </div>

            {/* Secondary Actions - Quick Links */}
            <div className="clean-secondary-actions">
              <div className="secondary-action-btn">
                <span className="secondary-icon">🔍</span>
                <span className="secondary-text">Filter</span>
              </div>
              <div className="secondary-action-btn">
                <span className="secondary-icon">📤</span>
                <span className="secondary-text">Export</span>
              </div>
              <div className="secondary-action-btn">
                <span className="secondary-icon">📈</span>
                <span className="secondary-text">Progress</span>
              </div>
            </div>

            {/* Today's Tip */}
            <div className="clean-tip-card">
              <div className="tip-header">
                <span className="tip-icon">💡</span>
                <span className="tip-title">Application Tip</span>
              </div>
              <p className="tip-text">
                Follow up on applications after 1-2 weeks. A polite email shows
                continued interest and keeps you top of mind.
              </p>
            </div>
          </div>
        ) : (
          <div
            className="dashboard-gradient-box"
            style={{
              margin: "32px auto",
              padding: "32px 24px",
              maxWidth: 1200,
            }}
          >
            <div
              className="section-title"
              style={{ textAlign: "center", color: "black", marginBottom: 8 }}
            >
              Your Applications
            </div>
            <div
              style={{
                textAlign: "center",
                color: "#333",
                fontSize: "1.1rem",
                marginBottom: 24,
              }}
            >
              Track all the jobs you've applied for in one place.
            </div>
            {/* Remove the card-grid wrapper to allow ApplicationsTable to center */}
            <ApplicationsTable />
          </div>
        )}
      </main>
      {!isMobile && <Footer />}
    </div>
  );
};

export default ApplicationsPage;
