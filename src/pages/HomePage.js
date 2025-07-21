import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FeatureCard from "../components/FeatureCard";

const features = [
  {
    img: "images/index/u14.png",
    title: "Resumes & Cover Letters",
    desc: "Create professional documents that get you noticed by employers"
  },
  {
    img: "images/index/u15.png",
    title: "Search & Apply Jobs",
    desc: "Find and apply to the best opportunities in your field"
  },
  {
    img: "images/index/u16.png",
    title: "Practice Interviews",
    desc: "Prepare for your interviews with our AI-powered simulator"
  },
  {
    img: "images/index/u17.png",
    title: "Track Applications",
    desc: "Manage all your job applications in one place"
  }
];

/**
 * HomePage component displays the landing page with hero, features, and navigation.
 * @returns {JSX.Element} The rendered home page.
 * @precondition Should be used within a React Router context.
 */
export default function HomePage() {
  const [selectedService, setSelectedService] = useState("ai-tools.html");
  const navigate = useNavigate();

  /**
   * Handles navigation to the selected service.
   * @returns {void}
   * @precondition selectedService must be a valid route string.
   */
  const handleNavigation = () => {
    if (selectedService) {
      navigate(`/${selectedService}`);
    }
  };

  return (
    <div>
      {/* ...other homepage content... */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full">
        {features.map((feature, idx) => (
          <FeatureCard key={idx} {...feature} />
        ))}
      </div>
    </div>
  );
} 