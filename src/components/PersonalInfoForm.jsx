import React from "react";

const photoIcon = (
  <svg fill="none" viewBox="0 0 24 24" width="22" height="22">
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.5"
      d="M19.25 17.25v-7.5a2 2 0 0 0-2-2h-.333a1 1 0 0 1-.923-.615l-.738-1.77a1 1 0 0 0-.923-.615H9.667a1 1 0 0 0-.923.615l-.738 1.77a1 1 0 0 1-.923.615H6.75a2 2 0 0 0-2 2v7.5a2 2 0 0 0 2 2h10.5a2 2 0 0 0 2-2Z"
    ></path>
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.5"
      d="M15.25 13a3.25 3.25 0 1 1-6.5 0 3.25 3.25 0 0 1 6.5 0Z"
    ></path>
  </svg>
);


/**
 * PersonalInfoForm component renders a form for collecting personal details.
 * @param {Object} props - Component props
 * @param {Object} props.form - The form state object containing personal details.
 * @param {Function} props.handleChange - Function to handle input changes.
 * @return {JSX.Element} The rendered personal information form.
 * @precondition Should be used within a form handling context.
 */

export default function PersonalInfoForm({ form, handleChange }) {
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
          Personal details
        </h2>
        <div style={{ color: "#555", fontSize: "1.08rem" }}>
          Personal details such as name and job title are essential in a resume
          to give the recruiter a quick overview of the candidate.
        </div>
      </header>

      <fieldset style={{ border: "none", padding: 0, margin: 0 }}>
        <div style={{ display: "flex", gap: 16, marginBottom: 18 }}>
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>First name</label>
            <input
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="John"
              style={inputStyle}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>Last name</label>
            <input
              name="lastName"
              type="text"
              value={form.lastName || ""}
              onChange={handleChange}
              placeholder="Smith"
              style={inputStyle}
            />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 16,
            alignItems: "flex-end",
            marginBottom: 18,
          }}
        >
          <div style={{ flex: 2 }}>
            <label style={labelStyle}>Job title</label>
            <input
              name="jobTitle"
              type="text"
              value={form.jobTitle}
              onChange={handleChange}
              placeholder="Product Designer"
              style={inputStyle}
            />
          </div>
          <div
            style={{ flex: 1, display: "flex", alignItems: "center", gap: 8 }}
          >
            <button type="button" style={photoBtnStyle}>
              <span style={{ display: "flex", alignItems: "center", marginRight: 8 }}>
                {photoIcon}
              </span>
              <span style={{ fontWeight: 600 }}>Add photo</span>
            </button>
          </div>
        </div>

        {/* Additional Details - No Grey Box */}
        <div style={{ marginTop: 18 }}>
          <label style={labelStyle}>Your email address</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="john@email.com"
            style={inputStyle}
          />

          <label style={{ ...labelStyle, marginTop: 12 }}>Your phone number</label>
          <input
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            required
            placeholder="(555) 555-5555"
            style={inputStyle}
          />

          <label style={{ ...labelStyle, marginTop: 12 }}>City & State</label>
          <input
            name="location"
            type="text"
            value={form.location}
            onChange={handleChange}
            required
            placeholder="San Francisco, CA"
            style={inputStyle}
          />

          <label style={{ ...labelStyle, marginTop: 12 }}>
            A brief professional summary
          </label>
          <textarea
            name="summary"
            value={form.summary}
            onChange={handleChange}
            placeholder="Professional summary..."
            style={{ ...inputStyle, minHeight: 80, resize: "vertical" }}
          />

          <label style={{ ...labelStyle, marginTop: 12 }}>
            Resume Style
          </label>
          <select
            name="resumeStyle"
            value={form.resumeStyle}
            onChange={handleChange}
            style={inputStyle}
          >
            <option value="traditional">Traditional - Classic and professional</option>
            <option value="modern">Modern - Clean and contemporary</option>
            <option value="creative">Creative - Unique and artistic</option>
            <option value="minimalist">Minimalist - Simple and focused</option>
          </select>
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

const photoBtnStyle = {
  display: "flex",
  alignItems: "center",
  background: "#f8fafc",
  border: "1.5px solid #e0e7ef",
  borderRadius: 8,
  padding: "10px 18px",
  fontSize: 15,
  color: "#222",
  cursor: "pointer",
  fontWeight: 500,
  boxShadow: "none",
  outline: "none",
  transition: "border 0.18s, box-shadow 0.18s",
  fontFamily: "Inter, Arial, sans-serif",
  fontStyle: "normal",
};
