import React from 'react';

// Props:
// - title: The title text displayed in the widget header
// - children: The main content of the widget (can be any React nodes)
// - className: Optional extra CSS classes for styling
// - icon: Optional React node to render as an icon in the header
// - onClick: Optional click handler for the entire widget
const DashboardWidget = ({ title, children, className = '', icon, onClick }) => {
  return (
    <div 
      className={`dashboard-widget ${className}`} // base + custom styling
      onClick={onClick} // attach click handler if provided
      style={{ cursor: onClick ? 'pointer' : 'default' }} // show pointer only if clickable
    >
      {/* Header section with optional icon and title */}
      <div className="widget-header">
        {icon && <span className="widget-icon">{icon}</span>}
        <h3 className="widget-title">{title}</h3>
      </div>

      {/* Main content area */}
      <div className="widget-content">
        {children}
      </div>
    </div>
  );
};

export default DashboardWidget;
