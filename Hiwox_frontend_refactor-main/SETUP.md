# Setup Guide

Complete guide to setting up the HiWox Gym App for development.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the App](#running-the-app)
- [Development Tools](#development-tools)
- [Troubleshooting](#troubleshooting)
- [First-Time Developer Setup](#first-time-developer-setup)

## Prerequisites

### Required Software

Ensure you have the following installed:

```bash
# Node.js (18.x or 20.x)
node --version    # Should be v18.0.0 or higher

# npm (8.x or higher)
npm --version     # Should be 8.0.0 or higher

# Git
git --version     # Should be 2.0.0 or higher
```

### Platform-Specific Requirements

#### For macOS
```bash
# Install Xcode Command Line Tools
xcode-select --install

# Install Homebrew (if not already installed)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Verify installation
which brew
```

#### For Windows
```bash
# Install Visual Studio Build Tools
# Download from: https://visualstudio.microsoft.com/downloads/

# Install Git for Windows
# Download from: https://git-scm.com/download/win

# Install Node.js
# Download from: https://nodejs.org
```

#### For Linux
```bash
# Ubuntu/Debian
sudo apt-get install -y build-essential curl git

# Fedora/RHEL
sudo dnf install -y gcc-c++ make python3 git curl
```

### Android Development (for Android builds)

```bash
# Android Studio
# Download from: https://developer.android.com/studio

# Android SDK
# Minimum: API 24 (Android 7.0)
# Target: API 34+ (Latest)

# Set ANDROID_HOME
export ANDROID_HOME=$HOME/Library/Android/sdk

# Add to PATH
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

### iOS Development (for macOS/iOS builds)

```bash
# Xcode (from App Store)
xcode-select --install

# CocoaPods
sudo gem install cocoapods

# Verify
pod --version
```

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/khavyaindhu/hiwox_wellness_app.git
cd hiwox_wellness_app
```

### 2. Install Dependencies

```bash
# Install npm packages
npm install

# Verify installation
npm list
```

### 3. Install Expo CLI (Global)

```bash
npm install -g expo-cli

# Verify
expo --version
```

### 4. Setup Husky Git Hooks

```bash
# Install husky
npm install husky --save-dev

# Initialize husky
npx husky install

# Verify hooks are installed
ls -la .husky
```

## Configuration

### 1. Environment Setup

Create `.env.local` file from `.env.example`:

```bash
cp .env.example .env.local
```

Edit `.env.local` and update values:

```env
# Development
API_BASE_URL=https://dev-api.hiwox.com/api
API_TIMEOUT=30000
LOG_LEVEL=debug
BUILD_ENV=development
ENABLE_OFFLINE_MODE=true
ENABLE_DEBUG_MODE=true

# Staging
# API_BASE_URL=https://staging-api.hiwox.com/api
# BUILD_ENV=staging

# Production
# API_BASE_URL=https://api.hiwox.com/api
# BUILD_ENV=production
# LOG_LEVEL=error
```

### 2. IDE Configuration

#### VSCode

Install recommended extensions:
```json
{
  "recommendations": [
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "ms-vscode.vscode-typescript-next",
    "React-Native.react-native-tools",
    "expo.expo-tools"
  ]
}
```

Settings (`.vscode/settings.json`):
```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "typescript.tsdk": "node_modules/typescript/lib"
}
```

#### Android Studio

1. Open Android Studio
2. Go to Settings → SDK Manager
3. Install Android SDK 24+ and latest
4. Configure emulator:
   - Tools → Device Manager
   - Create a virtual device
   - Select Android 12+ as target

#### Xcode

1. Open Xcode
2. Preferences → Locations
3. Set Command Line Tools
4. Configure simulator:
   - Xcode → Open Developer Tool → Simulator

### 3. API Configuration

Create test credentials:

```bash
# Test User (Development)
EMAIL: test@hiwox.com
PASSWORD: Test@123456

# Backend Configuration
API_TIMEOUT: 15000ms (15 seconds)
MAX_RETRIES: 3
RETRY_DELAY: 1000ms
```

## Running the App

### Start Development Server

```bash
# Start Expo development server
npm start

# Output:
# ✓ Expo server is running
# Press:
#   a for Android
#   i for iOS
#   w for web
#   r to restart
#   q to quit
```

### Run on Different Platforms

#### iOS Simulator (macOS only)

```bash
npm run ios

# Or from Expo menu:
# Press 'i' when Expo is running
```

#### Android Emulator

```bash
npm run android

# Or from Expo menu:
# Press 'a' when Expo is running
```

#### Web Browser

```bash
npm run web

# Opens at http://localhost:19006
```

#### Physical Device

```bash
# 1. Install Expo Go app from App Store/Play Store
# 2. Start development server
npm start

# 3. Scan QR code with device
#    iOS: Use Camera app
#    Android: Use Expo Go app

# 4. App opens on device
```

### Build for Production

#### Web Build

```bash
# Build web version
npm run build:web

# Output: ./dist/

# Serve locally
npm run serve
```

#### Android Build (with EAS)

```bash
# Preview build (unsigned)
npm run build:eas:preview

# Production build
npm run build:eas

# Download APK
eas build:list
```

#### iOS Build (with EAS)

```bash
# Preview build
npm run build:eas:preview

# Production build
npm run build:eas

# Download IPA
eas build:list
```

## Development Tools

### Code Quality

```bash
# Check TypeScript types
npm run type-check

# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format

# Run all checks
npm run validate
```

### Testing

```bash
# Run tests
npm run test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage
```

### Debugging

#### VS Code Debugger

1. Install `Debugger for React Native` extension
2. Create `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "React Native",
      "type": "react-native",
      "request": "launch",
      "cwd": "${workspaceFolder}",
      "skipFiles": ["<node_internals>/**"],
      "sourceMaps": true
    }
  ]
}
```

3. Start debugging: F5 or Debug menu

#### Chrome DevTools

```bash
# For web version
npm run web

# Open Chrome DevTools: F12
# - Console: View logs
# - Network: Monitor API calls
# - Application: View storage
```

#### React Native Debugger

```bash
# Install globally
npm install -g react-native-debugger

# Start debugger
react-native-debugger

# In Expo menu:
# Press 'd' to open debugger menu
# Select "React Native Debugger"
```

#### Flipper (Advanced)

```bash
# Download Flipper: https://fbflipper.com

# Setup:
# 1. Install Flipper
# 2. npm install react-native-flipper
# 3. Start app
# 4. Open Flipper
# 5. Select app from list

# Features:
# - View logs
# - Network inspector
# - Database inspector
# - State inspection
```

### Expo Tools

```bash
# Check development status
expo status

# Clear cache
expo start --clear

# Reset project
npm run reset-project

# Publish (if using Expo hosting)
expo publish

# View build status
eas build:list

# View credentials
eas credentials
```

## Troubleshooting

### Installation Issues

#### Problem: `npm install` fails

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

#### Problem: Port 19006 already in use

**Solution:**
```bash
# Kill process on port 19006
# macOS/Linux
lsof -ti:19006 | xargs kill -9

# Windows
netstat -ano | findstr :19006
taskkill /PID <PID> /F

# Or use different port
expo start --port 3000
```

### Build Issues

#### Problem: Android build fails

**Solution:**
```bash
# Clean gradle cache
cd android
./gradlew clean
cd ..

# Rebuild
npm run android
```

#### Problem: iOS build fails

**Solution:**
```bash
# Clean build folder
rm -rf ios/Pods ios/Podfile.lock

# Reinstall pods
cd ios
pod install
cd ..

# Rebuild
npm run ios
```

### Runtime Issues

#### Problem: "Cannot find module @/"

**Solution:**
```bash
# Check tsconfig.json paths
cat tsconfig.json | grep -A 5 '"paths"'

# Should show:
# "@/*": ["src/*"]

# Restart development server
npm start --clear
```

#### Problem: Blank screen on device

**Solution:**
```bash
# Check logs
npm start

# Look for errors in terminal

# Clear app cache
# iOS: Press 'i' then uninstall app
# Android: Settings → Apps → HiWox → Storage → Clear Cache
```

#### Problem: API calls failing with 401

**Solution:**
```bash
# Check token manager
# Verify tokens are saved: SecureStore check in app

# Check API_BASE_URL
echo $API_BASE_URL

# Verify token refresh logic in:
# src/services/api/client.ts

# Check server-side token expiry
```

#### Problem: Styles not applying

**Solution:**
```bash
# Verify path aliases
# src/styles/colors.ts exists

# Clear cache
npm start --clear

# Check imports
import { colors } from '@/styles/colors'

# Not: import { colors } from './colors'
```

## First-Time Developer Setup

### Complete Setup Checklist

- [ ] Install Node.js 18+
- [ ] Install Git
- [ ] Clone repository
- [ ] Run `npm install`
- [ ] Install Expo CLI globally
- [ ] Create `.env.local`
- [ ] Setup IDE (VSCode extensions)
- [ ] Install Android Studio (for Android dev)
- [ ] Install Xcode (for iOS dev on macOS)
- [ ] Read ARCHITECTURE.md
- [ ] Read PROJECT_OVERVIEW.md
- [ ] Run `npm run validate`
- [ ] Run `npm start`
- [ ] Test on simulator/device
- [ ] Make first commit

### Step-by-Step First Time Setup

```bash
# 1. Clone repository
git clone https://github.com/khavyaindhu/hiwox_wellness_app.git
cd hiwox_wellness_app

# 2. Install dependencies
npm install

# 3. Install Expo CLI
npm install -g expo-cli

# 4. Setup environment
cp .env.example .env.local

# 5. Validate setup
npm run validate

# 6. Start development server
npm start

# 7. Open in simulator/browser
# Press 'i' for iOS (macOS)
# Press 'a' for Android
# Press 'w' for web
```

### First Changes

1. Open `src/app/(main)/home/_layout.tsx`
2. Modify the component
3. Save file (hot reload should work)
4. View changes in simulator/browser

### Common First Issues

**Issue:** `typescript not recognized`
**Fix:** Run `npm install` in project root

**Issue:** Styles import errors
**Fix:** Check tsconfig.json has @/ path alias

**Issue:** Simulator won't start
**Fix:** See Android/iOS section in prerequisites

## Git Workflow

```bash
# Create feature branch
git checkout -b feature/your-feature-name

# Make changes
# Test locally
npm run validate

# Commit changes
git add .
git commit -m "feat: describe your changes"

# Push to GitHub
git push origin feature/your-feature-name

# Create Pull Request on GitHub
# Request review from team
# Address feedback
# Merge when approved
```

## Performance Tips

### Development
- Use physical device for more accurate performance
- Profile with React Native DevTools
- Monitor network tab for API calls
- Check console for warnings

### Production
- Run lighthouse audit
- Check bundle size
- Optimize images
- Enable code splitting

## Resources

### Documentation
- [Expo Docs](https://docs.expo.dev)
- [React Native Docs](https://reactnative.dev)
- [Zustand Docs](https://github.com/pmndrs/zustand)
- [Axios Docs](https://axios-http.com)

### Learning
- [React Native Tutorial](https://reactnative.dev/docs/getting-started)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Expo Tutorial](https://docs.expo.dev/tutorial/introduction/)

### Tools
- [VS Code](https://code.visualstudio.com)
- [Android Studio](https://developer.android.com/studio)
- [Xcode](https://developer.apple.com/xcode/)
- [Flipper](https://fbflipper.com)

## Support

### Getting Help

1. **Check Docs:** Search in ARCHITECTURE.md or API.md
2. **Search Issues:** Look for similar issues on GitHub
3. **Ask Team:** Post in team Slack channel
4. **Create Issue:** Create GitHub issue with details

### Reporting Bugs

Include:
- OS and Node version
- Steps to reproduce
- Expected vs actual behavior
- Screenshots/videos
- Console logs

### Contact

- **GitHub Issues:** [Create issue](https://github.com/khavyaindhu/hiwox_wellness_app/issues)
- **Email:** support@hiwox.com
- **Slack:** #dev-support channel
