# API Documentation

Complete reference for HiWox Gym App API endpoints, authentication, and integration.

## Table of Contents
- [Base URL](#base-url)
- [Authentication](#authentication)
- [Response Format](#response-format)
- [Error Handling](#error-handling)
- [Authentication Endpoints](#authentication-endpoints)
- [User Endpoints](#user-endpoints)
- [Workout Endpoints](#workout-endpoints)
- [Progress Endpoints](#progress-endpoints)
- [PPG Endpoints](#ppg-endpoints)
- [Rate Limiting](#rate-limiting)
- [Pagination](#pagination)
- [Filtering & Sorting](#filtering--sorting)
- [Examples](#examples)

## Base URL

```
Development:  https://dev-api.hiwox.com/api
Staging:      https://staging-api.hiwox.com/api
Production:   https://api.hiwox.com/api
```

## Authentication

### Authorization Header

All endpoints (except auth/login and auth/register) require Bearer token:

```
Authorization: Bearer <access_token>
```

### Token Refresh

Tokens automatically refresh on 401 response. No manual action needed.

```
POST /auth/refresh
Content-Type: application/json

{
  "refreshToken": "refresh_token_here"
}
```

---

## Response Format

### Success Response (2xx)

```json
{
  "success": true,
  "data": {
    "id": "user_123",
    "email": "user@example.com",
    "name": "John Doe"
  },
  "message": "Operation successful"
}
```

### Error Response (4xx, 5xx)

```json
{
  "success": false,
  "error": "ERROR_CODE",
  "message": "Human readable error message",
  "details": {
    "field": "email",
    "reason": "Email already exists"
  }
}
```

### Response Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Success |
| 201 | Created - Resource created |
| 204 | No Content - Success, no body |
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Token invalid/expired |
| 403 | Forbidden - Access denied |
| 404 | Not Found - Resource not found |
| 409 | Conflict - Resource conflict |
| 429 | Too Many Requests - Rate limited |
| 500 | Internal Server Error |
| 503 | Service Unavailable |

---

## Error Handling

### Common Error Codes

```
AUTH_INVALID_CREDENTIALS    - Invalid email or password
AUTH_TOKEN_EXPIRED          - Token has expired
AUTH_USER_NOT_FOUND         - User not found
AUTH_EMAIL_EXISTS           - Email already registered
AUTH_WEAK_PASSWORD          - Password doesn't meet requirements
AUTH_OTP_INVALID            - Invalid or expired OTP
AUTH_OTP_EXPIRED            - OTP has expired

VALIDATION_ERROR            - Input validation failed
RATE_LIMIT_EXCEEDED         - Too many requests
SERVER_ERROR                - Internal server error
SERVICE_UNAVAILABLE         - Service temporarily down
```

### Error Response Example

```json
{
  "success": false,
  "error": "AUTH_INVALID_CREDENTIALS",
  "message": "Invalid email or password",
  "statusCode": 401
}
```

---

## Authentication Endpoints

### POST /auth/register

Register a new user account.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "name": "John Doe",
  "age": 25,
  "gender": "male",
  "phone": "+1234567890"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "user_123",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "user",
    "createdAt": "2026-04-17T10:30:00Z"
  },
  "message": "User registered successfully"
}
```

**Error (400):**
```json
{
  "success": false,
  "error": "VALIDATION_ERROR",
  "message": "Password must contain uppercase, lowercase, number, and special character",
  "details": {
    "field": "password",
    "reason": "Weak password"
  }
}
```

---

### POST /auth/login

Authenticate user and get tokens.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": 3600,
    "user": {
      "id": "user_123",
      "email": "user@example.com",
      "name": "John Doe",
      "role": "user",
      "age": 25,
      "gender": "male"
    }
  },
  "message": "Login successful"
}
```

**Error (401):**
```json
{
  "success": false,
  "error": "AUTH_INVALID_CREDENTIALS",
  "message": "Invalid email or password"
}
```

---

### POST /auth/send-reset-email

Request password reset email with OTP.

**Request:**
```json
{
  "email": "user@example.com"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Password reset email sent to user@example.com",
  "data": {
    "resetTokenExpiry": "2026-04-17T11:30:00Z"
  }
}
```

---

### POST /auth/verify-otp

Verify OTP from password reset email.

**Request:**
```json
{
  "email": "user@example.com",
  "otp": "123456"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "OTP verified successfully",
  "data": {
    "resetToken": "reset_token_here",
    "expiresIn": 1800
  }
}
```

**Error (400):**
```json
{
  "success": false,
  "error": "AUTH_OTP_INVALID",
  "message": "Invalid or expired OTP"
}
```

---

### POST /auth/reset-password

Reset password using OTP.

**Request:**
```json
{
  "email": "user@example.com",
  "otp": "123456",
  "newPassword": "NewSecurePass123!"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Password reset successfully"
}
```

---

### POST /auth/logout

Logout user and invalidate tokens.

**Request:**
```
Authorization: Bearer <access_token>
```

**Response (200):**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

### POST /auth/refresh

Refresh expired access token.

**Request:**
```json
{
  "refreshToken": "refresh_token_here"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "accessToken": "new_access_token_here",
    "expiresIn": 3600
  }
}
```

---

## User Endpoints

### GET /user/profile

Get current user profile.

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "user_123",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "user",
    "age": 25,
    "gender": "male",
    "phone": "+1234567890",
    "weight": 75,
    "height": 180,
    "profileImage": "https://...",
    "createdAt": "2026-04-17T10:30:00Z",
    "updatedAt": "2026-04-17T10:30:00Z"
  }
}
```

---

### PUT /user/profile

Update user profile.

**Headers:**
```
Authorization: Bearer <access_token>
Content-Type: application/json
```

**Request:**
```json
{
  "name": "John Smith",
  "age": 26,
  "weight": 76,
  "height": 181,
  "phone": "+1234567891"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "user_123",
    "name": "John Smith",
    "age": 26,
    "weight": 76,
    "height": 181,
    "phone": "+1234567891",
    "updatedAt": "2026-04-17T11:00:00Z"
  },
  "message": "Profile updated successfully"
}
```

---

### PUT /user/change-password

Change password.

**Request:**
```json
{
  "currentPassword": "OldPass123!",
  "newPassword": "NewPass123!"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Password changed successfully"
}
```

---

### GET /user/preferences

Get user preferences.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "theme": "dark",
    "language": "en",
    "notifications": {
      "workoutReminder": true,
      "progressUpdate": true,
      "socialNotifications": false
    },
    "privacyLevel": "friends"
  }
}
```

---

### PUT /user/preferences

Update user preferences.

**Request:**
```json
{
  "theme": "light",
  "language": "es",
  "notifications": {
    "workoutReminder": false,
    "progressUpdate": true
  }
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Preferences updated"
}
```

---

## Workout Endpoints

### GET /workouts

Get user's workouts (paginated).

**Query Parameters:**
```
?page=1&limit=20&status=active&sortBy=createdAt&order=desc
```

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "workout_123",
      "userId": "user_123",
      "name": "Push Day",
      "description": "Chest, shoulders, triceps",
      "exercises": [
        {
          "id": "exercise_1",
          "name": "Bench Press",
          "sets": 4,
          "reps": 8,
          "weight": 100,
          "duration": 45
        }
      ],
      "duration": 60,
      "difficulty": "intermediate",
      "status": "active",
      "createdAt": "2026-04-17T10:00:00Z",
      "updatedAt": "2026-04-17T10:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 5,
    "pages": 1
  }
}
```

---

### GET /workouts/:id

Get specific workout details.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "workout_123",
    "userId": "user_123",
    "name": "Push Day",
    "description": "Chest, shoulders, triceps",
    "exercises": [
      {
        "id": "exercise_1",
        "name": "Bench Press",
        "sets": 4,
        "reps": 8,
        "weight": 100,
        "restTime": 90,
        "notes": "Feel strong today"
      }
    ],
    "duration": 60,
    "difficulty": "intermediate",
    "createdAt": "2026-04-17T10:00:00Z"
  }
}
```

---

### POST /workouts

Create new workout.

**Request:**
```json
{
  "name": "Leg Day",
  "description": "Quads, hamstrings, glutes",
  "exercises": [
    {
      "name": "Squats",
      "sets": 4,
      "reps": 10,
      "weight": 150,
      "restTime": 120
    }
  ],
  "duration": 75,
  "difficulty": "hard"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "workout_456",
    "userId": "user_123",
    "name": "Leg Day",
    "exercises": [
      {
        "id": "exercise_2",
        "name": "Squats",
        "sets": 4,
        "reps": 10,
        "weight": 150
      }
    ],
    "status": "active",
    "createdAt": "2026-04-17T12:00:00Z"
  },
  "message": "Workout created successfully"
}
```

---

### PUT /workouts/:id

Update workout.

**Request:**
```json
{
  "name": "Leg Day Updated",
  "duration": 80
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "workout_456",
    "name": "Leg Day Updated",
    "duration": 80,
    "updatedAt": "2026-04-17T12:30:00Z"
  },
  "message": "Workout updated successfully"
}
```

---

### DELETE /workouts/:id

Delete workout.

**Response (204):**
```
No content
```

---

### POST /workouts/:id/log

Log completed workout.

**Request:**
```json
{
  "duration": 65,
  "exercises": [
    {
      "id": "exercise_1",
      "actualSets": 4,
      "actualReps": 8,
      "actualWeight": 102,
      "notes": "Felt strong"
    }
  ],
  "notes": "Great workout today!"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "log_123",
    "workoutId": "workout_123",
    "duration": 65,
    "exercises": [...],
    "completedAt": "2026-04-17T12:45:00Z"
  },
  "message": "Workout logged successfully"
}
```

---

## Progress Endpoints

### GET /progress/summary

Get progress summary.

**Query Parameters:**
```
?period=month&metric=weight,strength
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "period": "month",
    "startDate": "2026-03-17",
    "endDate": "2026-04-17",
    "metrics": {
      "weight": {
        "current": 76,
        "previous": 78,
        "change": -2,
        "unit": "kg"
      },
      "workoutsCompleted": 12,
      "totalDuration": 780,
      "averageDuration": 65,
      "strengthGain": {
        "benchPress": {
          "previous": 100,
          "current": 105,
          "change": 5
        }
      }
    }
  }
}
```

---

### GET /progress/charts

Get progress chart data.

**Query Parameters:**
```
?type=weight&period=3months&interval=week
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "type": "weight",
    "period": "3months",
    "interval": "week",
    "dataPoints": [
      {
        "date": "2026-01-17",
        "value": 80
      },
      {
        "date": "2026-01-24",
        "value": 79.5
      },
      {
        "date": "2026-01-31",
        "value": 79
      }
    ],
    "statistics": {
      "average": 77.5,
      "min": 76,
      "max": 80,
      "trend": "decreasing"
    }
  }
}
```

---

### POST /progress/goals

Create progress goal.

**Request:**
```json
{
  "type": "weight_loss",
  "targetValue": 70,
  "currentValue": 76,
  "unit": "kg",
  "dueDate": "2026-06-17",
  "description": "Lose 6kg by summer"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "goal_123",
    "type": "weight_loss",
    "targetValue": 70,
    "progress": 0,
    "status": "in_progress",
    "createdAt": "2026-04-17T13:00:00Z"
  }
}
```

---

## PPG Endpoints

### POST /ppg/scan

Start PPG heart rate scan.

**Request:**
```json
{
  "duration": 60,
  "calibrationFrames": 30
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "scanId": "scan_123",
    "status": "in_progress",
    "startedAt": "2026-04-17T13:30:00Z"
  }
}
```

---

### POST /ppg/scan/:scanId/complete

Complete PPG scan and submit results.

**Request:**
```json
{
  "hr": 72,
  "hrv": 45,
  "rmssd": 35,
  "sdnn": 42,
  "confidence": 0.95,
  "quality": "High",
  "samples": 300
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "result_123",
    "scanId": "scan_123",
    "hr": 72,
    "hrv": 45,
    "rmssd": 35,
    "sdnn": 42,
    "confidence": 0.95,
    "quality": "High",
    "timestamp": "2026-04-17T13:31:00Z"
  },
  "message": "Scan results saved successfully"
}
```

---

### GET /ppg/history

Get PPG scan history.

**Query Parameters:**
```
?page=1&limit=20&period=month
```

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "result_123",
      "hr": 72,
      "hrv": 45,
      "rmssd": 35,
      "quality": "High",
      "timestamp": "2026-04-17T13:31:00Z"
    },
    {
      "id": "result_122",
      "hr": 68,
      "hrv": 48,
      "rmssd": 38,
      "quality": "High",
      "timestamp": "2026-04-16T13:31:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 30
  }
}
```

---

### GET /ppg/trends

Get PPG trends and insights.

**Query Parameters:**
```
?period=month&metric=hr,hrv
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "period": "month",
    "metrics": {
      "hr": {
        "average": 70,
        "min": 65,
        "max": 78,
        "trend": "stable"
      },
      "hrv": {
        "average": 45,
        "min": 40,
        "max": 52,
        "trend": "improving"
      }
    },
    "insights": [
      "Your resting heart rate is healthy",
      "HRV has improved by 15% this month",
      "Best HRV readings are in the morning"
    ]
  }
}
```

---

## Rate Limiting

API is rate limited to prevent abuse:

```
Headers:
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1713360000
```

### Limits by Endpoint Category

| Category | Limit | Window |
|----------|-------|--------|
| Auth | 5 requests | 15 minutes |
| General | 1000 requests | 1 hour |
| Uploads | 100 requests | 1 hour |
| Search | 500 requests | 1 hour |

### Rate Limit Error

```json
{
  "success": false,
  "error": "RATE_LIMIT_EXCEEDED",
  "message": "Too many requests. Try again in 300 seconds.",
  "retryAfter": 300
}
```

---

## Pagination

### Query Parameters

```
?page=1        // Page number (default: 1)
&limit=20      // Items per page (default: 20, max: 100)
&offset=0      // Offset for items
```

### Response Format

```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "pages": 8,
    "hasMore": true,
    "offset": 0
  }
}
```

---

## Filtering & Sorting

### Filtering

```
?filter[status]=active
?filter[difficulty]=intermediate
?filter[createdAt][gte]=2026-04-01
?filter[createdAt][lte]=2026-04-30
```

### Sorting

```
?sortBy=createdAt    // Field to sort by
&order=desc          // asc or desc (default: desc)

// Multiple sorts
?sortBy=difficulty,createdAt&order=asc,desc
```

### Search

```
?search=push%20day   // Full-text search
?searchFields=name,description  // Fields to search
```

---

## Examples

### Example 1: Complete Login Flow

```typescript
import { apiClient } from '@/services/api/client';

// 1. Register
const registerResult = await apiClient.post('/auth/register', {
  email: 'user@example.com',
  password: 'SecurePass123!',
  name: 'John Doe'
});

// 2. Login
const loginResult = await apiClient.post('/auth/login', {
  email: 'user@example.com',
  password: 'SecurePass123!'
});

if (loginResult.success) {
  const { accessToken, refreshToken, user } = loginResult.data;
  // Token automatically stored in SecureStore
  // User can now access protected endpoints
}
```

### Example 2: Create and Log Workout

```typescript
// 1. Create workout
const workoutResult = await apiClient.post('/workouts', {
  name: 'Push Day',
  exercises: [
    {
      name: 'Bench Press',
      sets: 4,
      reps: 8,
      weight: 100
    }
  ],
  duration: 60
});

const workoutId = workoutResult.data.id;

// 2. Log completed workout
const logResult = await apiClient.post(`/workouts/${workoutId}/log`, {
  duration: 58,
  exercises: [
    {
      id: 'exercise_1',
      actualSets: 4,
      actualReps: 8,
      actualWeight: 102
    }
  ]
});
```

### Example 3: Get Progress Data

```typescript
// Get progress summary
const progressResult = await apiClient.get('/progress/summary', {
  params: {
    period: 'month',
    metric: 'weight,strength'
  }
});

// Get chart data
const chartResult = await apiClient.get('/progress/charts', {
  params: {
    type: 'weight',
    period: '3months',
    interval: 'week'
  }
});

// Get trends
const trendsResult = await apiClient.get('/ppg/trends', {
  params: {
    period: 'month'
  }
});
```

### Example 4: Error Handling

```typescript
try {
  const result = await apiClient.post('/workouts', data);
  
  if (!result.success) {
    // Handle API error
    console.error(result.error, result.message);
    showToast(result.message, 'error');
  } else {
    // Success
    console.log(result.data);
    showToast('Workout created successfully', 'success');
  }
} catch (error) {
  // Network or other error
  console.error('API Error:', error);
  showToast('Network error occurred', 'error');
}
```

---

## Webhook Events

Subscribe to webhook events for real-time updates:

```json
{
  "event": "workout.completed",
  "data": {
    "workoutId": "workout_123",
    "userId": "user_123",
    "completedAt": "2026-04-17T14:00:00Z"
  }
}
```

### Available Events

- `user.registered` - New user registered
- `user.updated` - User profile updated
- `workout.created` - Workout created
- `workout.updated` - Workout updated
- `workout.logged` - Workout completed
- `ppg.scan_completed` - PPG scan finished
- `goal.achieved` - User achieved goal

---

## API Client Implementation

### Using the HiWox API Client

```typescript
import { apiClient } from '@/services/api/client';

// GET
const result = await apiClient.get('/workouts');

// POST
const result = await apiClient.post('/workouts', data);

// PUT
const result = await apiClient.put('/workouts/123', data);

// DELETE
const result = await apiClient.delete('/workouts/123');

// Custom headers
const result = await apiClient.post('/endpoint', data, {
  headers: { 'X-Custom-Header': 'value' }
});
```

---

## Support

- **API Status**: [status.hiwox.com](https://status.hiwox.com)
- **Documentation**: [docs.hiwox.com](https://docs.hiwox.com)
- **Email**: api-support@hiwox.com
- **Slack**: #api-support

Last Updated: April 17, 2026