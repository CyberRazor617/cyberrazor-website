# Authentication Setup Guide

This document explains how the authentication flow works between the website, backend, and user portal.

## Architecture Overview

```
Website (Port 3000) -> Backend API (Port 8000) -> User Portal (Port 3001)
```

## Flow Description

1. **Signup Flow**:
   - User fills out signup form on website (`/signup`)
   - Website calls `/api/auth/signup` (proxies to backend)
   - Backend creates user with 'pending' status
   - User is redirected to login page
   - User receives email notification about account approval

2. **Login Flow**:
   - User enters credentials on website (`/login`)
   - Website calls `/api/auth/login` (proxies to backend)
   - Backend validates credentials and returns JWT token
   - Website stores token in localStorage
   - User is redirected to user portal

3. **User Portal**:
   - User portal checks for authentication token
   - If valid, displays user dashboard
   - If invalid/missing, redirects to login

## Configuration

### Backend URL Configuration
The website uses the configuration in `lib/config.ts` to determine the backend URL:

```typescript
export const config = {
  backendUrl: process.env.BACKEND_URL || 'https://cyberrazorbackend.vercel.app',
  userPortalUrl: process.env.USER_PORTAL_URL || 'https://cyberrazoruser.vercel.app',
}
```

### Environment Variables
Create a `.env.local` file in the website directory:

```env
BACKEND_URL=https://cyberrazorbackend.vercel.app
USER_PORTAL_URL=https://cyberrazoruser.vercel.app
```

## API Endpoints

### Website API Routes (Proxy to Backend)

- `POST /api/auth/signup` - Creates new user account
- `POST /api/auth/login` - Authenticates user and returns JWT token

### Backend API Routes

- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User authentication
- `GET /api/auth/me` - Get current user info
- `GET /api/auth/status` - Check account status

## User Account Statuses

- **pending**: Account created but awaiting admin approval
- **approved**: Account approved, user can login
- **rejected**: Account rejected by admin
- **active**: Account is active and in use

## Token Storage

The login process stores the JWT token in localStorage with the key `token` (required by user portal) and `access_token` (for consistency).

## Testing the Flow

1. Start the backend server:
   ```bash
   cd backend
   npm start
   ```

2. Start the website:
   ```bash
   cd website
   npm run dev
   ```

3. Start the user portal:
   ```bash
   cd user
   npm run dev
   ```

4. Test the flow:
   - Go to `http://localhost:3000/signup`
   - Create an account
   - You'll be redirected to login page
   - Login with your credentials
   - You'll be redirected to the user portal

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure backend CORS is configured to allow requests from website
2. **Token Not Found**: Check that token is stored correctly in localStorage
3. **Redirect Issues**: Verify user portal URL configuration
4. **Backend Connection**: Ensure backend is running on correct port

### Debug Steps

1. Check browser console for errors
2. Verify API calls in Network tab
3. Check localStorage for stored tokens
4. Ensure all services are running on correct ports
