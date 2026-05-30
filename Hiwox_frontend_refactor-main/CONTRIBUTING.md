# Contributing Guide

Thank you for your interest in contributing to HiWox Gym App! This guide will help you get started.

## Table of Contents
- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Making Changes](#making-changes)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Code Review](#code-review)
- [Testing](#testing)
- [Documentation](#documentation)
- [Troubleshooting](#troubleshooting)
- [Need Help?](#need-help)

---

## Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inspiring community for all. Please read and adhere to our [Code of Conduct](./CODE_OF_CONDUCT.md).

### Expected Behavior
- Use welcoming and inclusive language
- Be respectful of differing opinions
- Accept constructive criticism gracefully
- Focus on what is best for the community
- Show empathy towards other community members

### Unacceptable Behavior
- Harassment or discrimination
- Insulting or derogatory comments
- Personal attacks
- Public or private harassment
- Publishing private information

---

## Getting Started

### 1. Fork the Repository

```bash
# Navigate to GitHub
https://github.com/khavyaindhu/hiwox_wellness_app

# Click "Fork" button
# This creates a copy under your account
```

### 2. Clone Your Fork

```bash
git clone https://github.com/YOUR_USERNAME/hiwox_wellness_app.git
cd hiwox_wellness_app
```

### 3. Add Upstream Remote

```bash
# Add reference to original repo
git remote add upstream https://github.com/khavyaindhu/hiwox_wellness_app.git

# Verify remotes
git remote -v
```

### 4. Install Dependencies

```bash
npm install
npm install -g expo-cli
```

### 5. Create Development Branch

```bash
git checkout -b feature/your-feature-name
```

---

## Development Workflow

### 1. Keep Your Fork Updated

```bash
# Fetch latest changes
git fetch upstream

# Rebase your changes on top
git rebase upstream/main

# Push updated code
git push origin main
```

### 2. Create Feature Branch

```bash
# Feature branch
git checkout -b feature/add-nutrition-tracking

# Bug fix branch
git checkout -b bugfix/fix-login-crash

# Documentation branch
git checkout -b docs/update-api-reference
```

### 3. Start Development

```bash
# Start dev server
npm start

# Run tests
npm run test:watch

# Check types
npm run type-check
```

### 4. Make Your Changes

```bash
# Edit files
# Make small, focused commits

# Run validation before committing
npm run validate
```

---

## Making Changes

### Branch Naming Convention

```
feature/description        - New feature
bugfix/description         - Bug fix
docs/description           - Documentation
refactor/description       - Code refactoring
test/description           - Test additions
chore/description          - Maintenance tasks
```

### Commit Frequency

- Make **small, logical commits**
- Each commit should compile and pass tests
- Include related changes in one commit
- Avoid unrelated changes in same commit

### File Changes

```bash
# Stage specific files
git add src/components/Button.tsx
git add src/services/api/client.ts

# Review changes
git diff --staged

# Commit
git commit -m "feat: add new Button component"
```

---

## Commit Guidelines

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Type

```
feat:       New feature
fix:        Bug fix
docs:       Documentation
style:      Formatting (not affecting code)
refactor:   Code refactoring
perf:       Performance improvements
test:       Test additions/updates
chore:      Build, dependencies, etc.
ci:         CI/CD configuration
```

### Scope

```
auth        - Authentication feature
workouts    - Workout management
progress    - Progress tracking
ppg         - Heart rate scanner
api         - API integration
ui          - UI components
core        - Core functionality
```

### Examples

```bash
# Feature
git commit -m "feat(auth): add biometric login support"

# Bug fix
git commit -m "fix(workouts): resolve duplicate entries in list"

# Documentation
git commit -m "docs(api): update authentication endpoints"

# Refactor
git commit -m "refactor(services): extract common logic"

# Performance
git commit -m "perf(components): optimize list rendering"
```

### Commit Message Best Practices

```
✅ GOOD
feat(auth): add password strength validator

The validator checks for:
- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number

Closes #123

❌ BAD
fixed stuff
Updated code
changes
```

---

## Pull Request Process

### Before Submitting

1. **Ensure tests pass**
   ```bash
   npm run validate
   ```

2. **Update documentation**
   - Update README if needed
   - Add/update API docs
   - Add code comments

3. **Rebase on main**
   ```bash
   git fetch upstream
   git rebase upstream/main
   git push -f origin your-branch
   ```

4. **Create PR from GitHub**

### PR Title Format

```
<type>: <description>

Example:
feat: add nutrition tracking
fix: resolve login crash
docs: update API reference
```

### PR Description Template

````markdown
## Description
Brief description of changes

## Type of Change
- [ ] New feature
- [ ] Bug fix
- [ ] Breaking change
- [ ] Documentation update

## Changes Made
- List specific changes
- What was added/modified/removed

## Testing
- [ ] Unit tests added
- [ ] Integration tests passed
- [ ] Manual testing performed

## Screenshots (if UI change)
[Add screenshots here]

## Closes
Closes #123

## Related Issues
- Relates to #456
- Fixes #789
