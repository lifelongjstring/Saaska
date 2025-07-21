import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import DashboardWidget from "../components/DashboardWidget";
import RecentActivities from "../components/RecentActivities";
import StatsWidget from "../components/StatsWidget";
import QuickActions from "../components/QuickActions";
import ActivityTracker from "../components/ActivityTracker";
import { useUserActivity } from "../contexts/UserActivityContext";
import { useSidebar } from "../contexts/SidebarContext";
import "../styles/dashboard.css";
import "../styles/resume.css";
import MobileDrawer from '../components/MobileDrawer';

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
  const isMobile = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(max-width: 600px)').matches;

  useEffect(() => {
    trackPageVisit('Dashboard');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getWelcomeMessage = () => {
    const totalActivity = stats.resumesCreated + stats.coverLettersGenerated + 
                        stats.jobsApplied + stats.interviewsPracticed;
    
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
      "⏰ Set aside time daily for job searching"
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
      {isMobile && !drawerOpen && (
        <button
          className="hamburger-btn"
          aria-label="Open sidebar menu"
          aria-expanded={drawerOpen}
          onClick={() => setDrawerOpen(true)}
          style={{
            position: 'fixed', top: 12, left: 12, zIndex: 2001, background: 'none', border: 'none', fontSize: 28, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', width: 44, height: 44, borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.12)'
          }}
        >
          <span style={{ display: 'inline-block', width: 28, height: 28 }}>
            <svg viewBox="0 0 100 80" width="28" height="28"><rect width="100" height="12" rx="6" fill="currentColor"/><rect y="30" width="100" height="12" rx="6" fill="currentColor"/><rect y="60" width="100" height="12" rx="6" fill="currentColor"/></svg>
          </span>
        </button>
      )}
      <ActivityTracker feature="dashboard" pageName="Dashboard" />
      {isMobile ? (
        <MobileDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
      ) : (
        <Sidebar />
      )}

      <main className={`main-content ${sidebarCollapsed ? 'collapsed' : 'expanded'}`}>
        <div className="container">
          <div className="dashboard-header">
            <h1 className="section-title">Your Career Dashboard</h1>
            <p className="welcome-message">{getWelcomeMessage()}</p>
          </div>

          {/* Mobile: Stack 4 sections */}
          {isMobile ? (
            <div className="dashboard-widgets" style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <DashboardWidget 
                title="Your Statistics" 
                icon="📊"
                className="stats-widget-container dashboard-widget-card"
              >
                <StatsWidget />
              </DashboardWidget>
              <DashboardWidget 
                title="Quick Actions" 
                icon="⚡"
                className="quick-actions-container dashboard-widget-card"
              >
                <QuickActions />
              </DashboardWidget>
              <DashboardWidget 
                title="Recent Activity" 
                icon="🕒"
                className="activity-widget-container dashboard-widget-card"
              >
                <RecentActivities />
              </DashboardWidget>
              <DashboardWidget 
                title="Today's Tip" 
                icon="💡"
                className="tips-widget-container dashboard-widget-card"
              >
                <div className="tip-content">
                  <p>{getTips()}</p>
                  <button 
                    className="tip-action-btn"
                    onClick={() => navigate('/features')}
                  >
                    Explore More Features
                  </button>
                </div>
              </DashboardWidget>
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
                    onClick={() => navigate('/features')}
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
