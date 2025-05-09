# Zyn Carpets Website Deployment TODO List


## Post-Deployment Checks
1. [ ] Test all links on the website
2. [ ] Verify contact form is working
3. [ ] Check website on different devices and browsers
4. [ ] Test website performance using Google PageSpeed Insights
5. [ ] Verify all images are loading correctly
6. [ ] Check that all JavaScript functionality works
7. [ ] Test the zip code validation
8. [ ] Verify mobile responsiveness

## Environment Variables Setup
1. [ ] Set up local environment variables
   - [ ] Create .env file with all required variables
   - [ ] Test local development with environment variables
   - [ ] Verify all variables are working correctly

2. [ ] Configure GitHub repository secrets
   - [ ] Add GOOGLE_ANALYTICS_ID secret (include 'G-' prefix, e.g., G-XXXXXXXXXX)
   - [ ] Add GOOGLE_SITE_VERIFICATION secret
   - [ ] Add FORMSPREE_FORM_ID secret
   - [ ] Verify secrets are properly encrypted

3. [ ] Set up GitHub Actions workflow
   - [ ] Create .github/workflows directory
   - [ ] Create deploy.yml workflow file
   - [ ] Test workflow with test push
   - [ ] Verify environment variables are properly injected
   - [ ] Check gh-pages deployment

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
   - [ ] Submit sitemap.xml through console
   - [ ] Remove hard-coded verification code from code base
   - [ ] Verify site ownership through environment variable

5. [x] Add meta tags for social media sharing
   - [x] Open Graph tags for Facebook
   - [x] Twitter Card tags
   - [x] Title, description, and image meta tags

6. [ ] Implement a 404 error page
   - [ ] Create custom 404.html page
   - [ ] Implement proper error handling
   - [ ] Add helpful navigation options

7. [ ] Set up automated backups of form submissions
   - [ ] Implement backup system (database or file-based)
   - [ ] Set up automated backup schedule

## Security Checklist
1. [ ] Verify all sensitive data is in environment variables
2. [ ] Check that no API keys are exposed in code
3. [ ] Ensure .env file is in .gitignore
4. [ ] Verify GitHub repository secrets are properly set
5. [ ] Test production deployment with environment variables
6. [ ] Review and update security headers
7. [ ] Implement rate limiting for form submissions 