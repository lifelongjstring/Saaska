import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * HomePage component displays the landing page with hero, features, and navigation.
 * @returns {JSX.Element} The rendered home page.
 * @precondition Should be used within a React Router context.
 */
export default function HomePage() {
  const [selectedService, setSelectedService] = useState("ai-tools.html");
  const navigate = useNavigate();

  /**
   * Handles navigation to the selected service.
   * @returns {void}
   * @precondition selectedService must be a valid route string.
   */
  const handleNavigation = () => {
    if (selectedService) {
      navigate(`/${selectedService}`);
    }
  };

  // ... (rest of the code remains unchanged)
} 