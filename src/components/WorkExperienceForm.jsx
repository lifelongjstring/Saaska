import React from "react";

export default function WorkExperienceForm({ form, handleChange }) {
  return (
    <div
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
        <h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: 8 }}>
          Employment history
        </h2>
        <div
          style={{
            color: "#555",
            fontSize: "1.08rem",
            marginBottom: 24,
          }}
        >
          List your most recent job title and company. This helps recruiters understand your experience at a glance.
        </div>

        <div
          style={{
            display: "flex",
            gap: 16,
            marginBottom: 18,
            flexWrap: "wrap",
          }}
        >
          <div style={{ flex: 1, minWidth: "100%" }}>
            <label className="field-label" style={labelStyle}>
              Job title
            </label>
            <input
              name="jobTitle"
              type="text"
              value={form.jobTitle}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>
          <div style={{ flex: 1, minWidth: "100%" }}>
            <label className="field-label" style={labelStyle}>
              Company name
            </label>
            <input
              name="company"
              type="text"
              value={form.company}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>
        </div>

        <label className="field-label" style={labelStyle}>
          What did you do in this role?
        </label>
        <textarea
          name="workDesc"
          value={form.workDesc}
          onChange={handleChange}
          style={{ ...inputStyle, minHeight: 100, resize: "vertical" }}
        />
      </section>
    </div>
  );
}

const labelStyle = {
  fontWeight: 600,
  fontSize: 14,
  display: "block",
  marginBottom: 4,
  fontFamily: "Inter, Arial, sans-serif",
  fontStyle: "normal",
  color: "#000",
};

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
  boxSizing: "border-box",
  transition: "border 0.18s, box-shadow 0.18s",
  fontFamily: "Inter, Arial, sans-serif",
  fontStyle: "normal",
};
