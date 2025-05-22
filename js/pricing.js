/**
 * Initializes pricing cards in the pricing grid.
 * Fetches pricing tier data from window.SITE_DATA.pricingTiers.
 */
function initializePricing() {
    const pricingGrid = document.getElementById('pricing-grid');
    if (!pricingGrid) {
        console.warn('Pricing grid (#pricing-grid) not found. Skipping pricing initialization.');
        return;
    }

    if (!window.SITE_DATA || !window.SITE_DATA.pricingTiers || window.SITE_DATA.pricingTiers.length === 0) {
        console.warn('SITE_DATA.pricingTiers not found or empty. Skipping pricing initialization.');
        pricingGrid.innerHTML = '<p>No pricing information available at the moment.</p>'; // User-friendly message
        return;
    }
    const pricingTiers = window.SITE_DATA.pricingTiers;

    // Clear existing content
    pricingGrid.innerHTML = '';

    pricingTiers.forEach(tier => {
        const pricingCard = document.createElement('div');
        pricingCard.className = `pricing-card${tier.popular ? ' featured' : ''}`;
        
        const featuresList = tier.features.map(feature => 
            `<li><i class="fas fa-check"></i> ${feature}</li>`
        ).join('');
        
        // Sanitize HTML content from SITE_DATA if necessary, for now assuming it's safe
        pricingCard.innerHTML = `
            <div class="pricing-header">
                <h3>${tier.name}</h3>
                <div class="price">$${tier.pricePerSqFt.toFixed(2)}</div>
                <p class="price-subtitle">per sq ft</p>
            </div>
            <ul class="pricing-features">
                ${featuresList}
            </ul>
            <a href="#contact" class="pricing-cta">Get Started</a>
        `;
        
        pricingGrid.appendChild(pricingCard);
    });
} 