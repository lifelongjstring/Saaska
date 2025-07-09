import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

export default function LoginPage() {
  const [isSignup, setIsSignup] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add("login-page");
    return () => document.body.classList.remove("login-page");
  }, []);

  const handleRegister = () => {
    localStorage.setItem("registrationData", JSON.stringify(registerData));
    alert("Registration successful!");
    setIsSignup(false);
  };

  const handleLogin = () => {
    if (loginData.email.trim() && loginData.password.trim()) {
      // Mock login: just check non-empty fields
      navigate("/dashboard");
    } else {
      alert("Please enter both email and password.");
    }
  };

  return (
    <div className="login-page w-screen h-screen flex items-center justify-center bg-gradient-to-b from-[#003049] via-[#0077b6] to-[#00b4d8] font-[Jost] relative overflow-hidden">
      {/* Logo */}
      <div className="logo-container absolute top-5">
        <img src="icons8-job-80.png" alt="Job Icon" className="logo" />
      </div>

      {/* Main Form Container */}
      <div className="main relative w-[380px] h-[540px] bg-white bg-opacity-10 backdrop-blur-md rounded-xl shadow-2xl overflow-hidden transition-all duration-700">
        {/* Header Toggle */}
        <div className="flex">
          <button
            onClick={() => setIsSignup(false)}
            className={`flex-1 py-4 text-lg font-semibold transition-colors duration-300 ${
              !isSignup
                ? "bg-white bg-opacity-20 text-white border-b-2 border-orange-400"
                : "bg-transparent text-gray-300 hover:text-white"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsSignup(true)}
            className={`flex-1 py-4 text-lg font-semibold transition-colors duration-300 ${
              isSignup
                ? "bg-white bg-opacity-20 text-white border-b-2 border-orange-400"
                : "bg-transparent text-gray-300 hover:text-white"
            }`}
          >
            Signup
          </button>
        </div>

        {/* Sliding Forms */}
        <div
          className={`w-[200%] flex transition-transform duration-700 ease-in-out ${
            isSignup ? "-translate-x-1/2" : "translate-x-0"
          }`}
          style={{ height: "calc(100% - 64px)" }} // adjust for header height
        >
          {/* Login Form */}
          <div className="w-1/2 px-6 flex flex-col justify-center text-white">
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 bg-white bg-opacity-80 text-black rounded"
                value={loginData.email}
                onChange={(e) =>
                  setLoginData({ ...loginData, email: e.target.value })
                }
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 bg-white bg-opacity-80 text-black rounded"
                value={loginData.password}
                onChange={(e) =>
                  setLoginData({ ...loginData, password: e.target.value })
                }
              />
              <button
                type="button"
                onClick={handleLogin}
                className="w-full py-2 bg-orange-500 hover:bg-orange-600 text-white rounded font-semibold"
              >
                Log in
              </button>
            </form>
          </div>

          {/* Signup Form */}
          <div className="w-1/2 px-6 flex flex-col justify-center text-white">
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              <input
                type="text"
                placeholder="Username"
                className="w-full px-4 py-2 bg-white bg-opacity-80 text-black rounded"
                value={registerData.username}
                onChange={(e) =>
                  setRegisterData({ ...registerData, username: e.target.value })
                }
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 bg-white bg-opacity-80 text-black rounded"
                value={registerData.email}
                onChange={(e) =>
                  setRegisterData({ ...registerData, email: e.target.value })
                }
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 bg-white bg-opacity-80 text-black rounded"
                value={registerData.password}
                onChange={(e) =>
                  setRegisterData({
                    ...registerData,
                    password: e.target.value,
                  })
                }
              />
              <button
                type="button"
                onClick={handleRegister}
                className="w-full py-2 bg-orange-500 hover:bg-orange-600 text-white rounded font-semibold"
              >
                Sign up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
