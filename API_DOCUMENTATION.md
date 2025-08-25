# API Documentation for SaaSka Career Platform

## Overview
This document outlines the API requirements for the SaaSka Career Platform frontend. The backend should implement these endpoints to support all frontend functionality.

## Base URL
- Development: `http://localhost:8000/api`
- Production: `https://api.saaska.com/api`

## Authentication
All protected endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <jwt_token>
```

## Data Models

### User
```typescript
interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  profilePicture?: string;
  createdAt: string;
  updatedAt: string;
  subscription: 'free' | 'basic' | 'premium';
  preferences: UserPreferences;
}
```

### Resume
```typescript
interface Resume {
  id: string;
  userId: string;
  title: string;
  template: string;
  personalInfo: PersonalInfo;
  workExperience: WorkExperience[];
  education: Education[];
  skills: Skill[];
  summary?: string;
  createdAt: string;
  updatedAt: string;
  isPublic: boolean;
  lastDownloaded?: string;
}
```

### Cover Letter
```typescript
interface CoverLetter {
  id: string;
  userId: string;
  title: string;
  template: string;
  companyName: string;
  jobTitle: string;
  content: string;
  personalInfo: PersonalInfo;
  createdAt: string;
  updatedAt: string;
}
```

### Job Application
```typescript
interface JobApplication {
  id: string;
  userId: string;
  company: string;
  position: string;
  status: 'Applied' | 'Interview' | 'Offer' | 'Rejected' | 'Hired';
  dateApplied: string;
  interviewDate?: string;
  city: string;
  state: string;
  offerSalary?: number;
  resumeId?: string;
  coverLetterId?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}
```

### User Activity
```typescript
interface UserActivity {
  id: string;
  userId: string;
  type: 'resume_created' | 'cover_letter_generated' | 'job_applied' | 'interview_practiced' | 'page_visited' | 'time_spent';
  timestamp: string;
  feature?: string;
  details?: Record<string, any>;
  duration?: number;
}
```

## API Endpoints

### Authentication
```
POST /auth/register
POST /auth/login
POST /auth/logout
POST /auth/refresh
POST /auth/forgot-password
POST /auth/reset-password
GET  /auth/me
```

### Users
```
GET    /users/:id
PUT    /users/:id
DELETE /users/:id
PUT    /users/:id/avatar
GET    /users/:id/statistics
```

### Resumes
```
GET    /resumes
POST   /resumes
GET    /resumes/:id
PUT    /resumes/:id
DELETE /resumes/:id
POST   /resumes/:id/duplicate
POST   /resumes/:id/export
GET    /resumes/:id/preview
```

### Cover Letters
```
GET    /cover-letters
POST   /cover-letters
GET    /cover-letters/:id
PUT    /cover-letters/:id
DELETE /cover-letters/:id
POST   /cover-letters/:id/duplicate
POST   /cover-letters/:id/export
```

### Job Applications
```
GET    /applications
POST   /applications
GET    /applications/:id
PUT    /applications/:id
DELETE /applications/:id
PUT    /applications/:id/status
GET    /applications/statistics
```

### User Activities
```
GET    /activities
POST   /activities
GET    /activities/statistics
DELETE /activities
```

### Job Search (External API Integration)
```
These endpoints proxy/search jobs from an external job search provider (currently Adzuna API).
The API key is configured via environment variables.
GET    /jobs/search
GET    /jobs/:id
GET    /jobs/saved
POST   /jobs/save
DELETE /jobs/saved/:id
```

### Templates
```
GET    /templates/resumes
GET    /templates/cover-letters
GET    /templates/:id
```

## Request/Response Examples

### Create Resume
**Request:**
```http
POST /api/resumes
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Software Engineer Resume",
  "template": "modern",
  "personalInfo": {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "location": "San Francisco, CA"
  },
  "workExperience": [...],
  "education": [...],
  "skills": [...]
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "res_123",
    "title": "Software Engineer Resume",
    "template": "modern",
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  }
}
```

### Get User Statistics
**Request:**
```http
GET /api/users/me/statistics
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "resumesCreated": 5,
    "coverLettersGenerated": 3,
    "jobsApplied": 12,
    "interviewsPracticed": 8,
    "lastActive": "2024-01-15T10:30:00Z",
    "totalTimeSpent": 3600,
    "favoriteFeatures": ["resume_maker", "job_search", "interview_practice"]
  }
}
```

## Error Handling
All API responses follow this structure:
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": {
      "field": "email",
      "message": "Email is required"
    }
  }
}
```

Common error codes:
- `VALIDATION_ERROR`: Invalid input data
- `UNAUTHORIZED`: Authentication required
- `FORBIDDEN`: Insufficient permissions
- `NOT_FOUND`: Resource not found
- `INTERNAL_ERROR`: Server error

## Rate Limiting
- Free tier: 100 requests/hour
- Basic tier: 1000 requests/hour
- Premium tier: 10000 requests/hour

## File Upload
- Resume/Cover Letter exports: PDF, DOCX
- Profile pictures: JPG, PNG (max 5MB)
- Resume templates: JSON format

## WebSocket Events (Real-time features)
- Resume collaboration updates
- Job application status changes
- Interview practice feedback

## Testing
- Postman collection available in `/docs/postman`
- Swagger documentation at `/docs/api`
- Test data seeding scripts available
