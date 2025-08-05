import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import Header from "./components/Header";
import "./App.css";
import "./mobile.css";
import { useUserActivity } from "./contexts/UserActivityContext";

export default function HomePage() {
  const [selectedService, setSelectedService] = useState("dashboard");
  const [redirect, setRedirect] = useState(null);

  const { trackPageVisit } = useUserActivity();

  useEffect(() => {
    trackPageVisit("Home");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNavigation = () => {
    if (selectedService) {
      setRedirect("/" + selectedService);
    }
  };

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="font-[Jost] text-white min-h-screen flex flex-col bg-gradient-to-b from-[#003049] via-[#0077b6] to-[#00b4d8]">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="hero flex flex-col items-center justify-center text-center py-6 text-white">
        <h2 className="text-4xl font-bold mb-3 text-white">
          What Can I Do For You?
        </h2>
        <p className="text-lg max-w-xl mb-4 text-white">
          Your all-in-one career platform with AI-powered tools to help you land
          your dream job
        </p>
        <div className="dropdown mb-4">
          <select
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
            className="bg-white bg-opacity-30 rounded px-2 py-1 text-white"
            style={{ color: "white", backgroundColor: "rgba(255,255,255,0.2)" }}
          >
            <option value="dashboard">Dashboard</option>
            <option value="resume">Resumes</option>
            <option value="cover_letter">Cover Letters</option>
            <option value="applications">Applications</option>
            <option value="interviews">Interview Practice</option>
            <option value="job-search">Job Search</option>
            <option value="resume-maker-page">Resume Maker</option>
            <option value="cover-letter-maker-page">Cover Letter Maker</option>
            <option value="features">Features</option>
            <option value="pricing">Pricing</option>
          </select>
        </div>

        <button onClick={handleNavigation} className="btn text-white">
          Get Started
        </button>
      </section>

      {/* Features Section */}
      <section className="features w-full flex flex-col md:flex-row flex-wrap gap-6 py-6">
        <a
          href="/resume"
          className="feature-card flex-1 min-w-[200px] min-h-[220px] flex flex-col items-center justify-center text-center p-6 bg-white bg-opacity-10 rounded-lg shadow-md text-white transition-transform hover:scale-105"
        >
          <i className="fas fa-file-alt text-4xl mb-3"></i>
          <h3 className="text-xl font-semibold mb-1">
            Resumes & Cover Letters
          </h3>
          <p>Create professional documents that get you noticed by employers</p>
        </a>
        <a
          href="/job-search"
          className="feature-card flex-1 min-w-[200px] min-h-[220px] flex flex-col items-center justify-center text-center p-6 bg-white bg-opacity-10 rounded-lg shadow-md text-white transition-transform hover:scale-105"
        >
          <i className="fas fa-city text-4xl mb-3"></i>
          <h3 className="text-xl font-semibold mb-1">
            Search & Apply for Jobs
          </h3>
          <p>Find and apply to the best opportunities in your field</p>
        </a>
        <a
          href="/interviews"
          className="feature-card flex-1 min-w-[200px] min-h-[220px] flex flex-col items-center justify-center text-center p-6 bg-white bg-opacity-10 rounded-lg shadow-md text-white transition-transform hover:scale-105"
        >
          <i className="fas fa-lightbulb text-4xl mb-3"></i>
          <h3 className="text-xl font-semibold mb-1">Practice Interviews</h3>
          <p>Prepare for your interviews with our AI-powered simulator</p>
        </a>
        <a
          href="/applications"
          className="feature-card flex-1 min-w-[200px] min-h-[220px] flex flex-col items-center justify-center text-center p-6 bg-white bg-opacity-10 rounded-lg shadow-md text-white transition-transform hover:scale-105"
        >
          <i className="fas fa-briefcase text-4xl mb-3"></i>
          <h3 className="text-xl font-semibold mb-1">Track Applications</h3>
          <p>Manage all your job applications in one place</p>
        </a>
      </section>

      {/* Footer */}
    </div>
  );
}
