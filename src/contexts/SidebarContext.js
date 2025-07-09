import React, { createContext, useContext, useState, useEffect } from 'react';

const SidebarContext = createContext();

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
};

export const SidebarProvider = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    // Initialize from localStorage, default to false (expanded)
    const saved = localStorage.getItem('sidebarCollapsed');
    return saved ? JSON.parse(saved) : false;
  });

  const toggleSidebar = () => {
    setSidebarCollapsed(prev => !prev);
  };

  // Save to localStorage and update CSS variable whenever the state changes
  useEffect(() => {
    localStorage.setItem('sidebarCollapsed', JSON.stringify(sidebarCollapsed));
    document.body.style.setProperty('--sidebar-width', sidebarCollapsed ? '70px' : '220px');
    document.body.style.setProperty('--main-content-max-width', sidebarCollapsed ? '95vw' : '85vw');
  }, [sidebarCollapsed]);

  const value = {
    sidebarCollapsed,
    toggleSidebar,
    setSidebarCollapsed
  };

  return (
    <SidebarContext.Provider value={value}>
      {children}
    </SidebarContext.Provider>
  );
}; 