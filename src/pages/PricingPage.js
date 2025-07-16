import React from "react";
import Header from "../components/Header";
import "../styles/resume.css";
import "../styles/pricing.css";
import "../App.css";

export default function PricingPage() {
  const pricingPlans = [
    {
      name: "Free",
      price: "$0",
      period: "/month",
      description: "Perfect for getting started",
      features: [
        "3 Resume templates",
        "Basic cover letter builder",
        "Job search (limited results)",
        "Email support",
        "Basic interview practice"
      ],
      buttonText: "Get Started Free",
      buttonClass: "btn secondary",
      popular: false
    },
    {
      name: "Pro",
      price: "$19",
      period: "/month",
      description: "Most popular for job seekers",
      features: [
        "Unlimited resume templates",
        "AI-powered cover letter builder",
        "Advanced job search with filters",
        "Priority email support",
        "Full interview practice suite",
        "Application tracking",
        "Resume analytics"
      ],
      buttonText: "Start Pro Trial",
      buttonClass: "btn primary",
      popular: true
    },
    {
      name: "Enterprise",
      price: "$49",
      period: "/month",
      description: "For teams and organizations",
      features: [
        "Everything in Pro",
        "Team collaboration tools",
        "Custom branding",
        "Advanced analytics",
        "Dedicated support",
        "API access",
        "White-label options"
      ],
      buttonText: "Contact Sales",
      buttonClass: "btn secondary",
      popular: false
    }
  ];

  return (
    <div className="pricing-page-wrapper min-h-screen flex flex-col bg-gradient-to-b from-[#003049] via-[#0077b6] to-[#00b4d8]">
      <Header />
      
      <main className="main-content-full">
        <div className="dashboard-gradient-box-full">
          <h1 className="section-title">
            Choose Your <span className="highlight">Plan</span>
          </h1>
          
          <p className="text-center mb-8 text-lg text-gray-600">
            Find the perfect plan to accelerate your career journey
          </p>

          <div className="pricing-grid">
            {pricingPlans.map((plan, index) => (
              <div 
                key={index} 
                className={`pricing-card ${plan.popular ? 'popular' : ''}`}
              >
                {plan.popular && (
                  <div className="popular-badge">Most Popular</div>
                )}
                
                <div className="pricing-header">
                  <h3 className="plan-name">{plan.name}</h3>
                  <div className="price-container">
                    <span className="price">{plan.price}</span>
                    <span className="period">{plan.period}</span>
                  </div>
                  <p className="plan-description">{plan.description}</p>
                </div>

                <ul className="features-list">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="feature-item">
                      <i className="fas fa-check text-green-500 mr-2"></i>
                      {feature}
                    </li>
                  ))}
                </ul>

                <button className={`${plan.buttonClass} w-full mt-6`}>
                  {plan.buttonText}
                </button>
              </div>
            ))}
          </div>

          <div className="pricing-footer mt-12 text-center">
            <p className="text-gray-600 mb-4">
              All plans include a 14-day free trial. No credit card required.
            </p>
            <p className="text-sm text-gray-500">
              Need a custom plan? <a href="#" className="text-blue-600 hover:underline">Contact us</a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
} 