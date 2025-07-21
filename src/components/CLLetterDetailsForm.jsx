import React from "react";

export default function CLLetterDetailsForm({ form, handleChange }) {
  return (
    <section className="resume-section-card">
      <h2 className="resume-section-title"><span role="img" aria-label="envelope">✉️</span> Letter Details</h2>
      <label className="field-label">Recipient name</label>
      <input name="recipient" type="text" value={form.recipient} onChange={handleChange} />
      <label className="field-label">Company name</label>
      <input name="company" type="text" value={form.company} onChange={handleChange} />
      <label className="field-label">Job title</label>
      <input name="jobTitle" type="text" value={form.jobTitle} onChange={handleChange} />
    </section>
  );
} 