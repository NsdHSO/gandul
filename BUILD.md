# Android Build Instructions

## Environment-Based Build Setup

This project uses a **single `.env` file** with environment-specific values injected based on the Git branch.

### Environments

- **FAT (Factory Acceptance Testing)**: `fat` or `staging` branch → same as local (localhost)
- **UAT (User Acceptance Testing)**: `uat` branch → UAT server
- **PROD (Production)**: `main` branch → Production server

## Setup GitHub Secrets

Before building, configure secrets in your GitHub repository:

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Add the following secrets:

| Secret Name | Description | Example Value |
|------------|-------------|---------------|
| `EXPO_TOKEN` | Your Expo access token | Get from `eas login` |
| `FAT_GRAPHQL_URL` | FAT/Staging API URL | `http://localhost:2003/strapi-proxy` |
| `UAT_GRAPHQL_URL` | UAT API URL | `https://uat-api.gandul.ro/strapi-proxy` |
| `PROD_GRAPHQL_URL` | Production API URL | `https://api.gandul.ro/strapi-proxy` |

### Get Expo Token

```bash
eas login
eas whoami
# Copy your token from expo.dev account settings
```

## Build Methods

### Method 1: Automated Build (GitHub Actions)

Push to the appropriate branch to trigger automatic build:

```bash
# Build FAT
git push origin fat

# Build UAT
git push origin uat

# Build PROD
git push origin main
```

The GitHub Action will:
1. Detect the branch
2. Load the corresponding environment variables
3. Build the APK
4. Upload to EAS Build

### Method 2: Manual Build (Local)

Set environment variables manually and build:

```bash
# FAT Build
export EXPO_PUBLIC_GRAPHQL_URL="http://localhost:2003/strapi-proxy"
export EXPO_PUBLIC_ENV="fat"
npm run build

# UAT Build
export EXPO_PUBLIC_GRAPHQL_URL="https://uat-api.gandul.ro/strapi-proxy"
export EXPO_PUBLIC_ENV="uat"
npm run build

# PROD Build
export EXPO_PUBLIC_GRAPHQL_URL="https://api.gandul.ro/strapi-proxy"
export EXPO_PUBLIC_ENV="production"
npm run build
```

### Method 3: Manual Trigger (GitHub Actions)

Trigger build manually from GitHub:

1. Go to **Actions** tab
2. Select **Build Android App**
3. Click **Run workflow**
4. Choose environment (fat/uat/production)
5. Click **Run workflow**

## Local Development

For local development, use the `.env` file:

```bash
# .env (default - already configured)
EXPO_PUBLIC_GRAPHQL_URL=http://localhost:2003/strapi-proxy
EXPO_PUBLIC_ENV=local
```

Start dev server:
```bash
npm start
```

## Branch Strategy

```
main (production)
  ├── uat
  │     └── staging/fat
  └── develop
```

- **main**: Production builds only
- **uat**: UAT environment for user testing
- **fat/staging**: FAT environment (same as local)
- **develop**: Development branch (local only)

## Download Your Build

After build completes:

1. **GitHub Actions**: Check the workflow run for build URL
2. **EAS Dashboard**: https://expo.dev
3. **Email**: You'll receive notification with download link

## Install APK on Device

1. Download the APK from the build URL
2. Transfer to your Android device
3. Enable "Install from Unknown Sources" in settings
4. Open the APK file to install

## Version Management

Update version in `app.json`:

```json
{
  "expo": {
    "version": "1.0.1",
    "android": {
      "versionCode": 2
    }
  }
}
```

- **version**: Semantic version (1.0.0, 1.0.1, etc.)
- **versionCode**: Integer, must increment with each build

## Troubleshooting

### GitHub Action Fails

**Check secrets are set correctly:**
```bash
# Verify in GitHub: Settings → Secrets → Actions
- EXPO_TOKEN
- FAT_GRAPHQL_URL
- UAT_GRAPHQL_URL
- PROD_GRAPHQL_URL
```

**Check branch name:**
- Must be exactly: `fat`, `staging`, `uat`, or `main`

### App Crashes on Launch

**Check environment:**
```bash
# View current environment in app
console.log(process.env.EXPO_PUBLIC_ENV)
console.log(process.env.EXPO_PUBLIC_GRAPHQL_URL)
```

**Verify API is accessible:**
- FAT: localhost won't work on real devices
- UAT/PROD: Ensure server is running and accessible

### Can't Install APK

- Enable "Install from Unknown Sources" in Android settings
- Check device storage (need ~100MB free)
- Re-download APK (may be corrupted)

## Useful Commands

```bash
# Check build status
eas build:list

# View specific build
eas build:view [BUILD_ID]

# Cancel running build
eas build:cancel

# Login to EAS
eas login

# Check credentials
eas credentials
```

## Files Structure

```
.env                          # Local dev environment
.github/workflows/
  └── build-android.yml       # GitHub Action for builds
eas.json                      # EAS Build configuration
app.json                      # App configuration
```

## Resources

- [EAS Build](https://docs.expo.dev/build/introduction/)
- [GitHub Actions](https://docs.github.com/en/actions)
- [Environment Variables](https://docs.expo.dev/guides/environment-variables/)
