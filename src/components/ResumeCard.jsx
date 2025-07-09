// ResumeCard.jsx
import React from "react";

/**
 * ResumeCard component displays a single resume card.
 * @param {Object} props - The component props.
 * @param {string} props.title - The title of the resume.
 * @param {string} props.lastEdited - The last edited date.
 * @returns {JSX.Element} The rendered resume card.
 * @precondition title and lastEdited must be valid strings.
 */
export default function ResumeCard({ title, lastEdited }) {
  return (
    <div className="card">
      <div className="card-title">{title}</div>
      <div className="card-meta">Last edited: {lastEdited}</div>
    </div>
  );
}

