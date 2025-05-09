// Configuration object
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
        areas: ['Madison', 'Huntsville', 'Athens'],
        states: ['Alabama']
    },

    // Slider Images
    sliderImages: [
        {
            url: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
            alt: 'Professional carpet cleaning service'
        },
        {
            url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
            alt: 'Clean, modern carpet'
        },
        {
            url: 'https://images.unsplash.com/photo-1583845112239-97ef1341b271?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
            alt: 'Carpet cleaning equipment'
        },
        {
            url: 'https://images.unsplash.com/photo-1583845112265-7dc320c5f677?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
            alt: 'Fresh, clean carpet'
        }
    ],

    // Company Information
    company: {
        name: 'Zyn Carpets',
        tagline: 'Your trusted partner in carpet care',
        description: 'Experience exceptional carpet cleaning services with our expert team.',
        phone: 'Coming Soon',
        email: 'zyncarpetcare@gmail.com',
        address: 'Coming Soon'
    },

    // Social Media Links
    socialMedia: {
        facebook: 'https://facebook.com/zyncarpets',
        instagram: 'https://instagram.com/zyncarpets',
        twitter: 'https://twitter.com/zyncarpets'
    },

    // Services
    services: [
        {
            icon: 'fas fa-broom',
            title: 'Deep Cleaning',
            description: 'Restore your carpets to their original beauty with our thorough deep cleaning service, removing embedded dirt and allergens'
        },
        {
            icon: 'fas fa-spray-can',
            title: 'Stain Removal',
            description: 'Trust our specialized techniques to effectively treat and remove even the most stubborn stains from your carpets'
        },
        {
            icon: 'fas fa-shield-alt',
            title: 'Sanitization',
            description: 'Ensure a healthy environment with our professional sanitization services using eco-friendly products'
        }
    ],

    // Features
    features: [
        {
            icon: 'fas fa-star',
            title: 'Expert Team',
            description: 'Our certified professionals bring years of experience and attention to detail to every project'
        },
        {
            icon: 'fas fa-clock',
            title: 'Reliable Service',
            description: 'We value your time and deliver prompt, dependable service when you need it'
        },
        {
            icon: 'fas fa-leaf',
            title: 'Eco-Friendly',
            description: 'We use environmentally conscious cleaning solutions that are safe for your family and pets'
        }
    ],

    // Service Areas
    serviceAreas: {
        // Madison, AL zip codes
        '35756': true, // Madison
        '35757': true, // Madison
        '35758': true, // Madison
        
        // Huntsville, AL zip codes
        '35801': true, // Huntsville
        '35802': true, // Huntsville
        '35803': true, // Huntsville
        '35804': true, // Huntsville
        '35805': true, // Huntsville
        '35806': true, // Huntsville
        '35807': true, // Huntsville
        '35808': true, // Huntsville
        '35809': true, // Huntsville
        '35810': true, // Huntsville
        '35811': true, // Huntsville
        '35812': true, // Huntsville
        '35813': true, // Huntsville
        '35814': true, // Huntsville
        '35815': true, // Huntsville
        '35816': true, // Huntsville
        '35824': true, // Huntsville
        
        // Athens, AL zip codes
        '35611': true, // Athens
        '35613': true, // Athens
        '35614': true  // Athens
    },

    // Slider Settings
    slider: {
        interval: 6000, // Time between slides in milliseconds
        transition: 2000 // Transition duration in milliseconds
    },

    // Pricing Plans
    pricing: [
        {
            title: 'General Package',
            price: 0.55,
            subtitle: 'Perfect for regular maintenance',
            features: [
                'Basic carpet cleaning',
                'Stain treatment',
                'Deodorizing',
                'Per square foot pricing',
                'Minimum 200 sq ft'
            ],
            featured: false,
            unit: 'per sq ft'
        },
        {
            title: 'Deep Clean Package',
            price: 0.75,
            subtitle: 'Our most popular choice',
            features: [
                'Everything in General Package',
                'Advanced stain removal',
                'Pet odor treatment',
                'Deep extraction cleaning',
                'Minimum 200 sq ft'
            ],
            featured: true,
            unit: 'per sq ft'
        },
        {
            title: 'Ultimate Package',
            price: 1.00,
            subtitle: 'Complete transformation',
            features: [
                'Everything in Deep Clean',
                'Premium carpet protection',
                'Priority scheduling',
                '30-day satisfaction guarantee',
                'Minimum 200 sq ft'
            ],
            featured: false,
            unit: 'per sq ft'
        }
    ],

    // Testimonials
    testimonials: [
        {
            rating: 5,
            content: "Zyn Carpets transformed our bedroom! Paul was professional, thorough, and left our carpets looking brand new. Don't waste your time with other companies, Zyn Carpets is the way to go!",
            author: "Jacob R."
        }
    ],

    // Blog Posts
    blogPosts: [
        {
            title: "How often should you clean your carpets?",
            date: "March 15, 2024",
            image: "assets/images/blog/carpet-cleaning-frequency.jpg",
            excerpt: "Discover why regular professional carpet cleaning is essential for maintaining a healthy home environment and extending your carpet's lifespan.",
            link: "https://www.youtube.com/watch?v=5j4lQAB0jv0"
        }
    ],

    // Special Offers
    specialOffers: [
        {
            title: '3 Rooms Special',
            price: 109,
            details: 'Based on 450 square feet. Additional charges apply for heavier soiled & pet treatment.',
            type: 'price'
        },
        {
            title: 'Pet Odor Removal',
            discount: 25,
            details: 'Minimum charges apply. Not valid with other offers.',
            type: 'discount'
        },
        {
            title: 'Area Rug Cleaning',
            discount: 25,
            details: 'Minimum charges apply. Not valid with other offers.',
            type: 'discount'
        }
    ],

    // Configuration object that will be populated during deployment
    GOOGLE_ANALYTICS_ID: 'process.env.GOOGLE_ANALYTICS_ID',
    GOOGLE_SITE_VERIFICATION: 'process.env.GOOGLE_SITE_VERIFICATION',
    FORMSPREE_FORM_ID: 'process.env.FORMSPREE_FORM_ID'
};

// Make CONFIG globally available
window.CONFIG = CONFIG; 