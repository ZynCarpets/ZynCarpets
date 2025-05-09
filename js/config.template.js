// Template configuration object
const CONFIG = {
    // Company Information
    company: {
        name: 'Zyn Carpets',
        tagline: 'Your trusted partner in carpet care',
        description: 'Experience exceptional carpet cleaning services with our expert team.',
        phone: 'Coming Soon',
        email: 'contact@example.com',
        address: 'Coming Soon'
    },

    // Social Media Links
    socialMedia: {
        facebook: 'https://facebook.com/zyncarpets',
        instagram: 'https://instagram.com/zyncarpets',
        twitter: 'https://twitter.com/zyncarpets'
    },

    // Service Areas Information
    serviceAreasInfo: {
        title: 'Currently serving',
        areas: ['Madison', 'Huntsville', 'Athens'],
        states: ['Alabama']
    },

    // Google Analytics and Search Console
    GOOGLE_ANALYTICS_ID: 'YOUR_GA_ID',
    GOOGLE_SITE_VERIFICATION: 'YOUR_VERIFICATION_CODE',

    // Formspree Configuration
    formspree: {
        endpoint: 'YOUR_FORMSPREE_ENDPOINT',
        formId: 'YOUR_FORMSPREE_ID'
    }
};

// Make CONFIG globally available
window.CONFIG = CONFIG; 