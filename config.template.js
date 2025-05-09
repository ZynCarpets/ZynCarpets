const CONFIG = {
    // Available section types:
    // - hero: Main hero section with slider
    // - services: Services offered by the company
    // - special-offers: Current promotions and deals
    // - about: Company features and why choose us
    // - testimonials: Customer reviews and feedback
    // - pricing: Service packages and pricing
    // - coverage: Service area coverage checker
    // - blog: Latest blog posts and articles
    // - contact: Contact form and booking section
    sectionOrder: [
        'logo-showcase',
        'hero',
        'services',
        'special-offers',
        'about',
        'testimonials',
        'pricing',
        'coverage',
        'blog',
        'contact'
    ],

    // Section Types Enum (for reference)
    sectionTypes: {
        LOGO_SHOWCASE: 'logo-showcase',
        HERO: 'hero',
        SERVICES: 'services',
        SPECIAL_OFFERS: 'special-offers',
        ABOUT: 'about',
        TESTIMONIALS: 'testimonials',
        PRICING: 'pricing',
        COVERAGE: 'coverage',
        BLOG: 'blog',
        CONTACT: 'contact'
    },

    // Service Areas Information
    serviceAreasInfo: {
        title: 'Currently serving',
        areas: ['City1', 'City2', 'City3'],
        states: ['State']
    },

    // Company Information
    company: {
        name: 'Company Name',
        tagline: 'Your trusted partner',
        description: 'Company description goes here',
        phone: '(XXX) XXX-XXXX',
        email: 'contact@example.com',
        address: '123 Example St, City, State ZIP'
    },

    // Social Media Links
    socialMedia: {
        facebook: 'https://facebook.com/yourcompany',
        instagram: 'https://instagram.com/yourcompany',
        twitter: 'https://twitter.com/yourcompany'
    },

    // Rest of the configuration structure remains the same
    // but with placeholder data
    // ... existing code ...
}; 