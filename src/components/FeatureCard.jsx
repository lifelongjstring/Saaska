import React from "react";

/**
 * FeatureCard component displays a single feature card.
 * @param {Object} props - The component props.
 * @param {string} props.img - The image source for the feature.
 * @param {string} props.title - The title of the feature.
 * @param {string} props.desc - The description of the feature.
 * @returns {JSX.Element} The rendered feature card.
 * @precondition img, title, and desc must be valid strings.
 */
export default function FeatureCard({ img, title, desc }) {
  return (
    <div className="feature-card w-full">
      <img src={img} alt={title} />
      <h3>{title}</h3>
      <p>{desc}</p>
    </div>
  );
}
