# Hamro College - Full-Stack Architecture

Complete migration from Vite + React to Next.js + Django REST Framework.

## Project Structure

```
hamrocollege/
├── frontend/               # Next.js 15 + TypeScript + Tailwind
│   ├── app/               # Next.js App Router
│   ├── components/        # React components
│   │   ├── custom/       # Project-specific components
│   │   └── ui/           # shadcn/ui components (to be added)
│   ├── lib/              # Utilities & API client
│   ├── hooks/            # Custom React hooks
│   ├── types/            # TypeScript types
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.ts
│   └── next.config.js
│
├── backend/               # Django REST Framework
│   ├── hamrocollege/     # Django project settings
│   ├── core/             # Core business logic
│   ├── users/            # User management & auth
│   ├── manage.py
│   ├── requirements.txt
│   └── README.md
│
└── README.md             # This file
```

## Quick Start

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
# Visit http://localhost:3000
```

### Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
# Visit http://localhost:8000/api
```

## Tech Stack

### Frontend

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **axios** - HTTP client
- **shadcn/ui** - Component library (ready to install)

### Backend

- **Django 5.0** - Web framework
- **Django REST Framework** - API development
- **Simple JWT** - Authentication
- **Django CORS** - Cross-origin requests

## API Documentation

### Base URLs

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:8000/api`

### Key Endpoints

**Contact Submissions**

- `POST /api/contact/` - Submit contact form

**Services**

- `GET /api/services/` - List all active services

**Blog**

- `GET /api/blog/` - List published blog posts
- `GET /api/blog/latest/` - Get 5 latest posts

**Users & Auth**

- `POST /api/users/token/` - Get JWT token
- `POST /api/users/token/refresh/` - Refresh token
- `GET /api/users/me/` - Current user profile
- `GET /api/users/trainers/` - List trainers

**Bookings**

- `GET /api/bookings/` - User's bookings
- `POST /api/bookings/` - Create booking
- `GET /api/bookings/upcoming/` - Upcoming sessions

## Migration Notes

### What Changed

✅ **Frontend**

- Vite → Next.js 15 (better optimization & deployment)
- React Router → Next.js routing (file-based routing)
- JSX → TypeScript/TSX (type safety)
- Custom CSS → Tailwind CSS classes
- No state management needed (yet)

✅ **Backend**

- New Django REST API
- JWT authentication
- CORS enabled for frontend
- Admin interface for content management

✅ **Styling**

- All Tailwind CSS configured
- Custom utilities for outline text
- Responsive design maintained

### Decisions Made

1. **Next.js App Router** - Modern, file-based routing with better performance
2. **Custom User Model** - Extendable for future features
3. **DRF ViewSets** - Automatic CRUD operations and routing
4. **JWT Authentication** - Stateless, scalable auth
5. **Separate API Apps** - `core` for content, `users` for auth/bookings

## Installation & Configuration

### Frontend Environment Variables

Create `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Backend Environment Variables

Create `backend/.env`:

```env
SECRET_KEY=your-secret-key-here
DEBUG=True
DATABASE_URL=sqlite:///db.sqlite3
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:3000
```

## Next Steps

1. **Install dependencies**
   - Frontend: `npm install`
   - Backend: `pip install -r requirements.txt`

2. **Set up databases**
   - `python manage.py migrate`
   - `python manage.py createsuperuser`

3. **Add shadcn/ui components** (when needed)

   ```bash
   cd frontend
   npx shadcn-ui@latest add card button input form
   ```

4. **Populate initial data**
   - Use Django admin to add services, blog posts, etc.
   - Or write fixtures/management commands

5. **Deploy** (future)
   - Frontend: Vercel, Netlify
   - Backend: Heroku, Railway, DigitalOcean

## Features Implemented

### Frontend

- ✅ Responsive navbar with mobile menu
- ✅ Hero section with CTA
- ✅ Services grid
- ✅ Methodology section
- ✅ Team/Expert section
- ✅ Contact form (Schedule component)
- ✅ Blog/Podcast section
- ✅ Pricing cards
- ✅ CTA section
- ✅ Footer

### Backend

- ✅ Contact form submission endpoint
- ✅ Services management (CRUD)
- ✅ Blog posts (CRUD)
- ✅ User profiles
- ✅ Booking system
- ✅ JWT authentication
- ✅ Admin interface
- ✅ CORS configuration

## Development Workflow

1. **Frontend Development**

   ```bash
   cd frontend
   npm run dev
   # Edit components in /app and /components
   ```

2. **Backend Development**

   ```bash
   cd backend
   python manage.py runserver
   # Edit models, views, serializers
   ```

3. **Testing**
   ```bash
   # Frontend types
   npm run type-check
   # Backend (to be added)
   python manage.py test
   ```

## Common Issues & Solutions

**CORS errors?**

- Update `CORS_ALLOWED_ORIGINS` in `backend/hamrocollege/settings.py`

**Can't connect to API?**

- Ensure backend is running on port 8000
- Check `NEXT_PUBLIC_API_URL` in frontend `.env.local`

**Migrations failed?**

- Delete `db.sqlite3` and run migrations Fresh
- `python manage.py makemigrations && python manage.py migrate`

## Future Enhancements

- [ ] Add email notifications for contact submissions
- [ ] Implement payment processing for bookings
- [ ] Add admin dashboard for appointments
- [ ] Cache services/blog posts with Redis
- [ ] Full-text search for posts
- [ ] WebSocket for real-time notifications
- [ ] Mobile app (React Native)
- [ ] Analytics integration

## Support

For questions or issues, refer to:

- [Next.js Documentation](https://nextjs.org/docs)
- [Django Documentation](https://docs.djangoproject.com/)
- [Django REST Framework](https://www.django-rest-framework.org/)
- [Tailwind CSS](https://tailwindcss.com/docs)
