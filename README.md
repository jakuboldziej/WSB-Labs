<div align="center">
  <h1 align="center">WSB-Labs CI/CD Project</h3>
</div>

## About The Project

Projekt na zaliczenie "Narzędzia do automatyzacji budowy oprogramowania" z kompleksowym wdrożeniem CI/CD na platformie Netlify.

### Built With

- [React](https://react.dev/)
- [Vite](https://vite.dev/)
- [Netlify](https://netlify.com/)
- [GitHub Actions](https://github.com/features/actions)

## 🚀 Deployment Status

[![Netlify Status](https://api.netlify.com/api/v1/badges/YOUR_SITE_ID/deploy-status.svg)](https://app.netlify.com/sites/YOUR_SITE_NAME/deploys)

## 📋 CI/CD Pipeline

### Continuous Integration (CI)

- ✅ Automatyczne testy przy każdym push i pull request
- ✅ Budowanie aplikacji
- ✅ Sprawdzanie jakości kodu (ESLint)
- ✅ Security audit (npm audit)
- ✅ Code coverage reporting

### Continuous Deployment (CD)

- ✅ Automatyczne wdrażanie na staging (branch: develop)
- ✅ Automatyczne wdrażanie na production (branch: main)
- ✅ Health check po wdrożeniu
- ✅ Rollback w przypadku błędu

## 🛠️ Setup & Installation

### Prerequisites

- Node.js 18+
- npm
- Git
- Netlify CLI (opcjonalnie)

### Local Development

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd Lab1
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Setup environment variables**

   ```bash
   cp .env.example .env.local
   # Edytuj .env.local zgodnie z potrzebami
   ```

4. **Run development server**

   ```bash
   npm run dev
   ```

   **Note**: Health Monitor w development mode pokazuje mock data. Aby testować rzeczywiste funkcje Netlify:

   ```bash
   npm install -g netlify-cli
   netlify dev  # Zamiast npm run dev
   ```

5. **Run tests**
   ```bash
   npm test
   npm run test:coverage
   ```

## 🌐 Deployment

### Automated Deployment (Recommended)

Projekt używa GitHub Actions do automatycznego wdrażania:

- **Staging**: Automatyczne wdrożenie przy push do `develop` branch
- **Production**: Automatyczne wdrożenie przy push do `main` branch

### Manual Deployment

1. **Install Netlify CLI**

   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify**

   ```bash
   netlify login
   ```

3. **Deploy to staging**

   ```bash
   npm run deploy:staging
   ```

4. **Deploy to production**
   ```bash
   npm run deploy:production
   ```

## ⚙️ Configuration

### GitHub Secrets

Skonfiguruj następujące secrets w GitHub repository:

```
NETLIFY_AUTH_TOKEN          # Netlify Personal Access Token
NETLIFY_PRODUCTION_SITE_ID  # Production Site ID
NETLIFY_STAGING_SITE_ID     # Staging Site ID (opcjonalnie)
PRODUCTION_URL              # URL aplikacji produkcyjnej
```

### Environment Variables

```bash
# Application Configuration
VITE_APP_NAME=WSB-Labs
VITE_APP_VERSION=1.0.0
VITE_ENVIRONMENT=production

# API Configuration
VITE_API_BASE_URL=https://api.example.com

# Monitoring Configuration
VITE_HEALTH_CHECK_INTERVAL=30000
VITE_HEALTH_CHECK_TIMEOUT=5000

# Feature Flags
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_DEBUG=false
```

### Netlify Configuration

Projekt zawiera plik `netlify.toml` z konfiguracją:

- Build settings
- Security headers
- SPA routing
- Health check endpoint

## 🔍 Monitoring & Health Checks

### Health Check Endpoint

- **URL**: `/health`
- **Method**: GET
- **Response**: JSON z informacjami o statusie aplikacji

### Monitoring Dashboard

W trybie development dostępny jest monitoring widget pokazujący:

- Status aplikacji
- Czas odpowiedzi
- Ostatnie sprawdzenie
- Błędy (jeśli występują)

## 🧪 Testing

### Available Commands

```bash
npm test                # Uruchom testy
npm run test:watch      # Uruchom testy w trybie watch
npm run test:coverage   # Uruchom testy z coverage
```

### Available Tests

- `validateForm()` - Walidacja formularzy
- `emailValidator()` - Walidacja adresów email
- `App component` - Testy komponentu głównego
- `Configuration` - Testy konfiguracji

### Coverage Requirements

- Branches: 70%
- Functions: 70%
- Lines: 70%
- Statements: 70%

## 📊 Code Quality

### ESLint Configuration

Projekt używa ESLint z regułami dla React i modern JavaScript.

```bash
npm run lint        # Sprawdź kod
npm run lint:fix    # Napraw automatycznie możliwe błędy
```

### Security Audit

```bash
npm audit           # Sprawdź vulnerabilities
npm audit --fix     # Napraw znane vulnerabilities
```

## 🔄 Workflow

### Git Flow

1. **Feature development**: Utwórz branch z `develop`
2. **Pull Request**: Utwórz PR do `develop`
3. **Code Review**: Review i merge do `develop`
4. **Staging deployment**: Automatyczne wdrożenie na staging
5. **Production release**: Merge `develop` → `main`
6. **Production deployment**: Automatyczne wdrożenie na production

### Branch Strategy

- `main` - Production branch
- `develop` - Development/staging branch
- `feature/*` - Feature branches
- `hotfix/*` - Hotfix branches

## 🚨 Troubleshooting

### Build Failures

1. Sprawdź logi GitHub Actions
2. Upewnij się, że wszystkie testy przechodzą lokalnie
3. Sprawdź czy wszystkie dependencies są zainstalowane

### Deployment Issues

1. Sprawdź Netlify deploy logs
2. Upewnij się, że secrets są poprawnie skonfigurowane
3. Sprawdź health check endpoint

### Health Check Failures

1. Sprawdź czy funkcja Netlify jest wdrożona
2. Sprawdź logi funkcji w Netlify dashboard
3. Sprawdź network connectivity

## 📈 Performance

### Build Optimization

- Tree shaking przez Vite
- Asset optimization
- Code splitting

### Caching Strategy

- Static assets: 1 year cache
- HTML: No cache
- Service files: No cache

## 🔐 Security

### Security Headers

Automatycznie konfigurowane przez `netlify.toml`:

- X-Frame-Options
- X-XSS-Protection
- X-Content-Type-Options
- Referrer-Policy
- Content-Security-Policy

### Dependencies Security

- Automatyczny audit przy każdym build
- Dependabot alerts (jeśli skonfigurowane)

## 📝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📞 Contact

Project Link: [https://github.com/your-username/Lab1](https://github.com/your-username/Lab1)

---

## 📚 Additional Resources

- [Netlify Documentation](https://docs.netlify.com/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
