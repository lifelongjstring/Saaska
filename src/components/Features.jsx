import React from "react";
import FeatureCard from "./FeatureCard";

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
 * Features component displays a section of feature cards.
 * @returns {JSX.Element} The rendered features section.
 * @precondition Should be used within a page layout.
 */
const Features = () => {
  return (
    <section className="features">
      {features.map((feature, idx) => (
        /**
         * Render a single FeatureCard.
         * @param {Object} feature - The feature object.
         * @param {string} feature.img - The image source for the feature.
         * @param {string} feature.title - The title of the feature.
         * @param {string} feature.desc - The description of the feature.
         * @param {number} idx - The index of the feature in the array.
         * @returns {JSX.Element} The rendered FeatureCard.
         * @precondition feature must be a valid feature object.
         */
        <FeatureCard key={idx} {...feature} />
      ))}
    </section>
  );
};

export default Features;
