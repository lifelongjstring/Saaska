import React from "react";
import Header from "../components/Header";
import "../styles/resume.css";
import "../styles/features.css";
import "../App.css";

/**
 * FeaturesPage component displays a grid of feature cards with a title and subtitle.
 * @returns {JSX.Element} The rendered features page.
 * @precondition Should be used within a React Router context.
 */
export default function FeaturesPage() {
  /**
   * List of features to display on the page.
   * @type {Array<{title: string, description: string, icon: string, category: string}>}
   * @precondition Must be a valid array of feature objects.
   */
  const features = [
    {
      title: "AI-Powered Resume Builder",
      description: "Create professional resumes with our intelligent AI that suggests improvements and optimizes content for ATS systems.",
      icon: "fas fa-file-alt",
      category: "Resume Tools"
    },
    {
      title: "Smart Cover Letter Generator",
      description: "Generate personalized cover letters that match your resume and the job requirements automatically.",
      icon: "fas fa-envelope",
      category: "Cover Letters"
    },
    {
      title: "Advanced Job Search",
      description: "Search thousands of jobs with intelligent filters, location-based results, and real-time updates.",
      icon: "fas fa-search",
      category: "Job Search"
    },
    {
      title: "Interview Practice Simulator",
      description: "Practice interviews with our AI-powered simulator that provides real-time feedback and scoring.",
      icon: "fas fa-lightbulb",
      category: "Interview Prep"
    },
    {
      title: "Application Tracking",
      description: "Track all your job applications in one place with status updates and follow-up reminders.",
      icon: "fas fa-briefcase",
      category: "Organization"
    },
    {
      title: "Resume Analytics",
      description: "Get insights into how your resume performs with detailed analytics and improvement suggestions.",
      icon: "fas fa-chart-line",
      category: "Analytics"
    },
    {
      title: "Team Collaboration",
      description: "Work together with your team on resumes and applications with real-time collaboration tools.",
      icon: "fas fa-users",
      category: "Collaboration"
    },
    {
      title: "Custom Branding",
      description: "Add your company logo and branding to create professional, branded documents.",
      icon: "fas fa-palette",
      category: "Branding"
    }
  ];

  const categories = ["All", "Resume Tools", "Cover Letters", "Job Search", "Interview Prep", "Organization", "Analytics", "Collaboration", "Branding"];

  return (
    <div className="features-page-wrapper min-h-screen flex flex-col bg-gradient-to-b from-[#003049] via-[#0077b6] to-[#00b4d8]">
      <Header />
      
      <main className="main-content-full">
        <div className="dashboard-gradient-box-full">
          <h1 className="cta-title">
            Discover Our <span className="cta-highlight">Powerful Features</span>
          </h1>
          <p className="cta-subtitle">
            Everything you need to accelerate your career journey
          </p>

          <div className="features-grid">
            {features.map((feature, index) => (
              /**
               * Render a single feature card.
               * @param {Object} feature - The feature object.
               * @param {string} feature.title - The title of the feature.
               * @param {string} feature.description - The description of the feature.
               * @param {string} feature.icon - The icon class for the feature.
               * @param {string} feature.category - The category of the feature.
               * @param {number} index - The index of the feature in the array.
               * @returns {JSX.Element} The rendered feature card.
               * @precondition feature must be a valid feature object.
               */
              <div key={index} className="feature-card">
                <div className="feature-icon">
                  <i className={feature.icon}></i>
                </div>
                <div className="feature-content">
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-description">{feature.description}</p>
                  <span className="feature-category">{feature.category}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="features-footer mt-12 text-center">
            <div className="features-footer-content">
              <div className="left">
                <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
              </div>
              <div className="right">
                <p className="text-gray-600 mb-6">
                  Join thousands of professionals who have accelerated their careers with our tools.
                </p>
              </div>
            </div>
            <div className="cta-buttons">
              <button className="btn primary mr-4">Start Free Trial</button>
              <a href="/pricing">
  <button class="btn secondary">View Pricing</button>
</a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 