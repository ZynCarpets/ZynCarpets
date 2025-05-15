/**
 * Main initialization function that sets up the entire website
 * Loads configuration and initializes all components
 */
function initializePage() {
    console.log('VERY_SPECIFIC_TEST_LOG_INITIALIZE_PAGE'); // Test log
    console.log('Starting page initialization...');
    
    initializeDomContent(); // Call the new DOM setup function

    // Prevent scroll to hash on page load
    if (window.location.hash) {
        window.scrollTo(0, 0);
        // Remove the hash without triggering a page reload
        history.replaceState(null, null, window.location.pathname);
    }

    // Initialize all components
    console.log('Initializing all page components...');
    try {
        console.log('Initializing mobile menu...');
        if (typeof initializeMobileMenu === 'function') {
            initializeMobileMenu();
            console.log('Mobile menu initialization complete');
        } else {
            console.error('Mobile menu initialization function not found');
        }
        
        initializeSocialLinks();
        initializePricing();
        initializeTestimonials();
        initializeBlogPosts();
        initializeSpecialOffers();
        initializeContactForm();
        initializeContactZipValidation();
        initializeScrollAnimations();
        initializeLazyLoading();
        initializePhoneFormatting();
        console.log('Page initialization complete!');
    } catch (error) {
        console.error('Error during component initialization:', error);
    }
}

// Initialize everything when the page loads
function initializeApp() {
    console.log('=== Starting Application Initialization ===');
    
    // Prevent multiple initializations
    if (window.pageInitialized) {
        console.log('Application already initialized, skipping...');
        return;
    }
    window.pageInitialized = true;
    console.log('Initialization flag set');

    // Get the contact form element and assign it to window.contactForm
    // This makes it available globally for other initializers.
    window.contactForm = document.getElementById('contact-form');

    try {
        console.log('Starting page initialization...');
        initializePage(); // This will call initializeContactForm and initializeContactZipValidation
        console.log('Page initialization complete');

        console.log('Setting up lazy loading for images...');
        const images = document.querySelectorAll('img');
        console.log(`Found ${images.length} images to process`);
        images.forEach((img, index) => {
            img.loading = 'lazy';
            console.log(`Set lazy loading for image ${index + 1}`);
        });

        console.log('Setting up configuration values...');
        
        if (window.contactForm) {
            console.log('Setting up contact form configuration. Form element found.');
            // The formId was part of CONFIG.formspree but typically Formspree uses the endpoint path.
            // If 'data-formspree-id' was actually used, it might need to be handled differently or was specific to a library.
            // contactForm.setAttribute('data-formspree-id', 'YOUR_FORMSPREE_ID'); // Assuming this might not be needed if standard Formspree is used
        } else {
            console.warn('Contact form element with ID \'contact-form\' NOT FOUND. Relevant features might not work.');
        }

        console.log('=== Application Initialization Complete ===');
    } catch (error) {
        console.error('Error during initialization:', error);
        console.error('Error stack:', error.stack);
    }
}

// Start initialization when DOM is ready
document.addEventListener('DOMContentLoaded', initializeApp);