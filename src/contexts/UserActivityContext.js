import React, { createContext, useContext, useState, useEffect } from 'react';

const UserActivityContext = createContext();

export const useUserActivity = () => {
  const context = useContext(UserActivityContext);
  if (!context) {
    throw new Error('useUserActivity must be used within a UserActivityProvider');
  }
  return context;
};

export const UserActivityProvider = ({ children }) => {
  // --- SESSION REFRESH LOGIC ---
  const [activities, setActivities] = useState(() => {
    // If this is a new session, clear activities
    if (!sessionStorage.getItem('sessionStarted')) {
      sessionStorage.setItem('sessionStarted', 'true');
      localStorage.removeItem('userActivities');
      return [];
    }
    const saved = localStorage.getItem('userActivities');
    return saved ? JSON.parse(saved) : [];
  });

  // Trim activities to 5 on mount if needed (avoids infinite recursion)
  useEffect(() => {
    if (activities.length > 5) {
      setActivities(activities.slice(0, 5));
    }
    // Only run on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [stats, setStats] = useState({
    resumesCreated: 0,
    coverLettersGenerated: 0,
    jobsApplied: 0,
    interviewsPracticed: 0,
    lastActive: null,
    totalTimeSpent: 0,
    favoriteFeatures: []
  });

  // Save activities to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('userActivities', JSON.stringify(activities));
  }, [activities]);

  // Update stats based on activities
  useEffect(() => {
    const newStats = {
      resumesCreated: activities.filter(a => a.type === 'resume_created').length,
      coverLettersGenerated: activities.filter(a => a.type === 'cover_letter_generated').length,
      jobsApplied: activities.filter(a => a.type === 'job_applied').length,
      interviewsPracticed: activities.filter(a => a.type === 'interview_practiced').length,
      lastActive: activities.length > 0 ? activities[0].timestamp : null,
      totalTimeSpent: activities.reduce((total, activity) => total + (activity.duration || 0), 0),
      favoriteFeatures: getFavoriteFeatures()
    };
    setStats(newStats);
  }, [activities, getFavoriteFeatures]);

  const getFavoriteFeatures = () => {
    const featureCounts = {};
    activities.forEach(activity => {
      if (activity.feature) {
        featureCounts[activity.feature] = (featureCounts[activity.feature] || 0) + 1;
      }
    });
    return Object.entries(featureCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3)
      .map(([feature]) => feature);
  };

  const addActivity = (type, details = {}) => {
    let uniqueId;
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      uniqueId = crypto.randomUUID();
    } else {
      uniqueId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }
    const newActivity = {
      id: uniqueId,
      type,
      timestamp: new Date().toISOString(),
      ...details
    };
    setActivities(prev => [newActivity, ...prev.slice(0, 4)]); // Keep last 5 activities
  };

  const trackPageVisit = (page) => {
    addActivity('page_visited', { page });
  };

  const trackResumeCreated = (resumeData) => {
    addActivity('resume_created', { 
      feature: 'resume_maker',
      resumeData: { title: resumeData.title, template: resumeData.template }
    });
  };

  const trackCoverLetterGenerated = (letterData) => {
    addActivity('cover_letter_generated', { 
      feature: 'cover_letter_maker',
      letterData: { company: letterData.company, position: letterData.position }
    });
  };

  const trackJobApplied = (jobData) => {
    addActivity('job_applied', { 
      feature: 'job_search',
      jobData: { company: jobData.company, position: jobData.position }
    });
  };

  const trackInterviewPracticed = (interviewData) => {
    addActivity('interview_practiced', { 
      feature: 'interview_practice',
      interviewData: { industry: interviewData.industry, position: interviewData.position }
    });
  };

  const trackTimeSpent = (feature, duration) => {
    addActivity('time_spent', { feature, duration });
  };

  const getRecentActivities = (limit = 5) => {
    return activities.slice(0, limit);
  };

  const getActivityByType = (type) => {
    return activities.filter(activity => activity.type === type);
  };

  const getActivityByFeature = (feature) => {
    return activities.filter(activity => activity.feature === feature);
  };

  const clearActivities = () => {
    setActivities([]);
  };

  const value = {
    activities,
    stats,
    addActivity,
    trackPageVisit,
    trackResumeCreated,
    trackCoverLetterGenerated,
    trackJobApplied,
    trackInterviewPracticed,
    trackTimeSpent,
    getRecentActivities,
    getActivityByType,
    getActivityByFeature,
    clearActivities
  };

  return (
    <UserActivityContext.Provider value={value}>
      {children}
    </UserActivityContext.Provider>
  );
}; 