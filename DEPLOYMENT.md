# Deployment Pipeline Guide

## Overview

This project uses a **promotion-based deployment pipeline** with three environments:

```
master (FAT) → UAT → PRODUCTION
```

## Branch Strategy

- **master** = FAT (Factory Acceptance Testing)
- Promote via Pull Requests with labels

## Workflow

### 1. Develop & Build FAT

```bash
# Work on master branch
git checkout master
git pull origin master

# Make changes
# ... code changes ...

# Commit and push
git add .
git commit -m "Your changes"
git push origin master
```

**Result:** Automatic FAT build triggers
- ✅ APK built with FAT configuration
- 📱 Uses `FAT_GRAPHQL_URL` from GitHub secrets
- 🔗 Available on Expo dashboard

### 2. Promote to UAT

Once FAT is tested and working:

```bash
# Create branch for UAT promotion
git checkout -b promote-uat
git push origin promote-uat

# Create Pull Request on GitHub
# Base: master
# Compare: promote-uat
```

**On GitHub:**
1. Go to Pull Requests
2. Create PR: `promote-uat` → `master`
3. Add label: **`deploy-uat`**

**Result:** UAT build triggers automatically
- ✅ APK built with UAT configuration
- 📱 Uses `UAT_GRAPHQL_URL` from GitHub secrets
- 💬 Bot comments on PR with build status
- 🔗 Download link posted in PR comments

### 3. Promote to PRODUCTION

Once UAT is tested and approved:

**On the same PR:**
1. Remove label: `deploy-uat`
2. Add label: **`deploy-prod`**

**Result:** PRODUCTION build triggers
- ✅ APK built with PRODUCTION configuration
- 📱 Uses `PROD_GRAPHQL_URL` from GitHub secrets
- 💬 Bot comments with production build details
- ⚠️ Requires extra caution

**After successful testing:**
1. Merge the PR
2. Production build is ready for release

## Labels

Create these labels in GitHub (Settings → Labels):

| Label | Color | Description |
|-------|-------|-------------|
| `deploy-uat` | Yellow (#fbca04) | Trigger UAT build |
| `deploy-prod` | Red (#d73a4a) | Trigger PRODUCTION build |

## Visual Flow

```
┌─────────────────────────────────────────────────────────┐
│  1. Push to master                                      │
│     ↓                                                   │
│  ✅ FAT Build (automatic)                              │
└─────────────────────────────────────────────────────────┘
                         │
                         │ Test FAT build
                         ↓
┌─────────────────────────────────────────────────────────┐
│  2. Create PR from promote-uat → master                 │
│     Add label: deploy-uat                               │
│     ↓                                                   │
│  ✅ UAT Build (on label)                               │
│     💬 Bot comments with build URL                     │
└─────────────────────────────────────────────────────────┘
                         │
                         │ Test UAT build
                         ↓
┌─────────────────────────────────────────────────────────┐
│  3. On same PR:                                         │
│     Remove: deploy-uat                                  │
│     Add label: deploy-prod                              │
│     ↓                                                   │
│  ✅ PRODUCTION Build (on label)                        │
│     💬 Bot comments with build URL                     │
│     ↓                                                   │
│  4. Merge PR → Production deployed                      │
└─────────────────────────────────────────────────────────┘
```

## Example Workflow

### Scenario: Deploy new feature

**Step 1: Develop on master**
```bash
git checkout master
git pull
# ... make changes ...
git commit -m "Add article sharing feature"
git push origin master
```
→ FAT build starts automatically

**Step 2: Test FAT**
- Download FAT APK from GitHub Actions
- Test on device
- Verify feature works

**Step 3: Promote to UAT**
```bash
git checkout -b promote-article-sharing
git push origin promote-article-sharing
```

On GitHub:
1. Create PR: `promote-article-sharing` → `master`
2. Title: "Promote article sharing to UAT"
3. Add label: `deploy-uat`

→ UAT build starts
→ Bot comments with download link

**Step 4: Test UAT**
- Download UAT APK from PR comment
- Test on UAT environment
- Get stakeholder approval

**Step 5: Promote to PROD**

On the same PR:
1. Remove label: `deploy-uat`
2. Add label: `deploy-prod`

→ PRODUCTION build starts
→ Bot comments with download link

**Step 6: Final verification**
- Download PROD APK
- Final testing
- Verify production readiness

**Step 7: Deploy**
- Merge PR
- Production is live!

## Environment Configuration

Each environment uses different API URLs from GitHub Secrets:

| Environment | Branch | GitHub Secret | Auto-build |
|-------------|--------|---------------|------------|
| FAT | master | `FAT_GRAPHQL_URL` | ✅ On push |
| UAT | PR + label | `UAT_GRAPHQL_URL` | ✅ On label `deploy-uat` |
| PROD | PR + label | `PROD_GRAPHQL_URL` | ✅ On label `deploy-prod` |

## GitHub Secrets Setup

Required secrets (Settings → Secrets → Actions):

```bash
EXPO_TOKEN          # From expo.dev account
FAT_GRAPHQL_URL     # http://localhost:2003/strapi-proxy (or FAT server)
UAT_GRAPHQL_URL     # https://uat-api.gandul.ro/strapi-proxy
PROD_GRAPHQL_URL    # https://api.gandul.ro/strapi-proxy
```

## Workflow Files

```
.github/workflows/
├── build-android.yml    # FAT: Automatic on push to master
├── promote-uat.yml      # UAT: Triggered by 'deploy-uat' label
└── promote-prod.yml     # PROD: Triggered by 'deploy-prod' label
```

## Best Practices

### ✅ DO

- Test FAT thoroughly before promoting
- Test UAT with stakeholders before PROD
- Update version in `app.json` before PROD deployment
- Use descriptive PR titles
- Add testing notes in PR description
- Keep PR focused (one feature/fix at a time)

### ❌ DON'T

- Skip UAT testing
- Promote broken builds
- Deploy to PROD on Friday afternoon
- Forget to update version numbers
- Rush production deployments

## Version Management

Before promoting to PROD, update `app.json`:

```json
{
  "expo": {
    "version": "1.1.0",  // Semantic version
    "android": {
      "versionCode": 2    // Integer, increment by 1
    }
  }
}
```

## Rollback Strategy

If PROD build has issues:

1. **Quick fix**: Push fix to master → repeat promotion flow
2. **Rollback**: Revert PR merge → promote previous stable version

## Monitoring

Check build status:

- **GitHub Actions tab**: View workflow runs
- **PR comments**: Bot posts build status
- **Expo dashboard**: https://expo.dev → View all builds

## Troubleshooting

### Build doesn't trigger

**Check:**
- Label name is exactly `deploy-uat` or `deploy-prod`
- PR base branch is `master`
- GitHub Actions are enabled
- Secrets are configured

### Build fails

**Check logs in:**
- GitHub Actions tab → Click failed workflow
- Expo dashboard → Build details

**Common issues:**
- Missing/incorrect secrets
- NPM dependency issues
- Expo token expired

### Wrong environment

**Verify:**
```bash
# Check which secret is being used
# Look in workflow run logs for:
# "EXPO_PUBLIC_GRAPHQL_URL"
```

## Quick Reference

```bash
# FAT (automatic)
git push origin master

# UAT (manual via label)
1. Create PR
2. Add label: deploy-uat

# PROD (manual via label)
1. On same PR
2. Remove: deploy-uat
3. Add label: deploy-prod
4. Test thoroughly
5. Merge PR
```

## Support

- Check `BUILD.md` for build details
- Check `ENVIRONMENT_SETUP.md` for environment config
- Contact DevOps team for GitHub Actions issues
