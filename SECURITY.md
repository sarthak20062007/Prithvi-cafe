# Security Documentation — Prithvi Cafe

## Overview

This document outlines the security measures implemented in the Prithvi Cafe website and provides a production deployment checklist.

---

## Security Measures

### 1. HTTP Security Headers

All responses include the following security headers (configured in `next.config.ts`):

| Header | Value | Purpose |
|--------|-------|---------|
| Content-Security-Policy | Strict policy | Prevents XSS, data injection, clickjacking |
| X-Frame-Options | DENY | Prevents clickjacking via iframe embedding |
| X-Content-Type-Options | nosniff | Prevents MIME-type sniffing |
| Referrer-Policy | strict-origin-when-cross-origin | Controls referrer leaking |
| Strict-Transport-Security | max-age=63072000; includeSubDomains; preload | Enforces HTTPS |
| Permissions-Policy | Restrictive | Disables unused browser APIs |
| X-DNS-Prefetch-Control | on | Controls DNS prefetching |

`X-Powered-By` header is **removed** (`poweredByHeader: false`).

### 2. Content Security Policy Details

```
default-src 'self'
script-src 'self'
style-src 'self' 'unsafe-inline' https://fonts.googleapis.com
font-src 'self' https://fonts.gstatic.com
img-src 'self' https://lh3.googleusercontent.com data:
connect-src 'self'
frame-src 'none'
object-src 'none'
base-uri 'self'
form-action 'self'
frame-ancestors 'none'
upgrade-insecure-requests
```

> **Note**: `'unsafe-inline'` for `style-src` is required because Tailwind CSS and Framer Motion inject inline styles at runtime. This is a standard trade-off for CSS-in-JS frameworks.

### 3. Input Validation

All form inputs are validated using **Zod** schemas (`src/lib/validations/`):

- **Reservation Form**: Guest count (enum-constrained), date (today to 90 days), time (operating hours 11:00–23:00)
- Validation errors use safe, pre-defined messages — no raw error objects exposed

### 4. Rate Limiting

Middleware (`src/middleware.ts`) enforces rate limits on API routes:

| Route Pattern | Limit | Window |
|---------------|-------|--------|
| `/api/auth/*` | 5 requests | 15 minutes |
| `/api/contact/*`, `/api/reservation/*`, `/api/newsletter/*` | 5 requests | 1 minute |
| `/api/*` (general) | 60 requests | 1 minute |

Exceeded limits return `429 Too Many Requests` with `Retry-After` header.

### 5. CORS Configuration

- No wildcard (`*`) origins
- Explicit allowed origins from `NEXT_PUBLIC_SITE_URL` environment variable
- Methods restricted to `GET`, `POST`, `OPTIONS`
- Headers restricted to `Content-Type`, `Authorization`

### 6. Error Handling

Centralized error handling (`src/lib/errors.ts`):

- Users see generic, safe error messages
- Full details logged only in development
- Stack traces, internal paths, and env values never exposed

---

## Production Deployment Checklist

### Environment Variables

- [ ] `.env.local` created with production values
- [ ] `NEXT_PUBLIC_SITE_URL` set to production domain
- [ ] No `.env` files committed to git (verify: `git status`)
- [ ] No secrets in source code (verify: `grep -r "password\|secret\|api_key" src/`)

### HTTPS

- [ ] HTTPS enforced on hosting platform
- [ ] HSTS header verified in production responses

### Security Headers

Verify headers are active:

```bash
curl -I https://your-domain.com
```

Expected headers:
- `content-security-policy`
- `x-frame-options: DENY`
- `x-content-type-options: nosniff`
- `referrer-policy: strict-origin-when-cross-origin`
- `strict-transport-security: max-age=63072000...`
- `permissions-policy`
- **No** `x-powered-by`

### Rate Limiting

- [ ] Test API routes with rapid requests to confirm `429` responses
- [ ] Verify `Retry-After` header in rate-limited responses

### Validation

- [ ] Test reservation form with invalid dates (past dates, >90 days)
- [ ] Test with invalid times (outside operating hours)
- [ ] Verify error messages display correctly

### CORS

- [ ] Verify API responses include correct `Access-Control-Allow-Origin`
- [ ] Verify no wildcard origins in production

### Dependencies

```bash
npm audit
```

- [ ] Review and address any critical/high severity vulnerabilities
- [ ] Monitor for Next.js patch releases that fix PostCSS vulnerability

---

## Dependency Notes

### Known Issues

- **PostCSS < 8.5.10**: Moderate severity XSS vulnerability (GHSA-qx2v-qp2m-jg93). Transitive dependency through Next.js. Cannot be fixed without downgrading Next.js. Monitor for upstream fix.

### Update Policy

- Run `npm audit` regularly
- Update security-related packages promptly
- Do not force-update dependencies that would cause breaking changes
- Test all updates in staging before production deployment

---

## Reporting Security Issues

If you discover a security vulnerability, please report it responsibly by contacting the development team directly. Do not open public issues for security concerns.
