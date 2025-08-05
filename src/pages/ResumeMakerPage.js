import React, { useState, useEffect, useRef } from "react";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import "../styles/resume.css";
import "../styles/resumeMaker.css";
import "../App.css";
import { FaRobot } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useUserActivity } from "../contexts/UserActivityContext";
import ActivityTracker from "../components/ActivityTracker";
import PersonalInfoForm from "../components/PersonalInfoForm";
import WorkExperienceForm from "../components/WorkExperienceForm";
import EducationForm from "../components/EducationForm";
import SkillsForm from "../components/SkillsForm";
import MobileDrawer from "../components/MobileDrawer";

/**
 * ResumeMakerPage component allows users to create a new resume with a modern, glassy form.
 * Closely matches the provided HTML structure and style.
 * @returns {JSX.Element} The rendered resume maker page.
 * @precondition Should be used within a React Router context.
 */
export default function ResumeMakerPage() {
  // Mobile drawer state
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Detect mobile
  const isMobile =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(max-width: 600px)").matches;

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
    skills: "",
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
    trackPageVisit("Resume Maker");
  }, [trackPageVisit]);

  useEffect(() => {
    const sectionRefs = [
      { key: "personal", ref: personalRef },
      { key: "work", ref: workRef },
      { key: "education", ref: educationRef },
      { key: "skills", ref: skillsRef },
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
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
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
      title: form.name ? `${form.name}'s Resume` : "Untitled Resume",
      template: "Custom",
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
        setAiError(
          "Please fill in your name, job title, and skills before generating.",
        );
        setAiLoading(false);
        return;
      }
      await new Promise((r) => setTimeout(r, 1800));
      // Mock AI response
      const aiResume = {
        ...form,
        summary: `Experienced ${jobTitle} with a passion for innovation and a proven track record at ${company || "top companies"}. Skilled in ${skills}. Based in ${location || "your area"}.`,
        workDesc: `- Led successful projects as a ${jobTitle} at ${company || "your company"}\n- Collaborated with cross-functional teams\n- Achieved measurable results in key performance areas`,
        eduDesc: `Graduated with honors. Relevant coursework and extracurriculars in your field.`,
      };
      // Save to localStorage for fallback
      localStorage.setItem("aiResumePreview", JSON.stringify(aiResume));
      // Track AI resume creation
      trackResumeCreated({
        title: `${aiResume.name}'s AI Resume`,
        template: "AI Generated",
      });
      // Navigate to preview page with state
      navigate("/resume-preview", { state: { resume: aiResume } });
    } catch (err) {
      setAiError("AI generation failed. Please try again later.");
    } finally {
      setAiLoading(false);
    }
  };

  /**
   * Handle previous step navigation
   */
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  /**
   * Handle next step navigation
   */
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  /**
   * Handle save resume action
   */
  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    trackResumeCreated({
      title: `${form.name}'s Resume`,
      template: "Custom",
    });
    setTimeout(() => setSaved(false), 3000);
  };

  // Now define steps after all functions are declared
  const steps = [
    {
      key: "personal",
      label: "Personal details",
      icon: "👤",
      component: <PersonalInfoForm form={form} handleChange={handleChange} />,
    },
    {
      key: "work",
      label: "Employment history",
      icon: "💼",
      component: <WorkExperienceForm form={form} handleChange={handleChange} />,
    },
    {
      key: "education",
      label: "Education",
      icon: "🎓",
      component: <EducationForm form={form} handleChange={handleChange} />,
    },
    {
      key: "skills",
      label: "Skills",
      icon: "✨",
      component: <SkillsForm form={form} handleChange={handleChange} />,
    },
  ];
  const activeSection = steps[currentStep].key;

  return (
    <div className="resume-maker-wrapper">
      {/* Hamburger for mobile */}
      {isMobile && (
        <button
          className="hamburger-btn"
          aria-label={drawerOpen ? "Close sidebar menu" : "Open sidebar menu"}
          aria-expanded={drawerOpen}
          onClick={() => setDrawerOpen(!drawerOpen)}
          style={{
            position: "fixed",
            top: 12,
            left: 12,
            zIndex: 2003,
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
          <span style={{ display: "inline-block", width: 28, height: 28 }}>
            {drawerOpen ? (
              <svg
                viewBox="0 0 24 24"
                width="28"
                height="28"
                fill="currentColor"
              >
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
              </svg>
            ) : (
              <svg viewBox="0 0 100 80" width="28" height="28">
                <rect width="100" height="12" rx="6" fill="currentColor" />
                <rect
                  y="30"
                  width="100"
                  height="12"
                  rx="6"
                  fill="currentColor"
                />
                <rect
                  y="60"
                  width="100"
                  height="12"
                  rx="6"
                  fill="currentColor"
                />
              </svg>
            )}
          </span>
        </button>
      )}
      <ActivityTracker feature="resume_maker" pageName="Resume Maker" />
      {isMobile ? (
        <MobileDrawer
          isOpen={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        />
      ) : (
        <Sidebar />
      )}
      <main className="resume-maker-content">
        {/* Mobile: Ultra-clean streamlined experience */}
        {isMobile ? (
          <div className="ultra-clean-mobile-dashboard">
            {/* Greeting Section */}
            <div className="mobile-greeting-card">
              <div className="greeting-content">
                <h2 className="greeting-title">Create Your Resume</h2>
                <p className="greeting-subtitle">
                  Build a professional resume that stands out
                </p>
              </div>
            </div>

            {/* Stats Cards - Resume Building Progress */}
            <div className="clean-stats-section">
              <div className="clean-stats-row">
                <div className="clean-stat-item">
                  <div className="clean-stat-number">{currentStep + 1}</div>
                  <div className="clean-stat-label">Current Step</div>
                </div>
                <div className="clean-stat-item">
                  <div className="clean-stat-number">{steps.length}</div>
                  <div className="clean-stat-label">Total Steps</div>
                </div>
              </div>
              <div className="clean-stats-row">
                <div className="clean-stat-item">
                  <div className="clean-stat-number">
                    {Math.round(((currentStep + 1) / steps.length) * 100)}%
                  </div>
                  <div className="clean-stat-label">Complete</div>
                </div>
                <div className="clean-stat-item">
                  <div className="clean-stat-number">{saved ? "1" : "0"}</div>
                  <div className="clean-stat-label">Saved</div>
                </div>
              </div>
            </div>

            {/* Primary Actions - Current Step */}
            <div className="clean-actions-section">
              <div className="clean-action-card primary-action">
                <div className="action-icon">{steps[currentStep].icon}</div>
                <div className="action-content">
                  <div className="action-title">
                    Step {currentStep + 1}: {steps[currentStep].label}
                  </div>
                  <div className="action-subtitle">
                    {currentStep === 0 && "Add your personal information"}
                    {currentStep === 1 &&
                      "Describe your professional experience"}
                    {currentStep === 2 && "List your education background"}
                    {currentStep === 3 && "Highlight your key skills"}
                  </div>
                </div>
              </div>

              <div className="clean-action-card secondary-action">
                <div className="action-icon">👁️</div>
                <div className="action-content">
                  <div className="action-title">Preview Resume</div>
                  <div className="action-subtitle">
                    See how your resume looks
                  </div>
                </div>
              </div>
            </div>

            {/* Current Step Form - Mobile Optimized */}
            <div
              style={{
                background: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(10px)",
                borderRadius: "16px",
                padding: "24px",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.08)",
                marginBottom: "20px",
              }}
            >
              {steps[currentStep].component}
            </div>

            {/* Navigation Buttons */}
            <div
              style={{
                display: "flex",
                gap: "12px",
                marginBottom: "20px",
              }}
            >
              {currentStep > 0 && (
                <button
                  onClick={handlePrevious}
                  style={{
                    flex: 1,
                    padding: "12px 16px",
                    background: "#f1f5f9",
                    color: "#475569",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                    fontSize: "1rem",
                    cursor: "pointer",
                  }}
                >
                  ⬅️ Previous
                </button>
              )}
              {currentStep < steps.length - 1 ? (
                <button
                  onClick={handleNext}
                  style={{
                    flex: 1,
                    padding: "12px 16px",
                    background:
                      "linear-gradient(135deg, #0077b6 0%, #003049 100%)",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    fontSize: "1rem",
                    cursor: "pointer",
                  }}
                >
                  Next ➡️
                </button>
              ) : (
                <button
                  onClick={handleSave}
                  style={{
                    flex: 1,
                    padding: "12px 16px",
                    background:
                      "linear-gradient(135deg, #28a745 0%, #20c997 100%)",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    fontSize: "1rem",
                    cursor: "pointer",
                  }}
                >
                  💾 Save Resume
                </button>
              )}
            </div>

            {/* Error/Success Messages */}
            {(aiError || saved) && (
              <div
                className="clean-tip-card"
                style={{
                  background: saved
                    ? "rgba(34, 197, 94, 0.1)"
                    : "rgba(248, 113, 113, 0.1)",
                  border: saved
                    ? "1px solid rgba(34, 197, 94, 0.3)"
                    : "1px solid rgba(248, 113, 113, 0.3)",
                }}
              >
                <div className="tip-header">
                  <span className="tip-icon">{saved ? "✅" : "⚠️"}</span>
                  <span className="tip-title">
                    {saved ? "Success" : "Error"}
                  </span>
                </div>
                <p className="tip-text">
                  {saved ? "Resume saved successfully!" : aiError}
                </p>
              </div>
            )}

            {/* Secondary Actions - Quick Links */}
            <div className="clean-secondary-actions">
              <div className="secondary-action-btn">
                <span className="secondary-icon">📄</span>
                <span className="secondary-text">Templates</span>
              </div>
              <div className="secondary-action-btn">
                <span className="secondary-icon">📤</span>
                <span className="secondary-text">Export</span>
              </div>
              <div className="secondary-action-btn">
                <span className="secondary-icon">💡</span>
                <span className="secondary-text">AI Help</span>
              </div>
            </div>

            {/* Today's Tip */}
            <div className="clean-tip-card">
              <div className="tip-header">
                <span className="tip-icon">💡</span>
                <span className="tip-title">Resume Tip</span>
              </div>
              <p className="tip-text">
                {currentStep === 0 &&
                  "Use a professional email address and include your LinkedIn profile."}
                {currentStep === 1 &&
                  "Focus on achievements and quantify your results with numbers when possible."}
                {currentStep === 2 &&
                  "List your most recent education first and include relevant coursework."}
                {currentStep === 3 &&
                  "Include both technical and soft skills relevant to your target job."}
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Decorative SVG background flourish */}
            <svg
              width="480"
              height="320"
              viewBox="0 0 480 320"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                position: "absolute",
                top: -60,
                left: -80,
                zIndex: 0,
                opacity: 0.18,
              }}
            >
              <ellipse cx="240" cy="160" rx="220" ry="120" fill="#b4e0ff" />
              <ellipse cx="340" cy="100" rx="90" ry="60" fill="#ffe5b4" />
            </svg>
            <h1
              style={{
                color: "black",
                fontWeight: 700,
                fontSize: "2rem",
                marginBottom: "1.5rem",
                textAlign: "center",
                position: "relative",
                zIndex: 1,
              }}
            >
              Create Your Resume
            </h1>
            {/* Move error/success messages below h2 and above the form */}
            <div
              style={{
                textAlign: "center",
                marginBottom: "1.5rem",
                minHeight: 24,
              }}
            >
              {aiError && (
                <div style={{ color: "#d90429", fontWeight: 500 }}>
                  {aiError}
                </div>
              )}
              {saved && (
                <div style={{ color: "#28a745", fontWeight: 600 }}>
                  Resume saved! (Not yet persistent)
                </div>
              )}
            </div>
            {/* Progress Stepper */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
                minHeight: "80vh",
                gap: 40,
              }}
            >
              {/* Vertical Stepper Sidebar */}
              <aside
                style={{
                  minWidth: 220,
                  maxWidth: 240,
                  background: "none",
                  padding: "32px 0 32px 0",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                }}
              >
                <nav style={{ width: "100%" }}>
                  {steps.map((step, idx) => (
                    <div
                      key={step.key}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: 12,
                        position: "relative",
                        opacity: idx > currentStep ? 0.5 : 1,
                      }}
                    >
                      <span style={{ fontSize: 22, marginRight: 14 }}>
                        {step.icon}
                      </span>
                      <span
                        style={{
                          fontWeight: activeSection === step.key ? 700 : 400,
                          color:
                            activeSection === step.key ? "#0077b6" : "#333",
                          fontSize: 15,
                        }}
                      >
                        {step.label}
                      </span>
                      {idx < steps.length - 1 && (
                        <span
                          style={{
                            position: "absolute",
                            left: 10,
                            top: 32,
                            width: 2,
                            height: 24,
                            background: "#e0e7ef",
                            borderRadius: 1,
                          }}
                        />
                      )}
                      {activeSection === step.key && (
                        <span
                          style={{
                            position: "absolute",
                            left: 0,
                            top: 6,
                            width: 8,
                            height: 8,
                            borderRadius: "50%",
                            background: "#0077b6",
                            boxShadow: "0 0 0 2px #b4e0ff",
                          }}
                        />
                      )}
                    </div>
                  ))}
                </nav>
              </aside>
              {/* Main Card Content */}
              <div
                style={{
                  flex: 1,
                  maxWidth: 800,
                  background: "#fff",
                  borderRadius: 20,
                  boxShadow: "0 4px 32px rgba(70,196,224,0.10)",
                  padding: "48px 48px 40px 48px",
                  margin: "0 auto",
                  position: "relative",
                  zIndex: 1,
                  color: "#000",
                }}
              >
                <form
                  className="resume-form"
                  onSubmit={handleSubmit}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "2.5rem",
                    padding: 0,
                    maxWidth: "100%",
                    margin: 0,
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  {steps[currentStep].component}
                  <div
                    className="button-row"
                    style={{
                      marginTop: "2rem",
                      display: "flex",
                      gap: "1rem",
                      justifyContent: "flex-end",
                    }}
                  >
                    {currentStep > 0 && (
                      <button
                        type="button"
                        className="download-btn"
                        onClick={() => setCurrentStep(currentStep - 1)}
                        style={{ background: "#f3f4f6", color: "#003049" }}
                      >
                        Back
                      </button>
                    )}
                    {currentStep < steps.length - 1 ? (
                      <button
                        type="button"
                        className="submit-btn"
                        onClick={() => setCurrentStep(currentStep + 1)}
                        style={{ background: "#2563eb", color: "#fff" }}
                      >
                        Next
                      </button>
                    ) : (
                      <button type="submit" className="submit-btn">
                        Save Resume
                      </button>
                    )}
                  </div>
                  <button
                    type="button"
                    className="download-btn"
                    style={{
                      margin: "1.5rem auto 0 auto",
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      fontWeight: 700,
                      fontSize: "1.1rem",
                      background: "#46c4e0",
                      color: "#003049",
                      border: "none",
                      borderRadius: 8,
                      padding: "12px 28px",
                      boxShadow: "0 2px 8px rgba(70,196,224,0.12)",
                      cursor: aiLoading ? "not-allowed" : "pointer",
                      opacity: aiLoading ? 0.7 : 1,
                    }}
                    onClick={handleAIGenerate}
                    disabled={aiLoading}
                    title="Generate resume content with AI"
                  >
                    <FaRobot style={{ fontSize: 22 }} />
                    {aiLoading ? "Generating..." : "Generate Resume with AI"}
                  </button>
                </form>
              </div>
            </div>
          </>
        )}
      </main>
      {!isMobile && <Footer />}
    </div>
  );
}
