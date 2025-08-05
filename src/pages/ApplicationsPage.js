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
      {isMobile && !drawerOpen && (
        <button
          className="hamburger-btn"
          aria-label="Open sidebar menu"
          aria-expanded={drawerOpen}
          onClick={() => setDrawerOpen(true)}
          style={{
            position: "fixed",
            top: 12,
            left: 12,
            zIndex: 2001,
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
          ☰
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
      <main className="main-content" style={{ marginLeft: 180 }}>
        <div
          className="dashboard-gradient-box"
          style={{ margin: "32px auto", padding: "32px 24px", maxWidth: 1200 }}
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
      </main>
      <Footer />
    </div>
  );
};

export default ApplicationsPage;
