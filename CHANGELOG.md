# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-10-02

### Added

- Initial production-ready release
- Complete React + TypeScript + Vite setup
- Shadcn UI component library integration
- Hero section with animated text reveal
- Features, Automation, CTA sections
- Footer component
- Dark mode support with next-themes
- Responsive navigation
- Custom hooks for animations and effects
- ErrorBoundary component for error handling
- Comprehensive testing setup (Vitest + Playwright)
- CI/CD pipeline with GitHub Actions
- Docker support for containerization
- SEO optimization (robots.txt, sitemap.xml)
- Prettier and ESLint configuration
- Pre-commit hooks with Husky
- TypeScript strict mode
- VS Code workspace settings
- SSL certificates (GlobalSign, valid until March 2026)
- Production nginx configuration
- Complete deployment documentation

### Changed

- Removed Supabase dependency (standalone deployment)
- Removed React Query dependency (no external API needed)
- Simplified App.tsx without QueryClientProvider
- Updated environment variables (removed Supabase vars)
- Enhanced TypeScript configuration for stricter type checking
- Improved code formatting rules
- Updated project structure for better maintainability
- Updated all links to asteum.ru domain

### Security

- Implemented ErrorBoundary for graceful error handling
- Added security headers in nginx configuration
- Environment variable validation
- SSL/TLS configuration with modern ciphers
- HSTS enabled
- OCSP Stapling enabled

### Removed

- Supabase integration (`@supabase/supabase-js`)
- React Query (`@tanstack/react-query`)
- Supabase configuration files

## [0.0.0] - Initial Setup

### Added

- Initial project setup from Lovable template

---

[1.0.0]: https://github.com/asteum/asteum-process-flow/releases/tag/v1.0.0
[0.0.0]: https://github.com/asteum/asteum-process-flow/releases/tag/v0.0.0
