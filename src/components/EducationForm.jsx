import React from "react";

export default function EducationForm({ form, handleChange }) {
  return (
    <section className="resume-section-card">
      <h2 className="resume-section-title"><span role="img" aria-label="graduation cap">🎓</span> Education</h2>
      <label className="field-label">School or university name</label>
      <input name="school" type="text" value={form.school} onChange={handleChange} />
      <label className="field-label">Degree or qualification</label>
      <input name="degree" type="text" value={form.degree} onChange={handleChange} />
      <label className="field-label">Additional notes (optional)</label>
      <textarea name="eduDesc" value={form.eduDesc} onChange={handleChange} />
    </section>
  );
} 