const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
require('dotenv').config();

// Base directory for source files
const srcDir = path.join(__dirname, '..', 'src');
const siteContentData = require('./js/site-content.js'); // Load the site content

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

// Copy entire js directory from src/js to dist/js
const jsSrcDir = path.join(srcDir, 'js');
const jsDestDir = path.join(distDir, 'js');
copyRecursive(jsSrcDir, jsDestDir);

// Copy entire assets directory
const assetsSrc = path.join(srcDir, 'assets'); // Corrected to src/assets
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

// Function to process {{INCLUDE partialPath}} directives
function processIncludes(htmlContent, currentFileDir) {
    const includeRegex = /\{\{INCLUDE\s+(.*?)\s*\}\}/g;
    let match;
    let processedContent = htmlContent;

    let newHtmlContent = htmlContent;
    while ((match = includeRegex.exec(htmlContent)) !== null) {
        const partialPath = match[1].trim();
        const fullPartialPath = path.resolve(srcDir, partialPath);

        if (fs.existsSync(fullPartialPath)) {
            try {
                const partialFileContent = fs.readFileSync(fullPartialPath, 'utf8');
                const processedPartialContent = processIncludes(partialFileContent, path.dirname(fullPartialPath));
                newHtmlContent = newHtmlContent.replace(match[0], processedPartialContent);
            } catch (error) {
                console.error(`Error reading or processing partial ${fullPartialPath}:`, error);
                newHtmlContent = newHtmlContent.replace(match[0], `<!-- Error including ${partialPath}: ${error.message} -->`);
            }
        } else {
            console.warn(`Partial file not found: ${fullPartialPath} (referenced in a file in ${currentFileDir})`);
            newHtmlContent = newHtmlContent.replace(match[0], `<!-- Partial not found: ${partialPath} -->`);
        }
    }
    return newHtmlContent;
}

// Process all HTML files in the src directory
const htmlFiles = fs.readdirSync(srcDir).filter(file => file.endsWith('.html'));

htmlFiles.forEach(htmlFile => {
    const htmlPath = path.join(srcDir, htmlFile);
    let htmlContent = fs.readFileSync(htmlPath, 'utf8');

    // Process includes first
    htmlContent = processIncludes(htmlContent, srcDir);

    // Inject SITE_DATA script into the head
    const siteDataScript = `<script>window.SITE_DATA = ${JSON.stringify(siteContentData)};</script>`;
    htmlContent = htmlContent.replace("</head>", `${siteDataScript}</head>`);

    // Replace CSS references with hashed versions
    if (fs.existsSync(cssDir)) {
        const builtCssFiles = fs.readdirSync(cssDir).filter(file => file.endsWith('.css'));
        builtCssFiles.forEach(file => {
            const originalFileName = file.replace(/\.\w{8}\.css$/, '.css');
            const oldPathString = `assets/css/${originalFileName}`;
            const newPathString = `assets/css/${file}`;
            const escapedOldPath = oldPathString.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&');
            htmlContent = htmlContent.replace(new RegExp(escapedOldPath, 'g'), newPathString);
        });
    }
    
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