import React from "react";

export default function EducationForm({ form, handleChange }) {
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
          Education
        </h2>
        <div style={{ color: "#555", fontSize: "1.08rem", marginBottom: 24 }}>
          Include your most recent school and degree. This gives recruiters insight into your academic background.
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
  marginBottom: 0,
  boxSizing: "border-box",
  transition: "border 0.18s, box-shadow 0.18s",
  fontFamily: "Inter, Arial, sans-serif",
  fontStyle: "normal",
};
