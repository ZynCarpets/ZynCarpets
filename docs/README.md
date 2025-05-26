# Zyn Carpets Landing Page Documentation

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Website](https://img.shields.io/website?url=https%3A%2F%2Fzyncarpets.com)](https://zyncarpets.com)
[![Build Status](https://img.shields.io/github/actions/workflow/status/zyncarpets/zyncarpets/deploy.yml?branch=main)](https://github.com/zyncarpets/zyncarpets/actions)
[![Code Coverage](https://img.shields.io/badge/coverage-85%25-green)](https://github.com/zyncarpets/zyncarpets/tree/main/tests)
[![Last Commit](https://img.shields.io/github/last-commit/zyncarpets/zyncarpets)](https://github.com/zyncarpets/zyncarpets/commits/main)
[![Open Issues](https://img.shields.io/github/issues/zyncarpets/zyncarpets)](https://github.com/zyncarpets/zyncarpets/issues)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/zyncarpets/zyncarpets/pulls)

A modern, responsive landing page for Zyn Carpets, a locally-owned carpet cleaning company specializing in eco-friendly cleaning solutions and exceptional customer service. This project features a clean, professional design with interactive elements.

## Table of Contents
- [Features](#features)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Deployment](#deployment)
- [Customization](#customization)
- [Browser Support](#browser-support)
- [Security](#security)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- **Responsive Design**
  - Mobile-first approach
  - Optimized for all devices (desktop, tablet, mobile)
  - Fluid layouts and flexible images

- **Modern UI/UX**
  - Clean, minimalist design
  - Smooth animations and transitions
  - Intuitive navigation
  - Accessibility compliance

- **Dynamic Content**
  - Service showcase section
  - About section highlighting company benefits
  - Smooth scrolling navigation
  - Social media integration

- **Analytics & SEO**
  - Google Analytics integration
  - Google Search Console verification
  - Custom event tracking
  - SEO-optimized meta tags
  - XML sitemap
  - Robots.txt configuration

- **Security & Performance**
  - Security headers implementation
  - Form submission via Formspree (handles spam protection, rate limiting)
  - Content Security Policy

## Project Structure

```
zyncarpets/
├── index.html              # Main HTML file for the Zyn Carpets website
├── 404.html                # Custom 404 error page
├── src/                    # Source files
│   ├── assets/            # Static assets
│   │   ├── css/          # CSS stylesheets
│   │   └── images/       # Image files
│   ├── js/               # JavaScript files
│   ├── partials/         # HTML partials
├── dist/                  # Build output (gitignored)
├── tests/                 # Jest test files
├── docs/                  # Project documentation
│   ├── README.md          # This detailed documentation file
│   └── TODO.md            # List of tasks and issues
├── .github/               # GitHub specific files
│   └── workflows/         # GitHub Actions workflow configurations
│       └── deploy.yml     # Workflow for building and deploying the site to GitHub Pages
├── .babelrc               # Babel configuration
├── .gitignore             # Specifies intentionally untracked files
├── jest.config.js         # Jest testing framework configuration
├── package.json           # npm package manifest
├── package-lock.json      # Records exact versions of dependencies
├── README.md              # Main project README
├── robots.txt             # Instructions for search engine crawlers
└── sitemap.xml            # XML sitemap for search engines
```

> **Note:** The `dist/` directory is generated during the build process and is excluded from version control via `.gitignore`.

Most of the site's dynamic content and configuration (e.g., services, testimonials, company info) are currently managed directly within `src/js/`.

Environment-specific variables (like API keys) are injected into HTML placeholders by the build script during the build process (see `.github/workflows/deploy.yml`).

## Technologies Used

- **Frontend**
  - HTML5
  - CSS3 (Flexbox, Grid, Custom Properties)
  - JavaScript (ES6+)
  - Font Awesome for icons

- **Backend & Services**
  - Formspree for form handling and submission storage
  - Google Analytics for tracking
  - GitHub Actions for CI/CD

## Getting Started

### Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- Git (for version control)
- Node.js and npm (for running build scripts and managing dependencies)
- Code editor (VS Code recommended)

### Local Development

1. Clone this repository:
   ```bash
   git clone https://github.com/zyncarpets/zyncarpets.git
   cd zyncarpets
   ```

2. Install dependencies (optional, if you need to run tests or other npm scripts locally):
   ```bash
   npm install
   ```

3. Open `index.html` in your browser to view the site locally. Note that some features, like Google Analytics or Formspree integration, rely on API keys that are injected during the build process and might not be fully functional when running the source `index.html` directly without a build. For the full experience, including environment variable injection, you can run the build script:
   ```bash
   npm run build
   ```
   Then open `dist/index.html`.

## Deployment

The project is deployed to GitHub Pages using a GitHub Actions workflow defined in `.github/workflows/deploy.yml`.

### Secret Management

Sensitive information such as API keys and configuration IDs (e.g., Google Analytics ID, Google Site Verification Code, Formspree Form ID) are managed as GitHub Secrets for the repository.

### Build and Deployment Process

The GitHub Actions workflow performs the following key steps on every push to the `main` branch:

1.  **Checkout Code**: Checks out the latest version of your repository.
2.  **Setup Node.js**: Sets up the Node.js environment specified in the workflow.
3.  **Install Dependencies**: Runs `npm install` to install project dependencies.
4.  **Build Project**: 
    *   Runs the `npm run build` command, which executes the `scripts/build.js` script.
    *   During this step, GitHub Secrets (made available as environment variables to the build script) are used by `scripts/build.js` to replace placeholders (e.g., `{{GOOGLE_ANALYTICS_ID}}`, `{{FORMSPREE_ENDPOINT}}`, `{{GOOGLE_SITE_VERIFICATION}}`) in the source HTML files (`index.html`, `404.html`, etc.).
    *   The processed HTML files, along with other necessary assets (CSS, JavaScript, images), are placed in the `dist/` directory. This includes operations like CSS hashing for cache busting.
5.  **Deploy to GitHub Pages**: The contents of the `dist/` directory are deployed to the `gh-pages` branch, which makes the site live on GitHub Pages.

This process ensures that secrets are not hardcoded in the repository and are securely injected only during the build and deployment on the GitHub Actions runners.

### GitHub Pages Configuration

To ensure GitHub Pages serves your site correctly from the `gh-pages` branch:

1. Enable GitHub Pages:
   - Go to repository settings
   - Navigate to "Pages" section
   - Under "Source", select "Deploy from a branch"
   - Select "gh-pages" branch
   - Click "Save"

2. Push your code to trigger the workflow:
   ```bash
   git add .
   git commit -m "Add GitHub Actions workflow"
   git push origin main
   ```

3. Monitor the deployment:
   - Go to your repository
   - Click on "Actions" tab
   - You should see your workflow running
   - Wait for the workflow to complete
   - Your site will be available at `https://yourusername.github.io/repository-name`

## Customization

### Content Updates
- Modify content directly within `src/js/script.js` for elements like services, testimonials, features, etc.
- For site configuration values that are injected during build (e.g., Google Analytics ID, Formspree endpoint, Google Site Verification code), ensure the corresponding GitHub Secrets are correctly set in your repository settings. The `scripts/build.js` script handles their injection into the HTML placeholders (`{{PLACEHOLDER_NAME}}`) during the deployment workflow.
- Update images in the `src/assets/images` directory.
- Edit styles in the `src/assets/css` directory.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Android Chrome)

## Security

### Implemented Security Features
- Content Security Policy headers
- X-Frame-Options protection
- X-Content-Type-Options headers
- Referrer-Policy configuration
- X-XSS-Protection headers
- Form submissions handled by Formspree (includes security features)

### Security Best Practices
1. Keep dependencies updated
2. Use HTTPS for all external resources
3. Implement Content Security Policy (CSP)
4. Regular security audits
5. Follow OWASP security guidelines
6. Rely on Formspree for secure form submission handling and data storage
7. Spam protection through Formspree

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.

## Contact

- **Website**: [zyncarpets.com](https://zyncarpets.com)
- **Email**: support@zyncarpets.com
- **Phone**: (555) 123-4567
- **Hours**: Mon-Fri 9AM-6PM EST

For support or inquiries:
- Use the contact form on the website
- Email support@zyncarpets.com
- Call during business hours
- Response time: Within 24 hours