# Zyn Carpets Landing Page

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Website](https://img.shields.io/website?url=https%3A%2F%2Fzyncarpets.com)](https://zyncarpets.com)

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

## Project Structure

```
zyncarpets/
├── index.html          # Main HTML file
├── styles.css          # CSS styles
├── script.js           # Frontend JavaScript
├── config.js           # Configuration file
├── logo.png           # Company logo
├── TODO.md            # Project tasks and notes
└── README.md          # Documentation
```

## Technologies Used

- **Frontend**
  - HTML5
  - CSS3 (Flexbox, Grid, Custom Properties)
  - JavaScript (ES6+)
  - Font Awesome for icons

## Getting Started

### Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- Git (for version control)
- Code editor (VS Code recommended)

### Local Development

1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/zyncarpets.git
   cd zyncarpets
   ```

2. Set up environment variables:
   ```bash
   # Create a .env file in the root directory
   echo "GOOGLE_ANALYTICS_ID=your_google_analytics_id_here" > .env
   echo "GOOGLE_SITE_VERIFICATION=your_google_site_verification_code_here" >> .env
   echo "FORMSPREE_FORM_ID=your_formspree_form_id_here" >> .env
   ```
   Replace:
   - `your_google_analytics_id_here` with your actual Google Analytics Measurement ID (e.g., G-XXXXXXXXXX)
   - `your_google_site_verification_code_here` with your actual Google Search Console verification code
   - `your_formspree_form_id_here` with your actual Formspree form ID

3. Open `index.html` in your browser to view the site locally

## Deployment

### GitHub Pages Deployment with GitHub Actions

1. Set up GitHub repository secrets:
   - Go to your repository settings
   - Navigate to "Secrets and variables" → "Actions"
   - Click "New repository secret"
   - Add the following secrets:
     ```
     GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
     GOOGLE_SITE_VERIFICATION=your_verification_code
     FORMSPREE_FORM_ID=your_form_id
     ```

2. Enable GitHub Pages:
   - Go to repository settings
   - Navigate to "Pages" section
   - Under "Source", select "Deploy from a branch"
   - Select "gh-pages" branch
   - Click "Save"

3. Push your code to trigger the workflow:
   ```bash
   git add .
   git commit -m "Add GitHub Actions workflow"
   git push origin main
   ```

4. Monitor the deployment:
   - Go to your repository
   - Click on "Actions" tab
   - You should see your workflow running
   - Wait for the workflow to complete
   - Your site will be available at `https://yourusername.github.io/repository-name`

### Custom Domain Setup

1. Configure GitHub Pages custom domain:
   - Enter domain in repository settings
   - Add DNS records at your registrar:
     ```
     Type: A
     Name: @
     Value: 185.199.108.153
     Value: 185.199.109.153
     Value: 185.199.110.153
     Value: 185.199.111.153

     Type: CNAME
     Name: www
     Value: yourusername.github.io
     ```

2. Wait for DNS propagation (up to 48 hours)
3. Enable HTTPS in GitHub Pages settings

## Customization

### Content Updates
- Modify `config.js` for dynamic content
- Update images in the project directory
- Edit color scheme in `styles.css`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Android Chrome)

## Security

### Configuration and Environment Variables
- Sensitive information is stored in environment variables
- Use `config.template.js` as a base for your configuration
- Create a `.env` file with your actual values (not tracked in git)
- Never commit sensitive data to the repository

### Required Environment Variables
1. `GOOGLE_ANALYTICS_ID`: Your Google Analytics Measurement ID (e.g., G-XXXXXXXXXX)
   - Used for tracking website analytics
   - Keep this ID private and never commit it to version control

2. `GOOGLE_SITE_VERIFICATION`: Your Google Search Console verification code
   - Used to verify website ownership in Google Search Console
   - Format: A string of characters provided by Google Search Console
   - Keep this code private and never commit it to version control

3. `FORMSPREE_FORM_ID`: Your Formspree form ID (e.g., xzzrvpeb)
   - Used for the contact form submission
   - Keep this ID private and never commit it to version control
   - The form ID is used in the contact form's data attribute

### Security Best Practices
1. Keep dependencies updated
2. Use HTTPS for all external resources
3. Implement Content Security Policy (CSP)
4. Regular security audits
5. Follow OWASP security guidelines

### Setting Up Local Development
1. Copy `config.template.js` to `config.js`
2. Create a `.env` file with your configuration:
   ```
   GOOGLE_ANALYTICS_ID=your_google_analytics_id_here
   GOOGLE_SITE_VERIFICATION=your_google_site_verification_code_here
   FORMSPREE_FORM_ID=your_formspree_form_id_here
   ```
3. Never commit the actual `config.js` or `.env` files

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

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