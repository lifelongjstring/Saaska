import React from "react";

export default function SkillsForm({ form, handleChange }) {
  return (
    <section>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: 8 }}>Skills</h2>
      <div style={{ color: '#555', fontSize: '1.08rem', marginBottom: 24 }}>
        List your key skills, separated by commas. This helps recruiters quickly see your strengths.
      </div>
      <label className="field-label">Key skills</label>
      <input name="skills" type="text" value={form.skills} onChange={handleChange} style={{ width: '100%' }} />
    </section>
  );
} 