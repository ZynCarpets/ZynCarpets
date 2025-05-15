/**
 * Initializes pricing cards in the pricing grid.
 * Fetches pricing tier data from window.siteData.pricingTiers.
 */
function initializePricing() {
    const pricingGrid = document.getElementById('pricing-grid');
    if (!pricingGrid) {
        console.warn('Pricing grid (#pricing-grid) not found. Skipping pricing initialization.');
        return;
    }

    if (!window.siteData || !window.siteData.pricingTiers || window.siteData.pricingTiers.length === 0) {
        console.warn('siteData.pricingTiers not found or empty. Skipping pricing initialization.');
        pricingGrid.innerHTML = '<p>No pricing information available at the moment.</p>'; // User-friendly message
        return;
    }
    const pricingTiers = window.siteData.pricingTiers;

    // Clear existing content
    pricingGrid.innerHTML = '';

    pricingTiers.forEach(tier => {
        const pricingCard = document.createElement('div');
        pricingCard.className = `pricing-card${tier.featured ? ' featured' : ''}`;
        
        const featuresList = tier.features.map(feature => 
            `<li><i class="fas fa-check"></i> ${feature}</li>`
        ).join('');
        
        // Sanitize HTML content from siteData if necessary, for now assuming it's safe
        pricingCard.innerHTML = `
            <div class="pricing-header">
                <h3>${tier.name}</h3>
                <div class="price">$${tier.pricePerSqFt}</div>
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