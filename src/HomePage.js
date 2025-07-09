import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./components/Header";
import "./App.css";
import { useUserActivity } from "./contexts/UserActivityContext";

export default function HomePage() {
  const [selectedService, setSelectedService] = useState("ai-tools.html");
  const navigate = useNavigate();
  const { trackPageVisit } = useUserActivity();

  useEffect(() => {
    trackPageVisit('Home');
  }, [trackPageVisit]);

  const handleNavigation = () => {
    if (selectedService) {
      navigate(`/${selectedService}`);
    }
  };
  

  return (
    <div className="font-[Jost] text-white min-h-screen flex flex-col bg-gradient-to-b from-[#003049] via-[#0077b6] to-[#00b4d8]">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="hero flex flex-col items-center justify-center text-center px-2 py-6 text-white">
        <h2 className="text-4xl font-bold mb-3 text-white">What Can I Do For You?</h2>
        <p className="text-lg max-w-xl mb-4 text-white">
          Your all-in-one career platform with AI-powered tools to help you land your dream job
        </p>
        <div className="dropdown mb-4">
          <select
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
            className="bg-white bg-opacity-30 rounded px-2 py-1 text-white"
            style={{ color: 'white', backgroundColor: 'rgba(255,255,255,0.2)' }}
          >
            <option value="ai-tools">AI Tools</option>
            <option value="resume">Resume</option>
            <option value="cover_letter">Cover Letter</option>
            <option value="applications">Applications</option>
            <option value="interviews">Interview Practicing</option>
          </select>
        </div>

        <button onClick={handleNavigation} className="btn text-white">
          Get Started
        </button>
      </section>

      {/* Features Section */}
      <section className="features flex flex-wrap justify-center gap-4 px-2 py-6 text-white">
        <a href="resume.html" className="feature-card text-center p-4 bg-white bg-opacity-10 rounded-lg shadow-md w-64 text-white">
          <i className="fas fa-file-alt text-4xl mb-3 text-white"></i>
          <h3 className="text-xl font-semibold mb-1 text-white">Resumes & Cover Letters</h3>
          <p className="text-white">Create professional documents that get you noticed by employers</p>
        </a>

        <a href="job-search.html" className="feature-card text-center p-4 bg-white bg-opacity-10 rounded-lg shadow-md w-64 text-white">
          <i className="fas fa-city text-4xl mb-3 text-white"></i>
          <h3 className="text-xl font-semibold mb-1 text-white">Search & Apply for Jobs</h3>
          <p className="text-white">Find and apply to the best opportunities in your field</p>
        </a>

        <a href="interviews.html" className="feature-card text-center p-4 bg-white bg-opacity-10 rounded-lg shadow-md w-64 text-white">
          <i className="fas fa-lightbulb text-4xl mb-3 text-white"></i>
          <h3 className="text-xl font-semibold mb-1 text-white">Practice Interviews</h3>
          <p className="text-white">Prepare for your interviews with our AI-powered simulator</p>
        </a>

        <a href="applications.html" className="feature-card text-center p-4 bg-white bg-opacity-10 rounded-lg shadow-md w-64 text-white">
          <i className="fas fa-briefcase text-4xl mb-3 text-white"></i>
          <h3 className="text-xl font-semibold mb-1 text-white">Track Applications</h3>
          <p className="text-white">Manage all your job applications in one place</p>
        </a>
      </section>

      {/* Footer */}
      <div className="homepage-footer mt-4 text-center text-sm text-white/80">
  © 2025 SaaSka Software, Inc. All rights reserved.
</div>
</div>
  );
}