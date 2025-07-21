import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import "../styles/interview.css";
import "../App.css";
import { FaRobot } from 'react-icons/fa';
import { useUserActivity } from "../contexts/UserActivityContext";
import ActivityTracker from "../components/ActivityTracker";
import { useSidebar } from "../contexts/SidebarContext";
import Select from 'react-select';

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
  }, []); // Only run once on mount

  const industryOptions = [
    { value: '', label: 'Select Industry' },
    { value: 'Technology', label: 'Technology' },
    { value: 'Finance', label: 'Finance' },
    { value: 'Healthcare', label: 'Healthcare' },
    { value: 'Education', label: 'Education' },
  ];
  const companyOptions = [
    { value: '', label: 'Select Company' },
    { value: 'Google', label: 'Google' },
    { value: 'Microsoft', label: 'Microsoft' },
    { value: 'Amazon', label: 'Amazon' },
    { value: 'Apple', label: 'Apple' },
    { value: 'Facebook', label: 'Facebook' },
    { value: 'Netflix', label: 'Netflix' },
  ];

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

            <div className="flex justify-center items-center min-h-[60vh]">
              <form className="w-full max-w-2xl bg-white/95 rounded-2xl shadow-xl p-8 border border-gray-100">

                <div className="flex flex-col md:flex-row gap-6 mb-8">
                  <div className="flex-1 min-w-0">
                    <label className="block font-semibold mb-2 !text-black" style={{ color: '#000' }}>Job Title</label>
                    <input
                      type="text"
                      value={jobTitle}
                      onChange={e => setJobTitle(e.target.value)}
                      placeholder="e.g. Software Engineer"
                      className="w-full"
                      style={{
                        height: '22px',
                        fontSize: '1.25rem',
                        borderRadius: '0.375rem',
                        border: '1px solid #d1d5db',
                        background: '#fff',
                        color: '#222',
                        padding: '4px 6px',
                        boxSizing: 'border-box',
                        lineHeight: '22px',
                      }}
                    />
                  </div>
                  <div className="flex-1 min-w-0 md:w-1/2 mx-auto">
                    <label className="block font-semibold mb-2 !text-black" style={{ color: '#000' }}>Industry</label>
                    <Select
                      options={industryOptions}
                      value={industryOptions.find(opt => opt.value === industry)}
                      onChange={opt => setIndustry(opt ? opt.value : '')}
                      classNamePrefix="custom-select"
                      className="react-select-container"
                      menuPortalTarget={typeof window !== 'undefined' ? document.body : null}
                      styles={{
                        control: (base, state) => ({
                          ...base,
                          minHeight: '22px',
                          height: '22px',
                          borderRadius: '0.375rem',
                          borderColor: state.isFocused ? '#fb923c' : '#d1d5db',
                          boxShadow: state.isFocused ? '0 0 0 2px #fed7aa' : 'none',
                          backgroundColor: '#fff',
                          fontSize: '0.5rem',
                          paddingLeft: '0px',
                        }),
                        valueContainer: base => ({
                          ...base,
                          padding: '0 4px',
                          height: '22px',
                        }),
                        input: base => ({
                          ...base,
                          color: '#1f2937',
                          fontSize: '0.5rem',
                          margin: 0,
                          padding: 0,
                        }),
                        singleValue: base => ({
                          ...base,
                          color: '#1f2937',
                          fontSize: '0.5rem',
                        }),
                        option: (base, state) => ({
                          ...base,
                          backgroundColor: state.isSelected ? '#fb923c' : state.isFocused ? '#fef3c7' : '#fff',
                          color: state.isSelected ? '#fff' : '#222',
                          fontWeight: state.isSelected ? 600 : 400,
                          fontSize: '1.25rem', // much larger text
                          padding: '4px 6px',
                        }),
                        menu: (base, state) => ({
                          ...base,
                          borderRadius: '0.375rem',
                          boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
                          zIndex: 9999,
                          // width and left reverted to default
                        }),
                        menuPortal: base => ({ ...base, zIndex: 9999 }),
                        placeholder: base => ({
                          ...base,
                          color: '#9ca3af',
                          fontSize: '0.5rem',
                        }),
                      }}
                    />
                  </div>
                  <div className="flex-1 min-w-0 md:w-1/2 mx-auto">
                    <label className="block font-semibold mb-2 !text-black" style={{ color: '#000' }}>Company</label>
                    <Select
                      options={companyOptions}
                      value={companyOptions.find(opt => opt.value === company)}
                      onChange={opt => setCompany(opt ? opt.value : '')}
                      classNamePrefix="custom-select"
                      className="react-select-container"
                      menuPortalTarget={typeof window !== 'undefined' ? document.body : null}
                      styles={{
                        control: (base, state) => ({
                          ...base,
                          minHeight: '22px',
                          height: '22px',
                          borderRadius: '0.375rem',
                          borderColor: state.isFocused ? '#fb923c' : '#d1d5db',
                          boxShadow: state.isFocused ? '0 0 0 2px #fed7aa' : 'none',
                          backgroundColor: '#fff',
                          fontSize: '0.5rem',
                          paddingLeft: '0px',
                        }),
                        valueContainer: base => ({
                          ...base,
                          padding: '0 4px',
                          height: '22px',
                        }),
                        input: base => ({
                          ...base,
                          color: '#1f2937',
                          fontSize: '0.5rem',
                          margin: 0,
                          padding: 0,
                        }),
                        singleValue: base => ({
                          ...base,
                          color: '#1f2937',
                          fontSize: '0.5rem',
                        }),
                        option: (base, state) => ({
                          ...base,
                          backgroundColor: state.isSelected ? '#fb923c' : state.isFocused ? '#fef3c7' : '#fff',
                          color: state.isSelected ? '#fff' : '#222',
                          fontWeight: state.isSelected ? 600 : 400,
                          fontSize: '1.25rem', // much larger text
                          padding: '4px 6px',
                        }),
                        menu: (base, state) => ({
                          ...base,
                          borderRadius: '0.375rem',
                          boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
                          zIndex: 9999,
                          // width and left reverted to default
                        }),
                        menuPortal: base => ({ ...base, zIndex: 9999 }),
                        placeholder: base => ({
                          ...base,
                          color: '#9ca3af',
                          fontSize: '0.5rem',
                        }),
                      }}
                    />
                  </div>
                </div>
                <div className="flex flex-col md:flex-row gap-4 mb-4">
                  <button
                    className="w-full md:w-auto px-6 py-3 rounded-lg font-semibold border border-gray-300 bg-gray-100 text-gray-700 hover:bg-gray-200 transition text-base"
                    type="button"
                    onClick={() => window.history.back()}
                    disabled={aiLoading}
                  >
                    Back to Interview Hub
                  </button>
                  <button
                    className="w-full md:w-auto px-6 py-3 rounded-lg font-semibold bg-orange-500 text-white hover:bg-orange-600 flex items-center justify-center gap-2 transition text-base shadow-sm"
                    type="button"
                    onClick={handleAIGenerate}
                    disabled={aiLoading}
                  >
                    <FaRobot className="text-lg" />
                    {aiLoading ? 'Generating...' : 'Generate Interview Questions with AI'}
                  </button>
                </div>
                {aiError && <div className="text-center text-red-600 mb-4 text-base">{aiError}</div>}
                {questions.length > 0 && (
                  <div className="bg-white rounded-xl p-6 text-gray-800 shadow mt-8 border border-gray-100">
                    <h3 className="text-xl font-bold mb-4 text-orange-500">AI-Generated Interview Questions</h3>
                    <ol className="list-decimal pl-6 space-y-2">
                      {questions.map((q, i) => (
                        <li key={i}>{q}</li>
                      ))}
                    </ol>
                  </div>
                )}
              </form>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
