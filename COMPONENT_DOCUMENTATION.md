# React Components Documentation

## Overview
This document provides comprehensive documentation for all React components in the SaaSka Career Platform. Each component is documented with its purpose, props, state, and backend integration requirements.

## Table of Contents
1. [Core Layout Components](#core-layout-components)
2. [Resume Builder Components](#resume-builder-components)
3. [Cover Letter Components](#cover-letter-components)
4. [Job Application Components](#job-application-components)
5. [Dashboard Components](#dashboard-components)
6. [Page Components](#page-components)
7. [Utility Components](#utility-components)
8. [Integration Requirements](#integration-requirements)

---

## Core Layout Components

### Header.jsx
**File**: `src/components/Header.jsx`  
**Purpose**: Main navigation header with logo, navigation menu, and mobile responsiveness  

#### Features
- Responsive navigation menu
- Mobile hamburger menu with overlay
- Logo and branding
- Navigation links (Home, Features, Pricing, Login)
- Subscription tier selector dropdown

#### Props
- None (stateless component)

#### State
```javascript
const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
```

#### Backend Integration Requirements
- **Authentication**: Add user menu when logged in
- **User Profile**: Display user avatar and name
- **Subscription Status**: Show current subscription tier
- **Navigation**: Add authenticated user routes

#### Code Example
```jsx
<Header />
```

---

### Sidebar.jsx
**File**: `src/components/Sidebar.jsx`  
**Purpose**: Left sidebar navigation for authenticated users  

#### Features
- User profile section
- Navigation menu items
- Collapsible design
- Mobile responsive

#### Props
```javascript
{
  isOpen: boolean,           // Controls sidebar open/close state
  onClose: function,         // Callback to close sidebar
  user: object               // User profile data
}
```

#### Backend Integration Requirements
- **User Data**: Fetch user profile information
- **Navigation Items**: Dynamic menu based on user permissions
- **Profile Picture**: Handle user avatar uploads

---

### Footer.jsx
**File**: `src/components/Footer.jsx`  
**Purpose**: Site footer with links and company information  

#### Features
- Company links and information
- Social media links
- Copyright notice
- Responsive design

#### Props
- None (stateless component)

---

### MobileDrawer.jsx
**File**: `src/components/MobileDrawer.jsx`  
**Purpose**: Mobile navigation drawer component  

#### Features
- Slide-out mobile navigation
- Touch-friendly interface
- Overlay background

#### Props
```javascript
{
  isOpen: boolean,           // Controls drawer open state
  onClose: function,         // Callback to close drawer
  children: ReactNode        // Navigation content
}
```

---

## Resume Builder Components

### PersonalInfoForm.jsx
**File**: `src/components/PersonalInfoForm.jsx`  
**Purpose**: Form for collecting personal information for resume building  

#### Features
- Personal details input fields
- Profile photo upload capability
- Form validation
- Responsive layout

#### Props
```javascript
{
  form: {
    name: string,
    lastName: string,
    jobTitle: string,
    email: string,
    phone: string,
    location: string,
    linkedin: string,
    github: string,
    website: string,
    summary: string
  },
  handleChange: function    // Form change handler
}
```

#### Form Fields
- First Name (required)
- Last Name
- Job Title (required)
- Email (required)
- Phone
- Location
- LinkedIn URL
- GitHub URL
- Personal Website
- Professional Summary

#### Backend Integration Requirements
- **API Endpoint**: `POST /api/resumes`
- **Data Structure**: Personal info as JSONB in database
- **File Upload**: Profile photo handling
- **Validation**: Server-side validation for required fields

#### Code Example
```jsx
<PersonalInfoForm 
  form={personalInfo} 
  handleChange={handlePersonalInfoChange} 
/>
```

---

### WorkExperienceForm.jsx
**File**: `src/components/WorkExperienceForm.jsx`  
**Purpose**: Form for adding and editing work experience entries  

#### Features
- Work experience entry form
- Date range selection
- Company and position details
- Achievement and responsibility inputs

#### Props
```javascript
{
  experience: {
    company: string,
    position: string,
    location: string,
    startDate: string,
    endDate: string,
    current: boolean,
    description: string,
    achievements: string[]
  },
  onSave: function,          // Save experience callback
  onCancel: function         // Cancel editing callback
}
```

#### Backend Integration Requirements
- **API Endpoint**: `PUT /api/resumes/:id`
- **Data Structure**: Work experience as JSONB array
- **Validation**: Date validation and company information

---

### EducationForm.jsx
**File**: `src/components/EducationForm.jsx`  
**Purpose**: Form for adding educational background information  

#### Features
- Education entry form
- Degree and institution details
- Graduation date
- GPA and honors

#### Props
```javascript
{
  education: {
    institution: string,
    degree: string,
    field: string,
    graduationDate: string,
    gpa: string,
    honors: string[]
  },
  onSave: function,          // Save education callback
  onCancel: function         // Cancel editing callback
}
```

#### Backend Integration Requirements
- **API Endpoint**: `PUT /api/resumes/:id`
- **Data Structure**: Education as JSONB array

---

### SkillsForm.jsx
**File**: `src/components/SkillsForm.jsx`  
**Purpose**: Form for managing professional skills  

#### Features
- Skills input and management
- Skill level selection
- Category organization

#### Props
```javascript
{
  skills: Array<{
    name: string,
    level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert',
    category: string
  }>,
  onSkillsChange: function   // Skills update callback
}
```

#### Backend Integration Requirements
- **API Endpoint**: `PUT /api/resumes/:id`
- **Data Structure**: Skills as JSONB array

---

## Cover Letter Components

### CLLetterDetailsForm.jsx
**File**: `src/components/CLLetterDetailsForm.jsx`  
**Purpose**: Form for cover letter company and position details  

#### Features
- Company information input
- Job position details
- Hiring manager information
- Company research fields

#### Props
```javascript
{
  form: {
    companyName: string,
    jobTitle: string,
    hiringManager: string,
    companyDescription: string,
    jobRequirements: string[]
  },
  handleChange: function     // Form change handler
}
```

#### Backend Integration Requirements
- **API Endpoint**: `POST /api/cover-letters`
- **Data Structure**: Cover letter details in database
- **Validation**: Required field validation

---

### CLLetterBodyForm.jsx
**File**: `src/components/CLLetterBodyForm.jsx`  
**Purpose**: Form for cover letter content and body text  

#### Features
- Cover letter content editor
- Template selection
- Customization options
- Preview functionality

#### Props
```javascript
{
  form: {
    content: string,
    template: string,
    customizations: object
  },
  handleChange: function     // Form change handler
}
```

#### Backend Integration Requirements
- **API Endpoint**: `POST /api/cover-letters`
- **Data Structure**: Content and template in database
- **Templates**: Template management system

---

### CLPersonalInfoForm.jsx
**File**: `src/components/CLPersonalInfoForm.jsx`  
**Purpose**: Personal information form for cover letter generation  

#### Features
- Personal contact information
- Professional details
- Address and contact info

#### Props
```javascript
{
  form: {
    name: string,
    email: string,
    phone: string,
    address: string,
    city: string,
    state: string,
    zipCode: string
  },
  handleChange: function     // Form change handler
}
```

#### Backend Integration Requirements
- **API Endpoint**: `POST /api/cover-letters`
- **Data Structure**: Personal info in cover letter record

---

## Job Application Components

### ApplicationsTable.jsx
**File**: `src/components/ApplicationsTable.jsx`  
**Purpose**: Data table for tracking job applications with filtering and sorting  

#### Features
- Material-UI data table
- Virtual scrolling for performance
- Column filtering and sorting
- Global search functionality
- Status tracking

#### Props
- None (manages own state)

#### State
```javascript
const [applications, setApplications] = useState([]);
const [columnFilters, setColumnFilters] = useState([]);
const [globalFilter, setGlobalFilter] = useState('');
const [sorting, setSorting] = useState([]);
```

#### Data Structure
```typescript
interface Application {
  company: string;
  position: string;
  status: 'Applied' | 'Interview' | 'Offer' | 'Rejected' | 'Hired';
  appliedDate: string;
  interviewDate?: string;
  city: string;
  state: string;
  offerSalary?: number;
}
```

#### Backend Integration Requirements
- **API Endpoint**: `GET /api/applications`
- **Data Fetching**: Replace localStorage with API calls
- **Real-time Updates**: WebSocket for status changes
- **Pagination**: Handle large datasets
- **Filtering**: Server-side filtering and search

#### Current Implementation
- Uses localStorage for data persistence
- Implements storage event listeners
- Has polling fallback for data updates

#### Code Example
```jsx
<ApplicationsTable />
```

---

## Dashboard Components

### DashboardWidget.jsx
**File**: `src/components/DashboardWidget.jsx`  
**Purpose**: Base widget component for dashboard displays  

#### Features
- Widget container with title
- Content area for child components
- Consistent styling

#### Props
```javascript
{
  title: string,             // Widget title
  children: ReactNode        // Widget content
}
```

---

### StatsWidget.jsx
**File**: `src/components/StatsWidget.jsx`  
**Purpose**: Displays user statistics and metrics  

#### Features
- Statistics display
- Metric cards
- Visual indicators
- Responsive layout

#### Props
```javascript
{
  stats: {
    resumesCreated: number,
    coverLettersGenerated: number,
    jobsApplied: number,
    interviewsPracticed: number
  }
}
```

#### Backend Integration Requirements
- **API Endpoint**: `GET /api/users/:id/statistics`
- **Real-time Updates**: Live statistics updates
- **Caching**: Cache frequently accessed stats

---

### RecentActivities.jsx
**File**: `src/components/RecentActivities.jsx`  
**Purpose**: Displays recent user activities and actions  

#### Features
- Activity timeline
- Action descriptions
- Timestamps
- Activity categorization

#### Props
```javascript
{
  activities: Array<{
    id: string,
    type: string,
    description: string,
    timestamp: string,
    details: object
  }>
}
```

#### Backend Integration Requirements
- **API Endpoint**: `GET /api/activities`
- **Real-time Updates**: WebSocket for live activity feed
- **Pagination**: Load more activities on scroll

---

### ActivityTracker.jsx
**File**: `src/components/ActivityTracker.jsx`  
**Purpose**: Tracks and logs user activities for analytics  

#### Features
- Activity logging
- Performance tracking
- User behavior analytics
- Session monitoring

#### Props
```javascript
{
  onActivity: function,      // Activity logging callback
  trackPerformance: boolean  // Enable performance tracking
}
```

#### Backend Integration Requirements
- **API Endpoint**: `POST /api/activities`
- **Batch Logging**: Efficient activity logging
- **Analytics**: Process activity data for insights

---

### QuickActions.jsx
**File**: `src/components/QuickActions.jsx`  
**Purpose**: Quick action buttons for common tasks  

#### Features
- Action buttons grid
- Icon-based navigation
- Hover effects
- Responsive layout

#### Props
```javascript
{
  actions: Array<{
    id: string,
    label: string,
    icon: ReactNode,
    action: function,
    disabled: boolean
  }>
}
```

#### Backend Integration Requirements
- **Permission System**: Check user permissions for actions
- **Feature Flags**: Enable/disable features based on subscription

---

## Page Components

### ResumeMakerPage.js
**File**: `src/pages/ResumeMakerPage.js`  
**Purpose**: Main page for creating and editing resumes with multi-step form  

#### Features
- Multi-step resume creation form
- Personal information, work experience, education, and skills sections
- AI-powered resume optimization suggestions
- Form validation and error handling
- Mobile-responsive design with drawer navigation
- Progress tracking and step navigation
- Auto-save functionality

#### State Management
```javascript
const [form, setForm] = useState({
  name: "", lastName: "", email: "", phone: "", location: "",
  summary: "", jobTitle: "", company: "", workDesc: "",
  school: "", degree: "", eduDesc: "", skills: ""
});
const [currentStep, setCurrentStep] = useState(0);
const [saved, setSaved] = useState(false);
const [aiLoading, setAiLoading] = useState(false);
const [aiError, setAiError] = useState("");
```

#### Components Used
- `PersonalInfoForm` - Personal details input
- `WorkExperienceForm` - Work experience entries
- `EducationForm` - Educational background
- `SkillsForm` - Professional skills
- `Sidebar` - Navigation sidebar
- `MobileDrawer` - Mobile navigation
- `ActivityTracker` - User activity logging

#### Backend Integration Requirements
- **API Endpoints**:
  - `POST /api/resumes` - Create new resume
  - `PUT /api/resumes/:id` - Update existing resume
  - `GET /api/resumes/:id` - Load resume data
  - `POST /api/ai/optimize-resume` - AI optimization
- **Data Persistence**: Replace localStorage with database storage
- **File Upload**: Profile photo and document handling
- **Real-time Save**: Auto-save with conflict resolution
- **AI Integration**: OpenAI/Anthropic API for resume suggestions

#### Code Example
```jsx
<ResumeMakerPage />
```

---

### DashboardPage.js
**File**: `src/pages/DashboardPage.js`  
**Purpose**: User dashboard with statistics, activities, and quick actions  

#### Features
- User statistics overview
- Recent activities timeline
- Quick action buttons
- Personalized tips and recommendations
- Welcome message based on user activity
- Mobile-responsive design

#### State Management
```javascript
const [drawerOpen, setDrawerOpen] = useState(false);
// Uses UserActivityContext for stats and activities
```

#### Components Used
- `DashboardWidget` - Base widget container
- `StatsWidget` - Statistics display
- `RecentActivities` - Activity timeline
- `QuickActions` - Action buttons
- `ActivityTracker` - Activity logging
- `Sidebar` - Navigation sidebar
- `MobileDrawer` - Mobile navigation

#### Backend Integration Requirements
- **API Endpoints**:
  - `GET /api/users/:id/statistics` - User statistics
  - `GET /api/activities` - Recent activities
  - `GET /api/users/:id/profile` - User profile data
- **Real-time Updates**: WebSocket for live dashboard updates
- **Caching**: Cache dashboard data for performance
- **Personalization**: User-specific recommendations

#### Code Example
```jsx
<DashboardPage />
```

---

### CoverLetterMakerPage.js
**File**: `src/pages/CoverLetterMakerPage.js`  
**Purpose**: Page for creating personalized cover letters  

#### Features
- Multi-step cover letter creation
- Company and position research
- Personal information input
- Content editor with templates
- Preview functionality
- Mobile-responsive design

#### State Management
```javascript
const [form, setForm] = useState({
  companyName: "", jobTitle: "", hiringManager: "",
  companyDescription: "", jobRequirements: [],
  name: "", email: "", phone: "", address: "",
  city: "", state: "", zipCode: "", content: ""
});
const [currentStep, setCurrentStep] = useState(0);
const [saved, setSaved] = useState(false);
```

#### Components Used
- `CLLetterDetailsForm` - Company and job details
- `CLPersonalInfoForm` - Personal information
- `CLLetterBodyForm` - Content and templates
- `Sidebar` - Navigation sidebar
- `MobileDrawer` - Mobile navigation

#### Backend Integration Requirements
- **API Endpoints**:
  - `POST /api/cover-letters` - Create cover letter
  - `PUT /api/cover-letters/:id` - Update cover letter
  - `GET /api/cover-letters/:id` - Load cover letter
  - `GET /api/templates/cover-letters` - Available templates
- **Template System**: Cover letter template management
- **Company Research**: Integration with company databases
- **Export Functionality**: PDF/DOCX generation

#### Code Example
```jsx
<CoverLetterMakerPage />
```

---

### ApplicationsPage.js
**File**: `src/pages/ApplicationsPage.js`  
**Purpose**: Page for managing job applications and tracking status  

#### Features
- Job applications table with filtering
- Application status tracking
- Interview scheduling
- Notes and comments
- Export functionality
- Mobile-responsive design

#### State Management
```javascript
const [applications, setApplications] = useState([]);
const [filteredApplications, setFilteredApplications] = useState([]);
const [filters, setFilters] = useState({
  status: 'all', company: '', dateRange: null
});
```

#### Components Used
- `ApplicationsTable` - Data table component
- `Sidebar` - Navigation sidebar
- `MobileDrawer` - Mobile navigation

#### Backend Integration Requirements
- **API Endpoints**:
  - `GET /api/applications` - List applications
  - `POST /api/applications` - Create application
  - `PUT /api/applications/:id` - Update application
  - `DELETE /api/applications/:id` - Delete application
  - `PUT /api/applications/:id/status` - Update status
- **Real-time Updates**: WebSocket for status changes
- **Notifications**: Email/SMS for interview reminders
- **Calendar Integration**: Interview scheduling

#### Code Example
```jsx
<ApplicationsPage />
```

---

### JobSearchPage.js
**File**: `src/pages/JobSearchPage.js`  
**Purpose**: Job search and discovery page with advanced filtering  

#### Features
- Advanced job search with filters
- Location-based search
- Salary range filtering
- Company filtering
- Job recommendations
- Save and apply functionality
- Mobile-responsive design

#### State Management
```javascript
const [jobs, setJobs] = useState([]);
const [filters, setFilters] = useState({
  keyword: '', location: '', salary: '', company: '',
  jobType: 'all', experience: 'all'
});
const [savedJobs, setSavedJobs] = useState([]);
const [loading, setLoading] = useState(false);
```

#### Backend Integration Requirements
- **API Endpoints**:
  - `GET /api/jobs/search` - Job search
  - `GET /api/jobs/saved` - Saved jobs
  - `POST /api/jobs/save` - Save job
  - `DELETE /api/jobs/saved/:id` - Remove saved job
- **External APIs**: Integration with job boards (Indeed, LinkedIn)
- **Search Engine**: Full-text search with relevance scoring
- **Recommendations**: AI-powered job recommendations
- **Location Services**: Geocoding and distance calculation

#### Code Example
```jsx
<JobSearchPage />
```

---

### InterviewPage.js
**File**: `src/pages/InterviewPage.js`  
**Purpose**: Interview practice and preparation page  

#### Features
- Interview question practice
- AI-powered feedback
- Performance scoring
- Question categories
- Mock interview sessions
- Video recording (future)
- Mobile-responsive design

#### State Management
```javascript
const [questions, setQuestions] = useState([]);
const [currentQuestion, setCurrentQuestion] = useState(0);
const [answers, setAnswers] = useState([]);
const [sessionActive, setSessionActive] = useState(false);
const [feedback, setFeedback] = useState(null);
```

#### Backend Integration Requirements
- **API Endpoints**:
  - `GET /api/interviews/questions` - Interview questions
  - `POST /api/interviews/sessions` - Start practice session
  - `PUT /api/interviews/sessions/:id` - Update session
  - `POST /api/ai/interview-feedback` - AI feedback
- **AI Integration**: OpenAI/Anthropic for feedback generation
- **Session Management**: Interview practice session tracking
- **Performance Analytics**: User improvement tracking

#### Code Example
```jsx
<InterviewPage />
```

---

### ResumePage.js
**File**: `src/pages/ResumePage.js`  
**Purpose**: Resume management and listing page  

#### Features
- Resume listing and management
- Template selection
- Resume preview
- Duplicate and delete functionality
- Export options
- Mobile-responsive design

#### State Management
```javascript
const [resumes, setResumes] = useState([]);
const [selectedResume, setSelectedResume] = useState(null);
const [showPreview, setShowPreview] = useState(false);
```

#### Backend Integration Requirements
- **API Endpoints**:
  - `GET /api/resumes` - List user resumes
  - `GET /api/resumes/:id` - Get resume details
  - `DELETE /api/resumes/:id` - Delete resume
  - `POST /api/resumes/:id/duplicate` - Duplicate resume
  - `POST /api/resumes/:id/export` - Export resume
- **File Management**: Resume file storage and retrieval
- **Template System**: Resume template management
- **Version Control**: Resume version history

#### Code Example
```jsx
<ResumePage />
```

---

### CoverLetterPage.js
**File**: `src/pages/CoverLetterPage.js`  
**Purpose**: Cover letter management and listing page  

#### Features
- Cover letter listing and management
- Template selection
- Preview functionality
- Duplicate and delete options
- Export capabilities
- Mobile-responsive design

#### State Management
```javascript
const [coverLetters, setCoverLetters] = useState([]);
const [selectedLetter, setSelectedLetter] = useState(null);
const [showPreview, setShowPreview] = useState(false);
```

#### Backend Integration Requirements
- **API Endpoints**:
  - `GET /api/cover-letters` - List user cover letters
  - `GET /api/cover-letters/:id` - Get cover letter details
  - `DELETE /api/cover-letters/:id` - Delete cover letter
  - `POST /api/cover-letters/:id/duplicate` - Duplicate cover letter
  - `POST /api/cover-letters/:id/export` - Export cover letter
- **Template Management**: Cover letter template system
- **Export Options**: Multiple format support

#### Code Example
```jsx
<CoverLetterPage />
```

---

### ResumePreviewPage.js
**File**: `src/pages/ResumePreviewPage.js`  
**Purpose**: Resume preview and final review page  

#### Features
- Resume preview rendering
- Print-friendly layout
- Export options
- Final review before saving
- Mobile-responsive design

#### Props
```javascript
{
  resumeData: object,        // Complete resume data
  template: string,          // Selected template
  onEdit: function,          // Edit callback
  onSave: function           // Save callback
}
```

#### Backend Integration Requirements
- **API Endpoints**:
  - `POST /api/resumes` - Save final resume
  - `POST /api/resumes/:id/export` - Export resume
- **PDF Generation**: Server-side PDF creation
- **Print Optimization**: Print-friendly CSS

#### Code Example
```jsx
<ResumePreviewPage 
  resumeData={resumeData}
  template={selectedTemplate}
  onEdit={handleEdit}
  onSave={handleSave}
/>
```

---

### FeaturesPage.js
**File**: `src/pages/FeaturesPage.js`  
**Purpose**: Platform features showcase page  

#### Features
- Feature descriptions
- Visual demonstrations
- Comparison tables
- Call-to-action buttons
- Mobile-responsive design

#### Props
- None (stateless component)

#### Backend Integration Requirements
- **Content Management**: Dynamic feature content
- **Analytics**: Feature usage tracking
- **A/B Testing**: Feature presentation optimization

#### Code Example
```jsx
<FeaturesPage />
```

---

### PricingPage.js
**File**: `src/pages/PricingPage.js`  
**Purpose**: Subscription plans and pricing information  

#### Features
- Pricing plan comparison
- Feature breakdown
- Subscription options
- Payment integration
- Mobile-responsive design

#### Props
- None (stateless component)

#### Backend Integration Requirements
- **API Endpoints**:
  - `GET /api/pricing/plans` - Available plans
  - `POST /api/subscriptions` - Create subscription
  - `PUT /api/subscriptions/:id` - Update subscription
- **Payment Processing**: Stripe integration
- **Subscription Management**: Plan upgrades/downgrades

#### Code Example
```jsx
<PricingPage />
```

---

## Utility Components

### FeatureCard.jsx
**File**: `src/components/FeatureCard.jsx`  
**Purpose**: Displays feature information in card format  

#### Features
- Feature description
- Icon display
- Consistent card styling

#### Props
```javascript
{
  title: string,             // Feature title
  description: string,       // Feature description
  icon: ReactNode            // Feature icon
}
```

---

### ResumeCard.jsx
**File**: `src/components/ResumeCard.jsx`  
**Purpose**: Card component for displaying resume information  

#### Features
- Resume preview card
- Template thumbnail
- Basic information display

#### Props
```javascript
{
  resume: {
    id: string,
    title: string,
    template: string,
    lastModified: string
  },
  onClick: function          // Card click handler
}
```

#### Backend Integration Requirements
- **API Endpoint**: `GET /api/resumes/:id`
- **Thumbnail Generation**: Resume preview images
- **File Management**: Resume file handling

---

### Hero.jsx
**File**: `src/components/Hero.jsx`  
**Purpose**: Landing page hero section with call-to-action  

#### Features
- Hero banner with messaging
- Call-to-action buttons
- Background styling
- Responsive design

#### Props
- None (stateless component)

---

### Features.jsx
**File**: `src/components/Features.jsx`  
**Purpose**: Displays platform features and capabilities  

#### Features
- Feature grid layout
- Feature descriptions
- Visual presentation

#### Props
- None (stateless component)

---

## Data Models

### makeApplicationData.ts
**File**: `src/components/makeApplicationData.ts`  
**Purpose**: TypeScript definitions and sample data for job applications  

#### Type Definitions
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

#### Sample Data
- Google Frontend Developer application
- Microsoft Software Engineer application
- IBM Backend Developer application
- Amazon DevOps Engineer application

---

## Integration Requirements

### Authentication Integration
All components that require user data need authentication context:

```jsx
// Wrap app with AuthProvider
<AuthProvider>
  <UserActivityProvider>
    <App />
  </UserActivityProvider>
</AuthProvider>
```

### API Service Integration
Replace localStorage calls with API service calls:

```jsx
// Before (localStorage)
const data = localStorage.getItem('key');

// After (API)
const { data } = await apiService.getData();
```

### Error Handling
Implement consistent error handling across components:

```jsx
const [error, setError] = useState(null);
const [loading, setLoading] = useState(false);

try {
  setLoading(true);
  const result = await apiService.call();
  // Handle success
} catch (error) {
  setError(error.message);
} finally {
  setLoading(false);
}
```

### Loading States
Add loading indicators for better UX:

```jsx
{loading && <LoadingSpinner />}
{error && <ErrorMessage error={error} />}
{data && <DataDisplay data={data} />}
```

### Real-time Updates
Implement WebSocket connections for live data:

```jsx
useEffect(() => {
  const socket = new WebSocket(WS_URL);
  
  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    // Update component state
  };
  
  return () => socket.close();
}, []);
```

## Component Dependencies

### Required Packages
- `@mui/material` - Material-UI components
- `@mui/icons-material` - Material-UI icons
- `@tanstack/react-query` - Data fetching and caching
- `react-router-dom` - Routing
- `dayjs` - Date handling

### Context Dependencies
- `UserActivityContext` - User activity tracking
- `AuthContext` - Authentication state (to be implemented)
- `SidebarContext` - Sidebar state management

## Performance Considerations

### Lazy Loading
Implement lazy loading for large components:

```jsx
const LazyComponent = React.lazy(() => import('./LazyComponent'));

<Suspense fallback={<LoadingSpinner />}>
  <LazyComponent />
</Suspense>
```

### Memoization
Use React.memo for expensive components:

```jsx
const ExpensiveComponent = React.memo(({ data }) => {
  // Component logic
});
```

### Virtual Scrolling
Already implemented in ApplicationsTable for large datasets.

## Testing Strategy

### Unit Tests
Test individual component functionality:

```jsx
describe('PersonalInfoForm', () => {
  it('should render form fields', () => {
    render(<PersonalInfoForm form={mockForm} handleChange={jest.fn()} />);
    expect(screen.getByLabelText('First name')).toBeInTheDocument();
  });
});
```

### Integration Tests
Test component interactions:

```jsx
describe('Resume Builder Flow', () => {
  it('should save resume data', async () => {
    // Test complete resume building flow
  });
});
```

### E2E Tests
Test complete user workflows:

```jsx
describe('Resume Creation', () => {
  it('should create and save resume', () => {
    // Test from form to save
  });
});
```

## Migration Checklist

### Phase 1: Authentication
- [ ] Implement AuthContext
- [ ] Add login/register forms
- [ ] Protect routes
- [ ] Update Header component

### Phase 2: Data Integration
- [ ] Replace localStorage with API calls
- [ ] Add loading states
- [ ] Implement error handling
- [ ] Add real-time updates

### Phase 3: Advanced Features
- [ ] File upload handling
- [ ] Real-time collaboration
- [ ] Performance optimization
- [ ] Advanced analytics

## Support and Resources

### Documentation
- API Documentation: `API_DOCUMENTATION.md`
- Database Schema: `DATABASE_SCHEMA.md`
- Backend Setup: `BACKEND_SETUP.md`
- Frontend Integration: `FRONTEND_INTEGRATION.md`

### Code Examples
- Component usage examples provided above
- Integration patterns documented
- Error handling strategies outlined

### Common Issues
- CORS configuration
- Authentication token handling
- Real-time update implementation
- Performance optimization
