# GitHub Actions Troubleshooting Guide

## 🔧 Common Issues and Solutions

### 1. ESLint Errors in CI/CD

#### Problem:

```
Error: 'process' is not defined
Error: 'exports' is not defined
```

#### Solution:

Konfiguracja ESLint w `eslint.config.js` powinna mieć różne settings dla różnych typów plików:

- **React files** (`src/**/*.{js,jsx}`): Browser globals
- **Netlify functions** (`netlify/functions/**/*.js`): Node.js globals
- **Test files** (`**/*.test.{js,jsx}`): Jest globals

#### Verification:

```bash
npm run lint  # Should pass without errors
```

### 2. Security Audit Failures

#### Problem:

```
npm audit found vulnerabilities with moderate severity
```

#### Root Cause:

Większość vulnerabilities jest w dev dependencies (np. netlify-cli), nie w production code.

#### Solution Strategy:

1. **Check production dependencies first**:

   ```bash
   npm audit --omit=dev --audit-level=high
   ```

2. **If production is clean** (as it should be), CI/CD allows dev vulnerabilities with warning

3. **For actual fixes**:
   ```bash
   npm audit fix
   npm audit fix --force  # If needed, but test carefully
   ```

#### CI/CD Behavior:

- ✅ **Production audit**: Must pass (high level)
- ⚠️ **Dev audit**: Can fail with warning
- ✅ **Build test**: Must succeed

### 3. Build Failures

#### Problem:

```
Build failed with exit code 1
```

#### Debugging Steps:

1. **Check locally**:

   ```bash
   npm run build
   ```

2. **Check dependencies**:

   ```bash
   npm ci
   npm run build
   ```

3. **Check environment variables**:
   - Are all `VITE_*` variables defined?
   - Check Netlify dashboard → Site settings → Environment variables

#### Common Causes:

- Missing environment variables
- Import errors
- TypeScript/ESLint errors
- Dependency conflicts

### 4. Netlify Deployment Issues

#### Problem:

```
Error: Site not found
```

#### Solution:

1. **Check secrets in GitHub**:

   - `NETLIFY_AUTH_TOKEN`
   - `NETLIFY_PRODUCTION_SITE_ID`
   - `NETLIFY_STAGING_SITE_ID`

2. **Get values from Netlify**:

   - Auth token: User settings → Personal access tokens
   - Site ID: Site settings → General → Site details

3. **Verify permissions**:
   - Token has write access to site
   - Site exists and is accessible

### 5. Health Check Failures

#### Problem:

```
Health check failed: Connection refused
```

#### Debugging:

1. **Check function deployment**:

   - Netlify dashboard → Functions
   - Should see `health` function listed

2. **Test function locally**:

   ```bash
   netlify dev
   curl http://localhost:8888/health
   ```

3. **Check function logs**:
   - Netlify dashboard → Functions → health → Function log

#### Common Issues:

- Function not deployed (check `netlify.toml`)
- CORS issues (check headers in function)
- Timeout (function takes too long)

### 6. Test Failures

#### Problem:

```
Tests failed with coverage below threshold
```

#### Solution:

1. **Check coverage**:

   ```bash
   npm run test:coverage
   ```

2. **Add missing tests**:

   - Ensure all components have basic tests
   - Test utilities and business logic

3. **Adjust thresholds** (if necessary):
   - Edit `jest.config.json`
   - Lower thresholds temporarily if needed

### 7. Node.js Version Issues

#### Problem:

```
Engine "node" is incompatible with this module
```

#### Solution:

1. **Check .nvmrc** (if exists)
2. **Update CI/CD workflow** to use correct Node.js version
3. **Local development**:
   ```bash
   nvm use 18  # or whatever version is required
   ```

### 8. Cache Issues

#### Problem:

Builds succeed locally but fail in CI

#### Solution:

1. **Clear npm cache**:

   ```bash
   npm ci  # Instead of npm install
   ```

2. **Clear GitHub Actions cache**:

   - GitHub repo → Actions → Caches → Delete old caches

3. **Force rebuild**:
   ```bash
   git commit --allow-empty -m "trigger rebuild"
   git push
   ```

## 🚀 Quick Fixes Checklist

Before debugging deep, try these quick fixes:

1. ✅ **Local build works**:

   ```bash
   npm ci && npm run build
   ```

2. ✅ **Lint passes**:

   ```bash
   npm run lint
   ```

3. ✅ **Tests pass**:

   ```bash
   npm test
   ```

4. ✅ **Security audit for production**:

   ```bash
   npm audit --omit=dev --audit-level=high
   ```

5. ✅ **Environment variables set**:

   - Check GitHub secrets
   - Check Netlify environment variables

6. ✅ **Dependencies up to date**:
   ```bash
   npm update
   ```

## 📞 Getting Help

If issues persist:

1. **Check workflow logs** in GitHub Actions
2. **Check Netlify deploy logs** in dashboard
3. **Compare with working commit** to see what changed
4. **Test locally** with same Node.js version as CI

## 🔄 Emergency Rollback

If deployment is broken:

1. **Via Netlify Dashboard**:

   - Deploys → Find last working deploy → "Publish deploy"

2. **Via Git**:

   ```bash
   git revert HEAD
   git push origin main
   ```

3. **Manual fix**:
   - Fix issue locally
   - Push fix to main branch
