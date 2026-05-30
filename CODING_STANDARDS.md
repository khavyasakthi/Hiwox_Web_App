# Coding Standards & Best Practices

Code style guidelines and best practices for the HiWox Gym App project.

## Table of Contents
- [TypeScript Standards](#typescript-standards)
- [Naming Conventions](#naming-conventions)
- [File Organization](#file-organization)
- [Component Guidelines](#component-guidelines)
- [Service Guidelines](#service-guidelines)
- [Hook Guidelines](#hook-guidelines)
- [State Management](#state-management)
- [Error Handling](#error-handling)
- [Logging](#logging)
- [Comments & Documentation](#comments--documentation)
- [Testing Standards](#testing-standards)
- [Performance](#performance)
- [Accessibility](#accessibility)
- [Security](#security)
- [Tools & Automation](#tools--automation)

---

## TypeScript Standards

### 1. Always Use Explicit Types

```typescript
// ❌ BAD - Implicit any
const user = getUserData();

// ✅ GOOD - Explicit type
const user: User = getUserData();
```

### 2. No `any` Type

```typescript
// ❌ BAD
function process(data: any) {
  return data.value;
}

// ✅ GOOD
interface Data {
  value: string;
}

function process(data: Data) {
  return data.value;
}
```

### 3. Explicit Return Types

```typescript
// ❌ BAD
export const getUserName = (userId: string) => {
  return userId.split('_')[0];
};

// ✅ GOOD
export const getUserName = (userId: string): string => {
  return userId.split('_')[0];
};

// ✅ GOOD (async)
export const fetchUser = async (userId: string): Promise<User> => {
  return await apiClient.get(`/users/${userId}`);
};
```

### 4. Use Interfaces for Objects

```typescript
// ❌ BAD
type User = {
  id: string;
  name: string;
  email: string;
};

// ✅ GOOD
interface User {
  id: string;
  name: string;
  email: string;
}

// ✅ GOOD - For unions/tuples
type Result = User | Error;
```

### 5. Strict Mode Enabled

All files must work with TypeScript strict mode:

```typescript
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "noImplicitAny": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true
  }
}
```

### 6. Type Imports

```typescript
// ✅ GOOD - Type-only imports
import type { User, LoginRequest } from '@/types/auth';

// ✅ GOOD - Mixed imports
import { authService } from '@/services/auth/authService';
import type { AuthResponse } from '@/types/auth';
```

---

## Naming Conventions

### Variables & Constants

```typescript
// ❌ BAD
const u = "john";
const usr_name = "John Doe";
const USER_DATA = getUserData();

// ✅ GOOD
const userId = "john";
const userName = "John Doe";
const userData = getUserData();

// ✅ GOOD - Constants
const API_BASE_URL = "https://api.hiwox.com";
const MAX_RETRY_ATTEMPTS = 3;
const SOCKET_TIMEOUT_MS = 30000;
```

### Functions & Methods

```typescript
// ✅ GOOD - camelCase for functions
function validateEmail(email: string): boolean { }
const getUserWorkouts = async (userId: string): Promise<Workout[]> => { }

// ✅ GOOD - Verb prefix for actions
const handleLoginSubmit = () => { }
const fetchUserProfile = () => { }
const calculateProgress = () => { }
const formatDate = () => { }
```

### Components

```typescript
// ✅ GOOD - PascalCase for components
export const LoginForm = () => { }
export const WorkoutCard = () => { }
export const ProgressChart = () => { }
```

### Files & Directories

```typescript
// ✅ GOOD - kebab-case for files/folders
src/utils/email-validator.ts
src/components/ui/toast/
src/hooks/use-auth.ts
src/types/auth.ts
src/store/slices/auth-store.ts

// ✅ GOOD - PascalCase for React components
src/components/LoginForm.tsx
src/components/WorkoutCard.tsx
```

### Private/Protected

```typescript
// ✅ GOOD - Prefix private properties
private _internalState: State;
private _handleInternalLogic(): void { }

// ✅ GOOD - Indicate private with naming
const _privateHelper = () => { };
const __internalOnly = () => { };
```

---

## File Organization

### Component Structure

```typescript
// ✅ GOOD structure
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// 1. Types (at top)
interface ButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
}

// 2. Component
const Button: React.FC<ButtonProps> = ({ title, onPress, disabled = false }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

// 3. Styles (at bottom)
const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  text: {
    fontSize: 16,
  },
});

// 4. Export
export default Button;
```

### Folder Organization

```
Feature/
├── Component.tsx          # Main component
├── Component.styles.ts    # Styles
├── Component.types.ts     # Types/interfaces
├── index.ts              # Export
└── __tests__/            # Tests
    └── Component.test.tsx
```

---

## Component Guidelines

### 1. Functional Components

```typescript
// ✅ GOOD - Functional component with hooks
const MyComponent: React.FC<Props> = ({ prop1, prop2 }) => {
  const [state, setState] = useState<string>('');
  
  useEffect(() => {
    // effect
  }, []);
  
  return (
    <View>
      <Text>{prop1}</Text>
    </View>
  );
};

export default MyComponent;
```

### 2. Props Interface

```typescript
// ✅ GOOD - Explicit props interface
interface CardProps {
  title: string;
  description?: string;
  onPress?: () => void;
  disabled?: boolean;
}

const Card: React.FC<CardProps> = ({
  title,
  description,
  onPress,
  disabled = false,
}) => {
  // component body
};
```

### 3. Keep Components Small

```typescript
// ❌ BAD - Component too large
const UserProfile = () => {
  // 500+ lines of code
};

// ✅ GOOD - Split into smaller components
const UserProfile = () => {
  return (
    <View>
      <UserHeader />
      <UserStats />
      <UserActions />
    </View>
  );
};

const UserHeader = () => { /* small component */ };
const UserStats = () => { /* small component */ };
const UserActions = () => { /* small component */ };
```

### 4. Memoization

```typescript
// ✅ GOOD - Memoize expensive components
export const UserCard = React.memo(({ user, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text>{user.name}</Text>
    </TouchableOpacity>
  );
});

// ✅ GOOD - useCallback for handlers
const handlePress = useCallback(() => {
  // handler
}, []);

// ✅ GOOD - useMemo for calculations
const expensiveValue = useMemo(() => {
  return complexCalculation(data);
}, [data]);
```

---

## Service Guidelines

### 1. Single Responsibility

```typescript
// ✅ GOOD - Each service has one responsibility
export const authService = {
  async login(email: string, password: string): Promise<LoginResponse> {
    return await apiClient.post('/auth/login', { email, password });
  },
};

export const tokenManager = {
  async saveTokens(access: string, refresh: string): Promise<void> {
    await secureStorage.setItem('accessToken', access);
  },
};
```

### 2. Error Handling

```typescript
// ✅ GOOD - Proper error handling in service
export const authService = {
  async login(email: string, password: string): Promise<AuthResponse> {
    try {
      const result = await apiClient.post('/auth/login', {
        email,
        password,
      });
      
      if (!result.success) {
        return {
          success: false,
          message: result.message,
        };
      }
      
      await tokenManager.saveTokens(
        result.data.accessToken,
        result.data.refreshToken
      );
      
      return { success: true, data: result.data };
    } catch (error) {
      logger.error('Login error:', error);
      return {
        success: false,
        message: 'Network error occurred',
      };
    }
  },
};
```

### 3. Dependency Injection

```typescript
// ✅ GOOD - Services depend on lower-level services
class UserService {
  constructor(
    private apiClient: ApiClient,
    private storage: StorageService
  ) {}
  
  async getUser(id: string): Promise<User> {
    // use dependencies
  }
}
```

---

## Hook Guidelines

### 1. Custom Hook Pattern

```typescript
// ✅ GOOD - Custom hook for reusable logic
export const useAuth = (): UseAuthReturn => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);
  
  useEffect(() => {
    checkAuthStatus();
  }, []);
  
  const logout = useCallback(async () => {
    await authService.logout();
    setIsSignedIn(false);
  }, []);
  
  return { isLoading, isSignedIn, logout };
};
```

### 2. Hook Rules

```typescript
// ✅ GOOD - Follow Hook Rules
export const useData = () => {
  // Rules: only call at top level
  const [data, setData] = useState(null);
  
  // Rules: don't call inside conditions
  useEffect(() => {
    // ...
  }, []);
  
  // Rules: only call from React functions
  return { data };
};
```

### 3. Dependency Arrays

```typescript
// ✅ GOOD - Correct dependency arrays
useEffect(() => {
  // runs once on mount
}, []);

useEffect(() => {
  // runs when userId changes
  fetchUser(userId);
}, [userId]);

useEffect(() => {
  // runs every render
  console.log('render');
});
```

---

## State Management

### 1. Zustand Stores

```typescript
// ✅ GOOD - Zustand store pattern
import { create } from 'zustand';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  
  setUser: (user) => set({ user, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
}));
```

### 2. Local State vs Global State

```typescript
// ✅ GOOD - Use local state for component-specific data
const LoginForm = () => {
  const [email, setEmail] = useState('');  // Local state
  const [password, setPassword] = useState('');  // Local state
};

// ✅ GOOD - Use global state for shared data
const ProfileScreen = () => {
  const { user } = useAuthStore();  // Global state
};
```

---

## Error Handling

### 1. Try-Catch Pattern

```typescript
// ✅ GOOD - Proper try-catch
try {
  const result = await apiCall();
  if (result.success) {
    // handle success
  } else {
    // handle API error
  }
} catch (error) {
  // handle network/other errors
  logger.error('Operation failed:', error);
}
```

### 2. Error Boundaries

```typescript
// ✅ GOOD - Error boundary for screens
const withErrorHandler = (Component: React.FC) => {
  return (props: any) => {
    try {
      return <Component {...props} />;
    } catch (error) {
      logger.error('Component error:', error);
      return <ErrorScreen error={error} />;
    }
  };
};
```

### 3. Custom Error Class

```typescript
// ✅ GOOD - Custom error class
export class AppError extends Error {
  constructor(
    public code: string,
    public message: string,
    public statusCode?: number
  ) {
    super(message);
  }
}

// Usage
throw new AppError('AUTH_FAILED', 'Invalid credentials', 401);
```

---

## Logging

### 1. Logger Usage

```typescript
// ✅ GOOD - Use logger instead of console
import { logger } from '@/config/logger';

logger.debug('Debug message', { data });
logger.info('Info message');
logger.warn('Warning message');
logger.error('Error message', error);
```

### 2. Log Levels

```typescript
// Development: debug, info, warn, error
// Staging: info, warn, error
// Production: error only
```

### 3. Sensitive Data

```typescript
// ❌ BAD - Never log sensitive data
logger.info('User login', { email, password, token });

// ✅ GOOD - Log safely
logger.info('User login', { email, userId });
```

---

## Comments & Documentation

### 1. Meaningful Comments

```typescript
// ❌ BAD - Obvious comments
const age = 25; // age is 25

// ✅ GOOD - Explain why
// User must be at least 18 for gym membership
const age = 25;

// ✅ GOOD - Document complex logic
// Calculate BMI to determine fitness level
// BMI = weight (kg) / height (m)²
const calculateBMI = (weight: number, height: number): number => {
  return weight / (height * height);
};
```

### 2. JSDoc for Public APIs

```typescript
// ✅ GOOD - JSDoc for functions
/**
 * Validates user email address
 * @param email - Email to validate
 * @returns true if valid email format, false otherwise
 * @throws Error if email is null
 */
export const validateEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// ✅ GOOD - JSDoc for components
/**
 * Renders a reusable button component
 * @param title - Button text
 * @param onPress - Callback when pressed
 * @param disabled - Whether button is disabled
 */
export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  disabled,
}) => {
  // ...
};
```

### 3. README in Folders

```typescript
// Create README.md in feature folders
src/services/auth/README.md

# Auth Service

Handles user authentication, token management, and logout.

## Usage
```

---

## Testing Standards

### 1. Test File Naming

```typescript
// ✅ GOOD - Test file naming
src/services/authService.ts
__tests__/unit/services/authService.test.ts

src/hooks/useAuth.ts
__tests__/unit/hooks/useAuth.test.ts
```

### 2. Test Structure

```typescript
// ✅ GOOD - Describe-It pattern
describe('authService', () => {
  describe('login', () => {
    it('should login successfully with valid credentials', async () => {
      // Arrange
      const email = 'user@example.com';
      const password = 'password';
      
      // Act
      const result = await authService.login(email, password);
      
      // Assert
      expect(result.success).toBe(true);
    });
    
    it('should fail with invalid credentials', async () => {
      const result = await authService.login('user@example.com', 'wrong');
      expect(result.success).toBe(false);
    });
  });
});
```

### 3. Coverage Goals

```
Statements: 70%+
Branches: 70%+
Functions: 70%+
Lines: 70%+
```

---

## Performance

### 1. Memoization

```typescript
// ✅ GOOD - React.memo for expensive renders
export const UserList = React.memo(({ users }) => {
  return (
    <View>
      {users.map(user => (
        <UserCard key={user.id} user={user} />
      ))}
    </View>
  );
});
```

### 2. Lazy Loading

```typescript
// ✅ GOOD - Lazy load screens
const HomeScreen = lazy(() => import('./home'));
const WorkoutScreen = lazy(() => import('./workouts'));
```

### 3. Optimization

```typescript
// ✅ GOOD - Optimize re-renders
const handler = useCallback(() => {
  // ...
}, [dependencies]);

const value = useMemo(() => {
  return expensiveCalculation();
}, [dependencies]);
```

---

## Accessibility

### 1. Text Accessibility

```typescript
// ✅ GOOD - Accessible text
<TouchableOpacity accessibilityLabel="Login button">
  <Text>Login</Text>
</TouchableOpacity>
```

### 2. Color Contrast

```typescript
// ✅ GOOD - High contrast colors
Text color: #111827 on white background
```

### 3. Touch Targets

```typescript
// ✅ GOOD - Minimum 44x44 points
const styles = StyleSheet.create({
  button: {
    minHeight: 44,
    minWidth: 44,
  },
});
```

---

## Security

### 1. Secrets Management

```typescript
// ❌ BAD - Hardcoded secrets
const API_KEY = 'super-secret-key-12345';

// ✅ GOOD - Environment variables
const API_KEY = process.env.API_KEY;
```

### 2. Input Validation

```typescript
// ✅ GOOD - Validate inputs
export const validateEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// ✅ GOOD - Sanitize outputs
const sanitizeInput = (input: string): string => {
  return input.trim().toLowerCase();
};
```

### 3. Token Security

```typescript
// ✅ GOOD - Store tokens securely
import * as SecureStore from 'expo-secure-store';

await SecureStore.setItemAsync('token', accessToken);
```

---

## Tools & Automation

### 1. ESLint

```bash
# Run linter
npm run lint

# Fix issues
npm run lint:fix
```

### 2. Prettier

```bash
# Format code
npm run format

# Check formatting
npm run format:check
```

### 3. TypeScript

```bash
# Type check
npm run type-check
```

### 4. All Checks

```bash
# Run all validations
npm run validate
```

---

## Summary

### Key Rules
1. ✅ Always use TypeScript with strict mode
2. ✅ Write explicit types (no `any`)
3. ✅ Follow naming conventions
4. ✅ Keep components small and focused
5. ✅ Write meaningful comments
6. ✅ Test thoroughly
7. ✅ Handle errors properly
8. ✅ Use logger for debugging
9. ✅ Optimize performance
10. ✅ Prioritize security

### Quick Checklist
- [ ] TypeScript strict mode passes
- [ ] ESLint has no errors
- [ ] Prettier formatting applied
- [ ] Tests passing with 70%+ coverage
- [ ] No console.log statements
- [ ] No hardcoded secrets
- [ ] Comments explain why, not what
- [ ] Meaningful commit messages
- [ ] Reviewed by teammate

---

Last Updated: April 17, 2026