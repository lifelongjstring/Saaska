import React from 'react';
import { useUserActivity } from '../contexts/UserActivityContext';

const RecentActivities = () => {
  const { getRecentActivities } = useUserActivity();
  const activities = getRecentActivities(5);

  const getActivityIcon = (type) => {
    switch (type) {
      case 'resume_created':
        return '📄';
      case 'cover_letter_generated':
        return '✉️';
      case 'job_applied':
        return '💼';
      case 'interview_practiced':
        return '🎯';
      case 'page_visited':
        return '👁️';
      default:
        return '📝';
    }
  };

  // Generate descriptive text based on activity type and data

  const getActivityText = (activity) => {
    switch (activity.type) {
      case 'resume_created':
        return `Created resume: ${activity.resumeData?.title || 'Untitled'}`;
      case 'cover_letter_generated':
        return `Generated cover letter for ${activity.letterData?.company || 'Company'}`;
      case 'job_applied':
        return `Applied to ${activity.jobData?.position || 'Position'} at ${activity.jobData?.company || 'Company'}`;
      case 'interview_practiced':
        return `Practiced interview for ${activity.interviewData?.position || 'Position'}`;
      case 'page_visited':
        return `Visited ${activity.page}`;
      default:
        return 'Activity recorded';
    }
  };

  // Format timestamp to "time ago" style
  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - activityTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  if (activities.length === 0) {
    return (
      <div className="no-activities">
        <p>No recent activity to show.</p>
        <p className="activity-hint">Start using the app to see your activity here!</p>
      </div>
    );
  }

  // Display up to 3 recent activities
  return (
    <div className="recent-activities">
      {activities.slice(0, 3).map((activity, idx) => (
        <div key={activity.id} className="activity-item">
          <div className="activity-icon">
            {getActivityIcon(activity.type)}
          </div>
          <div className="activity-details">
            <p className="activity-text">{getActivityText(activity)}</p>
            <span className="activity-time">{formatTimeAgo(activity.timestamp)}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentActivities; 