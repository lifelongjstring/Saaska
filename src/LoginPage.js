// NOTE: This login logic is a placeholder for development/demo purposes only.
// Before going live, replace with real API validation or backend authentication.

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css"; // This should contain the CSS you pasted
import googleG from "./components/google-g.png";
import saaskaLogo from "./components/icons8-job-80.png";

export default function LoginPage() {
  // Registration and login state
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  // Placeholder registration logic
  const handleRegister = () => {
    localStorage.setItem("registrationData", JSON.stringify(registerData));
    alert("Registration successful!");
    document.getElementById("chk").checked = false; // Reset to login
  };

  // Placeholder Google registration logic
  const handleGoogleRegister = () => {
    alert("Google registration is not implemented in this demo.");
  };

  // Placeholder LinkedIn registration logic
  const handleLinkedInRegister = () => {
    alert("LinkedIn registration is not implemented in this demo.");
  };

  // Placeholder login logic
  // TODO: Replace with real API validation or backend authentication before production
  const handleLogin = () => {
    if (loginData.email.trim() && loginData.password.trim()) {
      navigate("/dashboard");
    } else {
      alert("Please enter both email and password.");
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: "24px",
          marginTop: "24px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <img
            src={saaskaLogo}
            alt="SaaSka Logo"
            style={{ width: "60px", marginBottom: "0" }}
          />
          <span
            style={{
              fontSize: "2rem",
              fontWeight: "bold",
              color: "#fff",
              letterSpacing: "1px",
            }}
          >
            SaaSka
          </span>
        </div>
      </div>
      <div className="main">
        <input type="checkbox" id="chk" aria-hidden="true" />

        {/* Signup form (now contains Login fields) */}
        <div className="signup">
          <form onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="chk" aria-hidden="true">
              Log in
            </label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              value={loginData.email}
              onChange={(e) =>
                setLoginData({ ...loginData, email: e.target.value })
              }
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              value={loginData.password}
              onChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
            />
            <button type="submit" onClick={handleLogin}>
              Log in
            </button>
            <label htmlFor="chk" className="signup-toggle-btn">
              Don't have an account? Sign Up
            </label>
          </form>
        </div>

        {/* Login form (now contains Signup fields) */}
        <div className="login">
          <form onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="chk" aria-hidden="true">
              Sign up
            </label>
            <input
              type="text"
              name="username"
              placeholder="User name"
              required
              value={registerData.username}
              onChange={(e) =>
                setRegisterData({ ...registerData, username: e.target.value })
              }
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              value={registerData.email}
              onChange={(e) =>
                setRegisterData({ ...registerData, email: e.target.value })
              }
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              value={registerData.password}
              onChange={(e) =>
                setRegisterData({ ...registerData, password: e.target.value })
              }
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "4px",
                marginTop: "12px",
                alignItems: "center",
              }}
            >
              <button
                type="submit"
                onClick={handleRegister}
                style={{ margin: 0, width: "40%" }}
              >
                Sign up
              </button>
              <button
                type="button"
                onClick={handleGoogleRegister}
                style={{
                  background: "#fff",
                  color: "#444",
                  border: "1px solid #ccc",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  justifyContent: "center",
                  margin: 0,
                  width: "40%",
                }}
              >
                Register with Google
                <img
                  src={googleG}
                  alt="Google G"
                  width="20"
                  height="20"
                  style={{ display: "inline", verticalAlign: "middle" }}
                />
              </button>
              <button
                type="button"
                onClick={handleLinkedInRegister}
                style={{
                  background: "#0077b5",
                  color: "#fff",
                  border: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  justifyContent: "center",
                  margin: 0,
                  width: "40%",
                }}
              >
                Register with LinkedIn
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 448 512"
                  style={{ display: "inline", verticalAlign: "middle" }}
                >
                  <path
                    fill="#fff"
                    d="M100.28 448H7.4V148.9h92.88zm-46.44-340.7C24.09 107.3 0 83.2 0 53.6A53.6 53.6 0 0 1 53.6 0a53.6 53.6 0 0 1 53.6 53.6c0 29.6-24.09 53.7-53.36 53.7zM447.8 448h-92.4V302.4c0-34.7-12.4-58.4-43.3-58.4-23.6 0-37.6 15.9-43.7 31.3-2.3 5.6-2.8 13.4-2.8 21.2V448h-92.5s1.2-242.1 0-267.1h92.4v37.9c12.3-19 34.3-46.1 83.5-46.1 60.9 0 106.7 39.7 106.7 125.2V448z"
                  />
                </svg>
              </button>
            </div>
            <label htmlFor="chk" className="signup-toggle-btn">
              Already have an account? Log In
            </label>
          </form>
        </div>
      </div>
    </>
  );
}
