// NOTE: This login logic is a placeholder for development/demo purposes only.
// Before going live, replace with real API validation or backend authentication.

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css"; // This should contain the CSS you pasted

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
    <div className="main">
      <input type="checkbox" id="chk" aria-hidden="true" />

      {/* Signup form */}
      <div className="signup">
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
          <button type="submit" onClick={handleRegister}>
            Sign up
          </button>
        </form>
      </div>

      {/* Login form */}
      <div className="login">
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
        </form>
      </div>
    </div>
  );
}
