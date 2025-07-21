import React from "react";

export default function WorkExperienceForm({ form, handleChange }) {
  return (
    <section className="resume-section-card">
      <h2 className="resume-section-title"><span role="img" aria-label="briefcase">💼</span> Work Experience</h2>
      <label className="field-label">Most recent job title</label>
      <input name="jobTitle" type="text" value={form.jobTitle} onChange={handleChange} />
      <label className="field-label">Company name</label>
      <input name="company" type="text" value={form.company} onChange={handleChange} />
      <label className="field-label">What did you do in this role?</label>
      <textarea name="workDesc" value={form.workDesc} onChange={handleChange} />
    </section>
  );
} 