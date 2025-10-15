# Primetrade Frontend-Backend Assignment

## Overview

This project is a scalable web application featuring authentication and dashboard functionality. It is built using:

- Frontend: React.js
- Backend: Node.js + Express.js
- Database: SQLite
- Authentication: JWT (JSON Web Tokens) with bcrypt

Main features include:

- User Signup and Login with secure JWT authentication
- Protected routes for Dashboard and Profile pages
- CRUD operations for user tasks, including search and filtering
- Profile viewing and updating capability
- Responsive UI styled using Bootstrap for cross-device usability

---

## Project Structure

### Backend

- `src/controllers/` - Business logic for users and tasks
- `src/models/` - Database schemas for users and tasks
- `src/routes/` - Express route handlers for authentication and tasks
- `src/middleware/` - Authentication middleware using JWT
- `config/` - Database config and environment variable setup
- `database/` - SQLite file storage
- `utils/` - Helper functions for token management and error handling

### Frontend

- `src/components/` - Reusable UI components (e.g., Header, ProtectedRoute)
- `src/pages/` - Individual page components (LoginPage, SignupPage, Dashboard, Profile)
- `src/services/` - API service calls to backend
- `App.js` - Root app with React Router setup
- `index.js` - App entry point wrapping with Router and styles

---

## Setup Instructions

### Backend

1. Navigate to the backend folder:

cd backend


2. Install dependencies:

npm install



3. Create a `.env` file with:

JWTSECRET=your-secret-key
PORT=5000



4. Start the backend server:

npm run dev



The backend runs at `http://localhost:5000`

### Frontend

1. Navigate to the frontend folder:

cd frontend



2. Install dependencies:

npm install



3. Start the React development server:

npm start



The frontend runs at `http://localhost:3000`

---

## Usage

- Use `/signup` route to register a new user.
- Use `/login` to authenticate via JWT.
- Dashboard (`/dashboard`) is a protected route showing tasks and search/filter.
- Profile (`/profile`) allows user info update.
- Navigate via the header bar and logout to clear session.

---

## API Documentation

- `POST /auth/register` - Register user
- `POST /auth/login` - Login with JWT response
- `GET /auth/profile` - Get user profile (auth required)
- `PUT /auth/profile` - Update profile (auth required)
- CRUD routes for tasks under `/tasks` (all JWT protected)

---

## Security

- Passwords hashed securely with bcrypt
- JWT tokens used for stateless authentication
- Frontend protects routes by verifying login status
- Backend verifies JWT on API calls
- Inputs validated and sanitized to avoid injection risks

---

## Contact and Support

- Developer: **Katta Revanth**
- Email: [kattarevanth9@gmail.com](mailto:kattarevanth9@gmail.com)

---

This README provides essential info for setup, usage, and contribution to the project.