import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import "../App";
import "../styles/interview.css";
import "../styles/resume.css";
import { useUserActivity } from "../contexts/UserActivityContext";
import ActivityTracker from "../components/ActivityTracker";

export default function JobSearchPage() {
  const [city, setCity] = useState("");
  const [keyword, setKeyword] = useState("");
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [selectedResume, setSelectedResume] = useState("");
  const [applySuccess, setApplySuccess] = useState(false);
  const [applyError, setApplyError] = useState("");
  const { trackPageVisit, trackJobApplied } = useUserActivity();

  useEffect(() => {
    trackPageVisit('Job Search');
  }, [trackPageVisit]);

  const mockJobs = [
    { title: "Frontend Developer", company: "Tech Solutions", location: "New York", description: "React, JavaScript", url: "https://example.com/job1" },
    { title: "Product Manager", company: "Innovatech", location: "Remote", description: "Agile, product roadmaps", url: "https://example.com/job2" },
    { title: "Data Scientist", company: "DeepData", location: "San Francisco", description: "Python, ML, analytics", url: "https://example.com/job3" },
    { title: "Backend Developer", company: "CodeCraft", location: "New York", description: "Node.js, APIs", url: "https://example.com/job4" },
    { title: "Marketing Specialist", company: "GrowthCo", location: "Los Angeles", description: "Digital marketing, social media", url: "https://example.com/job5" },
    { title: "Sales Representative", company: "SalesPro", location: "Chicago", description: "B2B sales, client relations", url: "https://example.com/job6" },
    { title: "Customer Service", company: "SupportHub", location: "Remote", description: "Customer support, problem solving", url: "https://example.com/job7" },
    { title: "Graphic Designer", company: "CreativeStudio", location: "Miami", description: "Adobe Creative Suite, branding", url: "https://example.com/job8" },
  ];

  const resumes = [
    { title: "Marketing Manager Resume", lastEdited: "May 30, 2025" },
    { title: "UX Designer Resume", lastEdited: "May 25, 2025" },
    { title: "Software Engineer Resume", lastEdited: "May 20, 2025" },
  ];

  const searchJobs = async (keyword, city, page = 1) => {
    try {
      const response = await fetch('/.netlify/functions/getJobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ keyword, city, page }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      return {
        jobs: data.jobs || [],
        totalPages: data.totalPages || 1,
        totalResults: data.totalResults || 0,
      };
    } catch (err) {
      console.error("Error fetching jobs from Netlify Function:", err);
      return { jobs: [], totalPages: 1, totalResults: 0 };
    }
  };


  const handleSearch = async (page = 1) => {
    setIsLoading(true);
    setError("");
    setCurrentPage(page);

    try {
      if (!keyword && !city) {
        setFilteredJobs(mockJobs);
        setTotalPages(1);
        setTotalResults(mockJobs.length);
        setSearchPerformed(true);
        setIsLoading(false);
        return;
      }

      let realJobs = [];
      let pages = 1;
      let total = 0;

      try {
        const result = await searchJobs(keyword, city, page);
        realJobs = result.jobs;
        pages = result.totalPages;
        total = result.totalResults;
      } catch (err) {
        console.log('Adzuna API failed, trying GitHub Jobs');
      }


      if (realJobs && realJobs.length > 0) {
        setFilteredJobs(realJobs);
        setTotalPages(pages);
        setTotalResults(total);
      } else {
        const filtered = mockJobs.filter(job => {
          const matchesKeyword = !keyword || 
            job.title.toLowerCase().includes(keyword.toLowerCase()) ||
            job.company.toLowerCase().includes(keyword.toLowerCase()) ||
            job.description.toLowerCase().includes(keyword.toLowerCase());

          const matchesCity = !city || job.location.toLowerCase().includes(city.toLowerCase());

          return matchesKeyword && matchesCity;
        });

        setFilteredJobs(filtered.length > 0 ? filtered : mockJobs);
        setTotalPages(1);
        setTotalResults(filtered.length > 0 ? filtered.length : mockJobs.length);
        setError("No jobs found matching your criteria. Showing sample data.");
      }

      setSearchPerformed(true);
    } catch (err) {
      console.error("Error searching jobs:", err);
      setFilteredJobs(mockJobs);
      setTotalPages(1);
      setTotalResults(mockJobs.length);
      setError("Unable to fetch real jobs. Showing sample data.");
      setSearchPerformed(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      handleSearch(newPage);
    }
  };

  const handleViewJob = (job) => {
    if (job.url) {
      window.open(job.url, '_blank', 'noopener,noreferrer');
    } else {
      alert(`No direct link available for: ${job.title} at ${job.company}`);
    }
  };

  const handleOpenApplyModal = (job) => {
    setSelectedJob(job);
    setShowApplyModal(true);
    setSelectedResume("");
    setApplySuccess(false);
    setApplyError("");
  };

  function saveApplicationToLocalStorage(application) {
    const key = 'jobApplications';
    const existing = JSON.parse(localStorage.getItem(key) || '[]');
    existing.push(application);
    localStorage.setItem(key, JSON.stringify(existing));
  }

  const handleApply = (e) => {
    e.preventDefault();
    setApplyError("");
    if (!selectedResume) {
      setApplySuccess(false);
      setApplyError("Please select a resume before applying.");
      return;
    }
    if (Math.random() < 0.1) {
      setApplySuccess(false);
      setApplyError("An error occurred while submitting your application.");
      return;
    }
    setApplySuccess(true);
    setApplyError("");
    if (selectedJob) {
      const application = {
        company: selectedJob.company,
        position: selectedJob.title,
        status: "Applied",
        appliedDate: new Date().toISOString(),
        resumeUsed: selectedResume,
      };
      saveApplicationToLocalStorage(application);
      trackJobApplied({ company: selectedJob.company, position: selectedJob.title });
    }
    setTimeout(() => {
      setShowApplyModal(false);
    }, 1500);
  };

  return (
    <div className="resume-page-wrapper">
      <ActivityTracker feature="job_search" pageName="Job Search" />
      <Sidebar />
      <main className="main-content">
        <div className="container">
          <h1>Search for Jobs</h1>

          <div className="job-search-form">
            <input
              type="text"
              placeholder="Location"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <input
              type="text"
              placeholder="Keyword"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <button onClick={() => handleSearch(1)} disabled={isLoading}>
              <i className="fas fa-search"></i>
              <span>Search</span>
            </button>
          </div>

          {error && <div style={{ background: '#fff3cd', padding: 10, marginTop: 10 }}>{error}</div>}

          {searchPerformed && (
            <div className="search-results-info">
              <p>
                Showing {filteredJobs.length} of {totalResults} results 
                {totalPages > 1 && ` (Page ${currentPage} of ${totalPages})`}
              </p>
            </div>
          )}

          <div className="job-listing">
            {filteredJobs.map((job, index) => (
              <div key={index} className="job-card">
                <div className="job-info">
                  <h3>{job.title}</h3>
                  <p className="company">{job.company}</p>
                  <p className="location"><i className="fas fa-map-marker-alt"></i> {job.location}</p>
                  <p className="description">{job.description}</p>
                </div>
                <div>
                  <button className="job-action" onClick={() => handleViewJob(job)}>View</button>
                  <button className="job-action" onClick={() => handleOpenApplyModal(job)}>Apply</button>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="pagination">
              <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
              <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
            </div>
          )}
        </div>
      </main>

      {showApplyModal && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <button onClick={() => setShowApplyModal(false)} className="close-btn">&times;</button>
            <h2>Apply for {selectedJob?.title}</h2>
            <form onSubmit={handleApply}>
              <select
                value={selectedResume}
                onChange={e => setSelectedResume(e.target.value)}
                required
              >
                <option value="" disabled>Select your resume</option>
                {resumes.map((resume, idx) => (
                  <option key={idx} value={resume.title}>{resume.title}</option>
                ))}
              </select>
              <button type="submit">Apply</button>
              {applySuccess && <div className="success-msg">Application submitted!</div>}
              {applyError && <div className="error-msg">{applyError}</div>}
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
