# Geo-Spatial Volunteer Coordination Platform

A modern, production-quality React frontend for coordinating volunteers and NGOs to maximize social impact through geospatial intelligence and smart resource allocation.

## 🎯 Project Overview

This platform helps NGOs, volunteers, and citizens identify community needs, visualize them geographically, and coordinate volunteer tasks efficiently. The application features role-based dashboards, task matching, and comprehensive volunteer management capabilities.

## 🏗️ Architecture

### Tech Stack
- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS 4 with dark mode support
- **UI Components**: shadcn/ui (50+ components)
- **Animations**: Framer Motion for smooth transitions
- **State Management**: React Context API + Hooks
- **Theme System**: next-themes for dark/light mode
- **Notifications**: Sonner for toast notifications
- **Icons**: Lucide React

### Design System
- **Color Scheme**: Humanitarian-focused (blues for trust, greens for action)
- **Typography**: System fonts with Geist (fallback included)
- **Components**: Rounded cards (rounded-2xl), soft shadows, spacious layouts
- **Animations**: Subtle motion with Framer Motion
- **Responsive**: Mobile-first, fully responsive design

## 📁 Project Structure

```
src/
├── components/
│   ├── common/           # Shared components (navbar, sidebar, footer)
│   ├── landing/          # Landing page sections
│   ├── shared/           # Reusable cards (need-card, task-card, etc.)
│   └── ui/               # shadcn/ui components
├── context/              # React Context (auth, theme)
├── data/                 # Mock data for development
├── hooks/                # Custom React hooks
├── utils/                # Utility functions and helpers
└── app/                  # Next.js app router pages

app/
├── page.tsx              # Landing page
├── login/                # Login page
├── signup/               # Multi-step signup with role selection
├── map/                  # Public community needs map
├── dashboard/            # Dashboard redirect
├── volunteer-dashboard/  # Volunteer role dashboard
├── ngo-dashboard/        # NGO role dashboard
├── user-dashboard/       # Community member dashboard
├── report-issue/         # Issue reporting form
├── task/[id]/           # Task detail page
└── need/[id]/           # Community need detail page
```

## 🎭 User Roles

The platform supports three distinct user roles, each with unique dashboards and capabilities:

### 1. **Community Member (Normal User)**
- Browse and explore community needs map
- Report new issues and community needs
- Track their submitted reports
- View nearby issues in their state
- Discover volunteer opportunities

**Dashboard Features:**
- Nearby issues in community
- My reports tracker
- Volunteer encouragement section
- Quick action cards

### 2. **Volunteer**
- Browse and apply for tasks
- View recommended tasks (with skill-based matching)
- Track application status
- View accepted tasks and deadlines
- Manage volunteer profile with skills/certificates
- Track completed tasks and volunteer history

**Dashboard Features:**
- Recommended tasks (with match scoring)
- My applications with statuses
- Profile management
- Completed tasks tracker

### 3. **NGO/Organization**
- Create and manage volunteer tasks
- Review volunteer applications
- Adopt community needs from public map
- Convert adopted needs into volunteer tasks
- Manage organization profile
- Track task completion

**Dashboard Features:**
- Create new tasks
- View all posted tasks
- Review volunteer applications
- Manage adopted community needs
- Organization profile management

## 🔐 Authentication Flow

**Mock Authentication (Frontend Only)**
- No backend required for development
- Users can login with any email/password combination
- Role selection determines dashboard access
- User data persisted in browser session
- localStorage used for demo persistence

For production, replace with:
- Backend API integration
- JWT token management
- Secure password hashing
- Database-backed user sessions

## 📊 Core Data Models

### Community Need
```typescript
- id, title, description
- category, urgency, status
- location, latitude, longitude
- source (citizen, ngo, social_media)
- adoptedBy (NGO that adopted it)
- submittedBy, submittedDate
```

### Volunteer Task
```typescript
- id, title, description
- ngoId, ngoName
- category, requiredSkills
- volunteersNeeded, acceptedCount
- deadline, location, urgency
- status (open, filled, completed)
```

### Volunteer Profile
```typescript
- id, name, email, phone
- city, state, rating
- skills (array)
- availability, certificates
- preferredDomains
```

### NGO Profile
```typescript
- id, organizationName
- contactPerson, email, phone
- city, state
- description, verificationStatus
- domainsOfWork, socialHandles
```

## 🎨 Design Features

### Color Palette
- **Primary**: `oklch(0.52 0.18 260)` - Trust blue
- **Secondary**: `oklch(0.68 0.12 160)` - Action green
- **Accent**: `oklch(0.65 0.15 160)` - Supporting green
- **Muted**: Subtle grays for backgrounds
- **Dark Mode**: Inverted palette with adjusted saturation

### Component Library
- **StatCard**: Dashboard statistics with icons
- **NeedCard**: Community need preview cards
- **TaskCard**: Volunteer task cards with matching info
- **Badge**: Status, urgency, and category indicators
- **EmptyState**: Friendly empty state illustrations
- **Sidebar**: Collapsible navigation for dashboards
- **Navbar**: Sticky header with theme toggle

## 🚀 Key Features

### Landing Page
- Hero section with CTA
- 6 feature cards
- 4-step how-it-works timeline
- Testimonials from users
- Impact statistics
- Footer with links

### Authentication
- Email/password login
- Multi-step signup with role selection
- Role-specific onboarding forms
- Form validation and error handling

### Public Map
- Filter community needs by:
  - Category, urgency, status
  - City, state, pincode
  - Search by title/description
- NGO adoption capability
- Detailed need pages with related tasks

### Dashboards
- **Volunteer**: Task recommendations, applications, profile
- **NGO**: Task creation, applications review, need adoption
- **Community**: Issue reporting, nearby needs, volunteer CTA

### Task Management
- Task creation form with file uploads
- Volunteer application tracking
- Skill-based matching (match scores)
- Deadline tracking
- Application status management

### Issue Reporting
- Multi-field form
- File upload capability
- Location input with city/state/pincode
- Urgency level selection
- Success confirmation with report ID

## 📱 Responsive Design

- **Mobile**: Single column, collapsed sidebar
- **Tablet**: Optimized grid layouts
- **Desktop**: Full-featured multi-column designs
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)

## 🌓 Dark Mode

- Theme toggle in navbar (always visible)
- Smooth transitions between themes
- Uses next-themes for persistence
- Tailwind CSS dark class strategy
- Custom color tokens for both modes

## 🎬 Animations

- Framer Motion for page transitions
- Staggered list animations
- Smooth hover effects
- Loading states with spinners
- Skeleton screens for placeholders

## 📦 Mock Data

Comprehensive mock data included for:
- 20+ volunteer profiles
- 3 NGO organizations
- 30+ community needs
- 25+ volunteer tasks
- 4+ task applications

Mock data includes realistic details for immediate testing and demo purposes.

## 🔄 API Structure (Placeholders)

All pages are currently frontend-only with mock data. The following endpoints should be implemented on backend:

```
POST   /api/auth/login
POST   /api/auth/signup
GET    /api/communities/needs
POST   /api/communities/needs
GET    /api/tasks
POST   /api/tasks
POST   /api/applications
GET    /api/volunteers/profile
PUT    /api/volunteers/profile
GET    /api/ngos/dashboard
POST   /api/ngos/tasks
```

## 🛠️ Development

### Installation
```bash
pnpm install
```

### Running
```bash
pnpm dev
```

Visit `http://localhost:3000`

### Building
```bash
pnpm build
pnpm start
```

## 📋 Page Routes

| Route | Role | Description |
|-------|------|-------------|
| `/` | Public | Landing page |
| `/login` | Public | Login page |
| `/signup` | Public | Sign up (role selection) |
| `/map` | Public | Public needs map |
| `/report-issue` | Public | Issue reporting |
| `/volunteer-dashboard` | Volunteer | Volunteer dashboard |
| `/ngo-dashboard` | NGO | NGO dashboard |
| `/user-dashboard` | Community | Community member dashboard |
| `/task/:id` | Public | Task detail page |
| `/need/:id` | Public | Need detail page |

## 🎯 Future Enhancements

- Real geospatial map integration (Leaflet/Mapbox)
- Backend API integration
- Real authentication with JWT
- Database persistence (PostgreSQL/MongoDB)
- Real-time notifications (WebSocket)
- Advanced analytics dashboard
- Video tutorials
- Mobile app version
- AI-powered task matching
- Social media integration
- Payment integration for donations

## 📄 License

This project is part of the Geo-Spatial Volunteer Coordination Platform initiative.

## 👥 Contributing

This is a frontend prototype. When ready for production:
1. Implement backend services
2. Add comprehensive testing
3. Set up CI/CD pipeline
4. Deploy to production servers
5. Monitor performance and user feedback

---

**Built with ❤️ for social impact**
