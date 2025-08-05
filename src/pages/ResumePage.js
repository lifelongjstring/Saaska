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

      <main className="main-content">
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
      </main>

      <Footer />
    </div>
  );
}
