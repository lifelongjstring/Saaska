import React from "react";

export default function CLLetterDetailsForm({ form, handleChange }) {
  return (
    <div style={{ background: '#fff', borderRadius: 18, boxShadow: '0 4px 24px rgba(70,196,224,0.10)', padding: '32px 32px 24px 32px', margin: '0 auto 32px auto', maxWidth: 520 }}>
      <section>
        <h2 className="resume-section-title"><span role="img" aria-label="envelope">✉️</span> Letter Details</h2>
        <label className="field-label" style={{ fontFamily: 'Inter, Arial, sans-serif', fontStyle: 'normal' }}>Recipient name</label>
        <input name="recipient" type="text" value={form.recipient} onChange={handleChange} style={{ fontFamily: 'Inter, Arial, sans-serif', fontStyle: 'normal' }} />
        <label className="field-label" style={{ fontFamily: 'Inter, Arial, sans-serif', fontStyle: 'normal' }}>Company name</label>
        <input name="company" type="text" value={form.company} onChange={handleChange} style={{ fontFamily: 'Inter, Arial, sans-serif', fontStyle: 'normal' }} />
        <label className="field-label" style={{ fontFamily: 'Inter, Arial, sans-serif', fontStyle: 'normal' }}>Job title</label>
        <input name="jobTitle" type="text" value={form.jobTitle} onChange={handleChange} style={{ fontFamily: 'Inter, Arial, sans-serif', fontStyle: 'normal' }} />
      </section>
    </div>
  );
} 