// src/js/site-content.js
const SITE_DATA = {
    companyInfo: {
        tagline: "Your trusted partner in carpet care", // Used in hero
        welcomeTagline: "Your trusted partner in carpet care", // Used in logo showcase
        description: "Experience exceptional carpet cleaning services with our expert team.", // Used in hero
        footerCompanyName: "Zyn Carpets",
        footerDescription: "Experience exceptional carpet cleaning services with our expert team.",
        footerPhone: "Coming Soon", // Example, update as needed
        footerEmail: "zyncarpetcare@gmail.com", // Example, update as needed
        coverageAreas: ["Madison", "Huntsville", "Athens"],
        coverageStates: ["Alabama"]
    },
    sliderImages: [
        { url: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80', alt: 'Professional carpet cleaning service' },
        { url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80', alt: 'Clean, modern carpet' },
        { url: 'https://images.unsplash.com/photo-1583845112239-97ef1341b271?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80', alt: 'Carpet cleaning equipment' },
    ],
    services: [
        { icon: 'fas fa-broom', title: 'Deep Cleaning', description: 'Restore your carpets to their original beauty with our thorough deep cleaning service, removing embedded dirt and allergens.' },
        { icon: 'fas fa-spray-can', title: 'Stain Removal', description: 'Trust our specialized techniques to effectively treat and remove even the most stubborn stains from your carpets.' },
        { icon: 'fas fa-shield-alt', title: 'Sanitization', description: 'Ensure a healthy environment with our professional sanitization services using eco-friendly products.' }
    ],
    features: [ // For "Why Choose Zyn?" section
        { icon: 'fas fa-star', title: 'Expert Team', description: 'Our certified professionals bring years of experience and attention to detail to every project.' },
        { icon: 'fas fa-clock', title: 'Reliable Service', description: 'We value your time and deliver prompt, dependable service when you need it.' },
        { icon: 'fas fa-leaf', title: 'Eco-Friendly', description: 'We use environmentally conscious cleaning solutions that are safe for your family and pets.' }
    ],
    socialMediaLinks: { // Example, update hrefs as needed
        facebook: "#",
        instagram: "#",
        twitter: "#"
    },
    pricingTiers: [
        { name: 'Basic Clean', pricePerSqFt: 0.35, features: ['Deep Vacuuming', 'Pre-treatment', 'Hot Water Extraction'], popular: false },
        { name: 'Premium Clean', pricePerSqFt: 0.50, features: ['Everything in Basic', 'Stain Protection', 'Deodorizing'], popular: true },
        { name: 'Ultimate Zen Clean', pricePerSqFt: 0.70, features: ['Everything in Premium', 'Pet Odor Treatment', 'Sanitization'], popular: false }
    ],
    testimonials: [
        { quote: "Zyn Carpets transformed my old, stained carpets! They look brand new. Highly recommend their professional and friendly service.", author: "Alex P.", location: "Madison, AL", rating: 5 },
        { quote: "The team was punctual, efficient, and did an amazing job. My allergies have improved significantly since they cleaned my carpets.", author: "Sarah K.", location: "Huntsville, AL", rating: 5 },
        { quote: "I was impressed by their eco-friendly approach and the results were fantastic. Will definitely use them again!", author: "Michael B.", location: "Athens, AL", rating: 5 }
    ],
    specialOffers: [
        { title: '3 Rooms Special', price: 109, details: 'Based on 450 square feet. Additional charges apply for heavier soiled & pet treatment.', type: 'price' },
        { title: 'Pet Odor Removal', discount: 25, details: 'Minimum charges apply. Not valid with other offers.', type: 'discount' },
        { title: 'Area Rug Cleaning', discount: 25, details: 'Minimum charges apply. Not valid with other offers.', type: 'discount' }
    ]
};

if (typeof window !== 'undefined') {
    window.SITE_DATA = SITE_DATA; // For browser environment
} else if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = SITE_DATA; // For Node.js environment (build script) 
} 