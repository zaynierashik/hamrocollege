# Architecture & Migration Guide

## Overview

This document outlines the complete migration from a Vite + React frontend to a modern full-stack architecture with Next.js 15 and Django REST Framework.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                          User Browser                            │
└─────────────────────────────────────────────────────────────────┘
                                │
                    ┌───────────┴────────────┐
                    │                        │
        ┌───────────▼──────────────┐   ┌────▼──────────────────┐
        │   NEXT.JS FRONTEND       │   │  Static Files & Assets│
        │  (localhost:3000)        │   │  (CSS, JS, Images)    │
        ├──────────────────────────┤   └───────────────────────┘
        │ Components (TypeScript)  │
        │ - App Router (/app)      │
        │ - Custom Components      │
        │ - Tailwind CSS           │
        │ - API Client (axios)     │
        └───────────────┬──────────┘
                        │
                        │ HTTP/REST
                        │
        ┌───────────────▼──────────────┐
        │  DJANGO REST FRAMEWORK       │
        │  (localhost:8000)            │
        ├──────────────────────────────┤
        │ Core App                     │
        │ - ContactSubmission model    │
        │ - ServiceOffering model      │
        │ - BlogPost model             │
        │ - Contact/Services/Blog APIs │
        │                              │
        │ Users App                    │
        │ - CustomUser model           │
        │ - Booking model              │
        │ - JWT Authentication         │
        │ - User/Booking/Auth APIs     │
        └───────────────┬──────────────┘
                        │
        ┌───────────────▼──────────────┐
        │     DATABASE (SQLite/PG)     │
        │  - Users                     │
        │  - Bookings                  │
        │  - Services                  │
        │  - Blog Posts                │
        │  - Contact Submissions       │
        └──────────────────────────────┘
```

## Key Design Decisions

### 1. **Next.js App Router**

- **Why**: File-based routing is more intuitive and performant than React Router
- **Benefits**:
  - Built-in optimization (code splitting, lazy loading)
  - Server components for better performance
  - Simpler routing structure
  - Better SEO support

### 2. **TypeScript**

- **Why**: Type safety prevents runtime errors
- **Benefits**:
  - Better IDE support and autocomplete
  - Easier refactoring
  - Self-documenting code
  - Catches errors at compile-time

### 3. **Tailwind CSS**

- **Why**: Utility-first CSS is faster than writing custom CSS
- **Benefits**:
  - Consistent design system
  - Smaller CSS file sizes
  - Easier responsive design
  - No naming conflicts

### 4. **Django REST Framework**

- **Why**: Mature, well-documented framework for building APIs
- **Benefits**:
  - Built-in CRUD operations
  - Automatic API documentation
  - Permission and authentication systems
  - Admin interface for content management

### 5. **Separate Frontend/Backend**

- **Why**: Clean separation of concerns
- **Benefits**:
  - Independent deployment
  - Scalability
  - Easier testing
  - API can be reused for mobile apps

## File Structure Mapping

### Old Structure (Vite + React)

```
src/
├── App.jsx
├── main.jsx
├── index.css
└── components/
    ├── Navbar.jsx
    ├── Hero.jsx
    └── ...
```

### New Structure (Next.js)

```
frontend/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles
├── components/
│   ├── custom/             # Project components
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   └── ...
│   └── ui/                 # shadcn/ui components
├── lib/
│   ├── api.ts              # API client
│   └── utils.ts            # Utilities
├── hooks/
│   └── useIsMobile.ts
├── types/
│   └── index.ts
└── package.json
```

## Component Conversion Examples

### Before (Vite + React)

```jsx
import React from "react";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  // ...JSX
};

export default Navbar;
```

### After (Next.js + TypeScript)

```tsx
"use client";

import { useState } from "react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // ...JSX
}
```

**Changes**:

- `'use client'` directive for client-side interactivity
- Removed React import (implicit in Next.js)
- TypeScript for type safety
- Explicit export function

## API Integration

### Before (Direct Requests)

```jsx
useEffect(() => {
  fetch("http://api.example.com/contacts")
    .then((r) => r.json())
    .then((data) => setData(data));
}, []);
```

### After (Centralized API Client)

```tsx
import client from "@/lib/api";

// In component
const response = await client.get("/contact/");
```

**Benefits**:

- Centralized configuration
- Consistent headers and interceptors
- Easier JWT token management
- Better error handling

## Authentication Flow

```
┌─────────────┐
│   User      │
│  Login Page │
└──────┬──────┘
       │
       ├─────────────────────────────────────────────┐
       │                                             │
       │ POST /api/users/token/                      │
       │ { username, password }                      │
       │                                             │
       ▼                                             │
┌──────────────────────────────────────┐            │
│   Django Backend                      │◄───────────┘
│   - Verify credentials                │
│   - Generate JWT token pair           │
│   - Return { access, refresh }        │
└──────────────────┬───────────────────┘
                   │
                   │ access + refresh tokens
                   │
                   ▼
        ┌──────────────────────┐
        │  Next.js Frontend    │
        │  - Store in state/LS │
        │  - Include in headers│
        │  - Authorization:    │
        │    Bearer <token>    │
        └──────────────────────┘
```

## Database Models

### Core App

- **ContactSubmission**: Form submissions from website
- **ServiceOffering**: Training services available
- **BlogPost**: Blog/podcast content

### Users App

- **CustomUser**: Extended Django user with trainer info
- **Booking**: Training session bookings

## API Endpoints

### Content Management

```
GET    /api/services/           # List all active services
GET    /api/blog/               # List published blog posts
GET    /api/blog/latest/        # Get 5 latest posts
POST   /api/contact/            # Submit contact form
```

### Authentication

```
POST   /api/users/token/        # Get JWT tokens
POST   /api/users/token/refresh/ # Refresh access token
GET    /api/users/me/           # Current user profile
GET    /api/users/trainers/     # List all trainers
```

### Bookings

```
GET    /api/bookings/           # User's bookings
POST   /api/bookings/           # Create new booking
GET    /api/bookings/upcoming/  # Get upcoming sessions
PUT    /api/bookings/{id}/      # Update booking
DELETE /api/bookings/{id}/      # Cancel booking
```

## Deployment Considerations

### Frontend (Next.js)

- **Vercel** (recommended): One-click deployment from GitHub
- **Netlify**: Full-stack capabilities
- **Self-hosted**: Any Node.js hosting

### Backend (Django)

- **Railway**: Simple Django deployment
- **Heroku**: Legacy but reliable
- **DigitalOcean App Platform**: Cost-effective
- **AWS/GCP/Azure**: Enterprise solutions

### Database

- **SQLite**: Development only
- **PostgreSQL**: Production recommended
- **MongoDB**: Not recommended for DRF (relational ORM)

## Environment Variables

### Frontend (.env.local)

```
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Backend (.env)

```
SECRET_KEY=production-secret-key
DEBUG=False
DATABASE_URL=postgresql://user:pass@host:5432/dbname
ALLOWED_HOSTS=domain.com,www.domain.com
CORS_ALLOWED_ORIGINS=https://domain.com
```

## Testing Strategy

### Frontend (Jest + React Testing Library)

```typescript
import { render, screen } from '@testing-library/react';
import Navbar from '@/components/custom/Navbar';

test('renders navigation links', () => {
  render(<Navbar />);
  expect(screen.getByText('Home')).toBeInTheDocument();
});
```

### Backend (Django Test Framework)

```python
from django.test import TestCase
from rest_framework.test import APIClient

class ContactTestCase(TestCase):
    def test_create_contact(self):
        response = self.client.post('/api/contact/', data)
        self.assertEqual(response.status_code, 201)
```

## Performance Optimization

### Frontend

- Next.js automatic code splitting
- Image optimization with `next/image`
- Tailwind CSS purging unused styles
- API response caching with SWR/React Query

### Backend

- Database indexing on search fields
- Pagination for list endpoints
- Query optimization with `select_related`/`prefetch_related`
- Caching with Redis (future)

## Security Measures

1. **HTTPS/TLS**: Enable in production
2. **CORS**: Whitelist only frontend domains
3. **CSRF**: Django's built-in protection
4. **JWT**: Short expiry times (60 min access, 24 hr refresh)
5. **Rate Limiting**: Throttle API endpoints
6. **Input Validation**: Serializer validation in DRF
7. **SQL Injection**: Django ORM prevents this
8. **XSS**: React auto-escapes content

## Next Steps

1. **Local Development**
   - Follow setup instructions in README
   - Install dependencies
   - Run migrations
   - Start both servers

2. **Adding Features**
   - Create backend models/serializers/views
   - Create frontend components
   - Connect via API client

3. **Going to Production**
   - Add environment variables
   - Set DEBUG=False
   - Use production database
   - Enable HTTPS
   - Set up CI/CD pipeline

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Django Documentation](https://docs.djangoproject.com/)
- [DRF Guide](https://www.django-rest-framework.org/)
- [Tailwind CSS Docs](https://tailwindcss.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
