/**
 * Initializes special offers section.
 * Fetches offer data from window.SITE_DATA.specialOffers.
 */
function initializeSpecialOffers() {
    console.log('[specialOffers] Initializing special offers...');
    
    const offersContainer = document.querySelector('.offers-container');
    if (!offersContainer) {
        console.warn('[specialOffers] Special offers container (.offers-container) not found. Skipping special offers initialization.');
        return;
    }

    if (!window.SITE_DATA || !window.SITE_DATA.specialOffers || window.SITE_DATA.specialOffers.length === 0) {
        console.warn('[specialOffers] SITE_DATA.specialOffers not found or empty. Skipping special offers initialization.');
        offersContainer.innerHTML = '<p>No special offers available at the moment.</p>'; // User-friendly message
        return;
    }
    
    const specialOffers = window.SITE_DATA.specialOffers;
    console.log('[specialOffers] Found', specialOffers.length, 'offers to initialize');

    // Clear existing content
    offersContainer.innerHTML = '';

    specialOffers.forEach((offer, index) => {
        const offerCard = document.createElement('div');
        offerCard.className = 'offer';
        
        let priceDisplay = '';
        if (offer.type === 'price') {
            priceDisplay = `
                <div class="offer-price">
                    <span class="currency">$</span>
                    <span class="amount">${offer.price}</span>
                </div>`;
        } else if (offer.type === 'discount') {
            priceDisplay = `
                <div class="offer-discount">
                    <span class="amount">${offer.discount}</span>
                    <span class="percent">%</span>
                    <span class="off">OFF</span>
                </div>`;
        }
        
        offerCard.innerHTML = `
            <div class="offer-content">
                <div class="offer-header">
                    <h3>${offer.title}</h3>
                    ${priceDisplay}
                </div>
                <div class="offer-details">
                    <p>${offer.details}</p>
                </div>
                <div class="offer-footer">
                    <a href="#contact" class="offer-button">Get This Offer</a>
                </div>
            </div>
        `;
        
        offersContainer.appendChild(offerCard);
        console.log(`[specialOffers] Added offer ${index + 1}`);
    });
    
    console.log('[specialOffers] Special offers initialization complete');
}

// Make the function available globally
window.initializeSpecialOffers = initializeSpecialOffers; 