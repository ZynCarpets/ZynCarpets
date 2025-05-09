// Load environment variables
require('dotenv').config();

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
        areas: (process.env.SERVICE_AREAS || 'Madison,Huntsville,Athens').split(','),
        states: (process.env.SERVICE_STATES || 'Alabama').split(',')
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
        name: process.env.COMPANY_NAME || 'Zyn Carpets',
        tagline: process.env.COMPANY_TAGLINE || 'Your trusted partner in carpet care',
        description: process.env.COMPANY_DESCRIPTION || 'Experience exceptional carpet cleaning services with our expert team.',
        phone: process.env.COMPANY_PHONE || '(555) 123-4567',
        email: process.env.COMPANY_EMAIL || 'zyncarpetcare@gmail.com',
        address: process.env.COMPANY_ADDRESS || '123 Zen Street, Peaceful City, PC 12345'
    },

    // Social Media Links
    socialMedia: {
        facebook: process.env.FACEBOOK_URL || 'https://facebook.com/zyncarpets',
        instagram: process.env.INSTAGRAM_URL || 'https://instagram.com/zyncarpets',
        twitter: process.env.TWITTER_URL || 'https://twitter.com/zyncarpets'
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
            content: "Zyn Carpets transformed our living room! The team was professional, thorough, and left our carpets looking brand new. The eco-friendly products they use are a huge plus.",
            author: "Sarah M."
        },
        {
            rating: 5,
            content: "I've tried many carpet cleaning services, but Zyn Carpets stands out. Their attention to detail and commitment to customer satisfaction is unmatched. Highly recommend!",
            author: "Michael R."
        },
        {
            rating: 5,
            content: "The pet odor removal service was a game-changer for our home. The team was understanding of our situation and delivered exceptional results. Thank you!",
            author: "Jennifer K."
        }
    ],

    // Blog Posts
    blogPosts: [
        {
            title: "The Importance of Professional Carpet Cleaning",
            date: "March 15, 2024",
            image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
            excerpt: "Discover why regular professional carpet cleaning is essential for maintaining a healthy home environment and extending your carpet's lifespan.",
            link: "#"
        },
        {
            title: "Eco-Friendly Carpet Cleaning Solutions",
            date: "March 10, 2024",
            image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
            excerpt: "Learn about our eco-friendly cleaning methods that effectively clean your carpets while protecting your family's health and the environment.",
            link: "#"
        },
        {
            title: "Expert Tips for Carpet Maintenance",
            date: "March 5, 2024",
            image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
            excerpt: "Professional advice on maintaining your carpets between cleanings to keep them looking fresh and beautiful.",
            link: "#"
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
    ]
}; 