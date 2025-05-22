/**
 * Initializes testimonials section.
 * Fetches testimonial data from window.SITE_DATA.testimonials.
 */
function initializeTestimonials() {
    console.log('[testimonials] Initializing testimonials...');
    
    const testimonialsContainer = document.getElementById('testimonials-grid');
    if (!testimonialsContainer) {
        console.warn('[testimonials] Testimonials container (#testimonials-grid) not found. Skipping testimonials initialization.');
        return;
    }

    if (!window.SITE_DATA || !window.SITE_DATA.testimonials || window.SITE_DATA.testimonials.length === 0) {
        console.warn('[testimonials] SITE_DATA.testimonials not found or empty. Skipping testimonials initialization.');
        testimonialsContainer.innerHTML = '<p>No testimonials available at the moment.</p>';
        return;
    }
    
    const testimonials = window.SITE_DATA.testimonials;
    console.log('[testimonials] Found', testimonials.length, 'testimonials to initialize');

    // Clear existing content
    testimonialsContainer.innerHTML = '';

    testimonials.forEach((testimonial, index) => {
        const testimonialCard = document.createElement('div');
        testimonialCard.className = 'testimonial-card';
        
        // Create star rating
        const stars = '★'.repeat(testimonial.rating) + '☆'.repeat(5 - testimonial.rating);
        
        testimonialCard.innerHTML = `
            <div class="testimonial-content">
                <div class="rating">${stars}</div>
                <p class="quote">${testimonial.quote}</p>
            </div>
            <div class="testimonial-author">
                <div class="author-info">
                    <p class="author-name">${testimonial.author}</p>
                    <p class="author-location">${testimonial.location}</p>
                </div>
            </div>
        `;
        
        testimonialsContainer.appendChild(testimonialCard);
        console.log(`[testimonials] Added testimonial ${index + 1}`);
    });
    
    console.log('[testimonials] Testimonials initialization complete');
}

// Make the function available globally
window.initializeTestimonials = initializeTestimonials; 