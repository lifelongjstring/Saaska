import React from "react";
import logo from "./icons8-job-80.png"; // relative to Header.jsx

/**
 * Header component displays the site navigation and logo.
 * @returns {JSX.Element} The rendered header.
 * @precondition Should be used at the top of a page layout.
 */
const Header = () => {
  return (
    <header className="flex justify-between items-center px-8 py-4 bg-white bg-opacity-20 backdrop-blur-md rounded-2xl shadow-lg mt-4 mx-auto max-w-4xl">
      <div className="logo flex items-center space-x-3">
        <img src={logo} alt="SaaSKa Logo" className="w-10 h-10" />
        <h1 className="text-2xl font-bold text-white drop-shadow">SaaSka</h1>
      </div>
      <nav className="nav-links flex items-center space-x-6 text-base text-white">
        <a href="/" className="hover:underline text-white">Home</a>
        <a href="/features" className="hover:underline text-white">Features</a>
        <a href="/pricing" className="hover:underline text-white">Pricing</a>
        <div className="dropdown">
          <select defaultValue="iPathPro" className="bg-white bg-opacity-30 rounded px-2 py-1" style={{ color: 'white', backgroundColor: 'rgba(255,255,255,0.2)' }}>
            <option value="iPathPro">iPathPro</option>
            <option value="Free">Free</option>
            <option value="Pro">Pro</option>
          </select>
        </div>
        <a href="/login" className="hover:underline text-white">Login / Sign Up</a>
      </nav>
    </header>
  );
};

export default Header;
