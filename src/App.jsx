import React from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Footer from "./components/Footer";
import "./App.css"; // import your CSS
import "./mobile.css"; // import mobile-specific styles

function App() {
  return (
    <div className="container">
      <Header />
      <Hero />
      <Features />
      <Footer />
    </div>
  );
}

export default App;
