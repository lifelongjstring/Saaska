import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import "../App";
import "../styles/interview.css";
import "../styles/resume.css";
import { useUserActivity } from "../contexts/UserActivityContext";
import ActivityTracker from "../components/ActivityTracker";
import MobileDrawer from "../components/MobileDrawer";

/**
 * JobSearchPage component displays job search functionality and results.
 * @returns {JSX.Element} The rendered job search page.
 * @precondition Should be used within a React Router context.
 */
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

  // Mobile drawer state
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Detect mobile
  const isMobile =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(max-width: 600px)").matches;

  useEffect(() => {
    trackPageVisit("Job Search");
  }, [trackPageVisit]);

  // Fallback mock jobs in case API fails
  const mockJobs = [
    {
      title: "Frontend Developer",
      company: "Tech Solutions",
      location: "New York",
      description: "React, JavaScript",
      url: "https://example.com/job1",
    },
    {
      title: "Product Manager",
      company: "Innovatech",
      location: "Remote",
      description: "Agile, product roadmaps",
      url: "https://example.com/job2",
    },
    {
      title: "Data Scientist",
      company: "DeepData",
      location: "San Francisco",
      description: "Python, ML, analytics",
      url: "https://example.com/job3",
    },
    {
      title: "Backend Developer",
      company: "CodeCraft",
      location: "New York",
      description: "Node.js, APIs",
      url: "https://example.com/job4",
    },
    {
      title: "Marketing Specialist",
      company: "GrowthCo",
      location: "Los Angeles",
      description: "Digital marketing, social media",
      url: "https://example.com/job5",
    },
    {
      title: "Sales Representative",
      company: "SalesPro",
      location: "Chicago",
      description: "B2B sales, client relations",
      url: "https://example.com/job6",
    },
    {
      title: "Customer Service",
      company: "SupportHub",
      location: "Remote",
      description: "Customer support, problem solving",
      url: "https://example.com/job7",
    },
    {
      title: "Graphic Designer",
      company: "CreativeStudio",
      location: "Miami",
      description: "Adobe Creative Suite, branding",
      url: "https://example.com/job8",
    },
  ];

  // Hardcoded resumes (should be shared with ResumePage in real app)
  const resumes = [
    { title: "Marketing Manager Resume", lastEdited: "May 30, 2025" },
    { title: "UX Designer Resume", lastEdited: "May 25, 2025" },
    { title: "Software Engineer Resume", lastEdited: "May 20, 2025" },
  ];

  const searchJobs = async (keyword, city, page = 1) => {
    try {
      // Using Adzuna API with environment variables
      const appId = process.env.REACT_APP_ADZUNA_APP_ID;
      const appKey = process.env.REACT_APP_ADZUNA_APP_KEY;

      if (!appId || !appKey) {
        console.error(
          "Adzuna API credentials not found in environment variables",
        );
        return { jobs: [], totalPages: 1, totalResults: 0 };
      }

      // Use a broader search term if no keyword provided
      const query = keyword || "jobs";

      // Determine country based on city or use US as default
      let location = "us"; // Default to US
      if (
        city &&
        (city.toLowerCase().includes("saskatoon") ||
          city.toLowerCase().includes("toronto") ||
          city.toLowerCase().includes("vancouver") ||
          city.toLowerCase().includes("montreal") ||
          city.toLowerCase().includes("calgary") ||
          city.toLowerCase().includes("edmonton") ||
          city.toLowerCase().includes("ottawa") ||
          city.toLowerCase().includes("winnipeg") ||
          city.toLowerCase().includes("canada"))
      ) {
        location = "ca"; // Use Canadian API
      }

      // Build URL according to Adzuna documentation
      let url = `https://api.adzuna.com/v1/api/jobs/${location}/search/${page}?app_id=${appId}&app_key=${appKey}&results_per_page=10&what=${encodeURIComponent(query)}&content-type=application/json`;

      // Add location filter if city is provided
      if (city && city.trim()) {
        url += `&where=${encodeURIComponent(city.trim())}`;
      }

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.results && data.results.length > 0) {
        const jobs = data.results.map((job) => ({
          title: job.title || "Job Title Not Available",
          company: job.company?.display_name || "Company Not Available",
          location: job.location?.display_name || "Location Not Available",
          description: job.description || "Description Not Available",
          url: job.redirect_url || job.url || null,
        }));

        return {
          jobs,
          totalPages: Math.ceil(data.count / 10),
          totalResults: data.count,
        };
      } else {
        return { jobs: [], totalPages: 1, totalResults: 0 };
      }
    } catch (err) {
      console.error("Error fetching jobs from Adzuna:", err);
      return { jobs: [], totalPages: 1, totalResults: 0 };
    }
  };

  // Alternative job search using GitHub Jobs API (no API key required)
  const searchJobsGitHub = async (keyword, city, page = 1) => {
    try {
      const query = keyword || "jobs";
      const location = city || "";

      const url = `https://jobs.github.com/positions.json?search=${encodeURIComponent(query)}&location=${encodeURIComponent(location)}&page=${page}`;

      console.log("Fetching from GitHub Jobs:", url);

      const response = await fetch(url);
      const data = await response.json();

      console.log("GitHub Jobs Response:", data);

      if (data && data.length > 0) {
        const jobs = data.map((job) => ({
          title: job.title || "Job Title Not Available",
          company: job.company || "Company Not Available",
          location: job.location || "Location Not Available",
          description: job.description || "Description Not Available",
          url: job.url || null,
        }));

        return {
          jobs,
          totalPages: Math.ceil(data.length / 10),
          totalResults: data.length,
        };
      }
      return { jobs: [], totalPages: 1, totalResults: 0 };
    } catch (err) {
      console.error("Error fetching GitHub jobs:", err);
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

      // Try to get real job data from multiple sources
      let realJobs = [];
      let pages = 1;
      let total = 0;

      // Try Adzuna API first
      try {
        const result = await searchJobs(keyword, city, page);
        realJobs = result.jobs;
        pages = result.totalPages;
        total = result.totalResults;
        console.log("Adzuna jobs found:", realJobs.length);
      } catch (err) {
        console.log("Adzuna API failed, trying GitHub Jobs");
      }

      // If no jobs from Adzuna, try GitHub Jobs API
      if (!realJobs || realJobs.length === 0) {
        try {
          const result = await searchJobsGitHub(keyword, city, page);
          realJobs = result.jobs;
          pages = result.totalPages;
          total = result.totalResults;
          console.log("GitHub Jobs found:", realJobs.length);
        } catch (err) {
          console.log("GitHub Jobs API also failed");
        }
      }

      if (realJobs && realJobs.length > 0) {
        setFilteredJobs(realJobs);
        setTotalPages(pages);
        setTotalResults(total);
        console.log("Found real jobs:", realJobs.length);
      } else {
        // Fallback to filtered mock data
        console.log("No real jobs found, using mock data");
        const filtered = mockJobs.filter((job) => {
          const matchesKeyword =
            !keyword ||
            job.title.toLowerCase().includes(keyword.toLowerCase()) ||
            job.company.toLowerCase().includes(keyword.toLowerCase()) ||
            job.description.toLowerCase().includes(keyword.toLowerCase());

          const matchesCity =
            !city || job.location.toLowerCase().includes(city.toLowerCase());

          return matchesKeyword && matchesCity;
        });

        if (filtered.length > 0) {
          setFilteredJobs(filtered);
          setTotalPages(1);
          setTotalResults(filtered.length);
        } else {
          setFilteredJobs(mockJobs);
          setTotalPages(1);
          setTotalResults(mockJobs.length);
          setError(
            "No jobs found matching your criteria. Showing sample data.",
          );
        }
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
      // Open the original job posting in a new tab
      window.open(job.url, "_blank", "noopener,noreferrer");
    } else {
      // Fallback if no URL is available
      alert(
        `No direct link available for: ${job.title} at ${job.company}\n\nThis might be a sample job or the original posting link is not available.`,
      );
    }
  };

  const handleOpenApplyModal = (job) => {
    setSelectedJob(job);
    setShowApplyModal(true);
    setSelectedResume("");
    setApplySuccess(false);
    setApplyError("");
  };

  /**
   * Save a job application to localStorage.
   * TODO: Replace with API call to persist application in production.
   * @param {Object} application - The application record to save.
   */
  function saveApplicationToLocalStorage(application) {
    const key = "jobApplications";
    const existing = JSON.parse(localStorage.getItem(key) || "[]");
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
    // Simulate random error (10% chance)
    if (Math.random() < 0.1) {
      setApplySuccess(false);
      setApplyError(
        "An error occurred while submitting your application. Please try again.",
      );
      return;
    }
    setApplySuccess(true);
    setApplyError("");
    // Save application to localStorage (for demo; replace with API in production)
    if (selectedJob) {
      const application = {
        company: selectedJob.company,
        position: selectedJob.title,
        status: "Applied",
        appliedDate: new Date().toISOString(),
        resumeUsed: selectedResume,
        // Add more fields as needed
      };
      saveApplicationToLocalStorage(application);

      // Track job application activity
      trackJobApplied({
        company: selectedJob.company,
        position: selectedJob.title,
      });
    }
    setTimeout(() => {
      setShowApplyModal(false);
    }, 1500);
  };

  return (
    <div className="resume-page-wrapper">
      {/* Hamburger for mobile */}
      {isMobile && !drawerOpen && (
        <button
          className="hamburger-btn"
          aria-label="Open sidebar menu"
          aria-expanded={drawerOpen}
          onClick={() => setDrawerOpen(true)}
          style={{
            position: "fixed",
            top: 12,
            left: 12,
            zIndex: 2001,
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
          ☰
        </button>
      )}

      <ActivityTracker feature="job_search" pageName="Job Search" />

      {isMobile ? (
        <MobileDrawer
          isOpen={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        />
      ) : (
        <Sidebar />
      )}

      <main className="main-content">
        <div className="container">
          {/* Breadcrumbs */}
          <nav className="breadcrumbs">
            <span className="breadcrumb-item">
              <i className="fas fa-home"></i> Home
            </span>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-item active">Job Search</span>
          </nav>

          <h1>Search for Jobs</h1>

          <div className="job-search-form">
            <input
              type="text"
              placeholder="Location (City, Province, or Remote)"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              style={{ minWidth: 0 }}
            />
            <input
              type="text"
              placeholder="Job title, company, or keywords"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              style={{ minWidth: 0 }}
            />
            <button onClick={() => handleSearch(1)} disabled={isLoading}>
              <i className="fas fa-search"></i>
              <span>Search</span>
            </button>
          </div>

          {error && (
            <div
              style={{
                padding: "10px",
                margin: "10px 0",
                backgroundColor: "#fff3cd",
                border: "1px solid #ffeaa7",
                borderRadius: "4px",
                color: "#856404",
              }}
            >
              {error}
            </div>
          )}

          {/* Search Results Info */}
          {searchPerformed && (
            <div className="search-results-info">
              <p>
                Showing {filteredJobs.length} of {totalResults} results
                {totalPages > 1 && ` (Page ${currentPage} of ${totalPages})`}
              </p>
            </div>
          )}

          <div className="job-listing">
            {filteredJobs.length === 0 && !isLoading ? (
              <p>Enter search terms and click "Search" to find jobs.</p>
            ) : (
              filteredJobs.map((job, index) => (
                <div key={index} className="job-card">
                  <div className="job-info">
                    <h3>{job.title}</h3>
                    <p className="company">{job.company}</p>
                    <p className="location">
                      <i className="fas fa-map-marker-alt"></i> {job.location}
                    </p>
                    <p className="description">{job.description}</p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.5rem",
                    }}
                  >
                    <button
                      className="job-action"
                      onClick={() => handleViewJob(job)}
                    >
                      View
                    </button>
                    <button
                      className="job-action"
                      style={{ background: "#0077b6", color: "white" }}
                      onClick={() => handleOpenApplyModal(job)}
                    >
                      Apply
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination">
              <button
                className="pagination-btn"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <i className="fas fa-chevron-left"></i> Previous
              </button>

              <div className="page-numbers">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }

                  return (
                    <button
                      key={pageNum}
                      className={`page-number ${currentPage === pageNum ? "active" : ""}`}
                      onClick={() => handlePageChange(pageNum)}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              <button
                className="pagination-btn"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next <i className="fas fa-chevron-right"></i>
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Apply Modal */}
      {showApplyModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.35)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              background: "white",
              borderRadius: 12,
              padding: "1.2rem 1.2rem 1rem 1.2rem",
              minWidth: 280,
              maxWidth: 340,
              boxShadow: "0 4px 24px rgba(0,0,0,0.18)",
              color: "#222",
              position: "relative",
            }}
          >
            <button
              onClick={() => setShowApplyModal(false)}
              style={{
                position: "absolute",
                top: 12,
                right: 16,
                background: "none",
                border: "none",
                fontSize: 22,
                color: "#888",
                cursor: "pointer",
              }}
            >
              &times;
            </button>
            <h2
              style={{
                marginBottom: 12,
                fontWeight: 700,
                fontSize: "1.2rem",
                color: "#003049",
              }}
            >
              Apply for {selectedJob?.title}
            </h2>
            <form onSubmit={handleApply}>
              <select
                value={selectedResume}
                onChange={(e) => setSelectedResume(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  borderRadius: 8,
                  border: "1px solid #bbb",
                  marginBottom: 16,
                }}
              >
                <option value="" disabled>
                  Select your resume
                </option>
                {resumes.map((resume, idx) => (
                  <option key={idx} value={resume.title}>
                    {resume.title} ({resume.lastEdited})
                  </option>
                ))}
              </select>
              <button
                type="submit"
                className="job-action"
                style={{
                  width: "100%",
                  background: "#0077b6",
                  color: "white",
                  marginTop: 8,
                }}
              >
                Apply
              </button>
              {applySuccess && (
                <div
                  style={{ color: "#28a745", fontWeight: 600, marginTop: 12 }}
                >
                  Application submitted!
                </div>
              )}
              {applyError && (
                <div
                  style={{ color: "#d90429", fontWeight: 600, marginTop: 12 }}
                >
                  {applyError}
                </div>
              )}
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
