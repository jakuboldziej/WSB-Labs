# Security Overrides for Development

## Known Issues in Development Dependencies

### tar-fs vulnerability in netlify-cli

- **Issue**: CVE in tar-fs package used by netlify-cli
- **Impact**: Development only - does not affect production build
- **Path**: `node_modules/netlify-cli/node_modules/tar-fs`
- **Risk Level**: Low (dev-only dependency)
- **Status**: Monitoring for netlify-cli updates

### Mitigation Strategy

1. **Production**: Zero high/critical vulnerabilities ✅
2. **Development**: Monitor and update netlify-cli regularly
3. **CI/CD**: Separate prod and dev security audits

## Acceptable Dev Dependencies Vulnerabilities

- netlify-cli and its subdependencies
- Testing frameworks (if applicable)
- Build tools that don't affect production output

## Security Review Process

1. `npm audit --omit=dev --audit-level=high` must pass
2. `npm audit --audit-level=high` may fail due to dev deps
3. Manual review for any production-affecting vulnerabilities
4. Regular updates of development tools
