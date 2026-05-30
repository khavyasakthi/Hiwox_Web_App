# Architecture Overview

## Table of Contents
- [System Architecture](#system-architecture)
- [Directory Structure](#directory-structure)
- [Data Flow](#data-flow)
- [Key Patterns](#key-patterns)
- [Authentication Flow](#authentication-flow)
- [State Management](#state-management)
- [API Integration](#api-integration)
- [Error Handling](#error-handling)
- [Testing Strategy](#testing-strategy)
- [Performance Considerations](#performance-considerations)
- [Security](#security)
- [Deployment](#deployment)

## System Architecture

### High-Level Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    HiWox Gym Mobile App                     │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   iOS App    │  │ Android App  │  │  Web App     │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│         │                 │                 │               │
│         └─────────────────┴─────────────────┘               │
│                      │                                       │
│              Expo Router (File-based routing)               │
│                      │                                       │
├─────────────────────┼─────────────────────────────────────┤
│  Presentation Layer │                                       │
│  ┌─────────────────────────────────────────────────┐       │
│  │         Components (UI + Features)              │       │
│  │  - Button, Input, Toast, Card, Loading         │       │
│  │  - Auth Forms, Workout, PPG Scanner            │       │
│  └─────────────────────────────────────────────────┘       │
│                      │                                       │
├──────────┬───────────┼───────────┬──────────────────────────┤
│ Hooks    │ Store     │ Services  │ Utils                    │
│ Layer    │ (Zustand) │ Layer     │                          │
│ ├─useAuth│ ├─Auth    │ ├─API     │ ├─Validation            │
│ ├─useToast  │ ├─User  │ ├─Auth   │ ├─Formatting            │
│ ├─useTheme  │ ├─PPG   │ ├─Storage│ ├─Helpers               │
│ └─useApi    └─────    │ └─PPG    │ └─Constants             │
│                       │                                      │
├───────────────────────┼──────────────────────────────────┤
│                  API Client Layer                         │
│  ┌─────────────────────────────────────────────────┐    │
│  │ - Axios HTTP Client                             │    │
│  │ - Request/Response Interceptors                 │    │
│  │ - Automatic Token Refresh                       │    │
│  │ - Error Handling & Logging                      │    │
│  └─────────────────────────────────────────────────┘    │
│                      │                                    │
├──────────────────────┼────────────────────────────────┤
│                 Storage Layer                          │
│  ┌─────────────────┐          ┌──────────────────┐   │
│  │ SecureStore     │          │  AsyncStorage    │   │
│  │ (Sensitive)     │          │  (App Data)      │   │
│  │ - Tokens        │          │ - User Prefs     │   │
│  │ - Keys          │          │ - Cache          │   │
│  └─────────────────┘          └──────────────────┘   │
│                      │                                │
├──────────────────────┼────────────────────────────────┤
│               External Services                       │
│  ┌─────────────┐  ┌──────────────┐  ┌────────────┐  │
│  │ Backend API │  │ Auth Service │  │ PPG Device │  │
│  └─────────────┘  └──────────────┘  └────────────┘  │
│                                                       │
└─────────────────────────────────────────────────────┘
```

## Directory Structure

### `/src` - Main Source Code

```
src/
├── app/                          # Expo Router screens (file-based routing)
│   ├── _layout.tsx              # Root layout wrapper
│   ├── index.tsx                # Root index
│   ├── (auth)/                  # Auth route group
│   │   ├── _layout.tsx
│   │   ├── login/
│   │   ├── register/
│   │   └── forgot-password/
│   └── (main)/                  # Main app route group
│       ├── _layout.tsx
│       ├── home/
│       ├── workouts/
│       ├── progress/
│       └── profile/
│
├── components/                   # Reusable React components
│   ├── ui/                      # Base UI components
│   │   ├── Button/              # Reusable button with variants
│   │   ├── Input/               # Input field component
│   │   ├── Toast/               # Toast notification
│   │   ├── Card/                # Card wrapper
│   │   ├── Loading/             # Loading spinner
│   │   └── Illustrations/       # SVG illustrations
│   │
│   └── features/                # Feature-specific components
│       ├── Auth/                # Authentication UI
│       ├── Workout/             # Workout features
│       ├── Progress/            # Progress tracking
│       └── PPG/                 # Heart rate scanner
│
├── services/                     # Business logic & external integrations
│   ├── api/                     # HTTP client
│   │   ├── client.ts            # Axios HTTP client with interceptors
│   │   ├── endpoints/           # API endpoint definitions
│   │   └── interceptors.ts      # Request/response handlers
│   │
│   ├── auth/                    # Authentication service
│   │   ├── authService.ts       # Login, logout, password reset
│   │   └── tokenManager.ts      # Token storage & refresh logic
│   │
│   ├── storage/                 # Storage abstraction
│   │   ├── secureStorage.ts     # Secure storage (sensitive data)
│   │   └── localStorage.ts      # Local storage (app data)
│   │
│   └── ppg/                     # PPG scanner service
│       ├── ppgService.ts        # Heart rate scanner logic
│       └── usePPGScanner.ts     # PPG hook wrapper
│
├── hooks/                        # Custom React hooks
│   ├── useAuth.ts               # Authentication state & logic
│   ├── useToast.ts              # Toast notifications
│   ├── useTheme.ts              # Theme management
│   ├── useApi.ts                # API data fetching
│   └── usePPG.ts                # PPG scanner state
│
├── store/                        # Zustand state management
│   └── slices/
│       ├── authStore.ts         # Auth state (user, tokens)
│       ├── userStore.ts         # User profile data
│       └── ppgStore.ts          # PPG scan results
│
├── types/                        # TypeScript type definitions
│   ├── auth.ts                  # Auth-related types
│   ├── user.ts                  # User types
│   ├── api.ts                   # API response/request types
│   ├── ppg.ts                   # PPG data types
│   └── common.ts                # Shared types
│
├── utils/                        # Utility functions
│   ├── validation/              # Input validation
│   │   ├── emailValidator.ts
│   │   └── passwordValidator.ts
│   ├── formatting/              # Data formatting
│   │   ├── dateFormatter.ts
│   │   └── numberFormatter.ts
│   ├── helpers/                 # Helper functions
│   │   ├── errorHandler.ts
│   │   └── asyncHandler.ts
│   └── constants/               # App constants
│       ├── api.ts               # API URLs & constants
│       ├── colors.ts            # Color constants
│       └── strings.ts           # UI strings
│
├── styles/                       # Design system & theme
│   ├── colors.ts                # Color palette
│   ├── spacing.ts               # Spacing system
│   ├── typography.ts            # Font styles
│   └── theme.ts                 # Theme configuration
│
└── config/                       # Application configuration
    ├── env.ts                   # Environment variables
    ├── logger.ts                # Logging service
    └── index.ts                 # Config exports
```

### `/android` & `/ios` - Native Code
- Expo-managed native projects
- PPG scanner native modules
- Platform-specific configurations

### `/__tests__` - Test Files
- Unit tests for services, hooks, utils
- Integration tests for API flows
- Component tests with React Testing Library

### `/docs` - Documentation
- Architecture, setup, API reference
- Migration guides, coding standards

## Data Flow

### Component → Hook → Store → Service → API

```
User Input
    ↓
Component State Update
    ↓
Hook (useAuth, useApi, etc.)
    ↓
Service Layer (authService, apiClient)
    ↓
API Request (with interceptors)
    ↓
Backend API
    ↓
Response Processing
    ↓
Store Update (Zustand)
    ↓
Component Re-render
    ↓
UI Update
```

### Detailed Login Flow

```
LoginForm.tsx
    │
    ├─ handleLogin()
    │   │
    │   ├─ useToast() → showToast()
    │   │
    │   ├─ authService.login(email, password)
    │   │   │
    │   │   ├─ apiClient.post('/auth/login', credentials)
    │   │   │   │
    │   │   │   ├─ Request Interceptor
    │   │   │   │   ├─ Get token from tokenManager
    │   │   │   │   ├─ Add Authorization header
    │   │   │   │   └─ Log request
    │   │   │   │
    │   │   │   ├─ HTTP Request
    │   │   │   │   └─ POST https://api.hiwox.com/api/auth/login
    │   │   │   │
    │   │   │   └─ Response Interceptor
    │   │   │       ├─ Handle 401 → Token refresh
    │   │   │       ├─ Extract data
    │   │   │       └─ Log response
    │   │   │
    │   │   └─ tokenManager.saveTokens(accessToken, refreshToken)
    │   │       └─ SecureStore.setItem()
    │   │
    │   ├─ useAuthStore().setAuthenticated(true)
    │   │
    │   └─ router.replace('/(main)/home')
    │
    └─ UI Update
```

## Key Patterns

### 1. Service Layer Pattern

All business logic is abstracted in services:

```typescript
// ❌ WRONG - Logic in component
export default function LoginScreen() {
  const handleLogin = async () => {
    const response = await axios.post('https://api.hiwox.com/api/auth/login', data);
    await AsyncStorage.setItem('token', response.data.token);
  };
}

// ✅ CORRECT - Logic in service
export default function LoginScreen() {
  const handleLogin = async () => {
    const result = await authService.login(email, password);
    if (result.success) {
      // User successfully authenticated
    }
  };
}
```

**Benefits:**
- Easier to test
- Reusable across components
- Centralized error handling
- Clear separation of concerns

### 2. Hook Pattern

Encapsulate stateful logic in custom hooks:

```typescript
// Custom hook
export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);
  
  useEffect(() => {
    checkAuthStatus();
  }, []);
  
  return { isLoading, isSignedIn };
};

// Usage in component
export default function App() {
  const { isLoading, isSignedIn } = useAuth();
  
  if (isLoading) return <LoadingScreen />;
  if (!isSignedIn) return <AuthStack />;
  return <MainStack />;
}
```

**Benefits:**
- Reusable across components
- Easier to test
- Cleaner components

### 3. Store Pattern (Zustand)

Centralized global state:

```typescript
// Store definition
export const useAuthStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
}));

// Usage in component
export default function ProfileScreen() {
  const { user, logout } = useAuthStore();
  
  return (
    <>
      <Text>Welcome, {user?.name}</Text>
      <Button onPress={logout} title="Logout" />
    </>
  );
}
```

**Benefits:**
- Global state without prop drilling
- Easy to subscribe to specific slices
- DevTools support

### 4. API Client Pattern

Centralized HTTP handling:

```typescript
// Request interceptor
- Adds auth token
- Logs requests
- Validates data

// Response interceptor
- Handles 401 (token refresh)
- Extracts response data
- Logs responses
- Handles errors

// Error handling
- Network errors
- Validation errors
- Server errors
```

## Authentication Flow

### 1. Login

```
User enters credentials
    ↓
authService.login(email, password)
    ↓
apiClient.post('/auth/login', { email, password })
    ↓
Backend validates and returns tokens
    ↓
tokenManager.saveTokens(accessToken, refreshToken)
    ↓
Tokens stored in SecureStore
    ↓
useAuthStore().setAuthenticated(true)
    ↓
Navigate to main app
```

### 2. Token Refresh (Automatic)

```
API returns 401 Unauthorized
    ↓
Response interceptor catches 401
    ↓
Check if refresh already in progress
    ↓
If not, call authService.refreshToken()
    ↓
apiClient.post('/auth/refresh', { refreshToken })
    ↓
Backend returns new accessToken
    ↓
tokenManager.saveTokens(newAccessToken)
    ↓
Retry original request with new token
    ↓
Success or fail based on retry
```

### 3. Logout

```
User taps logout button
    ↓
authService.logout()
    ↓
apiClient.post('/auth/logout')
    ↓
tokenManager.clearTokens()
    ↓
Tokens removed from SecureStore
    ↓
useAuthStore().logout()
    ↓
Navigate to login screen
```

### 4. Password Reset

```
User requests password reset
    ↓
authService.sendPasswordResetEmail(email)
    ↓
Backend sends OTP to email
    ↓
User enters OTP
    ↓
authService.verifyPasswordResetOtp(email, otp)
    ↓
OTP validated by backend
    ↓
User enters new password
    ↓
authService.resetPassword(email, newPassword, otp)
    ↓
Password updated in database
    ↓
Navigate to login
```

## State Management

### Zustand Stores

```
useAuthStore
├── user: User | null
├── isAuthenticated: boolean
├── setUser(user)
├── setAuthenticated(bool)
└── logout()

useUserStore
├── profile: UserProfile
├── preferences: UserPreferences
├── setProfile(profile)
└── updatePreferences(prefs)

usePPGStore (renamed from useScanStore)
├── latest: ScanResult | null
├── ppg: PPGPoint[]
├── setLatest(result)
├── setPPG(data)
└── clear()
```

### State Flow

```
                    ┌─────────────────┐
                    │  Zustand Store  │
                    └────────┬────────┘
                             │
                   ┌─────────┴──────────┐
                   │                    │
          ┌────────▼────────┐  ┌───────▼────────┐
          │  Component A    │  │  Component B   │
          └─────────────────┘  └────────────────┘
                   │                    │
                   └─────────┬──────────┘
                             │
                    ┌────────▼────────┐
                    │ State Updated   │
                    │ Re-render       │
                    └─────────────��───┘
```

## API Integration

### Request/Response Cycle

```
1. Request
   ├─ Interceptor adds Authorization header
   ├─ Adds Content-Type: application/json
   ├─ Logs request details
   └─ Sends to backend

2. Response
   ├─ Check status code
   ├─ If 401: Refresh token
   ├─ If 2xx: Extract data
   ├─ If 4xx/5xx: Handle error
   └─ Log response

3. Error Handling
   ├─ Network error: "Check connection"
   ├─ Server error: Show server message
   ├─ Validation error: Show field errors
   └─ Auth error: Redirect to login
```

### API Response Format

```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;              // Actual response data
  error?: string;        // Error code
  message?: string;      // Error message
}

// Usage
const result = await apiClient.post('/auth/login', credentials);
if (result.success) {
  // result.data contains LoginResponse
} else {
  // result.message contains error message
}
```

## Error Handling

### Global Error Strategy

```
Error Occurs
    ↓
┌───────────────────┐
│ Error Type?       │
└───────────────────┘
    │
    ├─ Network Error
    │   └─ Show: "Check your internet connection"
    │
    ├─ Auth Error (401)
    │   ├─ Try token refresh
    │   ├─ If refresh fails: Clear tokens, redirect to login
    │   └─ If refresh succeeds: Retry request
    │
    ├─ Validation Error (400)
    │   └─ Show: Field-specific errors
    │
    ├─ Server Error (5xx)
    │   └─ Show: "Server error. Please try again later"
    │
    ├─ Client Error (Other 4xx)
    │   └─ Show: "Request failed. Please try again"
    │
    └─ Unknown Error
        └─ Log and show: "An unexpected error occurred"

Error logged with:
├─ Timestamp
├─ Error code
├─ Error message
├─ Request details
└─ Stack trace (development only)
```

### Logger Configuration

```typescript
// Development
LOG_LEVEL: 'debug'
├─ Logs: debug, info, warn, error

// Staging
LOG_LEVEL: 'info'
├─ Logs: info, warn, error

// Production
LOG_LEVEL: 'error'
├─ Logs: error only
```

## Testing Strategy

### Test Pyramid

```
              ▲
             ╱ ╲
            ╱   ╲           End-to-End (5%)
           ╱  E2E ╲         Slow, real browser
          ╱────────╲
         ╱          ╲
        ╱   E2E      ╲
       ╱──────────────╲
      ╱                ╲
     ╱   Integration   ╲       Integration (15%)
    ╱   (API Flows)     ╲      Moderate speed
   ╱────────────────────╲
  ╱                      ╲
 ╱   Unit Tests           ╲     Unit (80%)
╱  (Services, Hooks,      ╲    Fast, isolated
╱   Utils, Store)          ╲
╱──────────────────────────╲
```

### What to Test

```
✅ MUST TEST
├─ Services (authService, apiClient)
├─ Hooks (useAuth, useToast, useApi)
├─ Stores (authStore, ppgStore)
├─ Utilities (validation, formatting)
└─ Custom components

⚠️ CONSIDER TESTING
├─ Complex UI components
├─ User interactions
├─ Navigation flows
└─ Error states

❌ DON'T TEST
├─ Built-in React Native components
├─ Third-party libraries
├─ Simple UI components (Button, Input)
└─ Static data
```

### Testing Examples

```typescript
// Service test
describe('authService', () => {
  it('should login successfully', async () => {
    const result = await authService.login('user@example.com', 'password');
    expect(result.success).toBe(true);
  });
});

// Hook test
describe('useAuth', () => {
  it('should check auth status on mount', () => {
    const { result } = renderHook(() => useAuth());
    expect(result.current.isLoading).toBe(true);
  });
});

// Store test
describe('useAuthStore', () => {
  it('should set user', () => {
    const { result } = renderHook(() => useAuthStore());
    act(() => {
      result.current.setUser({ id: '1', email: 'user@example.com' });
    });
    expect(result.current.user).toBeDefined();
  });
});
```

## Performance Considerations

### 1. Component Optimization

```typescript
// Memoize components
export const UserCard = React.memo(({ user }) => {
  return <View>{/* render user */}</View>;
});

// Use useCallback for handlers
const handlePress = useCallback(() => {
  // handle press
}, []);

// Use useMemo for expensive calculations
const expensiveValue = useMemo(() => {
  return complexCalculation(data);
}, [data]);
```

### 2. Image Optimization

```typescript
// Use expo-image for better performance
import { Image } from 'expo-image';

<Image
  source={require('./image.png')}
  style={{ width: 200, height: 200 }}
  contentFit="cover"
/>
```

### 3. Route Optimization

```typescript
// Lazy load screens
const HomeScreen = lazy(() => import('./home'));
const WorkoutScreen = lazy(() => import('./workouts'));
```

### 4. API Call Optimization

```typescript
// Cache API responses
const useUserData = () => {
  const cache = useRef(null);
  const [data, setData] = useState(null);
  
  useEffect(() => {
    if (cache.current) {
      setData(cache.current);
      return;
    }
    // Fetch data
  }, []);
};
```

## Security

### 1. Token Management

- Tokens stored in SecureStore (not AsyncStorage)
- Automatic token refresh
- Token expiry validation
- Tokens cleared on logout

### 2. API Security

- HTTPS only (no HTTP)
- Request validation
- Response validation
- Rate limiting
- CORS headers

### 3. Data Security

- Sensitive data in SecureStore
- App data in AsyncStorage
- Encryption for cached data
- No logging of sensitive data

### 4. Code Security

- No hardcoded secrets
- Environment variables for config
- Input validation
- Output sanitization

## Deployment

### Build Process

```
Code Commit
    ↓
CI/CD Pipeline
├─ ESLint check
├─ TypeScript check
├─ Unit tests
├─ Build app
└─ Run E2E tests
    ↓
If all pass:
├─ Deploy to staging
├─ Run smoke tests
└─ Deploy to production
    ↓
If failure:
└─ Notify team
```

### Environment Setup

```
Development → Staging → Production
├─ API_BASE_URL
├─ LOG_LEVEL
├─ ENABLE_OFFLINE_MODE
└─ Feature flags
```

## Best Practices

### Do's ✅
- Use path aliases (@/)
- Use TypeScript
- Abstract business logic in services
- Use custom hooks for stateful logic
- Write tests
- Use logger instead of console
- Keep components small and focused
- Use Zustand for global state
- Handle errors gracefully
- Keep types in /types

### Don'ts ❌
- Don't use AsyncStorage for sensitive data
- Don't hardcode API URLs
- Don't use `any` types
- Don't put business logic in components
- Don't use inline styles (use StyleSheet)
- Don't log sensitive data
- Don't ignore TypeScript errors
- Don't nest components deeply
- Don't make components too large
- Don't ignore error handling

## Troubleshooting

### Common Issues

**Problem:** Imports not resolving
**Solution:** Check tsconfig.json paths match exactly

**Problem:** Tokens not persisting
**Solution:** Ensure using expo-secure-store, not AsyncStorage

**Problem:** API calls failing
**Solution:** Check API_BASE_URL in config/env.ts, ensure HTTPS

**Problem:** Components not re-rendering
**Solution:** Check Zustand store is properly subscribed

**Problem:** Build failing
**Solution:** Run `npm run validate` to check all issues

## References

- [Expo Documentation](https://docs.expo.dev)
- [React Native Docs](https://reactnative.dev)
- [Zustand Docs](https://github.com/pmndrs/zustand)
- [Axios Docs](https://axios-http.com)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)