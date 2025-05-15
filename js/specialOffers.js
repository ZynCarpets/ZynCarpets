/**
 * Initializes special offer cards in the offers container.
 * Fetches offer data from window.SITE_DATA.specialOffers.
 */
function initializeSpecialOffers() {
    const offersContainer = document.querySelector('.offers-container');
    if (!offersContainer) {
        console.warn('Offers container (.offers-container) not found. Skipping special offers initialization.');
        return;
    }

    if (!window.SITE_DATA || !window.SITE_DATA.specialOffers || window.SITE_DATA.specialOffers.length === 0) {
        console.warn('SITE_DATA.specialOffers not found or empty. Skipping special offers initialization.');
        offersContainer.innerHTML = '<p>No special offers available at the moment.</p>'; // User-friendly message
        return;
    }
    const specialOffers = window.SITE_DATA.specialOffers;

    // Clear existing content
    offersContainer.innerHTML = '';

    specialOffers.forEach(offer => {
        const offerElement = document.createElement('div');
        offerElement.className = 'offer-card';
        
        let priceHtml = '';
        // Validate offer type and data
        const title = offer.title || 'Special Offer';
        const details = offer.details || 'See offer for details.';
        const type = offer.type ? offer.type.toLowerCase() : '';

        if (type === 'price' && offer.price !== undefined) {
            priceHtml = `<p class="price">$${parseFloat(offer.price).toFixed(2)}</p>`;
        } else if (type === 'discount' && offer.discount !== undefined) {
            priceHtml = `<p class="discount">$${parseFloat(offer.discount).toFixed(2)} OFF</p>`;
        }
        // else: No price or discount displayed if type is different or data missing
        
        offerElement.innerHTML = `
            <h3>${title}</h3>
            ${priceHtml}
            <p class="details">${details}</p>
            <button class="cta-button">Book Now</button> 
            <!-- Consider making button text/action configurable via SITE_DATA -->
        `;
        
        offersContainer.appendChild(offerElement);
    });
} 