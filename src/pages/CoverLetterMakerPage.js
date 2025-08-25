import React, { useState, useEffect, useRef } from "react";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import "../styles/resume.css";
import "../styles/coverLetterMaker.css";
import "../App.css";
import { useUserActivity } from "../contexts/UserActivityContext";
import ActivityTracker from "../components/ActivityTracker";
import CLPersonalInfoForm from "../components/CLPersonalInfoForm";
import CLLetterDetailsForm from "../components/CLLetterDetailsForm";
import CLLetterBodyForm from "../components/CLLetterBodyForm";
import MobileDrawer from "../components/MobileDrawer";

/**
 * CoverLetterMakerPage component allows users to create a new cover letter with a modern, glassy form.
 * @returns {JSX.Element} The rendered cover letter maker page.
 * @precondition Should be used within a React Router context.
 */
/**
 * CoverLetterMakerPage component for creating and managing cover letters.
 * 
 * @component
 * @returns {JSX.Element} The Cover Letter Maker Page UI.
 * @precondition The application must be running in a React environment.
 *               The `useUserActivity` hook must be available and provide
 *               `trackPageVisit` and `trackCoverLetterGenerated` functions.
 */
export default function CoverLetterMakerPage() {
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
    recipient: "",
    company: "",
    jobTitle: "",
    letterBody: "",
  });
  const [saved, setSaved] = useState(false);
  const { trackPageVisit, trackCoverLetterGenerated } = useUserActivity();
  const [currentStep, setCurrentStep] = useState(0);
  const personalRef = useRef();
  const detailsRef = useRef();
  const bodyRef = useRef();

  useEffect(() => {
    trackPageVisit("Cover Letter Maker");
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
      company: form.company || "Unknown Company",
      position: form.jobTitle || "Unknown Position",
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

  const steps = [
    {
      key: "personal",
      label: "Personal details",
      icon: "👤",
      component: <CLPersonalInfoForm form={form} handleChange={handleChange} />,
    },
    {
      key: "details",
      label: "Letter details",
      icon: "✉️",
      component: (
        <CLLetterDetailsForm form={form} handleChange={handleChange} />
      ),
    },
    {
      key: "body",
      label: "Letter body",
      icon: "✍️",
      component: <CLLetterBodyForm form={form} handleChange={handleChange} />,
    },
  ];
  const activeSection = steps[currentStep].key;

  return (
    <div className="cover-letter-maker-wrapper">
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
            color: "#black",
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

      <ActivityTracker
        feature="cover_letter_maker"
        pageName="Cover Letter Maker"
      />

      {isMobile ? (
        <MobileDrawer
          isOpen={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        />
      ) : (
        <Sidebar />
      )}
      <main className="cover-letter-maker-content">
        {isMobile ? (
          <div className="ultra-clean-mobile-dashboard">
            {/* Greeting Section */}
            <div className="mobile-greeting-card">
              <div className="greeting-content">
                <h2 className="greeting-title">Create Your Cover Letter</h2>
                <p className="greeting-subtitle">
                  Write a compelling cover letter that gets noticed
                </p>
              </div>
            </div>

            {/* Stats Cards - Cover Letter Building Progress */}
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
                    {currentStep === 1 && "Enter company and job details"}
                    {currentStep === 2 && "Write your compelling message"}
                  </div>
                </div>
              </div>

              <div className="clean-action-card secondary-action">
                <div className="action-icon">👁️</div>
                <div className="action-content">
                  <div className="action-title">Preview Letter</div>
                  <div className="action-subtitle">
                    See how your letter looks
                  </div>
                </div>
              </div>
            </div>

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
                  onClick={() => setCurrentStep(currentStep - 1)}
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
                  onClick={() => setCurrentStep(currentStep + 1)}
                  style={{
                    flex: 1,
                    padding: "12px 16px",
                    background:
                      "linear-gradient(135deg, #ff7b25 0%, #ff914d 100%)",
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
                  onClick={handleSubmit}
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
                  💾 Save Letter
                </button>
              )}
            </div>

            {/* Success Messages */}
            {saved && (
              <div
                className="clean-tip-card"
                style={{
                  background: "rgba(34, 197, 94, 0.1)",
                  border: "1px solid rgba(34, 197, 94, 0.3)",
                }}
              >
                <div className="tip-header">
                  <span className="tip-icon">✅</span>
                  <span className="tip-title">Success</span>
                </div>
                <p className="tip-text">Cover letter saved successfully!</p>
              </div>
            )}

            {/* Secondary Actions - Quick Links */}
            <div className="clean-secondary-actions">
              <div className="secondary-action-btn">
                <span className="secondary-icon">📝</span>
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
                <span className="tip-title">Cover Letter Tip</span>
              </div>
              <p className="tip-text">
                {currentStep === 0 &&
                  "Use the same contact information as on your resume for consistency."}
                {currentStep === 1 &&
                  "Research the company and mention specific details to show genuine interest."}
                {currentStep === 2 &&
                  "Focus on what you can do for the company, not what they can do for you."}
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
                color: "white",
                fontWeight: 700,
                fontSize: "2rem",
                marginBottom: "1.5rem",
                textAlign: "center",
                position: "relative",
                zIndex: 1,
              }}
            >
              Create Your Cover Letter
            </h1>
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
                          activeSection === step.key ? "white" : "0077b6",
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
                  className="cover-letter-form"
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
                        Save Cover Letter
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </>
        )}
      </main>
      {!isMobile}
    </div>
  );
}
