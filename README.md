# Zyn Carpets Landing Page

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Website](https://img.shields.io/website?url=https%3A%2F%2Fzyncarpets.com)](https://zyncarpets.com)
[![Build Status](https://img.shields.io/github/actions/workflow/status/zyncarpets/zyncarpets/deploy.yml?branch=main)](https://github.com/zyncarpets/zyncarpets/actions)

A modern, responsive landing page for Zyn Carpets, a locally-owned carpet cleaning company specializing in eco-friendly cleaning solutions and exceptional customer service.

## Quick Start

1.  **Clone this repository:**
    ```bash
    git clone https://github.com/zyncarpets/zyncarpets.git
    cd zyncarpets
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Setup:**
    Create a `.env` file in the project root with the following variables:
    ```env
    # Required
    GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
    GOOGLE_SITE_VERIFICATION=your_verification_string

    # Optional
    FORMSPREE_ENDPOINT=your_formspree_endpoint
    FORMSPREE_FORM_ID=your_formspree_id
    ```

4.  **Development:**
    ```bash
    # Build the project
    npm run build

    # Start development server
    npm run dev
    ```

5.  **Testing:**
    ```bash
    # Run tests
    npm test

    # Run tests in watch mode
    npm run test:watch
    ```

## Build Process

The build process:
1. Validates environment variables
2. Creates a backup of the current `dist` directory
3. Processes and combines CSS files in the correct order:
   - variables.css (CSS variables)
   - animations.css (animations)
   - component styles (slider.css, welcome.css, reviews.css)
   - styles.css (main styles)
   - media.css (responsive styles)
   - main.css (additional styles)
4. Minifies CSS and generates source maps
5. Processes HTML files and injects environment variables
6. Copies assets to the dist directory

## Project Structure

```
zyncarpets/
├── src/                    # Source files
│   ├── assets/            # Static assets
│   │   ├── css/          # CSS files
│   │   └── images/       # Images
│   ├── js/               # JavaScript files
│   ├── partials/         # HTML partials
│   └── build.js          # Build script
├── dist/                  # Build output
├── tests/                # Test files
├── docs/                 # Documentation
└── package.json          # Project configuration
```

## Development

- CSS files are processed in a specific order to ensure proper cascading
- The build script handles CSS minification and source map generation
- Environment variables are injected into HTML during build
- Development server serves the `dist` directory

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 