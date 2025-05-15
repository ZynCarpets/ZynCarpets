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

3.  **View locally:**
    *   For a basic preview (without API keys for Analytics, Formspree, etc.):
        Open `index.html` directly in your browser.
    *   For a full local preview (with secrets injected, similar to the deployed version):
        a.  Create a `.env` file in the project root. Add your secrets here, for example:
            ```env
            GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
            GOOGLE_SITE_VERIFICATION=your_verification_string
            FORMSPREE_FORM_ID=your_formspree_id
            ```
        b.  Run the build script:
            ```bash
            npm run build
            ```
        c.  Open `dist/index.html` in your browser.

## Overview of Project Structure

```
zyncarpets/
├── index.html              # Main HTML entry point
├── assets/                 # CSS, images, and other static assets
├── js/                     # Client-side JavaScript (e.g., main script, mobile menu)
├── scripts/                # Build scripts (e.g., build.js for processing HTML and assets)
├── docs/                   # Project documentation
├── tests/                  # Automated tests (Jest)
├── .github/                # GitHub Actions workflows (e.g., deployment)
├── package.json            # Project dependencies and npm scripts
└── ...                     # Other configuration and project files
```

For a detailed project structure and more in-depth information, please see the [docs/README.md](docs/README.md) file.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 