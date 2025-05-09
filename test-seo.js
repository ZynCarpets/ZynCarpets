// Test website SEO and identify potential issues
function testSEO() {
    const results = {
        passed: [],
        failed: [],
        warnings: []
    };

    // Test meta tags
    const metaTags = {
        'description': document.querySelector('meta[name="description"]'),
        'keywords': document.querySelector('meta[name="keywords"]'),
        'viewport': document.querySelector('meta[name="viewport"]'),
        'robots': document.querySelector('meta[name="robots"]'),
        'canonical': document.querySelector('link[rel="canonical"]'),
        'og:title': document.querySelector('meta[property="og:title"]'),
        'og:description': document.querySelector('meta[property="og:description"]'),
        'og:image': document.querySelector('meta[property="og:image"]'),
        'twitter:card': document.querySelector('meta[name="twitter:card"]'),
        'twitter:title': document.querySelector('meta[name="twitter:title"]'),
        'twitter:description': document.querySelector('meta[name="twitter:description"]'),
        'twitter:image': document.querySelector('meta[name="twitter:image"]')
    };

    // Check meta description
    if (metaTags.description) {
        const descLength = metaTags.description.content.length;
        if (descLength < 120) {
            results.warnings.push('Meta description is too short (should be 120-160 characters)');
        } else if (descLength > 160) {
            results.warnings.push('Meta description is too long (should be 120-160 characters)');
        } else {
            results.passed.push('Meta description length is optimal');
        }
    } else {
        results.failed.push('Meta description is missing');
    }

    // Check title tag
    const title = document.querySelector('title');
    if (title) {
        const titleLength = title.textContent.length;
        if (titleLength < 30) {
            results.warnings.push('Title is too short (should be 30-60 characters)');
        } else if (titleLength > 60) {
            results.warnings.push('Title is too long (should be 30-60 characters)');
        } else {
            results.passed.push('Title length is optimal');
        }
    } else {
        results.failed.push('Title tag is missing');
    }

    // Check heading structure
    const h1Tags = document.querySelectorAll('h1');
    if (h1Tags.length === 0) {
        results.failed.push('No H1 tag found');
    } else if (h1Tags.length > 1) {
        results.warnings.push('Multiple H1 tags found (should have only one)');
    } else {
        results.passed.push('H1 tag structure is correct');
    }

    // Check image alt text
    const images = document.querySelectorAll('img');
    let imagesWithAlt = 0;
    images.forEach(img => {
        if (img.alt) imagesWithAlt++;
    });
    if (imagesWithAlt === 0) {
        results.failed.push('No images have alt text');
    } else if (imagesWithAlt < images.length) {
        results.warnings.push(`${images.length - imagesWithAlt} images are missing alt text`);
    } else {
        results.passed.push('All images have alt text');
    }

    // Check internal links
    const internalLinks = Array.from(document.querySelectorAll('a[href]'))
        .filter(link => link.href.startsWith(window.location.origin));
    
    if (internalLinks.length === 0) {
        results.warnings.push('No internal links found');
    } else {
        results.passed.push(`${internalLinks.length} internal links found`);
    }

    // Check for broken links
    const externalLinks = Array.from(document.querySelectorAll('a[href]'))
        .filter(link => !link.href.startsWith(window.location.origin));
    
    if (externalLinks.length > 0) {
        results.warnings.push(`${externalLinks.length} external links found - check for broken links`);
    }

    // Check for schema markup
    const schemaScripts = document.querySelectorAll('script[type="application/ld+json"]');
    if (schemaScripts.length === 0) {
        results.warnings.push('No schema markup found');
    } else {
        results.passed.push('Schema markup is present');
    }

    // Check for mobile responsiveness
    if (metaTags.viewport) {
        results.passed.push('Viewport meta tag is present');
    } else {
        results.failed.push('Viewport meta tag is missing');
    }

    // Check for social media meta tags
    const socialTags = ['og:title', 'og:description', 'og:image', 'twitter:card', 'twitter:title', 'twitter:description', 'twitter:image'];
    socialTags.forEach(tag => {
        if (!metaTags[tag]) {
            results.warnings.push(`${tag} meta tag is missing`);
        } else {
            results.passed.push(`${tag} meta tag is present`);
        }
    });

    // Check for canonical URL
    if (metaTags.canonical) {
        results.passed.push('Canonical URL is specified');
    } else {
        results.warnings.push('Canonical URL is missing');
    }

    // Check for robots meta tag
    if (metaTags.robots) {
        results.passed.push('Robots meta tag is present');
    } else {
        results.warnings.push('Robots meta tag is missing');
    }

    // Log results
    console.log('=== SEO Test Results ===');
    console.log('\nPassed:');
    results.passed.forEach(result => console.log('✅ ' + result));
    console.log('\nFailed:');
    results.failed.forEach(result => console.log('❌ ' + result));
    console.log('\nWarnings:');
    results.warnings.forEach(warning => console.log('⚠️ ' + warning));

    // Additional SEO recommendations
    console.log('\n=== Additional SEO Recommendations ===');
    console.log('1. Create and submit a sitemap.xml file');
    console.log('2. Set up Google Search Console and Bing Webmaster Tools');
    console.log('3. Optimize page load speed');
    console.log('4. Ensure mobile-friendliness');
    console.log('5. Create quality, unique content');
    console.log('6. Use descriptive URLs');
    console.log('7. Implement breadcrumbs navigation');
    console.log('8. Set up proper 301 redirects');
    console.log('9. Optimize for local SEO if applicable');
    console.log('10. Monitor and improve Core Web Vitals');

    return results;
}

// Run the test when the page is fully loaded
window.addEventListener('load', testSEO); 