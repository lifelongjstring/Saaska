# Database Schema for SaaSka Career Platform

## Overview
This document outlines the complete database schema required for the SaaSka Career Platform backend. The schema is designed to support all frontend features including user management, resume building, cover letter generation, job applications, and user activity tracking.

## Database Technology
- **Primary Database**: PostgreSQL 15+
- **Cache Database**: Redis 7+
- **File Storage**: AWS S3 or local file system

## Core Tables

### 1. Users Table
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    profile_picture_url VARCHAR(500),
    subscription_tier VARCHAR(20) DEFAULT 'free' CHECK (subscription_tier IN ('free', 'basic', 'premium')),
    subscription_status VARCHAR(20) DEFAULT 'active' CHECK (subscription_status IN ('active', 'cancelled', 'expired')),
    subscription_expires_at TIMESTAMP,
    email_verified BOOLEAN DEFAULT FALSE,
    email_verification_token VARCHAR(255),
    reset_password_token VARCHAR(255),
    reset_password_expires_at TIMESTAMP,
    last_login_at TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_subscription_tier ON users(subscription_tier);
CREATE INDEX idx_users_created_at ON users(created_at);
```

### 2. User Preferences Table
```sql
CREATE TABLE user_preferences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    theme VARCHAR(20) DEFAULT 'light',
    language VARCHAR(10) DEFAULT 'en',
    timezone VARCHAR(50) DEFAULT 'UTC',
    notification_email BOOLEAN DEFAULT TRUE,
    notification_push BOOLEAN DEFAULT TRUE,
    privacy_level VARCHAR(20) DEFAULT 'private',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_user_preferences_user_id ON user_preferences(user_id);
```

### 3. Resumes Table
```sql
CREATE TABLE resumes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    template VARCHAR(100) NOT NULL,
    personal_info JSONB NOT NULL,
    work_experience JSONB DEFAULT '[]',
    education JSONB DEFAULT '[]',
    skills JSONB DEFAULT '[]',
    summary TEXT,
    is_public BOOLEAN DEFAULT FALSE,
    is_template BOOLEAN DEFAULT FALSE,
    download_count INTEGER DEFAULT 0,
    last_downloaded_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_resumes_user_id ON resumes(user_id);
CREATE INDEX idx_resumes_template ON resumes(template);
CREATE INDEX idx_resumes_created_at ON resumes(created_at);
CREATE INDEX idx_resumes_is_public ON resumes(is_public);
```

### 4. Cover Letters Table
```sql
CREATE TABLE cover_letters (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    template VARCHAR(100) NOT NULL,
    company_name VARCHAR(255) NOT NULL,
    job_title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    personal_info JSONB NOT NULL,
    is_template BOOLEAN DEFAULT FALSE,
    download_count INTEGER DEFAULT 0,
    last_downloaded_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_cover_letters_user_id ON cover_letters(user_id);
CREATE INDEX idx_cover_letters_template ON cover_letters(template);
CREATE INDEX idx_cover_letters_company_name ON cover_letters(company_name);
```

### 5. Job Applications Table
```sql
CREATE TABLE job_applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    company VARCHAR(255) NOT NULL,
    position VARCHAR(255) NOT NULL,
    status VARCHAR(20) DEFAULT 'Applied' CHECK (status IN ('Applied', 'Interview', 'Offer', 'Rejected', 'Hired')),
    date_applied DATE NOT NULL,
    interview_date TIMESTAMP,
    city VARCHAR(100),
    state VARCHAR(50),
    country VARCHAR(100) DEFAULT 'United States',
    offer_salary DECIMAL(10,2),
    offer_currency VARCHAR(3) DEFAULT 'USD',
    resume_id UUID REFERENCES resumes(id),
    cover_letter_id UUID REFERENCES cover_letters(id),
    job_description TEXT,
    notes TEXT,
    source VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_job_applications_user_id ON job_applications(user_id);
CREATE INDEX idx_job_applications_status ON job_applications(status);
CREATE INDEX idx_job_applications_company ON job_applications(company);
CREATE INDEX idx_job_applications_date_applied ON job_applications(date_applied);
CREATE INDEX idx_job_applications_city_state ON job_applications(city, state);
```

### 6. User Activities Table
```sql
CREATE TABLE user_activities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL,
    feature VARCHAR(50),
    details JSONB DEFAULT '{}',
    duration INTEGER, -- in seconds
    ip_address INET,
    user_agent TEXT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_user_activities_user_id ON user_activities(user_id);
CREATE INDEX idx_user_activities_type ON user_activities(type);
CREATE INDEX idx_user_activities_feature ON user_activities(feature);
CREATE INDEX idx_user_activities_timestamp ON user_activities(timestamp);
```

### 7. Templates Table
```sql
CREATE TABLE templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    type VARCHAR(20) NOT NULL CHECK (type IN ('resume', 'cover_letter')),
    category VARCHAR(50),
    thumbnail_url VARCHAR(500),
    preview_url VARCHAR(500),
    config JSONB NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    is_premium BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_templates_type ON templates(type);
CREATE INDEX idx_templates_category ON templates(category);
CREATE INDEX idx_templates_is_active ON templates(is_active);
```

### 8. Saved Jobs Table
```sql
CREATE TABLE saved_jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    external_job_id VARCHAR(255),
    company VARCHAR(255) NOT NULL,
    position VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    salary_min DECIMAL(10,2),
    salary_max DECIMAL(10,2),
    salary_currency VARCHAR(3) DEFAULT 'USD',
    job_description TEXT,
    requirements TEXT,
    benefits TEXT,
    source VARCHAR(100),
    url VARCHAR(500),
    applied BOOLEAN DEFAULT FALSE,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_saved_jobs_user_id ON saved_jobs(user_id);
CREATE INDEX idx_saved_jobs_company ON saved_jobs(company);
CREATE INDEX idx_saved_jobs_applied ON saved_jobs(applied);
```

### 9. Interview Practice Sessions Table
```sql
CREATE TABLE interview_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    job_title VARCHAR(255),
    company VARCHAR(255),
    questions JSONB DEFAULT '[]',
    answers JSONB DEFAULT '[]',
    feedback JSONB DEFAULT '{}',
    score INTEGER CHECK (score >= 0 AND score <= 100),
    duration INTEGER, -- in seconds
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP
);

-- Indexes
CREATE INDEX idx_interview_sessions_user_id ON interview_sessions(user_id);
CREATE INDEX idx_interview_sessions_job_title ON interview_sessions(job_title);
CREATE INDEX idx_interview_sessions_completed ON interview_sessions(completed);
```

### 10. Subscriptions Table
```sql
CREATE TABLE subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    stripe_subscription_id VARCHAR(255) UNIQUE,
    stripe_customer_id VARCHAR(255),
    plan_type VARCHAR(20) NOT NULL CHECK (plan_type IN ('free', 'basic', 'premium')),
    status VARCHAR(20) NOT NULL CHECK (status IN ('active', 'cancelled', 'past_due', 'unpaid')),
    current_period_start TIMESTAMP,
    current_period_end TIMESTAMP,
    cancel_at_period_end BOOLEAN DEFAULT FALSE,
    cancelled_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX idx_subscriptions_stripe_subscription_id ON subscriptions(stripe_subscription_id);
CREATE INDEX idx_subscriptions_status ON subscriptions(status);
```

## JSONB Schema Examples

### Personal Info Structure
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "location": "San Francisco, CA",
  "linkedin": "https://linkedin.com/in/johndoe",
  "github": "https://github.com/johndoe",
  "website": "https://johndoe.com",
  "summary": "Experienced software engineer..."
}
```

### Work Experience Structure
```json
[
  {
    "id": "exp_1",
    "company": "Tech Corp",
    "position": "Senior Software Engineer",
    "location": "San Francisco, CA",
    "startDate": "2022-01-01",
    "endDate": "2024-01-01",
    "current": false,
    "description": "Led development of...",
    "achievements": ["Increased performance by 40%", "Mentored 5 junior developers"],
    "technologies": ["React", "Node.js", "PostgreSQL"]
  }
]
```

### Skills Structure
```json
[
  {
    "name": "JavaScript",
    "level": "Expert",
    "years": 5,
    "category": "Programming Languages"
  },
  {
    "name": "React",
    "level": "Advanced",
    "years": 3,
    "category": "Frameworks"
  }
]
```

## Database Migrations

### Initial Migration
```sql
-- Create extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- Create tables in order (respecting foreign key constraints)
-- Users table first, then dependent tables
```

### Sample Migration Script
```sql
-- Migration: 001_initial_schema.sql
-- Date: 2024-01-15
-- Description: Initial database schema creation

BEGIN;

-- Create users table
CREATE TABLE users (
    -- ... table definition
);

-- Create other tables
-- ... additional table definitions

-- Create indexes
-- ... index definitions

COMMIT;
```

## Data Seeding

### Sample Data Scripts
```sql
-- Insert default templates
INSERT INTO templates (name, type, category, config) VALUES
('Modern Professional', 'resume', 'professional', '{"layout": "modern", "colors": ["#2563eb", "#1e40af"]}'),
('Classic Elegant', 'resume', 'elegant', '{"layout": "classic", "colors": ["#374151", "#6b7280"]}');

-- Insert sample users (for development)
INSERT INTO users (email, password_hash, first_name, last_name) VALUES
('demo@saaska.com', '$2b$12$...', 'Demo', 'User');
```

## Performance Considerations

### Indexing Strategy
- Primary keys on all tables
- Foreign key indexes for join performance
- Composite indexes for common query patterns
- Partial indexes for filtered queries

### Partitioning Strategy
- User activities table partitioned by month
- Large tables partitioned by user_id ranges

### Caching Strategy
- Redis for session storage
- Redis for frequently accessed data
- Database query result caching

## Backup and Recovery
- Daily automated backups
- Point-in-time recovery capability
- Cross-region backup replication
- Backup encryption at rest

## Security Considerations
- Row-level security (RLS) for multi-tenant data
- Encrypted sensitive fields
- Audit logging for all data modifications
- Regular security updates and patches
