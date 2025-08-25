import React from "react";

// EducationForm component
// Props:
// - form: an object holding the current form values (school, degree, eduDesc)
// - handleChange: a function to update form values when inputs change
export default function EducationForm({ form, handleChange }) {
  return (
    <div
      // Card-like container styling
      style={{
        background: "#fff",
        borderRadius: 18,
        boxShadow: "0 4px 24px rgba(70,196,224,0.10)",
        padding: "32px 32px 24px 32px",
        margin: "0 auto 32px auto",
        maxWidth: 520,
        boxSizing: "border-box",
      }}
    >
      <section>
        {/* Section Title */}
        <h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: 8 }}>
          Education
        </h2>

        {/* Short description text */}
        <div style={{ color: "#555", fontSize: "1.08rem", marginBottom: 24 }}>
          Include your most recent school and degree. This gives recruiters
          insight into your academic background.
        </div>

        {/* Input fields grouped with flex layout */}
        <div
          style={{
            display: "flex",
            gap: 16,
            marginBottom: 18,
            flexWrap: "wrap", // ensures responsiveness on smaller screens
          }}
        >
          {/* School input */}
          <div style={{ flex: 1, minWidth: "100%" }}>
            <label className="field-label" style={labelStyle}>
              School or university name
            </label>
            <input
              name="school"
              type="text"
              value={form.school}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          {/* Degree input */}
          <div style={{ flex: 1, minWidth: "100%" }}>
            <label className="field-label" style={labelStyle}>
              Degree or qualification
            </label>
            <input
              name="degree"
              type="text"
              value={form.degree}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>
        </div>

        {/* Optional description textarea */}
        <label className="field-label" style={labelStyle}>
          Additional notes (optional)
        </label>
        <textarea
          name="eduDesc"
          value={form.eduDesc}
          onChange={handleChange}
          style={{ ...inputStyle, minHeight: 80, resize: "vertical" }}
        />
      </section>
    </div>
  );
}

// Shared label styling
const labelStyle = {
  fontWeight: 600,
  fontSize: 14,
  display: "block",
  marginBottom: 4,
  fontFamily: "Inter, Arial, sans-serif",
  fontStyle: "normal",
  color: "#000",
};

// Shared input styling
const inputStyle = {
  width: "100%",
  fontSize: 16,
  padding: "10px 14px",
  border: "1.5px solid #e0e7ef",
  borderRadius: 8,
  background: "#f8fafc",
  color: "#222",
  fontWeight: 500,
  outline: "none",
  marginBottom: 0,
  boxSizing: "border-box",
  transition: "border 0.18s, box-shadow 0.18s",
  fontFamily: "Inter, Arial, sans-serif",
  fontStyle: "normal",
};
