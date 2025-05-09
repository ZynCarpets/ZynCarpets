/**
 * Main initialization function that sets up the entire website
 * Loads configuration and initializes all components
 */
function initializePage() {
    // Check if configuration is loaded
    if (typeof CONFIG === 'undefined') {
        console.error('CONFIG is not loaded! Please check if config.js is properly included.');
        return;
    }

    console.log('Starting page initialization...');
    console.log('Configuration loaded:', CONFIG);
    console.log('Company information:', CONFIG.company);
    
    // Set company information in the DOM
    console.log('Setting company information in DOM elements...');
    document.getElementById('tagline').textContent = CONFIG.company.tagline;
    document.getElementById('welcome-tagline').textContent = CONFIG.company.tagline;
    document.getElementById('description').textContent = CONFIG.company.description;
    document.getElementById('footer-company-name').textContent = CONFIG.company.name;
    document.getElementById('footer-description').textContent = CONFIG.company.description;
    
    // Set contact information
    const footerPhone = document.getElementById('footer-phone');
    const footerEmail = document.getElementById('footer-email');
    
    console.log('Footer contact elements found:', { 
        phoneElement: footerPhone ? 'Found' : 'Not found',
        emailElement: footerEmail ? 'Found' : 'Not found'
    });
    
    if (footerPhone && footerEmail) {
        footerPhone.textContent = CONFIG.company.phone;
        footerEmail.textContent = CONFIG.company.email;
        console.log('Contact information set successfully:', { 
            phone: CONFIG.company.phone, 
            email: CONFIG.company.email 
        });
    } else {
        console.error('Footer contact elements not found! Check HTML structure.');
    }

    // Set coverage area information
    const coverageSubtitle = document.getElementById('coverage-subtitle');
    if (coverageSubtitle && CONFIG.serviceAreasInfo) {
        const areas = CONFIG.serviceAreasInfo.areas.join(', ');
        const states = CONFIG.serviceAreasInfo.states.join(', ');
        coverageSubtitle.textContent = `${CONFIG.serviceAreasInfo.title} ${areas}, ${states}`;
        console.log('Coverage area information set:', { areas, states });
    }

    // Reorder sections based on configuration
    console.log('Reordering page sections according to configuration...');
    const main = document.querySelector('main');
    const sections = Array.from(main.children);
    
    // Create a map of section IDs to their elements for easier access
    const sectionMap = {};
    sections.forEach(section => {
        const id = section.id || section.className;
        if (id) {
            sectionMap[id] = section;
            console.log(`Mapped section: ${id}`);
        }
    });

    // Clear main element and rebuild in configured order
    main.innerHTML = '';
    console.log('Rebuilding sections in configured order:', CONFIG.sectionOrder);

    // Add sections in the specified order
    CONFIG.sectionOrder.forEach(sectionId => {
        const section = sectionMap[sectionId];
        if (section) {
            main.appendChild(section);
            console.log(`Added section: ${sectionId}`);
        } else {
            console.warn(`Section not found: ${sectionId}`);
        }
    });

    // Initialize all components
    console.log('Initializing all page components...');
    initializeSlider();
    initializeServices();
    initializeFeatures();
    initializeSocialLinks();
    initializePricing();
    initializeMobileMenu();
    initializeTestimonials();
    initializeBlogPosts();
    initializeSpecialOffers();
    initializeContactZipValidation();
    initializeContactForm();
    initializeLazyLoading();
    console.log('Page initialization complete!');
}

/**
 * Initializes the image slider with touch support and navigation
 * Creates slides and navigation dots based on configuration
 */
function initializeSlider() {
    console.log('Initializing image slider...');
    const slider = document.getElementById('slider');
    const dotsContainer = document.getElementById('slider-dots');
    let touchStartX = 0;
    let touchEndX = 0;
    let currentSlide = 0;
    
    // Create slides from configuration
    console.log(`Creating ${CONFIG.sliderImages.length} slides...`);
    CONFIG.sliderImages.forEach((image, index) => {
        const slide = document.createElement('div');
        slide.className = `slide ${index === 0 ? 'active' : ''}`;
        
        // Create an img element for lazy loading
        const img = document.createElement('img');
        img.src = index === 0 ? image.url : ''; // Load first image immediately
        img.dataset.src = image.url; // Store URL in data attribute for lazy loading
        img.alt = image.alt;
        img.loading = 'lazy';
        img.className = 'slide-image';
        slide.appendChild(img);
        
        slider.appendChild(slide);
        console.log(`Created slide ${index + 1}: ${image.alt}`);
        
        // Create navigation dot
        const dot = document.createElement('span');
        dot.className = `dot ${index === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    // Add intersection observer for lazy loading
    const lazyLoadObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });

    // Observe all slides except the first one
    document.querySelectorAll('.slide:not(.active) img').forEach(img => {
        lazyLoadObserver.observe(img);
    });

    // Touch event handlers for mobile swipe support
    console.log('Setting up touch event handlers...');
    slider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        console.log('Touch start:', touchStartX);
    }, { passive: true });

    slider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        console.log('Touch end:', touchEndX);
        handleSwipe();
    }, { passive: true });

    /**
     * Handles swipe gestures for slide navigation
     * Calculates swipe direction and distance
     */
    function handleSwipe() {
        const swipeThreshold = 50; // minimum distance for swipe
        const swipeDistance = touchEndX - touchStartX;
        console.log('Swipe distance:', swipeDistance);

        if (Math.abs(swipeDistance) > swipeThreshold) {
            if (swipeDistance > 0) {
                console.log('Swipe right detected - going to previous slide');
                currentSlide = (currentSlide - 1 + CONFIG.sliderImages.length) % CONFIG.sliderImages.length;
            } else {
                console.log('Swipe left detected - going to next slide');
                currentSlide = (currentSlide + 1) % CONFIG.sliderImages.length;
            }
            goToSlide(currentSlide);
        } else {
            console.log('Swipe distance too small, ignoring');
        }
    }

    // Update currentSlide in goToSlide function
    const originalGoToSlide = goToSlide;
    goToSlide = function(n) {
        console.log(`Navigating to slide ${n}`);
        currentSlide = n;
        originalGoToSlide(n);
    };
}

// Initialize services
function initializeServices() {
    const servicesGrid = document.getElementById('services-grid');
    
    CONFIG.services.forEach(service => {
        const serviceCard = document.createElement('div');
        serviceCard.className = 'service-card';
        serviceCard.innerHTML = `
            <i class="${service.icon}"></i>
            <h3>${service.title}</h3>
            <p>${service.description}</p>
        `;
        servicesGrid.appendChild(serviceCard);
    });
}

// Initialize features
function initializeFeatures() {
    const featuresGrid = document.getElementById('features-grid');
    
    CONFIG.features.forEach(feature => {
        const featureCard = document.createElement('div');
        featureCard.className = 'feature';
        featureCard.innerHTML = `
            <i class="${feature.icon}"></i>
            <h3>${feature.title}</h3>
            <p>${feature.description}</p>
        `;
        featuresGrid.appendChild(featureCard);
    });
}

// Initialize social links
function initializeSocialLinks() {
    const socialLinks = document.getElementById('social-links');
    
    // Map of social media platforms to their Font Awesome classes
    const socialIcons = {
        facebook: 'fa-facebook-f',
        instagram: 'fa-instagram',
        twitter: 'fa-twitter'
    };
    
    Object.entries(CONFIG.socialMedia).forEach(([platform, url]) => {
        if (socialIcons[platform]) {
            const link = document.createElement('a');
            link.href = url;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            link.innerHTML = `<i class="fab ${socialIcons[platform]}"></i>`;
            socialLinks.appendChild(link);
        }
    });
}

// Initialize pricing cards
function initializePricing() {
    const pricingGrid = document.getElementById('pricing-grid');
    
    CONFIG.pricing.forEach(plan => {
        const pricingCard = document.createElement('div');
        pricingCard.className = `pricing-card${plan.featured ? ' featured' : ''}`;
        
        const featuresList = plan.features.map(feature => 
            `<li><i class="fas fa-check"></i> ${feature}</li>`
        ).join('');
        
        pricingCard.innerHTML = `
            <div class="pricing-header">
                <h3>${plan.title}</h3>
                <div class="price">$${plan.price}</div>
                <p class="price-subtitle">${plan.subtitle}</p>
            </div>
            <ul class="pricing-features">
                ${featuresList}
            </ul>
            <a href="#contact" class="pricing-cta">Get Started</a>
        `;
        
        pricingGrid.appendChild(pricingCard);
    });
}

// Initialize testimonials
function initializeTestimonials() {
    const testimonialsGrid = document.getElementById('testimonials-grid');
    
    CONFIG.testimonials.forEach(testimonial => {
        const testimonialCard = document.createElement('div');
        testimonialCard.className = 'testimonial-card';
        
        // Create star rating
        const stars = '★'.repeat(testimonial.rating) + '☆'.repeat(5 - testimonial.rating);
        
        testimonialCard.innerHTML = `
            <div class="rating">${stars}</div>
            <p class="content">${testimonial.content}</p>
            <p class="author">- ${testimonial.author}</p>
        `;
        
        testimonialsGrid.appendChild(testimonialCard);
    });
}

// Initialize blog posts
function initializeBlogPosts() {
    const blogGrid = document.getElementById('blog-grid');
    
    CONFIG.blogPosts.forEach(post => {
        const blogCard = document.createElement('div');
        blogCard.className = 'blog-card';
        
        blogCard.innerHTML = `
            <img src="${post.image}" alt="${post.title}" loading="lazy">
            <div class="content">
                <h3>${post.title}</h3>
                <p class="date">${post.date}</p>
                <p>${post.excerpt}</p>
                <a href="${post.link}" class="read-more">Read More</a>
            </div>
        `;
        
        blogGrid.appendChild(blogCard);
    });
}

// Mobile menu functionality
function initializeMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when clicking a link
        navLinksItems.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target) && navLinks.classList.contains('active')) {
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
}

// Slider functionality
let currentSlide = 0;
let slideInterval;

function goToSlide(n) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    
    currentSlide = (n + slides.length) % slides.length;
    
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

function nextSlide() {
    goToSlide(currentSlide + 1);
}

function startSlideShow() {
    if (slideInterval) {
        clearInterval(slideInterval);
    }
    slideInterval = setInterval(nextSlide, CONFIG.slider.interval);
}

function stopSlideShow() {
    if (slideInterval) {
        clearInterval(slideInterval);
    }
}

// Initialize zip code validation in contact form
function initializeContactZipValidation() {
    const zipInput = document.getElementById('zip');
    const validationMessage = document.getElementById('zip-validation');
    const contactForm = document.getElementById('contact-form');

    if (!zipInput || !validationMessage || !contactForm) {
        console.error('Required elements not found for zip code validation');
        return;
    }

    // Hide validation message initially
    validationMessage.style.display = 'none';

    // Handle input changes
    zipInput.addEventListener('input', (e) => {
        // Show validation message when user starts typing
        validationMessage.style.display = 'block';
        
        // Only allow numbers
        e.target.value = e.target.value.replace(/[^0-9]/g, '');
        
        if (!e.target.value) {
            showValidationError('Please enter your zip code');
        } else if (e.target.value.length === 5) {
            validateContactZip(e.target.value);
        }
    });

    // Handle form submission
    contactForm.addEventListener('submit', (e) => {
        // Show validation message on form submission
        validationMessage.style.display = 'block';
        
        const zipCode = zipInput.value.trim();
        
        if (!zipCode || zipCode.length !== 5) {
            e.preventDefault();
            showValidationError('Please enter a valid 5-digit zip code');
            zipInput.focus();
            return;
        }

        // Check if zip code is in service area
        if (!checkZipCodeCoverage(zipCode)) {
            e.preventDefault();
            showValidationError('Sorry, we don\'t currently service this area');
            zipInput.focus();
        }
    });
}

function showValidationError(message) {
    const validationMessage = document.getElementById('zip-validation');
    if (validationMessage) {
        validationMessage.textContent = message;
        validationMessage.className = 'validation-message';
        validationMessage.style.display = 'block';
    }
}

function validateContactZip(zipCode) {
    if (!/^\d{5}$/.test(zipCode)) {
        showValidationError('Please enter a valid 5-digit zip code');
        return false;
    }

    if (checkZipCodeCoverage(zipCode)) {
        const validationMessage = document.getElementById('zip-validation');
        if (validationMessage) {
            validationMessage.textContent = 'Great! We service your area';
            validationMessage.className = 'validation-message success';
            validationMessage.style.display = 'block';
        }
        return true;
    } else {
        showValidationError('Sorry, we don\'t currently service this area');
        return false;
    }
}

// Zip code coverage check
function checkZipCodeCoverage(zipCode) {
    // Sanitize and validate input
    zipCode = zipCode.replace(/[^0-9]/g, '');
    if (zipCode.length !== 5) {
        return false;
    }
    
    // Check if zip code exists in service areas
    return CONFIG.serviceAreas.hasOwnProperty(zipCode) && CONFIG.serviceAreas[zipCode] === true;
}

// Initialize special offers
function initializeSpecialOffers() {
    const offersContainer = document.querySelector('.offers-container');
    
    CONFIG.specialOffers.forEach(offer => {
        const offerCard = document.createElement('div');
        offerCard.className = 'offer-card';
        
        let priceHtml = '';
        if (offer.type === 'price') {
            priceHtml = `<p class="price">$${offer.price}</p>`;
        } else if (offer.type === 'discount') {
            priceHtml = `<p class="discount">$${offer.discount} OFF</p>`;
        }
        
        offerCard.innerHTML = `
            <h3>${offer.title}</h3>
            ${priceHtml}
            <p class="details">${offer.details}</p>
            <button class="cta-button">Book Now</button>
        `;
        
        offersContainer.appendChild(offerCard);
    });
}

// Initialize scroll animations
function initializeScrollAnimations() {
    const logoImg = document.querySelector('.logo-img');
    const welcomeSection = document.querySelector('.logo-showcase');
    
    if (logoImg && welcomeSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) {
                    logoImg.classList.add('visible');
                } else {
                    logoImg.classList.remove('visible');
                }
            });
        }, {
            threshold: 0.5
        });
        
        observer.observe(welcomeSection);
    }
}

// Initialize everything when the page loads
document.addEventListener('DOMContentLoaded', () => {
    // Wait a short moment to ensure CONFIG is loaded
    setTimeout(() => {
        if (typeof CONFIG === 'undefined') {
            console.error('CONFIG failed to load after timeout');
            return;
        }
        console.log('DOM Content Loaded and CONFIG is available');
        initializePage();
        startSlideShow();
        
        // Pause slideshow when hovering over the slider
        const slider = document.querySelector('.slider');
        if (slider) {
            slider.addEventListener('mouseenter', stopSlideShow);
            slider.addEventListener('mouseleave', startSlideShow);
        }

        // Add lazy loading to images
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            img.loading = 'lazy';
        });
    }, 100); // Small delay to ensure CONFIG is loaded
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form submission handling with Formspree
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Validate all fields
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const street = document.getElementById('street').value;
        const zip = document.getElementById('zip').value;

        const isNameValid = validateName(name);
        const isEmailValid = validateEmail(email);
        const isPhoneValid = validatePhone(phone);
        const isStreetValid = validateStreet(street);
        const isZipValid = validateZip(zip);

        if (!isNameValid || !isEmailValid || !isPhoneValid || !isStreetValid || !isZipValid) {
            showFormValidation('Please correct the errors in the form before submitting.');
            return;
        }

        // If all validations pass, submit the form
        try {
            const formData = new FormData(contactForm);
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                showFormValidation('Thank you for your message! We will get back to you soon.', true);
                contactForm.reset();
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            console.error('Error:', error);
            showFormValidation('Sorry, there was an error sending your message. Please try again later.');
        }
    });
}

// Add scroll-based header styling
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Form validation functions
function validateName(name) {
    if (!name.trim()) {
        return 'Name is required';
    }
    if (name.length < 2) {
        return 'Name must be at least 2 characters long';
    }
    return '';
}

function validateEmail(email) {
    if (!email.trim()) {
        return 'Email is required';
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
        return 'Please enter a valid email address';
    }
    return '';
}

function validatePhone(phone) {
    if (!phone.trim()) {
        return 'Phone number is required';
    }
    const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (!phoneRegex.test(phone)) {
        return 'Please enter a valid phone number';
    }
    return '';
}

function validateStreet(street) {
    if (!street.trim()) {
        return 'Street address is required';
    }
    if (street.length < 5) {
        return 'Please enter a valid street address';
    }
    return '';
}

function validateZip(zip) {
    if (!zip.trim()) {
        return 'Zip code is required';
    }
    const zipRegex = /^\d{5}$/;
    if (!zipRegex.test(zip)) {
        return 'Please enter a valid 5-digit zip code';
    }
    
    // Check if zip code is in service area
    if (!CONFIG.serviceAreas[zip]) {
        return 'Sorry, we don\'t currently service this area.';
    }
    
    return '';
}

/**
 * Shows a validation message for a specific form field
 * @param {string} elementId - The ID of the form field
 * @param {string} message - The message to display
 * @param {boolean} isSuccess - Whether this is a success message
 */
function showValidationMessage(elementId, message, isSuccess = false) {
    console.log(`Showing validation message for ${elementId}:`, { message, isSuccess });
    
    const element = document.getElementById(elementId);
    const messageElement = document.getElementById(`${elementId}-message`);
    
    if (!element || !messageElement) {
        console.error(`Validation message elements not found for ${elementId}`);
        return;
    }

    // Update element styling
    element.classList.remove('valid', 'invalid');
    element.classList.add(isSuccess ? 'valid' : 'invalid');
    
    // Update message
    messageElement.textContent = message;
    messageElement.className = `validation-message ${isSuccess ? 'success' : 'error'}`;
    messageElement.style.display = 'block';
    
    console.log(`Validation message displayed for ${elementId}`);
}

/**
 * Hides the validation message for a specific form field
 * @param {string} elementId - The ID of the form field
 */
function hideValidationMessage(elementId) {
    console.log(`Hiding validation message for ${elementId}`);
    
    const element = document.getElementById(elementId);
    const messageElement = document.getElementById(`${elementId}-message`);
    
    if (!element || !messageElement) {
        console.error(`Validation message elements not found for ${elementId}`);
        return;
    }

    // Remove validation styling
    element.classList.remove('valid', 'invalid');
    
    // Hide message
    messageElement.style.display = 'none';
    messageElement.textContent = '';
    
    console.log(`Validation message hidden for ${elementId}`);
}

/**
 * Shows a form-wide validation message
 * @param {string} message - The message to display
 * @param {boolean} isSuccess - Whether this is a success message
 */
function showFormValidation(message, isSuccess = false) {
    console.log('Showing form validation message:', { message, isSuccess });
    
    const formMessage = document.getElementById('form-message');
    if (!formMessage) {
        console.error('Form message element not found');
        return;
    }

    formMessage.textContent = message;
    formMessage.className = `form-message ${isSuccess ? 'success' : 'error'}`;
    formMessage.style.display = 'block';
    
    console.log('Form validation message displayed');
}

/**
 * Hides the form-wide validation message
 */
function hideFormValidation() {
    console.log('Hiding form validation message');
    
    const formMessage = document.getElementById('form-message');
    if (!formMessage) {
        console.error('Form message element not found');
        return;
    }

    formMessage.style.display = 'none';
    formMessage.textContent = '';
    
    console.log('Form validation message hidden');
}

/**
 * Initializes the contact form with validation and submission handling
 * Sets up event listeners for form fields and submission
 */
function initializeContactForm() {
    console.log('Initializing contact form...');
    const form = document.getElementById('contact-form');
    if (!form) {
        console.error('Contact form element not found!');
        return;
    }

    // Get form fields
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const streetInput = document.getElementById('street');
    const zipInput = document.getElementById('zip');
    const messageInput = document.getElementById('message');

    console.log('Form fields found:', {
        name: nameInput ? 'Found' : 'Not found',
        email: emailInput ? 'Found' : 'Not found',
        phone: phoneInput ? 'Found' : 'Not found',
        street: streetInput ? 'Found' : 'Not found',
        zip: zipInput ? 'Found' : 'Not found',
        message: messageInput ? 'Found' : 'Not found'
    });

    // Add input event listeners for real-time validation
    nameInput?.addEventListener('input', () => {
        console.log('Validating name input...');
        validateName(nameInput.value);
    });

    emailInput?.addEventListener('input', () => {
        console.log('Validating email input...');
        validateEmail(emailInput.value);
    });

    phoneInput?.addEventListener('input', () => {
        console.log('Validating phone input...');
        validatePhone(phoneInput.value);
    });

    streetInput?.addEventListener('input', () => {
        console.log('Validating street input...');
        validateStreet(streetInput.value);
    });

    zipInput?.addEventListener('input', () => {
        console.log('Validating zip code input...');
        validateZip(zipInput.value);
    });

    // Form submission handler
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        console.log('Form submission started...');

        // Validate all fields
        const isNameValid = validateName(nameInput.value);
        const isEmailValid = validateEmail(emailInput.value);
        const isPhoneValid = validatePhone(phoneInput.value);
        const isStreetValid = validateStreet(streetInput.value);
        const isZipValid = validateZip(zipInput.value);

        console.log('Form validation results:', {
            name: isNameValid,
            email: isEmailValid,
            phone: isPhoneValid,
            street: isStreetValid,
            zip: isZipValid
        });

        if (isNameValid && isEmailValid && isPhoneValid && isStreetValid && isZipValid) {
            console.log('All form fields are valid, preparing submission...');
            const formData = {
                name: nameInput.value,
                email: emailInput.value,
                phone: phoneInput.value,
                street: streetInput.value,
                zip: zipInput.value,
                message: messageInput.value
            };

            try {
                console.log('Sending form data to server...');
                const response = await fetch('/submit-contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                if (response.ok) {
                    console.log('Form submitted successfully!');
                    showFormValidation('Thank you for your message! We will get back to you soon.', true);
                    form.reset();
                } else {
                    console.error('Form submission failed:', response.status);
                    showFormValidation('Sorry, there was an error submitting your message. Please try again.');
                }
            } catch (error) {
                console.error('Error submitting form:', error);
                showFormValidation('Sorry, there was an error submitting your message. Please try again.');
            }
        } else {
            console.warn('Form submission prevented due to validation errors');
            showFormValidation('Please correct the errors in the form before submitting.');
        }
    });
}

/**
 * Validates a name input
 * @param {string} name - The name to validate
 * @returns {boolean} Whether the name is valid
 */
function validateName(name) {
    console.log('Validating name:', name);
    const isValid = name.length >= 2 && /^[a-zA-Z\s-']+$/.test(name);
    console.log('Name validation result:', isValid);
    
    if (isValid) {
        showValidationMessage('name', 'Name looks good!', true);
    } else {
        showValidationMessage('name', 'Please enter a valid name (at least 2 characters, letters only)');
    }
    
    return isValid;
}

/**
 * Validates an email address
 * @param {string} email - The email to validate
 * @returns {boolean} Whether the email is valid
 */
function validateEmail(email) {
    console.log('Validating email:', email);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);
    console.log('Email validation result:', isValid);
    
    if (isValid) {
        showValidationMessage('email', 'Email looks good!', true);
    } else {
        showValidationMessage('email', 'Please enter a valid email address');
    }
    
    return isValid;
}

/**
 * Validates a phone number
 * @param {string} phone - The phone number to validate
 * @returns {boolean} Whether the phone number is valid
 */
function validatePhone(phone) {
    console.log('Validating phone:', phone);
    const phoneRegex = /^\+?[\d\s-()]{10,}$/;
    const isValid = phoneRegex.test(phone);
    console.log('Phone validation result:', isValid);
    
    if (isValid) {
        showValidationMessage('phone', 'Phone number looks good!', true);
    } else {
        showValidationMessage('phone', 'Please enter a valid phone number');
    }
    
    return isValid;
}

/**
 * Validates a street address
 * @param {string} street - The street address to validate
 * @returns {boolean} Whether the street address is valid
 */
function validateStreet(street) {
    console.log('Validating street address:', street);
    const isValid = street.length >= 5;
    console.log('Street validation result:', isValid);
    
    if (isValid) {
        showValidationMessage('street', 'Address looks good!', true);
    } else {
        showValidationMessage('street', 'Please enter a valid street address');
    }
    
    return isValid;
}

/**
 * Validates a ZIP code
 * @param {string} zip - The ZIP code to validate
 * @returns {boolean} Whether the ZIP code is valid
 */
function validateZip(zip) {
    console.log('Validating ZIP code:', zip);
    const zipRegex = /^\d{5}(-\d{4})?$/;
    const isValid = zipRegex.test(zip);
    console.log('ZIP validation result:', isValid);
    
    if (isValid) {
        showValidationMessage('zip', 'ZIP code looks good!', true);
        checkZipCodeCoverage(zip);
    } else {
        showValidationMessage('zip', 'Please enter a valid ZIP code');
    }
    
    return isValid;
}

// Add this function at the end of the file
function initializeLazyLoading() {
    // Check if browser supports native lazy loading
    if ('loading' in HTMLImageElement.prototype) {
        console.log('Browser supports native lazy loading');
        return;
    }

    console.log('Using fallback lazy loading');
    
    // Create intersection observer for fallback lazy loading
    const lazyLoadObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });

    // Observe all images with data-src attribute
    document.querySelectorAll('img[data-src]').forEach(img => {
        lazyLoadObserver.observe(img);
    });
} 