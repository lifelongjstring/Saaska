import React from "react";

export default function PersonalInfoForm({ form, handleChange }) {
  return (
    <section className="resume-section-card">
      <h2 className="resume-section-title"><span role="img" aria-label="person">👤</span> Personal Information</h2>
      <label className="field-label">Your full name</label>
      <input name="name" type="text" value={form.name} onChange={handleChange} required />
      <label className="field-label">Your email address</label>
      <input name="email" type="email" value={form.email} onChange={handleChange} required />
      <label className="field-label">Your phone number</label>
      <input name="phone" type="tel" value={form.phone} onChange={handleChange} required />
      <label className="field-label">City & State</label>
      <input name="location" type="text" value={form.location} onChange={handleChange} required />
      <label className="field-label">A brief professional summary</label>
      <textarea name="summary" value={form.summary} onChange={handleChange} />
    </section>
  );
} 