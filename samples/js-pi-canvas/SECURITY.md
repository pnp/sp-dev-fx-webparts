# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 2.2.x   | :white_check_mark: |
| < 2.2   | :x:                |

## Reporting a Vulnerability

If you discover a security vulnerability in PiCanvas, please report it responsibly:

1. **Do NOT** open a public GitHub issue for security vulnerabilities
2. Email the maintainer directly or use GitHub's private vulnerability reporting feature
3. Include as much detail as possible:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

## Security Measures

PiCanvas implements the following security measures:

### Input Validation
- All user inputs are validated through SharePoint property pane controls
- HTML encoding is applied to prevent XSS attacks
- URL sanitization for external links

### Code Quality
- ESLint security rules enforced (no-eval, no-script-url, no-new-func)
- Strict TypeScript null checks enabled
- No prototype pollution vectors (no-proto, no-extend-native blocked)

### Permission Handling
- Uses SharePoint's native SPHttpClient for API calls
- Group membership checks use official SharePoint REST APIs
- Fail-open behavior on API errors (graceful degradation)
- 5-minute cache prevents excessive API calls

## Third-Party Dependencies

- Dependencies are regularly audited via `npm audit`
- jQuery is loaded from official CDN with integrity checks
- All SPFx framework dependencies are from official Microsoft packages

## Responsible Disclosure

We appreciate security researchers who follow responsible disclosure practices. We commit to:

- Acknowledging receipt of your report within 48 hours
- Providing regular updates on our progress
- Crediting you in release notes (unless you prefer anonymity)
- Not taking legal action against researchers who follow this policy
