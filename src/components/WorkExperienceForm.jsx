import React from "react";

export default function WorkExperienceForm({ form, handleChange }) {
  return (
    <section>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: 8 }}>Employment history</h2>
      <div style={{ color: '#555', fontSize: '1.08rem', marginBottom: 24 }}>
        List your most recent job title and company. This helps recruiters understand your experience at a glance.
      </div>
      <div style={{ display: 'flex', gap: 16, marginBottom: 18 }}>
        <div style={{ flex: 1 }}>
          <label className="field-label">Job title</label>
          <input name="jobTitle" type="text" value={form.jobTitle} onChange={handleChange} style={{ width: '100%' }} />
        </div>
        <div style={{ flex: 1 }}>
          <label className="field-label">Company name</label>
          <input name="company" type="text" value={form.company} onChange={handleChange} style={{ width: '100%' }} />
        </div>
      </div>
      <label className="field-label">What did you do in this role?</label>
      <textarea name="workDesc" value={form.workDesc} onChange={handleChange} style={{ width: '100%' }} />
    </section>
  );
} 