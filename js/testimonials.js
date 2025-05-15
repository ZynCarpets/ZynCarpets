/**
 * Initializes testimonial cards in the testimonials grid.
 * Fetches testimonial data from window.SITE_DATA.testimonials.
 */
function initializeTestimonials() {
    const testimonialsGrid = document.getElementById('testimonials-grid');
    if (!testimonialsGrid) {
        console.warn('Testimonials grid (#testimonials-grid) not found. Skipping testimonials initialization.');
        return;
    }

    if (!window.SITE_DATA || !window.SITE_DATA.testimonials || window.SITE_DATA.testimonials.length === 0) {
        console.warn('SITE_DATA.testimonials not found or empty. Skipping testimonials initialization.');
        testimonialsGrid.innerHTML = '<p>No testimonials available at the moment.</p>'; // User-friendly message
        return;
    }
    const testimonials = window.SITE_DATA.testimonials;

    // Clear existing content
    testimonialsGrid.innerHTML = '';

    testimonials.forEach(testimonial => {
        const card = document.createElement('div');
        card.className = 'testimonial-card';
        
        // Ensure rating is a number and within bounds (0-5)
        const rating = Math.max(0, Math.min(5, parseInt(testimonial.rating, 10) || 0));
        const stars = '★'.repeat(rating) + '☆'.repeat(5 - rating);
        
        // Sanitize content and author if they come from user input or less trusted SITE_DATA sources.
        // For now, assuming SITE_DATA is trusted.
        card.innerHTML = `
            <div class="rating">${stars}</div>
            <p class="content">${testimonial.content}</p>
            <p class="author">- ${testimonial.author}</p>
        `;
        
        testimonialsGrid.appendChild(card);
    });
} 