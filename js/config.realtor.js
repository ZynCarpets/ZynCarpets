// Realtor website configuration object
const CONFIG = {
    sectionOrder: [
        'logo-showcase',
        'hero',
        'services',
        'featured-listings',
        'about',
        'testimonials',
        'areas-served',
        'blog',
        'contact'
    ],

    // Section Types Enum (for reference)
    sectionTypes: {
        LOGO_SHOWCASE: 'logo-showcase',
        HERO: 'hero',
        SERVICES: 'services',
        FEATURED_LISTINGS: 'featured-listings',
        ABOUT: 'about',
        TESTIMONIALS: 'testimonials',
        AREAS_SERVED: 'areas-served',
        BLOG: 'blog',
        CONTACT: 'contact'
    },

    // Company Information
    company: {
        name: 'Your Realty Group',
        tagline: 'Your Trusted Real Estate Partner',
        description: 'Experience exceptional real estate services with our expert team of licensed professionals.',
        phone: 'Coming Soon',
        email: 'contact@yourrealtygroup.com',
        address: 'Coming Soon'
    },

    // Social Media Links
    socialMedia: {
        facebook: 'https://facebook.com/yourrealtygroup',
        instagram: 'https://instagram.com/yourrealtygroup',
        linkedin: 'https://linkedin.com/company/yourrealtygroup'
    },

    // Service Areas Information
    serviceAreasInfo: {
        title: 'Serving',
        areas: ['Downtown', 'Suburbs', 'Metro Area'],
        states: ['Your State']
    },

    // Services
    services: [
        {
            icon: 'fas fa-home',
            title: 'Buying Homes',
            description: 'Find your dream home with our expert guidance through every step of the buying process'
        },
        {
            icon: 'fas fa-key',
            title: 'Selling Homes',
            description: 'Maximize your property value with our strategic marketing and negotiation expertise'
        },
        {
            icon: 'fas fa-chart-line',
            title: 'Investment Properties',
            description: 'Build your real estate portfolio with our investment property expertise and market analysis'
        }
    ],

    // Features
    features: [
        {
            icon: 'fas fa-star',
            title: 'Expert Team',
            description: 'Our licensed professionals bring years of experience and market knowledge to every transaction'
        },
        {
            icon: 'fas fa-handshake',
            title: 'Personalized Service',
            description: 'We provide tailored solutions to meet your unique real estate needs and goals'
        },
        {
            icon: 'fas fa-chart-bar',
            title: 'Market Analysis',
            description: 'Make informed decisions with our comprehensive market research and property valuations'
        }
    ],

    // Featured Listings
    featuredListings: [
        {
            title: 'Modern Downtown Condo',
            price: 450000,
            address: '123 Main St, Downtown',
            beds: 2,
            baths: 2,
            sqft: 1200,
            image: 'assets/images/listings/condo.jpg',
            status: 'For Sale',
            featured: true
        },
        {
            title: 'Family Suburban Home',
            price: 650000,
            address: '456 Oak Lane, Suburbs',
            beds: 4,
            baths: 3,
            sqft: 2800,
            image: 'assets/images/listings/house.jpg',
            status: 'For Sale',
            featured: true
        }
    ],

    // Slider Images
    sliderImages: [
        {
            url: 'assets/images/hero/hero1.jpg',
            alt: 'Luxury home exterior'
        },
        {
            url: 'assets/images/hero/hero2.jpg',
            alt: 'Modern kitchen interior'
        },
        {
            url: 'assets/images/hero/hero3.jpg',
            alt: 'Beautiful living room'
        }
    ],

    // Slider Settings
    slider: {
        interval: 6000,
        transition: 2000
    },

    // Testimonials
    testimonials: [
        {
            rating: 5,
            content: "Working with Your Realty Group was an absolute pleasure. They helped us find our dream home and made the entire process smooth and stress-free.",
            author: "Sarah M."
        },
        {
            rating: 5,
            content: "Professional, knowledgeable, and always available. They sold our home above asking price in just one week!",
            author: "John D."
        }
    ],

    // Blog Posts
    blogPosts: [
        {
            title: "First-Time Home Buyer's Guide",
            date: "March 15, 2024",
            image: "assets/images/blog/first-time-buyer.jpg",
            excerpt: "Everything you need to know about buying your first home, from saving for a down payment to closing the deal.",
            link: "#"
        },
        {
            title: "2024 Real Estate Market Trends",
            date: "March 10, 2024",
            image: "assets/images/blog/market-trends.jpg",
            excerpt: "Stay informed about the latest trends and predictions in the real estate market for 2024.",
            link: "#"
        }
    ],

    // Google Analytics and Search Console
    GOOGLE_ANALYTICS_ID: 'YOUR_GA_ID',
    GOOGLE_SITE_VERIFICATION: 'YOUR_VERIFICATION_CODE',

    // Contact Form
    contactForm: {
        formspreeEndpoint: 'YOUR_FORMSPREE_ENDPOINT',
        successMessage: 'Thank you for your message. We will get back to you soon!',
        errorMessage: 'There was an error sending your message. Please try again.'
    }
}; 