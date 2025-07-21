import React from "react";

export default function CLLetterBodyForm({ form, handleChange }) {
  return (
    <section className="resume-section-card">
      <h2 className="resume-section-title"><span role="img" aria-label="writing hand">✍️</span> Letter Body</h2>
      <label className="field-label">Letter body</label>
      <textarea name="letterBody" value={form.letterBody} onChange={handleChange} rows={10} required />
    </section>
  );
} 