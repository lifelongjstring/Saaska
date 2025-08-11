import React from "react";

export default function CLLetterBodyForm({ form, handleChange }) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 18,
        boxShadow: "0 4px 24px rgba(70,196,224,0.10)",
        padding: "32px 32px 24px 32px",
        margin: "0 auto 32px auto",
        maxWidth: 520,
      }}
    >
      <header
        style={{
          marginBottom: 24,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: 4 }}>
          Letter Body
        </h2>
        <div style={{ color: "#555", fontSize: "1.08rem" }}>
          This is the main content of your cover letter. Be concise, engaging,
          and tailored to the role.
        </div>
      </header>

      <fieldset style={{ border: "none", padding: 0, margin: 0 }}>
        <div style={{ marginBottom: 18 }}>
          <label style={labelStyle}>Letter body</label>
          <textarea
            name="letterBody"
            value={form.letterBody}
            onChange={handleChange}
            rows={10}
            required
            placeholder="Write your letter here..."
            style={{ ...inputStyle, minHeight: 180, resize: "vertical" }}
          />
        </div>
      </fieldset>
    </div>
  );
}

const labelStyle = {
  fontWeight: 600,
  fontSize: 14,
  marginBottom: 4,
  display: "block",
  color: "#000",
  fontFamily: "Inter, Arial, sans-serif",
  fontStyle: "normal",
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
  marginTop: 0,
  boxSizing: "border-box",
  transition: "border 0.18s, box-shadow 0.18s",
  fontFamily: "Inter, Arial, sans-serif",
  fontStyle: "normal",
};
