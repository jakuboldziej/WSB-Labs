# Project Management Commands

## Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test
npm run test:watch
npm run test:coverage

# Code quality
npm run lint
npm run lint:fix

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment Commands

```bash
# Manual deployment to staging
npm run deploy:staging

# Manual deployment to production
npm run deploy:production

# Start local Netlify dev server
npm run start

# Health check (when running locally)
npm run health-check
```

## Git Workflow Commands

```bash
# Feature development
git checkout -b feature/new-feature
git add .
git commit -m "feat: add new feature"
git push origin feature/new-feature

# Create Pull Request (via GitHub)
# After review and merge to develop:

# Deploy to staging (automatic via CI/CD)
git checkout develop
git pull origin develop

# Release to production
git checkout main
git merge develop
git push origin main  # Triggers production deployment

# Create release tag
git tag -a v1.0.0 -m "Release v1.0.0"
git push origin v1.0.0  # Triggers release workflow
```

## Monitoring Commands

```bash
# Check application health
curl https://your-site.netlify.app/health

# Check deployment status
netlify status

# View deployment logs
netlify logs

# View function logs
netlify logs --function=health
```

## Troubleshooting Commands

```bash
# Check for security vulnerabilities
npm audit
npm audit --fix

# Update dependencies
npm update

# Clear build cache
rm -rf dist
rm -rf node_modules
npm install

# Reset git to last working state
git reset --hard HEAD
git clean -fd

# View build logs locally
npm run build 2>&1 | tee build.log
```

## Environment Management

```bash
# Set up local environment
cp .env.example .env.local

# View current environment variables
npm run build && grep -r "VITE_" dist/

# Test different environments locally
VITE_ENVIRONMENT=staging npm run build
VITE_ENVIRONMENT=production npm run build
```

## CI/CD Management

```bash
# Trigger CI/CD manually (push empty commit)
git commit --allow-empty -m "trigger ci/cd"
git push

# View GitHub Actions status
# Visit: https://github.com/your-username/your-repo/actions

# View Netlify deployment status
# Visit: https://app.netlify.com/sites/your-site/deploys
```

## Performance Testing

```bash
# Lighthouse CI (if configured)
npx lighthouse https://your-site.netlify.app --view

# Bundle analysis
npm run build
npx vite-bundle-analyzer dist/

# Performance monitoring
curl https://your-site.netlify.app/health | jq '.responseTime'
```
