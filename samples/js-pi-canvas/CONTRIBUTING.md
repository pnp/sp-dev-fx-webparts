# Contributing to PiCanvas

Thank you for your interest in contributing to PiCanvas! This document provides guidelines for contributing.

## Getting Started

### Prerequisites
- Node.js 18.17.1+ or 22.14+
- npm (comes with Node.js)
- A SharePoint Online tenant for testing

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/anthonyrhopkins/PiCanvas.git
   cd PiCanvas
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure your tenant**

   Edit `config/serve.json` and replace `{tenantDomain}` with your SharePoint domain:
   ```json
   {
     "initialPage": "https://yourtenant.sharepoint.com/_layouts/15/workbench.aspx?debug=true&noredir=true&debugManifestsFile=https://localhost:4321/temp/build/manifests.js"
   }
   ```

4. **Start development server**
   ```bash
   npm run serve
   ```
   This starts the Heft dev server (build-watch with HTTPS).

5. **Trust the development certificate** (first time only)
   ```bash
   npx heft trust-dev-cert
   ```

### Building for Production

```bash
npx heft build --production
npx heft package-solution --production
```

The `.sppkg` file will be in `sharepoint/solution/`.

## How to Contribute

### Reporting Bugs
- Check existing issues first to avoid duplicates
- Use the bug report template
- Include SharePoint version, browser, and steps to reproduce

### Suggesting Features
- Use the feature request template
- Explain the use case and problem you're solving
- Consider backwards compatibility

### Submitting Code

1. **Fork the repository**

2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Follow existing code patterns
   - Add comments for complex logic
   - Update README if adding features

4. **Test thoroughly**
   - Test in SharePoint Online workbench
   - Test with different tab configurations
   - Test permission-based visibility if touching that code

5. **Run linting**
   ```bash
   npm run build
   ```

6. **Commit with clear messages**
   ```bash
   git commit -m "Add feature: description of what it does"
   ```

7. **Push and create a Pull Request**
   - Fill out the PR template completely
   - Link any related issues

## Code Style Guidelines

### TypeScript
- Use strict TypeScript (`strictNullChecks` is enabled)
- Prefer `const` over `let`
- Use async/await over raw Promises
- Add type annotations for function parameters and returns

### Naming Conventions
- `camelCase` for variables and functions
- `PascalCase` for classes and interfaces
- `UPPER_SNAKE_CASE` for constants
- Prefix interfaces with `I` (e.g., `ITabDataItem`)

### File Organization
- Services go in `src/webparts/piCanvas/services/`
- Models/interfaces go in `src/webparts/piCanvas/models/`
- Keep related code together

### CSS
- Use CSS custom properties (`--pi-*`) for themeable values
- Follow existing SCSS patterns in the codebase
- Support both light and dark themes

## Questions?

- Open a [Discussion](https://github.com/anthonyrhopkins/PiCanvas/discussions) for questions
- Check the [README](README.md) for documentation
- Review existing issues and PRs for context
