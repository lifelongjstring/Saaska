import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserActivity } from '../contexts/UserActivityContext';

const QuickActions = () => {
  const navigate = useNavigate();
  const { stats, getActivityByFeature } = useUserActivity();

  const getQuickActions = () => {
    const actions = [];
    
    // Always show core actions
    actions.push({
      label: 'Create Resume',
      icon: '📄',
      path: '/resume-maker-page',
      color: '#4CAF50'
    });
    
    actions.push({
      label: 'Generate Cover Letter',
      icon: '✉️',
      path: '/cover-letter-maker-page',
      color: '#2196F3'
    });
    
    actions.push({
      label: 'Search Jobs',
      icon: '💼',
      path: '/job-search',
      color: '#FF9800'
    });
    
    actions.push({
      label: 'Practice Interview',
      icon: '🎯',
      path: '/interviews',
      color: '#9C27B0'
    });

    // Add contextual actions based on user activity
    if (stats.resumesCreated > 0) {
      actions.push({
        label: 'View Resumes',
        icon: '📋',
        path: '/resume',
        color: '#607D8B'
      });
    }

    if (stats.coverLettersGenerated > 0) {
      actions.push({
        label: 'View Cover Letters',
        icon: '📝',
        path: '/cover_letter',
        color: '#795548'
      });
    }

    if (stats.jobsApplied > 0) {
      actions.push({
        label: 'Applications',
        icon: '📊',
        path: '/applications',
        color: '#E91E63'
      });
    }

    return actions;
  };

  const handleActionClick = (path) => {
    navigate(path);
  };

  const actions = getQuickActions();

  return (
    <div className="quick-actions">
      <h3>Quick Actions</h3>
      <div className="actions-grid">
        {actions.map((action, index) => (
          <button
            key={index}
            className="action-button"
            onClick={() => handleActionClick(action.path)}
            style={{ 
              borderLeftColor: action.color,
              '--hover-color': action.color
            }}
          >
            <span className="action-icon">{action.icon}</span>
            <span className="action-label">{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions; 