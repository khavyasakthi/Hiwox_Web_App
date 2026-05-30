# Project Overview & Complete Folder Structure

## Table of Contents
- [Project Summary](#project-summary)
- [Technology Stack](#technology-stack)
- [Folder Structure](#folder-structure)
- [File Organization by Layer](#file-organization-by-layer)
- [Module Dependencies](#module-dependencies)
- [Adding New Features](#adding-new-features)
- [File Naming Conventions](#file-naming-conventions)
- [Import Path Aliases](#import-path-aliases)

## Project Summary

**HiWox** is an enterprise-grade mobile fitness application built with modern React Native technologies. It provides comprehensive gym management, workout tracking, and health monitoring capabilities.

### Key Features
- 🔐 Secure authentication with JWT tokens
- 💪 Workout planning and tracking
- 📊 Progress monitoring with analytics
- ❤️ Heart rate measurement via PPG scanner
- 👥 Role-based access control (User, Trainer, Admin)
- 🌐 Cross-platform support (iOS, Android, Web)
- ✅ Offline-first capabilities
- 🎨 Beautiful, responsive UI
- 📱 Native performance

### Project Stats
- **Language:** TypeScript 93.9%
- **Framework:** React Native with Expo
- **State Management:** Zustand
- **HTTP Client:** Axios
- **Testing:** Jest & React Testing Library
- **Code Quality:** ESLint + Prettier
- **Package Count:** 60+ dependencies

---

## Technology Stack

### Core Framework
```
┌─────────────────────────────────────────┐
│         React Native (0.79.6)           │
│ Mobile development framework for iOS    │
│        and Android platforms            │
└─────────────────────────────────────────┘
                   ▲
                   │
┌─────────────────────────────────────────┐
│      Expo (53.0.22)                     │
│ Managed React Native platform with      │
│ built-in tools and services             │
└─────────────────────────────────────────┘
                   ▲
                   │
┌─────────────────────────────────────────┐
│   Expo Router (5.1.5)                   │
│ File-based routing (similar to Next.js) │
│ with layout and group support           │
└─────────────────────────────────────────┘
```

### State Management & Data
```
Zustand (5.0.12)          AsyncStorage (2.2.0)
├─ Global state           ├─ Non-sensitive data
├─ Devtools support       ├─ User preferences
└─ Lightweight            └─ Cache

SecureStore (14.2.4)
├─ JWT tokens
├─ Encryption
└─ Sensitive data
```

### UI & Styling
```
React Native Components
├─ Core UI elements
├─ Platform-specific rendering
└─ Performance optimized

Expo Modules
├─ expo-linear-gradient
├─ expo-image
├─ expo-icons (Heroicons)
└─ expo-blur

Custom Components
├─ Button, Input, Toast
├─ Card, Loading
└─ Feature-specific components
```

### HTTP & Networking
```
Axios (1.11.0)
├─ HTTP client
├─ Request/Response interceptors
├─ Error handling
└─ Timeout management
```

### Development Tools
```
TypeScript (5.8.3)        ESLint (9.25.0)
├─ Type safety            ├─ Code quality
├─ Strict mode            ├─ Best practices
└─ Path aliases           └─ Custom rules

Prettier (3.1.0)          Jest (29.7.0)
├─ Code formatting        ├─ Unit testing
├─ Consistency            ├─ Coverage
└─ Auto-fix               └─ Snapshot testing

Babel (7.25.2)            Metro
├─ JS transpilation       ├─ Bundler
└─ Plugin support         └─ Dev server
```

---

## Folder Structure

### Complete Visual Tree

```
hiwox_wellness_app/                              # Root directory
│
├── 📁 src/                                  # Source code (main development)
│   │
│   ├── 📁 app/                             # Expo Router screens (file-based routing)
│   │   ├── _layout.tsx                     # Root layout (wraps all screens)
│   │   ├── index.tsx                       # Root index/home
│   │   │
│   │   ├── 📁 (auth)/                      # Authentication route group
│   │   │   ├── _layout.tsx                 # Auth layout wrapper
│   │   │   │
│   │   │   ├── 📁 login/
│   │   │   │   └── _layout.tsx             # Login screen
│   │   │   │       (route: /login)
│   │   │   │
│   │   │   ├── 📁 register/
│   │   │   │   └── _layout.tsx             # Register screen
│   │   │   │       (route: /register)
│   │   │   │
│   │   │   └── 📁 forgot-password/
│   │   │       └── _layout.tsx             # Password reset screen
│   │   │           (route: /forgot-password)
│   │   │
│   │   └── 📁 (main)/                      # Main app route group
│   │       ├── _layout.tsx                 # Main layout with bottom tabs
│   │       │
│   │       ├── 📁 home/
│   │       │   └── _layout.tsx             # Home/Dashboard screen
│   │       │       (route: /home)
│   │       │
│   │       ├── 📁 workouts/
│   │       │   ├── _layout.tsx             # Workouts list screen
│   │       │   ├── [id].tsx                # Workout details
│   │       │   └── create.tsx              # Create workout
│   │       │
│   │       ├── 📁 progress/
│   │       │   └── _layout.tsx             # Progress tracking screen
│   │       │
│   │       └── 📁 profile/
│   │           └── _layout.tsx             # User profile screen
│   │
│   ├── 📁 components/                      # Reusable React components
│   │   ├── index.ts                        # Barrel export
│   │   │
│   │   ├── 📁 ui/                          # Base UI components (design system)
│   │   │   ├── index.ts                    # Export all UI components
│   │   │   │
│   │   │   ├── 📁 Button/
│   │   │   │   ├── Button.tsx              # Button component
│   │   │   │   ├── Button.styles.ts        # Button styles
│   │   │   │   ├── Button.types.ts         # Button TypeScript types
│   │   │   │   └── index.ts                # Component export
│   │   │   │
│   │   │   ├── 📁 Input/
│   │   │   │   ├── Input.tsx               # Input component
│   │   │   │   ├── Input.styles.ts         # Input styles
│   │   │   │   ├── Input.types.ts          # Input types
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── 📁 Toast/
│   │   │   │   ├── Toast.tsx               # Toast notification component
│   │   │   │   ├── Toast.styles.ts         # Toast styles
│   │   │   │   ├── useToast.ts             # Toast hook
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── 📁 Card/
│   │   │   │   ├── Card.tsx
│   │   │   │   ├── Card.styles.ts
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── 📁 Loading/
│   │   │   │   ├── Loading.tsx
│   │   │   │   ├── Loading.styles.ts
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   └── 📁 Illustrations/
│   │   │       ├── LoginIllustration.tsx
│   │   │       ├── FloatingIcon.tsx
│   │   │       └── index.ts
│   │   │
│   │   └── 📁 features/                    # Feature-specific components
│   │       ├── index.ts
│   │       │
│   │       ├── 📁 Auth/                    # Authentication UI components
│   │       │   ├── 📁 LoginForm/
│   │       │   │   ├── LoginForm.tsx       # Refactored login form
│   │       │   │   ├── LoginForm.types.ts
│   │       │   │   └── index.ts
│   │       │   │
│   │       │   ├── 📁 RegisterForm/
│   │       │   │   ├── RegisterForm.tsx
│   │       │   │   ├── RegisterForm.types.ts
│   │       │   │   └── index.ts
│   │       │   │
│   │       │   ├── 📁 ForgotPasswordForm/
│   │       │   │   ├── ForgotPasswordForm.tsx
│   │       │   │   ├── ForgotPasswordForm.types.ts
│   │       │   │   └── index.ts
│   │       │   │
│   │       │   └── index.ts
│   │       │
│   │       ├── 📁 Workout/
│   │       │   ├── 📁 WorkoutCard/
│   │       │   ├── 📁 WorkoutList/
│   │       │   ├── 📁 WorkoutForm/
│   │       │   └── index.ts
│   │       │
│   │       ├── 📁 Progress/
│   │       │   ├── 📁 ProgressChart/
│   │       │   ├── 📁 ProgressStats/
│   │       │   └── index.ts
│   │       │
│   │       └── 📁 PPG/
│   │           ├── 📁 PPGScanner/
│   │           ├── 📁 PPGResults/
│   │           └── index.ts
│   │
│   ├── 📁 services/                        # Business logic & external integrations
│   │   ├── index.ts
│   │   │
│   │   ├── 📁 api/                         # HTTP/API integration
│   │   │   ├── client.ts                   # Axios HTTP client instance
│   │   │   ├── interceptors.ts             # Request/response handlers
│   │   │   ├── index.ts
│   │   │   │
│   │   │   └── 📁 endpoints/               # API endpoint functions
│   │   │       ├── auth.ts                 # /auth/* endpoints
│   │   │       ├── user.ts                 # /user/* endpoints
│   │   │       ├── workout.ts              # /workout/* endpoints
│   │   │       └── index.ts
│   │   │
│   │   ├── 📁 auth/                        # Authentication logic
│   │   │   ├── authService.ts              # Login, logout, password reset
│   │   │   ├── tokenManager.ts             # Token storage & refresh
│   │   │   └── index.ts
│   │   │
│   │   ├── 📁 storage/                     # Data persistence
│   │   │   ├── secureStorage.ts            # Secure storage (tokens, keys)
│   │   │   ├── localStorage.ts             # Local storage (app data)
│   │   │   └── index.ts
│   │   │
│   │   └── 📁 ppg/                         # PPG scanner service
│   │       ├── ppgService.ts               # PPG heart rate logic
│   │       ├── usePPGScanner.ts            # PPG hook wrapper
│   │       └── index.ts
│   │
│   ├── 📁 hooks/                           # Custom React hooks
│   │   ├── useAuth.ts                      # Authentication state & logic
│   │   ├── useToast.ts                     # Toast notification logic
│   │   ├── useTheme.ts                     # Theme management
│   │   ├── useApi.ts                       # API data fetching
│   │   ├── usePPG.ts                       # PPG scanner state
│   │   ├── useColorScheme.ts                # Color scheme detection
│   │   └── index.ts
│   │
│   ├── 📁 store/                           # Zustand state management
│   │   ├── index.ts
│   │   │
│   │   └── 📁 slices/
│   │       ├── authStore.ts                # Auth state (user, tokens, auth status)
│   │       ├── userStore.ts                # User profile state
│   │       ├── ppgStore.ts                 # PPG scan results & history
│   │       └── index.ts
│   │
│   ├── 📁 types/                           # TypeScript type definitions
│   │   ├── auth.ts                         # Auth types (User, LoginRequest, etc.)
│   │   ├── user.ts                         # User profile types
│   │   ├── api.ts                          # API response types
│   │   ├── ppg.ts                          # PPG data types
│   │   ├── common.ts                       # Shared types
│   │   └── index.ts
│   │
│   ├── 📁 utils/                           # Utility functions
│   │   ├── index.ts
│   │   │
│   │   ├── 📁 validation/                  # Input validation
│   │   │   ├── emailValidator.ts           # Email validation rules
│   │   │   ├── passwordValidator.ts        # Password strength validation
│   │   │   └── index.ts
│   │   │
│   │   ├── 📁 formatting/                  # Data formatting
│   │   │   ├── dateFormatter.ts            # Date/time formatting
│   │   │   ├── numberFormatter.ts          # Number formatting
│   │   │   └── index.ts
│   │   │
│   │   ├── 📁 helpers/                     # Helper functions
│   │   │   ├── errorHandler.ts             # Error handling utilities
│   │   │   ├── asyncHandler.ts             # Async/await helpers
│   │   │   └── index.ts
│   │   │
│   │   └── 📁 constants/                   # App constants
│   │       ├── api.ts                      # API URLs & constants
│   │       ├── colors.ts                   # Color constants
│   │       ├── strings.ts                  # UI strings
│   │       └── index.ts
│   │
│   ├── 📁 styles/                          # Design system & theming
│   │   ├── colors.ts                       # Color palette
│   │   ├── spacing.ts                      # Spacing/sizing system
│   │   ├── typography.ts                   # Font styles & sizes
│   │   ├── theme.ts                        # Theme configuration
│   │   └── index.ts
│   │
│   ├── 📁 config/                          # Application configuration
│   │   ├── env.ts                          # Environment variables
│   │   ├── logger.ts                       # Logging service
│   │   └��─ index.ts
│   │
│   └── index.ts                            # Main entry point
│
├── 📁 __tests__/                            # Test files
│   ├── setup.ts                            # Jest setup & configuration
│   │
│   ├── 📁 unit/                            # Unit tests
│   │   ├── 📁 services/
│   │   │   ├── authService.test.ts
│   │   │   ├── api.test.ts
│   │   │   └── storage.test.ts
│   │   │
│   │   ├── 📁 utils/
│   │   │   ├── validation.test.ts
│   │   │   └── helpers.test.ts
│   │   │
│   │   ├── 📁 hooks/
│   │   │   ├── useAuth.test.ts
│   │   │   └── useToast.test.ts
│   │   │
│   │   └── 📁 store/
│   │       ├── authStore.test.ts
│   │       └── ppgStore.test.ts
│   │
│   └── 📁 integration/
│       ├── 📁 api/
│       │   ├── login.test.ts
│       │   └── passwordReset.test.ts
│       │
│       └── 📁 flows/
│           └── authentication.test.ts
│
├── 📁 docs/                                 # Documentation
│   ├── ARCHITECTURE.md                     # System architecture & patterns
│   ├── API.md                              # API reference
│   ├── SETUP.md                            # Setup & installation guide
│   ├── DEPLOYMENT.md                       # Deployment procedures
│   ├── CONTRIBUTING.md                     # Contribution guidelines
│   ├── CODING_STANDARDS.md                 # Code style & standards
│   ├── PROJECT_OVERVIEW.md                 # This file
│   └── MIGRATION_GUIDE.md                  # Code migration guide
│
├── 📁 android/                              # Native Android code
│   ├── 📁 app/
│   ├── 📁 gradle/
│   ├── build.gradle
│   └── settings.gradle
│
├── 📁 ios/                                  # Native iOS code
│   ├── 📁 HiWoxGym/
│   ├── 📁 Pods/
│   ├── Podfile
│   └── *.pbxproj
│
├── 📁 assets/                               # Static assets
│   ├── 📁 images/
│   │   ├── icon.png
│   │   ├── splash.png
│   │   └── ...other images
│   │
│   └── 📁 fonts/
│       ├── Poppins-Regular.ttf
│       └── ...other fonts
│
├── 📁 .github/                              # GitHub configuration
│   └── 📁 workflows/
│       ├── ci-test.yml                     # CI/CD testing
│       ├── build-android.yml               # Android build pipeline
│       ├── build-ios.yml                   # iOS build pipeline
│       └── deploy.yml                      # Deployment pipeline
│
├── 📁 .husky/                               # Git hooks
│   ├── pre-commit                          # Lint before commit
│   └── pre-push                            # Test before push
│
├── 📁 .vscode/                              # VSCode configuration
│   ├── settings.json                       # Editor settings
│   └── extensions.json                     # Recommended extensions
│
├── 📁 scripts/                              # Build scripts
│   └── reset-project.js                    # Project reset utility
│
├── 🔧 Configuration Files
│   ├── app.json                            # Expo app configuration
│   ├── eas.json                            # EAS build configuration
│   ├── package.json                        # npm dependencies & scripts
│   ├── tsconfig.json                       # TypeScript configuration
│   ├── eslint.config.js                    # ESLint rules
│   ├── prettier.config.js                  # Code formatting
│   ├── jest.config.js                      # Testing configuration
│   ├── babel.config.js                     # Babel transpilation
│   ├── metro.config.js                     # Metro bundler config
│   ├── Makefile                            # Build commands
│   └── Dockerfile                          # Docker containerization
│
├── 📝 Documentation Files
│   ├── README.md                           # Project overview
│   ├── CHANGELOG.md                        # Version history
│   ├── LICENSE                             # License information
│   ├── .env.example                        # Environment template
│   ├── .gitignore                          # Git ignore rules
│   ├── .prettierignore                     # Prettier ignore rules
│   └── .dockerignore                       # Docker ignore rules
│
└── 📊 Server & Deployment
    ├── server.js                           # Web server (for web builds)
    └── docker-compose.yml                  # Docker compose config
```

---

## File Organization by Layer

### 🎨 **Presentation Layer** (`src/app/` + `src/components/`)

**Purpose:** User interface and navigation

```
src/app/                           # Screens/Routes
├── (auth)/                         # Auth screens
│   ├── login/_layout.tsx           ← LoginForm component
│   ├── register/_layout.tsx        ← RegisterForm component
│   └── forgot-password/_layout.tsx ← ForgotPasswordForm component
│
└── (main)/                         # Main app screens
    ├── home/_layout.tsx            ← Home/Dashboard
    ├── workouts/_layout.tsx        ← Workout list
    ├── progress/_layout.tsx        ← Progress charts
    └── profile/_layout.tsx         ← User profile

src/components/                    # Reusable Components
├── ui/                            # Design system
│   ├── Button/                     ← Base button
│   ├── Input/                      ← Form inputs
│   ├── Toast/                      ← Notifications
│   └── Card/                       ← Card wrapper
│
└── features/                      # Feature UI
    ├── Auth/                       ← Auth forms
    ├── Workout/                    ← Workout UI
    ├── Progress/                   ← Progress charts
    └── PPG/                        ← Heart rate UI
```

### 🔧 **Business Logic Layer** (`src/services/`)

**Purpose:** Business logic, API calls, data management

```
src/services/
├── api/                           # HTTP & API
│   ├── client.ts                   ← Axios instance
│   ├── interceptors.ts             ← Request/response handlers
│   └── endpoints/                  ← API operations
│
├── auth/                           # Authentication
│   ├── authService.ts              ← Login/logout logic
│   └── tokenManager.ts             ← Token management
│
├── storage/                        # Data persistence
│   ├── secureStorage.ts            ← Secure storage
│   └── localStorage.ts             ← Local cache
│
└── ppg/                            # PPG Scanner
    ├── ppgService.ts               ← Heart rate logic
    └── usePPGScanner.ts            ← PPG hook
```

### 🪝 **Hook Layer** (`src/hooks/`)

**Purpose:** Reusable stateful logic

```
src/hooks/
├── useAuth.ts                      ← Auth state
├── useToast.ts                     ← Toast notifications
├── useTheme.ts                     ← Theme management
├── useApi.ts                       ← Data fetching
├── usePPG.ts                       ← PPG state
└── useColorScheme.ts               ← Color scheme
```

### 🗂️ **State Layer** (`src/store/`)

**Purpose:** Global state management

```
src/store/slices/
├── authStore.ts                    ← Auth state
├── userStore.ts                    ← User state
└── ppgStore.ts                     ← PPG state
```

### 📦 **Type Layer** (`src/types/`)

**Purpose:** TypeScript definitions

```
src/types/
├── auth.ts                         ← Auth types
├── user.ts                         ← User types
├── api.ts                          ← API types
├── ppg.ts                          ← PPG types
└── common.ts                       ← Shared types
```

### 🛠️ **Utility Layer** (`src/utils/`)

**Purpose:** Helper functions and constants

```
src/utils/
├── validation/                     ← Input validation
├── formatting/                     ← Data formatting
├── helpers/                        ← Helper functions
└── constants/                      ← App constants
```

### 🎨 **Style Layer** (`src/styles/`)

**Purpose:** Design system and theming

```
src/styles/
├── colors.ts                       ← Color palette
├── spacing.ts                      ← Spacing system
├── typography.ts                   ← Font styles
└── theme.ts                        ← Theme config
```

### ⚙️ **Config Layer** (`src/config/`)

**Purpose:** Application configuration

```
src/config/
├── env.ts                          ← Environment setup
├── logger.ts                       ← Logging service
└── index.ts                        ← Exports
```

---

## Module Dependencies

### Dependency Graph

```
Screens (app/)
    ↓
Components (components/)
    ↓
Hooks (hooks/)
    ↓ ┌─────────────────────┐
    ├→ Store (store/)       │
    │  (Zustand state)      │
    │                       │
    └→ Services (services/) │
       ├→ API Client        │
       ├→ Auth Service      │
       ├→ Storage           │
       └→ PPG Service       │
           ↓
Types (types/)
    ↓
Utils (utils/)
    ↓
Styles (styles/)
    ↓
Config (config/)
```

### Import Chain Example: Login Flow

```
screens/login/_layout.tsx
    │
    ├─→ components/features/Auth/LoginForm
    │      │
    │      ├─→ hooks/useAuth
    │      ├─→ hooks/useToast
    │      │
    │      └─→ services/auth/authService
    │            │
    │            ├─→ services/api/client
    │            │      │
    │            │      └─→ config/logger
    │            │
    │            └─→ services/auth/tokenManager
    │                 └─→ services/storage/secureStorage
    │
    ├─→ store/slices/authStore
    └─→ types/auth
```

---

## Adding New Features

### Feature Checklist

When adding a new feature, follow this checklist:

```
1. CREATE TYPES
   └─ src/types/[feature].ts
      ├─ Define interfaces
      ├─ Define request/response types
      └─ Export from src/types/index.ts

2. CREATE SERVICE (if backend API involved)
   └─ src/services/[feature]/
      ├─ [feature]Service.ts (business logic)
      └─ index.ts

3. CREATE API ENDPOINT (if backend API involved)
   └─ src/services/api/endpoints/[feature].ts
      ├─ Define API calls
      └─ Add to index.ts

4. CREATE HOOKS
   └─ src/hooks/use[Feature].ts
      ├─ Custom logic hooks
      └─ Add to index.ts

5. CREATE STORE (if global state needed)
   └─ src/store/slices/[feature]Store.ts
      ├─ Zustand store
      └─ Add to index.ts

6. CREATE UTILS (if needed)
   └─ src/utils/[feature]/
      ├─ Helper functions
      └─ Validators

7. CREATE COMPONENTS
   └─ src/components/features/[Feature]/
      ├─ Feature components
      └─ index.ts

8. CREATE SCREENS
   └─ src/app/(main)/[feature]/
      ├─ _layout.tsx (main screen)
      ├─ [id].tsx (detail screen)
      └─ edit.tsx (edit screen)

9. CREATE TESTS
   └─ __tests__/
      ├─ unit/[feature].test.ts
      └─ integration/[feature].test.ts

10. UPDATE DOCUMENTATION
    └─ docs/API.md (if API changes)
```

### Example: Adding Nutrition Feature

```typescript
// 1. Create types
src/types/nutrition.ts
export interface NutritionEntry {
  id: string;
  userId: string;
  date: Date;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

// 2. Create service
src/services/nutrition/nutritionService.ts
export const nutritionService = {
  async addEntry(entry: NutritionEntry) { /* ... */ },
  async getHistory(userId: string) { /* ... */ }
}

// 3. Create API endpoint
src/services/api/endpoints/nutrition.ts
export const nutritionEndpoints = {
  addEntry: (entry) => apiClient.post('/nutrition', entry),
  getHistory: (userId) => apiClient.get(`/nutrition/${userId}`)
}

// 4. Create hook
src/hooks/useNutrition.ts
export const useNutrition = () => {
  const [entries, setEntries] = useState([]);
  const addEntry = useCallback(async (entry) => { /* ... */ }, []);
  return { entries, addEntry };
}

// 5. Create store
src/store/slices/nutritionStore.ts
export const useNutritionStore = create((set) => ({
  entries: [],
  setEntries: (entries) => set({ entries })
}))

// 6. Create components
src/components/features/Nutrition/
├── NutritionForm/
├── NutritionChart/
└── NutritionEntry/

// 7. Create screens
src/app/(main)/nutrition/
├── _layout.tsx
├── [id].tsx
└── add.tsx

// 8. Create tests
__tests__/unit/services/nutritionService.test.ts
__tests__/integration/nutrition.test.ts
```

---

## File Naming Conventions

### Screen Files

```typescript
// Route groups (lowercase with parentheses)
src/app/(auth)/
src/app/(main)/

// Route segments (kebab-case)
src/app/(auth)/forgot-password/
src/app/(main)/user-profile/

// Layout files
_layout.tsx                    // Route layout
index.tsx or _layout.tsx       // Route screen

// Dynamic routes
[id].tsx                       // Dynamic param
[...slug].tsx                  // Catch-all
```

### Component Files

```typescript
// Component file (PascalCase)
Button.tsx
LoginForm.tsx
WorkoutCard.tsx

// Styles file (same name + .styles)
Button.styles.ts
LoginForm.styles.ts

// Types file (same name + .types)
Button.types.ts
LoginForm.types.ts

// Index for exports
index.ts

// Component structure
components/ui/Button/
├── Button.tsx
├── Button.styles.ts
├── Button.types.ts
└── index.ts
```

### Service Files

```typescript
// Service file (camelCase + Service)
authService.ts
workoutService.ts
ppgService.ts

// Hook wrapper (use + PascalCase)
usePPGScanner.ts
useWorkout.ts

// Index for exports
index.ts
```

### Hook Files

```typescript
// Hook file (use + PascalCase)
useAuth.ts
useToast.ts
useTheme.ts
useColorScheme.ts

// Index for exports
index.ts
```

### Store Files

```typescript
// Store file (camelCase + Store)
authStore.ts
userStore.ts
ppgStore.ts

// Index for exports
index.ts
```

### Type Files

```typescript
// Type file (feature name)
auth.ts
user.ts
api.ts
ppg.ts
common.ts

// Index for exports
index.ts
```

### Utility Files

```typescript
// Validation
emailValidator.ts
passwordValidator.ts

// Formatting
dateFormatter.ts
numberFormatter.ts

// Helpers
errorHandler.ts
asyncHandler.ts

// Constants
api.ts
colors.ts
strings.ts
```

### Test Files

```typescript
// Test file (same name + .test)
authService.test.ts
useAuth.test.ts
validation.test.ts

// Snapshot file (auto-generated)
__snapshots__/Component.test.tsx.snap
```

---

## Import Path Aliases

### Path Aliases Configuration (tsconfig.json)

```json
{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "@/*": ["src/*"],
      "@app/*": ["src/app/*"],
      "@components/*": ["src/components/*"],
      "@services/*": ["src/services/*"],
      "@hooks/*": ["src/hooks/*"],
      "@store/*": ["src/store/*"],
      "@types/*": ["src/types/*"],
      "@utils/*": ["src/utils/*"],
      "@config/*": ["src/config/*"],
      "@styles/*": ["src/styles/*"]
    }
  }
}
```

### Usage Examples

```typescript
// ❌ BAD - Relative imports
import { Button } from '../../../components/ui/Button';
import { authService } from '../../services/auth/authService';
import { colors } from '../../../styles/colors';

// ✅ GOOD - Path aliases
import { Button } from '@components/ui/Button';
import { authService } from '@services/auth/authService';
import { colors } from '@styles/colors';
```

### Common Imports

```typescript
// Components
import { Button } from '@components/ui/Button';
import { LoginForm } from '@components/features/Auth/LoginForm';

// Services
import { authService } from '@services/auth/authService';
import { apiClient } from '@services/api/client';

// Hooks
import { useAuth } from '@hooks/useAuth';
import { useToast } from '@hooks/useToast';

// Store
import { useAuthStore } from '@store/slices/authStore';

// Types
import type { User, LoginRequest } from '@types/auth';

// Utils
import { validateEmail } from '@utils/validation/emailValidator';
import { colors } from '@styles/colors';

// Config
import { config, logger } from '@config';
```

---

## Quick Reference

### Directory Quick Links

| Purpose | Path | Usage |
|---------|------|-------|
| Screens/Routes | `src/app/` | File-based routing |
| UI Components | `src/components/ui/` | Design system |
| Feature Components | `src/components/features/` | Feature UI |
| Business Logic | `src/services/` | API, auth, data |
| Reusable Logic | `src/hooks/` | Custom hooks |
| Global State | `src/store/slices/` | Zustand stores |
| Type Definitions | `src/types/` | TypeScript types |
| Helpers | `src/utils/` | Functions, constants |
| Design System | `src/styles/` | Colors, spacing |
| Configuration | `src/config/` | Env, logger |
| Tests | `__tests__/` | Unit, integration |
| Docs | `docs/` | Documentation |

### Layer Responsibilities

| Layer | Responsibility | Example |
|-------|-----------------|---------|
| **App** | Navigation & routing | `src/app/(auth)/login/_layout.tsx` |
| **Components** | UI rendering | `Button.tsx`, `LoginForm.tsx` |
| **Hooks** | Stateful logic | `useAuth.ts`, `useToast.ts` |
| **Store** | Global state | `authStore.ts` |
| **Services** | Business logic | `authService.ts`, `apiClient.ts` |
| **Types** | Type definitions | `auth.ts`, `api.ts` |
| **Utils** | Helper functions | `validators.ts`, `formatters.ts` |
| **Styles** | Design system | `colors.ts`, `spacing.ts` |
| **Config** | Configuration | `env.ts`, `logger.ts` |

---

## Summary

The enterprise-grade folder structure provides:

✅ **Clear Organization** - Files organized by responsibility
✅ **Scalability** - Easy to add new features
✅ **Maintainability** - Clear import paths and patterns
✅ **Type Safety** - Centralized types with strict TypeScript
✅ **Testability** - Isolated, testable modules
✅ **Performance** - Optimized bundling with proper structure
✅ **Developer Experience** - Path aliases, consistent patterns
✅ **Industry Standard** - Follows React/React Native best practices

For more information, see:
- [ARCHITECTURE.md](ARCHITECTURE.md) - System design
- [SETUP.md](SETUP.md) - Setup instructions
- [CODING_STANDARDS.md](CODING_STANDARDS.md) - Code style
- [API.md](API.md) - API reference
