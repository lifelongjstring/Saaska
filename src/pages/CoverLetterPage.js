import React from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import "../styles/resume.css";
import "../App.css";

/**
 * CoverLetterPage component displays a list of cover letters and allows creation of new ones.
 * @returns {JSX.Element} The rendered cover letter page.
 * @precondition Should be used within a React Router context.
 */
export default function CoverLetterPage() {
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
      <Sidebar />

      <main className="main-content">
        <div className="dashboard-gradient-box" style={{ width: '100%', maxWidth: '1020px', margin: '24px auto 16px auto' }}>
          <div className="section-title">Your Cover Letters</div>
          <div className="card-grid">
            <Link to="/cover-letter-maker-page" className="card new-resume-card">
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
                <div className="card-meta">Last edited: {letter.lastEdited}</div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
