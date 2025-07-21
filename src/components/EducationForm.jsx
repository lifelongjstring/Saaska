import React from "react";

export default function EducationForm({ form, handleChange }) {
  return (
    <section>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: 8 }}>Education</h2>
      <div style={{ color: '#555', fontSize: '1.08rem', marginBottom: 24 }}>
        Include your most recent school and degree. This gives recruiters insight into your academic background.
      </div>
      <div style={{ display: 'flex', gap: 16, marginBottom: 18 }}>
        <div style={{ flex: 1 }}>
          <label className="field-label">School or university name</label>
          <input name="school" type="text" value={form.school} onChange={handleChange} style={{ width: '100%' }} />
        </div>
        <div style={{ flex: 1 }}>
          <label className="field-label">Degree or qualification</label>
          <input name="degree" type="text" value={form.degree} onChange={handleChange} style={{ width: '100%' }} />
        </div>
      </div>
      <label className="field-label">Additional notes (optional)</label>
      <textarea name="eduDesc" value={form.eduDesc} onChange={handleChange} style={{ width: '100%' }} />
    </section>
  );
} 