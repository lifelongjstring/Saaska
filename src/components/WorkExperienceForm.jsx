import React from "react";

export default function WorkExperienceForm({ form, handleChange }) {
  return (
    <section>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: 8 }}>Employment history</h2>
      <div style={{ color: '#555', fontSize: '1.08rem', marginBottom: 24 }}>
        List your most recent job title and company. This helps recruiters understand your experience at a glance.
      </div>
      <div style={{ display: 'flex', gap: 64, marginBottom: 18, justifyContent: 'center' }}>
        <div style={{ minWidth: 300, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <label className="field-label" style={{ textAlign: 'center', width: '100%' }}>Job title</label>
          <input name="jobTitle" type="text" value={form.jobTitle} onChange={handleChange} style={{ width: 260 }} />
        </div>
        <div style={{ minWidth: 300, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <label className="field-label" style={{ textAlign: 'center', width: '100%' }}>Company name</label>
          <input name="company" type="text" value={form.company} onChange={handleChange} style={{ width: 260 }} />
        </div>
      </div>
      <label className="field-label">What did you do in this role?</label>
      <textarea name="workDesc" value={form.workDesc} onChange={handleChange} style={{ width: '100%' }} />
    </section>
  );
} 