# Deployment Guide

## 🚀 Konfiguracja CI/CD dla Netlify

### 1. Przygotowanie repozytorium GitHub

1. **Utwórz nowe repozytorium na GitHub**
2. **Push lokalnego kodu**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit with CI/CD setup"
   git branch -M main
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

3. **Utwórz branch develop**:
   ```bash
   git checkout -b develop
   git push -u origin develop
   ```

### 2. Konfiguracja Netlify

1. **Zaloguj się do Netlify**: https://netlify.com
2. **Połącz z GitHub**: Authorize Netlify to access your GitHub repos
3. **Utwórz nową stronę**:
   - Click "New site from Git"
   - Choose GitHub
   - Select your repository
   - **Build settings**:
     - Branch: `main`
     - Build command: `npm run build`
     - Publish directory: `dist`

4. **Konfiguracja Environment Variables** (Site settings → Environment variables):
   ```
   NODE_VERSION=18
   NPM_FLAGS=--production=false
   VITE_ENVIRONMENT=production
   VITE_APP_NAME=WSB-Labs
   VITE_APP_VERSION=1.0.0
   ```

5. **Opcjonalnie - staging site**:
   - Utwórz drugą stronę dla branch `develop`
   - Użyj tych samych ustawień build

### 3. Konfiguracja GitHub Secrets

W GitHub repository → Settings → Secrets and variables → Actions:

1. **NETLIFY_AUTH_TOKEN**:
   - Idź do Netlify → User settings → Personal access tokens
   - Utwórz nowy token
   - Skopiuj i dodaj jako secret

2. **NETLIFY_PRODUCTION_SITE_ID**:
   - W Netlify dashboard → Site settings → General
   - Skopiuj "Site ID"

3. **NETLIFY_STAGING_SITE_ID** (opcjonalnie):
   - Jeśli masz staging site, skopiuj jego Site ID

4. **PRODUCTION_URL**:
   - URL twojej strony produkcyjnej (np. https://your-site.netlify.app)

### 4. Testowanie CI/CD Pipeline

1. **Test CI (Continuous Integration)**:
   ```bash
   # Utwórz feature branch
   git checkout -b feature/test-ci
   
   # Wprowadź małą zmianę
   echo "// Test change" >> src/App.jsx
   
   # Commit i push
   git add .
   git commit -m "Test CI pipeline"
   git push origin feature/test-ci
   
   # Utwórz Pull Request na GitHub
   ```
   
   **Sprawdź**: GitHub Actions powinny uruchomić testy, linting, i security audit

2. **Test CD Staging**:
   ```bash
   # Merge do develop branch
   git checkout develop
   git merge feature/test-ci
   git push origin develop
   ```
   
   **Sprawdź**: Aplikacja powinna zostać automatycznie wdrożona na staging

3. **Test CD Production**:
   ```bash
   # Merge do main branch
   git checkout main
   git merge develop
   git push origin main
   ```
   
   **Sprawdź**: Aplikacja powinna zostać automatycznie wdrożona na production

### 5. Monitoring i Health Checks

1. **Health Check Endpoint**:
   - Sprawdź: `https://your-site.netlify.app/health`
   - Powinien zwrócić JSON z informacjami o statusie

2. **Monitoring Widget**:
   - W development mode widget jest widoczny w prawym dolnym rogu
   - Pokazuje status aplikacji w czasie rzeczywistym

### 6. Troubleshooting

#### Problemy z build

1. **Sprawdź logi w GitHub Actions**:
   - Actions tab w GitHub repository
   - Kliknij na failed build aby zobaczyć szczegóły

2. **Sprawdź logi w Netlify**:
   - Netlify dashboard → Deploys
   - Kliknij na failed deploy

#### Problemy z environment variables

1. **Sprawdź czy są ustawione w Netlify**:
   - Site settings → Environment variables

2. **Upewnij się, że zmienne zaczynają się od VITE_**:
   - Vite nie eksportuje zmiennych bez tego prefixu

#### Problemy z health checks

1. **Sprawdź czy funkcja Netlify jest wdrożona**:
   - Functions tab w Netlify dashboard

2. **Sprawdź logi funkcji**:
   - Functions → View function → Function log

### 7. Najlepsze praktyki

1. **Nigdy nie commituj secrets**:
   - Używaj .env.local dla local development
   - .env.local jest w .gitignore

2. **Testuj lokalnie przed push**:
   ```bash
   npm test
   npm run lint
   npm run build
   ```

3. **Użyj semantic versioning**:
   - Aktualizuj VITE_APP_VERSION przy release

4. **Monitor performance**:
   - Sprawdzaj Netlify Analytics
   - Monitor Core Web Vitals

### 8. Rollback Strategy

#### Automatyczny rollback
Pipeline automatycznie wykona rollback w przypadku:
- Failed health check
- Build errors
- Test failures

#### Manualny rollback
1. **W Netlify Dashboard**:
   - Deploys → Find previous good deploy → "Publish deploy"

2. **Przez API** (jak w CI pipeline):
   ```bash
   curl -X POST "https://api.netlify.com/api/v1/sites/SITE_ID/deploys" \
     -H "Authorization: Bearer TOKEN" \
     -d '{"site_id": "SITE_ID", "restore": true}'
   ```

### 9. Dodatowe konfiguracje

#### Branch protection rules
W GitHub → Settings → Branches → Add rule:
- Branch name: `main`
- ✅ Require status checks to pass
- ✅ Require pull request reviews
- ✅ Dismiss stale reviews

#### Notifications
1. **Slack/Discord webhooks** w GitHub Actions
2. **Email notifications** w Netlify settings
3. **GitHub notifications** dla failed builds

---

## 📞 Pomoc

Jeśli napotkasz problemy:
1. Sprawdź logi w GitHub Actions i Netlify
2. Upewnij się, że wszystkie secrets są ustawione
3. Sprawdź czy aplikacja działa lokalnie
4. Sprawdź network tab w browser dev tools dla health checks
