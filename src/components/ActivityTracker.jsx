import React, { useEffect, useRef } from 'react';
import { useUserActivity } from '../contexts/UserActivityContext';

const ActivityTracker = ({ feature, pageName }) => {
  const { trackTimeSpent } = useUserActivity();
  const startTime = useRef(Date.now());
  const intervalRef = useRef(null);

  useEffect(() => {
    // Start tracking time when component mounts
    startTime.current = Date.now();
    
    // Track time every 30 seconds
    intervalRef.current = setInterval(() => {
      const timeSpent = Math.floor((Date.now() - startTime.current) / 1000 / 60); // in minutes
      if (timeSpent > 0) {
        trackTimeSpent(feature, timeSpent);
      }
    }, 30000); // 30 seconds

    // Cleanup function to track final time when component unmounts
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      
      const totalTimeSpent = Math.floor((Date.now() - startTime.current) / 1000 / 60); // in minutes
      if (totalTimeSpent > 0) {
        trackTimeSpent(feature, totalTimeSpent);
      }
    };
  }, [feature, trackTimeSpent]);

  // This component doesn't render anything visible
  return null;
};

export default ActivityTracker; 