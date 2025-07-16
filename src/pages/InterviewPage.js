import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import "../styles/interview.css";
import "../App.css";
import { FaRobot } from 'react-icons/fa';
import { useUserActivity } from "../contexts/UserActivityContext";
import ActivityTracker from "../components/ActivityTracker";
import { useSidebar } from "../contexts/SidebarContext";

/**
 * InterviewQuestionsPage component displays the interview practice page with filters.
 * @returns {JSX.Element} The rendered interview questions page.
 * @precondition Should be used within a React Router context.
 */
export default function InterviewQuestionsPage() {
  const [jobTitle, setJobTitle] = useState("");
  const [industry, setIndustry] = useState("");
  const [company, setCompany] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState("");
  const [questions, setQuestions] = useState([]);
  const { trackPageVisit, trackInterviewPracticed } = useUserActivity();
  const { sidebarCollapsed } = useSidebar();

  useEffect(() => {
    trackPageVisit('Interview Practice');
  }, [trackPageVisit]);

  /**
   * Generate realistic interview questions using AI based on user context.
   * TODO: Replace mock with real AI API integration (e.g., OpenAI, backend endpoint).
   * @returns {Promise<void>}
   */
  const handleAIGenerate = async () => {
    setAiLoading(true);
    setAiError("");
    setQuestions([]);
    try {
      if (!jobTitle && !industry && !company) {
        setAiError("Please enter a job title, select an industry, or choose a company.");
        setAiLoading(false);
        return;
      }
      // TODO: Replace this mock with a real API call
      await new Promise(r => setTimeout(r, 1800));
      // Mock AI response
      const context = [jobTitle && `for a ${jobTitle}`, company && `at ${company}`, industry && `in ${industry}`].filter(Boolean).join(' ');
      setQuestions([
        `Tell me about yourself and your background relevant to this role ${context}.`,
        `Why are you interested in working ${company ? 'at ' + company : 'in this field'}?`,
        `Describe a challenging project you worked on ${jobTitle ? 'as a ' + jobTitle : ''}.`,
        `How do you stay current with trends ${industry ? 'in ' + industry : ''}?`,
        `What is your greatest strength and how will it help you succeed ${context}?`,
        `Describe a time you had to solve a difficult problem on the job.`,
        `How do you handle tight deadlines and pressure?`,
        `What questions do you have for us about the ${jobTitle || industry || 'role'}?`
      ]);
      
      // Track interview practice activity
      trackInterviewPracticed({
        industry: industry || 'General',
        position: jobTitle || 'General Role'
      });
    } catch (err) {
      setAiError("AI generation failed. Please try again later.");
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <>
      <div className="resume-page-wrapper">
        <ActivityTracker feature="interview_practice" pageName="Interview Practice" />
        <Sidebar />
        <main className="main-content">
          <div
            className={`dashboard-gradient-box ${sidebarCollapsed ? 'collapsed' : 'expanded'}`}
            style={{
              maxWidth: 1200,
              margin: '24px auto 16px 180px',
              width: '100%',
              transition: 'margin 0.3s cubic-bezier(.4,0,.2,1)',
            }}
          >
            <h1 className="section-title">
              Practicing Interviews – <span className="highlight">Questions</span>
            </h1>

            <form className="filters-row" style={{ display: 'flex', gap: 24, marginBottom: 32 }}>
              <div className="filter-group" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <label style={{ textAlign: 'center', marginBottom: 4 }}>Job Title</label>
                <input
                  type="text"
                  value={jobTitle}
                  onChange={e => setJobTitle(e.target.value)}
                  placeholder="e.g. Software Engineer"
                  style={{ padding: '12px 14px', fontSize: '1rem', width: '180px' }}
                />
              </div>
              <div className="filter-group" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <label style={{ textAlign: 'center', marginBottom: 4 }}>Industry</label>
                <select
                  value={industry}
                  onChange={e => setIndustry(e.target.value)}
                  style={{ padding: '12px 14px', fontSize: '1rem', width: '180px' }}
                >
                  <option value="">Select Industry</option>
                  <option value="Technology">Technology</option>
                  <option value="Finance">Finance</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Education">Education</option>
                </select>
              </div>
              <div className="filter-group" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <label style={{ textAlign: 'center', marginBottom: 4 }}>Company</label>
                <select
                  value={company}
                  onChange={e => setCompany(e.target.value)}
                  style={{ padding: '12px 14px', fontSize: '1rem', width: '180px' }}
                >
                  <option value="">Select Company</option>
                  <option value="Google">Google</option>
                  <option value="Microsoft">Microsoft</option>
                  <option value="Amazon">Amazon</option>
                  <option value="Apple">Apple</option>
                  <option value="Facebook">Facebook</option>
                  <option value="Netflix">Netflix</option>
                </select>
              </div>
            </form>

            <div className="actions" style={{ marginBottom: 24 }}>
              <button
                className="btn secondary"
                type="button"
                onClick={() => window.history.back()}
                style={{
                  fontSize: sidebarCollapsed ? '1.1rem' : '0.95rem',
                  padding: sidebarCollapsed ? '14px 32px' : '12px 32px',
                  transition: 'font-size 0.3s, padding 0.3s'
                }}
              >
                Back to Interview Hub
              </button>
              <button
                className="btn primary"
                type="button"
                onClick={handleAIGenerate}
                disabled={aiLoading}
                style={{
                  fontSize: sidebarCollapsed ? '1.1rem' : '0.95rem',
                  padding: sidebarCollapsed ? '14px 32px' : '12px 32px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  transition: 'font-size 0.3s, padding 0.3s'
                }}
              >
                <FaRobot style={{ fontSize: 20 }} />
                {aiLoading ? 'Generating...' : 'Generate Interview Questions with AI'}
              </button>
            </div>
            {aiError && <div style={{ color: '#d90429', textAlign: 'center', marginBottom: 12 }}>{aiError}</div>}
            {questions.length > 0 && (
              <div style={{ background: 'white', borderRadius: 16, padding: 32, color: '#222', boxShadow: '0 2px 12px rgba(0,0,0,0.08)', margin: '32px 0' }}>
                <h2 style={{ color: '#003049', fontWeight: 700, marginBottom: 16 }}>AI-Generated Interview Questions</h2>
                <ol style={{ paddingLeft: 24, fontSize: '1.1rem', lineHeight: 1.7 }}>
                  {questions.map((q, i) => (
                    <li key={i} style={{ marginBottom: 12 }}>{q}</li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
