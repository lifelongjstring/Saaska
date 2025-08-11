import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

import DashboardWidget from "../components/DashboardWidget";
import RecentActivities from "../components/RecentActivities";
import StatsWidget from "../components/StatsWidget";
import QuickActions from "../components/QuickActions";
import ActivityTracker from "../components/ActivityTracker";
import { useUserActivity } from "../contexts/UserActivityContext";
import { useSidebar } from "../contexts/SidebarContext";
import "../styles/dashboard.css";
import "../styles/resume.css";
import MobileDrawer from "../components/MobileDrawer";

/**
 * DashboardPage component displays the user's dynamic dashboard with widgets.
 * @returns {JSX.Element} The rendered dashboard page.
 * @precondition Should be used within a React Router context.
 */
export default function DashboardPage() {
  const navigate = useNavigate();
  const { trackPageVisit, stats } = useUserActivity();
  const { sidebarCollapsed } = useSidebar();

  // Mobile drawer state
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Detect mobile
  const isMobile =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(max-width: 600px)").matches;

  useEffect(() => {
    trackPageVisit("Dashboard");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getWelcomeMessage = () => {
    const totalActivity =
      stats.resumesCreated +
      stats.coverLettersGenerated +
      stats.jobsApplied +
      stats.interviewsPracticed;

    if (totalActivity === 0) {
      return "Welcome! Start your job search journey today.";
    } else if (totalActivity < 5) {
      return "Great start! Keep building your career toolkit.";
    } else if (totalActivity < 15) {
      return "You're making excellent progress!";
    } else {
      return "You're a job search pro! Keep up the great work.";
    }
  };

  const getTips = () => {
    const tips = [
      "💡 Customize your resume for each job application",
      "🎯 Practice common interview questions regularly",
      "📝 Write personalized cover letters for each company",
      "🔍 Research companies before interviews",
      "📊 Track your applications to stay organized",
      "⏰ Set aside time daily for job searching",
    ];

    // Return tips based on user activity
    if (stats.resumesCreated === 0) {
      return tips[0];
    } else if (stats.coverLettersGenerated === 0) {
      return tips[2];
    } else if (stats.interviewsPracticed === 0) {
      return tips[1];
    } else if (stats.jobsApplied === 0) {
      return tips[4];
    } else {
      return tips[Math.floor(Math.random() * tips.length)];
    }
  };

  return (
    <div className="dashboard-page-wrapper">
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
      <ActivityTracker feature="dashboard" pageName="Dashboard" />
      {isMobile ? (
        <MobileDrawer
          isOpen={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        />
      ) : (
        <Sidebar />
      )}

      <main
        className={`main-content ${sidebarCollapsed ? "collapsed" : "expanded"}`}
      >
        <div className="container">
          <div className="dashboard-header">
            <h1 className="section-title">Your Career Dashboard</h1>
            <p className="welcome-message">{getWelcomeMessage()}</p>
          </div>

          {/* Mobile: Ultra-clean streamlined experience */}
          {isMobile ? (
            <div className="ultra-clean-mobile-dashboard">
              {/* Greeting Section */}
              <div className="mobile-greeting-card">
                <div className="greeting-content">
                  <h2 className="greeting-title">Welcome back!</h2>
                  <p className="greeting-subtitle">{getWelcomeMessage()}</p>
                </div>
              </div>

              {/* Stats Cards - Minimal Design */}
              <div className="clean-stats-section">
                <div className="clean-stats-row">
                  <div className="clean-stat-item">
                    <div className="clean-stat-number">
                      {stats.resumesCreated}
                    </div>
                    <div className="clean-stat-label">Resumes</div>
                  </div>
                  <div className="clean-stat-item">
                    <div className="clean-stat-number">
                      {stats.coverLettersGenerated}
                    </div>
                    <div className="clean-stat-label">Cover Letters</div>
                  </div>
                </div>
                <div className="clean-stats-row">
                  <div className="clean-stat-item">
                    <div className="clean-stat-number">{stats.jobsApplied}</div>
                    <div className="clean-stat-label">Applications</div>
                  </div>
                  <div className="clean-stat-item">
                    <div className="clean-stat-number">
                      {stats.interviewsPracticed}
                    </div>
                    <div className="clean-stat-label">Interviews</div>
                  </div>
                </div>
              </div>

              {/* Primary Actions - Minimal Cards */}
              <div className="clean-actions-section">
                <div
                  className="clean-action-card primary-action"
                  onClick={() => navigate("/resume-maker-page")}
                >
                  <div className="action-icon">📄</div>
                  <div className="action-content">
                    <div className="action-title">Create Resume</div>
                    <div className="action-subtitle">
                      Build your professional resume
                    </div>
                  </div>
                </div>

                <div
                  className="clean-action-card secondary-action"
                  onClick={() => navigate("/cover-letter-maker-page")}
                >
                  <div className="action-icon">✉️</div>
                  <div className="action-content">
                    <div className="action-title">Write Cover Letter</div>
                    <div className="action-subtitle">
                      Craft compelling applications
                    </div>
                  </div>
                </div>
              </div>

              {/* Secondary Actions - Compact */}
              <div className="clean-secondary-actions">
                <div
                  className="secondary-action-btn"
                  onClick={() => navigate("/job-search")}
                >
                  <span className="secondary-icon">🔍</span>
                  <span className="secondary-text">Find Jobs</span>
                </div>
                <div
                  className="secondary-action-btn"
                  onClick={() => navigate("/interviews")}
                >
                  <span className="secondary-icon">💡</span>
                  <span className="secondary-text">Practice Interviews</span>
                </div>
                <div
                  className="secondary-action-btn"
                  onClick={() => navigate("/applications")}
                >
                  <span className="secondary-icon">📋</span>
                  <span className="secondary-text">View Applications</span>
                </div>
              </div>

              {/* Today's Tip - Minimal */}
              <div className="clean-tip-card">
                <div className="tip-header">
                  <span className="tip-icon">💡</span>
                  <span className="tip-title">Today's Tip</span>
                </div>
                <p className="tip-text">{getTips()}</p>
              </div>
            </div>
          ) : (
            <div className="dashboard-widgets">
              <DashboardWidget
                title="Your Statistics"
                icon="📊"
                className="stats-widget-container"
              >
                <StatsWidget />
              </DashboardWidget>
              <DashboardWidget
                title="Quick Actions"
                icon="⚡"
                className="quick-actions-container"
              >
                <QuickActions />
              </DashboardWidget>
              <DashboardWidget
                title="Recent Activity"
                icon="🕒"
                className="activity-widget-container"
              >
                <RecentActivities />
              </DashboardWidget>
              <DashboardWidget
                title="Today's Tip"
                icon="💡"
                className="tips-widget-container"
              >
                <div className="tip-content">
                  <p>{getTips()}</p>
                  <button
                    className="tip-action-btn"
                    onClick={() => navigate("/features")}
                  >
                    Explore More Features
                  </button>
                </div>
              </DashboardWidget>
            </div>
          )}
        </div>
      </main>


    </div>
  );
}
