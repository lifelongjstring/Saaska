import React from "react";

/**
 * Hero component displays the main hero section of the homepage.
 * @returns {JSX.Element} The rendered hero section.
 * @precondition Should be used at the top of the homepage.
 */
const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-container">
        <h2>What Can I Do For You?</h2>
        <p>Your all-in-one career platform with AI-powered tools to help you land your dream job</p>

        <div className="dropdown" style={{ marginBottom: "40px" }}>
          <select id="service-select">
            <option value="AI Tools">AI Tools</option>
            <option value="Resume">Resume</option>
            <option value="Cover Letter">Cover Letter</option>
            <option value="Applications">Applications</option>
            <option value="Interview Practicing">Interview Practicing</option>
          </select>
        </div>

        <a href="#" className="btn">Get Started</a>
      </div>
    </section>
  );
};

export default Hero;
