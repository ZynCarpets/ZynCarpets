/**
 * Main initialization function that sets up the entire website
 * Loads configuration and initializes all components
 */
function initializePage() {
    console.log('VERY_SPECIFIC_TEST_LOG_INITIALIZE_PAGE'); // Test log
    console.log('Starting page initialization...');
    
    // Prevent scroll to hash on page load
    if (window.location.hash) {
        window.scrollTo(0, 0);
        // Remove the hash without triggering a page reload
        history.replaceState(null, null, window.location.pathname);
    }

    // Set company information in the DOM
    console.log('Setting company information in DOM elements...');
    
    // Helper function to safely set text content
    const safeSetText = (elementId, text) => {
        const element = document.getElementById(elementId);
        if (element) {
            element.textContent = text;
            return true;
        }
        console.warn(`Element with id '${elementId}' not found`);
        return false;
    };

    // Set text content for all elements using SITE_DATA
    const { companyInfo } = window.SITE_DATA;
    const elementsToUpdate = {
        'tagline': companyInfo.tagline,
        'welcome-tagline': companyInfo.welcomeTagline,
        'description': companyInfo.description,
        'footer-company-name': companyInfo.footerCompanyName,
        'footer-description': companyInfo.footerDescription
    };

    Object.entries(elementsToUpdate).forEach(([id, text]) => {
        safeSetText(id, text);
    });
    
    // Set contact information
    const footerPhone = document.getElementById('footer-phone');
    const footerEmail = document.getElementById('footer-email');
    
    console.log('Footer contact elements found:', { 
        phoneElement: footerPhone ? 'Found' : 'Not found',
        emailElement: footerEmail ? 'Found' : 'Not found'
    });
    
    if (footerPhone && footerEmail) {
        footerPhone.textContent = companyInfo.footerPhone;
        footerEmail.textContent = companyInfo.footerEmail;
        console.log('Contact information set successfully:', { 
            phone: companyInfo.footerPhone,
            email: companyInfo.footerEmail
        });
    } else {
        console.warn('Some contact elements or information missing');
    }

    // Set coverage area information
    const coverageSubtitle = document.getElementById('coverage-subtitle');
    if (coverageSubtitle) {
        const areas = companyInfo.coverageAreas.join(', ');
        const states = companyInfo.coverageStates.join(', ');
        coverageSubtitle.textContent = `Currently serving ${areas}, ${states}`;
        console.log('Coverage area information set:', { areas, states });
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
        
        initializeSlider();
        initializeServices();
        initializeFeatures();
        initializeSocialLinks();
        initializePricing();
        initializeTestimonials();
        initializeBlogPosts();
        initializeSpecialOffers();
        initializeContactZipValidation();
        initializeContactForm();
        initializeLazyLoading();
        initializePhoneFormatting();
        console.log('Page initialization complete!');
    } catch (error) {
        console.error('Error during component initialization:', error);
    }
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
    
    const sliderImages = window.SITE_DATA.sliderImages;
    
    // Create slides from SITE_DATA
    console.log(`Creating ${sliderImages.length} slides...`);
    sliderImages.forEach((image, index) => {
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
                currentSlide = (currentSlide - 1 + sliderImages.length) % sliderImages.length;
            } else {
                console.log('Swipe left detected - going to next slide');
                currentSlide = (currentSlide + 1) % sliderImages.length;
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
    if (!servicesGrid) {
        console.warn('Services grid not found');
        return;
    }
    const services = window.SITE_DATA.services;
    
    services.forEach(service => {
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
    if (!featuresGrid) {
        console.warn('Features grid not found');
        return;
    }
    const features = window.SITE_DATA.features;
    
    features.forEach(feature => {
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
    const { socialMediaLinks } = window.SITE_DATA;
    const socialLinksContainer = document.getElementById('social-links');
    if (!socialLinksContainer) {
        console.warn('Social links container not found');
        return;
    }
    const socialIcons = {
        facebook: 'fa-facebook-f',
        instagram: 'fa-instagram',
        twitter: 'fa-twitter'
    };
    
    Object.entries(socialMediaLinks).forEach(([platform, url]) => {
        if (socialIcons[platform]) {
            const link = document.createElement('a');
            link.href = url;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            link.innerHTML = `<i class="fab ${socialIcons[platform]}"></i>`;
            socialLinksContainer.appendChild(link);
        }
    });
}

// Initialize pricing cards
function initializePricing() {
    const pricingGrid = document.getElementById('pricing-grid');
    if (!pricingGrid) {
        console.warn('Pricing grid not found');
        return;
    }
    const pricingTiers = window.SITE_DATA.pricingTiers;

    pricingTiers.forEach(tier => {
        const pricingCard = document.createElement('div');
        pricingCard.className = `pricing-card${tier.featured ? ' featured' : ''}`;
        
        const featuresList = tier.features.map(feature => 
            `<li><i class="fas fa-check"></i> ${feature}</li>`
        ).join('');
        
        pricingCard.innerHTML = `
            <div class="pricing-header">
                <h3>${tier.title}</h3>
                <div class="price">$${tier.price}</div>
                <p class="price-subtitle">${tier.subtitle}</p>
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
    if (!testimonialsGrid) {
        console.warn('Testimonials grid not found');
        return;
    }
    const testimonials = window.SITE_DATA.testimonials;

    testimonials.forEach(testimonial => {
        const card = document.createElement('div');
        card.className = 'testimonial-card';
        
        // Create star rating
        const stars = '★'.repeat(testimonial.rating) + '☆'.repeat(5 - testimonial.rating);
        
        card.innerHTML = `
            <div class="rating">${stars}</div>
            <p class="content">${testimonial.content}</p>
            <p class="author">- ${testimonial.author}</p>
        `;
        
        testimonialsGrid.appendChild(card);
    });
}

// Initialize blog posts
function initializeBlogPosts() {
    const blogGrid = document.getElementById('blog-grid');
    if (!blogGrid) {
        console.warn('Blog grid not found');
        return;
    }
    const blogPosts = window.SITE_DATA.blogPosts;

    blogPosts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'blog-card';
        
        postElement.innerHTML = `
            <img src="${post.image}" alt="${post.title}" loading="lazy">
            <div class="content">
                <h3>${post.title}</h3>
                <p class="date">${post.date}</p>
                <p>${post.excerpt}</p>
                <a href="${post.link}" class="read-more">Read More</a>
            </div>
        `;
        
        blogGrid.appendChild(postElement);
    });
}

// Initialize zip code validation in contact form
function initializeContactZipValidation() {
    const zipInput = document.getElementById('zip');
    const validationMessage = document.getElementById('zip-message');
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
    const validationMessage = document.getElementById('zip-message');
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
        const validationMessage = document.getElementById('zip-message');
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
    const serviceAreas = {
        '35756': true, '35757': true, '35758': true,
        '35801': true, '35802': true, '35803': true, '35804': true, '35805': true, '35806': true, '35807': true, '35808': true, '35809': true, '35810': true, '35811': true, '35812': true, '35813': true, '35814': true, '35815': true, '35816': true, '35824': true,
        '35611': true, '35613': true, '35614': true
    };
    // Check if zip code exists in service areas
    return serviceAreas.hasOwnProperty(zipCode) && serviceAreas[zipCode] === true;
}

// Initialize special offers
function initializeSpecialOffers() {
    const offersContainer = document.querySelector('.offers-container');
    if (!offersContainer) {
        console.warn('Offers container not found');
        return;
    }
    const specialOffers = window.SITE_DATA.specialOffers;

    specialOffers.forEach(offer => {
        const offerElement = document.createElement('div');
        offerElement.className = 'offer-card';
        
        let priceHtml = '';
        if (offer.type === 'price') {
            priceHtml = `<p class="price">$${offer.price}</p>`;
        } else if (offer.type === 'discount') {
            priceHtml = `<p class="discount">$${offer.discount} OFF</p>`;
        }
        
        offerElement.innerHTML = `
            <h3>${offer.title}</h3>
            ${priceHtml}
            <p class="details">${offer.details}</p>
            <button class="cta-button">Book Now</button>
        `;
        
        offersContainer.appendChild(offerElement);
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
function initializeApp() {
    console.log('=== Starting Application Initialization ===');
    
    // Prevent multiple initializations
    if (window.pageInitialized) {
        console.log('Application already initialized, skipping...');
        return;
    }
    window.pageInitialized = true;
    console.log('Initialization flag set');

    try {
        console.log('Starting page initialization...');
        initializePage();
        console.log('Page initialization complete');

        console.log('Starting slideshow...');
        startSlideShow();
        console.log('Slideshow started');
        
        // Pause slideshow when hovering over the slider
        const slider = document.querySelector('.slider');
        if (slider) {
            console.log('Setting up slider hover events');
            slider.addEventListener('mouseenter', () => {
                console.log('Slider hover detected, pausing slideshow');
                stopSlideShow();
            });
            slider.addEventListener('mouseleave', () => {
                console.log('Slider hover ended, resuming slideshow');
                startSlideShow();
            });
        } else {
            console.warn('Slider element not found');
        }

        // Add lazy loading to images
        console.log('Setting up lazy loading for images...');
        const images = document.querySelectorAll('img');
        console.log(`Found ${images.length} images to process`);
        images.forEach((img, index) => {
            img.loading = 'lazy';
            console.log(`Set lazy loading for image ${index + 1}`);
        });

        console.log('Setting up configuration values...');
        
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            console.log('Setting up contact form configuration');
            // The formId was part of CONFIG.formspree but typically Formspree uses the endpoint path.
            // If 'data-formspree-id' was actually used, it might need to be handled differently or was specific to a library.
            // contactForm.setAttribute('data-formspree-id', 'YOUR_FORMSPREE_ID'); // Assuming this might not be needed if standard Formspree is used
        } else {
            console.warn('Contact form element not found');
        }

        console.log('=== Application Initialization Complete ===');
    } catch (error) {
        console.error('Error during initialization:', error);
        console.error('Error stack:', error.stack);
    }
}

// Start initialization when DOM is ready
document.addEventListener('DOMContentLoaded', initializeApp);

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add scroll-based header styling
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Form submission handling with Formspree
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            street: document.getElementById('street').value,
            zip: document.getElementById('zip').value
        };

        // Validate all fields
        let hasError = false;
        const validations = {
            name: validateName(formData.name),
            email: validateEmail(formData.email),
            phone: validatePhone(formData.phone),
            street: validateStreet(formData.street),
            zip: validateZip(formData.zip)
        };

        // Show validation messages for all fields
        Object.entries(validations).forEach(([field, error]) => {
            if (error) {
                showValidationMessage(field, error, false);
                hasError = true;
            } else {
                hideValidationMessage(field);
            }
        });

        if (hasError) {
            showFormValidation('Please correct the errors in the form before submitting.');
            return;
        }

        try {
            // Validate CSRF token
            const csrfToken = contactForm.querySelector('input[name="_csrf"]').value;
            if (!validateCSRFToken(csrfToken)) {
                throw new Error('Invalid CSRF token');
            }

            // Submit to Formspree
            const formAction = contactForm.getAttribute('action'); // Get action from form attribute
            const response = await fetch(formAction, { // Use formAction here
                method: 'POST',
                body: JSON.stringify({
                    ...formData,
                    _csrf: csrfToken
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                showFormValidation('Thank you for your message! We will get back to you soon.', true);
                contactForm.reset();
                
                // Add success animation to all fields
                const fields = contactForm.querySelectorAll('input');
                fields.forEach(field => {
                    field.classList.add('field-success');
                    setTimeout(() => {
                        field.classList.remove('field-success');
                    }, 1000);
                });
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            console.error('Error:', error);
            showFormValidation('Sorry, there was an error sending your message. Please try again later.');
        }
    });
}

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
    const serviceAreas = {
        '35756': true, '35757': true, '35758': true,
        '35801': true, '35802': true, '35803': true, '35804': true, '35805': true, '35806': true, '35807': true, '35808': true, '35809': true, '35810': true, '35811': true, '35812': true, '35813': true, '35814': true, '35815': true, '35816': true, '35824': true,
        '35611': true, '35613': true, '35614': true
    };
    // Check if zip code is in service area
    if (!serviceAreas[zip]) { // Using direct property access as we know it's an object of booleans
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
    
    const formMessage = document.getElementById('form-validation');
    if (!formMessage) {
        console.error('Form message element not found');
        return;
    }

    // Create success message with icon
    if (isSuccess) {
        formMessage.innerHTML = `
            <div class="success-message">
                <div class="success-icon"></div>
                <span>${message}</span>
            </div>
        `;
        
        // Add success animation to form
        const form = document.getElementById('contact-form');
        form.classList.add('form-success');
        
        // Show toast notification
        showToast(message);
        
        // Remove success class after animation
        setTimeout(() => {
            form.classList.remove('form-success');
        }, 1000);
    } else {
        formMessage.textContent = message;
        formMessage.className = 'validation-message error';
    }
    
    formMessage.style.display = 'block';
    console.log('Form validation message displayed');
}

/**
 * Shows a toast notification
 * @param {string} message - The message to display
 */
function showToast(message) {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.innerHTML = `
        <div class="success-icon"></div>
        <span>${message}</span>
    `;
    
    // Add to document
    document.body.appendChild(toast);
    
    // Remove after 3 seconds
    setTimeout(() => {
        toast.classList.add('hide');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 500);
    }, 3000);
}

/**
 * Initializes the contact form with validation and submission handling
 * Sets up event listeners for form fields and submission
 */
function initializeContactForm() {
    console.log('Initializing contact form...');
    const form = document.getElementById('contact-form');
    const formBackup = new FormBackup();
    const submitButton = form.querySelector('button[type="submit"]');

    // Generate and set CSRF token
    const csrfToken = generateCSRFToken();
    form.querySelector('input[name="_csrf"]').value = csrfToken;

    // Add input event listeners for real-time validation
    const inputs = form.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            const value = this.value.trim();
            let errorMessage = '';
            
            switch(this.id) {
                case 'name':
                    errorMessage = validateName(value);
                    break;
                case 'email':
                    errorMessage = validateEmail(value);
                    break;
                case 'phone':
                    errorMessage = validatePhone(value);
                    break;
                case 'street':
                    errorMessage = validateStreet(value);
                    break;
                case 'zip':
                    errorMessage = validateZip(value);
                    break;
            }
            
            if (errorMessage) {
                showValidationMessage(this.id, errorMessage, false);
            } else {
                hideValidationMessage(this.id);
            }
        });

        // Clear validation on focus
        input.addEventListener('focus', function() {
            hideValidationMessage(this.id);
        });
    });

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Add loading state to button
        submitButton.classList.add('loading');
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            street: document.getElementById('street').value,
            zip: document.getElementById('zip').value
        };

        // Validate all fields
        let hasError = false;
        const validations = {
            name: validateName(formData.name),
            email: validateEmail(formData.email),
            phone: validatePhone(formData.phone),
            street: validateStreet(formData.street),
            zip: validateZip(formData.zip)
        };

        // Show validation messages for all fields
        Object.entries(validations).forEach(([field, error]) => {
            if (error) {
                showValidationMessage(field, error, false);
                hasError = true;
            } else {
                hideValidationMessage(field);
            }
        });

        if (hasError) {
            submitButton.classList.remove('loading');
            return;
        }

        try {
            // Validate CSRF token
            const csrfToken = form.querySelector('input[name="_csrf"]').value;
            if (!validateCSRFToken(csrfToken)) {
                throw new Error('Invalid CSRF token');
            }

            // Submit to Formspree
            const formAction = form.getAttribute('action'); // Get action from form attribute
            const response = await fetch(formAction, { // Use formAction here
                method: 'POST',
                body: JSON.stringify({
                    ...formData,
                    _csrf: csrfToken
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                // Backup the submission
                await formBackup.backupSubmission(formData);
                
                // Show success message
                showFormValidation('Thank you for your submission! We will contact you soon.', true);
                form.reset();
                
                // Add success animation to all fields
                const fields = form.querySelectorAll('input');
                fields.forEach(field => {
                    field.classList.add('field-success');
                    setTimeout(() => {
                        field.classList.remove('field-success');
                    }, 1000);
                });
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            showFormValidation('There was an error submitting your form. Please try again.', false);
        } finally {
            // Remove loading state
            submitButton.classList.remove('loading');
        }
    });
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

/**
 * Formats a phone number as the user types
 * @param {HTMLInputElement} input - The phone input element
 */
function formatPhoneNumber(input) {
    // Remove all non-numeric characters
    let value = input.value.replace(/\D/g, '');
    
    // Limit to 10 digits
    value = value.substring(0, 10);
    
    // Format the number as (XXX) XXX-XXXX
    if (value.length > 0) {
        if (value.length <= 3) {
            value = `(${value}`;
        } else if (value.length <= 6) {
            value = `(${value.substring(0, 3)}) ${value.substring(3)}`;
        } else {
            value = `(${value.substring(0, 3)}) ${value.substring(3, 6)}-${value.substring(6)}`;
        }
    }
    
    // Update input value
    input.value = value;
}

// Initialize phone number formatting
function initializePhoneFormatting() {
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            formatPhoneNumber(this);
        });
        
        // Format on focus if empty
        phoneInput.addEventListener('focus', function(e) {
            if (!this.value) {
                this.value = '(';
            }
        });
        
        // Handle backspace to maintain formatting
        phoneInput.addEventListener('keydown', function(e) {
            if (e.key === 'Backspace' && this.value.length === 1) {
                this.value = '';
            }
        });
    }
}

/**
 * Generates a CSRF token
 * @returns {string} A random CSRF token
 */
function generateCSRFToken() {
    const array = new Uint32Array(8);
    window.crypto.getRandomValues(array);
    return Array.from(array, dec => ('0' + dec.toString(16)).substr(-2)).join('');
}

/**
 * Validates the CSRF token
 * @param {string} token - The token to validate
 * @returns {boolean} Whether the token is valid
 */
function validateCSRFToken(token) {
    const storedToken = document.querySelector('input[name="_csrf"]').value;
    return token === storedToken;
}

let slideInterval;

function startSlideShow() {
    console.log('Starting slideshow...');
    // Clear any existing interval to prevent multiple slideshows running
    if (slideInterval) {
        clearInterval(slideInterval);
    }
    slideInterval = setInterval(nextSlide, 6000); // Hardcoded interval from CONFIG.slider.interval
}

function stopSlideShow() {
    console.log('Stopping slideshow...');
    if (slideInterval) {
        clearInterval(slideInterval);
    }
}