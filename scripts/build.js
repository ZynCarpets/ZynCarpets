const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Create dist directory if it doesn't exist
const distDir = path.join(__dirname, '..', 'dist');
if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
}

// Copy static files
const staticDirs = ['js', 'css', 'images'];
staticDirs.forEach(dir => {
    const srcDir = path.join(__dirname, '..', dir);
    const destDir = path.join(distDir, dir);
    
    if (fs.existsSync(srcDir)) {
        if (!fs.existsSync(destDir)) {
            fs.mkdirSync(destDir, { recursive: true });
        }
        
        // Copy directory contents
        fs.cpSync(srcDir, destDir, { recursive: true });
    }
});

// Read and process index.html
const indexPath = path.join(__dirname, '..', 'index.html');
const indexContent = fs.readFileSync(indexPath, 'utf8');

// Extract Formspree form ID from endpoint
const formspreeEndpoint = process.env.FORMSPREE_ENDPOINT || '';
const formspreeFormId = formspreeEndpoint.split('/').pop() || '';

// Replace environment variables
const processedContent = indexContent
    .replace('{{GOOGLE_ANALYTICS_ID}}', process.env.GOOGLE_ANALYTICS_ID || '')
    .replace('{{GOOGLE_SITE_VERIFICATION}}', process.env.GOOGLE_SITE_VERIFICATION || '')
    .replace('{{FORMSPREE_ENDPOINT}}', formspreeEndpoint)
    .replace('{{FORMSPREE_FORM_ID}}', formspreeFormId);

// Write processed index.html to dist
fs.writeFileSync(path.join(distDir, 'index.html'), processedContent);

console.log('Build completed successfully!'); 