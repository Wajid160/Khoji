# PersonFinder - Complete Project Documentation
## Final Year Project (FYP) Guide

**Project Name:** PersonFinder - Advanced OSINT Intelligence Across Social Networks  
**Team Members:**
- Allah Bux Jamali
- Wajid Bhatti
- Abdul Manan

**Version:** 1.0.0  
**Date:** February 2026

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Technology Stack](#2-technology-stack)
3. [Architecture & Design](#3-architecture--design)
4. [Features](#4-features)
5. [Project Structure](#5-project-structure)
6. [Key Components Explained](#6-key-components-explained)
7. [How It Works](#7-how-it-works)
8. [Setup & Installation](#8-setup--installation)
9. [Deployment Guide](#9-deployment-guide)
10. [Future Enhancements](#10-future-enhancements)

---

## 1. Project Overview

### What is PersonFinder?

PersonFinder is a modern web application that uses **OSINT (Open-Source Intelligence)** techniques to help users find people across multiple social media platforms (LinkedIn, Facebook, Twitter/X) using a single search query.

### Problem It Solves

- **Manual Searching is Time-Consuming:** Finding someone across multiple social networks requires opening each platform separately
- **Scattered Information:** Profile information is spread across different platforms
- **No Centralized Search:** No single tool to search all platforms at once

### Solution Provided

PersonFinder provides:
- ✅ **Unified Search Interface** - Search across LinkedIn, Facebook, and Twitter simultaneously
- ✅ **Real-Time Results** - Get instant results from all platforms
- ✅ **Detailed Profile Views** - See comprehensive information in clean modal windows
- ✅ **User Authentication** - Secure login system with session persistence
- ✅ **Beautiful UI** - Modern, responsive design with dark/light mode

---

## 2. Technology Stack

### Frontend Framework

**React (v19.2.0)**
- **Why:** Component-based architecture makes code reusable and maintainable
- **Purpose:** Building interactive user interfaces
- **Used in:** All UI components, state management

### Styling

**Tailwind CSS (v4.1.18)**
- **Why:** Utility-first CSS framework for rapid development
- **Purpose:** Consistent, responsive styling across the application
- **Features:** Dark mode support, custom color scheme, responsive design

### Animation Library

**Framer Motion (v12.29.0)**
- **Why:** Powerful animation library for React
- **Purpose:** Smooth transitions and interactive UI elements
- **Used in:** Modal animations, card hover effects, page transitions

### Icons

**Lucide React (v0.563.0)**
- **Why:** Modern, customizable icon set
- **Purpose:** Consistent iconography throughout the app
- **Examples:** Search icon, social media icons, user profile icons

### Build Tool

**Vite (v7.2.4)**
- **Why:** Lightning-fast development server and build tool
- **Purpose:** Development server, hot module replacement (HMR), production builds
- **Benefits:** Instant server start, fast refreshes, optimized builds

### Backend/API Integration

**N8N Workflow Automation**
- **Why:** No-code automation platform for building API workflows
- **Purpose:** Orchestrate Google search, scrape results, parse data
- **Endpoint:** `https://wajid7.app.n8n.cloud/webhook-test/person-finder`

---

## 3. Architecture & Design

### Architecture Diagram

```
┌─────────────────────────────────────────────────────────┐
│                     USER INTERFACE                       │
│              (React Components + Tailwind)               │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│                   FRONTEND LAYER                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │  Components  │  │   Context    │  │   Services   │  │
│  │  - Search    │  │  - Auth      │  │  - API       │  │
│  │  - Results   │  │  - User      │  │  - Fetch     │  │
│  │  - Auth      │  │              │  │              │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│              N8N WORKFLOW (Backend)                      │
│  ┌──────────────────────────────────────────────────┐  │
│  │  1. Receive Search Query                         │  │
│  │  2. Execute Google Searches                      │  │
│  │     - site:linkedin.com/in intitle:"name"       │  │
│  │     - site:facebook.com intitle:"name"          │  │
│  │     - site:twitter.com intitle:"name"           │  │
│  │  3. Parse HTML Results                          │  │
│  │  4. Extract Profile Data                        │  │
│  │  5. Return JSON Response                        │  │
│  └──────────────────────────────────────────────────┘  │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│              EXTERNAL DATA SOURCES                       │
│    ┌──────────┐    ┌──────────┐    ┌──────────┐       │
│    │ LinkedIn │    │ Facebook │    │  Twitter │       │
│    └──────────┘    └──────────┘    └──────────┘       │
└─────────────────────────────────────────────────────────┘
```

### Design Patterns Used

1. **Component-Based Architecture**
   - Reusable UI components
   - Single Responsibility Principle
   - Easy to test and maintain

2. **Context API Pattern**
   - Global state management (authentication)
   - Avoids prop drilling
   - Clean component hierarchy

3. **Service Layer Pattern**
   - API calls abstracted into `services/api.js`
   - Separation of concerns
   - Easy to mock for testing

4. **Container/Presentational Pattern**
   - Logic components (App.jsx)
   - Presentational components (SearchBar, ResultCard)

---

## 4. Features

### 4.1 User Authentication

**Location:** `src/context/AuthContext.jsx`, `src/components/Auth/`

**Features:**
- ✅ User Registration (Sign Up)
- ✅ User Login
- ✅ Session Persistence (stays logged in after refresh)
- ✅ User Logout
- ✅ Profile Avatar with initials

**How it Works:**
- **Storage:** LocalStorage (browser-based)
- **Data Stored:** User accounts, current session
- **Security Note:** For demonstration. Production would need backend authentication.

**User Flow:**
```
New User → Click "Sign Up" → Fill Form → Auto Login → See Profile Menu
Existing User → Click "Login" → Enter Credentials → Access Account
```

**Files Involved:**
- `src/context/AuthContext.jsx` - Authentication logic, state management
- `src/components/Auth/LoginModal.jsx` - Login UI
- `src/components/Auth/SignupModal.jsx` - Registration UI

---

### 4.2 Multi-Platform Search

**Location:** `src/components/Search/SearchBar.jsx`, `src/services/api.js`

**Features:**
- ✅ Search by name
- ✅ Optional filters (location, university, company)
- ✅ Advanced filter toggle
- ✅ Real-time results from 3 platforms

**Search Query Optimization:**

**LinkedIn:**
```
intitle:"Wajid Javed" site:linkedin.com/in -"people also viewed" -"similar profiles"
```

**Facebook:**
```
intitle:"Wajid Javed" site:facebook.com -inurl:events -inurl:groups -inurl:pages
```

**Twitter:**
```
intitle:"Wajid Javed (@" site:twitter.com -inurl:/status/
```

**Why These Queries:**
- `intitle:` - Only pages with name in title (actual profiles)
-Negative keywords - Exclude suggestions, events, posts
- `site:` - Limit to specific platform

**Files Involved:**
- `src/components/Search/SearchBar.jsx` - Search UI and input handling
- `src/services/api.js` - API communication and data transformation
- N8N Workflow - Backend search execution

---

### 4.3 Results Display

**Location:** `src/components/Results/ResultCard.jsx`, `src/App.jsx`

**Features:**
- ✅ Categorized by platform (LinkedIn, Facebook, Twitter)
- ✅ Beautiful card layout
- ✅ Hover animations
- ✅ Click to view details
- ✅ Direct profile links

**Card Information:**
- Profile name
- Job title/description
- Platform badge (icon + name)
- Location (when available)
- Short description
- Direct link to profile

**Files Involved:**
- `src/components/Results/ResultCard.jsx` - Individual result card component
- `src/App.jsx` - Results categorization and state management

---

### 4.4 Person Detail Modal

**Location:** `src/components/Results/PersonDetailModal.jsx`

**Features:**
- ✅ Full-screen modal with detailed information
- ✅ Smooth animations (scale + fade)
- ✅ Platform-specific icons
- ✅ Action buttons (View Full Profile, Close)
- ✅ Click outside to close

**Information Displayed:**
- Full name
- Job title/headline
- Platform with icon
- Location
- Full description/bio
- Confidence score (if available)
- Direct profile link

**Files Involved:**
- `src/components/Results/PersonDetailModal.jsx` - Modal component
- `src/App.jsx` - Modal state management

---

### 4.5 Dark/Light Mode

**Location:** `src/App.jsx`, `src/index.css`

**Features:**
- ✅ Toggle between dark and light themes
- ✅ Persistent preference (localStorage)
- ✅ Smooth theme transition
- ✅ All components theme-aware

**Implementation:**
- Uses Tailwind's `dark:` prefix for dark mode styles
- Theme state stored in localStorage (`theme` key)
- System automatically detects and applies theme on load

**Files Involved:**
- `src/App.jsx` - Theme toggle logic
- `src/index.css` - Dark mode color definitions
- `tailwind.config.js` - Dark mode configuration

---

### 4.6 About Modal

**Location:** `src/App.jsx` (About Modal section)

**Features:**
- ✅ Project information
- ✅ Team members list
- ✅ Technology stack showcase
- ✅ Social media links

**Information Displayed:**
- Project description
- Team members (with avatars)
- Technologies used (with icons)
- GitHub, LinkedIn, Twitter links

---

### 4.7 Responsive Design

**Implementation:** TailwindCSS responsive utilities

**Breakpoints:**
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

**Responsive Features:**
- ✅ Adaptive layout (stacks on mobile, grid on desktop)
- ✅Collapsible navigation
- ✅ Touch-friendly buttons
- ✅ Readable text sizes on all devices

---

## 5. Project Structure

```
person-finder/
│
├── public/                          # Static assets
│   └── bkg_image.png               # Background image
│
├── src/
│   ├── assets/                     # Images, icons
│   │   └── react.svg
│   │
│   ├── components/                 # React components
│   │   ├── Auth/
│   │   │   ├── LoginModal.jsx     # Login form
│   │   │   └── SignupModal.jsx    # Registration form
│   │   │
│   │   ├── Results/
│   │   │   ├── ResultCard.jsx     # Individual result card
│   │   │   └── PersonDetailModal.jsx  # Detail view modal
│   │   │
│   │   ├── Search/
│   │   │   └── SearchBar.jsx      # Search input component
│   │   │
│   │   └── UI/
│   │       └── LoadingOverlay.jsx # Loading spinner
│   │
│   ├── context/
│   │   └── AuthContext.jsx        # Authentication state management
│   │
│   ├── services/
│   │   └── api.js                 # API functions + data transformation
│   │
│   ├── App.css                    # App-specific styles
│   ├── App.jsx                    # Main application component
│   ├── index.css                  # Global styles + Tailwind imports
│   └── main.jsx                   # React entry point
│
├── .gitignore                     # Git ignore rules
├── eslint.config.js               # ESLint configuration
├── index.html                     # HTML template
├── package.json                   # Dependencies and scripts
├── postcss.config.js              # PostCSS configuration
├── tailwind.config.js             # Tailwind customization
└── vite.config.js                 # Vite build configuration
```

---

## 6. Key Components Explained

### 6.1 App.jsx - Main Application

**Purpose:** Root component, orchestrates all features

**Responsibilities:**
- State management (search results, modals, theme, auth)
- Search handling
- Results categorization
- Modal control
- Theme toggling

**Key State Variables:**
```javascript
const [results, setResults] = useState({ linkedin: [], facebook: [], twitter: [] });
const [loading, setLoading] = useState(false);
const [theme, setTheme] = useState('light');
const [showLoginModal, setShowLoginModal] = useState(false);
const [showSignupModal, setShowSignupModal] = useState(false);
const [showPersonDetail, setShowPersonDetail] = useState(false);
const [selectedPerson, setSelectedPerson] = useState(null);
```

**Key Functions:**
- `handleSearch(params)` - Processes search, calls API, categorizes results
- `toggleTheme()` - Switches between dark/light mode
- `handlePersonClick(person)` - Opens detail modal
- `handleLogout()` - Logs user out

---

### 6.2 AuthContext.jsx - Authentication Manager

**Purpose:** Global authentication state and functions

**Functions Provided:**
- `signup(name, email, password)` - Register new user
- `login(email, password)` - Authenticate user
- `logout()` - End session
- `user` - Current user object
- `isAuthenticated` - Boolean flag

**Data Storage:**
```javascript
localStorage:
  - personFinderUsers: Array of all registered users
  - personFinderUser: Current session user
```

**Security Note:**
- **Current:** Passwords stored in plain text (demonstration)
- **Production:** Use backend with bcrypt hashing, JWT tokens, HTTPS

---

### 6.3 api.js - API Service Layer

**Purpose:** Handle all backend communication

**Main Function:**
```javascript
export const searchPerson = async (searchParams) => {
  // 1. Call N8N webhook
  // 2. Receive grouped response {linkedin: [], facebook: [], twitter: []}
  // 3. Transform to flat array with proper field mapping
  // 4. Return results
}
```

**Data Transformation:**
```javascript
N8N Response:
{
  platform: "LinkedIn",
  title: "Wajid Javed - SEB | LinkedIn",
  link: "url",
  description: "text"
}

Frontend Format:
{
  name: "Wajid Javed",        // Extracted from title
  title: "Full title string",
  link: "url",
  source: "LinkedIn",          // Mapped from platform
  description: "text",
  location: "",
  confidence: 90
}
```

---

### 6.4 SearchBar.jsx - Search Interface

**Purpose:** User input for search queries

**Features:**
- Text input with placeholder
- Advanced filters toggle
- Location, university, company fields
- Search button with loading state

**Props:** None (uses callback via App.jsx)

**Key Events:**
- `onSearch(params)` - Triggered when search button clicked
- Form validation

---

### 6.5 ResultCard.jsx - Result Display Component

**Purpose:** Display individual search result

**Props:**
- `result` - Result object with profile data
- `onClick` - Handler for card click

**Features:**
- Platform badge with icon
- Truncated description
- Hover animation
- "View Profile" link

---

### 6.6 PersonDetailModal.jsx - Detail View

**Purpose:** Full-screen detail view of selected person

**Props:**
- `isOpen` - Boolean to show/hide modal
- `onClose` - Close handler function
- `person` - Person object with full data

**Features:**
- Backdrop blur
- Platform-specific icons
- Animated entrance/exit
- Close on backdrop click
- Action buttons

---

## 7. How It Works

### Complete User Journey

```
1. User Opens App
   └─> App.jsx loads
       ├─> Checks localStorage for theme preference
       ├─> Checks AuthContext for logged-in user
       └─> Renders header + search bar

2. User Enters Search Query
   └─> SearchBar.jsx
       ├─> User types name (e.g., "Wajid Javed")
       ├─> Optional: Opens advanced filters
       ├─> Clicks "Search" button
       └─> Calls App.jsx handleSearch()

3. Search Processing
   └─> App.jsx handleSearch()
       ├─> Sets loading = true
       ├─> Calls api.js searchPerson()
       └─> api.js makes HTTP request to N8N

4. N8N Backend Processing
   └─> N8N Workflow
       ├─> Receives webhook POST request
       ├─> Executes 3 Google searches (LinkedIn, Facebook, Twitter)
       ├─> Scrapes HTML results
       ├─> Parses profile data (title, link, description)
       └─> Returns JSON: {linkedin: [], facebook: [], twitter: []}

 5. Data Transformation
   └─> api.js transformItem()
       ├─> Extracts name from title
       ├─> Maps platform to source
       ├─> Adds default location
       ├─> Calculates confidence score
       └─> Returns flat array of results

6. Results Display
   └─> App.jsx
       ├─> Categorizes results by source
       ├─> Sets results state
       ├─> Sets loading = false
       └─> Renders ResultCard components

7. User Interaction
   └─> User clicks a result card
       ├─> handlePersonClick() called
       ├─> selectedPerson state updated
       ├─> PersonDetailModal opens
       └─> Shows full profile information

8. Modal Actions
   └─> User in PersonDetailModal
       ├─> Option 1: Click "View Full Profile" → Opens external link
       ├─> Option 2: Click "Close" or backdrop → Modal closes
       └─> Returns to results view
```

### Data Flow Diagram

```
User Input → SearchBar → App.jsx → api.js → N8N → Google
                                        ↓
                  Results ← Transform ← Parse ← Scrape
                     ↓
            App.jsx (categorize)
                     ↓
              ResultCard (display)
                     ↓
         PersonDetailModal (click)
```

---

## 8. Setup & Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Git
- Text editor (VS Code recommended)

### Step-by-Step Installation

```bash
# 1. Clone the repository
git clone <repository-url>
cd person-finder

# 2. Install dependencies
npm install

# 3. Configure N8N webhook (if not already done)
# Edit src/services/api.js line 6:
const N8N_WEBHOOK_URL = "https://your-n8n-instance.com/webhook/...";

# 4. Start development server
npm run dev

# 5. Open in browser
# Navigate to http://localhost:5173
```

### Environment Variables (Optional for Production)

Create `.env` file:
```
VITE_N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/...
VITE_USE_REAL_BACKEND=true
```

---

## 9. Deployment Guide

### Build for Production

```bash
# Create optimized production build
npm run build

# Output will be in ./dist folder
```

### Deployment Options

#### Option 1: Vercel (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Follow prompts
# - Framework: Vite
# - Build Command: npm run build
# - Output Directory: dist
```

#### Option 2: Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build and deploy
npm run build
netlify deploy --prod

# Upload dist folder when prompted
```

#### Option 3: GitHub Pages

```bash
# Install gh-pages package
npm install --save-dev gh-pages

# Add to package.json scripts:
"predeploy": "npm run build",
"deploy": "gh-pages -d dist"

# Deploy
npm run deploy
```

### N8N Workflow Setup

1. **Create N8N Account:** https://n8n.io
2. **Import Workflow:** Use the workflow from `docs/n8n_workflow.json`
3. **Configure Nodes:**
    - Webhook node: Set path to `/webhook-test/person-finder`
    - HTTP Request nodes: Update search queries with optimized operators
    - Parse results nodes: Configure selectors
4. **Activate Workflow**
5. **Copy Webhook URL** to `src/services/api.js`

---

## 10. Future Enhancements

### Potential Improvements

1. **Backend Authentication**
   - Implement JWT-based authentication
   - Secure password storage with bcrypt
   - Email verification
   - Password reset functionality

2. **Database Integration**
   - MongoDB/PostgreSQL for user data
   - Search history
   - Saved profiles
   - Favorites/bookmarks

3. **Advanced Search**
   - Date range filters
   - Industry-specific search
   - Skills-based matching
   - Company size filters

4. **Result Enhancements**
   - Export results to CSV/PDF
   - Share results via email
   - Compare multiple profiles
   - Visual profile analytics

5. **API Integrations**
   - LinkedIn Official API
   - Facebook Graph API
   - Twitter API v2
   - More platforms (Instagram, GitHub)

6. **Performance Optimizations**
   - Implement caching (Redis)
   - Lazy loading for results
   - Pagination for large result sets
   - Background job processing

7. **Analytics Dashboard**
   - Search trends
   - Most searched profiles
   - Platform success rates
   - User activity metrics

8. **Mobile App**
   - React Native version
   - Push notifications for saved searches
   - Offline mode

---

## Technology Choices Explained

### Why React?

- ✅ Component reusability
- ✅ Large community and ecosystem
- ✅ Virtual DOM for performance
- ✅ Easy to learn and maintain
- ✅ Industry standard

### Why Tailwind CSS?

- ✅ Rapid UI development
- ✅ Consistent design system
- ✅ Built-in responsive utilities
- ✅ Dark mode support
- ✅ Small production bundle (purges unused styles)

### Why Framer Motion?

- ✅ Smooth, professional animations
- ✅ Easy declarative syntax
- ✅ Great documentation
- ✅ Performance optimized

### Why Vite?

- ✅ Extremely fast development server
- ✅ Instant HMR (Hot Module Replacement)
- ✅ Optimized production builds
- ✅ Modern tooling

### Why N8N?

- ✅ Visual workflow builder (easy to understand)
- ✅ No backend coding required
- ✅ Built-in HTTP request capabilities
- ✅ Easy to modify and maintain
- ✅ Free tier available

### Why LocalStorage for Auth?

- ✅ Simple to implement
- ✅ No backend required for demo
- ✅ Sufficient for FYP/prototype
- ⚠️ Note: Not production-ready (explained in docs)

---

## Troubleshooting Common Issues

### Issue 1: N8N Returns No Results

**Solution:**
- Check N8N workflow is active
- Verify webhook URL is correct in `api.js`
- Test webhook directly in Postman/Insomnia
- Check N8N execution logs for errors

### Issue 2: Results Not Displaying

**Solution:**
- Open browser console (F12)
- Look for errors in network tab
- Check if data transformation is correct
- Verify `source` field matches categorization logic

### Issue 3: Login Not Working

**Solution:**
- Clear browser localStorage
- Check browser console for errors
- Verify AuthContext is wrapping App in `main.jsx`

### Issue 4: Build Fails

**Solution:**
```bash
# Clear cache
rm -rf node_modules
rm package-lock.json

# Reinstall
npm install

# Rebuild
npm run build
```

---

## Team Responsibilities (Example Breakdown)

### Allah Bux Jamali
- N8N workflow development
- Search query optimization
- Backend integration testing
- API documentation

### Wajid Bhatti
- Frontend architecture
- Component development
- Authentication system
- UI/UX design

### Abdul Manan
- Testing and QA
- Documentation
- Deployment
- User manual creation

---

## Conclusion

PersonFinder demonstrates a complete modern web application with:
- ✅ Professional UI/UX
- ✅ Real-world functionality (OSINT search)
- ✅ Modern tech stack (React, Tailwind, Vite)
- ✅ Backend integration (N8N)
- ✅ User authentication
- ✅ Responsive design

This project showcases understanding of:
- Frontend development
- API integration
- State management
- User authentication
- Modern web tooling
- Deployment processes

**Total Lines of Code:** ~2000 lines  
**Components:** 10 custom components  
**Technologies:** 8 major technologies  
**Features:** 7 core features

---

## Additional Resources

- [React Documentation](https://react.dev)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [N8N Documentation](https://docs.n8n.io)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [Vite Guide](https://vitejs.dev/guide/)

---

**Document Version:** 1.0  
**Last Updated:** February 2, 2026  
**Maintained By:** Wajid Bhatti

---

**For Questions or Support:**
- Check project README.md
- Review code comments in each file
- Refer to this documentation
- Contact team members

**License:** Educational Use - Final Year Project

---

*This documentation is part of the PersonFinder FYP project. All team members contributed to different aspects of development, testing, and documentation.*
