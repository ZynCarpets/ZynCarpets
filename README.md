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

2. Open `index.html` in your browser to view the site locally

## Deployment

### GitHub Pages Deployment

1. Create a new repository on GitHub
2. Push your code:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/zyncarpets.git
   git push -u origin main
   ```

3. Configure GitHub Pages:
   - Go to repository settings
   - Navigate to "GitHub Pages" section
   - Select "main" branch as source
   - Save changes

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