import React, { useState, useEffect, useRef } from "react";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import "../styles/resume.css";
import "../styles/coverLetterMaker.css";
import "../App.css";
import { useUserActivity } from "../contexts/UserActivityContext";
import ActivityTracker from "../components/ActivityTracker";
import CLPersonalInfoForm from '../components/CLPersonalInfoForm';
import CLLetterDetailsForm from '../components/CLLetterDetailsForm';
import CLLetterBodyForm from '../components/CLLetterBodyForm';

/**
 * CoverLetterMakerPage component allows users to create a new cover letter with a modern, glassy form.
 * @returns {JSX.Element} The rendered cover letter maker page.
 * @precondition Should be used within a React Router context.
 */
export default function CoverLetterMakerPage() {
  const [form, setForm] = useState({
    name: "",
    lastName: "",
    email: "",
    phone: "",
    recipient: "",
    company: "",
    jobTitle: "",
    letterBody: ""
  });
  const [saved, setSaved] = useState(false);
  const { trackPageVisit, trackCoverLetterGenerated } = useUserActivity();
  const [currentStep, setCurrentStep] = useState(0);
  const personalRef = useRef();
  const detailsRef = useRef();
  const bodyRef = useRef();

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

  // Now define steps after all functions are declared
  const steps = [
    { key: 'personal', label: 'Personal details', icon: '👤', component: <CLPersonalInfoForm form={form} handleChange={handleChange} /> },
    { key: 'details', label: 'Letter details', icon: '✉️', component: <CLLetterDetailsForm form={form} handleChange={handleChange} /> },
    { key: 'body', label: 'Letter body', icon: '✍️', component: <CLLetterBodyForm form={form} handleChange={handleChange} /> },
  ];
  const activeSection = steps[currentStep].key;

  return (
    <div className="cover-letter-maker-wrapper">
      <ActivityTracker feature="cover_letter_maker" pageName="Cover Letter Maker" />
      <Sidebar />
      <main className="cover-letter-maker-content" style={{ color: '#000', background: 'linear-gradient(135deg, #ffe5b4 0%, #b4e0ff 100%)', minHeight: '100vh', borderRadius: '24px', position: 'relative', overflow: 'hidden' }}>
        {/* Decorative SVG background flourish */}
        <svg width="480" height="320" viewBox="0 0 480 320" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', top: -60, left: -80, zIndex: 0, opacity: 0.18 }}>
          <ellipse cx="240" cy="160" rx="220" ry="120" fill="#b4e0ff" />
          <ellipse cx="340" cy="100" rx="90" ry="60" fill="#ffe5b4" />
        </svg>
        <h1 style={{ color: 'black', fontWeight: 700, fontSize: '2rem', marginBottom: '1.5rem', textAlign: 'center', position: 'relative', zIndex: 1 }}>Create Your Cover Letter</h1>
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
          <div style={{ flex: 1, maxWidth: 800, background: '#fff', borderRadius: 20, boxShadow: '0 4px 32px rgba(70,196,224,0.10)', padding: '48px 48px 40px 48px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <form className="resume-form" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', padding: 0, maxWidth: '100%', margin: 0, position: 'relative', zIndex: 1 }}>
              {steps[currentStep].component}
              <div className="button-row" style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                {currentStep > 0 && (
                  <button type="button" className="download-btn" onClick={() => setCurrentStep(currentStep - 1)} style={{ background: '#f3f4f6', color: '#003049' }}>Back</button>
                )}
                {currentStep < steps.length - 1 ? (
                  <button type="button" className="submit-btn" onClick={() => setCurrentStep(currentStep + 1)} style={{ background: '#2563eb', color: '#fff' }}>Next</button>
                ) : (
                  <button type="submit" className="submit-btn">Save Letter</button>
                )}
              </div>
              {saved && <div style={{ color: '#28a745', fontWeight: 600 }}>Cover letter saved! (Not yet persistent)</div>}
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 