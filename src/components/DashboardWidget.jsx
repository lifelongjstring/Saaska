import React from 'react';

const DashboardWidget = ({ title, children, className = '', icon, onClick }) => {
  return (
    <div 
      className={`dashboard-widget ${className}`}
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      <div className="widget-header">
        {icon && <span className="widget-icon">{icon}</span>}
        <h3 className="widget-title">{title}</h3>
      </div>
      <div className="widget-content">
        {children}
      </div>
    </div>
  );
};

export default DashboardWidget; 