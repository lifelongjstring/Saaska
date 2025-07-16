import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import "../styles/resume.css";
import "../styles/resumeMaker.css";
import "../App.css";
import { FaRobot } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import { useUserActivity } from "../contexts/UserActivityContext";
import ActivityTracker from "../components/ActivityTracker";

/**
 * ResumeMakerPage component allows users to create a new resume with a modern, glassy form.
 * Closely matches the provided HTML structure and style.
 * @returns {JSX.Element} The rendered resume maker page.
 * @precondition Should be used within a React Router context.
 */
export default function ResumeMakerPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    summary: "",
    jobTitle: "",
    company: "",
    workDesc: "",
    school: "",
    degree: "",
    eduDesc: "",
    skills: ""
  });
  const [saved, setSaved] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState("");
  const navigate = useNavigate();
  const { trackPageVisit, trackResumeCreated } = useUserActivity();

  useEffect(() => {
    trackPageVisit('Resume Maker');
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
   * Handle form submission (save resume).
   * @param {React.FormEvent} e - The form submit event.
   * @returns {void}
   * @precondition Form fields are valid.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    setSaved(true);
    trackResumeCreated({
      title: form.name ? `${form.name}'s Resume` : 'Untitled Resume',
      template: 'Custom'
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

  /**
   * Generate resume content using AI based on user inputs.
   * TODO: Replace mock with real AI API integration (e.g., OpenAI, backend endpoint).
   * @returns {Promise<void>}
   */
  const handleAIGenerate = async () => {
    setAiLoading(true);
    setAiError("");
    try {
      const { name, jobTitle, skills, company, location } = form;
      if (!name || !jobTitle || !skills) {
        setAiError("Please fill in your name, job title, and skills before generating.");
        setAiLoading(false);
        return;
      }
      await new Promise(r => setTimeout(r, 1800));
      // Mock AI response
      const aiResume = {
        ...form,
        summary: `Experienced ${jobTitle} with a passion for innovation and a proven track record at ${company || 'top companies'}. Skilled in ${skills}. Based in ${location || 'your area'}.`,
        workDesc: `- Led successful projects as a ${jobTitle} at ${company || 'your company'}\n- Collaborated with cross-functional teams\n- Achieved measurable results in key performance areas`,
        eduDesc: `Graduated with honors. Relevant coursework and extracurriculars in your field.`
      };
      // Save to localStorage for fallback
      localStorage.setItem("aiResumePreview", JSON.stringify(aiResume));
      // Track AI resume creation
      trackResumeCreated({
        title: `${aiResume.name}'s AI Resume`,
        template: 'AI Generated'
      });
      // Navigate to preview page with state
      navigate("/resume-preview", { state: { resume: aiResume } });
    } catch (err) {
      setAiError("AI generation failed. Please try again later.");
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <>
      <div className="resume-maker-wrapper">
        <ActivityTracker feature="resume_maker" pageName="Resume Maker" />
        <Sidebar />
        <main className="resume-maker-content">
          <div className="resume-maker-gradient-box">
            <h1 style={{ color: 'black', fontWeight: 700, fontSize: '2rem', marginBottom: '1.5rem', textAlign: 'center' }}>Create Your Resume</h1>
            <form className="resume-form" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', padding: '2rem', maxWidth: 800, margin: 'auto' }}>
                <h2>Personal Information</h2>
                <label className="field-label">Your full name</label>
                <input name="name" type="text" value={form.name} onChange={handleChange} required />
                <label className="field-label">Your email address</label>
                <input name="email" type="email" value={form.email} onChange={handleChange} required />
                <label className="field-label">Your phone number</label>
                <input name="phone" type="tel" value={form.phone} onChange={handleChange} required />
                <label className="field-label">City & State</label>
                <input name="location" type="text" value={form.location} onChange={handleChange} required />
                <label className="field-label">A brief professional summary</label>
                <textarea name="summary" value={form.summary} onChange={handleChange} />

                <h2>Work Experience</h2>
                <label className="field-label">Most recent job title</label>
                <input name="jobTitle" type="text" value={form.jobTitle} onChange={handleChange} />
                <label className="field-label">Company name</label>
                <input name="company" type="text" value={form.company} onChange={handleChange} />
                <label className="field-label">What did you do in this role?</label>
                <textarea name="workDesc" value={form.workDesc} onChange={handleChange} />

                <h2>Education</h2>
                <label className="field-label">School or university name</label>
                <input name="school" type="text" value={form.school} onChange={handleChange} />
                <label className="field-label">Degree or qualification</label>
                <input name="degree" type="text" value={form.degree} onChange={handleChange} />
                <label className="field-label">Additional notes (optional)</label>
                <textarea name="eduDesc" value={form.eduDesc} onChange={handleChange} />

                <h2>Skills</h2>
                <label className="field-label">List your key skills (comma separated)</label>
                <input name="skills" type="text" value={form.skills} onChange={handleChange} />

                <div className="button-row" style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
                  <button type="submit" className="submit-btn">Save Resume</button>
                  <button type="button" className="download-btn" onClick={handleDownload}>Download as PDF</button>
                </div>
                <button
                  type="button"
                  className="download-btn"
                  style={{ margin: '1.5rem auto 0 auto', display: 'flex', alignItems: 'center', gap: 8, fontWeight: 700, fontSize: '1.1rem', background: '#46c4e0', color: '#003049', border: 'none', borderRadius: 8, padding: '12px 28px', boxShadow: '0 2px 8px rgba(70,196,224,0.12)', cursor: aiLoading ? 'not-allowed' : 'pointer', opacity: aiLoading ? 0.7 : 1 }}
                  onClick={handleAIGenerate}
                  disabled={aiLoading}
                  title="Generate resume content with AI"
                >
                  <FaRobot style={{ fontSize: 22 }} />
                  {aiLoading ? 'Generating...' : 'Generate Resume with AI'}
                </button>
                {aiError && <div style={{ color: '#d90429', textAlign: 'center', marginBottom: 12 }}>{aiError}</div>}
                {saved && <div style={{ color: '#28a745', fontWeight: 600 }}>Resume saved! (Not yet persistent)</div>}
            </form>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
} 