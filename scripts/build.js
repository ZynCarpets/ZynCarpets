const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
require('dotenv').config();

// Create dist directory if it doesn't exist
const distDir = path.join(__dirname, '..', 'dist');
if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
}

// Function to generate hash for cache busting
function generateHash(content) {
    return crypto.createHash('md5').update(content).digest('hex').slice(0, 8);
}

// Clean up old hashed CSS files
function cleanupOldFiles(directory) {
    if (fs.existsSync(directory)) {
        const files = fs.readdirSync(directory);
        files.forEach(file => {
            if (file.match(/\.\w{8}\.css$/)) {
                fs.unlinkSync(path.join(directory, file));
            }
        });
    }
}

// Copy directory recursively
function copyRecursive(src, dest) {
    if (!fs.existsSync(src)) return;
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
    }
    const entries = fs.readdirSync(src, { withFileTypes: true });
    for (const entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);
        if (entry.isDirectory()) {
            copyRecursive(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}

// Copy js directory
const jsSrc = path.join(__dirname, '..', 'js');
const jsDest = path.join(distDir, 'js');
copyRecursive(jsSrc, jsDest);

// Copy entire assets directory
const assetsSrc = path.join(__dirname, '..', 'assets');
const assetsDest = path.join(distDir, 'assets');
copyRecursive(assetsSrc, assetsDest);

// Add cache busting to CSS files in assets/css
const cssDir = path.join(distDir, 'assets/css');
if (fs.existsSync(cssDir)) {
    // Clean up old hashed files
    cleanupOldFiles(cssDir);
    const cssFiles = fs.readdirSync(cssDir).filter(file => file.endsWith('.css') && !file.match(/\.\w{8}\.css$/));
    cssFiles.forEach(file => {
        const filePath = path.join(cssDir, file);
        const content = fs.readFileSync(filePath, 'utf8');
        const hash = generateHash(content);
        const newFileName = `${path.parse(file).name}.${hash}.css`;
        fs.writeFileSync(path.join(cssDir, newFileName), content);
        // Remove original file
        fs.unlinkSync(filePath);
    });
}

// Process all HTML files in the project root
const htmlFiles = fs.readdirSync(path.join(__dirname, '..')).filter(file => file.endsWith('.html'));
htmlFiles.forEach(htmlFile => {
    const htmlPath = path.join(__dirname, '..', htmlFile);
    let htmlContent = fs.readFileSync(htmlPath, 'utf8');
    // Replace CSS references with hashed versions
    const cssFiles = fs.readdirSync(cssDir).filter(file => file.endsWith('.css'));
    cssFiles.forEach(file => {
        const oldPath = `assets/css/${file.replace(/\.\w{8}\.css$/, '.css')}`;
        const newPath = `assets/css/${file}`;
        htmlContent = htmlContent.replace(oldPath, newPath);
    });
    // Replace environment variables
    const processedContent = htmlContent
        .replace('{{GOOGLE_ANALYTICS_ID}}', process.env.GOOGLE_ANALYTICS_ID || '')
        .replace('{{GOOGLE_SITE_VERIFICATION}}', process.env.GOOGLE_SITE_VERIFICATION || '')
        .replace('{{FORMSPREE_ENDPOINT}}', process.env.FORMSPREE_ENDPOINT || '')
        .replace('{{FORMSPREE_FORM_ID}}', process.env.FORMSPREE_FORM_ID || '');
    // Write processed HTML to dist
    fs.writeFileSync(path.join(distDir, htmlFile), processedContent);
});

console.log('Build completed successfully!'); 