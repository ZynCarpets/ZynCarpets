# Zyn Carpets Website Deployment TODO List

## High Priority Tasks
1. [x] Security Checklist
   - [x] Ensure .env file is in .gitignore
   - [x] Verify all sensitive data is in environment variables
     - [x] Google Analytics ID
     - [x] Google Site Verification
     - [x] Formspree Form ID
     - [x] Check for any remaining hardcoded values
   - [x] Check that no API keys are exposed in code
     - [x] No direct API keys found in code
     - [x] Review all third-party service integrations
   - [x] Verify GitHub repository secrets are properly set
     - [x] Secrets are configured in GitHub Actions
     - [x] Test secrets in production environment
   - [x] Test production deployment with environment variables
     - [x] Verify environment variable injection in production
     - [x] Test all functionality with production variables
   - [x] Implement security headers
     - [x] Added Content-Security-Policy meta tag
     - [x] Added X-Frame-Options meta tag
     - [x] Added X-Content-Type-Options meta tag
     - [x] Added Referrer-Policy meta tag
     - [x] Added X-XSS-Protection meta tag
   - [x] Form submission protection
     - [x] Using Formspree's built-in rate limiting
     - [x] Using Formspree's spam protection
     - [x] Using Formspree's security features

2. [x] Complete Environment Variables Setup
   - [x] Test local development with environment variables
   - [x] Verify all variables are working correctly
   - [x] Verify secrets are properly encrypted
   - [x] Test GitHub Actions workflow with test push
   - [x] Verify environment variables are properly injected

## Medium Priority Tasks
1. [x] Complete Google Search Console Setup
   - [x] Verify site ownership through environment variable

## Completed Tasks ✅
1. [x] Post-Deployment Checks
   - [x] Test all links on the website
   - [x] Verify contact form is working
   - [x] Check website on different devices and browsers
   - [x] Test website performance
   - [x] Verify all images are loading correctly
   - [x] Check that all JavaScript functionality works
   - [x] Test the zip code validation
   - [x] Verify mobile responsiveness

2. [x] Environment Variables Initial Setup
   - [x] Create .env file with all required variables
   - [x] Configure GitHub repository secrets
   - [x] Set up GitHub Actions workflow

3. [x] Optional Enhancements
   - [x] Set up Google Analytics
   - [x] Add a sitemap.xml
   - [x] Create a robots.txt file
   - [x] Add meta tags for social media sharing
   - [x] Implement a 404 error page

## New Tasks to Consider
1. [ ] Performance Optimization
   - [ ] Implement image optimization pipeline
   - [ ] Add service worker for offline support
   - [ ] Implement caching strategies
   - [ ] Optimize JavaScript bundle size

2. [ ] Analytics Enhancement
   - [ ] Set up custom event tracking
   - [ ] Implement conversion funnels
   - [ ] Add heat mapping
   - [ ] Set up goal tracking
   - [ ] Implement content versioning

3. [ ] Content Management
   - [ ] Create content update schedule
   - [ ] Set up blog post template

4. [ ] Security Enhancements
   - [ ] Implement rate limiting for API endpoints
   - [ ] Add CAPTCHA for form submissions
   - [ ] Set up security monitoring
   - [ ] Implement automated security scanning
   - [ ] Document deployment process
   - [ ] Create maintenance guide
   - [x] Add helpful navigation options

5. [ ] User Experience
   - [ ] Add loading states for form submissions
   - [ ] Implement better error handling
   - [ ] Add success animations
   - [ ] Improve mobile navigation

6. [ ] SEO Optimization
   - [ ] Implement structured data
   - [ ] Optimize meta descriptions
   - [ ] Create XML sitemap
   - [ ] Set up canonical URLs

7. [ ] Testing
   - [ ] Set up automated testing
   - [ ] Implement E2E tests
   - [ ] Add performance testing
   - [ ] Set up accessibility testing

8. [ ] Documentation
   - [ ] Create user documentation
   - [ ] Write technical documentation
   - [ ] Document deployment process
   - [ ] Create maintenance guide

## Post-Deployment Checks
1. [x] Test all links on the website
   - [x] Navigation links validation
   - [x] Resource links checking
   - [x] External links verification

2. [x] Verify contact form is working
   - [x] Form elements validation
   - [x] Required fields checking
   - [x] Form validation testing
   - [x] Formspree integration verification
   - [x] Form submission handling

3. [x] Check website on different devices and browsers
   - [x] Basic responsive testing implemented
   - [ ] Enhanced cross-browser testing needed

4. [x] Test website performance
   - [x] Image optimization checks
   - [x] Script loading optimization
   - [x] CSS optimization
   - [x] Resource hints verification
   - [ ] Integration with Google PageSpeed Insights API

5. [x] Verify all images are loading correctly
   - [x] Image loading tests
   - [x] Image optimization checks
   - [x] Alt text verification

6. [x] Check that all JavaScript functionality works
   - [x] Form validation
   - [x] Link functionality
   - [x] Performance monitoring
   - [x] Event handlers

7. [x] Test the zip code validation
   - [x] Format validation
   - [x] Coverage area checking
   - [x] Error handling

8. [x] Verify mobile responsiveness
   - [x] Viewport meta tag verification
   - [x] Responsive images testing
   - [x] Media queries testing
   - [x] Layout testing across devices
   - [x] Mobile menu functionality

## Environment Variables Setup
1. [x] Set up local environment variables
   - [x] Create .env file with all required variables
     - [x] Company Information (name, tagline, description, contact details)
     - [x] Social Media Links
     - [x] Service Areas
     - [x] Google Analytics ID
     - [x] Google Search Console verification
     - [x] Formspree Form ID
   - [ ] Test local development with environment variables
   - [ ] Verify all variables are working correctly

2. [x] Configure GitHub repository secrets
   - [x] Add GOOGLE_ANALYTICS_ID secret (G-2N6JWQ6RQ1)
   - [x] Add GOOGLE_SITE_VERIFICATION secret (i0o7NkRMms2nPz-bI4kE9CMW6Hf--QojqA8ExNg8tOo)
   - [x] Add FORMSPREE_FORM_ID secret (xzzrvpeb)
   - [ ] Verify secrets are properly encrypted

3. [x] Set up GitHub Actions workflow
   - [x] Create .github/workflows directory
   - [x] Create deploy.yml workflow file
   - [x] Configure environment variables injection
   - [x] Set up gh-pages deployment
   - [ ] Test workflow with test push
   - [ ] Verify environment variables are properly injected

## Optional Enhancements
1. [x] Set up Google Analytics
   - [x] Replace GA_MEASUREMENT_ID with actual ID (include 'G-' prefix)
   - [x] Add event tracking for important user interactions
      - [x] Form submissions
      - [x] Coverage area checks
      - [x] Navigation clicks
      - [x] CTA button clicks
      - [x] Scroll depth tracking

2. [x] Add a sitemap.xml
   - [x] Proper structure implemented
   - [x] All main sections included
   - [x] Appropriate priorities set

3. [x] Create a robots.txt file
   - [x] Proper configuration implemented
   - [x] Logs directory protected
   - [x] Sitemap reference added

4. [ ] Set up Google Search Console
   - [x] Create Google Search Console account
   - [x] Add verification meta tag or HTML file
   - [x] Submit sitemap.xml through console
   - [x] Remove hard-coded verification code from code base
   - [ ] Verify site ownership through environment variable

5. [x] Add meta tags for social media sharing
   - [x] Open Graph tags for Facebook
   - [x] Twitter Card tags
   - [x] Title, description, and image meta tags

6. [x] Implement a 404 error page
   - [x] Create custom 404.html page
   - [x] Implement proper error handling
   - [x] Add helpful navigation options

## Security Checklist
1. [ ] Verify all sensitive data is in environment variables
2. [ ] Check that no API keys are exposed in code
3. [x] Ensure .env file is in .gitignore
4. [x] Verify GitHub repository secrets are properly set
5. [ ] Test production deployment with environment variables
6. [ ] Review and update security headers
7. [ ] Implement rate limiting for form submissions

# Zyncarpets Website Issues TODO

## Critical Issues
1. [x] ~~Fix process.env reference error~~ (Resolved by streamlining config; was likely misattributed or related to local dev without build)
   - ~~Error: Uncaught ReferenceError: process is not defined~~
   - ~~Location: index:51:24~~

2. [ ] Fix Formspree integration (Verify on live site after deployment)
   - [x] ~~Error: Formspree form ID is not properly configured~~ (Resolved: Endpoint now built from secret and injected by build script)
   - [ ] Error: Form submission handler not called (Verify on live site)
   - [ ] Error: Failed to fetch due to Content Security Policy violation (Verify on live site; CSP in index.html seems correct)
   - ~~Location: script.js:600~~ (Line number likely outdated)

3. [x] ~~Fix Content Security Policy~~ (Resolved: CSP in index.html includes formspree.io/f/)
   - ~~Issue: CSP blocking Formspree connection~~
   - ~~Current directive: "connect-src 'self' https://www.google-analytics.com"~~ (Outdated)
   - ~~Need to add formspree.io to allowed domains~~ (Done)

4. [ ] Fix X-Frame-Options header (Hosting platform limitation for GitHub Pages; review if high security concern)
   - Issue: X-Frame-Options set in meta tag instead of HTTP header (Not found in meta tags; general advice for HTTP headers)
   - ~~Location: zyncarpets.com/:19~~

## Security Issues
1. [ ] Implement CSRF protection for contact form
2. [ ] Add input validation for form fields:
   - name
   - street
3. [ ] Configure secure cookie flags (Secure and HttpOnly)

## Accessibility Issues
1. [ ] Add proper labels to form controls:
   - zip-code
   - name
   - email
   - phone
   - street
   - zip
   - unnamed control

## Performance Optimizations
1. [ ] Add width and height attributes to images:
   - logo.png
   - Unsplash images
2. [ ] Resize large images:
   - Unsplash images (currently 1950px wide)
3. [ ] Add async/defer to scripts:
   - script.js
   - backup.js
   - test-*.js files
   - inline scripts
4. [ ] Add media queries to:
   - styles.css
   - animations.css
   - Font Awesome CSS
5. [ ] Implement resource optimization:
   - Add preload hints for critical resources
   - Add preconnect hints for external domains
   - Implement lazy loading for non-critical resources

## SEO Improvements
1. [ ] Fix meta description length
2. [ ] Add schema markup
3. [ ] Add Twitter card meta tags:
   - twitter:card
   - twitter:title
   - twitter:description
   - twitter:image
4. [ ] Add canonical URL
5. [ ] Add robots meta tag

## Analytics Implementation
1. [ ] Implement form tracking:
   - form_submission
   - coverage_check
   - scroll_depth
2. [ ] Add custom dimensions:
   - user_type
   - subscription_status
   - service_area
3. [ ] Implement e-commerce events:
   - view_item
   - add_to_cart
   - begin_checkout
   - purchase
4. [ ] Add enhanced measurements:
   - page_view
   - scroll
   - click
   - file_download
   - form_start
   - form_submit
   - video_start
   - video_progress
   - video_complete
5. [ ] Implement consent management
6. [ ] Configure cross-domain tracking

## External Link Verification
1. [ ] Verify external links:
   - Font Awesome CDN
   - Google Tag Manager
   - Other external resources

## Code Fixes
1. [x] ~~Fix validateFormData function~~ (No longer called; individual field validation functions like `validateName`, `validateEmail` are used instead)
   - ~~Error: ReferenceError: validateFormData is not defined~~
   - ~~Location: script.js:839~~ (Line number outdated)

## Dynamic Content Population (from js/script.js)
- [ ] Hero Section: Populate slides in `div#slider` (see `src/partials/hero.html`)
- [ ] Hero Section: Populate slider dots in `div#slider-dots` (see `src/partials/hero.html`)
- [ ] Services Section: Populate service cards in `div#services-grid` (see `src/partials/services.html`)
- [ ] Special Offers Section: Populate offers in `div.offers-container` (see `src/partials/special_offers.html`)
- [ ] About Section: Populate feature cards in `div#features-grid` (see `src/partials/about.html`)
- [ ] Testimonials Section: Populate testimonial cards in `div#testimonials-grid` (see `src/partials/testimonials.html`)
- [ ] Pricing Section: Populate pricing cards in `div#pricing-grid` (see `src/partials/pricing.html`)
- [ ] Blog Section: Populate blog post summaries in `div#blog-grid` (see `src/partials/blog.html`) 