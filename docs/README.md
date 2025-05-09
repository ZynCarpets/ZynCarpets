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
  - Automated form submission backups
  - Rate limiting and spam protection
  - Content Security Policy

## Project Structure

```
zyncarpets/
├── index.html          # Main HTML file
├── assets/            # Static assets
│   ├── css/          # Stylesheets
│   └── images/       # Images
├── js/               # JavaScript files
│   ├── script.js     # Main application logic
│   ├── config.js     # Configuration
│   ├── config.template.js # Template for configuration
│   └── backup.js     # Form backup functionality
├── data/             # Data files
│   └── form-submissions.json
├── docs/             # Documentation
│   ├── README.md     # This file
│   └── TODO.md       # Project tasks and notes
├── tests/            # Test files
├── .github/          # GitHub Actions workflows
│   └── workflows/
│       └── deploy.yml
├── robots.txt        # Search engine crawler rules
├── sitemap.xml       # XML sitemap
└── 404.html          # Custom 404 page
```

## Technologies Used

- **Frontend**
  - HTML5
  - CSS3 (Flexbox, Grid, Custom Properties)
  - JavaScript (ES6+)
  - Font Awesome for icons

- **Backend & Services**
  - Formspree for form handling
  - Google Analytics for tracking
  - GitHub Actions for CI/CD
  - Automated backup system

## Getting Started

### Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- Git (for version control)
- Code editor (VS Code recommended)

### Local Development

1. Clone this repository:
   ```bash
   git clone https://github.com/zyncarpets/zyncarpets.git
   cd zyncarpets
   ```

2. Set up configuration:
   - Copy `js/config.template.js` to `js/config.js`
   - Update the configuration values in `js/config.js`

3. Open `index.html` in your browser to view the site locally

## Deployment

### GitHub Pages Deployment with GitHub Actions

The project uses GitHub Actions for automated deployment to GitHub Pages. The workflow is configured to:
- Build and deploy on push to main branch
- Generate and deploy sitemap
- Handle custom domain configuration
- Implement security headers

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
- Modify `js/config.js` for dynamic content
- Update images in the `assets/images` directory
- Edit styles in the `assets/css` directory

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
- Form submission rate limiting
- Automated backup system for form submissions
- 30-day backup retention policy

### Security Best Practices
1. Keep dependencies updated
2. Use HTTPS for all external resources
3. Implement Content Security Policy (CSP)
4. Regular security audits
5. Follow OWASP security guidelines
6. Automated backup system
7. Rate limiting for form submissions
8. Spam protection through Formspree

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