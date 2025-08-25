# Frontend Integration Guide for Backend Developers

## Overview
This guide explains how to integrate your backend API with the existing React frontend. The frontend is currently using localStorage for data persistence and needs to be connected to your backend services.

## Current Frontend Architecture

### State Management
- **Context API**: Used for user activity tracking and sidebar state
- **Local State**: Component-level state for forms and UI
- **LocalStorage**: Currently used for data persistence (to be replaced with API calls)

### Key Components to Integrate

#### 1. User Authentication
**Current Implementation**: No authentication system
**Backend Requirements**: JWT-based authentication with refresh tokens

**Components to Update**:
- `src/LoginPage.jsx` - Add login/register forms
- `src/components/Header.jsx` - Add user menu and logout
- `src/contexts/UserActivityContext.js` - Add user ID to activities

**Integration Points**:
```javascript
// Add to UserActivityContext.js
const [user, setUser] = useState(null);
const [isAuthenticated, setIsAuthenticated] = useState(false);

// Add authentication methods
const login = async (credentials) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  });
  const data = await response.json();
  if (data.success) {
    setUser(data.data.user);
    setIsAuthenticated(true);
    localStorage.setItem('token', data.data.token);
  }
};
```

#### 2. Resume Management
**Current Implementation**: Form components with local state
**Backend Requirements**: CRUD operations for resumes

**Components to Update**:
- `src/components/PersonalInfoForm.jsx`
- `src/components/WorkExperienceForm.jsx`
- `src/components/EducationForm.jsx`
- `src/components/SkillsForm.jsx`

**Integration Points**:
```javascript
// Replace localStorage with API calls
const saveResume = async (resumeData) => {
  const token = localStorage.getItem('token');
  const response = await fetch('/api/resumes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(resumeData)
  });
  return response.json();
};
```

#### 3. Cover Letter Management
**Current Implementation**: Form components for cover letter creation
**Backend Requirements**: CRUD operations for cover letters

**Components to Update**:
- `src/components/CLLetterDetailsForm.jsx`
- `src/components/CLLetterBodyForm.jsx`
- `src/components/CLPersonalInfoForm.jsx`

#### 4. Job Applications Tracking
**Current Implementation**: `src/components/ApplicationsTable.jsx` with localStorage
**Backend Requirements**: CRUD operations for job applications

**Current Data Structure** (from `makeApplicationData.ts`):
```typescript
export type Application = {
  company: string;
  title: string;
  status: 'Applied' | 'Interview' | 'Offer' | 'Rejected' | 'Hired';
  dateApplied: string;
  interviewDate?: string;
  city: string;
  state: string;
  offerSalary?: number;
};
```

**Integration Points**:
```javascript
// Replace getApplicationsFromLocalStorage() with API call
const fetchApplications = async () => {
  const token = localStorage.getItem('token');
  const response = await fetch('/api/applications', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response.json();
};
```

#### 5. User Activity Tracking
**Current Implementation**: `src/contexts/UserActivityContext.js` with localStorage
**Backend Requirements**: Activity logging and analytics

**Current Features**:
- Resume creation tracking
- Cover letter generation tracking
- Job application tracking
- Interview practice tracking
- Page visit tracking
- Time spent tracking

**Integration Points**:
```javascript
// Replace localStorage with API calls
const logActivity = async (activityData) => {
  const token = localStorage.getItem('token');
  await fetch('/api/activities', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(activityData)
  });
};
```

## Required Frontend Changes

### 1. Add Authentication Context
Create `src/contexts/AuthContext.js`:
```javascript
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await fetch('/api/auth/me', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.ok) {
          const data = await response.json();
          setUser(data.data);
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem('token');
        }
      } catch (error) {
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  };

  const login = async (credentials) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    const data = await response.json();
    if (data.success) {
      setUser(data.data.user);
      setIsAuthenticated(true);
      localStorage.setItem('token', data.data.token);
      return { success: true };
    }
    return { success: false, error: data.error.message };
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('token');
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
```

### 2. Add API Service Layer
Create `src/services/api.js`:
```javascript
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  getHeaders() {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    };
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: this.getHeaders(),
      ...options
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error?.message || 'API request failed');
      }
      
      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Resume endpoints
  async getResumes() {
    return this.request('/resumes');
  }

  async createResume(resumeData) {
    return this.request('/resumes', {
      method: 'POST',
      body: JSON.stringify(resumeData)
    });
  }

  async updateResume(id, resumeData) {
    return this.request(`/resumes/${id}`, {
      method: 'PUT',
      body: JSON.stringify(resumeData)
    });
  }

  async deleteResume(id) {
    return this.request(`/resumes/${id}`, {
      method: 'DELETE'
    });
  }

  // Cover letter endpoints
  async getCoverLetters() {
    return this.request('/cover-letters');
  }

  async createCoverLetter(coverLetterData) {
    return this.request('/cover-letters', {
      method: 'POST',
      body: JSON.stringify(coverLetterData)
    });
  }

  // Job applications endpoints
  async getApplications() {
    return this.request('/applications');
  }

  async createApplication(applicationData) {
    return this.request('/applications', {
      method: 'POST',
      body: JSON.stringify(applicationData)
    });
  }

  async updateApplication(id, applicationData) {
    return this.request(`/applications/${id}`, {
      method: 'PUT',
      body: JSON.stringify(applicationData)
    });
  }

  // User activities endpoints
  async logActivity(activityData) {
    return this.request('/activities', {
      method: 'POST',
      body: JSON.stringify(activityData)
    });
  }

  async getActivityStats() {
    return this.request('/activities/statistics');
  }
}

export const apiService = new ApiService();
```

### 3. Update App.jsx to Include Auth Provider
```javascript
import React from "react";
import { AuthProvider } from "./contexts/AuthContext";
import { UserActivityProvider } from "./contexts/UserActivityContext";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Footer from "./components/Footer";
import "./App.css";
import "./mobile.css";

function App() {
  return (
    <AuthProvider>
      <UserActivityProvider>
        <div className="container">
          <Header />
          <Hero />
          <Features />
          <Footer />
        </div>
      </UserActivityProvider>
    </AuthProvider>
  );
}

export default App;
```

### 4. Add Protected Route Component
Create `src/components/ProtectedRoute.jsx`:
```javascript
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
```

## Environment Variables

Add to your `.env` file:
```bash
REACT_APP_API_BASE_URL=http://localhost:8000/api
REACT_APP_ENVIRONMENT=development
```

## Testing the Integration

### 1. Start Backend Server
```bash
cd backend
npm start
# Server should run on http://localhost:8000
```

### 2. Update Frontend Environment
```bash
# In frontend directory
echo "REACT_APP_API_BASE_URL=http://localhost:8000/api" > .env
```

### 3. Test API Endpoints
Use the provided Postman collection or test with curl:
```bash
# Test health check
curl http://localhost:8000/api/health

# Test authentication
curl -X POST http://localhost:8000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","firstName":"Test","lastName":"User"}'
```

## Common Integration Issues

### 1. CORS Errors
Ensure your backend has CORS configured:
```javascript
// Backend CORS configuration
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}));
```

### 2. Authentication Token Issues
- Check token expiration
- Verify token format in Authorization header
- Ensure refresh token logic is working

### 3. Data Format Mismatches
- Verify JSON structure matches between frontend and backend
- Check date format handling
- Ensure nested object structures are consistent

## Performance Considerations

### 1. API Response Caching
Implement caching for frequently accessed data:
```javascript
// In api.js
const cache = new Map();

async getResumes() {
  const cacheKey = 'resumes';
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }
  
  const data = await this.request('/resumes');
  cache.set(cacheKey, data);
  return data;
}
```

### 2. Optimistic Updates
Update UI immediately while API call is in progress:
```javascript
const [resumes, setResumes] = useState([]);

const addResume = async (resumeData) => {
  // Optimistic update
  const tempResume = { ...resumeData, id: Date.now(), temp: true };
  setResumes(prev => [tempResume, ...prev]);
  
  try {
    const response = await apiService.createResume(resumeData);
    // Replace temp resume with real one
    setResumes(prev => prev.map(r => 
      r.temp ? response.data : r
    ));
  } catch (error) {
    // Remove temp resume on error
    setResumes(prev => prev.filter(r => !r.temp));
  }
};
```

## Next Steps

1. **Implement Authentication**: Start with login/register functionality
2. **Connect Resume Builder**: Replace localStorage with API calls
3. **Add Job Applications**: Connect the applications table
4. **Implement Activity Tracking**: Log user actions to backend
5. **Add Error Handling**: Implement proper error boundaries and user feedback
6. **Testing**: Add integration tests for API calls
7. **Performance**: Implement caching and optimization strategies
