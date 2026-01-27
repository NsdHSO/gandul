# Environment Configuration Guide

## Overview

This project uses **branch-based environment configuration** with a single `.env` file for local development.

## How It Works

### Local Development
- Uses `.env` file with localhost configuration
- Perfect for development on your machine

### Cloud Builds (FAT/UAT/PROD)
- Environment variables are injected based on Git branch
- No need for multiple `.env` files
- GitHub Secrets provide the configuration

## Branch → Environment Mapping

| Branch | Environment | API URL Source |
|--------|-------------|----------------|
| `develop` (local) | Local | `.env` file |
| `fat` or `staging` | FAT | GitHub Secret: `FAT_GRAPHQL_URL` |
| `uat` | UAT | GitHub Secret: `UAT_GRAPHQL_URL` |
| `main` | Production | GitHub Secret: `PROD_GRAPHQL_URL` |

## Setup Steps

### 1. Local Development Setup

```bash
# Copy example env file
cp .env.example .env

# .env is already configured for local development
# No changes needed unless your local API runs on a different port
```

### 2. GitHub Secrets Setup

Add these secrets in GitHub → Settings → Secrets and variables → Actions:

```bash
EXPO_TOKEN=your-expo-token-here
FAT_GRAPHQL_URL=http://localhost:2003/strapi-proxy
UAT_GRAPHQL_URL=https://uat-api.gandul.ro/strapi-proxy
PROD_GRAPHQL_URL=https://api.gandul.ro/strapi-proxy
```

### 3. Get Expo Token

```bash
npm install -g eas-cli
eas login
# Get token from: https://expo.dev/accounts/[your-account]/settings/access-tokens
```

## Building for Different Environments

### Automatic Build (Recommended)

Simply push to the appropriate branch:

```bash
# FAT Build
git checkout fat
git push origin fat

# UAT Build
git checkout uat
git push origin uat

# Production Build
git checkout main
git push origin main
```

GitHub Actions automatically:
1. Detects the branch
2. Loads the correct environment variables from secrets
3. Builds the APK with the right configuration

### Manual Build

```bash
# Set environment variables
export EXPO_PUBLIC_GRAPHQL_URL="https://your-api-url.com/strapi-proxy"
export EXPO_PUBLIC_ENV="production"

# Build
npm run build
```

## Environment Variables

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `EXPO_PUBLIC_GRAPHQL_URL` | GraphQL API endpoint | `https://api.gandul.ro/strapi-proxy` |
| `EXPO_PUBLIC_ENV` | Environment name | `production` |

### How They're Used

```typescript
// lib/graphql/client.ts
const GRAPHQL_URL = process.env.EXPO_PUBLIC_GRAPHQL_URL ||
                    'http://localhost:2003/strapi-proxy';

// Check current environment
console.log(process.env.EXPO_PUBLIC_ENV); // 'local', 'fat', 'uat', or 'production'
```

## Workflow Example

### Scenario: Deploy to UAT

1. **Make changes in develop branch**
   ```bash
   git checkout develop
   # ... make changes ...
   git commit -m "Add new feature"
   ```

2. **Merge to UAT branch**
   ```bash
   git checkout uat
   git merge develop
   git push origin uat
   ```

3. **GitHub Action triggers automatically**
   - Detects `uat` branch
   - Loads `UAT_GRAPHQL_URL` from secrets
   - Sets `EXPO_PUBLIC_ENV=uat`
   - Builds APK with UAT configuration

4. **Download and test**
   - Get APK from GitHub Actions artifacts or EAS dashboard
   - Install on device
   - App connects to UAT server

### Scenario: Deploy to Production

1. **Test in UAT first**
   ```bash
   # Ensure UAT build works correctly
   ```

2. **Merge to main**
   ```bash
   git checkout main
   git merge uat
   git push origin main
   ```

3. **Production build triggers**
   - Uses `PROD_GRAPHQL_URL` secret
   - Sets `EXPO_PUBLIC_ENV=production`
   - Creates production APK

## Troubleshooting

### Problem: App shows wrong environment

**Check build logs:**
```bash
# View GitHub Actions logs
# Look for: "Building [ENV] environment"
```

**Verify secrets are set:**
- Go to GitHub → Settings → Secrets
- Ensure all secrets exist and have correct values

### Problem: API not accessible

**Local:**
- Ensure GraphQL server is running on `localhost:2003`

**UAT/PROD:**
- Check if UAT/PROD servers are accessible
- Verify URLs in GitHub Secrets
- Test URL in browser or Postman

### Problem: Build fails in GitHub Actions

**Check Expo token:**
```bash
# Regenerate if needed
eas login
# Get new token from expo.dev
# Update EXPO_TOKEN secret in GitHub
```

**Check package.json:**
```bash
# Ensure dependencies are locked
npm ci  # Install exact versions
```

## Best Practices

### 1. Never Hardcode Environment Values
❌ Bad:
```typescript
const API_URL = 'https://api.gandul.ro/strapi-proxy';
```

✅ Good:
```typescript
const API_URL = process.env.EXPO_PUBLIC_GRAPHQL_URL;
```

### 2. Use Meaningful Branch Names
- `main` → Production
- `uat` → User Acceptance Testing
- `fat` or `staging` → Factory Acceptance Testing
- `develop` → Development (local only)

### 3. Test Before Production
Always test in this order:
1. Local development
2. FAT/Staging build
3. UAT build
4. Production build

### 4. Keep Secrets Secure
- Never commit `.env` to git (it's in `.gitignore`)
- Rotate `EXPO_TOKEN` periodically
- Use HTTPS for UAT/PROD API URLs

## Files Overview

```
gandul/
├── .env                           # Local development (gitignored)
├── .env.example                   # Template for .env
├── .github/workflows/
│   └── build-android.yml          # GitHub Action for builds
├── eas.json                       # EAS Build config
├── lib/graphql/client.ts          # Reads EXPO_PUBLIC_GRAPHQL_URL
└── BUILD.md                       # Detailed build instructions
```


## Quick Reference

```bash
# Local dev
npm start

# Check current env
echo $EXPO_PUBLIC_GRAPHQL_URL

# Manual build
npm run build

# View builds
eas build:list

# Check secrets (GitHub web UI only)
# Settings → Secrets and variables → Actions
```
