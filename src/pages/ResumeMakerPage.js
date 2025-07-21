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
import PersonalInfoForm from '../components/PersonalInfoForm';
import WorkExperienceForm from '../components/WorkExperienceForm';
import EducationForm from '../components/EducationForm';
import SkillsForm from '../components/SkillsForm';

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
        <main className="resume-maker-content" style={{ color: '#000', background: 'linear-gradient(135deg, #ffe5b4 0%, #b4e0ff 100%)', minHeight: '100vh', borderRadius: '24px', position: 'relative', overflow: 'hidden' }}>
          {/* Decorative SVG background flourish */}
          <svg width="480" height="320" viewBox="0 0 480 320" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', top: -60, left: -80, zIndex: 0, opacity: 0.18 }}>
            <ellipse cx="240" cy="160" rx="220" ry="120" fill="#b4e0ff" />
            <ellipse cx="340" cy="100" rx="90" ry="60" fill="#ffe5b4" />
          </svg>
          <h1 style={{ color: 'black', fontWeight: 700, fontSize: '2rem', marginBottom: '1.5rem', textAlign: 'center', position: 'relative', zIndex: 1 }}>Create Your Resume</h1>
          {/* Progress Stepper */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 32, marginBottom: 32 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span style={{ fontSize: 28, background: '#ffe5b4', borderRadius: '50%', width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 4 }}>👤</span>
              <span style={{ fontSize: 13, color: '#333' }}>Personal</span>
            </div>
            <div style={{ width: 40, height: 4, background: 'linear-gradient(90deg, #ffe5b4 0%, #b4e0ff 100%)', borderRadius: 2 }} />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span style={{ fontSize: 28, background: '#ffe5b4', borderRadius: '50%', width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 4 }}>💼</span>
              <span style={{ fontSize: 13, color: '#333' }}>Work</span>
            </div>
            <div style={{ width: 40, height: 4, background: 'linear-gradient(90deg, #ffe5b4 0%, #b4e0ff 100%)', borderRadius: 2 }} />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span style={{ fontSize: 28, background: '#ffe5b4', borderRadius: '50%', width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 4 }}>🎓</span>
              <span style={{ fontSize: 13, color: '#333' }}>Education</span>
            </div>
            <div style={{ width: 40, height: 4, background: 'linear-gradient(90deg, #ffe5b4 0%, #b4e0ff 100%)', borderRadius: 2 }} />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span style={{ fontSize: 28, background: '#ffe5b4', borderRadius: '50%', width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 4 }}>✨</span>
              <span style={{ fontSize: 13, color: '#333' }}>Skills</span>
            </div>
          </div>
          <form className="resume-form" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', padding: '2rem', maxWidth: 800, margin: 'auto', position: 'relative', zIndex: 1 }}>
            <PersonalInfoForm form={form} handleChange={handleChange} />
            <div style={{ height: 2, background: 'linear-gradient(90deg, #ffe5b4 0%, #b4e0ff 100%)', borderRadius: 2, margin: '1.5rem 0' }} />
            <WorkExperienceForm form={form} handleChange={handleChange} />
            <div style={{ height: 2, background: 'linear-gradient(90deg, #ffe5b4 0%, #b4e0ff 100%)', borderRadius: 2, margin: '1.5rem 0' }} />
            <EducationForm form={form} handleChange={handleChange} />
            <div style={{ height: 2, background: 'linear-gradient(90deg, #ffe5b4 0%, #b4e0ff 100%)', borderRadius: 2, margin: '1.5rem 0' }} />
            <SkillsForm form={form} handleChange={handleChange} />
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
        </main>
      </div>
      <Footer />
    </>
  );
} 