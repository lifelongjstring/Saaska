import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import "../styles/resume.css";
import "../styles/coverLetterMaker.css";
import "../App.css";
import { useUserActivity } from "../contexts/UserActivityContext";
import ActivityTracker from "../components/ActivityTracker";

/**
 * CoverLetterMakerPage component allows users to create a new cover letter with a modern, glassy form.
 * @returns {JSX.Element} The rendered cover letter maker page.
 * @precondition Should be used within a React Router context.
 */
export default function CoverLetterMakerPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    recipient: "",
    company: "",
    jobTitle: "",
    letterBody: ""
  });
  const [saved, setSaved] = useState(false);
  const { trackPageVisit, trackCoverLetterGenerated } = useUserActivity();

  useEffect(() => {
    trackPageVisit('Cover Letter Maker');
  }, [trackPageVisit]);

  /**
   * Handle form input changes.
   * @param {React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>} e - The input change event.
   * @returns {void}
   * @precondition e.target.name matches a key in form.
   */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /**
   * Handle form submission (save cover letter).
   * @param {React.FormEvent} e - The form submit event.
   * @returns {void}
   * @precondition Form fields are valid.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    setSaved(true);
    trackCoverLetterGenerated({
      company: form.company || 'Unknown Company',
      position: form.jobTitle || 'Unknown Position'
    });
    // TODO: Integrate with backend or local storage
  };

  /**
   * Handle download as PDF (placeholder for now).
   * @returns {void}
   */
  const handleDownload = () => {
    // TODO: Implement PDF download (e.g., with jsPDF)
    alert("PDF download coming soon!");
  };

  return (
    <div className="cover-letter-maker-wrapper">
      <ActivityTracker feature="cover_letter_maker" pageName="Cover Letter Maker" />
      <Sidebar />
      <main className="cover-letter-maker-content">
        <div className="cover-letter-maker-gradient-box">
          <h1 style={{ color: 'black', fontWeight: 700, fontSize: '2rem', marginBottom: '1.5rem', textAlign: 'center' }}>Create Your Cover Letter</h1>
          <form className="resume-form" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', padding: '2rem', maxWidth: 800, margin: 'auto' }}>
              <h2>Personal Information</h2>
              <label className="field-label">Your full name</label>
              <input name="name" type="text" value={form.name} onChange={handleChange} required />
              <label className="field-label">Your email address</label>
              <input name="email" type="email" value={form.email} onChange={handleChange} required />
              <label className="field-label">Your phone number</label>
              <input name="phone" type="tel" value={form.phone} onChange={handleChange} required />

              <h2>Letter Details</h2>
              <label className="field-label">Recipient name</label>
              <input name="recipient" type="text" value={form.recipient} onChange={handleChange} />
              <label className="field-label">Company name</label>
              <input name="company" type="text" value={form.company} onChange={handleChange} />
              <label className="field-label">Job title</label>
              <input name="jobTitle" type="text" value={form.jobTitle} onChange={handleChange} />
              <label className="field-label">Letter body</label>
              <textarea name="letterBody" value={form.letterBody} onChange={handleChange} rows={10} required />

              <div className="button-row" style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
                <button type="submit" className="submit-btn">Save Letter</button>
                <button type="button" className="download-btn" onClick={handleDownload}>Download as PDF</button>
              </div>
              {saved && <div style={{ color: '#28a745', fontWeight: 600 }}>Cover letter saved! (Not yet persistent)</div>}
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
} 