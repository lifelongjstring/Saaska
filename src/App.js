// src/App.js
import React from "react";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "./contexts/SidebarContext";
import { UserActivityProvider } from "./contexts/UserActivityContext";
import HomePage from "./HomePage";
import LoginPage from "./LoginPage";
import ResumePage from "./pages/ResumePage";
import CoverLetterPage from "./pages/CoverLetterPage";
import ApplicationsPage from "./pages/ApplicationsPage";
import InterviewPage from "./pages/InterviewPage";
import DashboardPage from "./pages/DashboardPage";
import JobSearchPage from "./pages/JobSearchPage";
import PricingPage from "./pages/PricingPage";
import FeaturesPage from "./pages/FeaturesPage";
import ResumeMakerPage from "./pages/ResumeMakerPage";
import CoverLetterMakerPage from "./pages/CoverLetterMakerPage";
import ResumePreviewPage from "./pages/ResumePreviewPage";
import "./App.css";
import "./mobile.css";

function App() {
  return (
    <UserActivityProvider>
      <SidebarProvider>
        <div className="app-wrapper">
          <Router>
            <main className="main-content">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/resume" element={<ResumePage />} />
                <Route path="/cover_letter" element={<CoverLetterPage />} />
                <Route path="/applications" element={<ApplicationsPage />} />
                <Route path="/interviews" element={<InterviewPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/job-search" element={<JobSearchPage />} />
                <Route path="/pricing" element={<PricingPage />} />
                <Route path="/features" element={<FeaturesPage />} />
                <Route
                  path="/resume-maker-page"
                  element={<ResumeMakerPage />}
                />
                <Route
                  path="/cover-letter-maker-page"
                  element={<CoverLetterMakerPage />}
                />
                <Route path="/resume-preview" element={<ResumePreviewPage />} />
              </Routes>
            </main>
            <Footer />
          </Router>
        </div>
      </SidebarProvider>
    </UserActivityProvider>
  );
}

export default App;
