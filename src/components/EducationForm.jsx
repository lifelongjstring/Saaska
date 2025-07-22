import React from "react";

export default function EducationForm({ form, handleChange }) {
  return (
    <div style={{ background: '#fff', borderRadius: 18, boxShadow: '0 4px 24px rgba(70,196,224,0.10)', padding: '32px 32px 24px 32px', margin: '0 auto 32px auto', maxWidth: 520 }}>
      <section>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: 8 }}>Education</h2>
        <div style={{ color: '#555', fontSize: '1.08rem', marginBottom: 24 }}>
          Include your most recent school and degree. This gives recruiters insight into your academic background.
        </div>
        <div style={{ display: 'flex', gap: 64, marginBottom: 18, justifyContent: 'center' }}>
          <div style={{ minWidth: 300, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <label className="field-label" style={{ textAlign: 'center', width: '100%', fontFamily: 'Inter, Arial, sans-serif', fontStyle: 'normal' }}>School or university name</label>
            <input name="school" type="text" value={form.school} onChange={handleChange} style={{ width: 260, fontFamily: 'Inter, Arial, sans-serif', fontStyle: 'normal' }} />
          </div>
          <div style={{ minWidth: 300, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <label className="field-label" style={{ textAlign: 'center', width: '100%', fontFamily: 'Inter, Arial, sans-serif', fontStyle: 'normal' }}>Degree or qualification</label>
            <input name="degree" type="text" value={form.degree} onChange={handleChange} style={{ width: 260, fontFamily: 'Inter, Arial, sans-serif', fontStyle: 'normal' }} />
          </div>
        </div>
        <label className="field-label" style={{ fontFamily: 'Inter, Arial, sans-serif', fontStyle: 'normal' }}>Additional notes (optional)</label>
        <textarea name="eduDesc" value={form.eduDesc} onChange={handleChange} style={{ width: '100%', fontFamily: 'Inter, Arial, sans-serif', fontStyle: 'normal' }} />
      </section>
    </div>
  );
} 