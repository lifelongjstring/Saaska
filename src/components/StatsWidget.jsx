import React from 'react';
import { useUserActivity } from '../contexts/UserActivityContext';

const StatsWidget = () => {
  const { stats } = useUserActivity();

  const statItems = [
    {
      label: 'Resumes Created',
      value: stats.resumesCreated,
      icon: '📄',
      color: '#4CAF50'
    },
    {
      label: 'Cover Letters',
      value: stats.coverLettersGenerated,
      icon: '✉️',
      color: '#2196F3'
    },
    {
      label: 'Jobs Applied',
      value: stats.jobsApplied,
      icon: '💼',
      color: '#FF9800'
    },
    {
      label: 'Interviews Practiced',
      value: stats.interviewsPracticed,
      icon: '🎯',
      color: '#9C27B0'
    }
  ];

  return (
    <div className="stats-widget" style={{ padding: '32px 24px' }}>
      <div className="stats-grid">
        {statItems.map((item, index) => (
          <div key={index} className="stat-item" style={{ borderLeftColor: item.color }}>
            <div className="stat-icon" style={{ color: item.color }}>
              {item.icon}
            </div>
            <div className="stat-content">
              <div className="stat-value">{item.value}</div>
              <div className="stat-label">{item.label}</div>
            </div>
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default StatsWidget; 