# Backend Django Setup

## Installation

Create a Python virtual environment:

```bash
python -m venv venv

# On Windows
venv\Scripts\activate

# On macOS/Linux
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

## Configuration

Create a `.env` file from `.env.example`:

```bash
cp .env.example .env
```

## Database Setup

Generate and run migrations:

```bash
python manage.py makemigrations
python manage.py migrate
```

Create a superuser for admin access:

```bash
python manage.py createsuperuser
```

## Running the Server

```bash
python manage.py runserver 8000
```

Visit:

- API: http://localhost:8000/api/
- Admin: http://localhost:8000/admin/

## API Endpoints

### Core API

- `GET/POST /api/contact/` - Contact submissions
- `GET /api/services/` - Service offerings
- `GET /api/blog/` - Blog posts

### Users API

- `GET/POST /api/users/token/` - JWT token endpoints
- `GET /api/users/me/` - Current user profile
- `GET /api/users/trainers/` - List trainers
- `GET/POST /bookings/` - Manage bookings

## Project Structure

```
backend/
├── hamrocollege/           # Django project settings
│   ├── settings.py         # Configuration
│   ├── urls.py            # Main URL routing
│   ├── wsgi.py            # WSGI config
│   └── asgi.py            # ASGI config
├── core/                  # Core application (services, blog, contacts)
│   ├── models.py
│   ├── views.py
│   ├── serializers.py
│   └── urls.py
├── users/                 # User management and bookings
│   ├── models.py
│   ├── views.py
│   ├── serializers.py
│   └── urls.py
├── manage.py              # Django management script
└── requirements.txt       # Dependencies
```

## Authentication

The backend uses JWT (JSON Web Tokens) for API authentication.

### Getting a Token

```bash
POST /api/users/token/
Content-Type: application/json

{
  "username": "your_username",
  "password": "your_password"
}
```

Response:

```json
{
  "access": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

### Using the Token

Add to request headers:

```
Authorization: Bearer <access_token>
```

### Refreshing Token

```bash
POST /api/users/token/refresh/
Content-Type: application/json

{
  "refresh": "your_refresh_token"
}
```
