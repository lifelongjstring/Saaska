import React from "react";

export default function SkillsForm({ form, handleChange }) {
  return (
    <section className="resume-section-card">
      <h2 className="resume-section-title"><span role="img" aria-label="sparkles">✨</span> Skills</h2>
      <label className="field-label">List your key skills (comma separated)</label>
      <input name="skills" type="text" value={form.skills} onChange={handleChange} />
    </section>
  );
} 