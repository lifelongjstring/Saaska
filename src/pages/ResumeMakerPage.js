import React, { useState, useEffect, useRef } from "react";
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
    lastName: "",
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
  const [currentStep, setCurrentStep] = useState(0);
  const personalRef = useRef();
  const workRef = useRef();
  const educationRef = useRef();
  const skillsRef = useRef();

  useEffect(() => {
    trackPageVisit('Resume Maker');
  }, [trackPageVisit]);

  useEffect(() => {
    const sectionRefs = [
      { key: 'personal', ref: personalRef },
      { key: 'work', ref: workRef },
      { key: 'education', ref: educationRef },
      { key: 'skills', ref: skillsRef },
    ];
    const handleScroll = () => {
      const offsets = sectionRefs.map(({ key, ref }) => {
        if (!ref.current) return { key, top: Infinity };
        const rect = ref.current.getBoundingClientRect();
        return { key, top: Math.abs(rect.top - 120) }; // 120px offset for header/stepper
      });
      offsets.sort((a, b) => a.top - b.top);
      // This logic is no longer needed as we are showing one section at a time
      // setActiveSection(offsets[0].key);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  // Now define steps after all functions are declared
  const steps = [
    { key: 'personal', label: 'Personal details', icon: '👤', component: <PersonalInfoForm form={form} handleChange={handleChange} /> },
    { key: 'work', label: 'Employment history', icon: '💼', component: <WorkExperienceForm form={form} handleChange={handleChange} /> },
    { key: 'education', label: 'Education', icon: '🎓', component: <EducationForm form={form} handleChange={handleChange} /> },
    { key: 'skills', label: 'Skills', icon: '✨', component: <SkillsForm form={form} handleChange={handleChange} /> },
  ];
  const activeSection = steps[currentStep].key;

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
          {/* Move error/success messages below h2 and above the form */}
          <div style={{ textAlign: 'center', marginBottom: '1.5rem', minHeight: 24 }}>
            {aiError && <div style={{ color: '#d90429', fontWeight: 500 }}>{aiError}</div>}
            {saved && <div style={{ color: '#28a745', fontWeight: 600 }}>Resume saved! (Not yet persistent)</div>}
          </div>
          {/* Progress Stepper */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', minHeight: '80vh', gap: 40 }}>
            {/* Vertical Stepper Sidebar */}
            <aside style={{ minWidth: 220, maxWidth: 240, background: 'none', padding: '32px 0 32px 0', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
              <nav style={{ width: '100%' }}>
                {steps.map((step, idx) => (
                  <div key={step.key} style={{ display: 'flex', alignItems: 'center', marginBottom: 12, position: 'relative', opacity: idx > currentStep ? 0.5 : 1 }}>
                    <span style={{ fontSize: 22, marginRight: 14 }}>{step.icon}</span>
                    <span style={{ fontWeight: activeSection === step.key ? 700 : 400, color: activeSection === step.key ? '#0077b6' : '#333', fontSize: 15 }}>{step.label}</span>
                    {idx < steps.length - 1 && (
                      <span style={{ position: 'absolute', left: 10, top: 32, width: 2, height: 24, background: '#e0e7ef', borderRadius: 1 }} />
                    )}
                    {activeSection === step.key && (
                      <span style={{ position: 'absolute', left: 0, top: 6, width: 8, height: 8, borderRadius: '50%', background: '#0077b6', boxShadow: '0 0 0 2px #b4e0ff' }} />
                    )}
                  </div>
                ))}
              </nav>
            </aside>
            {/* Main Card Content */}
            <div style={{ flex: 1, maxWidth: 800, background: '#fff', borderRadius: 20, boxShadow: '0 4px 32px rgba(70,196,224,0.10)', padding: '48px 48px 40px 48px', margin: '0 auto', position: 'relative', zIndex: 1, color: '#000' }}>
              <form className="resume-form" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', padding: 0, maxWidth: '100%', margin: 0, position: 'relative', zIndex: 1 }}>
                {steps[currentStep].component}
                <div className="button-row" style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                  {currentStep > 0 && (
                    <button type="button" className="download-btn" onClick={() => setCurrentStep(currentStep - 1)} style={{ background: '#f3f4f6', color: '#003049' }}>Back</button>
                  )}
                  {currentStep < steps.length - 1 ? (
                    <button type="button" className="submit-btn" onClick={() => setCurrentStep(currentStep + 1)} style={{ background: '#2563eb', color: '#fff' }}>Next</button>
                  ) : (
                    <button type="submit" className="submit-btn">Save Resume</button>
                  )}
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
              </form>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
} 