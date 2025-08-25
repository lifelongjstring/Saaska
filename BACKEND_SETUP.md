# Backend Setup Guide for SaaSka Career Platform

## Overview
This guide provides step-by-step instructions for setting up the backend infrastructure for the SaaSka Career Platform. The backend will be built with Node.js/Express and PostgreSQL.

## Prerequisites

### Required Software
- **Node.js**: Version 18+ (LTS recommended)
- **PostgreSQL**: Version 15+
- **Redis**: Version 7+
- **Git**: For version control
- **Docker**: Optional, for containerized development

### System Requirements
- **RAM**: Minimum 4GB, Recommended 8GB+
- **Storage**: Minimum 10GB free space
- **OS**: macOS, Linux, or Windows (WSL recommended for Windows)

## Project Structure

```
backend/
├── src/
│   ├── config/           # Configuration files
│   ├── controllers/      # Route controllers
│   ├── middleware/       # Custom middleware
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   ├── services/        # Business logic
│   ├── utils/           # Utility functions
│   └── app.js          # Main application file
├── tests/               # Test files
├── docs/                # API documentation
├── scripts/             # Database scripts
├── .env.example         # Environment variables template
├── package.json         # Dependencies and scripts
└── README.md            # Project documentation
```

## Step 1: Initialize Backend Project

### 1.1 Create Project Directory
```bash
mkdir saaska-backend
cd saaska-backend
npm init -y
```

### 1.2 Install Core Dependencies
```bash
npm install express cors helmet morgan dotenv bcryptjs jsonwebtoken
npm install pg redis multer aws-sdk nodemailer
npm install joi moment lodash uuid
```

### 1.3 Install Development Dependencies
```bash
npm install --save-dev nodemon jest supertest
npm install --save-dev eslint prettier
npm install --save-dev @types/node @types/express
```

### 1.4 Create Package.json Scripts
```json
{
  "scripts": {
    "start": "node src/app.js",
    "dev": "nodemon src/app.js",
    "test": "jest",
    "test:watch": "jest --watch",
    "lint": "eslint src/",
    "lint:fix": "eslint src/ --fix",
    "format": "prettier --write src/",
    "db:migrate": "node scripts/migrate.js",
    "db:seed": "node scripts/seed.js",
    "db:reset": "node scripts/reset.js"
  }
}
```

## Step 2: Database Setup

### 2.1 Install PostgreSQL
**macOS (using Homebrew):**
```bash
brew install postgresql
brew services start postgresql
```

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

**Windows:**
Download and install from [PostgreSQL official website](https://www.postgresql.org/download/windows/)

### 2.2 Create Database and User
```bash
# Connect to PostgreSQL as superuser
sudo -u postgres psql

# Create database and user
CREATE DATABASE saaska_db;
CREATE USER saaska_user WITH PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE saaska_db TO saaska_user;
ALTER USER saaska_user CREATEDB;
\q
```

### 2.3 Install Redis
**macOS:**
```bash
brew install redis
brew services start redis
```

**Ubuntu/Debian:**
```bash
sudo apt install redis-server
sudo systemctl start redis-server
sudo systemctl enable redis-server
```

**Windows:**
Download and install from [Redis for Windows](https://github.com/microsoftarchive/redis/releases)

### 2.4 Test Database Connections
```bash
# Test PostgreSQL
psql -h localhost -U saaska_user -d saaska_db -c "SELECT version();"

# Test Redis
redis-cli ping
# Should return: PONG
```

## Step 3: Project Configuration

### 3.1 Create Environment File
```bash
cp .env.example .env
```

Edit `.env` with your actual values:
```bash
# Database
DATABASE_URL=postgresql://saaska_user:your_secure_password@localhost:5432/saaska_db
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=saaska_db
DATABASE_USERNAME=saaska_user
DATABASE_PASSWORD=your_secure_password

# Redis
REDIS_URL=redis://localhost:6379

# JWT
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d

# Server
PORT=8000
NODE_ENV=development
```

### 3.2 Create Configuration Files

**src/config/database.js:**
```javascript
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

pool.on('connect', () => {
  console.log('Connected to PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

module.exports = pool;
```

**src/config/redis.js:**
```javascript
const redis = require('redis');
require('dotenv').config();

const client = redis.createClient({
  url: process.env.REDIS_URL
});

client.on('connect', () => {
  console.log('Connected to Redis');
});

client.on('error', (err) => {
  console.error('Redis Client Error', err);
});

module.exports = client;
```

## Step 4: Database Schema Implementation

### 4.1 Create Migration Scripts
**scripts/migrate.js:**
```javascript
const pool = require('../src/config/database');
const fs = require('fs');
const path = require('path');

async function runMigrations() {
  try {
    console.log('Running database migrations...');
    
    // Read and execute migration files
    const migrationsDir = path.join(__dirname, 'migrations');
    const migrationFiles = fs.readdirSync(migrationsDir).sort();
    
    for (const file of migrationFiles) {
      if (file.endsWith('.sql')) {
        console.log(`Executing migration: ${file}`);
        const sql = fs.readFileSync(path.join(migrationsDir, file), 'utf8');
        await pool.query(sql);
        console.log(`✓ Completed: ${file}`);
      }
    }
    
    console.log('All migrations completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

runMigrations();
```

### 4.2 Create Initial Migration
**scripts/migrations/001_initial_schema.sql:**
```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create users table
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

-- Create indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_subscription_tier ON users(subscription_tier);
CREATE INDEX idx_users_created_at ON users(created_at);

-- Create other tables (resumes, cover_letters, job_applications, etc.)
-- ... (see DATABASE_SCHEMA.md for complete schema)
```

### 4.3 Run Migrations
```bash
npm run db:migrate
```

## Step 5: Core Application Setup

### 5.1 Create Main Application File
**src/app.js:**
```javascript
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const resumeRoutes = require('./routes/resumes');
const coverLetterRoutes = require('./routes/coverLetters');
const applicationRoutes = require('./routes/applications');
const activityRoutes = require('./routes/activities');

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}));
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/resumes', resumeRoutes);
app.use('/api/cover-letters', coverLetterRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/activities', activityRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV 
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    error: { 
      message: 'Internal server error',
      code: 'INTERNAL_ERROR'
    } 
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    success: false, 
    error: { 
      message: 'Route not found',
      code: 'NOT_FOUND'
    } 
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
});
```

### 5.2 Create Authentication Routes
**src/routes/auth.js:**
```javascript
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/database');
const { validateRegistration, validateLogin } = require('../middleware/validation');
const auth = require('../middleware/auth');

const router = express.Router();

// Register
router.post('/register', validateRegistration, async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;
    
    // Check if user already exists
    const existingUser = await pool.query(
      'SELECT id FROM users WHERE email = $1',
      [email]
    );
    
    if (existingUser.rows.length > 0) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'USER_EXISTS',
          message: 'User with this email already exists'
        }
      });
    }
    
    // Hash password
    const saltRounds = parseInt(process.env.BCRYPT_ROUNDS) || 12;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    
    // Create user
    const newUser = await pool.query(
      `INSERT INTO users (email, password_hash, first_name, last_name)
       VALUES ($1, $2, $3, $4)
       RETURNING id, email, first_name, last_name, created_at`,
      [email, passwordHash, firstName, lastName]
    );
    
    // Generate JWT token
    const token = jwt.sign(
      { userId: newUser.rows[0].id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );
    
    res.status(201).json({
      success: true,
      data: {
        user: newUser.rows[0],
        token
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Failed to create user'
      }
    });
  }
});

// Login
router.post('/login', validateLogin, async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user
    const user = await pool.query(
      'SELECT * FROM users WHERE email = $1 AND is_active = true',
      [email]
    );
    
    if (user.rows.length === 0) {
      return res.status(401).json({
        success: false,
        error: {
          code: 'INVALID_CREDENTIALS',
          message: 'Invalid email or password'
        }
      });
    }
    
    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.rows[0].password_hash);
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        error: {
          code: 'INVALID_CREDENTIALS',
          message: 'Invalid email or password'
        }
      });
    }
    
    // Update last login
    await pool.query(
      'UPDATE users SET last_login_at = CURRENT_TIMESTAMP WHERE id = $1',
      [user.rows[0].id]
    );
    
    // Generate JWT token
    const token = jwt.sign(
      { userId: user.rows[0].id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );
    
    // Remove sensitive data
    const { password_hash, ...userData } = user.rows[0];
    
    res.json({
      success: true,
      data: {
        user: userData,
        token
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Login failed'
      }
    });
  }
});

// Get current user
router.get('/me', auth, async (req, res) => {
  try {
    const user = await pool.query(
      'SELECT id, email, first_name, last_name, profile_picture_url, subscription_tier, created_at FROM users WHERE id = $1',
      [req.user.userId]
    );
    
    if (user.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'USER_NOT_FOUND',
          message: 'User not found'
        }
      });
    }
    
    res.json({
      success: true,
      data: user.rows[0]
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Failed to get user'
      }
    });
  }
});

module.exports = router;
```

## Step 6: Middleware Implementation

### 6.1 Authentication Middleware
**src/middleware/auth.js:**
```javascript
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: 'Access token required'
        }
      });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        error: {
          code: 'TOKEN_EXPIRED',
          message: 'Access token expired'
        }
      });
    }
    
    return res.status(401).json({
      success: false,
      error: {
        code: 'INVALID_TOKEN',
        message: 'Invalid access token'
      }
    });
  }
};
```

### 6.2 Validation Middleware
**src/middleware/validation.js:**
```javascript
const Joi = require('joi');

const registrationSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  firstName: Joi.string().min(2).max(100).required(),
  lastName: Joi.string().min(2).max(100).required()
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

const validateRegistration = (req, res, next) => {
  const { error } = registrationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: error.details[0].message
      }
    });
  }
  next();
};

const validateLogin = (req, res, next) => {
  const { error } = loginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: error.details[0].message
      }
    });
  }
  next();
};

module.exports = {
  validateRegistration,
  validateLogin
};
```

## Step 7: Testing Setup

### 7.1 Create Test Configuration
**jest.config.js:**
```javascript
module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.js'],
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/app.js',
    '!src/config/**'
  ],
  coverageDirectory: 'coverage',
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js']
};
```

### 7.2 Create Test Setup File
**tests/setup.js:**
```javascript
require('dotenv').config({ path: '.env.test' });

// Global test setup
beforeAll(async () => {
  // Setup test database
});

afterAll(async () => {
  // Cleanup test database
});
```

### 7.3 Create Sample Test
**tests/auth.test.js:**
```javascript
const request = require('supertest');
const app = require('../src/app');

describe('Auth Endpoints', () => {
  describe('POST /api/auth/register', () => {
    it('should create a new user', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'test@example.com',
          password: 'password123',
          firstName: 'Test',
          lastName: 'User'
        });
      
      expect(res.statusCode).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.user).toHaveProperty('id');
      expect(res.body.data.user.email).toBe('test@example.com');
    });
  });
});
```

## Step 8: Development Workflow

### 8.1 Start Development Server
```bash
npm run dev
```

### 8.2 Run Tests
```bash
npm test
npm run test:watch
```

### 8.3 Code Quality
```bash
npm run lint
npm run lint:fix
npm run format
```

## Step 9: Production Deployment

### 9.1 Environment Configuration
```bash
# Production .env
NODE_ENV=production
PORT=8000
DATABASE_URL=postgresql://user:pass@host:5432/db
REDIS_URL=redis://host:6379
JWT_SECRET=your-production-secret
```

### 9.2 Process Management
```bash
# Install PM2
npm install -g pm2

# Start application
pm2 start src/app.js --name "saaska-backend"

# Monitor
pm2 monit

# Logs
pm2 logs saaska-backend
```

### 9.3 Docker Deployment
**Dockerfile:**
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 8000

CMD ["npm", "start"]
```

**docker-compose.yml:**
```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "8000:8000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://user:pass@db:5432/saaska_db
      - REDIS_URL=redis://redis:6379
    depends_on:
      - db
      - redis
  
  db:
    image: postgres:15
    environment:
      POSTGRES_DB: saaska_db
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
    volumes:
      - postgres_data:/var/lib/postgresql/data
  
  redis:
    image: redis:7-alpine
    volumes:
      - redis_data:/data

volumes:
  postgres_data:
  redis_data:
```

## Troubleshooting

### Common Issues

1. **Database Connection Failed**
   - Check PostgreSQL service status
   - Verify connection string in .env
   - Check firewall settings

2. **Redis Connection Failed**
   - Check Redis service status
   - Verify Redis URL in .env
   - Check Redis configuration

3. **JWT Token Issues**
   - Verify JWT_SECRET in .env
   - Check token expiration settings
   - Verify Authorization header format

4. **CORS Errors**
   - Check CORS_ORIGIN in .env
   - Verify frontend URL
   - Check credentials setting

### Debug Mode
```bash
# Enable debug logging
DEBUG=* npm run dev

# Check environment variables
node -e "console.log(require('dotenv').config())"
```

## Next Steps

1. **Implement remaining routes** (resumes, cover letters, applications)
2. **Add file upload functionality** for profile pictures and documents
3. **Implement email verification** and password reset
4. **Add rate limiting** and security middleware
5. **Set up monitoring** and logging
6. **Add API documentation** with Swagger
7. **Implement caching** strategies
8. **Add WebSocket support** for real-time features

## Support

For additional help:
- Check the API documentation in `API_DOCUMENTATION.md`
- Review the database schema in `DATABASE_SCHEMA.md`
- See frontend integration guide in `FRONTEND_INTEGRATION.md`
- Check the main README.md for project overview
