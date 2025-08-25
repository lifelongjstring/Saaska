import React from "react";

/**
 * Hero component displays the main hero section of the homepage.
 * Includes a title, description, service dropdown, and a call-to-action button.
 *
 * @returns {JSX.Element} The rendered hero section.
 * @precondition Should be used at the top of the homepage.
 */
const Hero = () => {
  return (
    <section className="hero mobile-hero">
      <div className="hero-container mobile-hero-container">
        {/* Main headline */}
        <h2 className="mobile-hero-title">What Can I Do For You?</h2>

        {/* Subheading / description */}
        <p className="mobile-hero-description">
          Your all-in-one career platform with AI-powered tools to help you land
          your dream job
        </p>

        {/* Service selection dropdown (mobile optimized) */}
        <div
          className="dropdown mobile-dropdown"
          style={{ marginBottom: "40px" }}
        >
          <select id="service-select" className="mobile-select">
            <option value="AI Tools">AI Tools</option>
            <option value="Resume">Resume</option>
            <option value="Cover Letter">Cover Letter</option>
            <option value="Applications">Applications</option>
            <option value="Interview Practicing">Interview Practicing</option>
          </select>
        </div>

        {/* Call-to-action button */}
        <a href="#" className="btn mobile-btn">
          Get Started
        </a>
      </div>

      <style jsx>{`
        /* Tablet & below (<= 768px) */
        @media (max-width: 768px) {
          .mobile-hero {
            padding: 30px 15px !important;
            text-align: center;
          }

          .mobile-hero-container {
            max-width: 100% !important;
            width: 100% !important;
            padding: 0 10px !important;
          }

          .mobile-hero-title {
            font-size: 26px !important;
            line-height: 1.3 !important;
            margin-bottom: 20px !important;
            word-wrap: break-word;
          }

          .mobile-hero-description {
            font-size: 16px !important;
            line-height: 1.5 !important;
            margin-bottom: 30px !important;
            padding: 0 5px !important;
          }

          .mobile-dropdown {
            width: 100% !important;
            max-width: 100% !important;
            margin: 20px auto !important;
          }

          .mobile-select {
            width: 100% !important;
            max-width: 100% !important;
            padding: 15px !important;
            font-size: 16px !important;
            border-radius: 8px !important;
            min-height: 48px;
          }

          .mobile-btn {
            width: 100% !important;
            max-width: 300px !important;
            margin: 20px auto !important;
            padding: 15px 25px !important;
            font-size: 16px !important;
            min-height: 48px;
            display: block !important;
          }
        }

        /* Small screens (<= 480px) */
        @media (max-width: 480px) {
          .mobile-hero-title {
            font-size: 22px !important;
          }

          .mobile-hero-description {
            font-size: 15px !important;
          }

          .mobile-btn {
            font-size: 15px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
