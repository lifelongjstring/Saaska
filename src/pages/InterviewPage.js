import React, { useState, useEffect } from "react";
import AsyncSelect from "react-select/async";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import "../styles/interview.css";
import "../App.css";
import { FaRobot } from 'react-icons/fa';
import { useUserActivity } from "../contexts/UserActivityContext";
import ActivityTracker from "../components/ActivityTracker";

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

  useEffect(() => {
    trackPageVisit('Interview Practice');
  }, [trackPageVisit]);

  /**
   * Simulated API fetch for companies.
   * @param {string} inputValue - The input value to filter companies.
   * @param {function} callback - The callback to return filtered companies.
   * @returns {void}
   * @precondition inputValue is a string, callback is a function.
   */
  const loadCompanyOptions = (inputValue, callback) => {
    setTimeout(() => {
      const allCompanies = [
        { value: "google", label: "Google" },
        { value: "microsoft", label: "Microsoft" },
        { value: "amazon", label: "Amazon" },
        { value: "apple", label: "Apple" },
        { value: "facebook", label: "Facebook" },
        { value: "netflix", label: "Netflix" },
      ];
      const filtered = allCompanies.filter(company =>
        company.label.toLowerCase().includes(inputValue.toLowerCase())
      );
      callback(filtered);
    }, 800);
  };

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
    <div className="resume-page-wrapper min-h-screen flex flex-col bg-gradient-to-b from-[#003049] via-[#0077b6] to-[#00b4d8]">
      <ActivityTracker feature="interview_practice" pageName="Interview Practice" />
      <Sidebar />

      <main className="main-content" style={{ display: 'block', width: '100%', margin: 0, padding: 0 }}>
        <div className="dashboard-gradient-box" style={{ width: '100%', maxWidth: '1440px', margin: '24px auto 16px auto' }}>
          <h1 className="section-title">
            Practicing Interviews – <span className="highlight">Questions</span>
          </h1>

          <div className="filters-row">
            <div className="filter-group">
              <label>Job Title</label>
              <input
                type="text"
                value={jobTitle}
                onChange={e => setJobTitle(e.target.value)}
                placeholder="e.g. Software Engineer"
              />
            </div>
            <div className="filter-group">
              <label>Industry</label>
              <AsyncSelect
                classNamePrefix="custom-select"
                cacheOptions
                defaultOptions={[
                  { value: "technology", label: "Technology" },
                  { value: "finance", label: "Finance" },
                  { value: "healthcare", label: "Healthcare" },
                  { value: "education", label: "Education" },
                ]}
                loadOptions={(inputValue, callback) => {
                  const filtered = [
                    { value: "technology", label: "Technology" },
                    { value: "finance", label: "Finance" },
                    { value: "healthcare", label: "Healthcare" },
                    { value: "education", label: "Education" },
                  ].filter(opt =>
                    opt.label.toLowerCase().includes(inputValue.toLowerCase())
                  );
                  callback(filtered);
                }}
                onChange={opt => setIndustry(opt?.label || "")}
                placeholder="Select Industry"
                styles={{ container: base => ({ ...base, width: '100%' }) }}
              />
            </div>
            <div className="filter-group">
              <label>Company</label>
              <AsyncSelect
                classNamePrefix="custom-select"
                cacheOptions
                loadOptions={loadCompanyOptions}
                defaultOptions
                onChange={opt => setCompany(opt?.label || "")}
                placeholder="Select Company"
                styles={{ container: base => ({ ...base, width: '100%' }) }}
              />
            </div>
          </div>

          <div className="actions" style={{ marginBottom: 24 }}>
            <button className="btn secondary" type="button" onClick={() => window.history.back()}>
              Back to Interview Hub
            </button>
            <button
              className="btn primary"
              type="button"
              onClick={handleAIGenerate}
              disabled={aiLoading}
              style={{ display: 'flex', alignItems: 'center', gap: 8 }}
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

      <Footer />
    </div>
  );
}
