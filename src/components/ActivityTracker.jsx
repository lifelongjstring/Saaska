import React, { useEffect, useRef } from 'react';
import { useUserActivity } from '../contexts/UserActivityContext';

/**
 * @description A silent component that tracks user time spent on specific features/pages.
 * @dependencies 
 * - React's useEffect, useRef hooks
 * - UserActivityContext for tracking functionality
 */

const ActivityTracker = ({ feature, pageName }) => {
  const { trackTimeSpent } = useUserActivity();
  
  const startTime = useRef(Date.now());
  const intervalRef = useRef(null);  

  useEffect(() => {
    // Start fresh timer when component mounts or feature changes
    startTime.current = Date.now();

    intervalRef.current = setInterval(() => {
      const timeSpent = Math.floor((Date.now() - startTime.current) / 1000 / 60); // Convert ms to minutes
      
      if (timeSpent > 0) {
        trackTimeSpent(feature, timeSpent);
      }
    }, 30000); // Report every 30 seconds

    /**
     * Cleanup function - runs when component unmounts or dependencies change
     * Clears the interval to prevent memory leaks
     * Reports the final total time spent
     */
    return () => {
      // Clear the interval if it exists
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      
      // Calculate and report total time spent
      const totalTimeSpent = Math.floor((Date.now() - startTime.current) / 1000 / 60);
      if (totalTimeSpent > 0) {
        trackTimeSpent(feature, totalTimeSpent);
      }
    };
  }, [feature, trackTimeSpent]); // Only re-run if feature or trackTimeSpent changes
  return null;
};

export default ActivityTracker;