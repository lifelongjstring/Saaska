import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import "../styles/resume.css";
import "../styles/resumeMaker.css";

/**
 * ResumePreviewPage displays a completed resume after AI generation.
 * User can save to profile or download as PDF.
 * TODO: Integrate with backend API for saving and PDF export.
 */
export default function ResumePreviewPage() {
  const location = useLocation();
  const navigate = useNavigate();
  // Try to get resume data from location state or fallback to localStorage
  const resume =
    location.state?.resume ||
    JSON.parse(localStorage.getItem("aiResumePreview") || "null");

  if (!resume) {
    return (
      <div className="resume-maker-wrapper">
        <Sidebar />
        <main className="resume-maker-content">
          <div
            className="resume-maker-gradient-box"
            style={{ textAlign: "center", padding: 48 }}
          >
            <h2 style={{ color: "black", fontWeight: 700 }}>No Resume Data</h2>
            <p style={{ color: "#333" }}>
              Please generate a resume with AI first.
            </p>
            <button
              className="download-btn"
              onClick={() => navigate("/resume-maker-page")}
            >
              Back to Resume Maker
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  /**
   * Save the resume to localStorage (profile).
   * TODO: Replace with API call in production.
   */
  const handleSave = () => {
    const key = "savedResumes";
    const existing = JSON.parse(localStorage.getItem(key) || "[]");
    existing.push(resume);
    localStorage.setItem(key, JSON.stringify(existing));
    alert("Resume saved to profile! (Not yet persistent)");
  };

  /**
   * Download the resume as PDF (placeholder).
   * TODO: Implement real PDF export.
   */
  const handleDownload = () => {
    alert("PDF download coming soon! (TODO: Implement real export)");
  };

  return (
    <div className="resume-maker-wrapper">
      <Sidebar />
      <main className="resume-maker-content">
        <div
          className="resume-maker-gradient-box"
          style={{ maxWidth: 900, margin: "32px auto", padding: 48 }}
        >
          <h1
            style={{
              color: "black",
              fontWeight: 700,
              fontSize: "2rem",
              textAlign: "center",
              marginBottom: 24,
            }}
          >
            Your AI-Generated Resume
          </h1>
          <div
            style={{
              background: "white",
              borderRadius: 16,
              padding: 32,
              color: "#222",
              boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
              marginBottom: 32,
            }}
          >
            <h2 style={{ color: "#003049", fontWeight: 700 }}>{resume.name}</h2>
            <div style={{ color: "#555", marginBottom: 8 }}>
              {resume.email} | {resume.phone} | {resume.location}
            </div>
            <h3 style={{ color: "#0077b6", margin: "16px 0 8px 0" }}>
              {resume.jobTitle} {resume.company && `@ ${resume.company}`}
            </h3>
            <div style={{ marginBottom: 16 }}>
              <strong>Summary:</strong> {resume.summary}
            </div>
            <div style={{ marginBottom: 16 }}>
              <strong>Skills:</strong> {resume.skills}
            </div>
            <div style={{ marginBottom: 16 }}>
              <strong>Work Experience:</strong>
              <br />
              {resume.workDesc?.split("\n").map((line, i) => (
                <div key={i}>{line}</div>
              ))}
            </div>
            <div style={{ marginBottom: 16 }}>
              <strong>Education:</strong>
              <br />
              {resume.school} {resume.degree && `- ${resume.degree}`}
              <br />
              {resume.eduDesc}
            </div>
          </div>
          <div style={{ display: "flex", gap: 24, justifyContent: "center" }}>
            <button className="submit-btn" onClick={handleSave}>
              Save to Profile
            </button>
            <button className="download-btn" onClick={handleDownload}>
              Download as PDF
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
