import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import CleanCSS from 'clean-css';
import critical from 'critical';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env file only in development
if (process.env.NODE_ENV !== 'production') {
    try {
        const dotenv = await import('dotenv');
        dotenv.config();
    } catch (error) {
        console.warn('No .env file found, using environment variables');
    }
}

// Base directory for source files
const srcDir = path.join(__dirname, '..', 'src');
const distDir = path.join(__dirname, '..', 'dist');
import siteContentData from './js/site-content.js';

// Required environment variables
const requiredEnvVars = ['GOOGLE_ANALYTICS_ID', 'GOOGLE_SITE_VERIFICATION'];
const optionalEnvVars = ['FORMSPREE_ENDPOINT', 'FORMSPREE_FORM_ID'];

// Validate environment variables
function validateEnvVars() {
    console.log('Checking environment variables...');
    console.log('NODE_ENV:', process.env.NODE_ENV);
    
    // Log all environment variables (without values) for debugging
    console.log('Available environment variables:', Object.keys(process.env).filter(key => 
        key.startsWith('GOOGLE_') || key.startsWith('FORMSPREE_')
    ));

    const missing = requiredEnvVars.filter(varName => !process.env[varName]);
    if (missing.length > 0) {
        if (process.env.NODE_ENV === 'production') {
            console.error('Missing required GitHub Secrets:', missing.join(', '));
            console.error('Please ensure these secrets are set in your GitHub repository settings under Settings > Secrets and variables > Actions');
            throw new Error(`Missing required GitHub Secrets: ${missing.join(', ')}`);
        } else {
            console.error('Missing required environment variables:', missing.join(', '));
            console.error('Please add them to your .env file or set them as environment variables');
            throw new Error(`Missing required environment variables: ${missing.join(', ')}. Please add them to your .env file or set them as environment variables.`);
        }
    }
}

// Create dist directory if it doesn't exist
if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
}

// Function to generate hash for cache busting
function generateHash(content) {
    return crypto.createHash('md5').update(content).digest('hex').slice(0, 8);
}

// Backup dist directory before cleaning
function backupDist() {
    const backupDir = path.join(__dirname, '..', 'dist_backup');
    
    // If backup directory exists, remove it first
    if (fs.existsSync(backupDir)) {
        try {
            fs.rmSync(backupDir, { recursive: true, force: true });
        } catch (error) {
            console.warn('Could not remove existing backup directory:', error.message);
        }
    }

    // If dist directory exists, copy it instead of renaming
    if (fs.existsSync(distDir)) {
        try {
            // Create backup directory
            fs.mkdirSync(backupDir, { recursive: true });
            
            // Copy files instead of renaming
            copyRecursive(distDir, backupDir);
            
            // Remove original dist directory
            fs.rmSync(distDir, { recursive: true, force: true });
        } catch (error) {
            console.warn('Could not backup dist directory:', error.message);
            // Continue with build even if backup fails
        }
    }
}

// Clean up old hashed CSS files
function cleanupOldFiles(directory) {
    if (fs.existsSync(directory)) {
        const files = fs.readdirSync(directory);
        files.forEach(file => {
            if (file.match(/\.\w{8}\.(css|map)$/)) {
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

// Process CSS files
async function processCSS() {
    const cssDir = path.join(distDir, 'assets', 'css');
    if (!fs.existsSync(cssDir)) {
        fs.mkdirSync(cssDir, { recursive: true });
    }

    // Define CSS processing order
    const cssFiles = [
        'variables.css',      // CSS variables
        'animations.css',     // Animations
        'slider.css',         // Slider styles
        'welcome.css',        // Welcome section styles
        'reviews.css',        // Reviews section styles
        'services.css',       // Services section styles
        'special-offers.css', // Special offers section styles
        'features.css',       // Features section styles
        'testimonials.css',   // Testimonials section styles
        'pricing.css',        // Pricing section styles
        'coverage.css',       // Coverage section styles
        'contact.css',        // Contact section styles
        'footer.css',         // Footer styles
        'styles.css',         // Global styles
        'media.css',          // Media queries
        'main.css'           // Additional styles
    ];
    
    // Combine all CSS files into one
    let combinedContent = '';
    let missingFiles = [];
    
    // Process each CSS file
    cssFiles.forEach(file => {
        const filePath = path.join(srcDir, 'assets', 'css', file);
        try {
            if (fs.existsSync(filePath)) {
                // Get file stats
                const stats = fs.statSync(filePath);
                console.log(`Processing ${file}: ${stats.size} bytes`);
                
                // Try different encodings if needed
                let content;
                try {
                    content = fs.readFileSync(filePath, 'utf8');
                } catch (readError) {
                    console.warn(`Failed to read ${file} as UTF-8, trying with buffer...`);
                    const buffer = fs.readFileSync(filePath);
                    content = buffer.toString('utf8');
                }
                
                // Skip empty files
                if (content && content.trim().length > 0) {
                    combinedContent += `\n/* From ${file} */\n${content}\n`;
                    console.log(`Successfully processed ${file}`);
                } else {
                    console.warn(`Warning: ${file} appears empty after reading (${content ? content.length : 0} characters)`);
                }
            } else {
                missingFiles.push(file);
                console.warn(`Warning: ${file} not found at path: ${filePath}`);
            }
        } catch (error) {
            console.error(`Error processing ${file}:`, error.message);
            missingFiles.push(file);
        }
    });
    
    if (missingFiles.length > 0) {
        console.warn(`Warning: Missing CSS files: ${missingFiles.join(', ')}`);
    }

    // Ensure we have content before minifying
    if (!combinedContent || combinedContent.trim().length === 0) {
        throw new Error('No CSS content to process. All CSS files are either missing or empty.');
    }
    
    try {
        // Minify CSS with better error handling
        const minified = await new CleanCSS({
            sourceMap: true,
            sourceMapInlineSources: true,
            level: 2,
            compatibility: 'ie11',  // Add IE11 compatibility
            rebase: true,           // Enable URL rebasing
            rebaseTo: path.join(srcDir, 'assets', 'css'), // Set rebase target to source directory
            processImport: false,   // Disable @import processing since we're handling it manually
            returnPromise: true     // Return a promise for better error handling
        }).minify(combinedContent);
        
        if (minified.errors && minified.errors.length > 0) {
            console.warn('CSS minification warnings:', minified.errors);
        }

        // Generate hash for the combined file
        const hash = generateHash(minified.styles || combinedContent);
        const newFileName = `styles.${hash}.css`;
        const newFilePath = path.join(cssDir, newFileName);
        
        // Write the minified CSS file
        fs.writeFileSync(newFilePath, minified.styles || combinedContent);
        
        // Write the source map if it exists
        if (minified.sourceMap) {
            const sourceMapFileName = `${newFileName}.map`;
            fs.writeFileSync(path.join(cssDir, sourceMapFileName), JSON.stringify(minified.sourceMap));
        }

        return {
            cssFile: newFileName,
            criticalCSS: null // We'll handle critical CSS separately
        };
    } catch (error) {
        console.error('CSS minification failed:', error);
        // Fallback to unminified CSS
        const hash = generateHash(combinedContent);
        const newFileName = `styles.${hash}.css`;
        const newFilePath = path.join(cssDir, newFileName);
        fs.writeFileSync(newFilePath, combinedContent);
        return { cssFile: newFileName };
    }
}

// Function to process {{INCLUDE partialPath}} directives
function processIncludes(htmlContent, currentFileDir) {
    console.log('Processing includes...');
    const includeRegex = /\{\{INCLUDE\s+(.*?)\s*\}\}/g;
    let match;
    let processedContent = htmlContent;

    let newHtmlContent = htmlContent;
    while ((match = includeRegex.exec(htmlContent)) !== null) {
        const partialPath = match[1].trim();
        const fullPartialPath = path.resolve(srcDir, partialPath);
        console.log('Processing include:', partialPath);

        if (fs.existsSync(fullPartialPath)) {
            try {
                const partialFileContent = fs.readFileSync(fullPartialPath, 'utf8');
                console.log('Successfully read partial:', partialPath);
                const processedPartialContent = processIncludes(partialFileContent, path.dirname(fullPartialPath));
                newHtmlContent = newHtmlContent.replace(match[0], processedPartialContent);
            } catch (error) {
                console.error(`Error reading or processing partial ${fullPartialPath}:`, error);
                newHtmlContent = newHtmlContent.replace(match[0], `<!-- Error including ${partialPath}: ${error.message} -->`);
            }
        } else {
            console.error(`Partial file not found: ${fullPartialPath}`);
            newHtmlContent = newHtmlContent.replace(match[0], `<!-- Missing partial: ${partialPath} -->`);
        }
    }
    return newHtmlContent;
}

// Function to process {{SITE_DATA.*}} template variables
function processSiteDataTemplates(htmlContent, siteData) {
    const templateRegex = /\{\{SITE_DATA\.(.*?)\}\}/g;
    return htmlContent.replace(templateRegex, (match, path) => {
        const keys = path.split('.');
        let value = siteData;
        for (const key of keys) {
            if (value && typeof value === 'object' && key in value) {
                value = value[key];
            } else {
                console.warn(`Template variable not found: ${match}`);
                return match;
            }
        }
        return Array.isArray(value) ? value.join(', ') : value;
    });
}

// Main build process
async function build() {
    try {
        // Set NODE_ENV if not set
        process.env.NODE_ENV = process.env.NODE_ENV || 'development';
        console.log('Starting build process in', process.env.NODE_ENV, 'mode');

        // Validate environment variables
        validateEnvVars();

        // Verify site content data
        console.log('Verifying site content data...');
        if (!siteContentData) {
            throw new Error('Site content data is missing or invalid');
        }
        console.log('Site content data verified successfully');

        // Backup current dist directory
        backupDist();

        // Create new dist directory
        fs.mkdirSync(distDir, { recursive: true });

        // Copy JS files
        const jsSrcDir = path.join(srcDir, 'js');
        const jsDestDir = path.join(distDir, 'js');
        console.log('Copying JS files from', jsSrcDir, 'to', jsDestDir);
        copyRecursive(jsSrcDir, jsDestDir);

        // Copy assets
        const assetsSrcDir = path.join(srcDir, 'assets');
        const assetsDestDir = path.join(distDir, 'assets');
        console.log('Copying assets from', assetsSrcDir, 'to', assetsDestDir);
        copyRecursive(assetsSrcDir, assetsDestDir);

        // Process CSS files
        console.log('Processing CSS files...');
        const cssResult = await processCSS();
        console.log('CSS processing completed');

        // Process HTML files
        const htmlFiles = fs.readdirSync(srcDir).filter(file => file.endsWith('.html'));
        console.log('Found HTML files:', htmlFiles);

        if (htmlFiles.length === 0) {
            throw new Error('No HTML files found in src directory');
        }

        htmlFiles.forEach(htmlFile => {
            console.log(`Processing ${htmlFile}...`);
            const htmlPath = path.join(srcDir, htmlFile);
            let htmlContent = fs.readFileSync(htmlPath, 'utf8');

            // Process includes first
            console.log(`Processing includes for ${htmlFile}...`);
            htmlContent = processIncludes(htmlContent, srcDir);

            // Process SITE_DATA template variables
            console.log(`Processing template variables for ${htmlFile}...`);
            htmlContent = processSiteDataTemplates(htmlContent, siteContentData);

            // Inject SITE_DATA script
            const siteDataScript = `<script>
                window.SITE_DATA = ${JSON.stringify(siteContentData)};
            </script>`;
            htmlContent = htmlContent.replace('</head>', `${siteDataScript}</head>`);

            // Update CSS references
            const cssLinks = [
                `<link rel="stylesheet" href="assets/css/${cssResult.cssFile}">`,
                cssResult.criticalCSS ? `<link rel="stylesheet" href="assets/css/${cssResult.criticalCSS}" media="print" onload="this.media='all'">` : ''
            ].filter(Boolean).join('\n    ');

            // Remove all existing CSS links
            htmlContent = htmlContent.replace(/<link\s+rel="stylesheet"\s+href="assets\/css\/.*?\.css">\n?/g, '');
            
            // Add the new CSS links
            htmlContent = htmlContent.replace('</head>', `    ${cssLinks}\n</head>`);
            
            // Replace environment variables with defaults for optional ones
            const processedContent = htmlContent
                .replace('{{GOOGLE_ANALYTICS_ID}}', process.env.GOOGLE_ANALYTICS_ID || '')
                .replace('{{GOOGLE_SITE_VERIFICATION}}', process.env.GOOGLE_SITE_VERIFICATION || '')
                .replace('{{FORMSPREE_ENDPOINT}}', process.env.FORMSPREE_ENDPOINT || '')
                .replace('{{FORMSPREE_FORM_ID}}', process.env.FORMSPREE_FORM_ID || '');
            
            // Write processed HTML to dist
            const destPath = path.join(distDir, htmlFile);
            fs.writeFileSync(destPath, processedContent);
            console.log(`Successfully processed ${htmlFile} -> ${destPath}`);
        });

        console.log(`Build completed successfully in ${process.env.NODE_ENV} mode!`);
    } catch (error) {
        console.error('Build failed:', error);
        // Restore from backup if build fails
        const backupDir = path.join(__dirname, '..', 'dist_backup');
        if (fs.existsSync(backupDir)) {
            if (fs.existsSync(distDir)) {
                fs.rmSync(distDir, { recursive: true, force: true });
            }
            fs.renameSync(backupDir, distDir);
            console.log('Restored previous build from backup');
        }
        process.exit(1);
    }
}

build(); 