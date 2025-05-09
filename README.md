# Zyn Carpets Landing Page

A modern, responsive landing page for Zyn Carpets, a locally-owned carpet cleaning company. This project features a clean, professional design with interactive elements.

## Features

- Responsive design optimized for all devices
- Modern and clean user interface with smooth animations
- Dynamic service showcase section
- About section highlighting company benefits
- Smooth scrolling navigation
- Social media integration
- Configurable content through `config.js`

## Project Structure

```
zyncarpets/
├── index.html          # Main HTML file
├── styles.css          # CSS styles
├── script.js           # Frontend JavaScript
├── config.js           # Configuration file
└── logo.png           # Company logo
```

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- Font Awesome for icons
- Modern CSS features (Flexbox, Grid, Custom Properties)

## Getting Started

### Prerequisites

- Modern web browser
- Git (for deployment)

### Local Development

1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/zyncarpets.git
   cd zyncarpets
   ```

2. Open `index.html` in your browser to view the site locally

### Deployment to GitHub Pages

1. Create a new repository on GitHub
2. Push your code to the repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/zyncarpets.git
   git push -u origin main
   ```

3. Go to your repository settings on GitHub
4. Scroll down to the "GitHub Pages" section
5. Under "Source", select "main" branch
6. Click "Save"
7. Your site will be published at `https://yourusername.github.io/zyncarpets`

### Custom Domain Setup

1. In your repository settings, under "GitHub Pages"
2. Enter your custom domain in the "Custom domain" field
3. Click "Save"
4. Add the following DNS records at your domain registrar:
   - Type: A
     - Name: @
     - Value: 185.199.108.153
     - Value: 185.199.109.153
     - Value: 185.199.110.153
     - Value: 185.199.111.153
   - Type: CNAME
     - Name: www
     - Value: yourusername.github.io

## Customization

- Update company information in `config.js`
- Modify color scheme in `styles.css`
- Replace images in the project directory

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Android Chrome)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For support or inquiries, please use the contact form on the website or reach out through the provided contact information. 