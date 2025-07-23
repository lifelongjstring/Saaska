import React from "react";

export default function CLLetterBodyForm({ form, handleChange }) {
  return (
    <div style={{ background: '#fff', borderRadius: 18,  padding: '32px 32px 24px 32px', maxWidth: 520 }}>
      <section>
        <h2 className="resume-section-title"><span role="img" aria-label="writing hand">✍️</span> Letter Body</h2>
        <label className="field-label" style={{ fontFamily: 'Inter, Arial, sans-serif', fontStyle: 'normal' }}>Letter body</label>
        <textarea name="letterBody" value={form.letterBody} onChange={handleChange} rows={10} required style={{ fontFamily: 'Inter, Arial, sans-serif', fontStyle: 'normal' }} />
      </section>
    </div>
  );
} 