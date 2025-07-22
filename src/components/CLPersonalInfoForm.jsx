import React from "react";

export default function CLPersonalInfoForm({ form, handleChange }) {
  return (
    <div style={{ background: '#fff', borderRadius: 18, boxShadow: '0 4px 24px rgba(70,196,224,0.10)', padding: '32px 32px 24px 32px', margin: '0 auto 32px auto', maxWidth: 520 }}>
      <section>
        <h2 className="resume-section-title"><span role="img" aria-label="person">👤</span> Personal Information</h2>
        <label className="field-label" style={{ fontFamily: 'Inter, Arial, sans-serif', fontStyle: 'normal' }}>Your full name</label>
        <input name="name" type="text" value={form.name} onChange={handleChange} required style={{ fontFamily: 'Inter, Arial, sans-serif', fontStyle: 'normal' }} />
        <label className="field-label" style={{ fontFamily: 'Inter, Arial, sans-serif', fontStyle: 'normal' }}>Your email address</label>
        <input name="email" type="email" value={form.email} onChange={handleChange} required style={{ fontFamily: 'Inter, Arial, sans-serif', fontStyle: 'normal' }} />
        <label className="field-label" style={{ fontFamily: 'Inter, Arial, sans-serif', fontStyle: 'normal' }}>Your phone number</label>
        <input name="phone" type="tel" value={form.phone} onChange={handleChange} required style={{ fontFamily: 'Inter, Arial, sans-serif', fontStyle: 'normal' }} />
      </section>
    </div>
  );
} 